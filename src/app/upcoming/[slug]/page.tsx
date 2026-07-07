import { notFound } from "next/navigation";
import { getUpcomingBySlug, getAllUpcoming } from "@/lib/upcoming";
import { UpcomingDetailClient } from "./UpcomingDetailClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const phone = getUpcomingBySlug(resolvedParams.slug);
  
  if (!phone) return { title: "Upcoming Phone Not Found" };

  return {
    title: `${phone.name} Leaks, Rumors & Release Date | MobileHub Pro`,
    description: phone.summary,
    openGraph: {
      title: `${phone.name} - Upcoming Leaks`,
      description: phone.summary,
      images: [phone.heroImage],
      type: "website"
    }
  };
}

export async function generateStaticParams() {
  const upcoming = getAllUpcoming();
  return upcoming.map((phone) => ({
    slug: phone.slug,
  }));
}

export default async function UpcomingDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const phone = getUpcomingBySlug(resolvedParams.slug);

  if (!phone) {
    notFound();
  }

  return <UpcomingDetailClient phone={phone} />;
}
