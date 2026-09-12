import { createFileRoute } from "@tanstack/react-router";
import { OverviewDashboard } from "@/components/gridsense-dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GridSense AI | Uganda Grid Monitoring" },
      { name: "description", content: "Real-time Ugandan electrical grid resilience and early fault detection dashboard." },
      { property: "og:title", content: "GridSense AI | Uganda Grid Monitoring" },
      { property: "og:description", content: "Real-time grid resilience and early fault detection for Uganda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OverviewDashboard,
});
