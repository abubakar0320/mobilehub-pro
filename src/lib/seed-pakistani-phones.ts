import mongoose from 'mongoose'
import Phone from '../models/Phone'

export const pakistaniPhones = [
  {
    name: "Samsung Galaxy A55 5G",
    shortName: "Galaxy A55",
    brand: "Samsung",
    series: "Galaxy A",
    modelNumber: "SM-A556B",
    slug: "samsung-galaxy-a55-5g",
    searchAliases: ["a55", "galaxy a55", "samsung a55", "a 55", "a556"],
    images: {
      main: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/phones/galaxy-a55-front.jpg",
      thumbnail: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_400,h_400/phones/galaxy-a55-front.jpg",
    },
    price: { usd: 350 }
  },
  {
    name: "iPhone 15 Pro Max",
    shortName: "iPhone 15 Pro Max",
    brand: "Apple",
    series: "iPhone 15",
    modelNumber: "A3108",
    slug: "iphone-15-pro-max",
    searchAliases: ["15 pro max", "iphone 15", "i15 pro", "15pm", "iphone pro max"],
    images: {},
    price: { usd: 1199 }
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    shortName: "Redmi Note 13 Pro",
    brand: "Xiaomi",
    series: "Redmi Note 13",
    modelNumber: "2312DRA50G",
    slug: "redmi-note-13-pro",
    searchAliases: ["note 13 pro", "redmi note 13", "note13 pro", "n13 pro"],
    images: {},
    price: { usd: 250 }
  },
  {
    name: "Vivo Y200 5G",
    shortName: "Vivo Y200",
    brand: "Vivo",
    slug: "vivo-y200-5g",
    searchAliases: ["y200", "vivo y200", "y 200"],
    images: {},
    price: { usd: 200 }
  },
  {
    name: "POCO X6 Pro 5G",
    shortName: "POCO X6 Pro",
    brand: "Xiaomi",
    series: "POCO X6",
    slug: "poco-x6-pro-5g",
    searchAliases: ["x6 pro", "poco x6", "x6pro", "pocoX6"],
    images: {},
    price: { usd: 299 }
  },
  {
    name: "Infinix Hot 40 Pro",
    shortName: "Infinix Hot 40 Pro",
    brand: "Infinix",
    slug: "infinix-hot-40-pro",
    searchAliases: ["hot 40 pro", "hot40 pro", "infinix hot 40"],
    images: {},
    price: { usd: 150 }
  },
  {
    name: "Tecno Spark 20 Pro+",
    shortName: "Spark 20 Pro+",
    brand: "Tecno",
    slug: "tecno-spark-20-pro-plus",
    searchAliases: ["spark 20 pro", "spark20", "tecno spark 20"],
    images: {},
    price: { usd: 170 }
  },
]

export async function seedPakistaniPhones() {
  console.log("Seeding phones...");
  try {
    for (const phoneData of pakistaniPhones) {
      await Phone.findOneAndUpdate(
        { slug: phoneData.slug },
        { $set: phoneData },
        { upsert: true, new: true }
      );
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding error:", error);
  }
}
