import { PhoneData } from './phones';

const REAL_MODELS: Record<string, string[]> = {
  'Apple': [
    'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
    'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
    'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
    'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13',
    'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 mini', 'iPhone 12',
    'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
    'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
    'iPhone SE (3rd Gen)', 'iPhone SE (2nd Gen)', 'iPhone 8 Plus', 'iPhone 8'
  ],
  'Samsung': [
    'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S24 FE',
    'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE',
    'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', 'Galaxy S21 FE',
    'Galaxy Z Fold 6', 'Galaxy Z Flip 6', 'Galaxy Z Fold 5', 'Galaxy Z Flip 5',
    'Galaxy Z Fold 4', 'Galaxy Z Flip 4', 'Galaxy Z Fold 3', 'Galaxy Z Flip 3',
    'Galaxy A55', 'Galaxy A35', 'Galaxy A25', 'Galaxy A15', 'Galaxy A05s',
    'Galaxy A54', 'Galaxy A34', 'Galaxy A24', 'Galaxy A14', 'Galaxy A04',
    'Galaxy A53', 'Galaxy A33', 'Galaxy A73', 'Galaxy A13',
    'Galaxy M55', 'Galaxy M34', 'Galaxy M14', 'Galaxy F54', 'Galaxy F14',
    'Galaxy Note 20 Ultra', 'Galaxy Note 20'
  ],
  'Google': [
    'Pixel 9 Pro Fold', 'Pixel 9 Pro XL', 'Pixel 9 Pro', 'Pixel 9',
    'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a',
    'Pixel 7 Pro', 'Pixel 7', 'Pixel 7a', 'Pixel Fold',
    'Pixel 6 Pro', 'Pixel 6', 'Pixel 6a',
    'Pixel 5', 'Pixel 5a', 'Pixel 4 XL', 'Pixel 4a'
  ],
  'Xiaomi': [
    '14 Ultra', '14 Pro', '14', '13 Ultra', '13 Pro', '13', '13T Pro', '13T',
    '12S Ultra', '12 Pro', '12', '12T Pro', '11 Ultra', '11T Pro',
    'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13 5G', 'Redmi Note 13',
    'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12',
    'Redmi Note 11 Pro', 'Redmi Note 11', 'Redmi 13C', 'Redmi 12C',
    'Poco F6 Pro', 'Poco F6', 'Poco X6 Pro', 'Poco X6', 'Poco M6 Pro',
    'Poco F5 Pro', 'Poco F5', 'Poco X5 Pro', 'Poco M5'
  ],
  'OnePlus': [
    '12', '12R', 'Open', '11 5G', '11R', '10 Pro', '10T', '9 Pro', '9',
    'Nord 4', 'Nord CE 4', 'Nord CE 4 Lite',
    'Nord 3', 'Nord CE 3', 'Nord CE 3 Lite',
    'Nord 2T', 'Nord CE 2', 'Nord N30', 'Nord N200'
  ],
  'Vivo': [
    'X100 Pro', 'X100', 'X90 Pro+', 'X90 Pro', 'X90', 'X80 Pro', 'X80',
    'V30 Pro', 'V30', 'V29 Pro', 'V29', 'V27 Pro', 'V27', 'V25 Pro',
    'T3 5G', 'T2 Pro 5G', 'T2 5G', 'T1 5G',
    'Y200e', 'Y200', 'Y100', 'Y56', 'Y36', 'Y22'
  ],
  'Oppo': [
    'Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X6', 'Find X5 Pro',
    'Find N3', 'Find N3 Flip', 'Find N2 Flip',
    'Reno 11 Pro', 'Reno 11', 'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10',
    'Reno 8 Pro', 'Reno 8',
    'F25 Pro', 'F23 5G', 'F21s Pro', 'A79', 'A78', 'A58', 'A38'
  ],
  'Motorola': [
    'Edge 50 Pro', 'Edge 50 Ultra', 'Edge 50 Fusion',
    'Edge 40 Pro', 'Edge 40 Neo', 'Edge 40',
    'Edge 30 Ultra', 'Edge 30 Fusion', 'Edge 30',
    'Razr 40 Ultra', 'Razr 40', 'Razr+', 'Razr 2022',
    'Moto G84', 'Moto G54', 'Moto G34', 'Moto G24 Power',
    'Moto G73', 'Moto G62', 'Moto G32', 'Moto E13'
  ],
  'Realme': [
    'GT 5 Pro', 'GT Neo 5', 'GT 3', 'GT 2 Pro', 'GT Neo 3',
    '12 Pro+ 5G', '12 Pro', '12+ 5G', '12x', '12',
    '11 Pro+ 5G', '11 Pro', '11 5G', '11x 5G',
    '10 Pro+ 5G', '10 Pro', '10',
    'Narzo 70 Pro', 'Narzo 60x', 'Narzo 60 Pro', 'Narzo N55',
    'C67 5G', 'C65', 'C55', 'C53', 'C51'
  ],
  'Nothing': [
    'Phone (2a) Plus', 'Phone (2a)', 'Phone (2)', 'Phone (1)'
  ],
  'Infinix': [
    'Zero 30 5G', 'Zero Ultra', 'Zero 20',
    'Note 40 Pro+ 5G', 'Note 40 Pro', 'Note 40',
    'Note 30 VIP', 'Note 30 Pro', 'Note 30 5G',
    'GT 20 Pro', 'GT 10 Pro',
    'Hot 40 Pro', 'Hot 40i', 'Hot 30', 'Smart 8 Plus'
  ],
  'Tecno': [
    'Phantom V Fold', 'Phantom V Flip', 'Phantom X2 Pro',
    'Camon 30 Premier', 'Camon 30 Pro', 'Camon 20 Premier', 'Camon 20 Pro',
    'Spark 20 Pro+', 'Spark 20 Pro', 'Spark 20', 'Spark 10 Pro',
    'Pova 6 Pro', 'Pova 5 Pro', 'Pova 5'
  ],
  'Honor': [
    'Magic 6 Pro', 'Magic 6 RSR', 'Magic 5 Pro', 'Magic 4 Pro',
    'Magic V2', 'Magic Vs',
    'Honor 100 Pro', 'Honor 100', 'Honor 90', 'Honor 70',
    'X9b', 'X9a', 'X8b', 'X7b'
  ],
  'Huawei': [
    'Pura 70 Ultra', 'Pura 70 Pro', 'Pura 70',
    'Mate 60 Pro+', 'Mate 60 Pro', 'Mate 50 Pro',
    'P60 Pro', 'P60 Art', 'P50 Pro',
    'Mate X5', 'Mate X3', 'Pocket 2',
    'Nova 12 Ultra', 'Nova 12 Pro', 'Nova 11 Pro'
  ],
  'Sony': [
    'Xperia 1 VI', 'Xperia 1 V', 'Xperia 1 IV',
    'Xperia 5 V', 'Xperia 5 IV',
    'Xperia 10 VI', 'Xperia 10 V', 'Xperia Pro-I'
  ],
  'Asus': [
    'ROG Phone 8 Pro', 'ROG Phone 8',
    'ROG Phone 7 Ultimate', 'ROG Phone 7',
    'ROG Phone 6 Pro', 'ROG Phone 6',
    'Zenfone 11 Ultra', 'Zenfone 10', 'Zenfone 9'
  ],
  'Nokia': [
    'XR21', 'X30 5G', 'G60 5G', 'G42 5G', 'C32', 'C22', 'C110'
  ],
  'ZTE': [
    'Nubia Z60 Ultra', 'Nubia Z50 Ultra', 'Nubia Red Magic 9 Pro', 'Nubia Red Magic 8S Pro', 'Axon 40 Ultra'
  ],
  'Meizu': [
    'Meizu 21 Pro', 'Meizu 21', 'Meizu 20 Infinity', 'Meizu 20 Pro'
  ]
};

