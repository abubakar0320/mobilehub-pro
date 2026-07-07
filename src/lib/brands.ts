import { Brand } from "@/types/brand";

const baseBrands: Brand[] = [
  {
    _id: "brand-samsung",
    name: "Samsung",
    slug: "samsung",
    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300&auto=format&fit=crop",
    tagline: "South Korea's global tech giant — makers of Galaxy.",
    country: "South Korea",
    founded: 1969,
    hq: "Suwon-si",
    ceo: "Jong-Hee Han",
    website: "https://samsung.com",
    os: "Android",
    ui: "One UI",
    about: "Samsung is a global leader in technology...",
    popularFor: ["Flagship cameras", "Foldables", "AMOLED displays"],
    marketShare: 22,
    stats: { totalPhones: 612, avgRating: 4.6, newThisYear: 18, upcomingCount: 4 },
    series: [
      { name: "Galaxy S", slug: "galaxy-s", phoneCount: 45, icon: "Crown" },
      { name: "Galaxy Z", slug: "galaxy-z", phoneCount: 12, icon: "FoldHorizontal" }
    ],
    socialLinks: { twitter: "samsungmobile" },
    region: 'Global Giants'
  },
  {
    _id: "brand-apple",
    name: "Apple",
    slug: "apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&auto=format&fit=crop",
    tagline: "Think different. Creators of the iPhone.",
    country: "USA",
    founded: 1976,
    hq: "Cupertino",
    ceo: "Tim Cook",
    website: "https://apple.com",
    os: "iOS",
    ui: "iOS",
    about: "Apple revolutionized the smartphone industry...",
    popularFor: ["Premium build", "iOS Ecosystem"],
    marketShare: 20,
    stats: { totalPhones: 42, avgRating: 4.8, newThisYear: 4, upcomingCount: 1 },
    series: [
      { name: "iPhone Pro Max", slug: "pro-max", phoneCount: 6, icon: "Crown" }
    ],
    socialLinks: { twitter: "apple" },
    region: 'Global Giants'
  },
  {
    _id: "brand-google",
    name: "Google",
    slug: "google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=300&auto=format&fit=crop",
    tagline: "The purest Android experience.",
    country: "USA",
    founded: 1998,
    hq: "Mountain View",
    ceo: "Sundar Pichai",
    website: "https://store.google.com",
    os: "Android",
    ui: "Pixel UI",
    about: "Google Pixel phones showcase the best of Android...",
    popularFor: ["Computational photography", "Clean Android"],
    marketShare: 4,
    stats: { totalPhones: 28, avgRating: 4.5, newThisYear: 3, upcomingCount: 2 },
    series: [
      { name: "Pixel Pro", slug: "pixel-pro", phoneCount: 5, icon: "Crown" }
    ],
    socialLinks: { twitter: "madebygoogle" },
    region: 'Global Giants'
  },
  {
    _id: "brand-xiaomi",
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "https://images.unsplash.com/photo-1620025997087-735f11818d6a?q=80&w=300&auto=format&fit=crop",
    tagline: "Innovation for everyone.",
    country: "China",
    founded: 2010,
    hq: "Beijing",
    ceo: "Lei Jun",
    website: "https://mi.com",
    os: "Android",
    ui: "HyperOS",
    about: "Xiaomi has rapidly grown into one of the world's top smartphone manufacturers...",
    popularFor: ["Value for money", "Fast charging"],
    marketShare: 14,
    stats: { totalPhones: 450, avgRating: 4.4, newThisYear: 24, upcomingCount: 5 },
    series: [
      { name: "Xiaomi", slug: "xiaomi", phoneCount: 80, icon: "Crown" }
    ],
    socialLinks: { twitter: "xiaomi" },
    region: 'Chinese Brands'
  },
  {
    _id: "brand-oneplus",
    name: "OnePlus",
    slug: "oneplus",
    logo: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop",
    tagline: "Never Settle.",
    country: "China",
    founded: 2013,
    hq: "Shenzhen",
    ceo: "Pete Lau",
    website: "https://oneplus.com",
    os: "Android",
    ui: "OxygenOS",
    about: "Originally known as the flagship killer...",
    popularFor: ["Fast & Smooth", "OxygenOS"],
    marketShare: 3,
    stats: { totalPhones: 56, avgRating: 4.5, newThisYear: 6, upcomingCount: 1 },
    series: [
      { name: "Number Series", slug: "flagship", phoneCount: 22, icon: "Crown" }
    ],
    socialLinks: { twitter: "oneplus" },
    region: 'Chinese Brands'
  }
];

const extraBrandNames = ["Motorola", "Oppo", "Vivo", "Sony", "Asus", "Nokia", "Realme", "Honor", "Huawei"];

export const MOCK_BRANDS: Brand[] = [
  ...baseBrands,
  ...extraBrandNames.map((name, i) => ({
    _id: `brand-${name.toLowerCase()}`,
    name,
    slug: name.toLowerCase(),
    logo: `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop&random=${i+100}`,
    tagline: `Connecting the world with ${name}.`,
    country: "Global",
    founded: 2000 + i,
    hq: "Global HQ",
    ceo: "John Doe",
    website: `https://${name.toLowerCase()}.com`,
    os: "Android" as "Android" | "iOS" | "Other",
    ui: "Custom UI",
    about: `A globally recognized brand producing competitive smartphones.`,
    popularFor: ["Innovation", "Design"],
    marketShare: 1 + (i % 5),
    stats: { totalPhones: 50 + i * 20, avgRating: 4.0 + (i%10)/10, newThisYear: i + 5, upcomingCount: i % 3 },
    series: [
      { name: "Flagship", slug: "flagship", phoneCount: 10 + i, icon: "Crown" }
    ],
    socialLinks: { twitter: name.toLowerCase() },
    region: 'Others' as any
  }))
];

export function getAllBrands() {
  return MOCK_BRANDS;
}

export function getBrandBySlug(slug: string) {
  return MOCK_BRANDS.find(b => b.slug === slug);
}
