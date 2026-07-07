export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: string;
  image: string;
  isNew?: boolean;
  isHot?: boolean;
  specs: {
    ram: string;
    storage: string;
    battery: string;
  };
}

export const PHONES: Phone[] = [
  {
    id: "1",
    name: "iPhone 16 Pro",
    brand: "Apple",
    price: 999,
    rating: 4.8,
    reviews: "12k",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=500&auto=format&fit=crop",
    isNew: true,
    specs: { ram: "8GB", storage: "256GB", battery: "3274mAh" }
  },
  {
    id: "2",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: 1299,
    rating: 4.7,
    reviews: "8.4k",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop",
    isHot: true,
    specs: { ram: "12GB", storage: "512GB", battery: "5000mAh" }
  },
  {
    id: "3",
    name: "Pixel 9 Pro",
    brand: "Google",
    price: 999,
    rating: 4.6,
    reviews: "5.2k",
    image: "https://images.unsplash.com/photo-1662947230495-2d6deeb8ff24?q=80&w=500&auto=format&fit=crop",
    isNew: true,
    specs: { ram: "16GB", storage: "256GB", battery: "4700mAh" }
  },
  {
    id: "4",
    name: "Xiaomi 15 Pro",
    brand: "Xiaomi",
    price: 799,
    rating: 4.5,
    reviews: "3.1k",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop",
    specs: { ram: "12GB", storage: "256GB", battery: "4880mAh" }
  },
  {
    id: "5",
    name: "OnePlus 13",
    brand: "OnePlus",
    price: 699,
    rating: 4.5,
    reviews: "4.5k",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop",
    isHot: true,
    specs: { ram: "16GB", storage: "512GB", battery: "5400mAh" }
  },
  {
    id: "6",
    name: "Nothing Phone 3",
    brand: "Nothing",
    price: 599,
    rating: 4.4,
    reviews: "1.2k",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=500&auto=format&fit=crop",
    specs: { ram: "12GB", storage: "256GB", battery: "4700mAh" }
  },
  {
    id: "7",
    name: "Vivo X200 Pro",
    brand: "Vivo",
    price: 749,
    rating: 4.3,
    reviews: "950",
    image: "https://images.unsplash.com/photo-1603513360252-f4da12bd0247?q=80&w=500&auto=format&fit=crop",
    specs: { ram: "12GB", storage: "256GB", battery: "5000mAh" }
  },
  {
    id: "8",
    name: "Galaxy Z Fold 6",
    brand: "Samsung",
    price: 1799,
    rating: 4.4,
    reviews: "2.1k",
    image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=500&auto=format&fit=crop",
    specs: { ram: "12GB", storage: "512GB", battery: "4400mAh" }
  }
];
