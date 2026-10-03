export const STORE_KEY = "aeturnus-frontend-demo-v1";

const emptyStore = {
  profile: { name: "", email: "", country: "India", locale: "en-IN" },
  records: [],
  people: [],
  policies: [],
  checkIns: [],
  activity: [],
  engineState: 0,
};

export function readDemoStore() {
  if (typeof window === "undefined") return emptyStore;

  try {
    const stored = window.localStorage.getItem(STORE_KEY);
    return stored ? { ...emptyStore, ...JSON.parse(stored) } : emptyStore;
  } catch {
    return emptyStore;
  }
}

export function writeDemoStore(store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // Keep the demo usable if browser storage is unavailable.
  }
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

export function formatDate(date, locale = "en-IN") {
  if (!date) return "Not set";
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(date));
}
