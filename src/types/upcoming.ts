export type UpcomingStatus = 'Official' | 'Teased' | 'Rumor' | 'Leaked';

export interface LeakedSpec {
  category: string; // e.g. "Display", "Camera"
  details: string; // e.g. "6.9-inch LTPO OLED, 144Hz"
}

export interface UpcomingPhone {
  _id: string;
  slug: string;
  brandSlug: string;
  brandName: string;
  name: string;
  expectedDate: string; // e.g. "2026-10-15T00:00:00Z"
  status: UpcomingStatus;
  confidenceScore: number; // 0-100%
  expectedPrice: string;
  heroImage: string;
  summary: string;
  specs: LeakedSpec[];
  tags: string[];
}
