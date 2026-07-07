import { Star, Share2, Heart, Scale, Cpu, Battery, Camera, Smartphone as Display, Wifi, Layers, MemoryStick, Droplets, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";
import { notFound } from "next/navigation";
import { PhoneData } from "@/lib/phones";

async function getPhone(slug: string): Promise<PhoneData | null> {
  // In a real app, you would fetch from DB directly here in a Server Component,
  // or call the full absolute URL of your Next.js API.
  // For this environment, we'll import the mock data directly to avoid absolute URL fetch issues during build.
  const { MOCK_PHONES } = await import('@/lib/mock-data');
  return MOCK_PHONES.find((p) => p.slug === slug) || null;
}

export default async function PhoneDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const phone = await getPhone(resolvedParams.slug);
  
  if (!phone) {
    notFound();
  }

  // Generate generic Pros and Cons based on the specs
  const pros = [
    phone.specs.performance.benchmarks.antutu > 1000000 ? "Incredible flagship performance" : "Solid mid-range performance",
    phone.specs.cameraDeep.main.mp >= 100 ? "Exceptional high-res camera system" : "Reliable primary camera",
    phone.specs.display.refreshRate >= 120 ? "Buttery smooth 120Hz display" : "Good screen quality",
    phone.specs.batteryDeep.capacity >= 5000 ? "Massive multi-day battery" : "All-day battery life"
  ];
  
  const cons = [
    phone.price.usd > 1000 ? "Very expensive" : "Moderate pricing",
    phone.specs.weight > 200 ? "Large and heavy" : "Lacks premium weight feel",
    !phone.specs.cameraDeep.telephoto.ois ? "Lacks telephoto OIS" : "Camera bump is large"
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 aspect-square flex items-center justify-center relative overflow-hidden p-8 rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={phone.images.main} 
              alt={phone.model} 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                <Heart className="h-5 w-5 text-slate-500 hover:text-red-500 transition-colors" />
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-md shadow-sm">
                <Share2 className="h-5 w-5 text-slate-500 hover:text-blue-600 transition-colors" />
              </Button>
            </div>
          </div>
          {/* Thumbnails placeholder */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 w-24 bg-slate-50 border border-slate-200 rounded-xl flex-shrink-0 cursor-pointer hover:border-blue-500 transition-all"></div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-semibold text-blue-600 uppercase tracking-wider">{phone.brand}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">{phone.model}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" /> {phone.rating.average.toFixed(1)} Expert Rating
            </div>
            <span className="text-sm text-slate-500 underline cursor-pointer">{phone.rating.count.toLocaleString()} User Reviews</span>
          </div>
          
          <div className="text-4xl font-extrabold text-slate-900 mb-6 flex items-end gap-3">
            Rs. {(phone.price.usd * 280).toLocaleString()}
            {phone.price.original && (
              <span className="text-2xl text-slate-400 line-through mb-1">${phone.price.original}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{phone.specs.software.os}</span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{phone.specs.weight}g Weight</span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">{phone.specs.ipRating} Water/Dust</span>
            {phone.specs.connectivity.has5g && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">5G Ready</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
              <Cpu className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Processor</div>
                <div className="font-semibold text-slate-900">{phone.specs.chipset}</div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
              <Battery className="h-6 w-6 text-emerald-600 mt-1" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Battery</div>
                <div className="font-semibold text-slate-900">{phone.specs.batteryDeep.capacity} mAh</div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
              <Camera className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Camera</div>
                <div className="font-semibold text-slate-900 line-clamp-2">{phone.specs.cameraDeep.main.mp}MP Primary</div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-start gap-3">
              <Display className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Display</div>
                <div className="font-semibold text-slate-900 line-clamp-2">{phone.specs.display.size}" {phone.specs.display.type}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <CheckoutButton phone={phone} />
            <Button size="lg" variant="outline" className="flex-1 rounded-xl text-md h-14 gap-2 border-slate-300 hover:bg-slate-50 text-slate-700">
              <Scale className="h-5 w-5" /> Compare
            </Button>
          </div>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[24px]">
          <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
            Reasons to buy
          </h3>
          <ul className="space-y-4">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-emerald-900">
                <span className="h-6 w-6 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-8 rounded-[24px]">
          <h3 className="text-2xl font-bold text-rose-700 mb-6 flex items-center gap-2">
            Reasons to avoid
          </h3>
          <ul className="space-y-4">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-3 text-lg text-rose-900">
                <span className="h-6 w-6 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detailed Specifications Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Detailed Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Performance */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Cpu className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Performance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Processor</div>
                <div className="font-semibold text-slate-900">{phone.specs.performance.processor}</div>
                <div className="text-sm text-slate-600">{phone.specs.chipset}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">RAM</div>
                <div className="font-semibold text-slate-900">{phone.specs.performance.ram} GB</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Antutu Benchmark</div>
                <div className="font-semibold text-slate-900">{phone.specs.performance.benchmarks.antutu.toLocaleString()} Score</div>
              </div>
            </div>
          </div>

          {/* Display */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Display className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Display</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Screen Size & Type</div>
                <div className="font-semibold text-slate-900">{phone.specs.display.size} inches, {phone.specs.display.type}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Refresh Rate</div>
                <div className="font-semibold text-slate-900">{phone.specs.display.refreshRate} Hz</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Resolution & Brightness</div>
                <div className="font-semibold text-slate-900">{phone.specs.display.resolution}</div>
                <div className="text-sm text-slate-600">{phone.specs.display.brightness} nits peak brightness</div>
              </div>
            </div>
          </div>

          {/* Camera */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Camera className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Camera</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Main Camera</div>
                <div className="font-semibold text-slate-900">{phone.specs.cameraDeep.main.mp} MP, {phone.specs.cameraDeep.main.aperture}</div>
                <div className="text-sm text-slate-600">{phone.specs.cameraDeep.main.ois ? 'Optical Image Stabilization (OIS)' : 'No OIS'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Ultrawide & Telephoto</div>
                <div className="font-semibold text-slate-900">{phone.specs.cameraDeep.ultrawide.mp}MP UW + {phone.specs.cameraDeep.telephoto.mp}MP Tele</div>
                <div className="text-sm text-slate-600">{phone.specs.cameraDeep.telephoto.zoom}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Video Recording</div>
                <div className="font-semibold text-slate-900">{phone.specs.cameraDeep.video}</div>
              </div>
            </div>
          </div>

          {/* Battery */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Battery className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Battery</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Capacity & Type</div>
                <div className="font-semibold text-slate-900">{phone.specs.batteryDeep.capacity} mAh, {phone.specs.batteryDeep.type}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Fast Charging</div>
                <div className="font-semibold text-slate-900">{phone.specs.batteryDeep.fastCharging}W Wired</div>
                <div className="text-sm text-slate-600">{phone.specs.batteryDeep.wireless}W Wireless</div>
              </div>
            </div>
          </div>

          {/* Connectivity */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Wifi className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Connectivity</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Network</div>
                <div className="font-semibold text-slate-900">{phone.specs.connectivity.has5g ? '5G Supported' : '4G LTE'}</div>
                <div className="text-sm text-slate-600">{phone.specs.connectivity.dualSim ? 'Dual SIM' : 'Single SIM'}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Wireless</div>
                <div className="font-semibold text-slate-900">{phone.specs.connectivity.wifi}</div>
                <div className="text-sm text-slate-600">{phone.specs.connectivity.nfc ? 'NFC Enabled' : 'No NFC'}</div>
              </div>
            </div>
          </div>

          {/* Design & Software */}
          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Layers className="h-6 w-6" /></div>
              <h3 className="text-xl font-bold text-slate-900">Design & OS</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500 mb-1">Operating System</div>
                <div className="font-semibold text-slate-900">{phone.specs.software.os}</div>
                <div className="text-sm text-slate-600">{phone.specs.software.updateYears} Years of Updates</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Build & Durability</div>
                <div className="font-semibold text-slate-900">{phone.specs.ipRating} Water/Dust Resistance</div>
                <div className="text-sm text-slate-600">{phone.specs.weight}g Weight</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
