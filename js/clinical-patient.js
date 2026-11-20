/* Neurologia V – moduł kliniczny: Wirtualny Pacjent (SOR / Izba Przyjęć) */
(function () {
  'use strict';
  window.HUB_CLINICAL = window.HUB_CLINICAL || {};
  window.HUB_CLINICAL.patient = function (ctx) {
    const { OSCE_STATIONS } = window.HUB_META || {};
    const { $, $$, main, esc, pct, toast, save, getNotes, saveNotes } = ctx;

    const EMERGENCY_DRUG_CARDS = {
      'udar-mca': {
        weight: 78,
        drugs: [
          { name: 'Alteplaza (rtPA, Actilyse)', dosePerKg: '0.9 mg/kg i.v. (maks. 90 mg)', calcDose: '70.2 mg: 7.0 mg bolus i.v. (1 min) + 63.2 mg wlew 60 min', route: '10% bolus i.v. + 90% pompa infuzyjna', indication: 'Okno <= 4.5 h po wykluczeniu krwotoku w TK i przy RR < 185/110 mmHg.', badge: 'Lek 1. rzutu' },
          { name: 'Tenekteplaza (TNK)', dosePerKg: '0.25 mg/kg i.v. (maks. 25 mg)', calcDose: '19.5 mg pojedynczy bolus i.v. w 5–10 s', route: 'Bolus i.v.', indication: 'Alternatywa wg ESO przed trombektomią mechaniczną (LVO).', badge: 'Alternatywa ESO' },
          { name: 'Labetalol / Urapidyl (kontrola RR przed rtPA)', dosePerKg: 'Labetalol 10–20 mg i.v. w 1–2 min', calcDose: '10–20 mg i.v. (cel: RR < 185/110 mmHg przed wlewem)', route: 'Powolny bolus i.v.', indication: 'Obniżenie RR przed włączeniem rtPA; przez 24 h po rtPA cel < 180/105 mmHg.', badge: 'Kontrola RR' },
          { name: 'Trombektomia mechaniczna (MT)', dosePerKg: 'Kwalifikacja LVO w angio-TK (ICA / M1)', calcDose: 'Okno <= 6 h (z obrazowaniem perfuzyjnym do 24 h)', route: 'Zabieg wewnątrznaczyniowy', indication: 'Kierować natychmiast równolegle do rtPA — bez czekania na efekt trombolizy.', badge: 'Interwencja LVO' }
        ],
        redFlags: [
          'Przeciwwskazania do rtPA: krwotok w TK, duży zabieg/uraz < 14 dni, INR > 1.7, NOAC < 48 h (bez odwrócenia/badań), PLT < 100 tys./µl.',
          'ZAKAZ ASA, klopidogrelu i heparyny przez 24 h po trombolizie (ryzyko ukrwotocznienia sICH).',
          'Bez kwalifikacji do rtPA nie obniżaj gwałtownie RR poniżej 220/120 mmHg (ochrona perfuzji penumbry).'
        ]
      },
      'stan-padaczkowy': {
        weight: 64,
        drugs: [
          { name: 'Lorazepam / Diazepam (I rzut — 0–10 min)', dosePerKg: 'Lorazepam 0.1 mg/kg (4 mg) lub Diazepam 10 mg i.v.', calcDose: 'Lorazepam 4 mg i.v. (lub Midazolam 10 mg i.m. bez i.v.)', route: 'Bolus i.v. (lub i.m.)', indication: 'Przerwanie napadu > 5 min; w razie utrzymywania drgawek powtórz pełną dawkę po 5 min.', badge: 'I rzut (BZD)' },
          { name: 'Lewetiracetam (II rzut — 15–30 min)', dosePerKg: '60 mg/kg i.v. (maks. 4500 mg)', calcDose: '3840 mg (3.8 g) wlew i.v. w 10–15 min', route: 'Wlew i.v. w 100 ml 0.9% NaCl', indication: 'Lek II rzutu o wysokiej skuteczności (ESETT), minimalnych interakcjach i bez hipotensji.', badge: 'II rzut (ESETT)' },
          { name: 'Walproinian sodu (alternatywa II rzutu)', dosePerKg: '40 mg/kg i.v. (maks. 3000 mg)', calcDose: '2560 mg i.v. w 10 min (u kobiet w wieku rozrodczym preferuj LEV)', route: 'Wlew i.v.', indication: 'Alternatywa II rzutu; u kobiet w wieku rozrodczym unikaj ze względu na teratogenność.', badge: 'Alternatywa II rz.' },
          { name: 'Tiamina (wit. B1) + Glukoza', dosePerKg: 'Tiamina 100 mg i.v. PRZED glukozą', calcDose: '100 mg tiaminy i.v. + 40–50 ml 40% glukozy przy glikemii < 70 mg/dl', route: 'i.v.', indication: 'Wyrównanie hipoglikemii i profilaktyka encefalopatii Wernickego.', badge: 'Metaboliczny' }
        ],
        redFlags: [
          'Glikemię przyłóżkową zmierz w 1. minucie — hipoglikemia imituje stan padaczkowy oporny na BZD.',
          'Subterapeutyczna dawka początkowa BZD (np. 2 mg diazepamu) sprzyja rozwojowi opornego SE (RSE).',
          'Brak powrotu przytomności po ustąpieniu drgawek wymaga EEG (wykluczenie niedrgawkowego SE — NCSE).'
        ]
      },
      'przelom-miasteniczny': {
        weight: 62,
        drugs: [
          { name: 'Immunoglobuliny dożylne (IVIG)', dosePerKg: '0.4 g/kg/d przez 5 dni (łącznie 2 g/kg)', calcDose: '24.8 g/d i.v. przez 5 dni (łącznie 124 g)', route: 'Powolny wlew i.v.', indication: 'Immunoterapia I wyboru w przełomie miastenicznym (równorzędna z PLEX).', badge: 'Immunoterapia' },
          { name: 'Plazmafereza lecznicza (PLEX)', dosePerKg: '5 wymian osocza co 2. dzień (1–1.5 V osocza)', calcDose: '5 zabiegów co 48 h (szybszy efekt u chorej zaintubowanej)', route: 'Cewnik centralny dwuświatłowy', indication: 'Preferowana w ciężkiej niewydolności oddechowej wymagającej szybkiej poprawy.', badge: 'PLEX / OIT' },
          { name: 'Zabezpieczenie dróg oddechowych (RSI)', dosePerKg: 'Intubacja przy FVC < 15–20 ml/kg (reguła 20/30/40)', calcDose: 'Propofol/etomidat + zredukowane rokuronium (BEZ sukcynylocholiny!)', route: 'Intubacja dotchawicza', indication: 'SpO2 spada późno — o intubacji decyduje FVC < 20 ml/kg, PImax > -30 cmH2O lub hiperkapnia.', badge: 'Alarm oddechowy' },
          { name: 'Czasowe wstrzymanie inhibitora AChE', dosePerKg: 'Wstrzymać pirydostygminę po intubacji', calcDose: 'Odstawić na czas wentylacji mechanicznej na OIT', route: 'Czasowa przerwa w terapii', indication: 'Ogranicza ślinotok oskrzelowy i eliminuje nakładanie się przełomu cholinergicznego.', badge: 'Zasada OIT' }
        ],
        redFlags: [
          'LEKI ZAKAZANE W MIASTENII: aminoglikozydy (gentamycyna), fluorochinolony (cyprofloksacyna), makrolidy, polimyksyny, MgSO4, beta-blokery, blokery kanału Ca, sukcynylocholina.',
          'Nie czekaj na spadek SpO2 — monitoruj przyłóżkowo FVC i test liczenia na jednym wdechu.',
          'Unikaj nagłych dużych dawek steroidów bez osłony IVIG/PLEX (ryzyko zaostrzenia w 1. tygodniu).'
        ]
      },
      sah: {
        weight: 80,
        drugs: [
          { name: 'Nimodypina (Nimotop)', dosePerKg: '60 mg p.o. / zgłębnik co 4 h przez 21 dni', calcDose: '60 mg co 4 h (360 mg/d; przy spadkach RR 30 mg co 2 h)', route: 'p.o. lub zgłębnik żołądkowy', indication: 'Jedyny lek zmniejszający wtórne niedokrwienie (DCI) i poprawiający rokowanie w SAH (klasa I).', badge: 'Profilaktyka DCI' },
          { name: 'Labetalol / Nikardypina (przed zabezpieczeniem tętniaka)', dosePerKg: 'Cel SBP < 160 mmHg przed klipsowaniem/coilingiem', calcDose: 'Labetalol 10–20 mg i.v. lub wlew nikardypiny 5 mg/h', route: 'i.v. pod stałym nadzorem RR', indication: 'Zmniejsza ryzyko ponownego pęknięcia (rebleeding) niezabezpieczonego tętniaka.', badge: 'Pre-klipsing RR' },
          { name: 'Zabezpieczenie tętniaka (Coiling / Klipsowanie)', dosePerKg: 'Pilnie < 24 h od zachorowania', calcDose: 'Angio-TK / DSA + pilny zespół neuroradiologii / neurochirurgii', route: 'Zabieg endowaskularny / operacyjny', indication: 'Największe ryzyko ponownego śmiertelnego krwotoku przypada na pierwsze 24 h.', badge: 'Priorytet < 24 h' }
        ],
        redFlags: [
          'Ujemne TK głowy > 6 h od początku piorunującego bólu NIE wyklucza SAH — obowiązkowa punkcja lędźwiowa (ksantochromia po > 6–12 h)!',
          'ZAKAZ ASA, antykoagulantów i NLPZ przed zabezpieczeniem tętniaka.',
          'Utrzymuj euwolemię i normonatremię — unikaj rutynowej hiperwolemii (dawnej „terapii 3H”).'
        ]
      },
      gbs: {
        weight: 82,
        drugs: [
          { name: 'Immunoglobuliny dożylne (IVIG)', dosePerKg: '0.4 g/kg/d przez 5 dni (łącznie 2 g/kg)', calcDose: '32.8 g/d i.v. przez 5 dni (łącznie 164 g)', route: 'Wlew i.v.', indication: 'Leczenie I wyboru w GBS; największa skuteczność w pierwszych 2 tygodniach.', badge: 'Lek 1. rzutu' },
          { name: 'Plazmafereza (PLEX)', dosePerKg: '4–5 wymian osocza w ciągu 7–14 dni', calcDose: 'Łącznie 200–250 ml/kg osocza (alternatywa I rzutu)', route: 'Cewnik centralny', indication: 'Równoważna z IVIG (nie łącz obu metod rutynowo sekwencyjnie).', badge: 'Alternatywa I rz.' },
          { name: 'Profilaktyka ZŻG + monitorowanie FVC', dosePerKg: 'Enoksaparyna 40 mg s.c. 1x/d + FVC co 4–6 h', calcDose: '40 mg s.c./d; kwalifikacja do OIT przy FVC < 20 ml/kg', route: 's.c. + spirometria przyłóżkowa', indication: 'Zapobiega zatorowości płucnej i wczesnej dekompensacji oddechowej.', badge: 'Bezpieczeństwo' }
        ],
        redFlags: [
          'KRYTYCZNY BŁĄD: Glikokortykosteroidy (metyloprednizolon, prednizon) są NIESKUTECZNE w GBS — nie wolno ich podawać!',
          'Dysautonomia w GBS grozi nagłą bradykardią, asystolią i wahaniami RR — konieczne kardiomonitorowanie.',
          'Prawidłowe białko PMR w pierwszych dobach nie wyklucza GBS (rozszczepienie białkowo-komórkowe narasta po 3–7 dniach).'
        ]
      },
      zomr: {
        weight: 75,
        drugs: [
          { name: 'Deksametazon', dosePerKg: '10 mg i.v. co 6 h przez 4 dni', calcDose: '10 mg i.v. bezpośrednio przed lub z I dawką antybiotyku', route: 'Bolus i.v.', indication: 'Zmniejsza śmiertelność i powikłania w pneumokokowym ZOMR.', badge: 'Priorytet 0 min' },
          { name: 'Ceftriakson + Wankomycyna (empirycznie)', dosePerKg: 'Ceftriakson 2 g co 12 h + Wankomycyna 15–20 mg/kg co 8–12 h', calcDose: 'Ceftriakson 2 g + Wankomycyna 1.25 g i.v. < 60 min (+ Ampicylina 2 g co 4 h >50 r.ż.)', route: 'i.v.', indication: 'Pokrywa N. meningitidis i oporne szczepy S. pneumoniae.', badge: 'Empiryczny I rzut' },
          { name: 'Acyklowir (gdy podejrzenie HSV zapalenia mózgu)', dosePerKg: '10 mg/kg i.v. co 8 h', calcDose: '750 mg i.v. co 8 h (wlew 1 h z nawodnieniem)', route: 'Wlew i.v.', indication: 'Dołączyć przy zaburzeniach świadomości, napadach ogniskowych lub zmianach skroniowych w MRI.', badge: 'Gdy zajęcie mózgu' }
        ],
        redFlags: [
          'NIGDY nie opóźniaj podania deksametazonu i antybiotyku oczekiwaniem na TK głowy czy wynik LP (< 60 min)!',
          'TK przed LP obowiązkowe przy: deficycie ogniskowym, tarczy zastoinowej, napadzie de novo, GCS < 10–12 lub immunosupresji.',
          'Zakażenie N. meningitidis wymaga zgłoszenia do Sanepidu i profilaktyki kontaktów (cyprofloksacyna 500 mg p.o. lub ryfampicyna).'
        ]
      }
    };

    const PATIENT_CASES = [
      {
        id: 'udar-mca', domain: 'cns', category: 'Obszar A / Udar niedokrwienny (LVO)',
        shortTitle: 'Udar niedokrwienny MCA (rtPA + MT)',
        title: 'Ostry niedowład prawych kończyn i afazja u 68-latka (90 min od początku)',
        age: '68 lat', weight: 78, gender: 'Mężczyzna',
        chiefComplaint: 'Nagła niemożność mówienia i osłabienie prawej ręki oraz nogi od 90 minut.',
        intro: '68-letni mężczyzna przywieziony przez ZRM (LKW = 90 min temu). Przytomny, z afazją mieszaną, zwrotem gałek ocznych w lewo i prawostronnym niedowładem połowiczym (NIHSS 14 pkt). Nie przyjmuje antykoagulantów.',
        vitalsInitial: { hr: 88, spo2: 96, rr: 16, bp: '192/106', temp: 36.7, gcs: 13, gluc: 118, extraLab: 'NIHSS', extraVal: '14 pkt', extraStatus: 'danger' },
        stages: [
          {
            name: 'Etap 1: Triage, LKW i obrazowanie',
            prompt: 'Pacjent w 90. minucie zachorowania na SOR. Jakie działania wykonujesz w pierwszych 10 minutach?',
            options: [
              { id: 'mca_time_gluc', text: 'Potwierdzenie godziny zachorowania (LKW = 90 min), glikemia przyłóżkowa, 2 wkłucia i.v. i krew (INR, APTT, PLT)', type: 'key', points: 20, why: 'Okno czasowe (< 4.5 h), wykluczenie hipoglikemii i koagulogram są kluczowe przed trombolizą.' },
              { id: 'mca_ct_cta', text: 'Natychmiastowe TK głowy bez kontrastu + angio-TK tętnic domózgowych i mózgowych', type: 'key', points: 25, why: 'TK wyklucza krwotok śródmózgowy, a angio-TK wykrywa niedrożność dużego naczynia (LVO).' },
              { id: 'mca_ekg', text: 'Rejestracja EKG i podłączenie kardiomonitora (poszukiwanie AF)', type: 'neutral', points: 0, why: 'Ważne w diagnostyce zatorowości sercowej, nie może opóźniać transportu na TK.' },
              { id: 'mca_asa_nif', text: 'Podanie ASA 300 mg p.o. oraz nifedypiny s.l. przed TK głowy w celu obniżenia RR', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD! ASA przed wykluczeniem krwotoku nasila krwawienie, a nifedypina upośledza perfuzję penumbry.' }
            ],
            vitalsDelta: { hr: -4, spo2: 1 }
          },
          {
            name: 'Etap 2: Kwalifikacja do rtPA',
            prompt: 'TK bez krwotoku, angio-TK: okluzja M1 lewej MCA. INR 1.0, PLT 210 tys./µl, glikemia 118 mg/dl, RR 192/106 mmHg. Co zlecasz?',
            options: [
              { id: 'mca_bp_ctrl', text: 'Ostrożne obniżenie RR < 185/110 mmHg (labetalol 10–20 mg i.v. lub urapidyl i.v.)', type: 'key', points: 20, why: 'Warunek bezpiecznego wdrożenia rtPA (próg kwalifikacji < 185/110 mmHg).' },
              { id: 'mca_rtpa', text: 'Wdrożenie trombolizy alteplazą 0.9 mg/kg i.v. (10% bolus, 90% wlew 60 min) po obniżeniu RR', type: 'key', points: 25, why: 'Okno <= 4.5 h bez przeciwwskazań po korekcie ciśnienia tętniczego.' },
              { id: 'mca_aspects', text: 'Ocena wczesnych zmian niedokrwiennych w skali ASPECTS', type: 'neutral', points: 0, why: 'Standaryzuje ocenę rozległości ogniska w obszarze MCA.' },
              { id: 'mca_heparin', text: 'Wlew heparyny i odroczenie rtPA na godzinę w oczekiwaniu na samoistną poprawę', type: 'harmful', points: -25, why: 'BŁĄD SZTUKI! Opóźnianie reperfuzji niszczy penumbrę („czas to mózg”), a heparyna grozi krwotokiem.' }
            ],
            vitalsDelta: { bp: '168/92', extraVal: '11 pkt', extraStatus: 'warn' }
          },
          {
            name: 'Etap 3: Trombektomia i opieka poudarowa',
            prompt: 'Wlew alteplazy trwa; angio-TK potwierdziło okluzję M1 lewej MCA. Jakie są dalsze decyzje?',
            options: [
              { id: 'mca_mt', text: 'Natychmiastowe przekazanie na trombektomię mechaniczną (MT) bez czekania na efekt rtPA', type: 'key', points: 25, why: 'W okluzji LVO (ICA/M1) leczenie pomostowe rtPA + MT daje największą szansę rekanalizacji.' },
              { id: 'mca_post_care', text: 'Utrzymanie RR < 180/105 mmHg przez 24 h oraz wstrzymanie leków p/płytkowych i antykoagulantów do kontrolnego TK po 24 h', type: 'key', points: 15, why: 'Chroni przed wtórnym krwotokiem śródmózgowym (sICH) po leczeniu reperfuzyjnym.' },
              { id: 'mca_asa_after', text: 'Dodanie ASA 300 mg i enoksaparyny bezpośrednio po wlewie alteplazy', type: 'harmful', points: -25, why: 'PRZECIWWSKAZANE! Przez 24 h po rtPA obowiązuje zakaz leków p/płytkowych i p/krzepliwych.' },
              { id: 'mca_lipids', text: 'Oznaczenie lipidogramu i HbA1c w ramach profilaktyki wtórnej na oddziale udarowym', type: 'neutral', points: 0, why: 'Rutynowa ocena czynników ryzyka naczyniowego po zabezpieczeniu reperfuzji.' }
            ],
            vitalsDelta: { hr: -8, bp: '152/84', gcs: 2, extraVal: '5 pkt', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Ostry udar niedokrwienny w obszarze lewej tętnicy środkowej mózgu (okluzja M1 MCA)', code: 'I63.5',
          etiology: 'Zatorowość lub zakrzepica proksymalnego pnia MCA (LVO)',
          keyRules: [
            'Przed rtPA zawsze sprawdź czas LKW, glikemię i wyklucz krwotok w TK głowy bez kontrastu.',
            'Próg RR do rtPA: < 185/110 mmHg przed wlewem i < 180/105 mmHg przez 24 h po terapii.',
            'Okno czasowe: tromboliza i.v. <= 4.5 h (wybrane sytuacje z perfuzją do 9 h), trombektomia mechaniczna <= 6 h (perfuzja do 24 h).',
            'W okluzji LVO kieruj na MT równolegle do rtPA; zakaz ASA/heparyny przez 24 h do kontrolnego TK.'
          ],
          pearls: 'Zamknięcie M1 MCA daje kontralateralny niedowład połowiczy (twarz i ręka silniej niż noga), niedoczulicę, niedowidzenie jednoimienne i afazję w półkuli dominującej.'
        }
      },
      {
        id: 'stan-padaczkowy', domain: 'cns', category: 'Obszar A / Stan padaczkowy (SE)',
        shortTitle: 'Stan padaczkowy drgawkowy (34-latka)',
        title: 'Uogólnione drgawki toniczno-kloniczne trwające > 10 minut u 34-letniej kobiety',
        age: '34 lata', weight: 64, gender: 'Kobieta',
        chiefComplaint: 'Ciągły napad drgawek uogólnionych od 12 minut bez odzyskania świadomości.',
        intro: '34-letnia kobieta przywieziona po utracie przytomności; drgawki toniczno-kloniczne utrzymują się nieprzerwanie od 12 minut. Sinica wokół ust, ślinienie, brak dokumentacji.',
        vitalsInitial: { hr: 124, spo2: 89, rr: 24, bp: '164/96', temp: 37.6, gcs: 6, gluc: 94, extraLab: 'Czas SE', extraVal: '12 min', extraStatus: 'danger' },
        stages: [
          {
            name: 'Etap 1: ABCDE i przyczyny odwracalne',
            prompt: 'Pacjentka nadal ma drgawki, SpO2 89%, GCS 6. Od czego zaczynasz w pierwszych minutach?',
            options: [
              { id: 'se_airway_o2', text: 'Zabezpieczenie dróg oddechowych (pozycja bezpieczna/rurka nosowo-gardłowa, odsysanie) i tlenoterapia wysokoprzepływowa', type: 'key', points: 20, why: 'Zapobiega hipoksemii i zachłyśnięciu w trakcie uogólnionego napadu.' },
              { id: 'se_iv_gluc_b1', text: 'Uzyskanie dostępu i.v., pomiar glikemii przyłóżkowej oraz podanie tiaminy 100 mg i.v.', type: 'key', points: 20, why: 'Wyklucza hipoglikemię (częstą odwracalną przyczynę) i chroni przed encefalopatią Wernickego.' },
              { id: 'se_gag', text: 'Siłowe rozwarcie szczęk i włożenie szpatułki między zęby', type: 'harmful', points: -20, why: 'BŁĄD! Grozi złamaniem zębów, urazem jamy ustnej i niedrożnością dróg oddechowych.' },
              { id: 'se_history', text: 'Zebranie wywiadu od świadków (padaczka, leki, ciąża, uraz)', type: 'neutral', points: 0, why: 'Wspiera diagnostykę przyczynową równolegle do stabilizacji.' }
            ],
            vitalsDelta: { spo2: 5, hr: -6 }
          },
          {
            name: 'Etap 2: I rzut — benzodiazepiny',
            prompt: 'Glikemia 94 mg/dl, napad trwa nadal. Jakie jest postępowanie I rzutu?',
            options: [
              { id: 'se_bzd_full', text: 'Pełna dawka benzodiazepiny: lorazepam 4 mg i.v. (lub diazepam 10 mg i.v. / midazolam 10 mg i.m.)', type: 'key', points: 25, why: 'Benzodiazepiny w pełnej dawce są terapią I rzutu stanu padaczkowego (klasa I).' },
              { id: 'se_bzd_repeat', text: 'Powtórzenie pełnej dawki benzodiazepiny po 5 min przy braku ustąpienia napadu', type: 'neutral', points: 0, why: 'Standard algorytmu przed przejściem do II rzutu.' },
              { id: 'se_eeg_first', text: 'Pilne EEG przed podaniem benzodiazepiny w celu potwierdzenia wyładowań', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD! Drgawkowy SE rozpoznaje się klinicznie — zwłoka zwiększa śmiertelność.' },
              { id: 'se_low_bzd', text: 'Podanie 2 mg diazepamu i.v. z obawy przed depresją oddechową', type: 'harmful', points: -15, why: 'Subterapeutyczna dawka BZD prowadzi do opornego stanu padaczkowego (RSE).' }
            ],
            vitalsDelta: { spo2: 2, hr: -14, bp: '146/86', extraVal: '18 min', extraStatus: 'warn' }
          },
          {
            name: 'Etap 3: II rzut i diagnostyka przyczyny',
            prompt: 'Po dwóch dawkach benzodiazepiny drgawki powracają. Co podajesz w II rzucie (15–30 min)?',
            options: [
              { id: 'se_lev', text: 'Włączenie lewetiracetamu 60 mg/kg i.v. (ok. 3.8 g w 10–15 min)', type: 'key', points: 25, why: 'Skuteczność ~47% (ESETT), brak hipotensji i bezpieczeństwo u kobiety w wieku rozrodczym.' },
              { id: 'se_rse_diag', text: 'Gotowość do anestezji (propofol/midazolam + intubacja) przy napadzie > 30–40 min oraz TK głowy, jony i beta-hCG', type: 'key', points: 15, why: 'Oporny SE wymaga znieczulenia pod kontrolą EEG i wykluczenia ostrej patologii OUN lub rzucawki.' },
              { id: 'se_oral_cbz', text: 'Podanie karbamazepiny przez zgłębnik i brak kontroli EEG mimo braku powrotu świadomości', type: 'harmful', points: -20, why: 'BŁĄD! Brak powrotu przytomności po drgawkach wymaga EEG (wykluczenie NCSE).' }
            ],
            vitalsDelta: { hr: -18, rr: -6, spo2: 2, bp: '126/78', gcs: 7, extraVal: '0 min (przerwany)', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Uogólniony drgawkowy stan padaczkowy (ustępujący po II rzucie)', code: 'G41.0',
          etiology: 'Przerwanie leczenia p/padaczkowego, ostre uszkodzenie OUN lub przyczyny metaboliczno-toksyczne',
          keyRules: [
            'Drgawkowy SE rozpoznajemy operacyjnie już po 5 min ciągłego napadu (czas t1 wdrożenia BZD).',
            'Zawsze oznacz glikemię w 1. minucie i podaj tiaminę przed glukozą przy podejrzeniu niedoboru.',
            'I rzut (0–10 min): lorazepam 4 mg i.v., diazepam 10 mg i.v. lub midazolam 10 mg i.m.',
            'II rzut (15–30 min): lewetiracetam 60 mg/kg i.v., walproinian 40 mg/kg i.v. (unikać u kobiet w wieku rozrodczym) lub fosfenytoina.',
            'Brak powrotu przytomności po napadzie wymaga EEG (wykluczenie NCSE).'
          ],
          pearls: 'W badaniu ESETT lewetiracetam, fosfenytoina i walproinian miały podobną skuteczność (~45–47%), ale lewetiracetam najrzadziej wywoływał hipotensję i nie jest teratogenny.'
        }
      },
      {
        id: 'przelom-miasteniczny', domain: 'pns', category: 'Obszar C / Złącze nerwowo-mięśniowe',
        shortTitle: 'Przełom miasteniczny (29-latka)',
        title: 'Narastająca dysfagia, opadanie powiek i duszność spoczynkowa w miastenii',
        age: '29 lat', weight: 62, gender: 'Kobieta',
        chiefComplaint: 'Trudności z połykaniem śliny, nosowy głos i płytki oddech od 6 godzin.',
        intro: '29-letnia pacjentka z miastenią gravis (AChR+) zgłasza się po 3 dniach gorączki i kaszlu. Nie może unieść głowy z poduszki, krztusi się płynami, oddycha z udziałem mięśni dodatkowych.',
        vitalsInitial: { hr: 112, spo2: 92, rr: 28, bp: '146/88', temp: 37.9, gcs: 15, gluc: 102, extraLab: 'FVC', extraVal: '14 ml/kg', extraStatus: 'danger' },
        stages: [
          {
            name: 'Etap 1: Ocena zagrożenia oddechowego',
            prompt: 'Pacjentka jest przytomna (GCS 15), SpO2 92%, RR 28/min. Co robisz natychmiast?',
            options: [
              { id: 'mg_fvc_abg', text: 'Pilny pomiar FVC (14 ml/kg), NIF/PImax i gazometrii tętniczej (pCO2 52 mmHg)', type: 'key', points: 25, why: 'FVC < 15–20 ml/kg i hiperkapnia wskazują na wyczerpanie mięśni oddechowych (reguła 20/30/40).' },
              { id: 'mg_intub_plan', text: 'Rozpoznanie przełomu miastenicznego i pilna kwalifikacja do intubacji na OIT', type: 'key', points: 20, why: 'Niewydolność oddechowa w miastenii wymaga planowej intubacji przed zatrzymaniem oddechu.' },
              { id: 'mg_ward_o2', text: 'Sama tlenoterapia przez wąsy i obserwacja na sali ogólnej, bo „SpO2 > 90% i pacjentka rozmawia”', type: 'harmful', points: -25, why: 'ŚMIERTELNA PUŁAPKA! Hipoksemia występuje późno — bezdech nadchodzi nagle wskutek wyczerpania przepony.' },
              { id: 'mg_neck', text: 'Ocena siły zginaczy szyi i test liczenia na jednym wdechu (< 20 = alarm)', type: 'neutral', points: 0, why: 'Przyłóżkowy wykładnik osłabienia mięśni oddechowych i opuszkowych.' }
            ],
            vitalsDelta: { rr: 2, spo2: -2 }
          },
          {
            name: 'Etap 2: Bezpieczna intubacja i immunoterapia',
            prompt: 'Pacjentka wymaga pilnej intubacji i leczenia przyczynowego. Co zlecasz?',
            options: [
              { id: 'mg_rsi_safe', text: 'Intubacja z unikaniem sukcynylocholiny i redukcją dawki rokuronium', type: 'key', points: 20, why: 'W miastenii istnieje oporność na sukcynylocholinę i skrajna wrażliwość na blokery niedepolaryzujące.' },
              { id: 'mg_ivig_plex', text: 'Natychmiastowe włączenie IVIG (0.4 g/kg/d przez 5 dni) lub plazmaferezy (PLEX, 5 zabiegów)', type: 'key', points: 25, why: 'IVIG i PLEX to podstawowa, równorzędna immunoterapia przełomu miastenicznego.' },
              { id: 'mg_genta_mg', text: 'Podanie gentamycyny oraz 2 g MgSO4 i.v. na tachykardię', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD! Aminoglikozydy i magnez nasilają blok w złączu nerwowo-mięśniowym.' },
              { id: 'mg_hold_ache', text: 'Czasowe wstrzymanie pirydostygminy po zaintubowaniu na OIT', type: 'neutral', points: 0, why: 'Zmniejsza ślinotok oskrzelowy i zapobiega przełomowi cholinergicznemu.' }
            ],
            vitalsDelta: { spo2: 8, rr: -12, hr: -16, bp: '124/76', extraVal: 'Wentylacja OIT', extraStatus: 'warn' }
          },
          {
            name: 'Etap 3: Czynnik wyzwalający i leki zakazane',
            prompt: 'W RTG klatki piersiowej naciek zapalny płuca prawego. Jak prowadzisz dalszą terapię?',
            options: [
              { id: 'mg_safe_abx', text: 'Leczenie infekcji bezpiecznym antybiotykiem (cefalosporyna III gen.) zamiast fluorochinolonów/makrolidów', type: 'key', points: 20, why: 'Chinolony, makrolidy i aminoglikozydy zaostrzają miastenię; cefalosporyny i penicyliny są bezpieczne.' },
              { id: 'mg_med_audit', text: 'Audyt karty leków: wykluczenie beta-blokerów, blokerów Ca, magnezu, aminoglikozydów i chinolonów', type: 'key', points: 15, why: 'Chroni przed nawrotem bloku nerwowo-mięśniowego podczas odstawiania respiratora.' },
              { id: 'mg_high_steroid', text: 'Włączenie dużych dawek prednizonu p.o. bez osłony IVIG/PLEX u niezaintubowanej chorej', type: 'harmful', points: -20, why: 'Wysokie dawki GKS mogą wywołać przejściowy spadek siły mięśniowej (dip steroidowy) w 1. tygodniu.' }
            ],
            vitalsDelta: { hr: -12, temp: -0.9, extraVal: 'FVC 24 ml/kg', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Przełom miasteniczny wywołany infekcją dolnych dróg oddechowych', code: 'G70.0',
          etiology: 'Autoimmunologiczna blokada receptorów AChR złącza nerwowo-mięśniowego nasilona przez infekcję',
          keyRules: [
            'Reguła intubacji „20/30/40”: FVC < 20 ml/kg, PImax > -30 cmH2O, PEmax < 40 cmH2O lub hiperkapnia.',
            'Leczenie przyczynowe I wyboru: IVIG (2 g/kg w 5 dni) lub plazmafereza (PLEX).',
            'Leki bezwzględnie zakazane: aminoglikozydy, fluorochinolony, makrolidy, MgSO4, beta-blokery, blokery Ca, sukcynylocholina.',
            'Nie polegaj na samym SpO2 — monitoruj FVC i objawy opuszkowe.'
          ],
          pearls: 'Przełom cholinergiczny odróżniają objawy muskarynowe (ślinotok, łzawienie, mioza, skurcz oskrzeli, biegunka) i fascykulacje; po intubacji i wstrzymaniu AChEi oba stany są bezpieczne.'
        }
      },
      {
        id: 'sah', domain: 'cns', category: 'Obszar A / Krwotok podpajęczynówkowy',
        shortTitle: 'Krwotok podpajęczynówkowy (SAH)',
        title: 'Piorunujący ból głowy („jak uderzenie młotem”) i sztywność karku u 52-latka',
        age: '52 lata', weight: 80, gender: 'Mężczyzna',
        chiefComplaint: 'Nagły, najsilniejszy w życiu ból głowy w okolicy potylicznej z wymiotami od 14 godzin.',
        intro: '52-letni mężczyzna zgłasza się po 14 godzinach od nagłego, maksymalnego w ciągu sekund bólu głowy podczas wysiłku, z krótkim omdleniem i nudnościami. Senny (GCS 14), sztywność karku, bez niedowładu.',
        vitalsInitial: { hr: 94, spo2: 97, rr: 18, bp: '176/98', temp: 36.9, gcs: 14, gluc: 112, extraLab: 'Hunt-Hess', extraVal: 'II st.', extraStatus: 'warn' },
        stages: [
          {
            name: 'Etap 1: Podejrzenie SAH i wstępna diagnostyka',
            prompt: 'Obraz wysoce podejrzany o SAH (14 h od początku). Jakie działania zlecasz od razu?',
            options: [
              { id: 'sah_ct', text: 'Pilne TK głowy bez kontrastu jako badanie pierwszego rzutu', type: 'key', points: 25, why: 'Badanie pierwszego wyboru w podejrzeniu SAH (czułość ~98–100% < 6 h, maleje w kolejnych godzinach).' },
              { id: 'sah_pain_bp', text: 'Analgezja (paracetamol/opioidy i.v.) i kontrola SBP < 160 mmHg (labetalol/nikardypina i.v.)', type: 'key', points: 15, why: 'Ogranicza ból i ryzyko ponownego pęknięcia niezabezpieczonego tętniaka.' },
              { id: 'sah_migraine_home', text: 'Podanie sumatryptanu + ketoprofenu i wypis z rozpoznaniem migreny', type: 'harmful', points: -25, why: 'ŚMIERTELNY BŁĄD! Piorunujący ból głowy wymaga wykluczenia SAH; tryptany i NLPZ pogarszają rokowanie.' },
              { id: 'sah_scales', text: 'Ocena w skalach Hunt-Hess (II st.) i WFNS', type: 'neutral', points: 0, why: 'Standaryzuje ocenę przed konsultacją neurochirurgiczną.' }
            ],
            vitalsDelta: { bp: '154/88', hr: -6 }
          },
          {
            name: 'Etap 2: Weryfikacja ujemnego TK po 14 godzinach',
            prompt: 'TK głowy bez kontrastu w 14. godzinie jest ujemne / niejednoznaczne. Co robisz dalej?',
            options: [
              { id: 'sah_lp_xantho', text: 'Punkcja lędźwiowa (LP) z oceną ksantochromii PMR i próbą 3 probówek', type: 'key', points: 25, why: 'Po > 6–12 h w PMR pojawia się ksantochromia (bilirubina), która potwierdza SAH i odróżnia od artefaktu nakłucia.' },
              { id: 'sah_cta', text: 'Pilne angio-TK naczyń mózgowych (lub DSA) w celu identyfikacji tętniaka', type: 'key', points: 20, why: 'Lokalizuje krwawiącego tętniaka i umożliwia zaplanowanie embolizacji/klipsowania.' },
              { id: 'sah_ruleout_ct', text: 'Wykluczenie SAH wyłącznie na podstawie ujemnego TK po 14 h i odstąpienie od LP', type: 'harmful', points: -25, why: 'BŁĄD KRYTYCZNY! Czułość TK po > 6 h spada — ujemne TK wymaga weryfikacji w LP.' },
              { id: 'sah_cvst', text: 'Wykluczenie zakrzepicy zatok żylnych i rozwarstwienia tętnic szyjnych/kręgowych', type: 'neutral', points: 0, why: 'Ważna diagnostyka różnicowa piorunującego bólu głowy.' }
            ],
            vitalsDelta: { extraVal: 'Ksantochromia +', extraStatus: 'danger' }
          },
          {
            name: 'Etap 3: Profilaktyka DCI i zabezpieczenie tętniaka',
            prompt: 'Potwierdzono SAH z tętniaka tętnicy łączącej przedniej (AComA). Jakie leczenie wdrażasz?',
            options: [
              { id: 'sah_nimodipine', text: 'Włączenie nimodypiny 60 mg p.o. co 4 h przez 21 dni w profilaktyce wtórnego niedokrwienia (DCI)', type: 'key', points: 25, why: 'Jedyny lek zmniejszający wtórne niedokrwienie (DCI) i poprawiający przeżycie w SAH (klasa I).' },
              { id: 'sah_coil_euv', text: 'Pilna embolizacja/klipsowanie tętniaka (< 24 h) i utrzymanie euwolemii', type: 'key', points: 20, why: 'Wczesne zamknięcie eliminuje ryzyko rebleeding; euwolemia zastąpiła dawną hiperwolemię.' },
              { id: 'sah_anticoag', text: 'Podanie dawki leczniczej enoksaparyny i ASA przed zabezpieczeniem tętniaka', type: 'harmful', points: -25, why: 'PRZECIWWSKAZANE! Grozi śmiertelnym ponownym krwawieniem z niezabezpieczonego tętniaka.' }
            ],
            vitalsDelta: { hr: -8, bp: '138/82', gcs: 1, extraVal: 'Zabezpieczony', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Krwotok podpajęczynówkowy (SAH) z tętniaka tętnicy łączącej przedniej', code: 'I60.2',
          etiology: 'Pęknięcie workowatego tętniaka tętnicy koła Willisa (najczęściej AComA, PComA, MCA)',
          keyRules: [
            'Piorunujący ból głowy (szczyt < 1 min) to SAH aż do wykluczenia.',
            'TK bez kontrastu ma ~98–100% czułości w pierwszych 6 h; po > 6 h ujemne TK wymaga punkcji lędźwiowej.',
            'Ksantochromia PMR rozwija się po > 6–12 h i odróżnia SAH od artefaktu nakłucia (próba 3 probówek).',
            'Nimodypina 60 mg p.o. co 4 h przez 21 dni jest standardem profilaktyki DCI; tętniaka zabezpieczamy w < 24 h.'
          ],
          pearls: 'W krwawym artefakcie nakłucia kolejne 3 probówki jaśnieją, a supernatant po odwirowaniu jest bezbarwny; w SAH po > 6–12 h płyn ma żółte zabarwienie (ksantochromia).'
        }
      },
      {
        id: 'gbs', domain: 'pns', category: 'Obszar C / Zespół Guillaina-Barrégo',
        shortTitle: 'Zespół Guillaina-Barrégo (GBS)',
        title: 'Postępujący wstępujący niedowład kończyn i arefleksja po biegunce u 46-latka',
        age: '46 lat', weight: 82, gender: 'Mężczyzna',
        chiefComplaint: 'Osłabienie nóg narastające od 3 dni, mrowienie dłoni i stóp.',
        intro: '46-letni mężczyzna 2 tygodnie po biegunce (Campylobacter jejuni) zgłasza symetryczne osłabienie nóg postępujące ku górze. Wiotki niedowład KD 2/5, KG 4/5, całkowita arefleksja ścięgnista, bez poziomu czucia i zaburzeń zwieraczy.',
        vitalsInitial: { hr: 98, spo2: 95, rr: 22, bp: '154/92', temp: 36.8, gcs: 15, gluc: 104, extraLab: 'FVC', extraVal: '18 ml/kg', extraStatus: 'warn' },
        stages: [
          {
            name: 'Etap 1: Triage i ryzyko oddechowo-autonomiczne',
            prompt: 'Pacjent z ostrym wstępującym niedowładem i FVC 18 ml/kg. Jakie są priorytety pierwszego etapu?',
            options: [
              { id: 'gbs_fvc_mon', text: 'Przyjęcie na oddział z seryjnym pomiarem FVC/NIF co 4–6 h i oceną połykania', type: 'key', points: 25, why: 'Ok. 25% chorych wymaga wentylacji mechanicznej; spadek FVC < 20 ml/kg wyprzedza spadek SpO2.' },
              { id: 'gbs_tele', text: 'Kardiomonitorowanie (nadzór nad dysautonomią: bradyarytmie, wahania RR, blok AV)', type: 'key', points: 20, why: 'Zaburzenia autonomiczne są drugą po niewydolności oddechowej przyczyną zgonów w GBS.' },
              { id: 'gbs_amb_emg', text: 'Wypis do domu z planowym skierowaniem na EMG w poradni za 3 tygodnie', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD! W ostrej poliradikuloneuropatii grozi szybka niewydolność oddechowa.' },
              { id: 'gbs_sensory_lvl', text: 'Potwierdzenie braku poziomu czucia i zaburzeń zwieraczy (wykluczenie ucisku rdzenia)', type: 'neutral', points: 0, why: 'Odróżnia poliradikuloneuropatię obwodową od ostrej mielopatii i zespołu ogona końskiego.' }
            ],
            vitalsDelta: { rr: 2, spo2: -1 }
          },
          {
            name: 'Etap 2: Diagnostyka PMR i elektrofizjologia',
            prompt: 'Stan stabilny pod nadzorem. Jak potwierdzasz GBS i interpretujesz badania?',
            options: [
              { id: 'gbs_lp', text: 'Nakłucie lędźwiowe — oczekiwane rozszczepienie białkowo-komórkowe (wysokie białko przy cytozie <= 5–10 kom./µl)', type: 'key', points: 25, why: 'Klasyczna cecha PMR w GBS; uwaga: w pierwszych 2–3 dniach białko może być jeszcze prawidłowe.' },
              { id: 'gbs_eng', text: 'Badanie ENG/EMG (wydłużenie latencji fali F, bloki i zwolnienie przewodzenia)', type: 'key', points: 15, why: 'Różnicuje postać demielinizacyjną (AIDP) od aksonalnej (AMAN/AMSAN).' },
              { id: 'gbs_delay_norm_csf', text: 'Odroczenie terapii z powodu prawidłowego białka PMR w 3. dobie choroby', type: 'harmful', points: -20, why: 'BŁĄD! W 1. tygodniu rozszczepienie białkowo-komórkowe może się jeszcze nie ujawnić — decyduje klinika.' },
              { id: 'gbs_spine_mri', text: 'Pilne MRI kręgosłupa przy jakichkolwiek wątpliwościach rdzeniowych', type: 'neutral', points: 0, why: 'Wyklucza ostry ucisk rdzenia lub zapalenie rdzenia przy nietypowym przebiegu.' }
            ],
            vitalsDelta: { extraVal: 'PMR: B 165 / K 3', extraStatus: 'warn' }
          },
          {
            name: 'Etap 3: Leczenie przyczynowe i profilaktyka powikłań',
            prompt: 'Potwierdzono GBS; chory nie chodzi samodzielnie, FVC 16 ml/kg. Jakie leczenie wdrażasz?',
            options: [
              { id: 'gbs_ivig_plex', text: 'Natychmiastowe IVIG (0.4 g/kg/d przez 5 dni) lub plazmafereza (PLEX) oraz gotowość do intubacji', type: 'key', points: 25, why: 'IVIG i PLEX są równorzędnym leczeniem I rzutu przyspieszającym powrót sprawności.' },
              { id: 'gbs_lmwh', text: 'Profilaktyka przeciwzakrzepowa (enoksaparyna 40 mg s.c.) oraz wczesna rehabilitacja oddechowa', type: 'key', points: 15, why: 'Unieruchomienie niesie wysokie ryzyko ZŻG i zatorowości płucnej.' },
              { id: 'gbs_steroids', text: 'Podanie dożylnych pulsów metyloprednizolonu (1 g/d) lub prednizonu jako leczenia przyczynowego GBS', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD EGZAMINACYJNY! Glikokortykosteroidy w GBS NIE działają i pogarszają rokowanie (inaczej niż w CIDP!).' }
            ],
            vitalsDelta: { hr: -12, rr: -4, spo2: 2, bp: '132/80', extraVal: 'IVIG + FVC 22', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Zespół Guillaina-Barrégo (ostra zapalna poliradikuloneuropatia demielinizacyjna, AIDP)', code: 'G61.0',
          etiology: 'Autoimmunologiczna reakcja krzyżowa po infekcji (Campylobacter jejuni, CMV, EBV, Mycoplasma)',
          keyRules: [
            'Triada GBS: symetryczny niedowład wstępujący + arefleksja + rozszczepienie białkowo-komórkowe w PMR.',
            'Monitoruj FVC/NIF oraz rytm serca (niewydolność oddechowa i dysautonomia to główne zagrożenia życia).',
            'Leczenie przyczynowe: IVIG (2 g/kg w 5 dni) lub plazmafereza (PLEX); nie łącz obu metod sekwencyjnie.',
            'ZAKAZ STEROIDÓW w ostrym GBS — glikokortykosteroidy stosuje się w przewlekłym CIDP, nie w GBS!'
          ],
          pearls: 'Wariant Millera-Fishera (anty-GQ1b) manifestuje się triadą: oftalmoplegia + ataksja + arefleksja.'
        }
      },
      {
        id: 'zomr', domain: 'cns', category: 'Obszar A / Neuroinfekcje (ZOMR)',
        shortTitle: 'Bakteryjne ZOMR (24-latek)',
        title: 'Wysoka gorączka, silny ból głowy i sztywność karku u 24-latka',
        age: '24 lata', weight: 75, gender: 'Mężczyzna',
        chiefComplaint: 'Gorączka 39.4°C, światłowstręt, wymioty i ból głowy od 10 godzin.',
        intro: '24-letni mężczyzna z wysoką gorączką, światłowstrętem i sennością (GCS 14). Wyraźna sztywność karku, objaw Kerniga i Brudzińskiego (+), brak deficytu ogniskowego i prawidłowe dno oka.',
        vitalsInitial: { hr: 118, spo2: 96, rr: 22, bp: '108/68', temp: 39.4, gcs: 14, gluc: 108, extraLab: 'Opony', extraVal: 'Sztywność +', extraStatus: 'danger' },
        stages: [
          {
            name: 'Etap 1: Posiewy i decyzja o TK przed LP',
            prompt: 'Podejrzewasz ostre bakteryjne ZOMR (GCS 14, brak ogniskowości, prawidłowe dno oka). Co robisz w pierwszych 15 min?',
            options: [
              { id: 'zomr_blood_cult', text: 'Natychmiastowe 2 zestawy posiewów krwi, morfologia, CRP/PCT, jony i glukoza w surowicy', type: 'key', points: 20, why: 'Posiew krwi często wykrywa patogen, a glikemia jest konieczna do obliczenia ilorazu PMR/surowica.' },
              { id: 'zomr_ct_criteria', text: 'Ocena wskazań do TK przed LP (deficyt ogniskowy, tarcza zastoinowa, drgawki, GCS < 10–12, immunosupresja) — tu pilna LP', type: 'key', points: 20, why: 'Przy braku przeciwwskazań wykonuje się LP od razu bez zbędnego opóźniania terapii przez rutynowe TK.' },
              { id: 'zomr_wait_ct', text: 'Wstrzymanie antybiotyku i sterydu do czasu wykonania TK głowy i wyniku PMR', type: 'harmful', points: -25, why: 'ŚMIERTELNY BŁĄD! Zwłoka w podaniu antybiotyku przy ropnym ZOMR gwałtownie zwiększa śmiertelność.' },
              { id: 'zomr_petechiae', text: 'Ocena całej skóry pod kątem wybroczyn nieblednących pod uciskiem', type: 'neutral', points: 0, why: 'Wybroczyny silnie sugerują posocznicę/ZOMR o etiologii Neisseria meningitidis.' }
            ],
            vitalsDelta: { hr: -4 }
          },
          {
            name: 'Etap 2: Terapia empiryczna (< 60 minut)',
            prompt: 'Pobrano posiewy i wykonano LP (płyn mętny). Jakie leki podajesz natychmiast i.v.?',
            options: [
              { id: 'zomr_dex', text: 'Deksametazon 10 mg i.v. bezpośrednio przed pierwszą dawką antybiotyku (lub równocześnie)', type: 'key', points: 25, why: 'Redukuje odpowiedź zapalną i śmiertelność w pneumokokowym ZOMR.' },
              { id: 'zomr_abx', text: 'Empiryczna antybiotykoterapia i.v.: ceftriakson 2 g co 12 h + wankomycyna 15–20 mg/kg', type: 'key', points: 25, why: 'Pokrywa N. meningitidis i oporne na penicylinę szczepy S. pneumoniae.' },
              { id: 'zomr_acyclovir_only', text: 'Podanie wyłącznie samego acyklowiru i.v. lub doustnej amoksycyliny do czasu posiewu', type: 'harmful', points: -25, why: 'KRYTYCZNY BŁĄD! Brak pokrycia bakteryjnego w ropnym ZOMR prowadzi do sepsy i obrzęku mózgu.' },
              { id: 'zomr_ampicillin_note', text: 'Pamięć o dodaniu ampicyliny 2 g co 4 h > 50 r.ż., w ciąży lub immunosupresji (Listeria)', type: 'neutral', points: 0, why: 'Cefalosporyny nie działają na Listeria monocytogenes.' }
            ],
            vitalsDelta: { temp: -0.8, hr: -14, bp: '116/72' }
          },
          {
            name: 'Etap 3: Interpretacja PMR i profilaktyka kontaktów',
            prompt: 'PMR: cytoza 2400/µl (92% neutrofili), białko 240 mg/dl, glukoza PMR 22 mg/dl (surowica 108 mg/dl, iloraz 0.20). Jak finalizujesz postępowanie?',
            options: [
              { id: 'zomr_csf_interp', text: 'Rozpoznanie bakteryjnego ZOMR, kontynuacja celowanej terapii i monitorowanie powikłań OUN', type: 'key', points: 20, why: 'Pleocytoza neutrofilowa, wysokie białko i iloraz glukozy < 0.4 jednoznacznie potwierdzają ropne ZOMR.' },
              { id: 'zomr_sanepid_dex', text: 'Deksametazon 4 dni przy S. pneumoniae lub zgłoszenie do Sanepidu i chemioprofilaktyka kontaktów przy N. meningitidis', type: 'key', points: 15, why: 'Kontakty bliskie w meningokokowym ZOMR wymagają cyprofloksacyny 500 mg p.o. lub ryfampicyny.' },
              { id: 'zomr_lp_herniation', text: 'Powtórna LP bez TK mimo nowego niedowładu połowiczego i tarczy zastoinowej', type: 'harmful', points: -25, why: 'BEZWZGLĘDNE PRZECIWWSKAZANIE! Grozi wgłobieniem migdałków móżdżku.' }
            ],
            vitalsDelta: { temp: -1.1, hr: -18, rr: -4, gcs: 1, extraVal: 'Stabilny', extraStatus: 'ok' }
          }
        ],
        debrief: {
          diagnosis: 'Ostre bakteryjne (ropne) zapalenie opon mózgowo-rdzeniowych', code: 'G00.9',
          etiology: 'Streptococcus pneumoniae, Neisseria meningitidis; >50 r.ż./immunosupresja także Listeria monocytogenes',
          keyRules: [
            'Antybiotyk (ceftriakson + wankomycyna, + ampicylina >50 r.ż./immunosupresja) i deksametazon 10 mg i.v. podaj w < 60 min — nigdy nie czekaj na TK!',
            'TK przed LP wymagane przy: deficycie ogniskowym, tarczy zastoinowej, napadzie de novo, GCS < 10–12, immunosupresji.',
            'Ropny PMR: mętny płyn, cytoza > 1000/µl (neutrofile > 80%), białko > 100–200 mg/dl, glukoza PMR/surowica < 0.4.',
            'Przy N. meningitidis zgłoś przypadek do Sanepidu i wdróż chemioprofilaktykę kontaktów (cyprofloksacyna 500 mg p.o.).'
          ],
          pearls: 'Gruźlicze ZOMR ma zwykle pleocytozę limfocytarną, bardzo wysokie białko i niską glukozę (< 0.4), natomiast w wirusowym glukoza pozostaje prawidłowa (> 0.5–0.6).'
        }
      }
    ];

    let SIM_ACTIVE = null;

    function viewPatient(parts, params) {
      const osceList = Array.isArray(OSCE_STATIONS) ? OSCE_STATIONS : [];
      if (parts[1] === 'osce' && parts[2]) {
        const station = osceList.find(s => s.id === parts[2]);
        if (!station) { toast('Nie znaleziono stacji OSCE'); location.hash = '#/pacjent?tab=osce'; return; }
        ctx.osce.openStation(station);
        return;
      }
      const directOsce = osceList.find(s => s.id === parts[1]);
      if (directOsce) { ctx.osce.openStation(directOsce); return; }

      const caseId = parts[1];
      if (caseId && caseId !== 'osce') {
        const caseItem = PATIENT_CASES.find(c => c.id === caseId);
        if (!caseItem) { toast('Nie znaleziono scenariusza klinicznego'); location.hash = '#/pacjent'; return; }
        if (!SIM_ACTIVE || SIM_ACTIVE.caseId !== caseId) startPatientSim(caseItem);
        renderActivePatientSim(caseItem);
        return;
      }
      const tab = (parts[1] === 'osce' || (params && params.tab === 'osce')) ? 'osce' : 'sor';
      if (tab === 'osce') ctx.osce.renderOsceStationList();
      else renderPatientCaseList();
    }

    function startPatientSim(caseItem) {
      SIM_ACTIVE = {
        caseId: caseItem.id, stageIdx: 0, state: 'deciding',
        selectedOptionIds: new Set(), score: 0, maxScore: 0, history: [],
        currentVitals: { ...caseItem.vitalsInitial }, showEmergencyTray: false
      };
    }

    function renderEmergencyDrugTray(caseItem) {
      const card = EMERGENCY_DRUG_CARDS[caseItem.id];
      if (!card) return '';
      return `<div class="card emergency-doses-tray" style="margin:1rem 0;background:var(--surface);border:2px solid var(--red);box-shadow:var(--shadow-md)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.8rem;flex-wrap:wrap;gap:.5rem">
          <div style="display:flex;align-items:center;gap:.5rem"><span style="font-size:1.3rem">🚨</span><div><h3 style="margin:0;font-size:1.1rem;color:var(--red)">Panel Dawek Ratunkowych (SOR Neurologiczny)</h3><div style="font-size:.8rem;color:var(--ink-muted)">Dawki dla masy ciała: <b>${caseItem.weight} kg</b> (${esc(caseItem.age)})</div></div></div>
          <button class="btn sec sm" id="btnCloseEmergencyTray" style="font-size:.78rem">✕ Zamknij panel</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:.7rem;margin-bottom:.8rem">
          ${card.drugs.map(d => `<div style="background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.75rem .9rem;display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;gap:.4rem"><b style="font-size:.92rem;color:var(--ink)">${esc(d.name)}</b><span class="chip" style="background:var(--red-l);color:var(--red);font-weight:700;font-size:.68rem;padding:.15rem .4rem;border:0">${esc(d.badge)}</span></div>
              <div style="font-size:.8rem;color:var(--ink-muted);margin-bottom:.3rem">Schemat: <b>${esc(d.dosePerKg)}</b></div>
              <div style="padding:.45rem .6rem;background:var(--surface);border:1.5px solid var(--teal);border-radius:6px;margin-bottom:.4rem"><span style="font-size:.74rem;color:var(--teal-d);display:block;font-weight:700">DAWKA DLA PACJENTA:</span><b style="font-size:.94rem;color:var(--teal);display:block">${esc(d.calcDose)}</b></div>
              <div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.2rem"><b>Droga:</b> ${esc(d.route)}</div>
            </div>
            <div style="font-size:.76rem;color:var(--ink);background:rgba(12,122,133,0.06);padding:.35rem .5rem;border-radius:4px;margin-top:.4rem;line-height:1.35">${esc(d.indication)}</div>
          </div>`).join('')}
        </div>
        <div style="background:rgba(194,59,42,0.08);border:1px solid rgba(194,59,42,0.28);padding:.7rem .9rem;border-radius:8px;font-size:.82rem;line-height:1.45;color:var(--ink)">
          <b style="color:var(--red)">⚠️ CZERWONE FLAGI I PRZECIWWSKAZANIA:</b>
          <ul style="margin:.3rem 0 0 1.1rem;padding:0">${card.redFlags.map(rf => `<li>${esc(rf)}</li>`).join('')}</ul>
        </div>
      </div>`;
    }

    function getClinicalRank(completedCount) {
      if (completedCount >= 9) return { title: 'Starszy Dyżurny Oddziału Udarowego 🏆', color: 'var(--teal)' };
      if (completedCount >= 6) return { title: 'Rezydent Kliniki Neurologii 🌟', color: 'var(--green)' };
      if (completedCount >= 3) return { title: 'Lekarz SOR Neurologicznego 🏥', color: 'var(--amber)' };
      return { title: 'Stażysta Oddziału Neurologii 🧠', color: 'var(--ink-muted)' };
    }
    window.getClinicalRank = getClinicalRank;

    function renderPatientCaseList() {
      window.scrollTo(0, 0);
      window.PATIENT_HUB_FILTER = window.PATIENT_HUB_FILTER || 'all';
      const osceList = Array.isArray(OSCE_STATIONS) ? OSCE_STATIONS : [];
      const completedSor = Object.keys(ctx.S.patientCases || {}).length;
      const completedOsce = Object.keys(ctx.S.osceCases || {}).length;
      const totalCompleted = completedSor + completedOsce;
      const totalCases = PATIENT_CASES.length + osceList.length;

      let totalScoreSum = 0, scoredCount = 0;
      Object.values(ctx.S.patientCases || {}).forEach(c => { if (c.bestScore !== undefined) { totalScoreSum += c.bestScore; scoredCount++; } });
      Object.values(ctx.S.osceCases || {}).forEach(c => { if (c.score !== undefined) { totalScoreSum += c.score; scoredCount++; } });
      const avgScore = scoredCount ? Math.round(totalScoreSum / scoredCount) : 0;
      const rank = getClinicalRank(totalCompleted);
      const currentFilter = window.PATIENT_HUB_FILTER;

      const sorFiltered = PATIENT_CASES.filter(c => currentFilter !== 'osce' && (currentFilter === 'cns' ? c.domain === 'cns' : (currentFilter === 'pns' ? c.domain === 'pns' : true)));
      const osceFiltered = osceList.filter(s => {
        if (currentFilter === 'sor') return false;
        const txt = ((s.domain || '') + ' ' + (s.topic || '') + ' ' + (s.title || '')).toLowerCase();
        if (currentFilter === 'cns') return s.domain ? s.domain === 'cns' : !/obwod|mięś|miast|gbs|polineu/.test(txt);
        if (currentFilter === 'pns') return s.domain ? s.domain === 'pns' : /obwod|mięś|miast|gbs|polineu/.test(txt);
        return true;
      });

      main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:1040px">
        <div class="eyebrow">Symulator kliniczny · Ostry dyżur SOR &amp; Egzamin OSCE</div>
        <h2>Wirtualny Pacjent – stany nagłe i badanie neurologiczne</h2>
        <div class="conn-tabs" role="tablist" style="margin-bottom:1.2rem">
          <button class="conn-tab-btn ${currentFilter !== 'osce' ? 'active' : ''}" data-ptab="sor" role="tab" aria-selected="${currentFilter !== 'osce'}">🚨 SOR / Ostry Dyżur (${PATIENT_CASES.length})</button>
          <button class="conn-tab-btn ${currentFilter === 'osce' ? 'active' : ''}" data-ptab="osce" role="tab" aria-selected="${currentFilter === 'osce'}">📋 Stacje OSCE / Badanie U02 (${osceList.length})</button>
        </div>
        <div class="card" style="margin-bottom:1.5rem;background:var(--surface);border-left:4px solid var(--teal);padding:1rem 1.3rem">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem">
            <div>
              <div style="font-size:.78rem;font-weight:700;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.04em">Status postępów klinicznych:</div>
              <div style="display:flex;align-items:center;gap:.6rem;margin-top:.2rem;flex-wrap:wrap">
                <span class="sim-rank-chip" style="border-color:${rank.color};color:${rank.color}">${rank.title}</span>
                <span style="font-size:.9rem;color:var(--ink-muted)">Ukończono <b>${totalCompleted} z ${totalCases}</b> scenariuszy (${totalCases ? Math.round((totalCompleted / totalCases) * 100) : 0}%)</span>
              </div>
            </div>
            <div style="display:flex;gap:1.5rem;align-items:center">
              <div style="text-align:right"><span class="srcline" style="display:block;font-size:.78rem">Średnia skuteczność</span><b style="font-size:1.35rem;color:${avgScore >= 75 ? 'var(--green)' : (avgScore >= 60 ? 'var(--amber)' : 'var(--ink)')}">${avgScore > 0 ? avgScore + '%' : '–'}</b></div>
              <div style="text-align:right"><span class="srcline" style="display:block;font-size:.78rem">Zaliczone stacje</span><b style="font-size:1.35rem;color:var(--teal)">${totalCompleted} / ${totalCases}</b></div>
            </div>
          </div>
        </div>
        <div class="sim-filter-bar" role="toolbar" aria-label="Filtry przypadków klinicznych">
          <button class="sim-filter-chip ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">Wszystkie (${totalCases})</button>
          <button class="sim-filter-chip ${currentFilter === 'sor' ? 'active' : ''}" data-filter="sor">🚨 Tylko SOR (${PATIENT_CASES.length})</button>
          <button class="sim-filter-chip ${currentFilter === 'osce' ? 'active' : ''}" data-filter="osce">📋 Tylko OSCE (${osceList.length})</button>
          <button class="sim-filter-chip ${currentFilter === 'cns' ? 'active' : ''}" data-filter="cns">🧠 OUN i naczyniowe</button>
          <button class="sim-filter-chip ${currentFilter === 'pns' ? 'active' : ''}" data-filter="pns">⚡ Obwodowy i złącze NM</button>
        </div>
        ${sorFiltered.length > 0 ? `<div style="margin-bottom:2rem">
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem"><span style="font-size:1.3rem">🚨</span><h3 style="margin:0;font-size:1.2rem">Stany Nagłe w Neurologii (SOR)</h3><span class="chip" style="background:rgba(194,59,42,0.1);color:var(--red);font-weight:700;border:0">${sorFiltered.length}</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:1.1rem">
            ${sorFiltered.map(c => {
              const saved = (ctx.S.patientCases || {})[c.id], hasScore = saved && saved.bestScore !== undefined;
              const isPns = c.domain === 'pns', accent = isPns ? 'var(--blue)' : 'var(--red)', softBg = isPns ? 'var(--blue-l)' : 'var(--red-l)';
              return `<div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:3.5px solid ${accent}">
                <div>
                  <div style="display:flex;gap:.4rem;align-items:center;margin-bottom:.5rem;flex-wrap:wrap">
                    <span class="chip" style="background:${softBg};color:${accent};font-weight:700;border:0">${esc(c.category.split('/')[1] ? c.category.split('/')[1].trim() : c.category)}</span>
                    <span class="chip">${esc(c.age)} · ${c.weight} kg</span>
                    ${hasScore ? `<span class="chip" style="background:${saved.bestScore >= 80 ? 'var(--green-l)' : (saved.bestScore >= 60 ? 'var(--amber-l)' : 'var(--red-l)')};color:${saved.bestScore >= 80 ? 'var(--green)' : (saved.bestScore >= 60 ? 'var(--amber)' : 'var(--red)')};font-weight:700;border:0">Wynik: ${saved.bestScore}%</span>` : '<span class="chip" style="background:var(--surface);color:var(--muted)">Nowy</span>'}
                  </div>
                  <h4 style="font-size:1.1rem;margin-bottom:.4rem;font-family:var(--font-display)">${esc(c.title)}</h4>
                  <p class="srcline" style="margin-bottom:.8rem;font-size:.86rem;line-height:1.45">${esc(c.chiefComplaint)}</p>
                </div>
                <div style="display:flex;gap:.5rem;align-items:center;border-top:1px solid var(--line-2);padding-top:.8rem;margin-top:.6rem;flex-wrap:wrap">
                  <a class="btn pri sm" href="#/pacjent/${c.id}">${hasScore ? 'Zagraj ponownie →' : 'Rozpocznij symulację →'}</a>
                  <a class="btn sec sm" href="#/kalkulator?w=${c.weight}" title="Skale i kalkulator dawek (${c.weight} kg)">🧮 Dawki</a>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}
        ${osceFiltered.length > 0 ? `<div style="margin-bottom:2rem">
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem"><span style="font-size:1.3rem">📋</span><h3 style="margin:0;font-size:1.2rem">Stacje Egzaminacyjne OSCE i Badanie U02</h3><span class="chip" style="background:var(--teal-l);color:var(--teal-d);font-weight:700;border:0">${osceFiltered.length}</span></div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,290px),1fr));gap:1.1rem">
            ${osceFiltered.map(st => {
              const saved = (ctx.S.osceCases || {})[st.id], isPassed = saved && saved.score >= 60;
              const zones = Array.isArray(st.zones) ? st.zones : [];
              const totalKey = zones.flatMap(z => z.maneuvers || []).filter(m => m.isKey).length;
              const pAge = st.patient && st.patient.age ? st.patient.age : '';
              const pExtra = st.patient && st.patient.weight ? ' · ' + st.patient.weight : (st.patient && st.patient.gender ? ' · ' + st.patient.gender : '');
              return `<div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:3.5px solid var(--teal)">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;flex-wrap:wrap;gap:.4rem"><span class="badge" style="background:var(--teal);color:var(--on-accent);font-weight:800;font-size:.72rem">STACJA ${esc(st.number || '')}</span><span style="font-size:.78rem;color:var(--ink-muted);font-weight:700">${esc(pAge + pExtra)}</span></div>
                  <h4 style="font-size:1.08rem;margin-bottom:.35rem;font-family:var(--font-display)"><a href="#/pacjent/osce/${st.id}">${esc(st.title)}</a></h4>
                  <div style="font-size:.82rem;color:var(--teal);font-weight:700;margin-bottom:.5rem">🩺 ${esc(st.scale && st.scale.name ? st.scale.name.split('/')[0].trim() : (st.topic || 'Badanie neurologiczne'))}</div>
                  <p class="srcline" style="margin-bottom:.8rem;font-size:.86rem;line-height:1.4">${esc(st.briefing && st.briefing.scenario ? st.briefing.scenario : '')}</p>
                  <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.6rem"><span class="badge" style="background:rgba(12,122,133,0.1);color:var(--teal);font-size:.72rem">📍 ${zones.length} stref</span><span class="badge" style="background:rgba(12,122,133,0.1);color:var(--teal);font-size:.72rem">🔑 ${totalKey} manewrów</span><span class="badge" style="background:rgba(194,59,42,0.1);color:var(--red);font-size:.72rem">⚠️ Błędy krytyczne</span></div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line-2);padding-top:.8rem;margin-top:.6rem">
                  <div>${saved ? `<span class="chip" style="background:${isPassed ? 'var(--green-l)' : 'var(--red-l)'};color:${isPassed ? 'var(--green)' : 'var(--red)'};font-weight:700;border:0;font-size:.74rem">${isPassed ? '✓ Zdane' : '✗ Do poprawy'}: ${saved.score}%</span>` : '<span class="chip" style="background:var(--surface);color:var(--muted);font-size:.74rem">Nowa stacja</span>'}</div>
                  <a class="btn pri sm" href="#/pacjent/osce/${st.id}">${saved ? 'Powtórz badanie →' : 'Rozpocznij stację →'}</a>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>` : ''}
      </div></section>`;

      $$('.conn-tab-btn[data-ptab]').forEach(b => { b.onclick = () => { window.PATIENT_HUB_FILTER = b.dataset.ptab === 'osce' ? 'osce' : 'sor'; renderPatientCaseList(); }; });
      $$('.sim-filter-chip[data-filter]').forEach(b => { b.onclick = () => { window.PATIENT_HUB_FILTER = b.dataset.filter; renderPatientCaseList(); }; });
    }

    function getVitalStatus(k, v) {
      const key = String(k || '').toLowerCase();
      if (key === 'sbp' || key === 'bp') {
        const sbp = typeof v === 'string' ? parseInt(v, 10) : Number(v);
        if (!Number.isFinite(sbp)) return 'ok';
        if (sbp < 90 || sbp >= 220) return 'danger';
        return sbp >= 185 ? 'warn' : 'ok';
      }
      const val = Number(v);
      if (!Number.isFinite(val)) return 'ok';
      if (key === 'hr') return (val >= 55 && val <= 100) ? 'ok' : ((val >= 45 && val <= 120) ? 'warn' : 'danger');
      if (key === 'rr') return (val >= 12 && val <= 20) ? 'ok' : ((val >= 9 && val <= 26) ? 'warn' : 'danger');
      if (key === 'spo2') return val >= 94 ? 'ok' : (val >= 90 ? 'warn' : 'danger');
      if (key === 'temp') return (val >= 36.0 && val <= 37.8) ? 'ok' : ((val >= 35.0 && val <= 38.5) ? 'warn' : 'danger');
      if (key === 'gcs') return val >= 15 ? 'ok' : (val >= 9 ? 'warn' : 'danger');
      if (key === 'gluc') return (val >= 70 && val <= 140) ? 'ok' : (((val >= 55 && val < 70) || (val > 140 && val <= 250)) ? 'warn' : 'danger');
      return 'ok';
    }

    function renderVitalsMonitor(v) {
      return `<div class="vitals-monitor">
        <div class="vital-chip ${getVitalStatus('hr', v.hr)}"><span class="v-lab">❤️ Tętno</span><span class="v-val">${v.hr}</span><span class="v-unit">/min</span></div>
        <div class="vital-chip ${getVitalStatus('spo2', v.spo2)}"><span class="v-lab">🫁 Saturacja</span><span class="v-val">${v.spo2}%</span><span class="v-unit">SpO2</span></div>
        <div class="vital-chip ${getVitalStatus('rr', v.rr)}"><span class="v-lab">💨 Oddech</span><span class="v-val">${v.rr}</span><span class="v-unit">/min</span></div>
        <div class="vital-chip ${getVitalStatus('sbp', v.bp)}"><span class="v-lab">🩸 Ciśnienie</span><span class="v-val" style="font-size:1.05rem">${esc(v.bp)}</span><span class="v-unit">mmHg</span></div>
        <div class="vital-chip ${getVitalStatus('temp', v.temp)}"><span class="v-lab">🌡️ Temp</span><span class="v-val">${Number(v.temp || 0).toFixed(1)}</span><span class="v-unit">°C</span></div>
        <div class="vital-chip ${getVitalStatus('gcs', v.gcs)}"><span class="v-lab">🧠 GCS</span><span class="v-val">${v.gcs}</span><span class="v-unit">/15</span></div>
        <div class="vital-chip ${getVitalStatus('gluc', v.gluc)}"><span class="v-lab">🍬 Glikemia</span><span class="v-val">${v.gluc}</span><span class="v-unit">mg/dl</span></div>
        ${v.extraLab ? `<div class="vital-chip ${esc(v.extraStatus || 'ok')}"><span class="v-lab">🩺 ${esc(v.extraLab)}</span><span class="v-val" style="font-size:1.02rem">${esc(v.extraVal)}</span><span class="v-unit">parametr neuro</span></div>` : ''}
      </div>`;
    }

    function renderPatientCrossBadge(patientId) {
      const map = {
        'udar-mca': { link: '#/atlas/udar/kwalifikacja', text: '📘 Atlas: Kwalifikacja rtPA / MT i tętnice mózgowe →', col: 'var(--red)', bg: 'var(--red-l)' },
        'stan-padaczkowy': { link: '#/atlas/padaczka/status', text: '📘 Atlas: Algorytm stanu padaczkowego (ILAE) →', col: 'var(--red)', bg: 'var(--red-l)' },
        'przelom-miasteniczny': { link: '#/atlas/obwodowy/lems', text: '📘 Atlas: Przełom miasteniczny, LEMS i leki zakazane →', col: 'var(--blue)', bg: 'var(--blue-l)' },
        sah: { link: '#/atlas/udar/sah', text: '📘 Atlas: Krwotok podpajęczynówkowy (SAH) i ksantochromia PMR →', col: 'var(--red)', bg: 'var(--red-l)' },
        gbs: { link: '#/atlas/obwodowy/gbs', text: '📘 Atlas: Zespół Guillaina-Barrégo (GBS) i profil PMR →', col: 'var(--blue)', bg: 'var(--blue-l)' },
        zomr: { link: '#/atlas/nagle/zomr', text: '📘 Atlas: Neuroinfekcje, kiedy TK przed LP i analiza PMR →', col: 'var(--violet)', bg: 'var(--violet-l)' }
      };
      const item = map[patientId];
      return item ? `<div style="margin-top:.6rem"><a class="chip" href="${item.link}" style="background:${item.bg};color:${item.col};font-weight:700;text-decoration:none">${item.text}</a></div>` : '';
    }

    function renderActivePatientSim(caseItem) {
      if (SIM_ACTIVE.state === 'finished') return renderPatientReport(caseItem);
      const s = caseItem.stages[SIM_ACTIVE.stageIdx];
      const isReviewed = SIM_ACTIVE.state === 'reviewed';

      main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:920px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem">
          <a class="btn sec sm" href="#/pacjent">← Wróć do listy pacjentów</a>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            <button class="btn sec sm" id="btnToggleEmergencyTray" style="font-weight:700;color:var(--red);border-color:rgba(194,59,42,0.3)">🚨 Dawki ratunkowe (${caseItem.weight} kg) ${SIM_ACTIVE.showEmergencyTray ? '▲' : '▼'}</button>
            <a class="btn sec sm" href="#/kalkulator?w=${caseItem.weight}" title="Skale NIHSS/GCS i kalkulator dawek">🧮 Skale &amp; Dawki</a>
            <a class="btn sec sm" href="#/badania" title="Moduł diagnostyki PMR, TK/MR i EEG/EMG">🔬 Diagnostyka</a>
          </div>
        </div>
        <div class="card" style="background:var(--surface);border-left:4px solid ${caseItem.domain === 'pns' ? 'var(--blue)' : 'var(--teal)'};padding:1.1rem 1.4rem">
          <div style="display:flex;gap:.5rem;align-items:center;margin-bottom:.3rem;flex-wrap:wrap"><span class="chip" style="background:var(--teal-l);color:var(--teal-d);font-weight:700;border:0">${esc(caseItem.shortTitle)}</span><span class="chip">${esc(caseItem.age)} · ${caseItem.weight} kg · ${esc(caseItem.gender)}</span></div>
          <h2 style="font-size:1.35rem;margin:.3rem 0">${esc(caseItem.title)}</h2>
          <p class="srcline" style="margin-top:.4rem;font-size:.9rem">${esc(caseItem.intro)}</p>
          ${renderPatientCrossBadge(caseItem.id)}
        </div>
        ${renderVitalsMonitor(SIM_ACTIVE.currentVitals)}
        ${SIM_ACTIVE.showEmergencyTray ? renderEmergencyDrugTray(caseItem) : ''}
        <div class="sim-steps" style="grid-template-columns:repeat(${caseItem.stages.length + 1},minmax(0,1fr))">
          ${caseItem.stages.map((st, i) => `<div class="sim-step-item ${i < SIM_ACTIVE.stageIdx ? 'done' : (i === SIM_ACTIVE.stageIdx ? 'active' : '')}"><span>${i < SIM_ACTIVE.stageIdx ? '✓' : (i + 1) + '.'}</span><span>${esc(st.name.replace(/Etap \d+:\s*/, ''))}</span></div>`).join('')}
          <div class="sim-step-item"><span>${caseItem.stages.length + 1}.</span><span>Raport</span></div>
        </div>
        <div class="card" style="padding:1.4rem">
          <div class="eyebrow">${esc(s.name)}</div>
          <h3 style="font-size:1.25rem;margin:.3rem 0 .7rem 0">${esc(s.prompt)}</h3>
          ${!isReviewed ? `
            <p class="srcline" style="margin-bottom:1rem">Zaznacz wszystkie działania wskazane w tym momencie:</p>
            <div class="action-grid" id="actionGrid">${s.options.map(opt => `<label class="sim-action-card ${SIM_ACTIVE.selectedOptionIds.has(opt.id) ? 'selected' : ''}" data-opt="${opt.id}"><input type="checkbox" ${SIM_ACTIVE.selectedOptionIds.has(opt.id) ? 'checked' : ''}><div style="flex:1"><span style="font-weight:600;font-size:.96rem">${esc(opt.text)}</span></div></label>`).join('')}</div>
            <div style="margin-top:1.4rem;display:flex;justify-content:flex-end"><button class="btn pri" id="btnSubmitStage" style="font-size:1.02rem;padding:.75rem 1.6rem">Zatwierdź działania i sprawdź reakcję pacjenta →</button></div>
          ` : `
            <div style="background:var(--bg);border-radius:10px;padding:1rem;margin-bottom:1.2rem;border:1px solid var(--line-2)"><b style="font-size:1.05rem;display:block;margin-bottom:.4rem">Ocena decyzji klinicznych w tym etapie:</b><p class="srcline">Sprawdź zgodność decyzji z wytycznymi oraz wpływ na parametry pacjenta.</p></div>
            <div class="action-grid">${s.options.map(opt => {
              const wasSel = SIM_ACTIVE.selectedOptionIds.has(opt.id);
              let cls = 'rev-neutral', badge = `<span class="chip" style="background:var(--surface);color:var(--muted)">○ Działanie neutralne (0 pkt)</span>`;
              if (opt.type === 'key') { cls = 'rev-key'; badge = wasSel ? `<span class="chip" style="background:var(--green-l);color:var(--green);font-weight:700;border:0">✓ Trafne działanie kluczowe (+${opt.points} pkt)</span>` : `<span class="chip" style="background:var(--amber-l);color:var(--amber);font-weight:700;border:0">⚠ Przeoczone działanie kluczowe (0 pkt)</span>`; }
              else if (opt.type === 'harmful') { cls = 'rev-harmful'; badge = wasSel ? `<span class="chip" style="background:var(--red-l);color:var(--red);font-weight:700;border:0">✗ Błąd sztuki / działanie szkodliwe (${opt.points} pkt)</span>` : `<span class="chip" style="background:var(--green-l);color:var(--green);font-weight:700;border:0">✓ Prawidłowo uniknięto błędu</span>`; }
              return `<div class="sim-action-card ${cls}" style="cursor:default"><div style="flex:1"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;flex-wrap:wrap;gap:.4rem">${badge}${wasSel ? '<span class="chip" style="border-color:transparent;background:var(--surface);font-weight:700">Wybrano</span>' : ''}</div><div style="font-weight:700;font-size:.96rem;margin-bottom:.3rem">${esc(opt.text)}</div><div class="srcline" style="font-size:.86rem;line-height:1.4">${esc(opt.why)}</div></div></div>`;
            }).join('')}</div>
            <div style="margin-top:1.4rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;border-top:1px solid var(--line-2);padding-top:1rem"><span style="font-weight:700;color:var(--teal)">Parametry pacjenta zostały zaktualizowane powyżej.</span><button class="btn pri" id="btnNextStage" style="font-size:1.02rem;padding:.75rem 1.6rem">${SIM_ACTIVE.stageIdx + 1 < caseItem.stages.length ? 'Przejdź do kolejnego etapu →' : 'Zobacz końcowy raport i podsumowanie →'}</button></div>
          `}
        </div>
      </div></section>`;

      const btnToggle = $('#btnToggleEmergencyTray');
      if (btnToggle) btnToggle.onclick = () => { SIM_ACTIVE.showEmergencyTray = !SIM_ACTIVE.showEmergencyTray; renderActivePatientSim(caseItem); };
      const btnClose = $('#btnCloseEmergencyTray');
      if (btnClose) btnClose.onclick = () => { SIM_ACTIVE.showEmergencyTray = false; renderActivePatientSim(caseItem); };

      if (!isReviewed) {
        const grid = $('#actionGrid');
        if (grid) {
          grid.addEventListener('click', e => {
            const card = e.target.closest('[data-opt]');
            if (!card) return;
            const cb = card.querySelector('input[type="checkbox"]');
            if (e.target !== cb) cb.checked = !cb.checked;
            if (cb.checked) { SIM_ACTIVE.selectedOptionIds.add(card.dataset.opt); card.classList.add('selected'); }
            else { SIM_ACTIVE.selectedOptionIds.delete(card.dataset.opt); card.classList.remove('selected'); }
          });
        }
        const submitBtn = $('#btnSubmitStage');
        if (submitBtn) submitBtn.onclick = () => submitPatientStage(caseItem);
      } else {
        const nextBtn = $('#btnNextStage');
        if (nextBtn) nextBtn.onclick = () => nextPatientStage(caseItem);
      }
    }

    function submitPatientStage(caseItem) {
      const s = caseItem.stages[SIM_ACTIVE.stageIdx];
      let stageScore = 0, stageMax = 0;
      s.options.forEach(opt => {
        if (opt.type === 'key') { stageMax += opt.points; if (SIM_ACTIVE.selectedOptionIds.has(opt.id)) stageScore += opt.points; }
        else if (opt.type === 'harmful' && SIM_ACTIVE.selectedOptionIds.has(opt.id)) stageScore += opt.points;
      });
      SIM_ACTIVE.score += stageScore;
      SIM_ACTIVE.maxScore += stageMax;

      if (s.vitalsDelta) {
        const v = SIM_ACTIVE.currentVitals, d = s.vitalsDelta;
        if (d.hr) v.hr = Math.max(35, Math.min(200, v.hr + d.hr));
        if (d.rr) v.rr = Math.max(8, Math.min(45, v.rr + d.rr));
        if (d.spo2) v.spo2 = Math.max(60, Math.min(100, v.spo2 + d.spo2));
        if (d.gcs) v.gcs = Math.max(3, Math.min(15, v.gcs + d.gcs));
        if (d.temp) v.temp = Math.max(34.0, Math.min(42.0, Math.round((v.temp + d.temp) * 10) / 10));
        if (d.gluc) v.gluc = Math.max(25, Math.min(600, v.gluc + d.gluc));
        if (d.bp) v.bp = d.bp;
        if (d.extraVal !== undefined) v.extraVal = d.extraVal;
        if (d.extraStatus !== undefined) v.extraStatus = d.extraStatus;
      }

      SIM_ACTIVE.history.push({ stageIdx: SIM_ACTIVE.stageIdx, selectedOptionIds: new Set(SIM_ACTIVE.selectedOptionIds), stageScore, stageMax });
      SIM_ACTIVE.state = 'reviewed';
      renderActivePatientSim(caseItem);
      const target = document.querySelector('.vitals-monitor') || document.querySelector('.sim-steps');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function nextPatientStage(caseItem) {
      if (SIM_ACTIVE.stageIdx + 1 < caseItem.stages.length) {
        SIM_ACTIVE.stageIdx++;
        SIM_ACTIVE.state = 'deciding';
        SIM_ACTIVE.selectedOptionIds = new Set();
        renderActivePatientSim(caseItem);
        const target = document.querySelector('.vitals-monitor') || document.querySelector('.sim-steps');
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        SIM_ACTIVE.state = 'finished';
        renderPatientReport(caseItem);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function renderPatientReport(caseItem) {
      const max = Math.max(1, SIM_ACTIVE.maxScore), score = Math.max(0, SIM_ACTIVE.score);
      const scorePct = Math.min(100, typeof pct === 'function' ? pct(score, max) : Math.round((score / max) * 100));
      let grade = 'Niezaliczone (błędy krytyczne)', gradeColor = 'var(--red)', gradeIcon = '❌';
      if (scorePct >= 90) { grade = 'Celujący (Dyżurny Oddziału Udarowego)'; gradeColor = 'var(--green)'; gradeIcon = '⭐'; }
      else if (scorePct >= 75) { grade = 'Bardzo dobry (Prawidłowa stabilizacja)'; gradeColor = 'var(--green)'; gradeIcon = '🟢'; }
      else if (scorePct >= 60) { grade = 'Zadowalający (Zaliczony z uwagami)'; gradeColor = 'var(--amber)'; gradeIcon = '🟡'; }

      ctx.S.patientCases = ctx.S.patientCases || {};
      const prev = ctx.S.patientCases[caseItem.id];
      ctx.S.patientCases[caseItem.id] = { bestScore: prev ? Math.max(prev.bestScore || 0, scorePct) : scorePct, lastPlayed: Date.now() };
      save();

      main.innerHTML = `<section class="blk" style="border:0"><div class="wrap" style="max-width:920px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem"><a class="btn sec sm" href="#/pacjent">← Wróć do listy pacjentów</a><span class="chip" style="font-weight:700">${esc(caseItem.shortTitle)}</span></div>
        <div class="card" style="text-align:center;padding:2.2rem 1.5rem;border-top:4px solid ${gradeColor}">
          <div style="font-size:2.8rem;margin-bottom:.4rem">${gradeIcon}</div>
          <h2 style="font-size:1.8rem;margin-bottom:.4rem;font-family:var(--font-display)">Twój wynik: ${scorePct}% (${score}/${max} pkt)</h2>
          <b style="font-size:1.15rem;color:${gradeColor}">${grade}</b>
          <p class="srcline" style="max-width:600px;margin:1rem auto 0 auto">${scorePct >= 75
            ? 'Świetna decyzja kliniczna! Zastosowałeś aktualne wytyczne neurologicznego SOR i bezpiecznie ustabilizowałeś chorego.'
            : 'Przeanalizuj przeoczone działania kluczowe oraz czerwone karty błędów krytycznych — w neurologii czas i kolejność leków decydują o rokowaniu.'}</p>
          <div style="display:flex;gap:.8rem;justify-content:center;margin-top:1.6rem;flex-wrap:wrap">
            <button class="btn pri" id="btnExportPatientNote">📋 Zapisz kartę pacjenta do Notatnika</button>
            <button class="btn sec" id="btnRestartPatient">🔄 Powtórz ten przypadek</button>
            <a class="btn sec" href="#/pacjent">🩺 Wybierz innego pacjenta</a>
          </div>
        </div>
        <div class="card" style="margin-top:1.5rem;padding:1.6rem">
          <div class="eyebrow">Karta wypisowa i podsumowanie merytoryczne</div>
          <h3 style="font-size:1.35rem;margin:.4rem 0 .8rem 0">${esc(caseItem.debrief.diagnosis)} (${esc(caseItem.debrief.code)})</h3>
          <p class="srcline" style="margin-bottom:1.2rem"><b>Etiologia:</b> ${esc(caseItem.debrief.etiology)}</p>
          <div style="background:var(--bg);padding:1.1rem 1.3rem;border-radius:10px;margin-bottom:1.4rem;border:1px solid var(--line-2)">
            <b style="font-size:1.05rem;color:var(--teal-d);display:block;margin-bottom:.6rem">💡 Złote zasady egzaminacyjne (Sylabus PUM &amp; Wytyczne):</b>
            <ul style="margin:0;padding-left:1.2rem;display:flex;flex-direction:column;gap:.4rem">${caseItem.debrief.keyRules.map(r => `<li style="font-size:.94rem">${esc(r)}</li>`).join('')}</ul>
          </div>
          <div class="tip" style="margin:0"><h4>Perła kliniczna ostrego dyżuru</h4><p>${esc(caseItem.debrief.pearls)}</p></div>
        </div>
      </div></section>`;

      $('#btnRestartPatient').onclick = () => { startPatientSim(caseItem); renderActivePatientSim(caseItem); };
      $('#btnExportPatientNote').onclick = () => {
        const md = [
          `# Raport kliniczny (Neurologia SOR): ${caseItem.shortTitle}`,
          `**Rozpoznanie:** ${caseItem.debrief.diagnosis} (${caseItem.debrief.code})`,
          `**Data symulacji:** ${new Date().toLocaleString('pl-PL')}`,
          `**Pacjent:** ${caseItem.age}, masa ciała: ${caseItem.weight} kg, płeć: ${caseItem.gender}`,
          `**Wynik postępowania:** ${scorePct}% (${score}/${max} pkt) – ${grade}`,
          '', '---', '### Wyjściowe parametry życiowe:',
          `- HR: ${caseItem.vitalsInitial.hr}/min · SpO2: ${caseItem.vitalsInitial.spo2}% · RR: ${caseItem.vitalsInitial.rr}/min`,
          `- BP: ${caseItem.vitalsInitial.bp} mmHg · Temp: ${caseItem.vitalsInitial.temp}°C · GCS: ${caseItem.vitalsInitial.gcs}/15 · Glikemia: ${caseItem.vitalsInitial.gluc} mg/dl`,
          '', '---', '### Złote reguły i kluczowe wnioski:',
          ...caseItem.debrief.keyRules.map(r => `- ${r}`),
          '', '**Perła kliniczna:**', `> ${caseItem.debrief.pearls}`
        ].join('\n');

        const notes = Array.isArray(getNotes()) ? getNotes() : [];
        notes.unshift({ id: 'note_' + Date.now(), title: `SOR Neuro: ${caseItem.shortTitle} (${scorePct}%)`, content: md, body: md, updatedAt: Date.now(), updated: Date.now() });
        saveNotes(notes);
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(() => {});
        toast('Zapisano kartę pacjenta w Notatniku i skopiowano do schowka!');
      };
    }

    return { viewPatient, cases: PATIENT_CASES, getVitalStatus, renderPatientCaseList };
  };
})();
