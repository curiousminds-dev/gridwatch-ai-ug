import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart } from "recharts";
import { BellRing, CheckCircle2, CircleAlert, Cpu, Database, MapPin, RadioTower, ShieldCheck, SlidersHorizontal, Thermometer, TriangleAlert, Wifi } from "lucide-react";
import { PageIntro, MetricBadge, useGridSense } from "@/components/gridsense-shell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const assets = [
  { name: "Transformer 07", site: "Kampala Central", health: 92, temp: "68°C", status: "Healthy" },
  { name: "Transformer 12", site: "Jinja Industrial", health: 87, temp: "64°C", status: "Healthy" },
  { name: "Feeder 12", site: "Kawempe", health: 74, temp: "72°C", status: "Monitor" },
  { name: "Transformer 03", site: "Entebbe", health: 96, temp: "59°C", status: "Healthy" },
];

export function AssetHealthPage() {
  const { faultMode } = useGridSense();
  return <><PageIntro eyebrow="Predictive maintenance" title="Asset Health" description="Condition scores, thermal performance, and maintenance readiness across monitored infrastructure." />
    <div className="grid gap-3 sm:grid-cols-3"><MetricBadge label="Fleet health average" value={faultMode ? "81 / 100" : "89 / 100"} tone={faultMode ? "warning" : "healthy"}/><MetricBadge label="Assets monitored" value="24"/><MetricBadge label="Maintenance due" value={faultMode ? "1 Immediate" : "3 Scheduled"} tone={faultMode ? "critical" : "warning"}/></div>
    <div className="mt-4 grid gap-3 lg:grid-cols-2">{assets.map((asset, i) => { const critical = faultMode && i === 0; return <article key={asset.name} className={cn("rounded-md border bg-card/75 p-5", critical ? "border-critical shadow-[0_0_25px_var(--critical-glow)]" : "border-border")}><div className="flex items-start justify-between"><div><p className="text-xs text-muted-foreground">{asset.site}</p><h3 className="mt-1 font-display text-xl font-semibold">{asset.name}</h3></div><Cpu className={cn("size-5", critical ? "text-critical" : "text-healthy")}/></div><div className="mt-5 grid grid-cols-3 gap-2"><div><p className="text-[10px] uppercase text-muted-foreground">Health</p><p className="mt-1 font-mono text-lg">{critical ? 47 : asset.health}%</p></div><div><p className="text-[10px] uppercase text-muted-foreground">Thermal</p><p className={cn("mt-1 font-mono text-lg", critical && "text-critical")}>{critical ? "98°C" : asset.temp}</p></div><div><p className="text-[10px] uppercase text-muted-foreground">Status</p><p className={cn("mt-1 text-sm", critical ? "text-critical" : asset.status === "Monitor" ? "text-warning" : "text-healthy")}>{critical ? "Critical" : asset.status}</p></div></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div className={cn("h-full rounded-full", critical ? "bg-critical" : asset.status === "Monitor" ? "bg-warning" : "bg-healthy")} style={{ width: `${critical ? 47 : asset.health}%` }}/></div></article>})}</div></>;
}

export function AlertsPage() {
  const { faultMode, setFocusMetric } = useGridSense();
  const alerts = [
    { icon: CircleAlert, tone: "critical", title: faultMode ? "Critical Thermal Overload Detected" : "Phase Overheating Detected", asset: "Transformer 07", site: "Kampala Central", time: faultMode ? "Now" : "2 min ago" },
    { icon: TriangleAlert, tone: "warning", title: "High Load Imbalance", asset: "Feeder 12", site: "Kawempe", time: "8 min ago" },
    { icon: CheckCircle2, tone: "healthy", title: "Self-Test Completed", asset: "Substation 03", site: "Jinja Industrial", time: "18 min ago" },
  ];
  return <><PageIntro eyebrow="Operational response" title="Active Alerts" description="Prioritized anomalies and system events, ranked for rapid field intervention." />
    <div className="space-y-3">{alerts.map((alert) => <article key={alert.title} className={cn("grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-md border bg-card/75 p-4", alert.tone === "critical" ? "border-critical/50" : alert.tone === "warning" ? "border-warning/30" : "border-healthy/25")}><div className={cn("grid size-10 place-items-center rounded-md", alert.tone === "critical" ? "bg-critical/10 text-critical" : alert.tone === "warning" ? "bg-warning/10 text-warning" : "bg-healthy/10 text-healthy")}><alert.icon className="size-5"/></div><div className="min-w-0"><p className="truncate font-semibold">{alert.asset} — {alert.title}</p><p className="text-xs text-muted-foreground">{alert.site} • {alert.time}</p></div><Button variant="outline" size="sm" onClick={() => setFocusMetric(alert.tone === "warning" ? "load" : alert.tone === "critical" ? "temperature" : "voltage")}>Focus</Button></article>)}</div></>;
}

