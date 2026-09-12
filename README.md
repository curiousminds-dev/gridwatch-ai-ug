# GridSense Guardian

Build a high-fidelity, real-time industrial IoT monitoring dashboard for "GridSense AI" (Ugandan Electrical Grid Resilience & Early Fault Detection Platform) inspired by the attached reference image.

Design & Theme:
- Dark industrial slate/navy background (#0B0F19) with glassmorphism cards and high-contrast neon accents: Emerald Green (healthy/optimal), Amber Yellow (warning), Bright Red (critical/fault).
- GridSense AI branding with the circuit 'G' logo, tagline ("See the warning. Prevent the outage. / Smart today. Reliable tomorrow. Building a resilient Uganda"), and status indicator ("System Live - 12 Nodes Connected").
- Fully responsive: left sidebar navigation on desktop with collapsibility, bottom tab bar on mobile.

Top Navigation & Pitch Demo Controls:
- Interactive "Simulate Critical Thermal Fault" toggle in header for pitch demos.
- Triggering simulation dynamically: spikes Transformer Temp to 98°C, turns gauge borders red, triggers a flashing top warning banner, and pushes a prioritized red critical alert ("Transformer 07 - Critical Thermal Overload Detected").

Dashboard Sections:
1. Top KPI Cards Row with mini trend sparklines:
   - Transformer Temperature: 68°C (Normal) [spikes to 98°C in fault simulation]
   - Line Voltage: 11.2 kV (Stable)
   - Phase Current: 245 A (Optimal)
   - Total System Load: 72% (Moderate)
2. Asset Health & Prediction Section:
   - Circular radial progress meter showing "Asset Health Score: 92/100 (Healthy)" [drops in fault simulation].
   - AI Early Fault Prediction card: "LOW RISK - Next Maintenance Window: ~14 Days".
3. Active Alerts Stream:
   - Prioritized feed: Red Critical ("Transformer 07 - Phase Overheating Detected"), Amber Warning ("Feeder 12 - High Load Imbalance"), Green Info ("Substation 03 - Self-Test Completed").
   - Clicking an alert highlights and focuses the corresponding metric card.
4. Real-Time Telemetry Graph:
   - Interactive line chart (Recharts) showing 24-hour historical curves for Load (%) and Temperature (°C) with tooltips.

Navigation Tabs:
- "Overview Dashboard", "Asset Map" (Uganda grid substations interactive map view e.g. Kampala Central, Jinja Industrial, Kawempe, Entebbe), "Analytics", and "Settings".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e8938aff-a1f4-46f8-bedf-57617240ff8b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
