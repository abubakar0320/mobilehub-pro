import { Metadata } from "next";
import { UpcomingClient } from "./UpcomingClient";
import { getAllUpcoming } from "@/lib/upcoming";

export const metadata: Metadata = {
  title: "Upcoming Phone Launches & Rumors | MobileHub Pro",
  description: "Track the release dates, leaked specs, and official teasers for the most anticipated upcoming smartphones from Apple, Samsung, Google and more.",
};

export default function UpcomingPage() {
  const allPhones = getAllUpcoming();
  
  // Find the closest "Teased" or "Official" launch for the hero
  // If none exist, fallback to the closest rumor
  const confirmed = allPhones.filter(p => p.status === 'Teased' || p.status === 'Official');
  const topLaunch = confirmed.length > 0 ? confirmed[0] : allPhones[0];

  return <UpcomingClient topLaunch={topLaunch} />;
}