const nodes = [
  { name: "Kampala Central", top: "56%", left: "42%", load: 72, status: "healthy" },
  { name: "Jinja Industrial", top: "48%", left: "69%", load: 64, status: "healthy" },
  { name: "Kawempe", top: "35%", left: "38%", load: 84, status: "warning" },
  { name: "Entebbe", top: "73%", left: "37%", load: 58, status: "healthy" },
];
export function GridMapPage() {
  const { faultMode } = useGridSense();
  return <><PageIntro eyebrow="Geospatial operations" title="Uganda Grid Map" description="Live substation status and connected transmission corridors across the central network." />
    <section className="relative min-h-[620px] overflow-hidden rounded-md border border-border bg-card/65"><div className="absolute inset-0 grid-map-pattern"/><div className="absolute left-[22%] top-[20%] h-[65%] w-[58%] opacity-25"><svg viewBox="0 0 500 600" className="size-full fill-accent/10 stroke-accent/50" aria-label="Stylized map of Uganda"><path d="M151 22 250 56l86-22 59 83-18 98 56 97-59 120-102 132-98-51-64-126 14-112-58-81 50-90-5-82Z" strokeWidth="4"/><path d="M189 168 316 220M170 340l190-66M225 115l32 377" fill="none" strokeDasharray="8 8" strokeWidth="2"/></svg></div>{nodes.map((node, i) => { const critical = faultMode && i === 0; return <div key={node.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: node.top, left: node.left }}><span className={cn("absolute inset-0 animate-ping rounded-full", critical ? "bg-critical" : node.status === "warning" ? "bg-warning" : "bg-healthy")}/><div className={cn("relative grid size-9 place-items-center rounded-full border-2 bg-background", critical ? "border-critical text-critical" : node.status === "warning" ? "border-warning text-warning" : "border-healthy text-healthy")}><MapPin className="size-4"/></div><div className="absolute left-1/2 top-11 w-36 -translate-x-1/2 rounded-sm border border-border bg-popover/95 p-2 text-center backdrop-blur"><p className="text-xs font-semibold">{node.name}</p><p className={cn("font-mono text-[10px]", critical ? "text-critical" : "text-muted-foreground")}>{critical ? "CRITICAL • 98°C" : `${node.load}% load • Online`}</p></div></div>})}<div className="absolute bottom-5 left-5 flex gap-3 rounded-sm border border-border bg-background/90 p-3 text-[10px]"><span className="text-healthy">● Healthy</span><span className="text-warning">● Warning</span><span className="text-critical">● Critical</span></div></section></>;
}

const analytics = [{ month: "Apr", faults: 14, prevented: 10 }, { month: "May", faults: 18, prevented: 15 }, { month: "Jun", faults: 13, prevented: 12 }, { month: "Jul", faults: 21, prevented: 18 }, { month: "Aug", faults: 16, prevented: 15 }, { month: "Sep", faults: 12, prevented: 11 }];
export function AnalyticsPage() {
  return <><PageIntro eyebrow="Performance intelligence" title="Grid Analytics" description="Reliability trends and measurable outage prevention from predictive monitoring."/><div className="grid gap-3 sm:grid-cols-3"><MetricBadge label="Faults prevented" value="81"/><MetricBadge label="Downtime avoided" value="126 hrs"/><MetricBadge label="Prediction accuracy" value="96.4%"/></div><section className="mt-4 rounded-md border border-border bg-card/75 p-5"><h3 className="font-display text-xl font-semibold">Fault Prevention Performance</h3><p className="text-xs text-muted-foreground">Detected anomalies versus prevented outages</p><div className="mt-5 h-[360px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={analytics}><CartesianGrid vertical={false} stroke="var(--border)"/><XAxis dataKey="month" tick={{fill:"var(--muted-foreground)"}} axisLine={false}/><YAxis tick={{fill:"var(--muted-foreground)"}} axisLine={false}/><RechartsTooltip contentStyle={{background:"var(--popover)",border:"1px solid var(--border)"}}/><Bar dataKey="faults" fill="var(--warning)" radius={[2,2,0,0]}/><Bar dataKey="prevented" fill="var(--healthy)" radius={[2,2,0,0]}/></BarChart></ResponsiveContainer></div></section></>;
}

export function SettingsPage() {
  const options = [
    { title: "Real-time telemetry", detail: "Refresh connected node data every 5 seconds", icon: RadioTower, checked: true },
    { title: "Critical SMS escalation", detail: "Notify the duty engineer for critical faults", icon: BellRing, checked: true },
    { title: "AI maintenance forecasts", detail: "Enable predictive maintenance recommendations", icon: ShieldCheck, checked: true },
    { title: "Low-bandwidth mode", detail: "Reduce telemetry frequency on unstable links", icon: Wifi, checked: false },
  ];
  return <><PageIntro eyebrow="Control center configuration" title="Settings" description="Manage telemetry, alert escalation, and predictive intelligence preferences."/><section className="rounded-md border border-border bg-card/75"><div className="border-b border-border p-5"><h3 className="font-display text-xl font-semibold">System Preferences</h3><p className="text-xs text-muted-foreground">National Operations Center • Kampala</p></div>{options.map((option) => <div key={option.title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border p-5 last:border-b-0"><option.icon className="size-5 text-accent"/><div className="min-w-0"><p className="font-semibold">{option.title}</p><p className="text-xs text-muted-foreground">{option.detail}</p></div><Switch defaultChecked={option.checked} aria-label={option.title}/></div>)}</section><section className="mt-4 grid gap-3 sm:grid-cols-2"><div className="rounded-md border border-border bg-card/75 p-5"><Database className="size-5 text-healthy"/><h3 className="mt-3 font-semibold">Telemetry retention</h3><p className="mt-1 text-sm text-muted-foreground">24 months • 38.4 GB encrypted</p></div><div className="rounded-md border border-border bg-card/75 p-5"><SlidersHorizontal className="size-5 text-warning"/><h3 className="mt-3 font-semibold">Alert threshold profile</h3><p className="mt-1 text-sm text-muted-foreground">Uganda Grid Standard • Rev. 4</p></div></section></>;
}
