import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — NovaX Space Tourism",
  description:
    "Stunning imagery from across the Solar System. Browse photos of planets, moons, and deep space captured by NovaX missions.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
