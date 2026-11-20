/* Bank zadań modułu [13]: Guzy ośrodkowego układu nerwowego (mózg i rdzeń kręgowy) */
window.ATLAS_TOPICS = {
  icp: 'Lokalizacja i ICP',
  ognisko: 'Objawy ogniskowe',
  typy: 'Typy guzów i MRI',
  rdzen: 'Guzy rdzenia i leczenie'
};

window.ATLAS_Q = [
  {
    t: 'icp',
    mod: '13',
    stem: '57-letni mężczyzna zgłasza się z powodu pierwszego w życiu uogólnionego napadu padaczkowego oraz narastającego od 4 tygodni porannego bólu głowy nasilającego się przy kaszlu i pochylaniu. W badaniu dna oka stwierdzono obustronny obrzęk tarcz nerwów wzrokowych (tarczę zastoinową). Które działanie jest w tym momencie BEZWZGLĘDNIE PRZECIWWSKAZANE?',
    o: [
      'Wykonanie pilnego badania MRI mózgu przed i po podaniu gadolinu (lub TK głowy w trybie dyżurowym)',
      'Natychmiastowe wykonanie diagnostycznego nakłucia lędźwiowego (LP) przed badaniami obrazowymi',
      'Włączenie leku przeciwpadaczkowego bez indukcji CYP450 (np. lewetyracetamu) po pierwszym napadzie objawowym',
      'Zastosowanie deksametazonu w przypadku uwidocznienia guza z rozległym obrzękiem naczyniopochodnym',
      'Zebranie wywiadu onkologicznego i ocena pod kątem ogniska pierwotnego (m.in. RTG/TK klatki piersiowej)'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM · Sem TK05, Ćw TK09 / Podemski, Fuller',
    why: 'Obecność tarczy zastoinowej, porannych bólów głowy nasilanych kaszlem (wzrost ICP) oraz pierwszego napadu padaczkowego po 40. r.ż. nakazuje podejrzenie guza mózgu z efektem masy. Nakłucie lędźwiowe przed wykluczeniem ciasnoty wewnątrzczaszkowej grozi gwałtownym wgłobieniem migdałków móżdżku w otwór wielki i zgonem.',
    tip: 'Złota reguła PUM: tarcza zastoinowa lub objawy ogniskowe = ZAKAZ nakłucia lędźwiowego do czasu wykluczenia guza i efektu masy w TK/MRI.'
  },
  {
    t: 'ognisko',
    mod: '13',
    stem: '46-letnia pacjentka skarży się na narastające od kilku miesięcy zawężenie bocznych pól widzenia („potrącanie futryn po obu stronach”), poranne bóle głowy, mlekotok oraz wtórny brak miesiączki. W badaniu perymetrycznym stwierdzono niedowidzenie połowicze dwuskroniowe (hemianopsję bitemporalną). Które rozpoznanie i postępowanie jest najbardziej trafne?',
    o: [
      'Oponiak rynienki węchowej uciskający nerwy węchowe (zespół Foster-Kennedy’ego)',
      'Makrogruczolak przysadki uciskający skrzyżowanie wzrokowe od dołu; w przypadku prolaktynomy leczeniem z wyboru są agoniści dopaminy (np. kabergolina)',
      'Glejak płata potylicznego powodujący jednoimienne niedowidzenie z zaoszczędzeniem plamki',
      'Nerwiak nerwu VIII zajmujący kąt mostowo-móżdżkowy i nerw trójdzielny',
      'Przerzut do płata skroniowego uszkadzający pętlę Meyera (kwadrantopsja górna jednoimienna)'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM · TK05 / Stępień, Kozubski',
    why: 'Ucisk skrzyżowania wzrokowego (chiasma opticum) przez rozrastający się ku górze gruczolak przysadki uszkadza skrzyżowane włókna z nosowych połów siatkówek, co daje heteronimiczną hemianopsję dwuskroniową (często zaczynającą się od górnych kwadrantów). Współistnienie mlekotoku i braku miesiączki wskazuje na guz prolaktynowy (prolactinoma) — jedyny gruczolak przysadki leczony standardowo farmakologicznie agonistami dopaminy.',
    tip: 'Zapamiętaj parę: skrzyżowanie wzrokowe = hemianopsja dwuskroniowa (różnoimienna); pasmo wzrokowe / promienistość / kora potyliczna = hemianopsja jednoimienna.'
  },
  {
    t: 'ognisko',
    mod: '13',
    stem: '54-letni mężczyzna zgłasza się z powodu postępującego od 2 lat jednostronnego niedosłuchu odbiorczego i szumów usznych w uchu prawym. W badaniu neurologicznym stwierdza się ponadto osłabienie prawego odruchu rogówkowego, dyskretną asymetrię twarzy oraz łagodną ataksję prawej ręki. Gdzie zlokalizowany jest guz i jaki jest najczęstszy typ histologiczny w tym miejscu?',
    o: [
      'Szczelina oczodołowa górna — oponiak skrzydła kości klinowej (nn. III, IV, VI, V1)',
      'Prawy kąt mostowo-móżdżkowy — osłoniak przedsionkowy (nerwiak nerwu VIII)',
      'Okolica szyszynki — rozrodczak z zespołem Parinauda (porażenie spojrzenia w górę)',
      'Zatoka jamista — gruczolak przysadki z porażeniem nerwów gałkoruchowych',
      'Płat skroniowy prawy — glejak wielopostaciowy z napadami hakowymi'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM · Ćw TK09 / Fuller, Podemski',
    why: 'Klasyczna sekwencja objawów guza kąta mostowo-móżdżkowego (CPA) zaczyna się od uszkodzenia n. VIII (jednostronny niedosłuch odbiorczy, szumy uszne, zaburzenia równowagi), następnie dołącza n. V (wczesne zniesienie lub osłabienie odruchu rogówkowego), n. VII (obwodowy niedowład twarzy) oraz półkula móżdżku (ataksja tożstronna). Najczęstszym guzem CPA jest osłoniak przedsionkowy (schwannoma n. VIII), przed oponiakiem i perlakiem.',
    tip: 'Jednostronny odbiorczy niedosłuch + brak odruchu rogówkowego = pilne MRI mózgu z gadolinem pod kątem kąta mostowo-móżdżkowego.'
  },
  {
    t: 'typy',
    mod: '13',
    stem: 'U 64-letniego chorego z szybko narastającym niedowładem lewostronnym i apatią MRI mózgu (T1+Gd) uwidoczniło rozległą masę w prawym płacie czołowym przechodzącą przez ciało modzelowate na stronę przeciwną („guz motylkowy”), z nieregularnym wzmocnieniem obrączkowatym i centralną strefą martwicy. Które stwierdzenie dotyczące epidemiologii i rozpoznania jest PRAWIDŁOWE?',
    o: [
      'Najczęstszymi guzami wewnątrzczaszkowymi u dorosłych ogółem są oponiaki, a przedstawiony obraz odpowiada oponiakowi z ogonem oponowym',
      'Najczęstszymi guzami wewnątrzczaszkowymi u dorosłych ogółem są przerzuty, natomiast przedstawiony obraz jest klasyczny dla glejaka wielopostaciowego (glioblastoma IDH-wildtype, WHO 4) — najczęstszego pierwotnego złośliwego guza mózgu',
      'Obraz wzmocnienia obrączkowatego z martwicą wyklucza glejaka i jednoznacznie dowodzi ropnia bakteryjnego',
      'Rozpoznanie glioblastoma wymaga obecności mutacji IDH1 oraz kodelecji 1p/19q'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM · Sem TK05 / WHO CNS5 (2021) / EANO',
    why: 'W praktyce klinicznej dorosłych najczęstszymi guzami OUN ogółem są przerzuty (ok. 50% guzów wewnątrzczaszkowych — głównie z płuca, piersi, czerniaka, nerki i jelita grubego). Wśród guzów pierwotnych złośliwych dominuje glejak wielopostaciowy (GBM, WHO 4), dający typowo naciek przez ciało modzelowate, centralną martwicę, nieregularne wzmocnienie obrączkowate i duży obrzęk.',
    tip: 'W pytaniach testowych rozróżniaj: najczęstszy guz OUN dorosłych ogółem = przerzut; najczęstszy pierwotny łagodny = oponiak; najczęstszy pierwotny złośliwy = glejak wielopostaciowy (GBM).',
    gap: {
      pool: 'W starszych materiałach bywa skrót „najczęstszy guz mózgu u dorosłych = glejak” oraz podział GBM na postać IDH-dziką i IDH-zmutowaną (WHO 2016).',
      now: 'Według klasyfikacji WHO CNS5 (2021) termin „glioblastoma” (WHO 4) jest zastrzeżony wyłącznie dla glejaków IDH-wildtype (guzy z mutacją IDH klasyfikuje się osobno jako astrocytoma IDH-mutant stopnia 2–4).'
    }
  },
  {
    t: 'typy',
    mod: '13',
    stem: '62-letnia kobieta z wieloletnim wywiadem łagodnych napadów ogniskowych przeszła MRI głowy: uwidoczniono dobrze odgraniczony guz zewnątrzmózgowy w okolicy przystrzałkowej, szeroko oparty na oponie twardej, wzmacniający się jednorodnie po kontraście z widocznym linijnym wzmocnieniem przylegającej opony („ogon oponowy”, dural tail) oraz hiperostozą kości czaszki. Jakie rozpoznanie jest najbardziej prawdopodobne?',
    o: [
      'Oponiak (meningioma)',
      'Skąpodrzewiak (oligodendroglioma) z kodelecją 1p/19q',
      'Pierwotny chłoniak OUN (PCNSL)',
      'Przerzut czerniaka złośliwego',
      'Wyściółczak (ependymoma) komory IV'
    ],
    k: 0,
    c: 'src',
    s: 'Sylabus PUM · Sem TK05 / Stępień, Podemski',
    why: 'Oponiak jest najczęstszym pierwotnym łagodnym guzem wewnątrzczaszkowym u dorosłych (częstszy u kobiet ~2:1, często z receptorami progesteronowymi). Jest guzem zewnątrzmózgowym (uciska korę od zewnątrz, nie nacieka jej w stopniu WHO 1), silnie i jednorodnie wzmacnia się po gadolinie, daje charakterystyczny „ogon oponowy” (dural tail) i hiperostozę sąsiedniej kości.',
    tip: 'Widzisz w opisie MRI słowa „zewnątrzmózgowy + jednorodne wzmocnienie + ogon oponowy (dural tail) + hiperostoza”? Szukaj w odpowiedziach oponiaka.'
  },
  {
    t: 'rdzen',
    mod: '13',
    stem: 'U 52-letniej chorej z postępującym bólem korzeniowym na wysokości klatki piersiowej w MRI kręgosłupa piersiowego stwierdzono śródtwardówkowy zewnątrzrdzeniowy oponiak uciskający prawą połowę rdzenia na poziomie Th7. Jaki zespół objawów (Brown-Séquarda) wystąpi poniżej poziomu uszkodzenia?',
    o: [
      'Tożstronny (prawostronny) niedowład spastyczny i utrata czucia głębokiego oraz przeciwstronna (lewostronna) utrata czucia bólu i temperatury',
      'Przeciwstronny (lewostronny) niedowład spastyczny oraz tożstronna (prawostronna) utrata czucia bólu i temperatury',
      'Obustronne rozszczepienne zniesienie czucia bólu i temperatury wyłącznie w dermatomach Th7–Th8 przy pełnym zachowaniu siły kończyn dolnych',
      'Wiotkie porażenie kończyn dolnych ze zniesieniem odruchów kolanowych i skokowych oraz znieczuleniem typu spodenek jeździeckich'
    ],
    k: 0,
    c: 'src',
    s: 'Sylabus PUM · Ćw TK09 / Fuller, Podemski',
    why: 'Guzy śródtwardówkowe zewnątrzrdzeniowe (oponiaki, nerwiaki) uciskają rdzeń z boku, wywołując zespół połowiczego uszkodzenia rdzenia (Brown-Séquarda). Droga piramidowa i sznury tylne (czucie głębokie i wibracji) krzyżują się w pniu/opuszce (powyżej rdzenia piersiowego), więc ich objawy są TOŻSTRONNE do ucisku. Droga rdzeniowo-wzgórzowa boczna (ból i temperatura) krzyżuje się na poziomie rdzenia, dlatego jej ubytek występuje po stronie PRZECIWNEJ (1–2 segmenty poniżej).',
    tip: 'Brown-Séquard w jednym zdaniu: siła i wibracja = po tej samej stronie co guz; ból i temperatura = po stronie przeciwnej.'
  },
  {
    t: 'rdzen',
    mod: '13',
    stem: '68-letni mężczyzna z rakiem płuca od 10 dni ma narastający w nocy ból kręgosłupa piersiowego, a od 6 godzin osłabienie obu kończyn dolnych i zatrzymanie moczu (podejrzenie przerzutowej kompresji zewnątrzoponowej rdzenia). Z kolei drugi pacjent na oddziale ma bezobjawowego w zakresie drgawek oponiaka płata czołowego przed planową resekcją. Które postępowanie jest PRAWIDŁOWE?',
    o: [
      'U chorego z rakiem płuca odczekać z podaniem deksametazonu do planowego MRI za 72 h; u pacjenta z oponiakiem bez napadów włączyć profilaktycznie fenytoinę',
      'U chorego z podejrzeniem ucisku rdzenia natychmiast podać deksametazon i.v. i wykonać pilne MRI całego kręgosłupa (<24 h) oraz konsultację odbarczającą; u pacjenta z guzem bez napadów nie włączać rutynowo profilaktyki przeciwpadaczkowej',
      'U chorego z kompresją rdzenia wykonać natychmiastową punkcję lędźwiową w odcinku lędźwiowym przed MRI',
      'U chorego z kompresją rdzenia zastosować wyłącznie mannitol i unikać glikokortykosteroidów'
    ],
    k: 1,
    c: 'inf',
    s: 'Wytyczne EANO / SNO / NICE · Sylabus TK05',
    why: 'Zewnątrzoponowa kompresja rdzenia (MESCC) to stan nagły neuroonkologiczny: ból nocny kręgosłupa wyprzedza deficyt ruchowy, a z chwilą pojawienia się niedowładu i zatrzymania moczu należy natychmiast podać deksametazon i.v. oraz wykonać pilne MRI całego kręgosłupa (przerzuty bywają wielopoziomowe) przed odbarczeniem/radioterapią. Natomiast u pacjentów z guzami mózgu bez napadów padaczkowych wytyczne SNO/EANO nie zalecają rutynowej profilaktyki pierwotnej lekami przeciwpadaczkowymi.',
    tip: 'Dwie złote zasady terapii wspomagającej: (1) deksametazon natychmiast w obrzęku guzowym i kompresji rdzenia (wyjątek: podejrzenie chłoniaka OUN bez wgłobienia przed biopsją), (2) leki przeciwpadaczkowe dopiero po napadzie — preferowany lewetyracetam.',
    gap: {
      pool: 'W części starszych schematów przed operacją guza mózgu rutynowo włączano profilaktycznie leki przeciwpadaczkowe (często fenytoinę lub karbamazepinę).',
      now: 'Aktualne wytyczne SNO i EANO odradzają rutynową profilaktykę przeciwpadaczkową u chorych z guzem OUN bez napadów. Jeśli napad wystąpi, lekiem z wyboru jest lewetyracetam (brak indukcji enzymów CYP450 i brak interakcji z chemioterapią/deksametazonem).'
    }
  }
];
