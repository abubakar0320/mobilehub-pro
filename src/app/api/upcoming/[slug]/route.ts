import { NextResponse } from 'next/server';
import { getUpcomingBySlug } from '@/lib/upcoming';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const phone = getUpcomingBySlug(resolvedParams.slug);
  
  if (!phone) {
    return NextResponse.json({ error: 'Upcoming phone not found' }, { status: 404 });
  }

  return NextResponse.json(phone);
}
