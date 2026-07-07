"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star, Cpu, Battery, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_PHONES = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    price: "Rs. 280,299",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop",
    rating: 4.9,
    specs: {
      processor: "Snapdragon 8 Gen 3",
      battery: "5000 mAh",
      camera: "200 MP Main"
    }
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    price: "Rs. 280,199",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500&auto=format&fit=crop",
    rating: 4.8,
    specs: {
      processor: "A17 Pro",
      battery: "4422 mAh",
      camera: "48 MP Main"
    }
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    price: "Rs. 279,720",
    image: "https://images.unsplash.com/photo-1662947230495-2d6deeb8ff24?q=80&w=500&auto=format&fit=crop",
    rating: 4.7,
    specs: {
      processor: "Tensor G3",
      battery: "5050 mAh",
      camera: "50 MP Main"
    }
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: "Rs. 223,720",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop",
    rating: 4.6,
    specs: {
      processor: "Snapdragon 8 Gen 3",
      battery: "5400 mAh",
      camera: "50 MP Main"
    }
  }
];

export function TrendingPhones() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trending Right Now</h2>
            <p className="text-muted-foreground">The most popular smartphones this week.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center text-primary hover:text-primary/80">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PHONES.map((phone, index) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="relative h-64 w-full p-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium z-10">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  {phone.rating}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={phone.image} 
                  alt={phone.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1 truncate">{phone.name}</h3>
                <p className="text-xl font-bold text-primary mb-4">{phone.price}</p>
                
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-accent" />
                    <span className="truncate">{phone.specs.processor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-accent" />
                    <span>{phone.specs.battery}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-accent" />
                    <span>{phone.specs.camera}</span>
                  </div>
                </div>
                
                <Button className="w-full rounded-lg" variant="secondary">
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
