import { useEffect, useMemo, useRef } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts";
import { Activity, AlertTriangle, ArrowUpRight, BrainCircuit, CheckCircle2, Clock3, Cpu, Gauge, Radio, ShieldAlert, Thermometer, Waves, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageIntro, useGridSense } from "@/components/gridsense-shell";

const telemetry = [
  { time: "00:00", load: 48, temp: 51 }, { time: "02:00", load: 43, temp: 49 }, { time: "04:00", load: 40, temp: 48 },
  { time: "06:00", load: 51, temp: 53 }, { time: "08:00", load: 63, temp: 58 }, { time: "10:00", load: 69, temp: 63 },
  { time: "12:00", load: 73, temp: 67 }, { time: "14:00", load: 77, temp: 69 }, { time: "16:00", load: 72, temp: 68 },
  { time: "18:00", load: 81, temp: 72 }, { time: "20:00", load: 76, temp: 70 }, { time: "22:00", load: 67, temp: 65 }, { time: "24:00", load: 61, temp: 62 },
];

const sparkData = {
  temperature: [52, 54, 57, 56, 61, 60, 64, 66, 65, 68],
  voltage: [11.1, 11.2, 11.15, 11.2, 11.18, 11.23, 11.2, 11.21, 11.19, 11.2],
  current: [216, 226, 221, 234, 230, 239, 236, 248, 242, 245],
  load: [54, 58, 61, 59, 64, 67, 65, 70, 69, 72],
};

