import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Voyage Packages — NovaX Space Tourism",
  description:
    "Choose your adventure with NovaX packages. From weekend lunar getaways to grand tours of the outer Solar System.",
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
