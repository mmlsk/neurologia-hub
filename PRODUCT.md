# Product

## Platform

web (statyczna aplikacja PWA bez backendu, hostowana na GitHub Pages)

## Users

- **Docelowi użytkownicy:** studenci V roku kierunku lekarskiego Pomorskiego Uniwersytetu Medycznego w Szczecinie (PUM) przygotowujący się do ćwiczeń klinicznych, seminariów oraz testowego egzaminu końcowego (ET) z przedmiotu **Neurologia** (6 ECTS, 85 h: 5 h wykładów, 20 h seminariów, 60 h ćwiczeń) na komputerze, iPadzie i iPhonie — również w trybie offline (PWA).
- **Zadanie użytkownika:** szybkie opanowanie techniki badania neurologicznego (efekt U02), interpretacja odchyleń topodiagnostycznych, przećwiczenie puli zadań egzaminacyjnych oraz porównanie klasycznych sformułowań z aktualnymi wytycznymi klinicznymi.

## Product Purpose

**Neurologia V · Hub nauki** (makieta projektu `neurologia-hub`) łączy 10 interaktywnych atlasów modułowych pokrywających 16 modułów sylabusa Kliniki Neurologii PUM 2026/2027 z bazą pytań modułowych i egzaminacyjnych, trybem treningu, symulatorem egzaminu testowego (ET), modułami klinicznymi (przypadki SOR, stacje OSCE, kalkulatory skal i trombolizy, diagnostyka PMR/TK/MR/EEG/EMG/topodiagnostyka, interaktywny protokół badania U02), grafem wiedzy oraz notatnikiem Markdown w jednej aplikacji webowej działającej offline.

## Positioning

- **Zgodność z sylabusem Kliniki Neurologii PUM 2026/2027:** pełne pokrycie efektów uczenia się (W01–W03, U01–U14, K01–K04), treści programowych (Wykłady TK01–TK05, Seminaria TK01–TK11, Ćwiczenia TK01–TK12), literatury podstawowej i uzupełniającej oraz 10 priorytetowych wskazówek egzaminacyjnych.
- **Podwójna prawda kliniczno-egzaminacyjna:** jawne rozdzielenie odpowiedzi „Pod zaliczenie” od „Aktualnie klinicznie (wytyczne ESO/AHA/EAN/ILAE/MDS)” tam, gdzie klasyczne pytania testowe odbiegają od współczesnych standardów.
- **Status makiety (uczciwość danych):** baza pytań startowych w tej makiecie składa się z pytań dydaktycznych i rekonstruowanych przykładów opracowanych na podstawie sylabusa i wskazówek egzaminacyjnych — bez zmyślonych roczników ani statystyk klinicznych.

## Capabilities and Constraints

- **Architektura bez backendu:** statyczny HTML/CSS/vanilla JS (`index.html`, `js/meta.js`, `js/logic.js`, `js/questions.js`, `js/questions_zaklad.js`, `js/clinical-*.js`, `js/app.js`, `atlasy/*`, `sw.js`).
- **Trwałość w `localStorage`:** osobna przestrzeń kluczy `neurologia_hub_*` dla postępu pytań, zakładek, checklisty badania U02, kalkulatora, notatek i pytań własnych.
- **Sprawdzenia automatyczne:** testy jednostkowe i testy integralności projektu w `tests/hub.test.mjs` (`node --test`).

## Brand Commitments

- **Nazwa:** `Neurologia V · Hub nauki` (`Neurologia V – hub`)
- **Zastrzeżenie edukacyjne:** materiał ma charakter wyłącznie dydaktyczny — decyzje kliniczne i dawkowanie leków (m.in. alteplaza, tenekteplaza, leki przeciwpadaczkowe, immunoterapia) należy weryfikować w ChPL oraz aktualnych wytycznych towarzystw naukowych.

## Product Principles

1. **Chroń podwójną prawdę:** rozdzielaj klasyczne ujęcie egzaminacyjne od aktualnych wytycznych bez zacierania różnic.
2. **Zero utraty postępu:** synchronizuj odpowiedzi między atlasami i Hubem przez `neurologia_hub_state_v1`.
3. **Ergonomia nauki jedną ręką:** cele dotykowe ≥ 44 px, dolna nawigacja mobilna poniżej 720 px, tryb jasny i 7 palet ciemnych.
4. **Gotowość offline:** pełny precache zasobów przez Service Worker (`sw.js`).
5. **Uczciwość merytoryczna:** brak fabrykowanych metryk i źródeł historycznych.
