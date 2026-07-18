import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Trip Planner — NovaX Space Tourism",
  description:
    "Plan your perfect space voyage with NovaX AI. Get personalized itineraries, destination recommendations, and training schedules.",
};

export default function AITripPlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
