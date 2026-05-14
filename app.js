"use strict";

const STORAGE_KEY = "festival-time-table:v1";
const API_BASE_KEY = "festival-api-base";
const API_KEY_KEY = "festival-api-key";
const SUPABASE_URL = "https://iszylzztpmlezgqpbyas.supabase.co/rest/v1/";
const SUPABASE_PUBLIC_KEY = "sb_publishable_qHGViBmiRPwix_yspZDEKg_N_G4EaE0";
const DEFAULT_API_BASE = SUPABASE_URL;
const COLORS = [
  "#43b79d",
  "#f06464",
  "#6faee8",
  "#a98ae8",
  "#f0bf4c",
  "#ff8f5a",
  "#6dd17c",
  "#f27ac2",
  "#7bd7e8",
  "#d1a15d",
  "#9ad66b",
  "#ffcf70",
];
const DAYS = [
  { value: "2026-06-05", label: "Fr, 05.06." },
  { value: "2026-06-06", label: "Sa, 06.06." },
  { value: "2026-06-07", label: "So, 07.06." },
];
const OFFICIAL_TIMETABLE = [
  ["2026-06-05", "Utopia Stage", "Ecca Vandal", "12:50", "13:35"],
  ["2026-06-05", "Utopia Stage", "The Pretty Reckless", "14:05", "15:05"],
  ["2026-06-05", "Utopia Stage", "Tom Morello", "15:35", "16:35"],
  ["2026-06-05", "Utopia Stage", "Three Days Grace", "17:05", "18:20"],
  ["2026-06-05", "Utopia Stage", "Electric Callboy", "19:00", "20:30"],
  ["2026-06-05", "Utopia Stage", "Volbeat", "21:15", "23:00"],
  ["2026-06-05", "Mandora Stage", "Badflower", "13:45", "14:20"],
  ["2026-06-05", "Mandora Stage", "Paleface Swiss", "14:40", "15:15"],
  ["2026-06-05", "Mandora Stage", "Bilmuri", "15:35", "16:20"],
  ["2026-06-05", "Mandora Stage", "Bury Tomorrow", "16:45", "17:40"],
  ["2026-06-05", "Mandora Stage", "Landmvrks", "18:10", "19:10"],
  ["2026-06-05", "Mandora Stage", "Ice Nine Kills", "19:40", "20:50"],
  ["2026-06-05", "Mandora Stage", "Marteria", "21:30", "22:45"],
  ["2026-06-05", "Mandora Stage", "Bad Omens", "23:30", "01:00"],
  ["2026-06-05", "Orbit Stage", "Max Grimm", "13:10", "13:50"],
  ["2026-06-05", "Orbit Stage", "Letlive.", "14:15", "14:55"],
  ["2026-06-05", "Orbit Stage", "The Subways", "15:20", "16:00"],
  ["2026-06-05", "Orbit Stage", "Wargasm", "16:25", "17:05"],
  ["2026-06-05", "Orbit Stage", "Dying Wish", "17:30", "18:10"],
  ["2026-06-05", "Orbit Stage", "High Vis", "18:35", "19:20"],
  ["2026-06-05", "Orbit Stage", "Thornhill", "19:45", "20:30"],
  ["2026-06-05", "Orbit Stage", "The Garden", "20:55", "21:45"],
  ["2026-06-05", "Orbit Stage", "Basement", "22:10", "22:55"],
  ["2026-06-05", "Orbit Stage", "Palaye Royale", "23:20", "00:20"],
  ["2026-06-05", "Orbit Stage", "H-Blockx", "00:50", "02:00"],
  ["2026-06-06", "Utopia Stage", "Bad Nerves", "12:35", "13:20"],
  ["2026-06-06", "Utopia Stage", "Black Veil Brides", "13:50", "14:45"],
  ["2026-06-06", "Utopia Stage", "Hollywood Undead", "15:15", "16:15"],
  ["2026-06-06", "Utopia Stage", "Finch", "16:45", "17:55"],
  ["2026-06-06", "Utopia Stage", "The Offspring", "18:40", "19:55"],
  ["2026-06-06", "Utopia Stage", "Iron Maiden", "20:40", "23:00"],
  ["2026-06-06", "Mandora Stage", "Return to Dust", "13:35", "14:05"],
  ["2026-06-06", "Mandora Stage", "Blood Incantation", "14:25", "15:10"],
  ["2026-06-06", "Mandora Stage", "Bloodywood", "15:35", "16:20"],
  ["2026-06-06", "Mandora Stage", "Breaking Benjamin", "16:45", "17:40"],
  ["2026-06-06", "Mandora Stage", "Social Distortion", "18:10", "19:10"],
  ["2026-06-06", "Mandora Stage", "Alter Bridge", "19:40", "20:40"],
  ["2026-06-06", "Mandora Stage", "A Perfect Circle", "21:20", "22:35"],
  ["2026-06-06", "Mandora Stage", "Sabaton", "23:20", "01:00"],
  ["2026-06-06", "Orbit Stage", "Mouth Culture", "12:50", "13:30"],
  ["2026-06-06", "Orbit Stage", "Ego Kill Talent", "13:55", "14:35"],
  ["2026-06-06", "Orbit Stage", "Boundaries", "15:00", "15:40"],
  ["2026-06-06", "Orbit Stage", "Gatecreeper", "16:05", "16:45"],
  ["2026-06-06", "Orbit Stage", "Catch Your Breath", "17:10", "17:50"],
  ["2026-06-06", "Orbit Stage", "TesseracT", "18:15", "19:00"],
  ["2026-06-06", "Orbit Stage", "President", "19:25", "20:15"],
  ["2026-06-06", "Orbit Stage", "The Story So Far", "20:40", "21:25"],
  ["2026-06-06", "Orbit Stage", "Set It Off", "21:50", "22:50"],
  ["2026-06-06", "Orbit Stage", "Kublai Khan TX", "23:20", "00:20"],
  ["2026-06-06", "Orbit Stage", "Sondaschule", "00:50", "02:00"],
  ["2026-06-07", "Utopia Stage", "Mehnersmoos", "13:25", "14:20"],
  ["2026-06-07", "Utopia Stage", "Bush", "14:50", "15:50"],
  ["2026-06-07", "Utopia Stage", "The Hives", "16:20", "17:20"],
  ["2026-06-07", "Utopia Stage", "Architects", "17:50", "18:50"],
  ["2026-06-07", "Utopia Stage", "Papa Roach", "19:30", "20:45"],
  ["2026-06-07", "Utopia Stage", "Linkin Park", "21:30", "23:00"],
  ["2026-06-07", "Mandora Stage", "Loathe", "12:50", "13:35"],
  ["2026-06-07", "Mandora Stage", "We Came As Romans", "14:05", "14:50"],
  ["2026-06-07", "Mandora Stage", "Mastodon", "15:20", "16:10"],
  ["2026-06-07", "Mandora Stage", "The Plot In You", "16:40", "17:40"],
  ["2026-06-07", "Mandora Stage", "Within Temptation", "18:10", "19:10"],
  ["2026-06-07", "Mandora Stage", "Trivium", "19:40", "20:50"],
  ["2026-06-07", "Mandora Stage", "Babymetal", "21:30", "22:45"],
  ["2026-06-07", "Mandora Stage", "Limp Bizkit", "23:45", "01:00"],
  ["2026-06-07", "Orbit Stage", "Slay Squad", "13:55", "14:35"],
  ["2026-06-07", "Orbit Stage", "Ankor", "15:00", "15:40"],
  ["2026-06-07", "Orbit Stage", "Magnolia Park", "16:05", "16:45"],
  ["2026-06-07", "Orbit Stage", "TX2", "17:10", "17:50"],
  ["2026-06-07", "Orbit Stage", "Don Broco", "18:15", "19:00"],
  ["2026-06-07", "Orbit Stage", "DRAIN", "19:25", "20:10"],
  ["2026-06-07", "Orbit Stage", "Malevolence", "20:35", "21:25"],
  ["2026-06-07", "Orbit Stage", "The Funeral Portrait", "21:50", "22:50"],
  ["2026-06-07", "Orbit Stage", "Danko Jones", "23:20", "00:20"],
  ["2026-06-07", "Orbit Stage", "The Butcher Sisters", "00:50", "02:00"],
];
const ICONS = {
  schedule:
    "M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  plus: "M12 5v14M5 12h14",
  tent: "M3 20 12 4l9 16M12 4v16M8 20h8",
  settings:
    "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1v.2a2 2 0 1 1-4 0V21a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.4h-.2a2 2 0 1 1 0-4H3a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .4-1v-.2a2 2 0 1 1 4 0V3a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.19.65.47.86.82.2.35.3.74.3 1.14s-.1.79-.3 1.14c-.21.35-.5.63-.86.9Z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
  check: "M20 6 9 17l-5-5",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
};

const app = document.querySelector("#app");
let state = loadState();
let sessionId = localStorage.getItem("festival-session-id") || "";
let view = "timeline";
let selectedDay = state.selectedDay || DAYS[0].value;
let modal = null;
let actPopover = null;
let groupDialog = null;
let alcoholTest = null;
let toastTimer = null;
let clockTimer = null;
let alcoholTimers = [];
let adminPreviewUser =
  localStorage.getItem("festival-admin-preview-user") === "true";
let theme = localStorage.getItem("festival-theme") || "dark";
let expandedStages = JSON.parse(
  localStorage.getItem("festival-expanded-stages") || "{}",
);
let ownTentExpanded = localStorage.getItem("festival-own-tent-expanded") === "true";
let selectedShoppingList = localStorage.getItem("festival-selected-shopping-list") || "all";
let apiBase = localStorage.getItem(API_BASE_KEY) || DEFAULT_API_BASE;
let apiKey = localStorage.getItem(API_KEY_KEY) || SUPABASE_PUBLIC_KEY;
let remoteSyncAvailable = false;
let remoteSaveTimer = null;
let remoteSyncInFlight = false;

function createSeedState() {
  const adminId = id();
  const shoppingLists = [
    { id: "shopping-buy", name: "Einkaufen", createdBy: "system" },
    { id: "shopping-bring", name: "Mitbringen", createdBy: "system" },
  ];
  const seed = {
    version: 1,
    selectedDay: DAYS[0].value,
    profiles: [],
    stages: [
      { id: id(), name: "Utopia Stage" },
      { id: id(), name: "Mandora Stage" },
      { id: id(), name: "Orbit Stage" },
    ],
    acts: [],
    groups: [],
    shoppingLists,
    shoppingItems: [],
    shoppingArchive: [],
    plans: {},
    adminId,
    initialized: false,
  };
  importOfficialTimetable(seed);
  return seed;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return createSeedState();
  }
}

function normalizeState(value) {
  const nextState = { ...createSeedState(), ...value };
  if (!Array.isArray(nextState.groups)) nextState.groups = [];
  if (!Array.isArray(nextState.shoppingLists)) nextState.shoppingLists = [];
  ensureShoppingLists(nextState);
  if (!Array.isArray(nextState.shoppingItems)) nextState.shoppingItems = [];
  if (!Array.isArray(nextState.shoppingArchive)) nextState.shoppingArchive = [];
  nextState.shoppingItems.forEach((item) => {
    if (!item.listId) item.listId = nextState.shoppingLists[0]?.id || "shopping-buy";
    if (typeof item.done !== "boolean") item.done = false;
  });
  if (!nextState.acts.length) importOfficialTimetable(nextState);
  ensureUniqueProfileColors(nextState);
  return nextState;
}

