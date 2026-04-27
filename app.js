"use strict";

const STORAGE_KEY = "festival-time-table:v1";
const COLORS = ["#176b5b", "#a74719", "#487ca8", "#6f5aa8", "#b18318", "#39715d", "#a33131"];
const DAYS = [
  { value: "2026-06-05", label: "Fr, 05.06." },
  { value: "2026-06-06", label: "Sa, 06.06." },
  { value: "2026-06-07", label: "So, 07.06." }
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
  ["2026-06-07", "Orbit Stage", "The Butcher Sisters", "00:50", "02:00"]
];
const ICONS = {
  schedule: "M8 2v4M16 2v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  plus: "M12 5v14M5 12h14",
  tent: "M3 20 12 4l9 16M12 4v16M8 20h8",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.4 1v.2a2 2 0 1 1-4 0V21a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1-.4h-.2a2 2 0 1 1 0-4H3a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 1.65 1.65 0 0 0 .4-1v-.2a2 2 0 1 1 4 0V3a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.19.65.47.86.82.2.35.3.74.3 1.14s-.1.79-.3 1.14c-.21.35-.5.63-.86.9Z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  edit: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6",
  check: "M20 6 9 17l-5-5",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
};

const app = document.querySelector("#app");
let state = loadState();
let sessionId = localStorage.getItem("festival-session-id") || "";
let view = "timeline";
let selectedDay = state.selectedDay || DAYS[0].value;
let modal = null;
let toastTimer = null;

function createSeedState() {
  const adminId = id();
  const seed = {
    version: 1,
    selectedDay: DAYS[0].value,
    profiles: [],
    stages: [
      { id: id(), name: "Utopia Stage" },
      { id: id(), name: "Mandora Stage" },
      { id: id(), name: "Orbit Stage" }
    ],
    acts: [],
    plans: {},
    adminId,
    initialized: false
  };
  importOfficialTimetable(seed);
  return seed;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    const nextState = { ...createSeedState(), ...JSON.parse(raw) };
    if (!nextState.acts.length) importOfficialTimetable(nextState);
    return nextState;
  } catch {
    return createSeedState();
  }
}

function importOfficialTimetable(targetState) {
  const stageIdsByName = new Map(targetState.stages.map((stage) => [stage.name, stage.id]));
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
    const exists = targetState.acts.some((act) => (
      act.day === day
      && act.stageId === stageId
      && act.artist.toLowerCase() === artist.toLowerCase()
      && act.start === start
    ));
    if (!exists) {
      targetState.acts.push({
        id: id(),
        artist,
        stageId,
        day,
        start,
        end,
        note: "Offizieller Rock im Park 2026 Timetable"
      });
      added += 1;
    }
  });
  return added;
}

