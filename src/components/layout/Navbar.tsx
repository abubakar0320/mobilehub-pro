"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    const navLinks = [
      { name: "Phones", href: "/phones" },
      { name: "Compare", href: "/compare" },
      { name: "Brands", href: "/brands" },
      { name: "Upcoming", href: "/upcoming" },
      { name: "News", href: "/news" },
      { name: "Developer", href: "/developer" },
    ];

  return (
    <nav className={`sticky top-0 z-50 w-full h-[64px] flex items-center transition-all duration-300 ${
      scrolled
        ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b-2 border-transparent [border-image:linear-gradient(to_right,#8b5cf6,#ec4899,#f59e0b)_1] shadow-sm"
        : "bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900"
    }`}>
      <div className="container mx-auto px-5 max-w-7xl flex items-center justify-between w-full">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <Image src="/logo.png" alt="MobileHub Pro" width={32} height={32} className="rounded-[7px] group-hover:scale-105 transition-transform" />
          <span className="text-[15px] font-[800] tracking-tight text-zinc-900 dark:text-zinc-100">
            MobileHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Pro</span>
          </span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[13.5px] font-bold px-3 py-1.5 rounded-xl transition-all ${
                item.name === "Developer" 
                ? "text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]" 
                : "text-zinc-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2.5">
          <SearchBar />
          <Link
            href="/ai-advisor"
            className="hidden sm:flex items-center gap-1.5 text-[13px] font-[800] text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-3 py-1.5 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all shadow-sm"
          >
            <span className="text-[11px] text-amber-500">✦</span> AI Advisor
          </Link>
          <Button className="hidden sm:flex h-8 px-4 text-[13px] font-[800] rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white hover:scale-105 transition-transform border-0 shadow-md shadow-pink-200">
            Sign up
          </Button>
          <button
            className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-white dark:bg-zinc-950 border-b-2 border-transparent [border-image:linear-gradient(to_right,#8b5cf6,#ec4899,#f59e0b)_1] md:hidden flex flex-col py-4 px-5 gap-1 z-40 shadow-xl">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-[15px] font-[800] py-2.5 px-3 rounded-xl transition-colors ${
                item.name === "Developer"
                ? "text-emerald-600 bg-emerald-50"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-zinc-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/ai-advisor" onClick={() => setIsMobileMenuOpen(false)}
            className="text-[15px] font-[800] py-2.5 px-3 rounded-xl text-amber-600 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:hover:bg-amber-950/40 mt-1"
          >
            ✦ AI Advisor
          </Link>
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" className="w-full justify-center h-10 border-zinc-300 dark:border-zinc-700 font-[800]">Sign in</Button>
            <Button className="w-full justify-center h-10 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white border-0 font-[800] shadow-md">Get started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
