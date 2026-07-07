"use client";

import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  ArrowRight,
  Zap,
  Shield,
  Star,
  Loader2,
  X,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ─── types ─── */
interface SearchResult {
  _id: string;
  model: string;
  brand: string;
  slug: string;
  images: { thumbnail?: string; main: string };
  price: { usd: number };
  rating: { average: number };
}

/* ─── Live Search Bar ─── */
function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced live search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/phones/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(Array.isArray(data) ? data : []);
          setIsOpen(true);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!query.trim()) return;
      setIsOpen(false);
      router.push(`/phones?q=${encodeURIComponent(query.trim())}`);
    },
    [query, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") { setIsOpen(false); inputRef.current?.blur(); }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  const clearQuery = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[640px]">
      {/* Input row */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative flex items-center h-[62px] rounded-2xl transition-all duration-300"
          style={{
            background: "var(--color-surface)",
            border: `2px solid ${isOpen && query.length >= 2 ? "var(--color-primary)" : "var(--color-border)"}`,
            boxShadow: isOpen && query.length >= 2
              ? "0 0 0 4px rgba(124,58,237,0.1), 0 8px 32px rgba(0,0,0,0.12)"
              : "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {/* Search icon / loader */}
          <div className="absolute left-5 flex items-center">
            {isLoading ? (
              <Loader2
                className="h-5 w-5 animate-spin"
                style={{ color: "var(--color-primary)" }}
              />
            ) : (
              <Search
                className="h-5 w-5"
                style={{ color: query ? "var(--color-primary)" : "var(--color-text-4)" }}
              />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0) setIsOpen(true); }}
            placeholder="Search any phone — iPhone 16 Pro, Galaxy S25..."
            className="flex-1 h-full pl-14 pr-[160px] outline-none bg-transparent text-[15px] font-[500] rounded-2xl"
            style={{ color: "var(--color-text-1)" }}
            autoComplete="off"
            spellCheck={false}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="absolute right-[130px] p-1.5 rounded-full transition-all"
              style={{ color: "var(--color-text-4)" }}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="absolute right-2 h-[46px] px-6 rounded-[14px] text-[14px] font-[800] text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
              boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(124,58,237,0.45)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(124,58,237,0.3)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            Search
          </button>
        </div>
      </form>

      {/* ── Dropdown results ── */}
      {isOpen && query.length >= 2 && (
        <div
          className="absolute top-[68px] left-0 right-0 rounded-[20px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            background: "var(--color-surface)",
            border: "1.5px solid var(--color-border)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between border-b"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span
              className="text-[11px] font-[800] uppercase tracking-[0.12em]"
              style={{ color: "var(--color-text-4)" }}
            >
              {isLoading
                ? "Searching..."
                : results.length > 0
                ? `${results.length} results`
                : "No results"}
            </span>
            {results.length > 0 && (
              <Link
                href={`/phones?q=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="text-[12px] font-[700] flex items-center gap-1 transition-colors"
                style={{ color: "var(--color-primary)" }}
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>

          {/* Results list */}
          {results.length > 0 ? (
            <div className="py-2 max-h-[360px] overflow-y-auto">
              {results.map((phone, i) => (
                <Link
                  key={phone._id || phone.slug}
                  href={`/phones/${phone.slug}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-3 px-4 py-3 transition-all duration-200 group/item"
                  style={{ animationDelay: `${i * 40}ms` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Phone image */}
                  <div
                    className="w-12 h-12 flex-shrink-0 rounded-[12px] flex items-center justify-center overflow-hidden relative"
                    style={{ background: "var(--color-surface-2)" }}
                  >
                    {!imgErrors[phone._id] && (phone.images?.thumbnail || phone.images?.main) ? (
                      <Image
                        src={phone.images.thumbnail || phone.images.main}
                        alt={phone.model}
                        fill
                        className="object-contain p-1"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [phone._id]: true }))
                        }
                      />
                    ) : (
                      <Smartphone
                        className="h-6 w-6"
                        style={{ color: "var(--color-text-4)" }}
                      />
                    )}
                  </div>

                  {/* Name + brand */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[14px] font-[700] truncate transition-colors"
                      style={{ color: "var(--color-text-1)" }}
                    >
                      {phone.model}
                    </p>
                    <p
                      className="text-[12px] font-[500]"
                      style={{ color: "var(--color-text-4)" }}
                    >
                      {phone.brand} &nbsp;·&nbsp; ⭐ {phone.rating?.average?.toFixed(1)}
                    </p>
                  </div>

                  {/* Price */}
                  <span
                    className="text-[15px] font-[800] flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-accent-1))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Rs. {(phone.price?.usd * 280).toLocaleString()}
                  </span>

                  <ArrowRight
                    className="h-4 w-4 flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                    style={{ color: "var(--color-primary)" }}
                  />
                </Link>
              ))}
            </div>
          ) : !isLoading ? (
            <div className="py-10 flex flex-col items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "var(--color-surface-2)" }}
              >
                <Search className="h-5 w-5" style={{ color: "var(--color-text-4)" }} />
              </div>
              <p
                className="text-[14px] font-[600]"
                style={{ color: "var(--color-text-3)" }}
              >
                No phones found for &quot;{query}&quot;
              </p>
              <p
                className="text-[12px] font-[500]"
                style={{ color: "var(--color-text-4)" }}
              >
                Try a brand name like &quot;Samsung&quot; or model like &quot;iPhone&quot;
              </p>
            </div>
          ) : (
            <div className="py-8 flex justify-center">
              <Loader2
                className="h-6 w-6 animate-spin"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
          )}

          {/* Footer — search all */}
          {results.length > 0 && (
            <div style={{ borderTop: "1px solid var(--color-border)" }}>
              <Link
                href={`/phones?q=${encodeURIComponent(query)}`}
                onClick={handleResultClick}
                className="flex items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-[700] w-full transition-all"
                style={{ color: "var(--color-primary)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Search className="h-4 w-4" />
                See all results for &quot;{query}&quot;
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const quickTags = ["iPhone 16", "Galaxy S25 Ultra", "Pixel 9 Pro", "OnePlus 13", "Foldables"];

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-zinc-950">

      {/* Background mesh gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-violet-100/60 dark:bg-violet-950/30 rounded-full blur-[120px]" />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-indigo-100/40 dark:bg-indigo-950/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-fuchsia-100/30 dark:bg-fuchsia-950/10 rounded-full blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-5 max-w-7xl pt-20 pb-16">
        <div className="flex flex-col items-center text-center">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-violet-200 dark:border-violet-800/60 bg-violet-50/80 dark:bg-violet-950/50 backdrop-blur-sm"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[13px] font-semibold text-violet-700 dark:text-violet-300">
              Trusted by 2M+ phone buyers worldwide
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[52px] md:text-[76px] font-[900] leading-[0.95] tracking-[-3px] mb-6 max-w-4xl"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">The smarter way to </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                choose
              </span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">your next phone.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[18px] md:text-[20px] text-zinc-500 dark:text-zinc-400 max-w-[560px] mb-10 leading-relaxed"
          >
            Compare specs, read real reviews, and get AI-powered recommendations — all in one place.
          </motion.p>

          {/* ── Live Search Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full flex justify-center mb-5"
          >
            <HeroSearchBar />
          </motion.div>

          {/* Quick search tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            <span className="text-[14px] font-bold text-zinc-400 dark:text-zinc-500 self-center uppercase tracking-widest mr-2">
              Trending:
            </span>
            {[
              { name: "iPhone 16", color: "text-sky-700 bg-sky-50 border-sky-200 hover:bg-sky-500 hover:text-white" },
              { name: "Galaxy S25 Ultra", color: "text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-500 hover:text-white" },
              { name: "Pixel 9 Pro", color: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-500 hover:text-white" },
              { name: "OnePlus 13", color: "text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-500 hover:text-white" },
              { name: "Foldables", color: "text-violet-700 bg-violet-50 border-violet-200 hover:bg-violet-500 hover:text-white" }
            ].map((tag) => (
              <Link
                key={tag.name}
                href={`/phones?q=${encodeURIComponent(tag.name)}`}
                className={`text-[13px] font-[800] border-2 px-4 py-1.5 rounded-xl hover:-translate-y-1 hover:shadow-md transition-all ${tag.color}`}
              >
                {tag.name}
              </Link>
            ))}
          </motion.div>

          {/* Feature badges row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {[
              {
                icon: Zap,
                label: "AI-powered recommendations",
                color: "text-violet-600 dark:text-violet-400",
                bg: "bg-violet-50 dark:bg-violet-950/50 border-violet-200 dark:border-violet-800",
              },
              {
                icon: TrendingUp,
                label: "Live price tracking",
                color: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
              },
              {
                icon: Shield,
                label: "Expert verified specs",
                color: "text-indigo-600 dark:text-indigo-400",
                bg: "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800",
              },
            ].map(({ icon: Icon, label, color, bg }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium ${bg}`}
              >
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <span className={color}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-stretch justify-center gap-5 max-w-4xl"
          >
            {[
              { num: "50K+", label: "Phones indexed", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", shadow: "shadow-violet-100" },
              { num: "19+", label: "Brands covered", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200", shadow: "shadow-rose-100" },
              { num: "2M+", label: "Monthly visitors", color: "text-sky-500", bg: "bg-sky-50", border: "border-sky-200", shadow: "shadow-sky-100" },
              { num: "Live", label: "Price updates", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", shadow: "shadow-emerald-100" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`flex-1 min-w-[160px] px-6 py-6 flex flex-col items-center rounded-3xl border-2 shadow-lg ${stat.bg} ${stat.border} ${stat.shadow} hover:-translate-y-2 transition-transform duration-300`}
              >
                <span className={`text-[36px] font-[900] leading-none ${stat.color} drop-shadow-sm`}>
                  {stat.num}
                </span>
                <span className={`text-[12px] font-[800] mt-3 uppercase tracking-widest ${stat.color} opacity-80 whitespace-nowrap`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