function saveState() {
  state.selectedDay = selectedDay;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function id() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function icon(name, label = "") {
  const title = label ? `<title>${escapeHtml(label)}</title>` : "";
  return `<svg aria-hidden="${label ? "false" : "true"}" role="img" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${title}<path d="${ICONS[name] || ICONS.check}"></path></svg>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function currentProfile() {
  return state.profiles.find((profile) => profile.id === sessionId) || null;
}

function isAdmin() {
  const profile = currentProfile();
  return Boolean(profile && profile.role === "admin");
}

function formatTime(start, end) {
  return `${start || "?"}${end ? ` - ${end}` : ""}`;
}

function currentTimeValue() {
  return new Date().toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function currentTentDay() {
  const today = new Date().toISOString().slice(0, 10);
  return DAYS.some((day) => day.value === today) ? today : selectedDay;
}

function activeTentEntry(profileId = sessionId) {
  return profilePlan(profileId).tents.find((item) => item.active && (!item.kind || item.kind === "tent"));
}

function beerButtonLocked(profileId = sessionId) {
  const unlockAt = Number(profilePlan(profileId).beerUnlockAt || 0);
  return unlockAt > Date.now();
}

function dayLabel(day) {
  return DAYS.find((item) => item.value === day)?.label || day;
}

function sortedActs(day = selectedDay) {
  return state.acts
    .filter((act) => act.day === day)
    .sort((a, b) => `${a.start}-${a.stageId}-${a.artist}`.localeCompare(`${b.start}-${b.stageId}-${b.artist}`));
}

function profilePlan(profileId = sessionId) {
  if (!state.plans[profileId]) state.plans[profileId] = { acts: {}, tents: [] };
  if (!state.plans[profileId].acts) state.plans[profileId].acts = {};
  if (!state.plans[profileId].tents) state.plans[profileId].tents = [];
  if (!state.plans[profileId].drinkStats) state.plans[profileId].drinkStats = { standBeer: 0, tentBeer: 0, otherDrinks: 0 };
  if (state.plans[profileId].beerUnlockAt && state.plans[profileId].beerUnlockAt <= Date.now()) {
    delete state.plans[profileId].beerUnlockAt;
  }
  return state.plans[profileId];
}

function render() {
  const profile = currentProfile();
  if (!state.initialized || !profile) {
    app.innerHTML = renderAuth();
    bindAuth();
    return;
  }

  app.innerHTML = `
    <div class="layout">
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
          ${isAdmin() ? navButton("profiles", "users", "Profile") : ""}
          ${isAdmin() ? navButton("settings", "settings", "Daten") : ""}
        </nav>
        <div class="sidebar-footer">
          <button class="ghost-button" data-action="logout">${icon("logout")} Abmelden</button>
        </div>
      </aside>
      <main class="content">
        ${renderView()}
      </main>
    </div>
    ${modal ? renderModal() : ""}
  `;
  bindApp();
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
  if (view === "profiles" && isAdmin()) return renderProfiles();
  if (view === "settings" && isAdmin()) return renderSettings();
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
  const adminActions = isAdmin() ? `<button class="primary-button compact-action" data-modal="act">${icon("plus")} Act</button><button class="soft-button compact-action" data-modal="stage">${icon("plus")} Bühne</button>` : "";
  const acts = sortedActs();
  return `
    ${renderHeader("Timetable", "Line-up und persönliche Auswahl", `${renderDayTabs()}${adminActions}`)}
    <div class="quick-actions" aria-label="Schnellaktionen">
      <button class="${tentActive ? "danger-button" : "primary-button"} big-action" data-toggle-tent>${icon("tent")} ${tentActive ? "Zelt verlassen" : "Beim Zelt"}</button>
      <button class="soft-button big-action" data-beer-pickup ${beerLocked ? "disabled" : ""}>${icon("plus")} ${beerLocked ? "Kurz warten" : "Bier holen"}</button>
      <button class="ghost-button big-action" data-modal="drinks">${icon("check")} Getränke</button>
    </div>
    <section class="grid">
      ${acts.length ? renderStageRows(acts) : `<div class="empty">Noch keine Auftritte für ${dayLabel(selectedDay)} eingetragen.</div>`}
    </section>
  `;
}

function renderStageRows(acts) {
  const stages = state.stages.filter((stage) => acts.some((act) => act.stageId === stage.id));
  return `<div class="timeline">${stages.map((stage) => `
    <div class="stage-row">
      <div class="stage-name">${escapeHtml(stage.name)}</div>
      <div class="act-list">
        ${acts.filter((act) => act.stageId === stage.id).map(renderActCard).join("")}
      </div>
    </div>
  `).join("")}</div>`;
}

function renderActCard(act) {
  const plan = profilePlan();
  const status = plan.acts[act.id] || "";
  const visitors = state.profiles.filter((profile) => profilePlan(profile.id).acts[act.id] === "attending");
  return `
    <article class="act-card ${status}">
      <div>
        <div class="act-time">${formatTime(act.start, act.end)}</div>
        <div class="act-title">${escapeHtml(act.artist)}</div>
        ${act.note ? `<div class="muted">${escapeHtml(act.note)}</div>` : ""}
      </div>
      <div class="chip-row">
        ${visitors.slice(0, 5).map((profile) => `<span class="chip"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}
        ${visitors.length > 5 ? `<span class="chip">+${visitors.length - 5}</span>` : ""}
      </div>
      <div class="button-row">
        <button class="soft-button" data-plan-act="${act.id}" data-status="attending">${icon("check")} Dort</button>
        <button class="ghost-button" data-plan-act="${act.id}" data-status="maybe">Vielleicht</button>
        <button class="ghost-button" data-plan-act="${act.id}" data-status="">Raus</button>
        ${isAdmin() ? `<button class="icon-button" title="Bearbeiten" data-edit-act="${act.id}">${icon("edit", "Bearbeiten")}</button><button class="icon-button" title="Löschen" data-delete-act="${act.id}">${icon("trash", "Löschen")}</button>` : ""}
      </div>
    </article>
  `;
}

function renderMyPlan() {
  const plan = profilePlan();
  const pickedActs = state.acts
    .filter((act) => plan.acts[act.id])
    .sort((a, b) => `${a.day}-${a.start}`.localeCompare(`${b.day}-${b.start}`));
  const tentItems = plan.tents.sort((a, b) => `${a.day}-${a.start}`.localeCompare(`${b.day}-${b.start}`));
  const allTentItems = state.profiles
    .flatMap((profile) => profilePlan(profile.id).tents.map((item) => ({ ...item, profile })))
    .sort((a, b) => `${a.day}-${a.start}-${a.profile.name}`.localeCompare(`${b.day}-${b.start}-${b.profile.name}`));
  return `
    ${renderHeader("Mein Plan", "Auftritte und Zeltzeiten", `<button class="primary-button" data-modal="tent">${icon("tent")} Im Zelt bleiben</button>`)}
    <section class="grid two">
      <div class="panel">
        <div class="panel-header">
          <h3>Ausgewählte Auftritte</h3>
        </div>
        ${pickedActs.length ? `<div class="table-wrap"><table><thead><tr><th>Tag</th><th>Zeit</th><th>Act</th><th>Status</th></tr></thead><tbody>
          ${pickedActs.map((act) => `<tr><td>${dayLabel(act.day)}</td><td>${formatTime(act.start, act.end)}</td><td>${escapeHtml(act.artist)}</td><td>${plan.acts[act.id] === "attending" ? "Dort" : "Vielleicht"}</td></tr>`).join("")}
        </tbody></table></div>` : `<div class="empty">Noch keine Auftritte markiert.</div>`}
      </div>
      <div class="panel">
        <div class="panel-header">
          <h3>Zeltzeiten</h3>
          <button class="soft-button" data-modal="tent">${icon("plus")} Zeit</button>
        </div>
        ${tentItems.length ? `<div class="table-wrap"><table><thead><tr><th>Tag</th><th>Zeit</th><th>Notiz</th><th></th></tr></thead><tbody>
          ${tentItems.map((item) => `<tr><td>${dayLabel(item.day)}</td><td>${formatTime(item.start, item.end)}</td><td>${escapeHtml(item.note || "Im Zelt bleiben")}</td><td><button class="icon-button" title="Löschen" data-delete-tent="${item.id}">${icon("trash", "Löschen")}</button></td></tr>`).join("")}
        </tbody></table></div>` : `<div class="empty">Noch keine Zeltzeit eingetragen.</div>`}
      </div>
    </section>
    <section class="panel" style="margin-top:16px">
      <div class="panel-header">
        <h3>Zeltzeiten aller Profile</h3>
      </div>
      ${allTentItems.length ? `<div class="table-wrap"><table><thead><tr><th>Profil</th><th>Tag</th><th>Zeit</th><th>Notiz</th></tr></thead><tbody>
        ${allTentItems.map((item) => `<tr><td><span class="profile-dot" style="background:${item.profile.color}"></span>${escapeHtml(item.profile.name)}</td><td>${dayLabel(item.day)}</td><td>${formatTime(item.start, item.end)}</td><td>${escapeHtml(item.note || "Im Zelt bleiben")}</td></tr>`).join("")}
      </tbody></table></div>` : `<div class="empty">Noch keine Zeltzeiten in der Gruppe eingetragen.</div>`}
    </section>
  `;
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
              ${state.profiles.map((profile) => `<tr>
                <td><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</td>
                <td>${profile.role === "admin" ? "Admin" : "Profil"}</td>
                <td>${escapeHtml(profile.pin)}</td>
                <td>${profile.id !== sessionId ? `<button class="icon-button" title="Löschen" data-delete-profile="${profile.id}">${icon("trash", "Löschen")}</button>` : ""}</td>
              </tr>`).join("")}
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
      const attending = state.profiles.filter((profile) => profilePlan(profile.id).acts[act.id] === "attending");
      return { act, attending };
    })
    .filter((row) => row.attending.length);
  if (!rows.length) return `<div class="empty">Noch keine Zusagen eingetragen.</div>`;
  return `<div class="grid">${rows.map(({ act, attending }) => `
    <div>
      <strong>${escapeHtml(act.artist)}</strong>
      <div class="muted">${dayLabel(act.day)} · ${formatTime(act.start, act.end)}</div>
      <div class="chip-row">${attending.map((profile) => `<span class="chip active"><span class="profile-dot" style="background:${profile.color}"></span>${escapeHtml(profile.name)}</span>`).join("")}</div>
    </div>
  `).join("")}</div>`;
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
    </section>
  `;
}

function renderModal() {
  const title = modal.type === "act" ? (modal.actId ? "Act bearbeiten" : "Act eintragen")
    : modal.type === "profile" ? "Profil anlegen"
    : modal.type === "stage" ? "Bühne anlegen"
    : modal.type === "drinks" ? "Getränke zählen"
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
      </div>
    </div>
  `;
}

function renderActForm() {
  const act = state.acts.find((item) => item.id === modal.actId) || { day: selectedDay, start: "", end: "", artist: "", stageId: state.stages[0]?.id || "", note: "" };
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
        color: COLORS[0]
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
      const profile = state.profiles.find((item) => item.id === data.get("profileId"));
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

  app.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      modal = { type: button.dataset.modal };
      render();
    });
  });

  app.querySelectorAll("[data-edit-act]").forEach((button) => {
    button.addEventListener("click", () => {
      modal = { type: "act", actId: button.dataset.editAct };
      render();
    });
  });

  app.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target.closest("[data-modal-card]") && !event.target.matches("[data-close-modal]")) return;
      modal = null;
      render();
    });
  });

  const modalCard = app.querySelector("[data-modal-card]");
  if (modalCard) modalCard.addEventListener("click", (event) => event.stopPropagation());

  app.querySelector('[data-action="logout"]')?.addEventListener("click", () => {
    sessionId = "";
    localStorage.removeItem("festival-session-id");
    render();
  });

  bindForms();
  bindMutations();
  bindImportExport();
}

