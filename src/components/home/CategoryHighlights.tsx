"use client";

import { motion } from "framer-motion";
import { Camera, Gamepad2, BatteryCharging, Zap } from "lucide-react";

const CATEGORIES = [
  {
    title: "Best Camera Phones",
    icon: <Camera className="h-8 w-8 text-accent" />,
    description: "Capture the world in stunning detail with top-rated camera setups.",
    color: "from-violet-500/20 to-cyan-500/20"
  },
  {
    title: "Gaming Beasts",
    icon: <Gamepad2 className="h-8 w-8 text-purple-500" />,
    description: "Uncompromised performance, high refresh rates, and advanced cooling.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Battery Monsters",
    icon: <BatteryCharging className="h-8 w-8 text-green-500" />,
    description: "Phones that easily last two days and charge in minutes.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Premium Flagships",
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    description: "The absolute best technology available on the market right now.",
    color: "from-yellow-500/20 to-orange-500/20"
  }
];

export function CategoryHighlights() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Find Your Vibe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-3xl border border-border/50 bg-gradient-to-br ${category.color} hover:shadow-lg transition-shadow cursor-pointer group`}
            >
              <div className="h-16 w-16 bg-background rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                {category.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{category.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {category.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
