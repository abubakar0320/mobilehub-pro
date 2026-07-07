import { UpcomingPhone, UpcomingStatus } from "@/types/upcoming";

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const statuses: UpcomingStatus[] = ['Official', 'Teased', 'Leaked', 'Rumor'];
const brands = ["Apple", "Samsung", "Google", "Xiaomi", "OnePlus", "Motorola", "Oppo", "Vivo", "Sony", "Asus"];

export const MOCK_UPCOMING: UpcomingPhone[] = Array.from({ length: 45 }).map((_, i) => {
  const brand = brands[i % brands.length];
  const isFoldable = i % 4 === 0;
  
  return {
    _id: `upc-gen-${i}`,
    slug: `${brand.toLowerCase()}-upcoming-model-${i}`,
    brandSlug: brand.toLowerCase(),
    brandName: brand,
    name: `${brand} ${isFoldable ? 'Fold' : 'Pro'} Gen ${i+1}`,
    expectedDate: getFutureDate((i + 1) * 15),
    status: statuses[i % 4],
    confidenceScore: 40 + (i * 7) % 60,
    expectedPrice: `Rs. ${799 + (i * 50) % 600}`,
    heroImage: `https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop&random=${i}`,
    summary: `The highly anticipated next generation ${brand} smartphone is expected to feature incredible advancements in camera and battery technology.`,
    specs: [
      { category: "Display", details: "120Hz LTPO OLED" },
      { category: "Processor", details: "Next-gen flagship chipset" },
      { category: "Camera", details: "50MP Primary + Advanced Telephoto" }
    ],
    tags: [brand, isFoldable ? "Foldable" : "Flagship"]
  };
});

export function getAllUpcoming() {
  return MOCK_UPCOMING.sort((a, b) => new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime());
}

export function getUpcomingBySlug(slug: string) {
  return MOCK_UPCOMING.find(p => p.slug === slug);
}
