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

Wichtig: GitHub Pages ist statisches Hosting. Die Profile und Plaene werden im Browser gespeichert (`localStorage`). Fuer echte gemeinsame Accounts, Live-Sync oder sichere Logins braucht die App spaeter ein Backend, zum Beispiel Supabase oder Firebase.
