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
    if (!stored) return emptyStore;
    const parsed = JSON.parse(stored);
    return {
      ...emptyStore,
      ...parsed,
      records: (Array.isArray(parsed.records) ? parsed.records : []).map(
        ({ imageData, ...record }) => record,
      ),
      people: (Array.isArray(parsed.people) ? parsed.people : []).map(
        ({ aadhaar, pan, emailOtp, phoneOtp, ...person }) => ({
          ...person,
          verificationStatus: "pending",
          emailVerified: false,
          phoneVerified: false,
        }),
      ),
    };
  } catch {
    return emptyStore;
  }
}

export function writeDemoStore(store) {
  try {
    const { records, ...rest } = store;
    const persistentStore = {
      ...rest,
      records: records.map(({ imageData, ...record }) => record),
    };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(persistentStore));
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
