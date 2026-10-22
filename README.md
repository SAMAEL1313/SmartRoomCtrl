# ROOM / CTRL

A smart room control dashboard for a room: a ceiling light (relay), a motion sensor (PIR), an ambient light sensor and a smart plug. You can switch the light, choose AUTO or MANUAL mode, edit the automation rules and thresholds, and read the activity log.

**This repo is the frontend only.** There is no backend, API or database. All data comes from a client-side mock store (`lib/mock-data.ts`), so changes reset when you reload the page.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19
- TypeScript (strict)
- Tailwind CSS v4, with theme colors as CSS variables in `app/globals.css`
- `next-themes` for light / dark mode
- `lucide-react` icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Pages

| Route         | What it shows                                                                    |
| ------------- | -------------------------------------------------------------------------------- |
| `/`           | Overview: sensor status cards, light control, control mode, recent activity      |
| `/automation` | Control mode, rules (enable / disable), light threshold and vacancy timeout       |
| `/activity`   | Full activity log, filterable by event type and source, grouped by day            |
| `/devices`    | Room summary and one card per device with its live reading and connection status |

## Project structure

```
app/                  Routes (server components that only lay out the page)
  layout.tsx          Root layout: fonts, ThemeProvider, RoomProvider, AppShell
  globals.css         Theme tokens (light + dark) and Tailwind setup
components/
  ui/                 Reusable building blocks: Panel, StatusCard, Button, Pill, Switch, Slider, …
  layout/             App shell: top bar, sidebar, theme toggle
  overview/           Overview page sections
  automation/         Automation page panels + shared RuleText and mode options
  activity/           Activity log page, filters, ActivityIcon / ActivityRow
  devices/            Devices page, DeviceCard, RoomSummary
  providers/          ThemeProvider
lib/
  store.tsx           The room state: reducer, actions and the useRoom() hook
  types.ts            Data shapes: AppState, Rule, Device, ActivityEvent
  mock-data.ts        Initial (fake) state
  format.ts           Time / watts / day label helpers
```

## Connecting real hardware (ESP32)

### Where the data lives

All data flows through **`lib/store.tsx`**, and the data shapes are in **`lib/types.ts`**. Every page reads from `useRoom()`, so **pages and components do not need to change** to go live. Only the store does.

Today, the actions returned by `useRoom()` (`setLight`, `setMode`, `toggleRule`, `setThreshold`, `setVacancyTimeout`) only update local React state. To connect hardware:

1. **Outgoing:** each action should send a command to the device instead of (or as well as) updating local state.
2. **Incoming:** status messages from the device should update the state. The cleanest way is a new reducer action that merges the received fields into `AppState` and appends any `ActivityEvent`s.
3. Treat the device as the source of truth. The UI can update optimistically, then correct itself when the next status message arrives.

### Suggested message formats (JSON)

**Status (device → dashboard).** Send the full snapshot on connect and after every change. The fields match `AppState`:

```json
{
  "type": "status",
  "lightOn": true,
  "lightSource": "auto",
  "powerDraw": 12.4,
  "mode": "auto",
  "ambientLux": 18,
  "threshold": 50,
  "occupancy": true,
  "vacancyTimeout": 5,
  "rules": [{ "id": "RULE-01", "enabled": true, "lastTriggered": "18:37:12" }],
  "devices": [{ "id": "PIR-01", "status": "connected", "lastSeen": "18:42:00" }]
}
```

**Event (device → dashboard).** One per activity log entry, matching `ActivityEvent`:

```json
{
  "type": "event",
  "event": {
    "id": "evt-16",
    "type": "light",
    "title": "Light switched OFF",
    "source": "AUTO",
    "detail": "Vacancy timeout reached",
    "time": "18:47:00",
    "day": "today",
    "lightState": "off"
  }
}
```

**Commands (dashboard → device):**

```json
{ "type": "setLight",          "on": false }
{ "type": "setMode",           "mode": "manual" }
{ "type": "toggleRule",        "id": "RULE-03", "enabled": true }
{ "type": "setThreshold",      "lux": 40 }
{ "type": "setVacancyTimeout", "minutes": 10 }
```

### Run the automation on the ESP32

The rule logic currently lives in the store (`applyAutomation` in `lib/store.tsx`), which only runs while a dashboard tab is open. **On real hardware the rules must run on the ESP32**, so the light keeps working when no one has the dashboard open. The dashboard then only displays the state and sends settings. After that move, the reducer's automation code can be removed.

### Transport options

- **WebSocket server on the ESP32.** Simple and low latency, but it only works on the same Wi-Fi network.
- **MQTT broker** (e.g. Mosquitto, HiveMQ Cloud). The ESP32 and the dashboard both connect to the broker, so it works remotely. Suggested topics: `roomctrl/studio/status`, `roomctrl/studio/events`, `roomctrl/studio/cmd`. Browsers need the broker's WebSocket (WSS) listener.

> **Mixed content:** a dashboard served over HTTPS (e.g. on Vercel) **cannot** connect to a plain `ws://192.168.x.x` address on the local network, because browsers block it. Either serve the dashboard locally over HTTP, give the ESP32 a TLS (`wss://`) endpoint, or go through a broker that offers `wss://`.