const flattenModels = () => {
  let list: { brand: string; model: string }[] = [];
  for (const [brand, models] of Object.entries(REAL_MODELS)) {
    models.forEach(model => list.push({ brand, model }));
  }
  return list;
};

const flatModels = flattenModels();

export const MOCK_PHONES: PhoneData[] = flatModels.map((item, i) => {
  const { brand, model } = item;
  const isPro = model.toLowerCase().includes('pro') || model.toLowerCase().includes('ultra') || model.toLowerCase().includes('max') || model.toLowerCase().includes('fold');
  
  // Base price based on tier
  let basePrice = 300 + (i * 15) % 400;
  if (isPro) basePrice += 600;
  if (model.includes('Fold') || model.includes('Ultra') || model.includes('Pro Max')) basePrice += 400;
  
  return {
    _id: `phone-${i + 1}`,
    brand,
    model: model,
    slug: `${brand.toLowerCase()}-${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    images: {
      main: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    price: {
      usd: basePrice,
      currency: "USD",
      original: i % 4 === 0 ? basePrice + 100 : undefined
    },
    rating: {
      average: isPro ? 4.6 + (i % 4) / 10 : 4.0 + (i % 6) / 10,
      count: 100 + (i * 47) % 5000
    },
    specs: {
      ram: isPro ? [12, 16][i % 2] : [6, 8][i % 2],
      storage: isPro ? [256, 512, 1024][i % 3] : [128, 256][i % 2],
      battery: model.includes('Fold') ? 4400 : (4000 + (i * 100) % 1200),
      chipset: brand === 'Apple' ? (isPro ? "A18 Pro" : "A17 Bionic") : (isPro ? "Snapdragon 8 Gen 3" : "Snapdragon 7 Gen 3"),
      
      display: {
        size: 6.1 + (i % 8) / 10,
        type: isPro ? "LTPO AMOLED" : "OLED",
        refreshRate: isPro ? 120 : (i % 2 === 0 ? 120 : 90),
        brightness: isPro ? 2000 + (i * 100) % 1000 : 1000 + (i * 100) % 500,
        resolution: "2796 x 1290",
        ppi: 400 + (i % 100)
      },
      performance: {
        processor: brand === 'Apple' ? (isPro ? "A18 Pro" : "A17 Bionic") : (isPro ? "Snapdragon 8 Gen 3" : "Snapdragon 7 Gen 3"),
        ram: isPro ? [12, 16][i % 2] : [6, 8][i % 2],
        storage: [128, 256, 512],
        benchmarks: {
          geekbench6Single: isPro ? 2100 + (i * 10) % 400 : 1000 + (i * 10) % 500,
          geekbench6Multi: isPro ? 7000 + (i * 30) % 1000 : 3000 + (i * 30) % 1000,
          antutu: isPro ? 1800000 + (i * 5000) % 400000 : 600000 + (i * 5000) % 300000
        }
      },
      cameraDeep: {
        main: { mp: isPro ? 200 : 50, aperture: "f/1.8", ois: true },
        ultrawide: { mp: isPro ? 50 : 12, angle: 120 },
        telephoto: { mp: isPro ? 50 : 8, zoom: isPro ? "5x" : "2x", ois: isPro },
        front: { mp: isPro ? 32 : 16 },
        video: isPro ? "8K@30fps" : "4K@60fps"
      },
      batteryDeep: {
        capacity: model.includes('Fold') ? 4400 : (4000 + (i * 100) % 1200),
        fastCharging: isPro ? 120 : 67,
        wireless: isPro ? 50 : 15,
        type: "Li-Po"
      },
      software: {
        os: brand === 'Apple' ? "iOS 18" : "Android 14",
        updateYears: brand === 'Apple' || brand === 'Samsung' || brand === 'Google' ? 7 : 4
      },
      connectivity: {
        has5g: true,
        wifi: isPro ? "Wi-Fi 7" : "Wi-Fi 6E",
        nfc: true,
        dualSim: true
      },
      ipRating: isPro ? "IP68" : "IP54",
      weight: isPro ? 210 : 185
    },
    badges: isPro ? ['new', 'hot'] : (i % 5 === 0 ? ['sale'] : []),
    colors: ["Phantom Black", "Titanium Gray", "Mystic White", "Ocean Blue"].slice(0, 2 + (i % 3)),
    features: ["5G Ready", "Fast Charging", "AI Camera", "Stereo Speakers"],
    releaseYear: 2024
  };
});
