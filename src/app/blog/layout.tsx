import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Blog — NovaX Space Tourism",
  description:
    "Read the latest news, insights, and stories about space tourism, planetary exploration, and humanity's journey beyond Earth.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
