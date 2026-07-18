import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations — NovaX Space Tourism",
  description:
    "Browse all destinations across the Solar System. From Mercury's scorching surface to Pluto's icy frontier, find your perfect voyage.",
};

export default function DestinationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
