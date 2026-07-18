import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astronaut Training — NovaX Space Tourism",
  description:
    "Prepare for your space journey with NovaX training programs. Zero-G simulation, emergency protocols, and mission-specific preparation.",
};

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
