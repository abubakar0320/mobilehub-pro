import { useState, useEffect } from 'react';

export interface ComparePhone {
  id: string;
  name: string;
  image: string;
}

export function useCompare() {
  const [compareList, setCompareList] = useState<ComparePhone[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mobilehub-compare');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mobilehub-compare', JSON.stringify(compareList));
    }
  }, [compareList, isLoaded]);

  const addPhone = (phone: ComparePhone) => {
    if (compareList.find(p => p.id === phone.id)) return; // already added
    if (compareList.length >= 4) {
      alert("You can compare up to 4 phones at a time.");
      return;
    }
    setCompareList([...compareList, phone]);
  };

  const removePhone = (id: string) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isAdded = (id: string) => {
    return compareList.some(p => p.id === id);
  };

  return {
    compareList,
    addPhone,
    removePhone,
    clearCompare,
    isAdded
  };
}
