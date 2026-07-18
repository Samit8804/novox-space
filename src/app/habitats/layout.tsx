import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Space Hotels — NovaX Space Tourism",
  description:
    "Experience unparalleled luxury across the Solar System. Browse orbital resorts, planetary outposts, and moon-base accommodations.",
};

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
