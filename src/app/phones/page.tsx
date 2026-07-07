import { Metadata } from "next";
import { PhonesClient } from "./PhonesClient";

export const metadata: Metadata = {
  title: "All Mobile Phones — MobileHub Pro",
  description: "Browse 50,000+ smartphones. Filter by brand, price, RAM, battery, camera. Find the best phone for your needs.",
};

import { Suspense } from "react";

export default function PhonesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading phones database...</div>}>
      <PhonesClient />
    </Suspense>
  );
}
