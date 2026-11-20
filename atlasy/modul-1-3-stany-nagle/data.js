/* Bank zadań modułów [1] i [3]: Stany nagłe w neurologii i zaburzenia świadomości */
window.ATLAS_TOPICS = {
  swiad: 'Świadomość i skale',
  icp: 'ICP i wgłobienia',
  zomr: 'Neuroinfekcje (ZOMR)',
  uraz: 'Urazy i zatrucia'
};

window.ATLAS_Q = [
  {
    t: 'swiad',
    mod: '3',
    stem: 'Pacjent po ostrym incydencie naczyniowym w obrębie pnia mózgu leży z porażeniem czterokończynowym, nie mówi i nie wykonuje ruchów mimicznych, ale zachowuje pełną świadomość i odpowiada na pytania poprzez pionowe ruchy gałek ocznych oraz mruganie. Wskaż najbardziej prawdopodobną lokalizację uszkodzenia oraz skalę dokładniejszą od GCS w tym stanie:',
    o: [
      'Brzuszna część mostu (zespół zamknięcia, locked-in syndrome); skala FOUR',
      'Obustronne uszkodzenie kory przedczołowej; skala NIHSS',
      'Rozlane uszkodzenie tworu siatkowatego śródmózgowia (ARAS); skala GCS',
      'Obustronne uszkodzenie móżdżku; skala Fishera',
      'Izolowane uszkodzenie nerwu błędnego (X); skala Hunt-Hessa'
    ],
    k: 0,
    c: 'src',
    s: 'Sylabus PUM · TK02 / Podemski',
    why: 'Zespół zamknięcia (locked-in) wynika najczęściej z zawału brzusznej części mostu (niedrożność tętnicy podstawnej) uszkadzającego drogi korowo-rdzeniowe i korowo-jądrowe przy zaoszczędzeniu nakrywki pnia i układu ARAS. Zachowana jest pełna świadomość oraz pionowe ruchy gałek ocznych i mruganie. Skala FOUR aktywnie testuje mruganie i pionowe ruchy oczu, dzięki czemu nie zaniża stanu chorego jak klasyczna skala GCS.',
    tip: 'Zawsze weryfikuj pionowe ruchy oczu i mruganie u pozornie nieprzytomnego pacjenta – pozwala to odróżnić zespół zamknięcia od śpiączki i stanu wegetatywnego.'
  },
  {
    t: 'icp',
    mod: '1',
    stem: 'U 62-letniego chorego z guzem prawej półkuli mózgu doszło do gwałtownego pogorszenia świadomości, poszerzenia i braku reakcji na światło prawej źrenicy (anizokorii), narastającego nadciśnienia tętniczego (200/110 mmHg), bradykardii (42/min) i nieregularnego oddechu. Który zespół kliniczny rozpoznajesz?',
    o: [
      'Wgłobienie pod sierp mózgu z uciskiem tętnicy przedniej mózgu',
      'Wgłobienie haka zakrętu przyhipokampowego z uciskiem prawego nerwu III i zagrażającym wgłobieniem pnia (triada Cushinga)',
      'Zespół Hornera po stronie lewej w przebiegu rozwarstwienia tętnicy szyjnej',
      'Izolowane porażenie nerwu odwodzącego (n. VI) bez zagrożenia pnia mózgu'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM · TK01, U05 / Fuller',
    why: 'Jednostronne rozszerzenie źrenicy po stronie zmiany wynika z ucisku powierzchownych włókien przywspółczulnych nerwu okoruchowego (n. III) przez przemieszczający się hak zakrętu przyhipokampowego (wgłobienie podnamiotowe / wcięcia namiotu). Współistnienie nadciśnienia tętniczego, bradykardii i zaburzeń oddechu tworzy triadę Cushinga – późny alarm zagrażającego wgłobienia pnia mózgu.',
    tip: 'Porażenie n. III (szeroka, sztywna źrenica) jest zazwyczaj tożstronne do krwiaka/guza, natomiast przeciwległy niedowład bywa czasem tożstronny w mechanizmie wcięcia Kernohana.'
  },
  {
    t: 'icp',
    mod: '1',
    stem: 'Mężczyzna po ciężkim urazie czaszkowo-mózgowym (GCS 6 pkt) ma objawy narastającego wzmożonego ciśnienia śródczaszkowego (ICP 28 mmHg). Który zestaw działań w ramach wstępnej stabilizacji jest PRAWIDŁOWY?',
    o: [
      'Natychmiastowe podanie wysokich dawek deksametazonu i.v. w celu zmniejszenia obrzęku pourazowego',
      'Ułożenie w pozycji Trendelenburga i przewlekła hiperwentylacja do PaCO₂ < 25 mmHg przez 24 godziny',
      'Uniesienie wezgłowia łóżka o 30° w osi pośrodkowej, intubacja z utrzymaniem normokapni (PaCO₂ 35–40 mmHg) oraz terapia hiperosmolarna (mannitol lub hipertoniczny NaCl)',
      'Szybki wlew dożylny 5% roztworu glukozy jako płynu hipotonicznego',
      'Natychmiastowe nakłucie lędźwiowe w celu odbarczenia przestrzeni płynowych'
    ],
    k: 2,
    c: 'inf',
    s: 'Wytyczne Brain Trauma Foundation / Sylabus U05',
    why: 'Redukcję ICP rozpoczyna się od uniesienia wezgłowia o 30° w linii pośrodkowej (usprawnienie odpływu żylnego), zabezpieczenia dróg oddechowych przy GCS ≤ 8 z utrzymaniem normokapni (krótkotrwała hiperwentylacja 30–35 mmHg tylko doraźnie przy aktywnym wgłobieniu) oraz podania mannitolu 20% lub hipertonicznego NaCl. Płyny hipotoniczne i punkcja lędźwiowa są przeciwwskazane.',
    tip: 'Zapamiętaj rozróżnienie steroidów: deksametazon działa na obrzęk naczyniopochodny (guz, ropień), NIE na uraz mózgu ani udar.',
    gap: {
      pool: 'W starszych materiałach glikokortykosteroidy bywały wymieniane ogólnie jako leki przeciwobrzękowe w OUN.',
      now: 'Wg wytycznych Brain Trauma Foundation oraz badania CRASH steroidy są przeciwwskazane w urazie czaszkowo-mózgowym (zwiększają śmiertelność); stosuje się wyłącznie terapię hiperosmolarną (mannitol, HTS).'
    }
  },
  {
    t: 'zomr',
    mod: '1',
    stem: '58-letni chory został przyjęty na SOR z gorączką 39,2°C, silnym bólem głowy, sztywnością karku, zaburzeniami świadomości (GCS 11 pkt) i świeżym niedowładem prawostronnym. Który schemat postępowania jest PRAWIDŁOWY?',
    o: [
      'Natychmiastowa punkcja lędźwiowa bez badania obrazowego, a włączenie antybiotyku dopiero po wyniku preparatu bezpośredniego PMR',
      'Pobranie posiewów krwi, natychmiastowe podanie deksametazonu i antybiotykoterapii empirycznej i.v. (ceftriakson + wankomycyna + ampicylina), a następnie wykonanie TK głowy przed ewentualną punkcją lędźwiową',
      'Wykonanie TK głowy i odczekanie z wdrożeniem antybiotyku aż do uzyskania pełnej analizy PMR po punkcji',
      'Zastosowanie wyłącznie acyklowiru i obserwacja przez 12 godzin bez antybiotyku'
    ],
    k: 1,
    c: 'inf',
    s: 'Wytyczne ESCMID / IDSA · Sylabus U06',
    why: 'Zaburzenia świadomości (GCS < 12) oraz objawy ogniskowe (niedowład) stanowią wskazanie do TK głowy przed punkcją lędźwiową w celu wykluczenia efektu masy i ryzyka wgłobienia. Nie wolno jednak opóźniać leczenia: przed transportem na TK pobiera się posiewy krwi i natychmiast podaje deksametazon oraz antybiotyki empiryczne (u chorych > 50 r.ż. zawsze z ampicyliną przeciwko Listeria monocytogenes).',
    tip: 'Złota reguła SOR przy podejrzeniu ropnego ZOMR: posiew krwi + deksametazon + antybiotyk PRZED TK głowy.',
    gap: {
      pool: 'W części schematów podręcznikowych kolejność opisywano jako „punkcja lędźwiowa w celu rozpoznania → antybiotykoterapia”.',
      now: 'Aktualne wytyczne ESCMID/IDSA nakazują natychmiastowe podanie deksametazonu i antybiotyku i.v. przed wykonaniem TK głowy i LP u każdego pacjenta ze wskazaniami do neuroobrazowania przed punkcją.'
    }
  },
  {
    t: 'zomr',
    mod: '1',
    stem: 'U pacjenta z gorączką, bólami głowy, zaburzeniami zachowania i napadem padaczkowym wykonano nakłucie lędźwiowe: płyn wodojasny, cytoza 135 komórek/µl (90% limfocyty), białko 76 mg/dl, stężenie glukozy w PMR prawidłowe (65% glikemii). Jakie rozpoznanie i natychmiastowe leczenie jest najbardziej wskazane?',
    o: [
      'Bakteryjne ropne ZOMR — włączenie wyłącznie cefazoliny',
      'Gruźlicze ZOMR — typowo prawidłowa glukoza i neutrofilia w PMR',
      'Zespół Guillaina-Barrégo — rozszczepienie białkowo-komórkowe',
      'Podejrzenie opryszczkowego zapalenia mózgu (HSV-1) — natychmiastowe włączenie acyklowiru i.v. (10 mg/kg co 8 h) bez czekania na wynik PCR oraz pilne MRI mózgu'
    ],
    k: 3,
    c: 'did',
    s: 'Sylabus PUM · U06, W03i / Kozubski',
    why: 'Limfocytarna pleocytoza z umiarkowanie podwyższonym białkiem i prawidłowym stężeniem glukozy w PMR przemawia za infekcją wirusową, a współistnienie objawów uszkodzenia miąższu mózgu (zaburzenia zachowania, świadomości, napady padaczkowe) nakazuje natychmiastowe podejrzenie zapalenia mózgu HSV-1. Acyklowir i.v. trzeba włączyć natychmiast, nie czekając na wynik PCR ani MRI (zmiany w płatach skroniowych).',
    tip: 'Samo wirusowe ZOMR nie daje objawów ogniskowych ani zaburzeń świadomości – ich obecność oznacza zapalenie mózgu (encephalitis) i wymusza natychmiastowy acyklowir!'
  },
  {
    t: 'uraz',
    mod: '1',
    stem: '28-letni mężczyzna po uderzeniu w okolicę skroniową na boisku stracił przytomność na 2 minuty, po czym odzyskał pełny kontakt („przejaśnienie świadomości”), a po 3 godzinach stał się gwałtownie senny i rozwinął poszerzenie lewej źrenicy. Jaki obraz w TK głowy bez kontrastu jest najbardziej typowy?',
    o: [
      'Sierpowata (wklęsło-wypukła) przestrzeń hiperdensyjna przekraczająca szwy czaszki, ale ograniczona sierpem mózgu',
      'Dwuwypukła (soczewkowata) masa hiperdensyjna nieprzekraczająca szwów czaszki, typowa dla krwawienia z tętnicy oponowej środkowej',
      'Symetryczne hiperdensyjne wypełnienie zbiorników podstawy mózgu i szczeliny Sylwiusza',
      'Prawidłowy obraz TK wykluczający ostry krwiak wewnątrzczaszkowy'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM · U07 / Podemski, Stępień',
    why: 'Krótka utrata przytomności, okres przejaśnienia świadomości (lucid interval) i wtórne szybkie pogorszenie po urazie okolicy skroniowej to klasyczny obraz ostrego krwiaka nadtwardówkowego (EDH) z uszkodzonej tętnicy oponowej środkowej. W TK przybiera kształt dwuwypukłej soczewki i nie przekracza szwów czaszki, ponieważ opona twarda jest do nich silnie przyrośnięta.',
    tip: 'Pamiętaj parę przeciwieństw: EDH = tętniczy, dwuwypukły, NIE przekracza szwów; SDH = żylny (żyły mostkowe), sierpowaty, PRZEKRACZA szwy.'
  },
  {
    t: 'uraz',
    mod: '3',
    stem: 'Do SOR przywieziono nieprzytomnego (GCS 7 pkt) 49-letniego mężczyznę z wywiadem przewlekłego alkoholizmu i wyniszczenia. Glikemia przyłóżkowa wynosi 31 mg/dl. Które postępowanie jest OBOWIĄZKOWE podczas wyrównywania hipoglikemii?',
    o: [
      'Podanie bolusowe flumazenilu przed wlewem glukozy',
      'Wykonanie nakłucia lędźwiowego przed wyrównaniem glikemii',
      'Podanie tiaminy (witaminy B1) i.v. przed lub równocześnie z roztworem glukozy dla zapobieżenia encefalopatii Wernickego',
      'Zastosowanie naloksonu w pierwszej kolejności bez wlewu glukozy'
    ],
    k: 2,
    c: 'did',
    s: 'Sylabus PUM · TK02, U03 / Fuller',
    why: 'U chorych niedożywionych lub uzależnionych od alkoholu zapasy witaminy B1 są wyczerpane. Dożylne podanie samej glukozy zużywa resztki tiaminy jako kofaktora przemian węglowodanowych i może wywołać ostrą encefalopatię Wernickego (zaburzenia gałkoruchowe, ataksja, ciężkie zaburzenia świadomości). Ponadto u upojonego pacjenta z GCS ≤ 8 należy zawsze wykluczyć ukryty uraz głowy i krwiak podtwardówkowy.',
    tip: 'W stanach nagłych neurologicznych glikemię oznacza się natychmiast, a u wyniszczonego/alkoholika kolejność brzmi: najpierw lub równocześnie tiamina (B1), potem glukoza.'
  }
];
