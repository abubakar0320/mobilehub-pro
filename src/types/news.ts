export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export type NewsCategory = 'Launches' | 'Leaks' | 'Reviews' | 'Updates' | 'Deals' | 'AI';

export interface NewsArticle {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  category: NewsCategory;
  thumbnail: string;
  coverImage: string;
  author: Author;
  publishedAt: string;
  readTime: number; // in minutes
  views: number;
  tags: string[];
  brandSlug?: string; // If it's specific to a brand
}
