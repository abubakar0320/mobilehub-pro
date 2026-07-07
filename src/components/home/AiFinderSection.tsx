"use client";

import { motion } from "framer-motion";
import { Sparkles, Camera, Battery, DollarSign, GraduationCap, Video, Wifi, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AiFinderSection() {
  const chips = [
    { text: "Best under Rs. 84,000", icon: DollarSign, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 hover:border-amber-400" },
    { text: "Best for photography", icon: Camera, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/60 hover:border-violet-400" },
    { text: "Long battery life", icon: Battery, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 hover:border-emerald-400" },
    { text: "For students", icon: GraduationCap, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60 hover:border-indigo-400" },
    { text: "Content creators", icon: Video, color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 hover:border-rose-400" },
    { text: "5G under Rs. 140,000", icon: Wifi, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/60 hover:border-cyan-400" },
  ];

  return (
    <section className="py-20 w-full relative overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-50/80 to-transparent dark:from-violet-950/20 rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-50/60 to-transparent dark:from-indigo-950/10 rounded-full" />
      </div>

      <div className="relative container mx-auto px-5 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-[12px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[36px] md:text-[48px] font-[800] text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4"
          >
            Tell us what you need.
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">We'll find the perfect phone.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[17px] text-zinc-500 dark:text-zinc-400"
          >
            Describe your lifestyle or budget. Our AI analyzes 50,000+ phones to find your perfect match.
          </motion.p>
        </div>

        {/* Chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8"
        >
          {chips.map(chip => (
            <Link key={chip.text} href="/ai-advisor"
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left cursor-pointer transition-all group ${chip.bg}`}
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 shadow-sm">
                <chip.icon className={`h-4 w-4 ${chip.color}`} />
              </div>
              <span className={`text-[13px] font-semibold ${chip.color}`}>{chip.text}</span>
            </Link>
          ))}
        </motion.div>

        {/* CTA input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative flex items-center h-[64px] bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 focus-within:border-violet-500 shadow-lg shadow-zinc-100 dark:shadow-zinc-950/50 transition-all">
            <Sparkles className="absolute left-5 h-5 w-5 text-violet-400" />
            <input
              type="text"
              placeholder="e.g. I need a phone with great camera under Rs. 168,000..."
              className="flex-1 h-full pl-13 pr-[170px] outline-none bg-transparent text-[15px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 pl-12"
            />
            <Link href="/ai-advisor" className="absolute right-2 h-[48px] px-6 bg-gradient-to-r from-violet-600 to-indigo-500 text-white text-[14px] font-bold rounded-xl flex items-center gap-2 hover:from-violet-700 hover:to-indigo-600 transition-all">
              Find my phone <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-center text-[12px] text-zinc-400 dark:text-zinc-500 mt-3">
            Free · No account required · Results in seconds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
