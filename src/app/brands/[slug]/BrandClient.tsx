"use client";

import { Brand } from "@/types/brand";
import { BrandHero } from "@/components/brands/BrandHero";
import { BrandStatBar } from "@/components/brands/BrandStatBar";
import { BrandTabs } from "@/components/brands/BrandTabs";
import { FeaturedPhones } from "@/components/brands/FeaturedPhones";
import { SeriesRow } from "@/components/brands/SeriesRow";
import { BrandPhoneGrid } from "@/components/brands/BrandPhoneGrid";
import { UpcomingRow } from "@/components/brands/UpcomingRow";
import { BrandNews } from "@/components/brands/BrandNews";
import { AboutSection } from "@/components/brands/AboutSection";
import useSWR from "swr";
import { fetcher } from "@/lib/phones";

export function BrandClient({ brand }: { brand: Brand }) {
  // We fetch the latest phones directly inside BrandPhoneGrid and FeaturedPhones (or pass down).
  // But for Featured, we can just fetch 2 flagships quickly here.
  const { data: featuredData } = useSWR(`/api/phones?brand=${brand.slug}&limit=2&sort=rating`, fetcher);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-[60px]">
      <BrandHero brand={brand} />
      <BrandStatBar stats={brand.stats} marketShare={brand.marketShare} />
      <BrandTabs />
      
      <FeaturedPhones phones={featuredData?.phones || []} brandSlug={brand.slug} />
      <SeriesRow series={brand.series} brandSlug={brand.slug} />
      <BrandPhoneGrid brandSlug={brand.slug} />
      <UpcomingRow brandSlug={brand.slug} />
      <BrandNews brandSlug={brand.slug} />
      <AboutSection brand={brand} />
    </div>
  );
}
