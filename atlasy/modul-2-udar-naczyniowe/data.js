/* Bank zadań modułu [2] Choroby naczyniowe mózgu i udar. */
/* c: 'src' = potwierdzone wytycznymi/sylabusem, 'inf' = wnioskowane, 'did' = dydaktyczne PUM, 'unk' = niepewne */
window.ATLAS_TOPICS = {
  tetnice: 'Tętnice mózgowe',
  reperfuzja: 'Kwalifikacja rtPA/MT',
  leczenie: 'Postępowanie i ICH',
  sah: 'SAH i zatoki'
};

window.ATLAS_Q = [
  {
    t: 'tetnice',
    mod: '2',
    stem: '64-letni mężczyzna doznał nagłego osłabienia głównie prawej kończyny dolnej (siła w kończynie górnej 4+/5, w dolnej 1/5), nietrzymania moczu oraz wyraźnej apatii i spowolnienia napędu (abulia). Które naczynie uległo najpewniej zamknięciu?',
    o: [
      'Lewa tętnica środkowa mózgu (MCA)',
      'Lewa tętnica przednia mózgu (ACA)',
      'Lewa tętnica tylna mózgu (PCA)',
      'Tętnica podstawna (BA)',
      'Lewa tętnica móżdżkowa dolna tylna (PICA)'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03b · Wskazówka #5 · Podemski',
    why: 'Tętnica przednia mózgu (ACA) zaopatruje przyśrodkową powierzchnię płata czołowego i ciemieniowego — reprezentację korową kończyny dolnej oraz płat czołowy przyśrodkowy (napęd, kontrola mikcji). Stąd przeciwstronny niedowład kończyny dolnej > górnej, abulia, nietrzymanie moczu i odruch chwytny.',
    tip: 'Wskazówka PUM #5: ACA = noga > ręka + abulia; MCA = twarz i ręka > noga + afazja / zespół zaniedbywania; PCA = hemianopsja jednoimienna.'
  },
  {
    t: 'tetnice',
    mod: '2',
    stem: '59-letni chory z nagłymi zawrotami głowy, nudnościami, dysfagią, chrypką oraz ataksją lewej ręki. W badaniu stwierdzono lewostronny zespół Hornera, zniesienie czucia bólu i temperatury na lewej połowie twarzy oraz na prawych kończynach i tułowiu, przy prawidłowej sile mięśniowej wszystkich kończyn. Rozpoznanie to:',
    o: [
      'Zespół Webera (śródmózgowie)',
      'Zespół boczny opuszki (Wallenberga) — zamknięcie PICA / tętnicy kręgowej',
      'Zespół zamknięcia (locked-in) w zakrzepicy tętnicy podstawnej',
      'Udar lakunarny w odnodze tylnej torebki wewnętrznej',
      'Zawał w zakresie tętnicy tylnej mózgu (PCA)'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03b · Wskazówka #5 · Fuller',
    why: 'Zespół Wallenberga (niedrożność PICA lub tętnicy kręgowej) obejmuje boczną część opuszki: jądro dwuznaczne (IX/X — dysfagia, chrypka), drogę zstępującą współczulną (Horner po tej samej stronie), konar móżdżku dolny (ipsilateralna ataksja), jądro rdzeniowe n. V (czucie bólu/temp. po stronie ogniska na twarzy) i drogę rdzeniowo-wzgórzową (przeciwstronne kończyny). Piramidy leżą przyśrodkowo, dlatego brak niedowładu kończyn.',
    tip: 'Zespół Wallenberga = zespół skrzyżowany BEZ niedowładu piramidowego kończyn.'
  },
  {
    t: 'reperfuzja',
    mod: '2',
    stem: '71-letnia kobieta przywieziona na SOR po 95 minutach od nagłego wystąpienia afazji ruchowej i niedowładu połowiczego prawego (NIHSS 11 pkt). Glikemia 112 mg/dl, RR 172/92 mmHg, nie przyjmuje antykoagulantów. W pilnym TK głowy bez kontrastu nie uwidoczniono krwawienia ani wyraźnego ogniska niedokrwiennego. Prawidłowe postępowanie to:',
    o: [
      'Powtórzyć TK głowy za 24 h i włączyć alteplazę dopiero po pojawieniu się hipodensji',
      'Rozpoznanie przemijającego ataku niedokrwiennego (TIA) i podanie 300 mg ASA p.o.',
      'Natychmiastowe włączenie trombolizy i.v. (rtPA 0,9 mg/kg) oraz pilne angio-TK pod kątem trombektomii mechanicznej',
      'Odroczyć leczenie reperfuzyjne do czasu wykonania punkcji lędźwiowej',
      'Obniżyć ciśnienie skurczowe poniżej 130 mmHg przed decyzją o leczeniu'
    ],
    k: 2,
    c: 'src',
    s: 'Sylabus PUM Ćw TK07 · Wskazówka #6 · ESO',
    why: 'W pierwszych godzinach udaru niedokrwiennego TK głowy bez kontrastu bywa prawidłowe — jego głównym zadaniem jest wykluczenie krwotoku śródmózgowego przed trombolizą. Przy czasie ≤4,5 h, RR <185/110 mmHg i braku przeciwwskazań należy natychmiast rozpocząć rtPA i równolegle wykonać angio-TK (okluzja LVO = wskazanie do MT).',
    tip: 'Wskazówka PUM #6: Prawidłowe wczesne TK głowy NIE wyklucza udaru — przeciwnie, po wykluczeniu krwawienia kwalifikuje do rtPA.',
    gap: {
      pool: 'Klasycznie w puli testowej: alteplaza (rtPA) 0,9 mg/kg i.v. (max 90 mg) podawana w oknie czasowym ≤4,5 h przy znanym czasie zachorowania.',
      now: 'Wytyczne ESO (2023) dopuszczają tenekteplazę (TNK) 0,25 mg/kg (max 25 mg) w pojedynczym bolusie i.v. jako alternatywę dla rtPA, a w udarach o nieznanym czasie / po przebudzeniu (wake-up stroke) lub w oknie 4,5–9 h pozwalają na kwalifikację na podstawie DWI-FLAIR mismatch lub perfuzji TK/MRI.'
    }
  },
  {
    t: 'reperfuzja',
    mod: '2',
    stem: '66-letni chory w 2. godzinie ostrego udaru niedokrwiennego (NIHSS 16 pkt) ma wykluczony krwotok w TK głowy, bez innych przeciwwskazań do rtPA, lecz jego RR wynosi 198/108 mmHg. Po podaniu labetalolu i.v. ciśnienie spada do 176/98 mmHg, a angio-TK wykazuje okluzję odcinka M1 prawej MCA. Co należy zrobić?',
    o: [
      'Podać alteplazę i.v. i poczekać 60 minut na poprawę przed decyzją o trombektomii',
      'Zrezygnować z alteplazy z powodu wcześniejszego RR >185/110 mmHg i zastosować wyłącznie ASA',
      'Podać alteplazę i.v. i niezwłocznie przekazać chorego na trombektomię mechaniczną (MT), utrzymując RR <180/105 mmHg',
      'Zastosować dożylną heparynę niefrakcjonowaną i obserwację na sali udarowej',
      'Obniżyć RR poniżej 120/80 mmHg przed zabiegiem wewnątrznaczyniowym'
    ],
    k: 2,
    c: 'inf',
    s: 'Sylabus PUM Ćw TK07 · Wskazówka #6 · ESO/AHA',
    why: 'Jeżeli RR uda się bezpiecznie obniżyć lekami i.v. poniżej 185/110 mmHg przed wlewem i utrzymywać <180/105 mmHg przez 24 h, tromboliza dożylna jest wskazana. Przy potwierdzonej okluzji dużego naczynia (ICA/M1) chorego kwalifikuje się natychmiast do trombektomii mechanicznej bez czekania na efekt kliniczny rtPA.',
    tip: 'Nie czekaj na efekt rtPA przed wysłaniem chorego z LVO na pracownię hemodynamiki / radiologii zabiegowej.',
    gap: {
      pool: 'Standardowa kwalifikacja egzaminacyjna do MT: okluzja dużego naczynia przedniego krążenia (ICA, M1) do 6 h od początku objawów przy niewielkich zmianach wczesnych (ASPECTS ≥6).',
      now: 'Aktualne wytyczne rozszerzają okno MT do 6–24 h przy zachowanej penumbrze w badaniu perfuzyjnym (DAWN/DEFUSE-3), dopuszczają MT w wybranych udarach z rozległym ogniskiem pierwotnym (ASPECTS 3–5) oraz w niedrożności tętnicy podstawnej (BA) do 24 h.'
    }
  },
  {
    t: 'leczenie',
    mod: '2',
    stem: '74-letni mężczyzna przewlekle leczony warfaryną z powodu migotania przedsionków (INR 3,2) doznał gwałtownego bólu głowy, wymiotów i lewostronnego niedowładu. W TK głowy świeży krwiak w obrębie prawej skorupy, RR 196/104 mmHg. Które postępowanie w pierwszej godzinie jest najwłaściwsze?',
    o: [
      'Obserwacja i powolna normalizacja INR samą witaminą K p.o. w ciągu 48 h',
      'Pilne obniżenie skurczowego RR do 130–140 mmHg i.v. oraz podanie koncentratu 4F-PCC i witaminy K 10 mg i.v.',
      'Podanie świeżo mrożonego osocza (FFP) jako jedynego leku i utrzymywanie RR >180 mmHg',
      'Natychmiastowe wdrożenie mannitolu i deksametazonu w dużej dawce jako leczenia rutynowego',
      'Podanie idarucyzumabu i.v. oraz klopidogrelu'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM W03b · Wytyczne ESO ICH / INTERACT3',
    why: 'W ostrym krwotoku śródmózgowym (ICH) po VKA (INR >1,4) konieczne jest natychmiastowe odwrócenie antykoagulacji za pomocą koncentratu czynników zespołu protrombiny (4F-PCC) w połączeniu z witaminą K 10 mg i.v. oraz kontrolowane obniżenie SBP do 130–140 mmHg (labetalol/urapidyl). Idarucyzumab odwraca dabigatran, nie warfarynę; GKS są w udarze niezalecane.',
    tip: 'Pamiętaj dopasowanie odtrutek: VKA → 4F-PCC + wit. K; dabigatran → idarucyzumab; rywaroksaban/apiksaban → andeksanet alfa lub 4F-PCC.',
    gap: {
      pool: 'W starszych opracowaniach testowych jako sposób odwracania VKA podawano świeżo mrożone osocze (FFP) z witaminą K oraz bardziej liberalny cel ciśnienia (<160–180 mmHg).',
      now: 'Aktualne wytyczne ESO i AHA zalecają pakiet opieki (care bundle): szybkie obniżenie SBP do 130–140 mmHg (bez gwałtownego spadku >90 mmHg/h) oraz preferencyjnie 4F-PCC + witamina K i.v. zamiast FFP.'
    }
  },
  {
    t: 'leczenie',
    mod: '2',
    stem: '69-letni chory z udarem niedokrwiennym prawej półkuli mózgu zgłosił się w 14. godzinie od zachorowania (poza oknem do rtPA, bez okluzji dużego naczynia w angio-TK). W TK wykluczono krwotok, RR wynosi 204/106 mmHg, bez objawów rozwarstwienia aorty, zawału serca czy obrzęku płuc. Jakie jest właściwe postępowanie?',
    o: [
      'Gwałtowne obniżenie RR poniżej 140/90 mmHg kaptoprylem lub nifedypiną podjęzykowo',
      'Włączenie ASA 150–300 mg oraz niefarmakologiczne/ostrożne utrzymanie obecnego RR (nie obniżać rutynowo poniżej 220/120 mmHg)',
      'Podanie pełnej dawki enoksaparyny s.c. 2× dziennie od razu na SOR',
      'Włączenie alteplazy w zmniejszonej dawce 0,6 mg/kg',
      'Natychmiastowa trepanacja odbarczająca'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM W03b · Stępień · Kozubski',
    why: 'U chorych z udarem niedokrwiennym niekwalifikujących się do reperfuzji (rtPA/MT) obowiązuje zasada hipotensji permisywnej — w strefie penumbry autoregulacja mózgowa jest upośledzona i ciśnienie perfuzyjne zależy od RR systemowego. Nie obniża się RR, jeśli nie przekracza 220/120 mmHg (chyba że występują ostre powikłania narządowe). Po wykluczeniu krwotoku włącza się ASA.',
    tip: 'Zapamiętaj dwa progi ciśnienia w udarze niedokrwiennym: Z rtPA <185/110 mmHg; BEZ rtPA <220/120 mmHg!'
  },
  {
    t: 'sah',
    mod: '2',
    stem: '38-letnia kobieta zgłasza się z powodu nagłego, piorunującego bólu głowy („najsilniejszego w życiu”), który pojawił się 14 godzin wcześniej podczas wysiłku. W badaniu przytomna, bez niedowładu, niewielka sztywność karku. Pilne TK głowy bez kontrastu nie wykazuje krwi. Który krok jest obowiązkowy?',
    o: [
      'Wypisanie do domu z rozpoznaniem pierwszego napadu migreny i NLPZ',
      'Wykonanie nakłucia lędźwiowego z oceną ksantochromii PMR (oraz angio-TK / wenografii przy utrzymującym się podejrzeniu)',
      'Natychmiastowe włączenie kwasu acetylosalicylowego 300 mg',
      'Powtórzenie samego TK bez kontrastu za 7 dni',
      'Podanie sumatryptanu s.c. jako testu diagnostycznego'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03b · Stępień · Wytyczne SAH',
    why: 'Czułość TK głowy bez kontrastu w krwotoku podpajęczynówkowym (SAH) jest bliska 100% jedynie w pierwszych 6 godzinach, po czym maleje. Przy typowym wywiadzie piorunującego bólu głowy i ujemnym TK po >6–12 h obowiązkowe jest nakłucie lędźwiowe na obecność ksantochromii (rozkład hemoglobiny do bilirubiny) oraz diagnostyka naczyniowa (angio-TK/DSA w kierunku tętniaka lub MRV/CTV w kierunku CVST).',
    tip: 'Po potwierdzeniu SAH włącz profilaktycznie nimodypinę 60 mg p.o. co 4 h na 21 dni i zabezpiecz tętniak.',
    gap: {
      pool: 'W starszych podręcznikach w zapobieganiu i leczeniu skurczu naczyniowego po SAH opisywano terapię „triple-H” (hiperwolemia, hipertensja, hemodylucja).',
      now: 'Współczesne wytyczne odrzucają hiperwolemię i hemodylucję (powikłania płucne i obrzękowe): zalecają ścisłą normowolemię, doustną nimodypinę 60 mg co 4 h przez 21 dni oraz jedynie kontrolowaną indukowaną hipertensję przy objawowym opóźnionym niedokrwieniu (DCI) po zabezpieczeniu tętniaka.'
    }
  }
];
