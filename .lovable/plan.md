# GridSense AI Industrial Monitoring Dashboard

## Goal
Build a high-fidelity, responsive electrical-grid operations dashboard for Uganda, using the supplied reference as visual inspiration without embedding it directly.

## Experience
- Create a dark industrial control-room interface with neon emerald, amber, red, and cyan telemetry accents.
- Add a branded circuit-style “G” mark, GridSense AI identity, resilience messaging, and a live 12-node status.
- Use a collapsible desktop sidebar and a persistent mobile bottom navigation.
- Provide dedicated views for Overview Dashboard, Asset Health, Active Alerts, Grid Map, Analytics, and Settings.

## Dashboard behavior
- Show four live KPI panels with compact trend lines for temperature, voltage, current, and system load.
- Add an asset-health radial meter and AI maintenance-risk prediction.
- Render an interactive 24-hour Recharts telemetry graph with load and temperature tooltips.
- Build a prioritized alert stream; selecting an alert visually focuses its related metric.
- Add the pitch-demo thermal-fault switch. When active, temperature rises to 98°C, asset health falls, warning treatments turn critical red, a flashing warning strip appears, and the Transformer 07 overload alert moves to the top.
- Add polished, deterministic demo data and interactions without external services or persistent storage.

## Responsive presentation
- Optimize the dense monitoring layout for desktop control rooms while preserving clear reading order on tablets and phones.
- Replace the sidebar with a compact bottom tab bar on mobile.
- Keep gauges, charts, controls, and labels stable at narrow widths with no clipping or overlap.

## Technical details
- Use TanStack Router routes for each navigation destination and shared React layout components.
- Use the installed Recharts and Lucide libraries, existing Shadcn controls, semantic Tailwind v4 tokens, and accessible labels/tooltips.
- Add route-specific page metadata, including title, description, Open Graph, and Twitter fields.
- Verify the overview, simulation, alert focusing, sidebar collapse, route navigation, and mobile layout in the running preview.
