# Festival Time Table

Eine statische Web-App fuer die Rock-im-Park-Planung.

## Funktionen

- Admin-Profil beim ersten Start anlegen
- Weitere Profile mit PIN erstellen
- Offizieller Rock-im-Park-2026-Timetable ist vorbefuellt
- Buehnen und Auftritte eintragen, bearbeiten und loeschen
- Pro Profil markieren: `Dort`, `Vielleicht` oder wieder entfernen
- Eigene Zeltzeiten eintragen
- Admin-Uebersicht, wer zu welchem Act will
- Backup per JSON exportieren und importieren

## GitHub Pages

Die App braucht keinen Build-Schritt. Lege die Dateien in ein GitHub-Repository und aktiviere unter `Settings -> Pages` die Auslieferung des Branches mit dem Projektordner.

Wichtig: Ohne Sync werden Profile und Plaene im Browser gespeichert (`localStorage`). Fuer gemeinsame persistente Daten ueber GitHub Pages kann die App mit Supabase verbunden werden.

## Persistenz mit GitHub Pages und Supabase

GitHub Pages kann keine Serverprozesse ausfuehren. Fuer persistente Daten bei GitHub-Hosting ist Supabase eine gute einfache Alternative.

1. Supabase-Projekt erstellen.
2. In Supabase den SQL Editor oeffnen.
3. Inhalt von `supabase-schema.sql` ausfuehren.
4. In GitHub Pages die statische App hosten.
5. In der App als Admin unter `Daten -> Backend Sync` eintragen:
   - Supabase URL: `https://dein-projekt.supabase.co`
   - Publishable oder anon Key aus den Supabase API Settings

Danach speichert die App den gemeinsamen Stand in Supabase statt nur im Browser.

Alternativ kannst du Supabase direkt im Code vorbelegen. Oeffne `app.js` und trage oben diese Werte ein:

```js
const SUPABASE_URL = "https://dein-projekt.supabase.co";
const SUPABASE_PUBLIC_KEY = "dein_publishable_oder_anon_key";
```

Nur den Publishable oder anon public Key verwenden. Niemals den `service_role`, `secret` oder Datenbank-Passwort in den Frontend-Code schreiben.

Hinweis: Diese Variante nutzt bewusst einen oeffentlich beschreibbaren Datensatz fuer eine kleine private Festival-Gruppe. Fuer ernsthafte Accounts mit echter Sicherheit sollte Supabase Auth mit Row Level Security pro Nutzer ergaenzt werden.

## Lokales Backend mit Persistenz

Dieses Projekt enthaelt ein kleines Node-Backend ohne externe Abhaengigkeiten. Es liefert die Web-App aus und speichert den gemeinsamen App-Stand in `data/app-state.json`.

Start:

```bash
npm start
```

Danach ist die App unter `http://localhost:3000` erreichbar. Wenn du die App ueber diesen Server nutzt, verbindet sie sich automatisch mit `/api/state`.

Wenn du das Frontend weiter ueber GitHub Pages hostest und das Backend separat deployest, trage in der App als Admin unter `Daten -> Backend Sync` die Backend-URL ein, zum Beispiel `https://dein-backend.example.com`.

Hinweis: Dieses Mini-Backend ist fuer lokale Tests oder einen eigenen Server gedacht. Es laeuft nicht auf GitHub Pages.

todo:
x es soll automatisch der jeweilige tag für den "beim Zelt" button ausgewählt werden allgemein soll das ganze etwas mehr ausgreift werden
