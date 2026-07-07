import Image from "next/image";
import { PhoneData } from "@/lib/phones";
import { SpecRow } from "./SpecRow";

export function SpecTable({
  phones,
  winners
}: {
  phones: PhoneData[],
  winners: Record<string, string>
}) {
  if (phones.length === 0) return null;

  // Helper for category headers
  const CategoryHeader = ({ title }: { title: string }) => (
    <div className="flex min-w-max md:min-w-0 border-t-2 border-zinc-200 dark:border-zinc-700 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
      <div className="w-[140px] md:w-[180px] flex-shrink-0 sticky left-0 bg-zinc-50 dark:bg-zinc-800/50 p-[12px] flex items-center shadow-[1px_0_0_#F1F5F9] dark:shadow-[1px_0_0_#1E293B] z-10">
        <span className="text-[12px] font-[600] text-violet-600 dark:text-violet-500 uppercase tracking-wider">{title}</span>
      </div>
      {phones.map(phone => (
        <div key={`cat-${phone._id}`} className="flex-1 min-w-[120px] border-r border-zinc-200 dark:border-zinc-800 last:border-r-0"></div>
      ))}
    </div>
  );

  return (
    <div className="mx-[24px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[12px] overflow-hidden mb-[32px] compare-table-container">
      <div className="overflow-x-auto hide-scrollbar">
        
        {/* Table Header (Phones) */}
        <div className="flex min-w-max md:min-w-0 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="w-[140px] md:w-[180px] flex-shrink-0 sticky left-0 bg-white dark:bg-zinc-900 p-[12px] shadow-[1px_0_0_#F1F5F9] dark:shadow-[1px_0_0_#1E293B] z-20"></div>
          
          {phones.map((phone) => (
            <div key={`header-${phone._id}`} className="flex-1 min-w-[120px] p-[16px] flex flex-col items-center justify-center border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 relative bg-white dark:bg-zinc-900">
              <div className="h-[60px] w-[60px] bg-zinc-100 dark:bg-zinc-800 rounded-[8px] relative flex items-center justify-center p-2 mb-2">
                <Image src={phone.images.main} alt={phone.model} fill className="object-contain" />
              </div>
              <h3 className="text-[12px] font-[600] text-zinc-900 dark:text-zinc-100 text-center line-clamp-2 min-h-[36px]">{phone.model}</h3>
              <div className="text-[13px] font-[700] text-violet-600 dark:text-violet-500 text-center mt-1">
                Rs. {(phone.price.usd * 280).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* SPECIFICATIONS */}

        <CategoryHeader title="Display" />
        <SpecRow label="Size (inches)" categoryKey="display" phones={phones} winners={winners} getValue={p => p.specs.display.size} />
        <SpecRow label="Type" categoryKey="display" phones={phones} winners={winners} getValue={p => p.specs.display.type} />
        <SpecRow label="Resolution" categoryKey="display" phones={phones} winners={winners} getValue={p => p.specs.display.resolution} />
        <SpecRow label="Refresh Rate" categoryKey="display" phones={phones} winners={winners} getValue={p => `${p.specs.display.refreshRate}Hz`} />
        <SpecRow label="Peak Brightness" categoryKey="display" phones={phones} winners={winners} getValue={p => `${p.specs.display.brightness} nits`} />
        <SpecRow label="Pixel Density" categoryKey="display" phones={phones} winners={winners} getValue={p => `${p.specs.display.ppi} ppi`} />

        <CategoryHeader title="Performance" />
        <SpecRow label="Processor" categoryKey="performance" phones={phones} winners={winners} getValue={p => p.specs.performance.processor} />
        <SpecRow label="RAM" categoryKey="performance" phones={phones} winners={winners} getValue={p => `${p.specs.performance.ram} GB`} />
        <SpecRow label="Geekbench (Multi)" categoryKey="performance" phones={phones} winners={winners} getValue={p => p.specs.performance.benchmarks.geekbench6Multi} />
        <SpecRow label="Geekbench (Single)" categoryKey="performance" phones={phones} winners={winners} getValue={p => p.specs.performance.benchmarks.geekbench6Single} />
        <SpecRow label="AnTuTu Score" categoryKey="performance" phones={phones} winners={winners} getValue={p => p.specs.performance.benchmarks.antutu.toLocaleString()} />

        <CategoryHeader title="Camera" />
        <SpecRow label="Main Sensor" categoryKey="camera" phones={phones} winners={winners} getValue={p => `${p.specs.cameraDeep.main.mp} MP, ${p.specs.cameraDeep.main.aperture}`} />
        <SpecRow label="Main OIS" categoryKey="camera" phones={phones} winners={winners} getValue={p => p.specs.cameraDeep.main.ois} />
        <SpecRow label="Ultrawide" categoryKey="camera" phones={phones} winners={winners} getValue={p => `${p.specs.cameraDeep.ultrawide.mp} MP, ${p.specs.cameraDeep.ultrawide.angle}°`} />
        <SpecRow label="Telephoto" categoryKey="camera" phones={phones} winners={winners} getValue={p => p.specs.cameraDeep.telephoto.mp > 0 ? `${p.specs.cameraDeep.telephoto.mp} MP (${p.specs.cameraDeep.telephoto.zoom})` : 'None'} />
        <SpecRow label="Front Camera" categoryKey="camera" phones={phones} winners={winners} getValue={p => `${p.specs.cameraDeep.front.mp} MP`} />
        <SpecRow label="Max Video" categoryKey="camera" phones={phones} winners={winners} getValue={p => p.specs.cameraDeep.video} />

        <CategoryHeader title="Battery & Charging" />
        <SpecRow label="Capacity" categoryKey="battery" phones={phones} winners={winners} getValue={p => `${p.specs.batteryDeep.capacity} mAh`} />
        <SpecRow label="Fast Charging" categoryKey="battery" phones={phones} winners={winners} getValue={p => `${p.specs.batteryDeep.fastCharging}W`} />
        <SpecRow label="Wireless Charging" categoryKey="battery" phones={phones} winners={winners} getValue={p => p.specs.batteryDeep.wireless > 0 ? `${p.specs.batteryDeep.wireless}W` : 'No'} />
        
        <CategoryHeader title="Software & Connectivity" />
        <SpecRow label="Operating System" categoryKey="software" phones={phones} winners={winners} getValue={p => p.specs.software.os} />
        <SpecRow label="Update Guarantee" categoryKey="software" phones={phones} winners={winners} getValue={p => `${p.specs.software.updateYears} Years`} />
        <SpecRow label="Wi-Fi Standard" categoryKey="software" phones={phones} winners={winners} getValue={p => p.specs.connectivity.wifi} />
        <SpecRow label="5G Support" categoryKey="software" phones={phones} winners={winners} getValue={p => p.specs.connectivity.has5g} />
        <SpecRow label="NFC" categoryKey="software" phones={phones} winners={winners} getValue={p => p.specs.connectivity.nfc} />

        <CategoryHeader title="Design & Build" />
        <SpecRow label="Weight" categoryKey="design" phones={phones} winners={winners} getValue={p => `${p.specs.weight} g`} />
        <SpecRow label="IP Rating" categoryKey="design" phones={phones} winners={winners} getValue={p => p.specs.ipRating} />

      </div>
    </div>
  );
}
