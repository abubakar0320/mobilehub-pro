import Link from "next/link";
import Image from "next/image";
import { Mail, Globe } from "lucide-react";

const GithubIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-white text-zinc-900 border-t-4 border-transparent [border-image:linear-gradient(to_right,#8b5cf6,#ec4899,#f59e0b)_1]">
      {/* Main footer */}
      <div className="container mx-auto px-5 max-w-7xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand col — spans 2 on mobile, 4 on md, 2 on lg */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5 group">
              <Image src="/logo.png" alt="MobileHub Pro" width={36} height={36} className="rounded-[8px] group-hover:scale-105 transition-transform shadow-md" />
              <span className="text-[17px] font-[900] tracking-tight">
                MobileHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500">Pro</span>
              </span>
            </div>
            <p className="text-[14px] text-zinc-500 mb-6 max-w-xs leading-relaxed font-medium">
              The world's most complete mobile database. Compare specs, track prices, and find your perfect phone.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2 mb-8">
              <div className="flex-1 flex items-center bg-zinc-50 border-2 border-zinc-200 focus-within:border-violet-400 focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.1)] rounded-xl px-3 h-11 gap-2 transition-all">
                <Mail className="h-4 w-4 text-violet-500 flex-shrink-0" />
                <input type="email" placeholder="Your email address" className="flex-1 bg-transparent outline-none text-[13px] font-semibold text-zinc-900 placeholder:text-zinc-400 placeholder:font-medium" />
              </div>
              <button className="h-11 px-5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 hover:scale-[1.03] text-white text-[13px] font-[800] rounded-xl transition-transform flex-shrink-0 shadow-md shadow-pink-200">
                Subscribe
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/abubakar0320" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-sm">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/abubakar0320" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-sm">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://iamabubakar.site" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all shadow-sm">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Explore",
              color: "text-violet-600",
              links: [
                { name: "All Phones", path: "/phones" },
                { name: "Compare Tool", path: "/compare" },
                { name: "AI Advisor", path: "/ai-advisor" },
                { name: "Brands", path: "/brands" },
                { name: "Upcoming", path: "/upcoming" },
              ]
            },
            {
              title: "Categories",
              color: "text-emerald-600",
              links: [
                { name: "Best Camera", path: "/phones?tag=camera" },
                { name: "Best Battery", path: "/phones?tag=battery" },
                { name: "Gaming Phones", path: "/phones?tag=gaming" },
                { name: "Budget Picks", path: "/phones?tag=budget" },
                { name: "Flagships", path: "/phones?tag=flagships" },
              ]
            },
            {
              title: "Company",
              color: "text-sky-600",
              links: [
                { name: "About", path: "/about" },
                { name: "News", path: "/news" },
                { name: "Contact", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ]
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className={`text-[14px] font-[900] ${col.color} mb-5 uppercase tracking-widest`}>{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-[14.5px] font-semibold text-zinc-500 hover:text-zinc-900 hover:translate-x-1 inline-block transition-transform">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t-2 border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] font-bold text-zinc-400">
            © 2025 MobileHub Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-[13px] font-bold text-zinc-500">
            <Link href="/privacy" className="hover:text-violet-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-violet-600 transition-colors">Terms</Link>
            <span className="bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
              Built with ❤️ by <Link href="/developer" className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500 font-[900] hover:opacity-80">Abu Bakar Siddique</Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
