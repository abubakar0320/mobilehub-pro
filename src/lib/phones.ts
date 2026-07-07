export interface PhoneData {
  _id: string;
  brand: string;
  model: string;
  slug: string;
  name?: string;
  shortName?: string;
  images: { main: string; thumbnail?: string; gallery: string[] };
  price: { usd: number; original?: number; currency: string };
  rating: { average: number; count: number };
  specs: {
    ram: number;
    storage: number;
    battery: number;
    chipset: string;
    
    // Deep specs for Compare
    display: {
      size: number;
      type: string;
      refreshRate: number;
      brightness: number;
      resolution: string;
      ppi: number;
    };
    performance: {
      processor: string;
      ram: number;
      storage: number[];
      benchmarks: {
        geekbench6Single: number;
        geekbench6Multi: number;
        antutu: number;
      };
    };
    cameraDeep: {
      main: { mp: number; aperture: string; ois: boolean };
      ultrawide: { mp: number; angle: number };
      telephoto: { mp: number; zoom: string; ois: boolean };
      front: { mp: number };
      video: string;
    };
    batteryDeep: {
      capacity: number;
      fastCharging: number;
      wireless: number;
      type: string;
    };
    software: {
      os: string;
      updateYears: number;
    };
    connectivity: {
      has5g: boolean;
      wifi: string;
      nfc: boolean;
      dualSim: boolean;
    };
    ipRating: string;
    weight: number;
  };
  badges: ('new' | 'hot' | 'sale' | 'award' | 'upcoming')[];
  colors: string[];
  features: string[];
  releaseYear: number;
}

export interface PhonesResponse {
  phones: PhoneData[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

// Fetcher for SWR
export const fetcher = (url: string) => fetch(url).then(res => res.json());
