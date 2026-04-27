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

todo:
x es soll automatisch der jeweilige tag für den "beim Zelt" button ausgewählt werden allgemein soll das ganze etwas mehr ausgreift werden
x jeder user soll eine farbe haben die er selber bei "mein Plan" einstellen kann (farben sind einmalig vergebbar, also es ist nicht möglich eine farbe unter den usern zweimal zu vergeben) und dann soll un der timeline ein dicker farblicher strich stehen für die aswahl "dort" markiert sein, ein gestrichelter strich für die auswahl "vielleicht" und für die auswahl "raus" keine markierung
