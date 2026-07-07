"use client";

import { motion } from "framer-motion";
import { CalendarDays, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const UPCOMING = [
  { name: "iPhone 16 Pro", date: "September 2024", brand: "Apple" },
  { name: "Google Pixel 9", date: "October 2024", brand: "Google" },
  { name: "Galaxy Z Fold 6", date: "August 2024", brand: "Samsung" },
  { name: "Xiaomi 15 Ultra", date: "December 2024", brand: "Xiaomi" }
];

export function UpcomingPhones() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="glass-card bg-gradient-to-br from-primary/10 to-accent/5 p-8 md:p-12 rounded-3xl overflow-hidden relative">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20 mask-image-linear-left"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Upcoming Launches</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don't miss out on the next big thing in tech. Get notified as soon as these highly anticipated devices drop.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-xl h-14 px-8 text-md shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  View Launch Calendar
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UPCOMING.map((phone, i) => (
                <motion.div 
                  key={phone.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-5 rounded-2xl flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-2 py-1 bg-secondary/50 rounded-md text-muted-foreground">
                      {phone.brand}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{phone.name}</h3>
                    <div className="flex items-center text-sm text-primary font-medium">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      {phone.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
