import { NextResponse } from 'next/server';
import { MOCK_PHONES } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const phone = MOCK_PHONES.find(p => p.slug === slug);
  
  if (!phone) {
    return NextResponse.json({ error: 'Phone not found' }, { status: 404 });
  }
  
  return NextResponse.json(phone);
}