export function OverviewDashboard() {
  const { faultMode, focusMetric, setFocusMetric } = useGridSense();
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const health = faultMode ? 47 : 92;

  useEffect(() => {
    if (!focusMetric) return;
    refs.current[focusMetric]?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = window.setTimeout(() => setFocusMetric(null), 2200);
    return () => window.clearTimeout(timer);
  }, [focusMetric, setFocusMetric]);

  const alerts = useMemo(() => faultMode ? [
    { level: "critical", title: "Transformer 07 - Critical Thermal Overload Detected", meta: "Kampala Central • Now", metric: "temperature" },
    { level: "warning", title: "Feeder 12 - High Load Imbalance", meta: "Kawempe • 4 min ago", metric: "load" },
    { level: "info", title: "Substation 03 - Self-Test Completed", meta: "Jinja Industrial • 12 min ago", metric: "voltage" },
  ] : [
    { level: "critical", title: "Transformer 07 - Phase Overheating Detected", meta: "Kampala Central • 2 min ago", metric: "temperature" },
    { level: "warning", title: "Feeder 12 - High Load Imbalance", meta: "Kawempe • 8 min ago", metric: "load" },
    { level: "info", title: "Substation 03 - Self-Test Completed", meta: "Jinja Industrial • 18 min ago", metric: "voltage" },
  ], [faultMode]);

  const kpis = [
    { id: "temperature", title: "Transformer Temperature", value: faultMode ? "98°C" : "68°C", status: faultMode ? "Critical" : "Normal", icon: Thermometer, tone: faultMode ? "critical" : "healthy", data: faultMode ? [...sparkData.temperature.slice(0, -1), 98] : sparkData.temperature },
    { id: "voltage", title: "Line Voltage", value: "11.2 kV", status: "Stable", icon: Waves, tone: "accent", data: sparkData.voltage },
    { id: "current", title: "Phase Current", value: "245 A", status: "Optimal", icon: Activity, tone: "healthy", data: sparkData.current },
    { id: "load", title: "Total System Load", value: "72%", status: "Moderate", icon: Gauge, tone: "warning", data: sparkData.load },
  ];

  return (
    <>
      <PageIntro eyebrow="AI-powered grid intelligence" title="Overview Dashboard" description="Real-time resilience monitoring across Uganda’s connected electrical infrastructure.">
        <div className="hidden items-center gap-2 text-right sm:flex"><div><p className="text-[10px] uppercase text-muted-foreground">Last sync</p><p className="font-mono text-xs text-healthy">15:08:42 UTC</p></div><Radio className="size-5 text-healthy" /></div>
      </PageIntro>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key grid metrics">
        {kpis.map((kpi) => (
          <div key={kpi.id} ref={(node) => { refs.current[kpi.id] = node; }} className={cn("metric-card min-w-0 overflow-hidden rounded-md border bg-card/75 p-4 transition-all duration-300", kpi.tone === "critical" ? "border-critical shadow-[0_0_26px_var(--critical-glow)]" : "border-border", focusMetric === kpi.id && "ring-2 ring-accent ring-offset-2 ring-offset-background")}>
            <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-xs text-muted-foreground">{kpi.title}</p><p className="mt-2 font-display text-3xl font-semibold tabular-nums">{kpi.value}</p></div><kpi.icon className={cn("size-5 shrink-0", kpi.tone === "critical" ? "text-critical" : kpi.tone === "warning" ? "text-warning" : kpi.tone === "healthy" ? "text-healthy" : "text-accent")} /></div>
            <div className="mt-3 h-12"><ResponsiveContainer width="100%" height="100%"><AreaChart data={kpi.data.map((value, i) => ({ i, value }))}><defs><linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={`var(--${kpi.tone})`} stopOpacity={0.35}/><stop offset="100%" stopColor={`var(--${kpi.tone})`} stopOpacity={0}/></linearGradient></defs><Area type="monotone" dataKey="value" stroke={`var(--${kpi.tone})`} strokeWidth={2} fill={`url(#spark-${kpi.id})`} isAnimationActive /></AreaChart></ResponsiveContainer></div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-xs"><span className={cn(kpi.tone === "critical" ? "text-critical" : kpi.tone === "warning" ? "text-warning" : "text-healthy")}>{kpi.status}</span><span className="font-mono text-muted-foreground">LIVE</span></div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cn("rounded-md border bg-card/75 p-5", faultMode ? "border-critical/60" : "border-border")}>
            <div className="flex items-center justify-between"><div><p className="text-xs uppercase text-muted-foreground">Asset health score</p><h3 className="mt-1 font-display text-xl font-semibold">Transformer 07</h3></div><ShieldAlert className={cn("size-5", faultMode ? "text-critical" : "text-healthy")} /></div>
            <div className="relative mx-auto mt-4 grid size-40 place-items-center"><svg className="size-full -rotate-90" viewBox="0 0 120 120" aria-label={`Asset health ${health} out of 100`}><circle cx="60" cy="60" r="50" fill="none" stroke="var(--muted)" strokeWidth="8"/><circle cx="60" cy="60" r="50" fill="none" stroke={faultMode ? "var(--critical)" : "var(--healthy)"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${health * 3.14} 314`} className="transition-all duration-700"/></svg><div className="absolute text-center"><p className="font-display text-4xl font-semibold tabular-nums">{health}</p><p className="text-xs text-muted-foreground">/ 100</p></div></div>
            <div className={cn("mt-3 text-center text-sm font-semibold", faultMode ? "text-critical" : "text-healthy")}>{faultMode ? "Intervention Required" : "Healthy"}</div>
          </div>

          <div className={cn("rounded-md border bg-card/75 p-5", faultMode ? "border-critical/60" : "border-border")}>
            <div className="flex items-center justify-between"><div><p className="text-xs uppercase text-muted-foreground">AI early fault prediction</p><h3 className="mt-1 font-display text-xl font-semibold">Risk Forecast</h3></div><BrainCircuit className="size-5 text-accent" /></div>
            <div className={cn("mt-8 inline-flex rounded-sm border px-3 py-1 font-mono text-sm font-bold", faultMode ? "border-critical/40 bg-critical/10 text-critical" : "border-healthy/30 bg-healthy/10 text-healthy")}>{faultMode ? "CRITICAL RISK" : "LOW RISK"}</div>
            <p className="mt-6 text-sm text-muted-foreground">Next Maintenance Window</p><p className="mt-1 font-display text-3xl font-semibold">{faultMode ? "Immediate" : "~14 Days"}</p>
            <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground"><Clock3 className="size-4 text-accent" /> Model confidence: {faultMode ? "99.2" : "96.4"}%</div>
          </div>
        </div>

        <div className="min-w-0 rounded-md border border-border bg-card/75 p-4 sm:p-5">
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><div className="min-w-0"><p className="text-xs uppercase text-muted-foreground">24-hour historical curves</p><h3 className="font-display text-xl font-semibold">Real-Time Telemetry</h3></div><div className="flex shrink-0 gap-3 text-[10px]"><span className="text-accent">● Load %</span><span className="text-warning">● Temp °C</span></div></div>
          <div className="h-[310px] w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={faultMode ? telemetry.map((d, i) => i === telemetry.length - 1 ? { ...d, temp: 98 } : d) : telemetry} margin={{ left: -18, right: 8 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3"/><XAxis dataKey="time" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false}/><YAxis domain={[30, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false}/><RechartsTooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--popover-foreground)" }}/><Line type="monotone" dataKey="load" name="Load (%)" stroke="var(--accent)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}/><Line type="monotone" dataKey="temp" name="Temperature (°C)" stroke={faultMode ? "var(--critical)" : "var(--warning)"} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}/></LineChart></ResponsiveContainer></div>
        </div>
      </section>

      <section className="mt-4 rounded-md border border-border bg-card/75 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xs uppercase text-muted-foreground">Prioritized event stream</p><h3 className="font-display text-xl font-semibold">Active Alerts</h3></div><span className="rounded-sm border border-critical/30 bg-critical/10 px-2 py-1 font-mono text-xs text-critical">{faultMode ? "1 CRITICAL" : "3 ACTIVE"}</span></div>
        <div className="grid gap-2 xl:grid-cols-3">{alerts.map((alert) => <Button key={alert.title} variant="ghost" onClick={() => setFocusMetric(alert.metric)} className={cn("h-auto min-w-0 justify-start rounded-md border p-3 text-left", alert.level === "critical" && "border-critical/30 bg-critical/5 hover:bg-critical/10", alert.level === "warning" && "border-warning/25 bg-warning/5 hover:bg-warning/10", alert.level === "info" && "border-healthy/20 bg-healthy/5 hover:bg-healthy/10")}><span className={cn("size-2 shrink-0 rounded-full", alert.level === "critical" ? "bg-critical" : alert.level === "warning" ? "bg-warning" : "bg-healthy")} /><span className="min-w-0 flex-1 whitespace-normal"><span className="block text-xs font-semibold leading-5">{alert.title}</span><span className="block text-[10px] text-muted-foreground">{alert.meta}</span></span><ArrowUpRight className="size-4 shrink-0 text-muted-foreground" /></Button>)}</div>
      </section>

      <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row"><p>Smart today. Reliable tomorrow. Building a resilient Uganda.</p><p className="font-mono">GS-NOC v2.4.1 • Encrypted telemetry</p></footer>
    </>
  );
}
