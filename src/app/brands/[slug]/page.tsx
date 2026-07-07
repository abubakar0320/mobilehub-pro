import { notFound } from "next/navigation";
import { getBrandBySlug, getAllBrands } from "@/lib/brands";
import { BrandClient } from "./BrandClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const brand = getBrandBySlug(resolvedParams.slug);
  
  if (!brand) return { title: "Brand Not Found" };

  return {
    title: `${brand.name} Phones — Full List, Specs & Prices | MobileHub Pro`,
    description: `Browse all ${brand.stats.totalPhones} ${brand.name} phones. View complete specs, compare models, check latest prices & upcoming launches.`,
    openGraph: {
      title: `${brand.name} Phones | MobileHub Pro`,
      description: brand.tagline,
      images: [brand.logo],
      type: "website"
    }
  };
}

// Generate static routes at build time for the top brands
export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandPage({ params }: Props) {
  const resolvedParams = await params;
  const brand = getBrandBySlug(resolvedParams.slug);

  if (!brand) {
    notFound();
  }

  return <BrandClient brand={brand} />;
}
