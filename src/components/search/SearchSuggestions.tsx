import Image from 'next/image'
import Link from 'next/link'

interface SearchSuggestionProps {
  phone: {
    _id: string
    shortName: string
    brand: string
    slug: string
    images: { thumbnail: string }
    price: { usd: number }
  }
  onClick?: () => void
}

export function SearchSuggestion({ phone, onClick }: SearchSuggestionProps) {
  return (
    <Link href={`/phones/${phone.slug}`}
       onClick={onClick}
       className="flex items-center gap-3 px-4 py-2.5
                  hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      
      {/* Real phone image — not an icon */}
      <div className="w-10 h-10 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg
                      flex items-center justify-center overflow-hidden relative">
        {phone.images?.thumbnail ? (
          <Image
            src={phone.images.thumbnail}
            alt={phone.shortName}
            fill
            className="object-contain p-1"
          />
        ) : (
          <span className="text-lg font-bold text-slate-300 dark:text-slate-600">
            {phone.brand?.charAt(0)}
          </span>
        )}
      </div>

      {/* Name + brand */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          {phone.shortName}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">{phone.brand}</p>
      </div>

      {/* Price */}
      {phone.price?.usd && (
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-500 flex-shrink-0">
          Rs. {(phone.price.usd * 280).toLocaleString()}
        </span>
      )}
    </Link>
  )
}
