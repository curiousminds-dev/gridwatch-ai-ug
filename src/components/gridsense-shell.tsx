import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  Gauge,
  MapPinned,
  Settings,
  ShieldCheck,
  Wifi,
  Zap,
} from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview Dashboard", short: "Overview", to: "/", icon: Gauge },
  { label: "Asset Health", short: "Assets", to: "/asset-health", icon: ShieldCheck },
  { label: "Active Alerts", short: "Alerts", to: "/alerts", icon: BellRing },
  { label: "Grid Map", short: "Map", to: "/grid-map", icon: MapPinned },
  { label: "Analytics", short: "Analytics", to: "/analytics", icon: ChartNoAxesCombined },
  { label: "Settings", short: "Settings", to: "/settings", icon: Settings },
] as const;

type GridContextValue = {
  faultMode: boolean;
  setFaultMode: (value: boolean) => void;
  focusMetric: string | null;
  setFocusMetric: (value: string | null) => void;
};

const GridContext = createContext<GridContextValue | null>(null);

export function useGridSense() {
  const value = useContext(GridContext);
  if (!value) throw new Error("useGridSense must be used within GridSenseShell");
  return value;
}

export function GridSenseShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [faultMode, setFaultMode] = useState(false);
  const [focusMetric, setFocusMetric] = useState<string | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <GridContext.Provider value={{ faultMode, setFaultMode, focusMetric, setFocusMetric }}>
      <div className="min-h-screen bg-background text-foreground">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-border bg-sidebar transition-[width] duration-200 md:flex md:flex-col",
            collapsed ? "w-18" : "w-64",
          )}
        >
          <div className="flex h-20 items-center gap-3 border-b border-border px-4">
            <BrandMark />
            {!collapsed && (
              <div className="min-w-0">
                <div className="truncate font-display text-xl font-bold text-foreground">GridSense <span className="text-accent">AI</span></div>
                <div className="text-[10px] uppercase text-muted-foreground">Uganda grid intelligence</div>
              </div>
            )}
          </div>
          <nav className="flex-1 space-y-1.5 px-2 py-6" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Tooltip key={item.to}>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" className={cn("h-11 w-full justify-start gap-3 px-3", active && "bg-sidebar-accent text-accent ring-1 ring-accent/25", collapsed && "justify-center px-0")}>
                      <Link to={item.to}>
                        <item.icon className="size-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            {!collapsed && (
              <div className="mb-3 flex items-center gap-2 rounded-md border border-healthy/20 bg-healthy/5 p-3 text-xs text-healthy">
                <Wifi className="size-4" /> <span>12 / 12 nodes online</span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand navigation" : "Collapse navigation"} className="w-full">
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </aside>

        <div className={cn("min-h-screen transition-[padding] duration-200 md:pb-0", collapsed ? "md:pl-18" : "md:pl-64")}>
          {faultMode && (
            <div className="critical-flash sticky top-0 z-50 flex min-h-10 items-center justify-center gap-2 border-b border-critical bg-critical/15 px-4 py-2 text-center text-xs font-bold uppercase text-critical sm:text-sm">
              <BellRing className="size-4 shrink-0" /> Critical fault: Transformer 07 thermal overload — intervention required
            </div>
          )}
          <header className="sticky top-0 z-30 grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-healthy"><span className="live-dot" /> System live <span className="text-muted-foreground">• 12 nodes connected</span></div>
              <h1 className="truncate font-display text-lg font-semibold sm:text-2xl">National Grid Operations</h1>
            </div>
            <div className={cn("flex shrink-0 items-center gap-3 rounded-md border px-3 py-2", faultMode ? "border-critical/50 bg-critical/10" : "border-border bg-card/70")}>
              <div className="hidden text-right lg:block">
                <p className="text-xs font-semibold">Simulate Critical Thermal Fault</p>
                <p className="text-[10px] text-muted-foreground">Pitch demo control</p>
              </div>
              <Switch checked={faultMode} onCheckedChange={(value) => { setFaultMode(value); setFocusMetric(value ? "temperature" : null); }} aria-label="Simulate Critical Thermal Fault" className="data-[state=checked]:bg-critical" />
            </div>
          </header>
          <main className="mx-auto w-full max-w-[1600px] px-4 py-5 pb-28 sm:px-6 lg:px-8 md:pb-8">{children}</main>
        </div>

        <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-6 border-t border-border bg-sidebar/95 px-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link key={item.to} to={item.to} className={cn("flex min-w-0 flex-col items-center gap-1 px-1 py-2 text-[9px] text-muted-foreground", active && "text-accent")}>
                <item.icon className="size-4 shrink-0" /><span className="truncate">{item.short}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </GridContext.Provider>
  );
}

function BrandMark() {
  return (
    <div className="relative grid size-10 shrink-0 place-items-center rounded-full border-2 border-accent text-lg font-black text-accent shadow-[0_0_20px_var(--accent-glow)]">
      G<span className="absolute -right-2 top-1 h-px w-3 bg-accent" /><span className="absolute -right-2 top-3 h-px w-2 bg-accent" />
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-accent"><BrainCircuit className="size-4" />{eyebrow}</div>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function MetricBadge({ label, value, tone = "healthy" }: { label: string; value: string; tone?: "healthy" | "warning" | "critical" }) {
  return <div className={cn("rounded-md border bg-card/70 px-4 py-3", tone === "healthy" && "border-healthy/25", tone === "warning" && "border-warning/30", tone === "critical" && "border-critical/40")}><p className="text-xs text-muted-foreground">{label}</p><p className={cn("mt-1 font-display text-xl font-semibold", tone === "healthy" && "text-healthy", tone === "warning" && "text-warning", tone === "critical" && "text-critical")}>{value}</p></div>;
}

export { Activity, Zap };
