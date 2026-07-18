import type { Metadata } from "next";
import { destinations } from "@/data/destinations";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = destinations.find((d) => d.node_id === params.id);
  if (!dest) {
    return { title: "Planet Not Found — NovaX" };
  }
  return {
    title: `${dest.name} — NovaX Space Tourism`,
    description: `Explore ${dest.name}: ${dest.description.slice(0, 160)}`,
    openGraph: {
      title: `${dest.name} — NovaX Space Tourism`,
      description: dest.description.slice(0, 200),
    },
  };
}

export default function PlanetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
