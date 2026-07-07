import { NextResponse } from 'next/server';
import { getBrandBySlug } from '@/lib/brands';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const brand = getBrandBySlug(resolvedParams.slug);
  
  if (!brand) {
    return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
  }

  return NextResponse.json(brand);
}