function bindForms() {
  app.querySelector('[data-form="act"]')?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const act = {
      id: modal.actId || id(),
      artist: data.get("artist").trim(),
      stageId: data.get("stageId"),
      day: data.get("day"),
      start: data.get("start"),
      end: data.get("end"),
      note: data.get("note").trim()
    };
    if (modal.actId) {
      state.acts = state.acts.map((item) => item.id === modal.actId ? act : item);
    } else {
      state.acts.push(act);
    }
    selectedDay = act.day;
    modal = null;
    saveState();
    render();
  });

  app.querySelector('[data-form="profile"]')?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.profiles.push({
      id: id(),
      name: data.get("name").trim(),
      pin: data.get("pin"),
      role: data.get("role"),
      color: COLORS[state.profiles.length % COLORS.length]
    });
    modal = null;
    saveState();
    render();
  });

  app.querySelector('[data-form="stage"]')?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.stages.push({ id: id(), name: data.get("name").trim() });
    modal = null;
    saveState();
    render();
  });

  app.querySelector('[data-form="tent"]')?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    profilePlan().tents.push({
      id: id(),
      day: data.get("day"),
      start: data.get("start"),
      end: data.get("end"),
      note: data.get("note").trim()
    });
    modal = null;
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
        active: true
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
      active: false
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
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-act]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!confirm("Diesen Act löschen?")) return;
      state.acts = state.acts.filter((act) => act.id !== button.dataset.deleteAct);
      Object.values(state.plans).forEach((plan) => delete plan.acts?.[button.dataset.deleteAct]);
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-delete-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!confirm("Dieses Profil löschen?")) return;
      state.profiles = state.profiles.filter((profile) => profile.id !== button.dataset.deleteProfile);
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
      plan.tents = plan.tents.filter((item) => item.id !== button.dataset.deleteTent);
      saveState();
      render();
    });
  });
}

function bindImportExport() {
  app.querySelector("[data-load-official]")?.addEventListener("click", () => {
    const added = importOfficialTimetable(state);
    saveState();
    showToast(added ? `${added} offizielle Acts eingetragen.` : "Timetable war schon vollständig.");
    render();
  });

  app.querySelector("[data-export]")?.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
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

  app.querySelector("[data-import-file]")?.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const nextState = JSON.parse(await file.text());
      if (!Array.isArray(nextState.profiles) || !Array.isArray(nextState.stages)) throw new Error("Invalid backup");
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
