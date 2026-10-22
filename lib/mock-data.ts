import type { AppState } from "./types";

export const LIGHT_POWER_W = 12.4;

export const initialState: AppState = {
  lightOn: true,
  lightSource: "auto",
  powerDraw: LIGHT_POWER_W,
  mode: "auto",
  ambientLux: 18,
  threshold: 50,
  occupancy: true,
  vacancyTimeout: 5,
  lastCommand: { label: "AUTO → ON", time: "18:37:12" },

  rules: [
    {
      id: "RULE-01",
      conditions: [
        { label: "DARK", tone: "warn" },
        { label: "OCCUPANCY DETECTED", tone: "accent" },
      ],
      action: "LIGHT ON",
      enabled: true,
      lastTriggered: "18:37:12",
    },
    {
      id: "RULE-02",
      conditions: [{ label: "VACANT FOR 5 MIN", tone: "muted" }],
      action: "LIGHT OFF",
      enabled: true,
      lastTriggered: "18:32:11",
    },
    {
      id: "RULE-03",
      conditions: [{ label: "BRIGHT", tone: "accent" }],
      action: "LIGHT OFF",
      enabled: false,
      lastTriggered: null,
    },
  ],

  devices: [
    { id: "LGT-01", name: "Studio ceiling light", type: "Relay", status: "connected", lastSeen: "18:42:05" },
    { id: "PIR-01", name: "Motion sensor", type: "PIR sensor", status: "connected", lastSeen: "18:42:00" },
    { id: "LUX-01", name: "Ambient light sensor", type: "Light sensor", status: "connected", lastSeen: "18:42:04" },
    { id: "PLG-02", name: "Desk plug", type: "Smart plug", status: "offline", lastSeen: "Yesterday 22:10" },
  ],

  // Newest first
  activity: [
    // ---- TODAY ----
    { id: "evt-15", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "18:42:00", day: "today" },
    { id: "evt-14", type: "light", title: "Light switched ON", source: "AUTO", detail: "Dark + occupied", time: "18:37:12", day: "today", lightState: "on" },
    { id: "evt-13", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "18:37:11", day: "today" },
    { id: "evt-12", type: "light", title: "Light switched OFF", source: "AUTO", detail: "Vacancy timeout reached", time: "18:32:11", day: "today", lightState: "off" },
    { id: "evt-11", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "18:27:11", day: "today" },
    { id: "evt-10", type: "light", title: "Light switched ON", source: "AUTO", detail: "Dark + occupied", time: "17:58:40", day: "today", lightState: "on" },
    { id: "evt-09", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "17:58:39", day: "today" },
    { id: "evt-08", type: "mode", title: "Control mode set to AUTO", source: "MANUAL", detail: "Set from dashboard", time: "09:15:02", day: "today" },
    { id: "evt-07", type: "light", title: "Light switched OFF", source: "MANUAL", detail: "Manual override", time: "09:14:50", day: "today", lightState: "off" },

    // ---- YESTERDAY ----
    { id: "evt-06", type: "light", title: "Light switched OFF", source: "AUTO", detail: "Vacancy timeout reached", time: "23:41:05", day: "yesterday", lightState: "off" },
    { id: "evt-05", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "23:36:02", day: "yesterday" },
    { id: "evt-04", type: "rule", title: "RULE-03 disabled", source: "MANUAL", detail: "IF BRIGHT → LIGHT OFF", time: "21:10:30", day: "yesterday" },
    { id: "evt-03", type: "light", title: "Light switched ON", source: "AUTO", detail: "Dark + occupied", time: "19:02:18", day: "yesterday", lightState: "on" },
    { id: "evt-02", type: "occupancy", title: "Occupancy detected", source: "PIR-01", detail: "Motion in studio", time: "19:02:17", day: "yesterday" },
    { id: "evt-01", type: "setting", title: "Light threshold changed", source: "MANUAL", detail: "Activation threshold set to 50 lx", time: "18:55:00", day: "yesterday" },
  ],
};