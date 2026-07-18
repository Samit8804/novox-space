import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: "NovaX Space Tourism — The Definitive Gateway to the Solar System",
  description:
    "Premium next-generation space tourism platform. Explore planets, book luxury orbital voyages, train like an astronaut, and configure AI-driven itineraries.",
  openGraph: {
    title: "NovaX Space Tourism",
    description:
      "The definitive digital gateway for human civilization's expansion into the Solar System.",
    siteName: "NovaX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-space-black text-white">
        <StarField />
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
