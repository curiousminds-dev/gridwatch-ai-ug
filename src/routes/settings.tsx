import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/gridsense-pages";
export const Route = createFileRoute("/settings")({ head: () => ({ meta: [{ title: "Settings | GridSense AI" }, { name: "description", content: "Configure GridSense AI telemetry and alerts." }, { property: "og:title", content: "Settings | GridSense AI" }, { property: "og:description", content: "Configure GridSense AI telemetry and alerts." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: SettingsPage });
