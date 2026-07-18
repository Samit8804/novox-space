"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { planetContent } from "@/data/planetContent";
import PlanetDashboard from "@/components/PlanetDashboard";

export default function PlanetDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const dest = destinations.find((d) => d.node_id === id);
  const content = planetContent[id];

  if (!dest || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg">Destination not found</p>
          <Link href="/destinations" className="text-accent-cyan hover:underline mt-4 inline-block">
            Browse all destinations
          </Link>
        </div>
      </div>
    );
  }

  return <PlanetDashboard dest={dest} content={content} />;
}
