"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function BrandTabs() {
  const [activeTab, setActiveTab] = useState("all-phones");

  const tabs = [
    { id: "all-phones", label: "All phones", href: "#all-phones" },
    { id: "flagships", label: "Flagships", href: "#all-phones" }, // Reuses phone section but with filter in a real app
    { id: "series", label: "Browse Series", href: "#series" },
    { id: "upcoming", label: "Upcoming", href: "#upcoming" },
    { id: "news", label: "News", href: "#news" },
    { id: "about", label: "About", href: "#about" }
  ];

  // Basic smooth scroll and intersection observer simulation
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.querySelector(href);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; // offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[60px] z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-[28px] overflow-x-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto flex">
        {tabs.map(tab => (
          <a
            key={tab.id}
            href={tab.href}
            onClick={(e) => handleTabClick(e, tab.id, tab.href)}
            className={`relative px-[16px] py-[12px] text-[12px] font-[500] whitespace-nowrap transition-colors ${
              activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeBrandTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 dark:bg-blue-500"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
