"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight, BarChart2 } from "lucide-react";

export function CompareWidget() {
  const preloaded = [
    { name: "iPhone 16 Pro", price: "Rs. 279,720", img: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=300&auto=format&fit=crop", brand: "Apple" },
    { name: "Galaxy S25 Ultra", price: "Rs. 280,299", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300&auto=format&fit=crop", brand: "Samsung" },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 w-full">
      <div className="container mx-auto px-5 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">Compare tool</p>
            <h2 className="text-[36px] md:text-[44px] font-[800] text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
              See them side by side. Decide with confidence.
            </h2>
            <p className="text-[16px] text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
              Our comparison engine puts every spec, benchmark, and feature side-by-side so you never buy the wrong phone again.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {["Full spec-by-spec breakdown", "Performance benchmark scores", "AI-powered overall winner verdict", "Share & export your comparison"].map(feat => (
                <div key={feat} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400" />
                  </div>
                  <span className="text-[14px] font-medium text-zinc-700 dark:text-zinc-300">{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/compare"
              className="inline-flex items-center gap-2 h-[48px] px-7 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-bold text-[15px] rounded-xl hover:from-violet-700 hover:to-indigo-600 transition-all"
            >
              <BarChart2 className="h-4 w-4" /> Open compare tool
            </Link>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xl shadow-zinc-100/80 dark:shadow-zinc-950/50">
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">Quick compare</span>
                <span className="text-[12px] text-zinc-400">2 phones selected</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {preloaded.map(p => (
                  <div key={p.name} className="flex flex-col items-center text-center bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3">
                    <div className="w-16 h-20 relative mb-2">
                      <Image src={p.img} alt={p.name} fill className="object-contain" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{p.brand}</span>
                    <span className="text-[12px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{p.name}</span>
                    <span className="text-[13px] font-bold text-violet-600 dark:text-violet-400 mt-1">{p.price}</span>
                  </div>
                ))}

                <div className="flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-800 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-3 cursor-pointer hover:border-violet-400 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center mb-2 group-hover:border-violet-400">
                    <Plus className="h-4 w-4 text-zinc-400 group-hover:text-violet-500" />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400 group-hover:text-violet-500">Add phone</span>
                </div>
              </div>

              <Link href="/compare?phones=phone-1,phone-2" className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-bold text-[14px] rounded-xl hover:from-violet-700 hover:to-indigo-600 transition-all">
                Compare now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
