export type Mode = "auto" | "manual";
export type Day = "today" | "yesterday";
export type Tone = "accent" | "warn" | "danger" | "fg" | "muted";

export type EventType = "light" | "occupancy" | "mode" | "rule" | "setting";
export type EventSource = "AUTO" | "MANUAL" | "PIR-01";

export type ActivityEvent = {
  id: string;
  type: EventType;
  title: string;
  source: EventSource;
  detail: string;
  time: string; // "HH:MM:SS"
  day: Day;
  lightState?: "on" | "off"; // only for light events (picks the icon)
  mergeKey?: string; // events with the same key replace each other instead of piling up
};

export type RuleCondition = {
  label: string;
  tone: Tone;
};

export type Rule = {
  id: string;
  conditions: RuleCondition[];
  action: string;
  enabled: boolean;
  lastTriggered: string | null;
};

export type DeviceStatus = "connected" | "offline";

export type Device = {
  id: string;
  name: string;
  type: string;
  status: DeviceStatus;
  lastSeen: string;
};

export type AppState = {
  lightOn: boolean;
  lightSource: Mode; // who switched the light last
  powerDraw: number; // watts
  mode: Mode;
  ambientLux: number;
  threshold: number; // lux
  occupancy: boolean;
  vacancyTimeout: number; // minutes
  lastCommand: { label: string; time: string };
  rules: Rule[];
  devices: Device[];
  activity: ActivityEvent[];
};