# Neurologia V · Hub nauki (`neurologia-hub`)

Statyczna aplikacja edukacyjna PWA przygotowana jako makieta dla V roku kierunku lekarskiego Pomorskiego Uniwersytetu Medycznego w Szczecinie (PUM), oparta na oficjalnym sylabusie **Kliniki Neurologii PUM (2026/2027)** (6 ECTS, 85 h: wykłady 5 h, seminaria 20 h, ćwiczenia 60 h, egzamin końcowy testowy ET) oraz wskazówkach egzaminacyjnych.

## Zakres makiety

- **16 modułów tematycznych** pogrupowanych w **4 obszary kliniczne** (A–D)
- **10 interaktywnych atlasów modułowych** w `atlasy/` ze schematami SVG, tabelami porównawczymi, zestawieniem „Pod zaliczenie vs Aktualnie klinicznie”, pułapkami egzaminacyjnymi i zadaniami MCQ synchronizowanymi z Hubem
- **Moduły kliniczne:**
  - Wirtualny Pacjent (SOR) — 6 wieloetapowych scenariuszy (udar MCA, stan padaczkowy, przełom miasteniczny, SAH, GBS, ZOMR)
  - Symulator egzaminu praktycznego OSCE — 4 stacje z interaktywną sylwetką neurologiczną (przód/tył)
  - Skale & Dawki — NIHSS (0–42), GCS (3–15), kalkulator alteplazy (`0.9 mg/kg`, max 90 mg) i tenekteplazy (`0.25 mg/kg`, max 25 mg), protokół SE, CHA₂DS₂-VA, ABCD², mRS, Hunt-Hess oraz generator e-Recept
  - Diagnostyka & Topodiagnostyka — kalkulator PMR, trenażer TK/MR z hotspotami, wzorce EEG/EMG oraz trenażer lokalizacji ogniska uszkodzenia
  - Badanie neurologiczne (U02) — interaktywna checklista badania dorosłego, katalog nerwów czaszkowych I–XII oraz harmonogram zajęć i literatura sylabusa PUM
- **Graf wiedzy, Mapa połączeń, Notatnik Markdown, Trening i Egzamin próbny (ET)**

## Uruchomienie i testy lokalne

```bash
node --test tests/hub.test.mjs
python3 -m http.server 8080
```

## Zastrzeżenie

Makieta edukacyjna — przed podjęciem decyzji klinicznych lub podaniem leków należy zweryfikować dawkowanie i wskazania w ChPL oraz aktualnych wytycznych (ESO, AHA/ASA, EAN, ILAE, PTN).
