import type { Metadata } from "next";
import SolarSystemScene from "@/components/SolarSystemScene";

export const metadata: Metadata = {
  title: "Interactive 3D Solar System — NovaX Space Tourism",
  description:
    "Explore the Solar System in immersive 3D. Click planets for detailed telemetry, orbital data, and moon exploration.",
};

export default function SolarSystemPage() {
  return <SolarSystemScene />;
}
