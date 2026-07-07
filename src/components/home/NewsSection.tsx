"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const newsData = [
  {
    title: "Samsung Galaxy S26 Early Leaks Show Radical Redesign",
    excerpt: "Next year's flagship might completely ditch the current camera rings for a unified module design.",
    category: "Samsung",
    categoryColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop",
    time: "2 hours ago",
    slug: "samsung-galaxy-s26-early-leaks",
    featured: true
  },
  {
    title: "iOS 19 Code References Massive Siri Overhaul",
    excerpt: "Hidden inside the latest developer beta are hints that Siri will finally get true conversational AI.",
    category: "Apple",
    categoryColor: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500&auto=format&fit=crop",
    time: "5 hours ago",
    slug: "ios-19-siri-overhaul",
    featured: false
  },
  {
    title: "Xiaomi 15 Ultra to Feature 200MP Telephoto Lens",
    excerpt: "The upcoming photography monster from Xiaomi is rumored to break zoom records entirely.",
    category: "Android",
    categoryColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop",
    time: "1 day ago",
    slug: "xiaomi-15-ultra-telephoto",
    featured: false
  },
];

export function NewsSection() {
  const tabs = ["All", "Android", "Apple", "Samsung", "AI", "Software"];
  const [activeTab, setActiveTab] = useState("All");
  const featured = newsData[0];
  const rest = newsData.slice(1);

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 w-full border-t border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-5 max-w-7xl">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[13px] font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-1">News & Reviews</p>
            <h2 className="text-[32px] md:text-[40px] font-[800] text-zinc-900 dark:text-zinc-100 tracking-tight">Latest from the tech world</h2>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-1 text-[14px] font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
            All news <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-1 mb-8 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[13px] font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Featured + Side */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <Link href={`/news/${featured.slug}`} className="block group">
              <div className="relative h-[260px] md:h-[320px] w-full rounded-2xl overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                <span className={`absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${featured.categoryColor}`}>
                  {featured.category}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-[20px] font-[800] text-white leading-tight mb-2">{featured.title}</h3>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-[12px]">
                    <Clock className="h-3 w-3" /> {featured.time}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/news/${article.slug}`} className="flex gap-4 group bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl p-4 transition-colors">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${article.categoryColor} inline-block mb-1.5`}>
                      {article.category}
                    </span>
                    <h3 className="text-[14px] font-[700] text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-2 mb-1.5">{article.title}</h3>
                    <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                      <Clock className="h-3 w-3" /> {article.time}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
