import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NovaX — Our Mission & Fleet",
  description:
    "Learn about NovaX Space Tourism — our mission to make space travel accessible, our cutting-edge fleet, and the team behind humanity's greatest adventure.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
