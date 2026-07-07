import Image from 'next/image'
import { Check, Scale } from 'lucide-react'
import { CheckoutButton } from "@/components/checkout/CheckoutButton"

interface PhoneCardProps {
  phone: {
    _id: string
    name?: string
    shortName?: string
    brand: string
    slug: string
    images: { main: string; thumbnail?: string }
    price: { usd: number; original?: number }
    rating: { average: number; count: number }
    specs: { ram: number; storage: number; battery: number }
    badges: string[]
  }
  isCompareAdded?: boolean
  onCompareToggle?: () => void
}

export function PhoneCard({ phone, isCompareAdded, onCompareToggle }: PhoneCardProps) {
  return (
    <div className="bg-white border-2 border-zinc-200 rounded-3xl overflow-hidden
                    hover:border-fuchsia-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-100/50
                    dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-fuchsia-500">

      {/* Image area */}
      <div className="relative bg-zinc-50 dark:bg-zinc-800 aspect-square">
        {phone.images?.thumbnail || phone.images?.main ? (
          <Image
            src={phone.images.thumbnail || phone.images.main}
            alt={phone.name || phone.shortName || (phone as any).model || "Phone image"}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 50vw, 25vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgo="
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-zinc-300 dark:text-zinc-600">
              {phone.brand?.charAt(0)}
            </div>
            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{phone.shortName}</div>
          </div>
        )}

        {/* Badge */}
        {phone.badges && phone.badges[0] && (
          <span className={`absolute top-2 left-2 text-xs font-semibold
            px-2 py-0.5 rounded-md
            ${phone.badges[0] === 'new'    ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' :
              phone.badges[0] === 'hot'    ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
              phone.badges[0] === 'sale'   ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
              phone.badges[0] === 'award'  ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                                             'bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'}`}>
            {phone.badges[0].charAt(0).toUpperCase() + phone.badges[0].slice(1)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-0.5">
          {phone.brand}
        </p>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
          {phone.shortName || (phone as any).model}
        </h3>

        <div className="flex items-center gap-1 mt-1 mb-2">
          <span className="text-amber-400 text-xs">
            {'★'.repeat(Math.round(phone.rating?.average || 0))}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{phone.rating?.average || 0}</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">({phone.rating?.count || 0})</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-[11px] font-[800] bg-sky-50 border border-sky-200 text-sky-700
                           dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-400
                           px-2 py-0.5 rounded-lg">
            {phone.specs?.ram} GB
          </span>
          <span className="text-[11px] font-[800] bg-indigo-50 border border-indigo-200 text-indigo-700
                           dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400
                           px-2 py-0.5 rounded-lg">
            {phone.specs?.storage} GB
          </span>
          <span className="text-[11px] font-[800] bg-emerald-50 border border-emerald-200 text-emerald-700
                           dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400
                           px-2 py-0.5 rounded-lg">
            {phone.specs?.battery} mAh
          </span>
        </div>

        <div className="text-lg font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 mb-3 drop-shadow-sm">
          Rs. {(phone.price?.usd * 280).toLocaleString()}
        </div>

        <div className="flex gap-2 items-center">
          <button 
            onClick={onCompareToggle}
            title={isCompareAdded ? "Remove from compare" : "Add to compare"}
            className={`w-[36px] h-[36px] shrink-0 flex items-center justify-center rounded-xl border-2 transition-all ${
              isCompareAdded 
                ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 border-transparent text-white shadow-md' 
                : 'border-zinc-200 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500 hover:border-violet-300 hover:text-violet-500 hover:bg-violet-50'
            }`}
          >
            {isCompareAdded ? <Check className="w-5 h-5 font-bold" /> : <Scale className="w-4 h-4 font-bold" />}
          </button>
          <a href={`/phones/${phone.slug}`}
             className={`flex-1 text-[13px] border-2 rounded-xl h-[36px] transition-all flex items-center justify-center font-[800] border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 hover:border-fuchsia-300 hover:text-fuchsia-600 hover:bg-fuchsia-50 dark:hover:border-fuchsia-500`}>
            Details
          </a>
          <CheckoutButton phone={phone} variant="mini" />
        </div>
      </div>
    </div>
  )
}
