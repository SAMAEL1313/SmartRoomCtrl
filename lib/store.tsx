"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { formatTime } from "./format";
import { LIGHT_POWER_W, initialState } from "./mock-data";
import type { ActivityEvent, AppState, Mode, Rule } from "./types";

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

// Every action carries an id + time, created at the moment of the click
type Meta = { id: string; time: string };

type Action =
  | { type: "SET_LIGHT"; on: boolean; source: Mode; meta: Meta }
  | { type: "SET_MODE"; mode: Mode; meta: Meta }
  | { type: "TOGGLE_RULE"; id: string; meta: Meta }
  | { type: "SET_THRESHOLD"; value: number; meta: Meta }
  | { type: "SET_VACANCY_TIMEOUT"; minutes: number; meta: Meta };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function isRoomDark(state: AppState): boolean {
  return state.ambientLux < state.threshold;
}

export function ruleSummary(rule: Rule): string {
  return `IF ${rule.conditions.map((c) => c.label).join(" + ")} → ${rule.action}`;
}

function addEvent(activity: ActivityEvent[], event: ActivityEvent): ActivityEvent[] {
  // e.g. dragging the threshold slider updates one event instead of adding 50
  if (event.mergeKey && activity[0]?.mergeKey === event.mergeKey) {
    return [event, ...activity.slice(1)];
  }
  return [event, ...activity];
}

function switchLight(
  state: AppState,
  on: boolean,
  source: Mode,
  meta: Meta,
  detail: string
): AppState {
  return {
    ...state,
    lightOn: on,
    lightSource: source,
    powerDraw: on ? LIGHT_POWER_W : 0,
    lastCommand: {
      label: `${source.toUpperCase()} → ${on ? "ON" : "OFF"}`,
      time: meta.time,
    },
    activity: addEvent(state.activity, {
      id: meta.id,
      type: "light",
      title: `Light switched ${on ? "ON" : "OFF"}`,
      source: source === "auto" ? "AUTO" : "MANUAL",
      detail,
      time: meta.time,
      day: "today",
      lightState: on ? "on" : "off",
    }),
  };
}

function markTriggered(state: AppState, ruleId: string, time: string): AppState {
  return {
    ...state,
    rules: state.rules.map((r) => (r.id === ruleId ? { ...r, lastTriggered: time } : r)),
  };
}

/** In AUTO mode, check the rules and switch the light if needed */
function applyAutomation(state: AppState, meta: Meta): AppState {
  if (state.mode !== "auto") return state;

  const enabled = (id: string) => state.rules.find((r) => r.id === id)?.enabled ?? false;
  const dark = isRoomDark(state);
  const autoMeta: Meta = { id: `${meta.id}-auto`, time: meta.time };

  if (enabled("RULE-01") && dark && state.occupancy && !state.lightOn) {
    return markTriggered(
      switchLight(state, true, "auto", autoMeta, "Dark + occupied"),
      "RULE-01",
      meta.time
    );
  }

  if (enabled("RULE-03") && !dark && state.lightOn) {
    return markTriggered(
      switchLight(state, false, "auto", autoMeta, "Room is bright"),
      "RULE-03",
      meta.time
    );
  }

  return state;
}

/* ------------------------------------------------------------------ */
/* Reducer: takes the current state + an action, returns new state    */
/* ------------------------------------------------------------------ */

