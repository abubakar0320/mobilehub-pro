"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_NEWS = [
  {
    id: 1,
    title: "Samsung Galaxy Z Fold 6 Leaks Reveal Massive Changes",
    category: "Mobile Launches",
    date: "2 hours ago",
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Apple iOS 18 to Bring AI Features to Older iPhones",
    category: "Apple News",
    date: "5 hours ago",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Snapdragon 8 Gen 4 Benchmark Crushes Competition",
    category: "AI Technology",
    date: "1 day ago",
    image: "https://images.unsplash.com/photo-1603513360252-f4da12bd0247?q=80&w=500&auto=format&fit=crop"
  }
];

export function LatestNews() {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tech News</h2>
            <p className="text-muted-foreground">Stay updated with the mobile industry.</p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center">
            View All News <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCK_NEWS.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="relative h-60 w-full rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-full z-20 shadow-lg">
                  {news.category}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {news.date}
                </div>
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