function ensureShoppingLists(targetState) {
  const defaults = [
    { id: "shopping-buy", name: "Einkaufen", createdBy: "system" },
    { id: "shopping-bring", name: "Mitbringen", createdBy: "system" },
  ];
  defaults.forEach((list) => {
    if (!targetState.shoppingLists.some((item) => item.id === list.id)) {
      targetState.shoppingLists.push(list);
    }
  });
}

function ensureUniqueProfileColors(targetState) {
  const used = new Set();
  targetState.profiles.forEach((profile) => {
    if (!COLORS.includes(profile.color) || used.has(profile.color)) {
      profile.color = COLORS.find((color) => !used.has(color)) || profile.color;
    }
    used.add(profile.color);
  });
}

function availableColorsFor(profileId) {
  const usedByOthers = new Set(
    state.profiles
      .filter((profile) => profile.id !== profileId)
      .map((profile) => profile.color),
  );
  return COLORS.map((color) => ({
    color,
    available: !usedByOthers.has(color),
  }));
}

function nextAvailableColor() {
  const used = new Set(state.profiles.map((profile) => profile.color));
  return COLORS.find((color) => !used.has(color)) || "";
}

function importOfficialTimetable(targetState) {
  const stageIdsByName = new Map(
    targetState.stages.map((stage) => [stage.name, stage.id]),
  );
  OFFICIAL_TIMETABLE.forEach(([, stageName]) => {
    if (!stageIdsByName.has(stageName)) {
      const stage = { id: id(), name: stageName };
      targetState.stages.push(stage);
      stageIdsByName.set(stageName, stage.id);
    }
  });

  let added = 0;
  OFFICIAL_TIMETABLE.forEach(([day, stageName, artist, start, end]) => {
    const stageId = stageIdsByName.get(stageName);
    const exists = targetState.acts.some(
      (act) =>
        act.day === day &&
        act.stageId === stageId &&
        act.artist.toLowerCase() === artist.toLowerCase() &&
        act.start === start,
    );
    if (!exists) {
      targetState.acts.push({
        id: id(),
        artist,
        stageId,
        day,
        start,
        end,
        note: "Offizieller Rock im Park 2026 Timetable",
      });
      added += 1;
    }
  });
  return added;
}

function saveState() {
  state.selectedDay = selectedDay;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  scheduleRemoteSave();
}

function apiStateUrl() {
  const base = apiBase.trim().replace(/\/$/, "");
  return `${base}/api/state`;
}

function isSupabaseSync() {
  return apiBase.includes(".supabase.co");
}

function supabaseRestUrl() {
  return `${apiBase.trim().replace(/\/$/, "")}/rest/v1/app_state`;
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: apiKey,
    ...extra,
  };
}

async function loadRemoteState() {
  if (remoteSyncInFlight) return;
  remoteSyncInFlight = true;
  try {
    let payload;
    if (isSupabaseSync()) {
      if (!apiKey) throw new Error("Missing Supabase key");
      const response = await fetch(
        `${supabaseRestUrl()}?id=eq.main&select=state`,
        {
          cache: "no-store",
          headers: supabaseHeaders({ Accept: "application/json" }),
        },
      );
      if (!response.ok) throw new Error("Supabase state unavailable");
      const rows = await response.json();
      payload = { state: rows[0]?.state || null };
    } else {
      const response = await fetch(apiStateUrl(), {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Remote state unavailable");
      payload = await response.json();
    }
    remoteSyncAvailable = true;
    if (payload.state) {
      state = normalizeState(payload.state);
      selectedDay = state.selectedDay || selectedDay;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      render();
    } else if (state.initialized) {
      scheduleRemoteSave(0);
    }
  } catch {
    remoteSyncAvailable = false;
  } finally {
    remoteSyncInFlight = false;
  }
}

function scheduleRemoteSave(delay = 350) {
  if (!remoteSyncAvailable) return;
  clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(async () => {
    try {
      const response = isSupabaseSync()
        ? await fetch(supabaseRestUrl(), {
            method: "POST",
            headers: supabaseHeaders({
              "Content-Type": "application/json",
              Prefer: "resolution=merge-duplicates",
            }),
            body: JSON.stringify({ id: "main", state }),
          })
        : await fetch(apiStateUrl(), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state }),
          });
      if (!response.ok) throw new Error("Remote save failed");
    } catch {
      remoteSyncAvailable = false;
      showToast("Backend-Sync gerade nicht erreichbar.");
    }
  }, delay);
}

function id() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function icon(name, label = "") {
  const title = label ? `<title>${escapeHtml(label)}</title>` : "";
  return `<svg aria-hidden="${label ? "false" : "true"}" role="img" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${title}<path d="${ICONS[name] || ICONS.check}"></path></svg>`;
}

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}

function currentProfile() {
  return state.profiles.find((profile) => profile.id === sessionId) || null;
}

function isAdmin() {
  const profile = currentProfile();
  return Boolean(profile && profile.role === "admin");
}

function canManage() {
  return isAdmin() && !adminPreviewUser;
}

function formatTime(start, end) {
  return `${start || "?"}${end ? ` - ${end}` : ""}`;
}

