"use client";

import { motion } from "framer-motion";
import { Camera, Battery, Gamepad2, DollarSign, Crown, FoldHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CategoryGrid() {
  const categories = [
    { name: "Best Camera", desc: "Photography kings", count: "48 phones", icon: Camera, href: "/phones?tag=camera", gradient: "from-violet-500 to-purple-600", light: "bg-white border-2 border-violet-200 shadow-lg shadow-violet-100", iconBg: "bg-gradient-to-br from-violet-400 to-purple-600", iconColor: "text-white" },
    { name: "Battery Life", desc: "All-day powerhouses", count: "62 phones", icon: Battery, href: "/phones?tag=battery", gradient: "from-emerald-500 to-green-600", light: "bg-white border-2 border-emerald-200 shadow-lg shadow-emerald-100", iconBg: "bg-gradient-to-br from-emerald-400 to-teal-600", iconColor: "text-white" },
    { name: "Gaming Phones", desc: "Performance beasts", count: "34 phones", icon: Gamepad2, href: "/phones?tag=gaming", gradient: "from-rose-500 to-red-600", light: "bg-white border-2 border-rose-200 shadow-lg shadow-rose-100", iconBg: "bg-gradient-to-br from-rose-400 to-red-600", iconColor: "text-white" },
    { name: "Budget Picks", desc: "Best bang for buck", count: "112 phones", icon: DollarSign, href: "/phones?tag=budget", gradient: "from-amber-500 to-orange-500", light: "bg-white border-2 border-amber-200 shadow-lg shadow-amber-100", iconBg: "bg-gradient-to-br from-amber-400 to-orange-500", iconColor: "text-white" },
    { name: "Flagships", desc: "No compromise", count: "28 phones", icon: Crown, href: "/phones?tag=flagships", gradient: "from-indigo-500 to-blue-600", light: "bg-white border-2 border-indigo-200 shadow-lg shadow-indigo-100", iconBg: "bg-gradient-to-br from-indigo-400 to-blue-600", iconColor: "text-white" },
    { name: "Foldables", desc: "Future form factor", count: "16 phones", icon: FoldHorizontal, href: "/phones?tag=foldables", gradient: "from-cyan-500 to-teal-500", light: "bg-white border-2 border-sky-200 shadow-lg shadow-sky-100", iconBg: "bg-gradient-to-br from-sky-400 to-cyan-600", iconColor: "text-white" },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 w-full border-t border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-5 max-w-7xl">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[14px] font-[900] text-emerald-500 uppercase tracking-widest mb-2">Browse by need</p>
            <h2 className="text-[32px] md:text-[40px] font-[900] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 tracking-tight leading-tight">Shop by category</h2>
          </div>
          <Link href="/phones" className="hidden md:flex items-center gap-1.5 text-[14px] font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
            View all phones <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link href={cat.href} className={`flex flex-col p-6 rounded-3xl cursor-pointer hover:-translate-y-2 transition-all duration-300 group ${cat.light}`}>
                <div className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                  <cat.icon className={`h-6 w-6 ${cat.iconColor}`} />
                </div>
                <h3 className="text-[17px] font-[900] text-zinc-900 dark:text-zinc-100 leading-tight mb-1 group-hover:text-violet-600 transition-colors">{cat.name}</h3>
                <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 mb-3">{cat.desc}</p>
                <span className={`text-[12px] font-[800] text-zinc-800 mt-auto opacity-70 group-hover:opacity-100 transition-opacity`}>{cat.count} <ArrowRight className="inline-block w-3 h-3 ml-1" /></span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
