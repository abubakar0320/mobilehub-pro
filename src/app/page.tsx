import { HeroSection } from "@/components/home/HeroSection";
import { TrendingTicker } from "@/components/home/TrendingTicker";
import { BrandsRow } from "@/components/home/BrandsRow";
import { PhoneGrid } from "@/components/home/PhoneGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AiFinderSection } from "@/components/home/AiFinderSection";
import { CompareWidget } from "@/components/home/CompareWidget";
import { UpcomingSection } from "@/components/home/UpcomingSection";
import { NewsSection } from "@/components/home/NewsSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1 flex flex-col items-center w-full">
        <HeroSection />
        <TrendingTicker />
        <BrandsRow />
        <PhoneGrid />
        <CategoryGrid />
        <AiFinderSection />
        <CompareWidget />
        <UpcomingSection />
        <NewsSection />
      </main>
    </div>
  );
}
