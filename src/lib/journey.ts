import { useCallback, useEffect, useState } from "react";

export type MythAnswers = {
  fog: string;
  state: string;
  alive: string;
  missing: string;
};

export type Journey = {
  mythDone: boolean;
  codeDone: boolean;
  meetingDone: boolean;
  mythAnswers?: MythAnswers;
  mythTitle?: string;
  birthDate?: string;
};

export const EMPTY_JOURNEY: Journey = {
  mythDone: false,
  codeDone: false,
  meetingDone: false,
};

const KEY = "mirror_journey_v1";

export function readJourney(): Journey {
  if (typeof window === "undefined") return EMPTY_JOURNEY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_JOURNEY;
    return { ...EMPTY_JOURNEY, ...(JSON.parse(raw) as Journey) };
  } catch {
    return EMPTY_JOURNEY;
  }
}

function writeJourney(j: Journey) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(j));
    window.dispatchEvent(new CustomEvent("mirror-journey"));
  } catch {
    /* storage unavailable */
  }
}

/** Читает состояние только после гидрации — SSR всегда отдаёт пустое. */
export function useJourney() {
  const [journey, setJourney] = useState<Journey>(EMPTY_JOURNEY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setJourney(readJourney());
    sync();
    setReady(true);
    window.addEventListener("mirror-journey", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("mirror-journey", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback((patch: Partial<Journey>) => {
    const next = { ...readJourney(), ...patch };
    writeJourney(next);
    setJourney(next);
  }, []);

  return { journey, update, ready };
}
