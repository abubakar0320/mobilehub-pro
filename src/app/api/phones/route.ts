import { NextResponse } from 'next/server';
import { MOCK_PHONES } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Quick fetch by IDs (for compare page)
  const idsParam = searchParams.get('ids');
  if (idsParam) {
    const ids = idsParam.split(',');
    const selected = MOCK_PHONES.filter(p => ids.includes(p._id));
    return NextResponse.json({ phones: selected });
  }

  // Extract params
  const brandParam = searchParams.get('brand');
  const seriesParam = searchParams.get('series');
  const ramParam = searchParams.get('ram');
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  const sort = searchParams.get('sort');
  const tagParam = searchParams.get('tag');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');
  
  const qParam = searchParams.get('q');
  let filtered = [...MOCK_PHONES];

  // Text search
  if (qParam && qParam.length >= 2) {
    const regex = new RegExp(qParam, 'i');
    filtered = filtered.filter(p => regex.test(p.model) || regex.test(p.brand));
  }
  
  if (tagParam) {
    const tag = tagParam.toLowerCase();
    if (tag === 'gaming') {
      filtered = filtered.filter(p => p.specs.performance.ram >= 12 && p.specs.performance.benchmarks.geekbench6Multi >= 3500);
    } else if (tag === 'camera') {
      filtered = filtered.filter(p => p.specs.cameraDeep.main.mp >= 50 && p.specs.cameraDeep.main.ois);
    } else if (tag === 'battery') {
      filtered = filtered.filter(p => p.specs.batteryDeep.capacity >= 4500);
    } else if (tag === 'budget') {
      filtered = filtered.filter(p => p.price.usd <= 400);
    } else if (tag === 'flagships') {
      filtered = filtered.filter(p => p.price.usd >= 800);
    } else if (tag === 'foldables') {
      filtered = filtered.filter(p => p.model.toLowerCase().includes('fold'));
    }
  }
  
  if (brandParam) {
    const brands = brandParam.split(',').map(b => b.toLowerCase());
    filtered = filtered.filter(p => brands.includes(p.brand.toLowerCase()));
  }
  
  if (seriesParam) {
    // Just a mock implementation: if series is provided, just return a subset to simulate filtering
    // In a real app we would match p.series.slug === seriesParam
    filtered = filtered.filter((_, i) => i % 2 === 0);
  }
  
  if (ramParam) {
    const rams = ramParam.split(',').map(Number);
    filtered = filtered.filter(p => rams.includes(p.specs.ram));
  }
  
  const storageParam = searchParams.get('storage');
  if (storageParam) {
    const storages = storageParam.split(',').map(Number);
    filtered = filtered.filter(p => storages.includes(p.specs.storage));
  }
  
  if (priceMin) {
    filtered = filtered.filter(p => p.price.usd >= Number(priceMin));
  }
  
  if (priceMax) {
    filtered = filtered.filter(p => p.price.usd <= Number(priceMax));
  }
  
  // Sort
  if (sort === 'price_asc') filtered.sort((a, b) => a.price.usd - b.price.usd);
  if (sort === 'price_desc') filtered.sort((a, b) => b.price.usd - a.price.usd);
  if (sort === 'rating') filtered.sort((a, b) => b.rating.average - a.rating.average);
  if (sort === 'newest') filtered.sort((a, b) => b.releaseYear - a.releaseYear);
  // Default is popularity (simulated by rating count here)
  if (!sort || sort === 'popularity') filtered.sort((a, b) => b.rating.count - a.rating.count);
  
  // Pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);
  
  return NextResponse.json({
    phones: paginated,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  });
}
