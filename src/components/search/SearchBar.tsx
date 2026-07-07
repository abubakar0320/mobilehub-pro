"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { SearchSuggestion } from "./SearchSuggestions";


export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/phones/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div ref={containerRef} className="relative flex items-center">
      {isOpen ? (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full w-[280px] h-[36px] px-3 shadow-sm transition-all z-50">
          <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search phones..."
            className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-slate-900 dark:text-slate-100"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-blue-500 animate-spin flex-shrink-0" />
          ) : (
            <button onClick={() => { setIsOpen(false); setQuery(""); }} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Dropdown Results */}
          {query.length >= 2 && (
            <div className="absolute top-[44px] right-0 w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden z-50">
              {results.length > 0 ? (
                <div className="py-2">
                  {results.map((phone) => (
                    <SearchSuggestion key={phone._id || phone.slug} phone={phone} onClick={() => setIsOpen(false)} />
                  ))}
                </div>
              ) : !isLoading ? (
                <div className="p-4 text-center text-sm text-slate-500">No phones found</div>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors p-1"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
}
