import { NextResponse } from 'next/server';
import { getAllBrands } from '@/lib/brands';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const query = searchParams.get('query');

  let filtered = getAllBrands();

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    brands: paginated,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  });
}
