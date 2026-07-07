"use client";

import { motion } from "framer-motion";

const BRANDS = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Google", logo: "G" },
  { name: "Xiaomi", logo: "Mi" },
  { name: "OnePlus", logo: "1+" },
  { name: "Vivo", logo: "V" },
  { name: "Oppo", logo: "O" },
  { name: "Realme", logo: "R" },
];

export function PopularBrands() {
  return (
    <section className="py-20 border-b border-border/40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Brands</h2>
          <p className="text-muted-foreground">Explore devices from your favorite manufacturers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform text-foreground">
                {brand.logo}
              </div>
              <span className="font-medium text-sm">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
