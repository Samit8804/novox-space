import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NovaX — Space Tourism Inquiries",
  description:
    "Get in touch with NovaX Space Tourism. Our team is ready to answer your questions about booking, training, and space travel.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
