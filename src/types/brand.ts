export interface BrandStats {
  totalPhones: number;
  avgRating: number;
  newThisYear: number;
  upcomingCount: number;
}

export interface BrandSeries {
  name: string;
  slug: string;
  phoneCount: number;
  icon: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  country: string;
  founded: number;
  hq: string;
  ceo: string;
  website: string;
  os: 'Android' | 'iOS' | 'Other';
  ui: string;
  about: string;
  popularFor: string[];
  marketShare: number;
  stats: BrandStats;
  series: BrandSeries[];
  socialLinks: SocialLinks;
  region: 'Global Giants' | 'Chinese Brands' | 'Others';
}
