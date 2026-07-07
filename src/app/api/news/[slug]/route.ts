import { NextResponse } from 'next/server';
import { getNewsBySlug } from '@/lib/news';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getNewsBySlug(resolvedParams.slug);
  
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json(article);
}
