import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Space Voyage — NovaX Space Tourism",
  description:
    "Reserve your seat on humanity's next great adventure. Configure your destination, verify credentials, and complete your booking.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
