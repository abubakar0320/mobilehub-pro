import { NewsArticle } from "@/types/news";

const categories = ["Leaks", "Reviews", "Launches", "Updates", "Deals", "AI"];
const brands = ["apple", "samsung", "google", "xiaomi", "oneplus", "motorola", "oppo", "vivo"];

const baseNews: NewsArticle[] = [
  {
    _id: "news-base-1",
    slug: "samsung-galaxy-s25-ultra-leaked-renders",
    title: "Exclusive: First look at the highly anticipated Samsung Galaxy S25 Ultra renders.",
    excerpt: "New leaked renders reveal a drastic redesign for Samsung's upcoming flagship, featuring rounded corners and a massive new camera array.",
    content: "<p>The tech world is buzzing with the latest leak surrounding Samsung's upcoming flagship...</p>",
    category: "Leaks",
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
    author: { name: "Alex Mercer", avatar: "https://i.pravatar.cc/150?u=alex", role: "Senior Leaks Editor" },
    publishedAt: "2024-05-15T08:00:00Z",
    readTime: 4, views: 125000, tags: ["Samsung", "Leaks"], brandSlug: "samsung"
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  ...baseNews,
  ...Array.from({ length: 60 }).map((_, i) => {
    const brand = brands[i % brands.length];
    const category = categories[i % categories.length];
    return {
      _id: `news-gen-${i}`,
      slug: `${brand}-news-update-${i}`,
      title: `${brand.charAt(0).toUpperCase() + brand.slice(1)} announces breakthrough in ${category} technology - Report ${i+1}`,
      excerpt: `Industry insiders suggest that ${brand} is secretly working on next-gen capabilities that will revolutionize the ${category} space.`,
      content: `<p>Detailed mock article content for ${brand} regarding ${category}. This represents a massive shift in mobile technology.</p>`,
      category: category as any,
      thumbnail: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop&random=${i}`,
      coverImage: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop&random=${i}`,
      author: {
        name: `Editor ${i % 5}`,
        avatar: `https://i.pravatar.cc/150?u=editor${i}`,
        role: "Tech Analyst"
      },
      publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
      readTime: 2 + (i % 5),
      views: 1000 + (i * 1500) % 50000,
      tags: [brand, category],
      brandSlug: brand
    };
  })
];

export function getAllNews() {
  return MOCK_NEWS.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getNewsBySlug(slug: string) {
  return MOCK_NEWS.find(n => n.slug === slug);
}

export function getTrendingNews(limit: number = 5) {
  return [...MOCK_NEWS].sort((a, b) => b.views - a.views).slice(0, limit);
}
