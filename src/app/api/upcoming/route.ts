import { NextResponse } from 'next/server';
import { getAllUpcoming } from '@/lib/upcoming';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const query = searchParams.get('query');

  let filtered = getAllUpcoming();

  if (brand && brand !== 'All') {
    filtered = filtered.filter(p => p.brandSlug.toLowerCase() === brand.toLowerCase());
  }

  if (status && status !== 'All') {
    filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q));
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    upcoming: paginated,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  });
}
