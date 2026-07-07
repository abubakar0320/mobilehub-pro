import { BrandCard } from "@/components/brands/BrandCard";
import { getAllBrands } from "@/lib/brands";

export const metadata = {
  title: "All Mobile Phone Brands | MobileHub Pro",
  description: "Explore all smartphone manufacturers. From global giants like Apple and Samsung to rising Chinese brands."
};

export default function BrandsPage() {
  const brands = getAllBrands();

  // Group by region
  const grouped = {
    'Global Giants': brands.filter(b => b.region === 'Global Giants'),
    'Chinese Brands': brands.filter(b => b.region === 'Chinese Brands'),
    'Others': brands.filter(b => b.region === 'Others')
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-[24px] max-w-7xl pt-[40px] pb-[80px]">
        
        <div className="text-center mb-[40px]">
          <h1 className="text-[36px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-[8px] drop-shadow-sm">All Brands</h1>
          <p className="text-[15px] font-[600] text-zinc-500 uppercase tracking-widest">Explore phones by manufacturer</p>
        </div>

        {Object.entries(grouped).map(([region, regionBrands]) => {
          if (regionBrands.length === 0) return null;
          return (
            <div key={region} className="mb-[40px]">
              <h2 className="text-[20px] font-[900] text-zinc-800 mb-[20px] pl-[12px] border-l-[4px] border-fuchsia-500 tracking-tight">
                {region}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px]">
                {regionBrands.map(brand => (
                  <BrandCard key={brand._id} brand={brand} />
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
