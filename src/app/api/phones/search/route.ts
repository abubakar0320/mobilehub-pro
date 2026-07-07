import { NextRequest, NextResponse } from 'next/server'
import { MOCK_PHONES } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) return NextResponse.json([])

  const regex = new RegExp(q, 'i')

  // Try MongoDB first, fall back to mock data
  try {
    const connectToDatabase = (await import('@/lib/db')).default
    const Phone = (await import('@/models/Phone')).default
    await connectToDatabase()

    try {
      // Atlas Search
      const phones = await Phone.aggregate([
        {
          $search: {
            index: 'phone_search',
            compound: {
              should: [
                { text: { query: q, path: 'model', score: { boost: { value: 10 } } } },
                { text: { query: q, path: 'brand', score: { boost: { value: 5 } } } },
                { text: { query: q, path: 'shortName', score: { boost: { value: 8 } } } },
              ]
            }
          }
        },
        { $limit: 10 },
        {
          $project: {
            model: 1, brand: 1, slug: 1,
            'images.thumbnail': 1, 'images.main': 1,
            'price.usd': 1, 'rating.average': 1,
          }
        }
      ])
      return NextResponse.json(phones)
    } catch {
      // Atlas search unavailable — try basic regex
      const phones = await Phone.find({
        $or: [
          { model: regex }, { brand: regex }, { shortName: regex }
        ]
      })
        .limit(10)
        .select('model brand slug images.thumbnail images.main price.usd rating.average')
        .lean()
      return NextResponse.json(phones)
    }
  } catch {
    // DB not connected at all — use mock data
  }

  // ── Mock fallback ──────────────────────────────────────────
  const results = MOCK_PHONES.filter(
    (p) => regex.test(p.model) || regex.test(p.brand)
  )
    .slice(0, 10)
    .map((p) => ({
      _id: p._id,
      model: p.model,
      brand: p.brand,
      slug: p.slug,
      images: { thumbnail: p.images.main, main: p.images.main },
      price: { usd: p.price.usd },
      rating: { average: p.rating.average },
    }))

  return NextResponse.json(results)
}
