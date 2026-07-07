import { NextResponse } from 'next/server';
import { getAllNews } from '@/lib/news';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');

  let filtered = getAllNews();

  if (brand) {
    filtered = filtered.filter(n => n.brandSlug === brand);
  }

  if (category && category !== 'All') {
    filtered = filtered.filter(n => n.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.excerpt.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    news: paginated,
    total,
    page,
    totalPages,
    hasMore: page < totalPages
  });
}