function currentTimeValue() {
  return new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function timeToFestivalMinutes(time) {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  const total = hours * 60 + minutes;
  return hours < 6 ? total + 1440 : total;
}

function minutesToTimeLabel(minutes) {
  const normalized = minutes % 1440;
  const hours = Math.floor(normalized / 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:00`;
}

function currentFestivalMinutesForSelectedDay() {
  const now = new Date();
  const today = localDateKey(now);
  const selectedIndex = DAYS.findIndex((day) => day.value === selectedDay);
  const previousDay = DAYS[selectedIndex - 1]?.value;
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (today === selectedDay) return minutes < 6 ? minutes + 1440 : minutes;
  if (today === previousDay && minutes < 6) return minutes + 1440;
  return null;
}

function clearAlcoholTimers() {
  alcoholTimers.forEach((timer) => clearTimeout(timer));
  alcoholTimers = [];
}

function startAlcoholTest() {
  clearAlcoholTimers();
  const now = Date.now();
  alcoholTest = {
    phase: "game",
    startAt: now,
    endAt: now + 30000,
    mugs: [],
    hits: 0,
    taps: 0,
    spawned: 0,
    result: null,
  };
  spawnMug();
  scheduleAlcoholTick();
  render();
}

function scheduleAlcoholTick() {
  clearAlcoholTimers();
  const tick = () => {
    if (!alcoholTest || alcoholTest.phase !== "game") return;
    const now = Date.now();
    alcoholTest.mugs = alcoholTest.mugs.filter(
      (mug) => now - mug.createdAt < 1700,
    );
    if (now >= alcoholTest.endAt) {
      finishAlcoholGame();
      return;
    }
    if (Math.random() > 0.28) spawnMug();
    render();
    alcoholTimers.push(setTimeout(tick, 520));
  };
  alcoholTimers.push(setTimeout(tick, 520));
}

function spawnMug() {
  if (!alcoholTest || alcoholTest.phase !== "game") return;
  alcoholTest.spawned += 1;
  alcoholTest.mugs.push({
    id: id(),
    x: 8 + Math.random() * 78,
    y: 12 + Math.random() * 68,
    size: 50 + Math.random() * 24,
    createdAt: Date.now(),
  });
}

function finishAlcoholGame() {
  if (!alcoholTest) return;
  const hits = alcoholTest.hits;
  const taps = alcoholTest.taps;
  const spawned = Math.max(1, alcoholTest.spawned);
  const hitRate = hits / spawned;
  const precision = taps ? hits / taps : 0;
  const score = Math.round((hitRate * 0.58 + precision * 0.42) * 100);
  alcoholTest.phase = "calculating";
  alcoholTest.result = {
    hits,
    taps,
    spawned,
    hitRate,
    precision,
    score,
    level: alcoholLevel(score, hits, taps),
  };
  clearAlcoholTimers();
  alcoholTimers.push(
    setTimeout(() => {
      if (!alcoholTest) return;
      alcoholTest.phase = "result";
      render();
    }, 5000),
  );
  render();
}

function alcoholLevel(score, hits, taps) {
  if (taps === 0) return "Zen-Meister oder Handy verloren";
  if (score >= 82) return "Nüchtern genug für den Timetable";
  if (score >= 64) return "Festivalwarm";
  if (score >= 46) return "Leicht schief, aber motiviert";
  if (score >= 28) return "Zelt-Navigation empfohlen";
  if (hits > 0) return "Bierkrug war schneller als du";
  return "Akuter Pommesbedarf";
}

function timeLeftSeconds(endAt) {
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

function currentTentDay() {
  return localDateKey();
}

function activeTentEntry(profileId = sessionId) {
  return profilePlan(profileId).tents.find(
    (item) => item.active && (!item.kind || item.kind === "tent"),
  );
}

function beerButtonLocked(profileId = sessionId) {
  const unlockAt = Number(profilePlan(profileId).beerUnlockAt || 0);
  return unlockAt > Date.now();
}

function dayLabel(day) {
  const festivalDay = DAYS.find((item) => item.value === day);
  if (festivalDay) return festivalDay.label;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day || "");
  if (!match) return day;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  const weekday = date.toLocaleDateString("de-DE", { weekday: "short" }).slice(0, 2);
  return `${weekday}, ${match[3]}.${match[2]}`;
}

function sortedActs(day = selectedDay) {
  return state.acts
    .filter((act) => act.day === day)
    .sort((a, b) =>
      `${a.start}-${a.stageId}-${a.artist}`.localeCompare(
        `${b.start}-${b.stageId}-${b.artist}`,
      ),
    );
}

function profilePlan(profileId = sessionId) {
  if (!state.plans[profileId]) state.plans[profileId] = { acts: {}, tents: [] };
  if (!state.plans[profileId].acts) state.plans[profileId].acts = {};
  if (!state.plans[profileId].tents) state.plans[profileId].tents = [];
  if (!state.plans[profileId].drinkStats)
    state.plans[profileId].drinkStats = {
      standBeer: 0,
      tentBeer: 0,
      otherDrinks: 0,
    };
  if (
    state.plans[profileId].beerUnlockAt &&
    state.plans[profileId].beerUnlockAt <= Date.now()
  ) {
    delete state.plans[profileId].beerUnlockAt;
  }
  return state.plans[profileId];
}

function render() {
  document.documentElement.dataset.theme = theme;
  const profile = currentProfile();
  if (!state.initialized || !profile) {
    app.innerHTML = renderAuth();
    bindAuth();
    syncClockTimer(false);
    return;
  }

  app.innerHTML = `
    <div class="layout ${view === "timeline" ? "timeline-view" : ""}">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">RIP</div>
          <div>
            <h1>Festival Time Table</h1>
            <p>Rock im Park Planung</p>
          </div>
        </div>
        <div class="session-meta">
          <strong>${escapeHtml(profile.name)}</strong><br>
          ${profile.role === "admin" ? "Admin Profil" : "Festival Profil"}
        </div>
        <nav class="nav">
          ${navButton("timeline", "schedule", "Timetable")}
          ${navButton("myplan", "tent", "Mein Plan")}
          ${navButton("shopping", "plus", "Besorgungen")}
          ${canManage() ? navButton("profiles", "users", "Profile") : ""}
          ${canManage() ? navButton("settings", "settings", "Daten") : ""}
        </nav>
        <div class="sidebar-footer">
          ${isAdmin() ? `<button class="soft-button" data-toggle-admin-view>${icon(adminPreviewUser ? "settings" : "users")} ${adminPreviewUser ? "Admin Ansicht" : "User Ansicht"}</button>` : ""}
          <button class="soft-button" data-toggle-theme>${theme === "dark" ? "Hell nutzen" : "Dark Mode"}</button>
          <button class="ghost-button" data-action="logout">${icon("logout")} Abmelden</button>
        </div>
      </aside>
      <main class="content">
        ${renderView()}
      </main>
    </div>
    ${actPopover ? renderActPopover() : ""}
    ${groupDialog ? renderGroupDialog() : ""}
    ${alcoholTest ? renderAlcoholTest() : ""}
    ${modal ? renderModal() : ""}
  `;
  bindApp();
  bindQuickActionScroll();
  syncClockTimer(true);
}

function bindQuickActionScroll() {
  const quickActions = app.querySelector(".quick-actions");
  const timelinePanel = app.querySelector(".timeline-panel");
  if (!quickActions) return;
  const update = () => {
    if (!timelinePanel) {
      quickActions.style.setProperty("--quick-compact-progress", "0");
      return;
    }
    const rect = timelinePanel.getBoundingClientRect();
    const start = window.innerHeight * 0.5;
    const end = window.innerHeight / 3;
    const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
    quickActions.style.setProperty("--quick-compact-progress", progress.toFixed(3));
    quickActions.classList.toggle("compact", progress >= 0.98);
  };
  update();
  window.removeEventListener("scroll", bindQuickActionScroll.lastHandler);
  bindQuickActionScroll.lastHandler = update;
  window.addEventListener("scroll", update, { passive: true });
}

function syncClockTimer(shouldRun) {
  if (!shouldRun) {
    clearInterval(clockTimer);
    clockTimer = null;
    return;
  }
  if (clockTimer) return;
  clockTimer = setInterval(() => {
    if (currentProfile() && view === "timeline" && !modal) render();
  }, 60000);
}

function navButton(target, iconName, label) {
  return `<button class="${view === target ? "active" : ""}" data-view="${target}">${icon(iconName)} ${label}</button>`;
}

function renderAuth() {
  const hasAdmin = state.profiles.some((profile) => profile.role === "admin");
  return `
    <section class="auth-screen">
      <div class="auth-card">
        <div class="auth-hero">
          <p class="eyebrow">Festival Crew Planner</p>
          <h1>Rock im Park ohne Planungschaos.</h1>
          <p>Line-up pflegen, Profile anlegen und pro Person festhalten, wer zu welchem Slot wohin will.</p>
        </div>
        <div class="auth-body">
          ${hasAdmin ? renderLoginForm() : renderSetupForm()}
        </div>
      </div>
    </section>
  `;
}

function renderSetupForm() {
  return `
    <p class="eyebrow">Erster Start</p>
    <h2>Admin Profil anlegen</h2>
    <p class="muted">Dieses Profil darf später Bands, Zeiten, Bühnen und weitere Profile verwalten.</p>
    <form class="grid" data-form="setup">
      <label>Name
        <input name="name" autocomplete="name" required placeholder="z. B. Baba">
      </label>
      <label>Admin PIN
        <input name="pin" type="password" inputmode="numeric" minlength="4" required placeholder="Mindestens 4 Zeichen">
      </label>
      <button class="primary-button" type="submit">${icon("check")} Admin erstellen</button>
    </form>
  `;
}

function renderLoginForm() {
  return `
    <p class="eyebrow">Login</p>
    <h2>Profil wählen</h2>
    <p class="muted">Die PINs werden nur lokal im Browser gespeichert. Für GitHub Pages ist das eine einfache Planungs-App, kein sicherer Account-Server.</p>
    <form class="grid" data-form="login">
      <label>Profil
        <select name="profileId" required>
          ${state.profiles.map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}${profile.role === "admin" ? " (Admin)" : ""}</option>`).join("")}
        </select>
      </label>
      <label>PIN
        <input name="pin" type="password" required>
      </label>
      <button class="primary-button" type="submit">${icon("check")} Einloggen</button>
    </form>
  `;
}

function renderView() {
  if (view === "myplan") return renderMyPlan();
  if (view === "shopping") return renderShoppingBoard();
  if (view === "profiles" && canManage()) return renderProfiles();
  if (view === "settings" && canManage()) return renderSettings();
  return renderTimeline();
}

function renderHeader(title, subtitle, actions = "") {
  return `
    <div class="topbar">
      <div>
        <p class="eyebrow">${escapeHtml(subtitle)}</p>
        <h2>${escapeHtml(title)}</h2>
      </div>
      <div class="toolbar">${actions}</div>
    </div>
  `;
}

function renderDayTabs() {
  return `
    <div class="tabs" role="tablist">
      ${DAYS.map((day) => `<button class="${selectedDay === day.value ? "active" : ""}" data-day="${day.value}">${day.label}</button>`).join("")}
    </div>
  `;
}

function renderTimeline() {
  const tentActive = activeTentEntry();
  const beerLocked = beerButtonLocked();
  const adminActions = canManage()
    ? `<button class="primary-button compact-action" data-modal="act">${icon("plus")} Act</button><button class="soft-button compact-action" data-modal="stage">${icon("plus")} Bühne</button>`
    : "";
  const acts = sortedActs();
  return `
    ${renderHeader("Timetable", "Line-up und persönliche Auswahl", `${renderDayTabs()}${adminActions}`)}
    <div class="quick-actions" aria-label="Schnellaktionen">
      <button class="${tentActive ? "danger-button" : "primary-button"} big-action" data-toggle-tent>${icon("tent")} ${tentActive ? "Zelt verlassen" : "Beim Zelt"}</button>
      <button class="soft-button big-action" data-beer-pickup ${beerLocked ? "disabled" : ""}>${icon("plus")} ${beerLocked ? "Kurz warten" : "Bier holen"}</button>
      <button class="ghost-button big-action" data-modal="drinks">${icon("check")} Getränke</button>
      <button class="ghost-button big-action" data-start-alcohol-test>Level</button>
    </div>
    ${acts.length ? renderTimeGrid(acts) : ""}
    ${renderGroupPanel()}
    <section class="grid">
      ${acts.length ? renderStageRows(acts) : `<div class="empty">Noch keine Auftritte für ${dayLabel(selectedDay)} eingetragen.</div>`}
    </section>
  `;
}

function activeGroupFor(profileId = sessionId) {
  return (
    state.groups.find((group) => group.members.includes(profileId)) || null
  );
}

function cleanupEmptyGroups() {
  state.groups = state.groups.filter((group) => group.members.length > 0);
}

function renderGroupPanel() {
  const activeGroup = activeGroupFor();
  return `
    <section class="panel group-panel">
      <div class="panel-header">
        <div>
          <h3>Gruppen Ansicht</h3>
          <p class="muted">Du kannst immer nur in einer Gruppe gleichzeitig sein.</p>
        </div>
        <button class="primary-button" data-modal="group">${icon("plus")} Gruppe erstellen</button>
      </div>
      ${
        state.groups.length
          ? `<div class="group-list">
        ${state.groups.map((group) => renderGroupCard(group, activeGroup?.id === group.id)).join("")}
      </div>`
          : `<div class="empty">Noch keine Gruppe erstellt.</div>`
      }
    </section>
  `;
}

function renderGroupCard(group, isActive) {
  const creator = state.profiles.find(
    (profile) => profile.id === group.creatorId,
  );
  const members = group.members
    .map((memberId) =>
      state.profiles.find((profile) => profile.id === memberId),
    )
    .filter(Boolean);
  return `
    <button class="group-card ${isActive ? "active" : ""}" data-group-info="${group.id}">
      <div>
        <strong>${escapeHtml(group.name)}</strong>
        <span class="muted">Erstellt von ${escapeHtml(creator?.name || "Unbekannt")}</span>
      </div>
      <div class="group-members">
        ${members.map((profile) => `<span class="chip ${profile.id === sessionId ? "active" : ""}"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}
      </div>
    </button>
  `;
}

function renderTimeGrid(acts) {
  const starts = acts.map((act) => timeToFestivalMinutes(act.start));
  const ends = acts.map((act) => timeToFestivalMinutes(act.end || act.start));
  const min = Math.floor(Math.min(...starts, 12 * 60) / 60) * 60;
  const max = Math.ceil(Math.max(...ends, 26 * 60) / 60) * 60;
  const range = Math.max(60, max - min);
  const hours = [];
  for (let minute = min; minute <= max; minute += 60) hours.push(minute);
  const stages = state.stages.filter((stage) =>
    acts.some((act) => act.stageId === stage.id),
  );
  const current = currentFestivalMinutesForSelectedDay();
  const currentLeft =
    current !== null && current >= min && current <= max
      ? ((current - min) / range) * 100
      : null;

  return `
    <section class="panel timeline-panel">
      <div class="panel-header">
        <h3>Timeline Ansicht</h3>
        <span class="muted">${dayLabel(selectedDay)}</span>
      </div>
      <div class="time-grid-scroll">
        <div class="time-grid" style="--grid-min-width:${Math.max(920, hours.length * 92)}px">
          <div class="time-grid-header">
            <div class="time-stage-spacer"></div>
            <div class="time-axis">
              ${hours.map((minute) => `<span style="left:${((minute - min) / range) * 100}%">${minutesToTimeLabel(minute)}</span>`).join("")}
            </div>
          </div>
          <div class="time-grid-body">
            ${stages
              .map((stage) =>
                renderTimeGridRow(
                  stage,
                  acts.filter((act) => act.stageId === stage.id),
                  min,
                  range,
                  currentLeft,
                ),
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTimeGridRow(stage, acts, min, range, currentLeft) {
  return `
    <div class="time-stage-row ${stageColorClass(stage)}">
      <div class="time-stage-name">${escapeHtml(stage.name)}</div>
      <div class="time-stage-track">
        ${currentLeft === null ? "" : `<div class="now-line" style="left:${currentLeft}%"></div>`}
        ${acts
          .map((act) => {
            const start = timeToFestivalMinutes(act.start);
            const end = timeToFestivalMinutes(act.end || act.start);
            const left = ((start - min) / range) * 100;
            const width = Math.max(
              5,
              ((Math.max(end, start + 20) - start) / range) * 100,
            );
            return `<button class="time-act ${stageColorClass(stage)}" style="left:${left}%;width:${width}%" title="${escapeHtml(act.artist)} · ${formatTime(act.start, act.end)}" data-act-info="${act.id}"><span>${escapeHtml(act.artist)}</span><small>${formatTime(act.start, act.end)}</small>${renderTimelineMarkers(act.id)}</button>`;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderTimelineMarkers(actId) {
  const markers = state.profiles
    .map((profile) => ({
      profile,
      status: profilePlan(profile.id).acts[actId],
    }))
    .filter((item) => item.status === "attending" || item.status === "maybe");
  if (!markers.length) return "";
  return `<div class="timeline-markers">${markers.map(({ profile, status }) => `<span class="timeline-marker ${status}" style="--profile-color:${profile.color}" title="${escapeHtml(profile.name)}: ${status === "attending" ? "Dort" : "Vielleicht"}"></span>`).join("")}</div>`;
}

function renderActPopover() {
  const act = state.acts.find((item) => item.id === actPopover);
  if (!act) return "";
  const stage = state.stages.find((item) => item.id === act.stageId);
  const attending = state.profiles.filter(
    (profile) => profilePlan(profile.id).acts[act.id] === "attending",
  );
  const maybe = state.profiles.filter(
    (profile) => profilePlan(profile.id).acts[act.id] === "maybe",
  );
  return `
    <div class="act-popover-backdrop" data-close-act-popover>
      <div class="act-popover ${stageColorClass(act.stageId)}" role="dialog" aria-modal="true" aria-label="${escapeHtml(act.artist)}" data-act-popover-card>
        <div>
          <div class="act-time">${dayLabel(act.day)} · ${formatTime(act.start, act.end)}</div>
          <h3>${escapeHtml(act.artist)}</h3>
          <p class="muted">${escapeHtml(stage?.name || "Unbekannte Bühne")}</p>
          ${act.note ? `<p>${escapeHtml(act.note)}</p>` : ""}
        </div>
        <div class="chip-row">
          ${attending.map((profile) => `<span class="chip active"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}
          ${maybe.map((profile) => `<span class="chip"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)} vielleicht</span>`).join("")}
        </div>
        <div class="button-row">
          <button class="soft-button" data-plan-act="${act.id}" data-status="attending">${icon("check")} Dort</button>
          <button class="ghost-button" data-plan-act="${act.id}" data-status="maybe">Vielleicht</button>
          <button class="ghost-button" data-plan-act="${act.id}" data-status="">Raus</button>
        </div>
      </div>
    </div>
  `;
}

function renderStageRows(acts) {
  const stages = state.stages.filter((stage) =>
    acts.some((act) => act.stageId === stage.id),
  );
  return `<div class="timeline">${stages
    .map(
      (stage) => `
    <div class="stage-row ${stageColorClass(stage)} ${expandedStages[stage.id] ? "" : "collapsed"}">
      <button class="stage-name" data-toggle-stage="${stage.id}" aria-expanded="${expandedStages[stage.id] ? "true" : "false"}">
        <span>${escapeHtml(stage.name)}</span>
        <span class="stage-toggle-label">${expandedStages[stage.id] ? "Einklappen" : "Ausklappen"}</span>
      </button>
      ${
        expandedStages[stage.id]
          ? `<div class="act-list">
        ${acts
          .filter((act) => act.stageId === stage.id)
          .map(renderActCard)
          .join("")}
      </div>`
          : ""
      }
    </div>
  `,
    )
    .join("")}</div>`;
}

function stageColorClass(stageOrId) {
  const stageId = typeof stageOrId === "string" ? stageOrId : stageOrId.id;
  const stage = state.stages.find((item) => item.id === stageId);
  const stageName = (stage?.name || "").toLowerCase();
  if (stageName.includes("utopia")) return "stage-red";
  if (stageName.includes("mandora")) return "stage-blue";
  if (stageName.includes("orbit")) return "stage-purple";
  const index = Math.max(
    0,
    state.stages.findIndex((item) => item.id === stageId),
  );
  return ["stage-red", "stage-blue", "stage-purple"][index % 3];
}

function renderActCard(act) {
  const plan = profilePlan();
  const status = plan.acts[act.id] || "";
  const visitors = state.profiles.filter(
    (profile) => profilePlan(profile.id).acts[act.id] === "attending",
  );
  return `
    <article class="act-card ${stageColorClass(act.stageId)} ${status}">
      <div>
        <div class="act-time">${formatTime(act.start, act.end)}</div>
        <div class="act-title">${escapeHtml(act.artist)}</div>
        ${act.note ? `<div class="muted">${escapeHtml(act.note)}</div>` : ""}
      </div>
      <div class="chip-row">
        ${visitors
          .slice(0, 5)
          .map(
            (profile) =>
              `<span class="chip"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`,
          )
          .join("")}
        ${visitors.length > 5 ? `<span class="chip">+${visitors.length - 5}</span>` : ""}
      </div>
      <div class="button-row">
        <button class="soft-button" data-plan-act="${act.id}" data-status="attending">${icon("check")} Dort</button>
        <button class="ghost-button" data-plan-act="${act.id}" data-status="maybe">Vielleicht</button>
        <button class="ghost-button" data-plan-act="${act.id}" data-status="">Raus</button>
        ${canManage() ? `<button class="icon-button" title="Bearbeiten" data-edit-act="${act.id}">${icon("edit", "Bearbeiten")}</button><button class="icon-button" title="Löschen" data-delete-act="${act.id}">${icon("trash", "Löschen")}</button>` : ""}
      </div>
    </article>
  `;
}

function renderMyPlan() {
  const profile = currentProfile();
  const plan = profilePlan();
  const pickedActs = state.acts
    .filter((act) => plan.acts[act.id])
    .sort((a, b) => `${a.day}-${a.start}`.localeCompare(`${b.day}-${b.start}`));
  const tentItems = plan.tents.sort((a, b) =>
    `${a.day}-${a.start}`.localeCompare(`${b.day}-${b.start}`),
  );
  const allTentItems = state.profiles
    .flatMap((profile) =>
      profilePlan(profile.id).tents.map((item) => ({ ...item, profile })),
    )
    .sort((a, b) =>
      `${a.day}-${a.start}-${a.profile.name}`.localeCompare(
        `${b.day}-${b.start}-${b.profile.name}`,
      ),
    );
  return `
    ${renderHeader("Mein Plan", "Auftritte und Zeltzeiten", `<button class="primary-button" data-modal="tent">${icon("tent")} Im Zelt bleiben</button>`)}
    <section class="panel profile-color-panel">
      <div class="panel-header">
        <div>
          <h3>Meine Farbe</h3>
          <p class="muted">Diese Farbe markiert deine Auswahl in der Timeline. Jede Farbe kann nur einmal vergeben werden.</p>
        </div>
      </div>
      <div class="color-picker">
        ${availableColorsFor(profile.id)
          .map(
            ({ color, available }) =>
              `<button class="color-swatch ${profile.color === color ? "active" : ""}" style="--swatch:${color}" data-set-color="${color}" ${available ? "" : "disabled"} title="${available ? "Farbe wählen" : "Schon vergeben"}"></button>`,
          )
          .join("")}
      </div>
    </section>
    <section class="grid two">
      <div class="panel">
        <div class="panel-header">
          <h3>Ausgewählte Auftritte</h3>
        </div>
        ${
          pickedActs.length
            ? `<div class="table-wrap"><table><thead><tr><th>Tag</th><th>Zeit</th><th>Act</th><th>Status</th></tr></thead><tbody>
          ${pickedActs.map((act) => `<tr><td>${dayLabel(act.day)}</td><td>${formatTime(act.start, act.end)}</td><td>${escapeHtml(act.artist)}</td><td>${plan.acts[act.id] === "attending" ? "Dort" : "Vielleicht"}</td></tr>`).join("")}
        </tbody></table></div>`
            : `<div class="empty">Noch keine Auftritte markiert.</div>`
        }
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Zeltzeiten</h3>
          <div class="button-row">
            <button class="soft-button" data-toggle-own-tents>${ownTentExpanded ? "Einklappen" : "Ausklappen"}</button>
            <button class="soft-button" data-modal="tent">${icon("plus")} Zeit</button>
          </div>
        </div>
        ${
          ownTentExpanded
            ? (tentItems.length
                ? `<div class="table-wrap"><table><thead><tr><th>Tag</th><th>Zeit</th><th>Notiz</th><th></th></tr></thead><tbody>
          ${tentItems.map((item) => `<tr><td>${dayLabel(item.day)}</td><td>${formatTime(item.start, item.end)}</td><td>${escapeHtml(item.note || "Im Zelt bleiben")}</td><td><button class="icon-button" title="Löschen" data-delete-tent="${item.id}">${icon("trash", "Löschen")}</button></td></tr>`).join("")}
        </tbody></table></div>`
                : `<div class="empty">Noch keine Zeltzeit eingetragen.</div>`)
            : `<div class="empty">Eigene Zeltzeiten sind eingeklappt.</div>`
        }
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="panel-header">
        <h3>Zeltzeiten aller Profile</h3>
      </div>
      ${
        allTentItems.length
          ? `<div class="table-wrap"><table><thead><tr><th>Profil</th><th>Tag</th><th>Zeit</th><th>Notiz</th></tr></thead><tbody>
        ${allTentItems.map((item) => `<tr><td><span class="profile-dot" style="background:${item.profile.color}"></span>${escapeHtml(item.profile.name)}</td><td>${dayLabel(item.day)}</td><td>${formatTime(item.start, item.end)}</td><td>${escapeHtml(item.note || "Im Zelt bleiben")}</td></tr>`).join("")}
      </tbody></table></div>`
          : `<div class="empty">Noch keine Zeltzeiten in der Gruppe eingetragen.</div>`
      }
    </section>
  `;
}

function renderShopping() {
  const items = [...state.shoppingItems].sort((a, b) => {
    const neededDiff = b.supporters.length - a.supporters.length;
    if (neededDiff) return neededDiff;
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
  return `
    ${renderHeader("Besorgungen", "Einkaufswünsche der Gruppe", "")}
    <section class="grid two">
      <div class="panel">
        <div class="panel-header">
          <h3>Wunsch eintragen</h3>
        </div>
        <form class="form-grid" data-form="shopping">
          <label>Was brauchen wir?
            <input name="name" required maxlength="60" placeholder="z. B. Pavillon, Wasser, Tape">
          </label>
          <label>Menge / Hinweis
            <input name="note" maxlength="80" placeholder="z. B. 2 Kisten, groß, dringend">
          </label>
          <div class="full button-row">
            <button class="primary-button" type="submit">${icon("plus")} Wunsch hinzufügen</button>
          </div>
        </form>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Am meisten gebraucht</h3>
        </div>
        ${items.length ? `<div class="shopping-summary">${items.slice(0, 5).map(renderShoppingMini).join("")}</div>` : `<div class="empty">Noch keine Einkaufswünsche vorhanden.</div>`}
      </div>
    </section>
    <section class="panel shopping-panel">
      <div class="panel-header">
        <h3>Alle Wünsche</h3>
      </div>
      ${items.length ? `<div class="shopping-list">${items.map(renderShoppingItem).join("")}</div>` : `<div class="empty">Trag den ersten Einkaufswunsch ein.</div>`}
    </section>
  `;
}

function renderShoppingMini(item) {
  return `
    <div class="shopping-mini">
      <strong>${escapeHtml(item.name)}</strong>
      <span class="chip active">${item.supporters.length} brauchen das</span>
    </div>
  `;
}

function renderShoppingItem(item) {
  const creator = state.profiles.find((profile) => profile.id === item.creatorId);
  const supporters = item.supporters
    .map((profileId) => state.profiles.find((profile) => profile.id === profileId))
    .filter(Boolean);
  const joined = item.supporters.includes(sessionId);
  const canDelete = item.creatorId === sessionId || canManage();
  return `
    <article class="shopping-item">
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        ${item.note ? `<p class="muted">${escapeHtml(item.note)}</p>` : ""}
        <p class="muted">Eingetragen von ${escapeHtml(creator?.name || "Unbekannt")}</p>
      </div>
      <div class="chip-row">
        ${supporters.map((profile) => `<span class="chip ${profile.id === sessionId ? "active" : ""}"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}
      </div>
      <div class="button-row">
        <label class="done-toggle"><input type="checkbox" data-toggle-shopping-done="${item.id}" ${item.done ? "checked" : ""}> Erledigt</label>
        <button class="${joined ? "danger-button" : "soft-button"}" data-toggle-shopping="${item.id}">${joined ? "Nicht mehr" : "Brauch ich auch"}</button>
        ${canDelete ? `<button class="icon-button" title="Löschen" data-delete-shopping="${item.id}">${icon("trash", "Löschen")}</button>` : ""}
      </div>
    </article>
  `;
}

function renderShoppingBoard() {
  if (selectedShoppingList !== "all" && !state.shoppingLists.some((list) => list.id === selectedShoppingList)) {
    selectedShoppingList = "all";
    localStorage.setItem("festival-selected-shopping-list", selectedShoppingList);
  }
  const items = [...state.shoppingItems].sort((a, b) => {
    const neededDiff = b.supporters.length - a.supporters.length;
    if (neededDiff) return neededDiff;
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
  const visibleLists = selectedShoppingList === "all"
    ? state.shoppingLists
    : state.shoppingLists.filter((list) => list.id === selectedShoppingList);
  return `
    ${renderHeader("Besorgungen", "Einkaufswünsche der Gruppe", "")}
    <section class="grid two">
      <div class="panel">
        <div class="panel-header">
          <h3>Wunsch eintragen</h3>
        </div>
        <form class="form-grid" data-form="shopping">
          <label>Was brauchen wir?
            <input name="name" required maxlength="60" placeholder="z. B. Pavillon, Wasser, Tape">
          </label>
          <label>Liste
            <select name="listId">
              ${state.shoppingLists.map((list) => `<option value="${list.id}">${escapeHtml(list.name)}</option>`).join("")}
            </select>
          </label>
          <label>Menge / Hinweis
            <input name="note" maxlength="80" placeholder="z. B. 2 Kisten, groß, dringend">
          </label>
          <div class="full button-row">
            <button class="primary-button" type="submit">${icon("plus")} Wunsch hinzufügen</button>
          </div>
        </form>
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Neue Liste</h3>
        </div>
        <form class="grid" data-form="shopping-list">
          <label>Listenname
            <input name="name" required maxlength="32" placeholder="z. B. Apotheke, Camping, Grill">
          </label>
          <button class="soft-button" type="submit">${icon("plus")} Liste hinzufügen</button>
        </form>
      </div>
    </section>
    <section class="panel shopping-panel">
      <div class="panel-header">
        <div>
          <h3>Listen</h3>
          <p class="muted">Wünsche können per Drag & Drop zwischen Listen verschoben werden.</p>
        </div>
        <label class="list-filter">Anzeigen
          <select data-shopping-list-filter>
            <option value="all" ${selectedShoppingList === "all" ? "selected" : ""}>Alle Listen</option>
            ${state.shoppingLists.map((list) => `<option value="${list.id}" ${selectedShoppingList === list.id ? "selected" : ""}>${escapeHtml(list.name)}</option>`).join("")}
          </select>
        </label>
      </div>
      <div class="button-row export-row">
        <button class="primary-button" data-archive-shopping-done>${icon("check")} Erledigtes archivieren</button>
        <button class="soft-button" data-export-shopping-image>${icon("download")} Als Bild</button>
        <button class="ghost-button" data-export-shopping-pdf>${icon("download")} Als PDF</button>
      </div>
      <div class="shopping-board">
        ${visibleLists.map((list) => renderShoppingListColumn(list, items.filter((item) => item.listId === list.id))).join("")}
      </div>
      ${renderShoppingArchive()}
    </section>
  `;
}

function renderShoppingListColumn(list, items) {
  return `
    <div class="shopping-list-column" data-shopping-drop="${list.id}">
      <div class="shopping-list-head">
        <h3>${escapeHtml(list.name)}</h3>
        <span class="chip">${items.length}</span>
      </div>
      ${items.length ? `<div class="shopping-list">${items.map(renderShoppingBoardItem).join("")}</div>` : `<div class="empty">Noch nichts in dieser Liste.</div>`}
    </div>
  `;
}

function renderShoppingBoardItem(item) {
  return renderShoppingItem(item).replace(
    '<article class="shopping-item">',
    `<article class="shopping-item ${item.done ? "done" : ""}" draggable="true" data-shopping-drag="${item.id}">`,
  );
}

function renderShoppingArchive() {
  const archiveGroups = selectedShoppingArchiveGroups();
  if (!archiveGroups.length) return `<div class="shopping-archive"><div class="empty">Noch nichts archiviert.</div></div>`;
  return `
    <div class="shopping-archive">
      <h3>Archiv</h3>
      ${archiveGroups.map((group) => `
        <section class="archive-group">
          <h4>${escapeHtml(formatArchiveDate(group.archivedAt))}</h4>
          <div class="shopping-list">
            ${group.items.map((item) => `<article class="shopping-item archived"><h3>${escapeHtml(item.name)}</h3>${item.note ? `<p class="muted">${escapeHtml(item.note)}</p>` : ""}<p class="muted">${escapeHtml(group.listName)}</p></article>`).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function selectedShoppingArchiveGroups() {
  return state.shoppingArchive
    .filter((group) => selectedShoppingList === "all" || group.listId === selectedShoppingList)
    .slice()
    .sort((a, b) => (b.archivedAt || "").localeCompare(a.archivedAt || ""));
}

function formatArchiveDate(value) {
  if (!value) return "Archiviert";
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function selectedShoppingExportLists() {
  const lists = selectedShoppingList === "all"
    ? state.shoppingLists
    : state.shoppingLists.filter((list) => list.id === selectedShoppingList);
  return lists.map((list) => ({
    ...list,
    items: state.shoppingItems
      .filter((item) => item.listId === list.id)
      .sort((a, b) => b.supporters.length - a.supporters.length),
  }));
}

function shoppingExportTitle() {
  if (selectedShoppingList === "all") return "Alle Besorgungslisten";
  return state.shoppingLists.find((list) => list.id === selectedShoppingList)?.name || "Besorgungsliste";
}

function shoppingExportHtml() {
  const lists = selectedShoppingExportLists();
  const generatedAt = new Date().toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return `
    <div class="shopping-export-doc">
      <h1>${escapeHtml(shoppingExportTitle())}</h1>
      <p>Festival Time Table · ${escapeHtml(generatedAt)}</p>
      ${lists.map((list) => `
        <section>
          <h2>${escapeHtml(list.name)}</h2>
          ${list.items.length ? `<table>
            <thead><tr><th>Wunsch</th><th>Hinweis</th><th>Benötigt von</th></tr></thead>
            <tbody>${list.items.map((item) => {
              const supporters = item.supporters
                .map((profileId) => state.profiles.find((profile) => profile.id === profileId)?.name)
                .filter(Boolean)
                .join(", ");
              return `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.note || "")}</td><td>${escapeHtml(supporters || "-")}</td></tr>`;
            }).join("")}</tbody>
          </table>` : `<p>Keine Einträge.</p>`}
        </section>
      `).join("")}
    </div>
  `;
}

function exportShoppingImage() {
  const canvas = drawShoppingExportCanvas();
  canvas.toBlob((pngBlob) => {
    if (!pngBlob) {
      showToast("Bild konnte nicht erstellt werden.");
      return;
    }
    downloadBlob(pngBlob, `${safeFileName(shoppingExportTitle())}.png`);
  }, "image/png");
}

function exportShoppingPdf() {
  const pdfBlob = createShoppingPdfBlob();
  downloadBlob(pdfBlob, `${safeFileName(shoppingExportTitle())}.pdf`);
}

function safeFileName(value) {
  return value.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-|-$/g, "") || "besorgungsliste";
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function shoppingExportRows() {
  return selectedShoppingExportLists().flatMap((list) => {
    const rows = [{ type: "list", text: list.name }];
    if (!list.items.length) {
      rows.push({ type: "item", name: "Keine Einträge.", note: "", supporters: "" });
      return rows;
    }
    list.items.forEach((item) => {
      rows.push({
        type: "item",
        name: item.name,
        note: item.note || "",
        supporters: item.supporters
          .map((profileId) => state.profiles.find((profile) => profile.id === profileId)?.name)
          .filter(Boolean)
          .join(", "),
      });
    });
    return rows;
  });
}

function wrapText(context, text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawShoppingExportCanvas() {
  const scale = 2;
  const width = 900;
  const margin = 42;
  const lineHeight = 24;
  const rows = shoppingExportRows();
  const height = Math.max(700, 190 + rows.length * 92);
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d");
  context.scale(scale, scale);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#17211d";
  context.font = "700 34px Arial, sans-serif";
  context.fillText(shoppingExportTitle(), margin, 58);
  context.font = "16px Arial, sans-serif";
  context.fillStyle = "#64706a";
  context.fillText(`Festival Time Table · ${new Date().toLocaleString("de-DE")}`, margin, 86);

  let y = 128;
  rows.forEach((row) => {
    if (row.type === "list") {
      context.fillStyle = "#176b5b";
      context.font = "700 24px Arial, sans-serif";
      context.fillText(row.text, margin, y);
      y += 34;
      return;
    }
    context.fillStyle = "#eef4ef";
    context.fillRect(margin, y - 20, width - margin * 2, 66);
    context.strokeStyle = "#d8e2dc";
    context.strokeRect(margin, y - 20, width - margin * 2, 66);
    context.fillStyle = "#17211d";
    context.font = "700 18px Arial, sans-serif";
    wrapText(context, row.name, 300).slice(0, 2).forEach((line, index) => {
      context.fillText(line, margin + 12, y + index * lineHeight);
    });
    context.font = "15px Arial, sans-serif";
    context.fillStyle = "#3f4a45";
    wrapText(context, row.note, 210).slice(0, 2).forEach((line, index) => {
      context.fillText(line, margin + 350, y + index * lineHeight);
    });
    context.fillStyle = "#64706a";
    wrapText(context, row.supporters || "-", 230).slice(0, 2).forEach((line, index) => {
      context.fillText(line, margin + 600, y + index * lineHeight);
    });
    y += 82;
  });
  return canvas;
}

function createShoppingPdfBlob() {
  const lines = [];
  lines.push(shoppingExportTitle());
  lines.push(`Festival Time Table · ${new Date().toLocaleString("de-DE")}`);
  lines.push("");
  selectedShoppingExportLists().forEach((list) => {
    lines.push(list.name);
    if (!list.items.length) lines.push("  Keine Einträge.");
    list.items.forEach((item) => {
      const supporters = item.supporters
        .map((profileId) => state.profiles.find((profile) => profile.id === profileId)?.name)
        .filter(Boolean)
        .join(", ");
      lines.push(`  • ${item.name}`);
      if (item.note) lines.push(`    Hinweis: ${item.note}`);
      lines.push(`    Benötigt von: ${supporters || "-"}`);
    });
    lines.push("");
  });
  return buildSimplePdf(lines);
}

function buildSimplePdf(lines) {
  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 50;
  const lineHeight = 16;
  const escapedLines = lines.flatMap((line) => splitPdfLine(line, 88));
  const pages = [];
  for (let index = 0; index < escapedLines.length; index += 44) {
    pages.push(escapedLines.slice(index, index + 44));
  }
  if (!pages.length) pages.push([""]);

  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length;
  };
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];
  const contentIds = [];
  pages.forEach((pageLines) => {
    let y = pageHeight - margin;
    const streamLines = ["BT", "/F1 12 Tf", "14 TL"];
    pageLines.forEach((line, lineIndex) => {
      if (lineIndex === 0) streamLines.push(`${margin} ${y} Td`);
      else streamLines.push(`0 -${lineHeight} Td`);
      streamLines.push(`(${escapePdfText(line)}) Tj`);
      y -= lineHeight;
    });
    streamLines.push("ET");
    const stream = streamLines.join("\n");
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    contentIds.push(contentId);
    pageIds.push(null);
  });
  const pagesIdPlaceholder = objects.length + pages.length + 1;
  pages.forEach((_, index) => {
    const pageId = addObject(`<< /Type /Page /Parent ${pagesIdPlaceholder} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`);
    pageIds[index] = pageId;
  });
  const pagesId = addObject(`<< /Type /Pages /Kids [${pageIds.map((idValue) => `${idValue} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
  const chunks = ["%PDF-1.4\n"];
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(chunks.join("").length);
    chunks.push(`${index + 1} 0 obj\n${body}\nendobj\n`);
  });
  const xrefStart = chunks.join("").length;
  chunks.push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  offsets.slice(1).forEach((offset) => {
    chunks.push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);
  return new Blob([chunks.join("")], { type: "application/pdf" });
}

function splitPdfLine(text, maxLength) {
  const value = String(text || "");
  if (value.length <= maxLength) return [value];
  const result = [];
  let remaining = value;
  while (remaining.length > maxLength) {
    const slice = remaining.slice(0, maxLength);
    const breakAt = Math.max(slice.lastIndexOf(" "), 1);
    result.push(remaining.slice(0, breakAt));
    remaining = remaining.slice(breakAt).trimStart();
  }
  if (remaining) result.push(remaining);
  return result;
}

function escapePdfText(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function archiveDoneShoppingItems() {
  const listIds = selectedShoppingList === "all"
    ? state.shoppingLists.map((list) => list.id)
    : [selectedShoppingList];
  const doneItems = state.shoppingItems.filter((item) => item.done && listIds.includes(item.listId));
  if (!doneItems.length) {
    showToast("Keine erledigten Einträge in dieser Auswahl.");
    return;
  }
  const archivedAt = new Date().toISOString();
  const groupsByList = new Map();
  doneItems.forEach((item) => {
    if (!groupsByList.has(item.listId)) groupsByList.set(item.listId, []);
    groupsByList.get(item.listId).push({ ...item });
  });
  groupsByList.forEach((items, listId) => {
    const list = state.shoppingLists.find((entry) => entry.id === listId);
    state.shoppingArchive.push({
      id: id(),
      listId,
      listName: list?.name || "Liste",
      archivedAt,
      archivedBy: sessionId,
      items,
    });
  });
  const doneIds = new Set(doneItems.map((item) => item.id));
  state.shoppingItems = state.shoppingItems.filter((item) => !doneIds.has(item.id));
  saveState();
  render();
}

function renderProfiles() {
  return `
    ${renderHeader("Profile", "Admin Verwaltung", `<button class="primary-button" data-modal="profile">${icon("plus")} Profil</button>`)}
    <section class="grid two">
      <div class="panel">
        <div class="panel-header"><h3>Alle Profile</h3></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Rolle</th><th>PIN</th><th></th></tr></thead>
            <tbody>
              ${state.profiles
                .map(
                  (profile) => `<tr>
                <td><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</td>
                <td>${profile.role === "admin" ? "Admin" : "Profil"}</td>
                <td>${escapeHtml(profile.pin)}</td>
                <td>${profile.id !== sessionId ? `<button class="icon-button" title="Löschen" data-delete-profile="${profile.id}">${icon("trash", "Löschen")}</button>` : ""}</td>
              </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Wer plant was?</h3></div>
        ${renderAdminOverview()}
      </div>
    </section>
  `;
}

function renderAdminOverview() {
  const rows = state.acts
    .map((act) => {
      const attending = state.profiles.filter(
        (profile) => profilePlan(profile.id).acts[act.id] === "attending",
      );
      return { act, attending };
    })
    .filter((row) => row.attending.length);
  if (!rows.length)
    return `<div class="empty">Noch keine Zusagen eingetragen.</div>`;
  return `<div class="grid">${rows
    .map(
      ({ act, attending }) => `
    <div>
      <strong>${escapeHtml(act.artist)}</strong>
      <div class="muted">${dayLabel(act.day)} · ${formatTime(act.start, act.end)}</div>
      <div class="chip-row">${attending.map((profile) => `<span class="chip active"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}</div>
    </div>
  `,
    )
    .join("")}</div>`;
}

function renderSettings() {
  return `
    ${renderHeader("Daten", "Backup und Bühnen", `<button class="primary-button" data-export>${icon("download")} Export</button><button class="soft-button" data-import-trigger>${icon("upload")} Import</button><button class="soft-button" data-load-official>${icon("schedule")} Offizieller Timetable</button><input class="file-input" type="file" accept="application/json" data-import-file>`)}
    <section class="grid two">
      <div class="panel">
        <div class="panel-header"><h3>Bühnen</h3><button class="soft-button" data-modal="stage">${icon("plus")} Bühne</button></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Acts</th><th></th></tr></thead>
            <tbody>${state.stages.map((stage) => `<tr><td>${escapeHtml(stage.name)}</td><td>${state.acts.filter((act) => act.stageId === stage.id).length}</td><td><button class="icon-button" title="Löschen" data-delete-stage="${stage.id}">${icon("trash", "Löschen")}</button></td></tr>`).join("")}</tbody>
          </table>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Hinweis zum Hosting</h3></div>
        <p class="muted">GitHub Pages hostet diese App statisch. Profile, Timetable und Pläne werden deshalb im Browser gespeichert. Mit Export und Import kannst du den Stand sichern oder auf ein anderes Gerät übertragen.</p>
        <p class="muted">Der offizielle Rock-im-Park-2026-Timetable ist in der App hinterlegt und kann hier jederzeit ohne Duplikate nachgeladen werden.</p>
      </div>
      <div class="panel">
        <div class="panel-header"><h3>Backend Sync</h3></div>
        <form class="grid" data-form="api-base">
          <label>Backend oder Supabase URL
            <input name="apiBase" value="${escapeHtml(apiBase)}" placeholder="https://dein-projekt.supabase.co">
          </label>
          <label>Supabase Publishable / anon Key
            <input name="apiKey" value="${escapeHtml(apiKey)}" placeholder="nur bei Supabase nötig">
          </label>
          <button class="primary-button" type="submit">${icon("check")} Speichern & verbinden</button>
          <p class="muted">${remoteSyncAvailable ? "Sync verbunden." : "Aktuell lokaler Speicher oder Sync nicht erreichbar."}</p>
        </form>
      </div>
    </section>
  `;
}

function renderModal() {
  const title =
    modal.type === "act"
      ? modal.actId
        ? "Act bearbeiten"
        : "Act eintragen"
      : modal.type === "profile"
        ? "Profil anlegen"
        : modal.type === "stage"
          ? "Bühne anlegen"
          : modal.type === "drinks"
            ? "Getränke zählen"
            : modal.type === "group"
              ? "Gruppe erstellen"
              : "Zeltzeit eintragen";
  return `
    <div class="modal-backdrop" data-close-modal>
      <div class="modal-card" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}" data-modal-card>
        <div class="panel-header">
          <h3>${escapeHtml(title)}</h3>
          <button class="icon-button" title="Schließen" data-close-modal>×</button>
        </div>
        ${modal.type === "act" ? renderActForm() : ""}
        ${modal.type === "profile" ? renderProfileForm() : ""}
        ${modal.type === "stage" ? renderStageForm() : ""}
        ${modal.type === "tent" ? renderTentForm() : ""}
        ${modal.type === "drinks" ? renderDrinksCounter() : ""}
        ${modal.type === "group" ? renderGroupForm() : ""}
      </div>
    </div>
  `;
}

function renderGroupDialog() {
  const group = state.groups.find((item) => item.id === groupDialog);
  if (!group) return "";
  const creator = state.profiles.find(
    (profile) => profile.id === group.creatorId,
  );
  const members = group.members
    .map((memberId) =>
      state.profiles.find((profile) => profile.id === memberId),
    )
    .filter(Boolean);
  const joined = group.members.includes(sessionId);
  const canDelete = group.creatorId === sessionId;
  return `
    <div class="modal-backdrop" data-close-group-dialog>
      <div class="modal-card group-detail" role="dialog" aria-modal="true" aria-label="${escapeHtml(group.name)}" data-group-dialog-card>
        <div class="panel-header">
          <div>
            <h3>${escapeHtml(group.name)}</h3>
            <p class="muted">Erstellt von ${escapeHtml(creator?.name || "Unbekannt")}</p>
          </div>
          <button class="icon-button" title="Schließen" data-close-group-dialog>×</button>
        </div>
        <div class="group-member-list">
          ${members.length ? members.map((profile) => `<div class="group-member-row"><span><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>${profile.id === group.creatorId ? `<span class="chip active">Ersteller</span>` : ""}</div>`).join("") : `<div class="empty">Noch niemand dabei.</div>`}
        </div>
        <div class="button-row">
          ${joined ? `<button class="danger-button" data-leave-group="${group.id}">Austreten</button>` : `<button class="primary-button" data-join-group="${group.id}">${icon("check")} Dabei sein</button>`}
          ${canDelete ? `<button class="danger-button" data-delete-group="${group.id}">${icon("trash")} Gruppe löschen</button>` : ""}
        </div>
      </div>
    </div>
  `;
}

function renderAlcoholTest() {
  if (alcoholTest.phase === "game") {
    return `
      <div class="alcohol-backdrop" data-alcohol-arena>
        <div class="alcohol-card alcohol-game">
          <div class="alcohol-head">
            <div>
              <h3>Alkoholisierungs Level</h3>
              <p class="muted">Bierkrüge antippen. Das Fenster bleibt bis zum Ende offen.</p>
            </div>
            <strong>${timeLeftSeconds(alcoholTest.endAt)}s</strong>
          </div>
          <div class="mug-arena">
            ${alcoholTest.mugs.map((mug) => `<button class="mug-button" data-mug-id="${mug.id}" style="left:${mug.x}%;top:${mug.y}%;width:${mug.size}px;height:${mug.size}px">🍺</button>`).join("")}
          </div>
          <div class="alcohol-stats">
            <span>Treffer: ${alcoholTest.hits}</span>
            <span>Taps: ${alcoholTest.taps}</span>
          </div>
        </div>
      </div>
    `;
  }
  if (alcoholTest.phase === "calculating") {
    return `
      <div class="alcohol-backdrop">
        <div class="alcohol-card">
          <h3>Dein Level wird berechnet</h3>
          <div class="loading-bar"><span></span></div>
          <p class="muted">Trefferquote, wilde Display-Taps und Festivalphysik werden ausgewertet.</p>
        </div>
      </div>
    `;
  }
  const result = alcoholTest.result;
  return `
    <div class="alcohol-backdrop">
      <div class="alcohol-card">
        <p class="eyebrow">Ergebnis</p>
        <h3>${escapeHtml(result.level)}</h3>
        <div class="grid three">
          <div class="stat"><span class="muted">Score</span><strong>${result.score}%</strong></div>
          <div class="stat"><span class="muted">Treffer</span><strong>${result.hits}</strong></div>
          <div class="stat"><span class="muted">Taps</span><strong>${result.taps}</strong></div>
        </div>
        <p class="muted">Getroffene Krüge: ${result.hits} von ${result.spawned}. <br> Präzision: ${Math.round(result.precision * 100)}%.</p>
        <button class="primary-button" data-close-alcohol-test>Fertig</button>
      </div>
    </div>
  `;
}

function renderActForm() {
  const act = state.acts.find((item) => item.id === modal.actId) || {
    day: selectedDay,
    start: "",
    end: "",
    artist: "",
    stageId: state.stages[0]?.id || "",
    note: "",
  };
  return `
    <form class="form-grid" data-form="act">
      <label>Band / Artist
        <input name="artist" required value="${escapeHtml(act.artist)}">
      </label>
      <label>Bühne
        <select name="stageId" required>${state.stages.map((stage) => `<option value="${stage.id}" ${stage.id === act.stageId ? "selected" : ""}>${escapeHtml(stage.name)}</option>`).join("")}</select>
      </label>
      <label>Tag
        <select name="day">${DAYS.map((day) => `<option value="${day.value}" ${day.value === act.day ? "selected" : ""}>${day.label}</option>`).join("")}</select>
      </label>
      <label>Start
        <input name="start" type="time" required value="${escapeHtml(act.start)}">
      </label>
      <label>Ende
        <input name="end" type="time" value="${escapeHtml(act.end)}">
      </label>
      <label class="full">Notiz
        <textarea name="note">${escapeHtml(act.note)}</textarea>
      </label>
      <div class="full button-row">
        <button class="primary-button" type="submit">${icon("check")} Speichern</button>
        <button class="ghost-button" type="button" data-close-modal>Abbrechen</button>
      </div>
    </form>
  `;
}

function renderProfileForm() {
  return `
    <form class="form-grid" data-form="profile">
      <label>Name
        <input name="name" required>
      </label>
      <label>PIN
        <input name="pin" required minlength="3">
      </label>
      <label>Rolle
        <select name="role">
          <option value="user">Profil</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <div class="full button-row">
        <button class="primary-button" type="submit">${icon("check")} Speichern</button>
        <button class="ghost-button" type="button" data-close-modal>Abbrechen</button>
      </div>
    </form>
  `;
}

function renderStageForm() {
  return `
    <form class="grid" data-form="stage">
      <label>Bühnenname
        <input name="name" required placeholder="z. B. Park Stage">
      </label>
      <div class="button-row">
        <button class="primary-button" type="submit">${icon("check")} Speichern</button>
        <button class="ghost-button" type="button" data-close-modal>Abbrechen</button>
      </div>
    </form>
  `;
}

function renderTentForm() {
  return `
    <form class="form-grid" data-form="tent">
      <label>Tag
        <select name="day">${DAYS.map((day) => `<option value="${day.value}" ${day.value === selectedDay ? "selected" : ""}>${day.label}</option>`).join("")}</select>
      </label>
      <label>Start
        <input name="start" type="time" required>
      </label>
      <label>Ende
        <input name="end" type="time">
      </label>
      <label class="full">Notiz
        <textarea name="note" placeholder="z. B. Pause, Essen, Schlafen">Im Zelt bleiben</textarea>
      </label>
      <div class="full button-row">
        <button class="primary-button" type="submit">${icon("tent")} Eintragen</button>
        <button class="ghost-button" type="button" data-close-modal>Abbrechen</button>
      </div>
    </form>
  `;
}

function renderGroupForm() {
  return `
    <form class="grid" data-form="group">
      <label>Gruppenname
        <input name="name" required maxlength="40" placeholder="z. B. Treffpunkt Utopia">
      </label>
      <div class="button-row">
        <button class="primary-button" type="submit">${icon("check")} Erstellen</button>
        <button class="ghost-button" type="button" data-close-modal>Abbrechen</button>
      </div>
    </form>
  `;
}

function renderDrinksCounter() {
  const stats = profilePlan().drinkStats;
  return `
    <div class="grid three">
      ${renderDrinkCounter("standBeer", "Bier am Stand gekauft", stats.standBeer)}
      ${renderDrinkCounter("tentBeer", "Bier am Zelt getrunken", stats.tentBeer)}
      ${renderDrinkCounter("otherDrinks", "Andere Sachen getrunken", stats.otherDrinks)}
    </div>
    <div class="button-row" style="margin-top:16px">
      <button class="ghost-button" type="button" data-drink-reset>Zurücksetzen</button>
      <button class="primary-button" type="button" data-close-modal>Fertig</button>
    </div>
  `;
}

function renderDrinkCounter(key, label, value) {
  return `
    <div class="panel">
      <div class="stat">
        <span class="muted">${escapeHtml(label)}</span>
        <strong>${value}</strong>
      </div>
      <div class="button-row">
        <button class="icon-button" title="Weniger" data-drink="${key}" data-delta="-1">-</button>
        <button class="icon-button" title="Mehr" data-drink="${key}" data-delta="1">+</button>
      </div>
    </div>
  `;
}

function bindAuth() {
  const setup = app.querySelector('[data-form="setup"]');
  if (setup) {
    setup.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(setup);
      const profile = {
        id: state.adminId || id(),
        name: data.get("name").trim(),
        pin: data.get("pin"),
        role: "admin",
        color: COLORS[0],
      };
      state.profiles = [profile];
      state.adminId = profile.id;
      state.initialized = true;
      sessionId = profile.id;
      localStorage.setItem("festival-session-id", sessionId);
      saveState();
      render();
    });
  }

  const login = app.querySelector('[data-form="login"]');
  if (login) {
    login.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(login);
      const profile = state.profiles.find(
        (item) => item.id === data.get("profileId"),
      );
      if (!profile || profile.pin !== data.get("pin")) {
        showToast("PIN passt nicht.");
        return;
      }
      sessionId = profile.id;
      localStorage.setItem("festival-session-id", sessionId);
      render();
    });
  }
}

function bindApp() {
  app.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      view = button.dataset.view;
      render();
    });
  });

  app.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDay = button.dataset.day;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-toggle-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const stageId = button.dataset.toggleStage;
      expandedStages[stageId] = !expandedStages[stageId];
      localStorage.setItem(
        "festival-expanded-stages",
        JSON.stringify(expandedStages),
      );
      render();
    });
  });

  app.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      modal = { type: button.dataset.modal };
      actPopover = null;
      render();
    });
  });

  app.querySelectorAll("[data-act-info]").forEach((button) => {
    let touchMoved = false;
    const openInfo = (event) => {
      if (event.type === "touchend" && touchMoved) return;
      event.preventDefault();
      event.stopPropagation();
      actPopover = button.dataset.actInfo;
      modal = null;
      render();
    };
    button.addEventListener(
      "touchstart",
      () => {
        touchMoved = false;
      },
      { passive: true },
    );
    button.addEventListener(
      "touchmove",
      () => {
        touchMoved = true;
      },
      { passive: true },
    );
    button.addEventListener("touchend", openInfo, { passive: false });
    button.addEventListener("click", openInfo);
  });

  app.querySelectorAll("[data-group-info]").forEach((button) => {
    button.addEventListener("click", () => {
      groupDialog = button.dataset.groupInfo;
      modal = null;
      actPopover = null;
      render();
    });
  });

  app
    .querySelector("[data-close-act-popover]")
    ?.addEventListener("click", () => {
      actPopover = null;
      render();
    });

  app
    .querySelector("[data-act-popover-card]")
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
    });

  app.querySelectorAll("[data-close-group-dialog]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (
        event.target.closest("[data-group-dialog-card]") &&
        !event.target.matches("[data-close-group-dialog]")
      )
        return;
      groupDialog = null;
      render();
    });
  });

  app
    .querySelector("[data-group-dialog-card]")
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
    });

  app.querySelectorAll("[data-edit-act]").forEach((button) => {
    button.addEventListener("click", () => {
      modal = { type: "act", actId: button.dataset.editAct };
      render();
    });
  });

  app.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (
        event.target.closest("[data-modal-card]") &&
        !event.target.matches("[data-close-modal]")
      )
        return;
      modal = null;
      render();
    });
  });

  const modalCard = app.querySelector("[data-modal-card]");
  if (modalCard)
    modalCard.addEventListener("click", (event) => event.stopPropagation());

  app.querySelector('[data-action="logout"]')?.addEventListener("click", () => {
    sessionId = "";
    localStorage.removeItem("festival-session-id");
    render();
  });

  app
    .querySelector("[data-toggle-admin-view]")
    ?.addEventListener("click", () => {
      adminPreviewUser = !adminPreviewUser;
      localStorage.setItem(
        "festival-admin-preview-user",
        String(adminPreviewUser),
      );
      if (adminPreviewUser && (view === "profiles" || view === "settings"))
        view = "timeline";
      modal = null;
      actPopover = null;
      render();
    });

  app.querySelector("[data-toggle-theme]")?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("festival-theme", theme);
    render();
  });

  app.querySelector("[data-shopping-list-filter]")?.addEventListener("change", (event) => {
    selectedShoppingList = event.target.value;
    localStorage.setItem("festival-selected-shopping-list", selectedShoppingList);
    render();
  });

  app.querySelector("[data-toggle-own-tents]")?.addEventListener("click", () => {
    ownTentExpanded = !ownTentExpanded;
    localStorage.setItem("festival-own-tent-expanded", String(ownTentExpanded));
    render();
  });

  app.querySelector("[data-export-shopping-image]")?.addEventListener("click", exportShoppingImage);
  app.querySelector("[data-export-shopping-pdf]")?.addEventListener("click", exportShoppingPdf);
  app.querySelector("[data-archive-shopping-done]")?.addEventListener("click", archiveDoneShoppingItems);

  app
    .querySelector("[data-start-alcohol-test]")
    ?.addEventListener("click", () => {
      modal = null;
      actPopover = null;
      groupDialog = null;
      startAlcoholTest();
    });

  app.querySelector("[data-alcohol-arena]")?.addEventListener(
    "pointerdown",
    () => {
      if (!alcoholTest || alcoholTest.phase !== "game") return;
      alcoholTest.taps += 1;
    },
    { capture: true },
  );

  app.querySelectorAll("[data-mug-id]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      if (!alcoholTest || alcoholTest.phase !== "game") return;
      const mugId = button.dataset.mugId;
      if (!alcoholTest.mugs.some((mug) => mug.id === mugId)) return;
      alcoholTest.hits += 1;
      alcoholTest.mugs = alcoholTest.mugs.filter((mug) => mug.id !== mugId);
      render();
    });
  });

  app
    .querySelector("[data-close-alcohol-test]")
    ?.addEventListener("click", () => {
      alcoholTest = null;
      clearAlcoholTimers();
      render();
    });

  app.querySelectorAll("[data-set-color]").forEach((button) => {
    button.addEventListener("click", () => {
      const profile = currentProfile();
      const color = button.dataset.setColor;
      const taken = state.profiles.some(
        (item) => item.id !== profile.id && item.color === color,
      );
      if (taken) {
        showToast("Diese Farbe ist schon vergeben.");
        render();
        return;
      }
      profile.color = color;
      saveState();
      render();
    });
  });

  bindForms();
  bindMutations();
  bindImportExport();
}

function bindForms() {
  app
    .querySelector('[data-form="act"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const act = {
        id: modal.actId || id(),
        artist: data.get("artist").trim(),
        stageId: data.get("stageId"),
        day: data.get("day"),
        start: data.get("start"),
        end: data.get("end"),
        note: data.get("note").trim(),
      };
      if (modal.actId) {
        state.acts = state.acts.map((item) =>
          item.id === modal.actId ? act : item,
        );
      } else {
        state.acts.push(act);
      }
      selectedDay = act.day;
      modal = null;
      saveState();
      render();
    });

  app
    .querySelector('[data-form="profile"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const color = nextAvailableColor();
      if (!color) {
        showToast("Keine freie Profilfarbe mehr verfügbar.");
        return;
      }
      state.profiles.push({
        id: id(),
        name: data.get("name").trim(),
        pin: data.get("pin"),
        role: data.get("role"),
        color,
      });
      modal = null;
      saveState();
      render();
    });

  app
    .querySelector('[data-form="stage"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      state.stages.push({ id: id(), name: data.get("name").trim() });
      modal = null;
      saveState();
      render();
    });

  app
    .querySelector('[data-form="tent"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      profilePlan().tents.push({
        id: id(),
        day: data.get("day"),
        start: data.get("start"),
        end: data.get("end"),
        note: data.get("note").trim(),
      });
      modal = null;
      saveState();
      render();
    });

  app
    .querySelector('[data-form="group"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      state.groups.forEach((group) => {
        group.members = group.members.filter(
          (memberId) => memberId !== sessionId,
        );
      });
      cleanupEmptyGroups();
      const group = {
        id: id(),
        name: data.get("name").trim(),
        creatorId: sessionId,
        members: [sessionId],
        createdAt: new Date().toISOString(),
      };
      state.groups.push(group);
      modal = null;
      groupDialog = group.id;
      saveState();
      render();
    });

  app
    .querySelector('[data-form="api-base"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      apiBase = String(data.get("apiBase") || "")
        .trim()
        .replace(/\/$/, "");
      apiKey = String(data.get("apiKey") || "").trim();
      localStorage.setItem(API_BASE_KEY, apiBase);
      localStorage.setItem(API_KEY_KEY, apiKey);
      remoteSyncAvailable = false;
      loadRemoteState();
      showToast("Backend-Verbindung wird geprüft.");
    });

  app
    .querySelector('[data-form="shopping"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = String(data.get("name") || "").trim();
      if (!name) return;
      state.shoppingItems.push({
        id: id(),
        name,
        note: String(data.get("note") || "").trim(),
        listId: String(data.get("listId") || state.shoppingLists[0]?.id || "shopping-buy"),
        creatorId: sessionId,
        supporters: [sessionId],
        createdAt: new Date().toISOString(),
      });
      saveState();
      render();
    });

  app
    .querySelector('[data-form="shopping-list"]')
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = String(data.get("name") || "").trim();
      if (!name) return;
      const exists = state.shoppingLists.some((list) => list.name.toLowerCase() === name.toLowerCase());
      if (exists) {
        showToast("Diese Liste gibt es schon.");
        return;
      }
      state.shoppingLists.push({
        id: id(),
        name,
        createdBy: sessionId,
      });
      saveState();
      render();
    });
}

function bindMutations() {
  app.querySelector("[data-toggle-tent]")?.addEventListener("click", () => {
    const plan = profilePlan();
    const activeEntry = activeTentEntry();
    if (activeEntry) {
      activeEntry.end = currentTimeValue();
      activeEntry.active = false;
      if (!activeEntry.note) activeEntry.note = "Beim Zelt";
      showToast("Zeltzeit beendet.");
    } else {
      plan.tents.push({
        id: id(),
        day: currentTentDay(),
        start: currentTimeValue(),
        end: "",
        note: "Beim Zelt",
        kind: "tent",
        active: true,
      });
      showToast("Zeltzeit gestartet.");
    }
    saveState();
    render();
  });

  app.querySelector("[data-beer-pickup]")?.addEventListener("click", () => {
    const plan = profilePlan();
    if (beerButtonLocked()) return;
    const now = currentTimeValue();
    plan.tents.push({
      id: id(),
      day: currentTentDay(),
      start: now,
      end: now,
      note: "Bier holen",
      kind: "beer",
      active: false,
    });
    plan.drinkStats.standBeer = Number(plan.drinkStats.standBeer || 0) + 1;
    showToast("Bierholen eingetragen.");
    plan.beerUnlockAt = Date.now() + 10000;
    saveState();
    render();
    setTimeout(() => {
      const latestPlan = profilePlan();
      if (latestPlan.beerUnlockAt && latestPlan.beerUnlockAt <= Date.now()) {
        delete latestPlan.beerUnlockAt;
        saveState();
        render();
      }
    }, 10050);
  });

  app.querySelectorAll("[data-drink]").forEach((button) => {
    button.addEventListener("click", () => {
      const stats = profilePlan().drinkStats;
      const key = button.dataset.drink;
      const delta = Number(button.dataset.delta || 0);
      stats[key] = Math.max(0, Number(stats[key] || 0) + delta);
      saveState();
      render();
    });
  });

  app.querySelector("[data-drink-reset]")?.addEventListener("click", () => {
    if (!confirm("Getränkezähler zurücksetzen?")) return;
    profilePlan().drinkStats = { standBeer: 0, tentBeer: 0, otherDrinks: 0 };
    saveState();
    render();
  });

  app.querySelectorAll("[data-plan-act]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = profilePlan();
      const status = button.dataset.status;
      if (status) plan.acts[button.dataset.planAct] = status;
      else delete plan.acts[button.dataset.planAct];
      actPopover = null;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-act]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!confirm("Diesen Act löschen?")) return;
      state.acts = state.acts.filter(
        (act) => act.id !== button.dataset.deleteAct,
      );
      Object.values(state.plans).forEach(
        (plan) => delete plan.acts?.[button.dataset.deleteAct],
      );
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!confirm("Dieses Profil löschen?")) return;
      state.profiles = state.profiles.filter(
        (profile) => profile.id !== button.dataset.deleteProfile,
      );
      delete state.plans[button.dataset.deleteProfile];
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const stageId = button.dataset.deleteStage;
      if (state.acts.some((act) => act.stageId === stageId)) {
        showToast("Bühne hat noch Acts.");
        return;
      }
      state.stages = state.stages.filter((stage) => stage.id !== stageId);
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-tent]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = profilePlan();
      plan.tents = plan.tents.filter(
        (item) => item.id !== button.dataset.deleteTent,
      );
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-join-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = state.groups.find(
        (item) => item.id === button.dataset.joinGroup,
      );
      if (!group) return;
      state.groups.forEach((item) => {
        item.members = item.members.filter(
          (memberId) => memberId !== sessionId,
        );
      });
      if (!group.members.includes(sessionId)) group.members.push(sessionId);
      cleanupEmptyGroups();
      groupDialog = group.id;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-leave-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = state.groups.find(
        (item) => item.id === button.dataset.leaveGroup,
      );
      if (!group) return;
      group.members = group.members.filter(
        (memberId) => memberId !== sessionId,
      );
      cleanupEmptyGroups();
      if (!state.groups.some((item) => item.id === group.id))
        groupDialog = null;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = state.groups.find(
        (item) => item.id === button.dataset.deleteGroup,
      );
      if (!group || group.creatorId !== sessionId) return;
      if (!confirm("Diese Gruppe löschen?")) return;
      state.groups = state.groups.filter((item) => item.id !== group.id);
      groupDialog = null;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-toggle-shopping]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.shoppingItems.find((entry) => entry.id === button.dataset.toggleShopping);
      if (!item) return;
      if (item.supporters.includes(sessionId)) {
        item.supporters = item.supporters.filter((profileId) => profileId !== sessionId);
      } else {
        item.supporters.push(sessionId);
      }
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-toggle-shopping-done]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const item = state.shoppingItems.find((entry) => entry.id === checkbox.dataset.toggleShoppingDone);
      if (!item) return;
      item.done = checkbox.checked;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-shopping]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.shoppingItems.find((entry) => entry.id === button.dataset.deleteShopping);
      if (!item || (item.creatorId !== sessionId && !canManage())) return;
      if (!confirm("Diesen Einkaufswunsch löschen?")) return;
      state.shoppingItems = state.shoppingItems.filter((entry) => entry.id !== item.id);
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-shopping-drag]").forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", item.dataset.shoppingDrag);
      event.dataTransfer.effectAllowed = "move";
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
  });

  app.querySelectorAll("[data-shopping-drop]").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      column.classList.add("drag-over");
    });
    column.addEventListener("dragleave", () => {
      column.classList.remove("drag-over");
    });
    column.addEventListener("drop", (event) => {
      event.preventDefault();
      column.classList.remove("drag-over");
      const itemId = event.dataTransfer.getData("text/plain");
      const item = state.shoppingItems.find((entry) => entry.id === itemId);
      if (!item) return;
      item.listId = column.dataset.shoppingDrop;
      saveState();
      render();
    });
  });
}

function bindImportExport() {
  app.querySelector("[data-load-official]")?.addEventListener("click", () => {
    const added = importOfficialTimetable(state);
    saveState();
    showToast(
      added
        ? `${added} offizielle Acts eingetragen.`
        : "Timetable war schon vollständig.",
    );
    render();
  });

  app.querySelector("[data-export]")?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "festival-time-table-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  app.querySelector("[data-import-trigger]")?.addEventListener("click", () => {
    app.querySelector("[data-import-file]")?.click();
  });

  app
    .querySelector("[data-import-file]")
    ?.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const nextState = JSON.parse(await file.text());
        if (
          !Array.isArray(nextState.profiles) ||
          !Array.isArray(nextState.stages)
        )
          throw new Error("Invalid backup");
        state = { ...createSeedState(), ...nextState, initialized: true };
        sessionId = "";
        localStorage.removeItem("festival-session-id");
        saveState();
        showToast("Import abgeschlossen. Bitte neu einloggen.");
        render();
      } catch {
        showToast("Import fehlgeschlagen.");
      }
    });
}

function showToast(message) {
  clearTimeout(toastTimer);
  document.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  toastTimer = setTimeout(() => toast.remove(), 2600);
}

render();
loadRemoteState();
