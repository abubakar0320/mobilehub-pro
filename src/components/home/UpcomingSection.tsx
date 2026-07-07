export function UpcomingSection() {
  const upcoming = [
    { name: "iPhone 17 Pro", brand: "Apple", expected: "Sep 2026", badge: "Leaks available" },
    { name: "Galaxy S26 Ultra", brand: "Samsung", expected: "Jan 2027", badge: "Rumors" },
    { name: "Pixel 10 Pro", brand: "Google", expected: "Oct 2025", badge: "Official teaser" },
    { name: "OnePlus 14", brand: "OnePlus", expected: "Feb 2026", badge: "Leaks available" },
    { name: "Xiaomi 16 Ultra", brand: "Xiaomi", expected: "Apr 2026", badge: "Rumors" }
  ];

  return (
    <section className="py-[48px] bg-white w-full border-t border-[#E2E8F0]">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-[24px] font-[700] text-[#0F172A] mb-8">Upcoming launches</h2>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4">
          {upcoming.map(phone => (
            <div 
              key={phone.name}
              className="bg-white border border-[#E2E8F0] rounded-[12px] p-[16px] min-w-[220px] flex-shrink-0"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[15px] font-[600] text-[#0F172A] leading-tight max-w-[120px]">{phone.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                  phone.badge === 'Official teaser' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {phone.badge}
                </span>
              </div>
              <p className="text-[12px] text-[#64748B] mb-4">{phone.brand}</p>
              <div className="text-[12px] text-[#94A3B8] font-medium border-t border-[#E2E8F0] pt-3">
                Expected: {phone.expected}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
