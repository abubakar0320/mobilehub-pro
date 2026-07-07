import { Metadata } from "next";
import { CompareClient } from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Phones — MobileHub Pro",
  description: "Detailed side-by-side comparison of specs, camera, battery, performance & price. See which phone wins in each category.",
};

import { Suspense } from "react";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading compare tool...</div>}>
      <CompareClient />
    </Suspense>
  );
}
