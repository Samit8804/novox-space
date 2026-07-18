import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission Control Dashboard — NovaX Space Tourism",
  description:
    "Your personal mission control. Track training progress, upcoming voyages, and mission readiness all in one place.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
