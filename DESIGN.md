---
name: Neurologia V · Hub nauki
description: Wspólny system projektowy Hubu i 10 interaktywnych atlasów neurologicznych dla trybu jasnego (ciepły papier kliniczny) i ciemnego (Obsidian Carbon).
colors:
  ink: "#13232C"
  ink-2: "#44545D"
  muted: "#596870"
  line: "#DCE2E0"
  surface-2: "#EEF2F0"
  teal-clinical: "#0C7A85"
  teal-deep: "#075760"
  teal-soft: "#DDF1F2"
  teal-dark: "#0F828E"
  teal-glow-dark: "#4FD1DD"
  slate-indigo: "#245B7A"
  slate-indigo-soft: "#E1EFF5"
  slate-indigo-border: "#BFD8E4"
  slate-indigo-dark: "#4FA3CC"
  emergency-red: "#B93424"
  emergency-red-soft: "#FBE6E2"
  emergency-red-border: "#F0C4BC"
  emergency-red-dark: "#E55B4B"
  exam-amber: "#9A5F09"
  exam-amber-soft: "#FCEFD6"
  exam-amber-dark: "#E59A24"
  diagnostic-blue: "#2B63AE"
  diagnostic-blue-soft: "#E1ECF9"
  diagnostic-blue-border: "#BFD4EE"
  diagnostic-blue-dark: "#4E8FE6"
  verified-green: "#2F8450"
  verified-green-soft: "#E1F3E7"
  verified-green-border: "#BFE2CB"
  verified-green-dark: "#3BB36E"
  paper-bg: "#F5F6F2"
  surface-white: "#FFFFFF"
  obsidian-bg: "#090C0E"
  obsidian-surface: "#11161A"
---

# Design System: Neurologia V · Hub nauki

System wizualny łączy powłokę Hubu (`css/hub.css`) oraz 10 modułowych atlasów neurologicznych (`atlasy/atlas-base.css`, `atlasy/atlas-mobile.css`, `atlasy/atlas-shared.js`) w jednym układzie **Klinicznego atlasu kieszonkowego**.

## Gramatyka semantyczna w neurologii

- **Obszar A (`--red`):** Stany nagłe, udar mózgu, zaburzenia przytomności, padaczka i stan padaczkowy, wzmożone ciśnienie śródczaszkowe (ICP).
- **Obszar B (`--amber`):** Badanie neurologiczne (U02), neurofizjologia, nerwy czaszkowe I–XII, zaburzenia mowy, bóle głowy i kręgosłupa, pułapki „Pod zaliczenie”.
- **Obszar C (`--blue`):** Choroby autoimmunologiczne OUN (SM, NMOSD), obwodowy układ nerwowy (GBS, polineuropatie), złącze nerwowo-mięśniowe (miastenia) i zespoły internistyczne.
- **Obszar D (`--violet` / Slate Indigo `#245B7A`):** Guzy OUN, choroby zwyrodnieniowe (Parkinson, SLA), otępienia i diagnostyka dodatkowa (PMR, TK/MR, EEG/EMG).
- **Zieleń (`--green`):** Prawidłowy stan neurologiczny, potwierdzone odpowiedzi, „Aktualnie klinicznie (wytyczne)”.

## Typografia i ergonomia

- **Display:** `Cabinet Grotesk` (`700`, `800`).
- **Body:** `Satoshi` (`400`, `500`, `700`).
- **Tabular / Mono:** wartości dawek (`0.9 mg/kg`, `0.25 mg/kg`), skale NIHSS/GCS/CHA₂DS₂-VA, parametry PMR oraz identyfikatory zadań.
- **Dostępność:** tryb jasny + tryb ciemny (`Obsidian Carbon`) + 6 rozszerzonych palet ciemnych (`navy`, `moss`, `espresso`, `ochre`, `purple`, `ocean`), obsługa `prefers-reduced-motion: reduce`, cele dotykowe `>= 44px` poniżej `720px`.
