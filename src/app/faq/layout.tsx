import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — NovaX Space Tourism",
  description:
    "Frequently asked questions about space travel with NovaX. Find answers about booking, training, safety, and what to expect on your voyage.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