function roomReducer(state: AppState, action: Action): AppState {
  const { meta } = action;

  switch (action.type) {
    case "SET_LIGHT": {
      if (state.lightOn === action.on) return state;

      let next = switchLight(
        state,
        action.on,
        action.source,
        meta,
        action.source === "manual" ? "Manual override" : "Rule triggered"
      );

      // Using the manual buttons pauses AUTO mode
      if (action.source === "manual" && state.mode === "auto") {
        next = {
          ...next,
          mode: "manual",
          activity: addEvent(next.activity, {
            id: `${meta.id}-mode`,
            type: "mode",
            title: "Auto mode paused",
            source: "MANUAL",
            detail: "Manual control used",
            time: meta.time,
            day: "today",
          }),
        };
      }
      return next;
    }

    case "SET_MODE": {
      if (state.mode === action.mode) return state;
      const next: AppState = {
        ...state,
        mode: action.mode,
        activity: addEvent(state.activity, {
          id: meta.id,
          type: "mode",
          title: `Control mode set to ${action.mode.toUpperCase()}`,
          source: "MANUAL",
          detail: "Set from dashboard",
          time: meta.time,
          day: "today",
        }),
      };
      return applyAutomation(next, meta);
    }

    case "TOGGLE_RULE": {
      const rule = state.rules.find((r) => r.id === action.id);
      if (!rule) return state;
      const enabled = !rule.enabled;
      const next: AppState = {
        ...state,
        rules: state.rules.map((r) => (r.id === action.id ? { ...r, enabled } : r)),
        activity: addEvent(state.activity, {
          id: meta.id,
          type: "rule",
          title: `${rule.id} ${enabled ? "enabled" : "disabled"}`,
          source: "MANUAL",
          detail: ruleSummary(rule),
          time: meta.time,
          day: "today",
        }),
      };
      return applyAutomation(next, meta);
    }

    case "SET_THRESHOLD": {
      if (state.threshold === action.value) return state;
      const next: AppState = {
        ...state,
        threshold: action.value,
        activity: addEvent(state.activity, {
          id: meta.id,
          type: "setting",
          title: "Light threshold changed",
          source: "MANUAL",
          detail: `Activation threshold set to ${action.value} lx`,
          time: meta.time,
          day: "today",
          mergeKey: "threshold",
        }),
      };
      return applyAutomation(next, meta);
    }

    case "SET_VACANCY_TIMEOUT": {
      if (state.vacancyTimeout === action.minutes) return state;
      return {
        ...state,
        vacancyTimeout: action.minutes,
        rules: state.rules.map((r) =>
          r.id === "RULE-02"
            ? { ...r, conditions: [{ label: `VACANT FOR ${action.minutes} MIN`, tone: "muted" }] }
            : r
        ),
        activity: addEvent(state.activity, {
          id: meta.id,
          type: "setting",
          title: "Vacancy timeout changed",
          source: "MANUAL",
          detail: `Set to ${action.minutes} min`,
          time: meta.time,
          day: "today",
        }),
      };
    }
  }
}

/* ------------------------------------------------------------------ */
/* Context + hook                                                      */
/* ------------------------------------------------------------------ */

type RoomContextValue = {
  state: AppState;
  isDark: boolean;
  setLight: (on: boolean) => void;
  setMode: (mode: Mode) => void;
  toggleRule: (id: string) => void;
  setThreshold: (value: number) => void;
  setVacancyTimeout: (minutes: number) => void;
};

const RoomContext = createContext<RoomContextValue | null>(null);

function createMeta(): Meta {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    time: formatTime(new Date()),
  };
}

export function RoomProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(roomReducer, initialState);

  const actions = useMemo(
    () => ({
      setLight: (on: boolean) =>
        dispatch({ type: "SET_LIGHT", on, source: "manual", meta: createMeta() }),
      setMode: (mode: Mode) => dispatch({ type: "SET_MODE", mode, meta: createMeta() }),
      toggleRule: (id: string) => dispatch({ type: "TOGGLE_RULE", id, meta: createMeta() }),
      setThreshold: (value: number) =>
        dispatch({ type: "SET_THRESHOLD", value, meta: createMeta() }),
      setVacancyTimeout: (minutes: number) =>
        dispatch({ type: "SET_VACANCY_TIMEOUT", minutes, meta: createMeta() }),
    }),
    []
  );

  const value = useMemo<RoomContextValue>(
    () => ({ state, isDark: isRoomDark(state), ...actions }),
    [state, actions]
  );

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}

/** Use this in any component: const { state, setLight } = useRoom(); */
export function useRoom(): RoomContextValue {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoom must be used inside <RoomProvider>");
  return ctx;
}