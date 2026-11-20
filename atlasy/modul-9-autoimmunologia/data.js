/* Bank zadań modułu [9] Choroby demielinizacyjne i autoimmunologiczne OUN. */
/* c: 'src' = potwierdzone wytycznymi/sylabusem, 'inf' = wnioskowane, 'did' = dydaktyczne PUM, 'unk' = niepewne */
window.ATLAS_TOPICS = {
  sm: 'Obraz SM i McDonald',
  leczenie: 'Rzut i DMT',
  nmosd: 'NMOSD i MOGAD',
  zapalenia: 'Zapalenia autoimmun.'
};

window.ATLAS_Q = [
  {
    t: 'sm',
    mod: '9',
    stem: '28-letnia kobieta zgłasza ból prawej gałki ocznej nasilający się przy ruchach oraz spadek ostrości wzroku i wyblaknięcie barwy czerwonej od 4 dni; dno oka w oftalmoskopii jest prawidłowe, obecny względny dośrodkowy defekt źreniczny (RAPD). Dodatkowo w badaniu neurologicznym przy próbie spojrzenia w prawo prawe oko nie przywodzi, a w lewym (odwodzonym) występuje oczopląs poziomy, przy prawidłowej konwergencji. Jakie struktury uległy uszkodzeniu?',
    o: [
      'Prawy nerw wzrokowy (zapalenie wewnątrzgałkowe) oraz lewy nerw odwodzący (n. VI)',
      'Prawy nerw wzrokowy (pozagałkowe zapalenie n. II) oraz prawy pęczek podłużny przyśrodkowy (MLF — międzyjądrowe porażenie spojrzenia, INO)',
      'Skrzyżowanie nerwów wzrokowych oraz prawy nerw okoruchowy (n. III)',
      'Lewa kora wzrokowa oraz oba jądra nerwów okoruchowych',
      'Siatkówka oka prawego oraz móżdżek'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [9] · W03g · Sem TK02 · Podemski · Fuller',
    why: 'Jednostronny spadek ostrości wzroku z bólem przy ruchach gałki ocznej, dyschromatopsją, RAPD i prawidłowym dnem oka („chory nic nie widzi, lekarz nic nie widzi”) to klasyczne pozagałkowe zapalenie nerwu wzrokowego (ON). Upośledzenie przywodzenia oka prawego przy zachowanej konwergencji i oczopląsie odwodzonego oka lewego stanowi międzyjądrowe porażenie spojrzenia (INO) wynikające z uszkodzenia prawego pęczka podłużnego przyśrodkowego (MLF) w pniu mózgu.',
    tip: 'Połączenie pozagałkowego ON i INO (zwłaszcza obustronnego u młodego dorosłego) jest klasycznym zespołem wskazującym na stwardnienie rozsiane.'
  },
  {
    t: 'sm',
    mod: '9',
    stem: '26-letnia pacjentka przebyła pierwszy w życiu epizod neurologiczny: podostre niedowidzenie oka lewego (pozagałkowe zapalenie nerwu wzrokowego). W wykonanym w 10. dobie MRI mózgu stwierdzono 3 ogniska hiperintensywne w T2/FLAIR (2 okołokomorowe ułożone prostopadle do komór bocznych oraz 1 podkorowe/juxtacortical), jednak żadne z ognisk nie ulega wzmocnieniu po podaniu gadolinu (Gd−). Badanie PMR wykazało 6 limfocytów/µl, prawidłowe stężenie białka oraz dodatnie prążki oligoklonalne (OCB IgG typu 2, nieobecne w surowicy). Która decyzja diagnostyczna wg kryteriów McDonalda (2017) jest prawidłowa?',
    o: [
      'Należy rozpoznać jedynie CIS i odroczyć rozpoznanie SM do pojawienia się drugiego rzutu klinicznego',
      'Brak wzmocnienia po gadolinie wyklucza spełnienie kryteriów McDonalda, ponieważ w jednym MRI nie ma ognisk Gd+ i Gd−',
      'Można rozpoznać pewne SM (RRMS): spełniono kryterium DIS (≥2/4 lokalizacji), a dodatnie prążki oligoklonalne w PMR zastępują kryterium DIT',
      'Prążki oligoklonalne w PMR są kryterium diagnostycznym wyłącznie dla postaci pierwotnie postępującej (PPMS)',
      'Konieczna jest biopsja mózgu w celu potwierdzenia demielinizacji'
    ],
    k: 2,
    c: 'src',
    s: 'Sylabus PUM [9] · W03g · Kryteria McDonalda 2017',
    why: 'Wg kryteriów McDonalda z 2017 r. rozsianie w przestrzeni (DIS) wymaga ≥1 ogniska T2 w co najmniej 2 z 4 typowych okolic (okołokomorowa, korowa/podkorowa, podnamiotowa, rdzeń kręgowy) — pacjentka spełnia DIS (okołokomorowa + podkorowa). Gdy w pierwszym MRI wszystkie zmiany są Gd− (brak klasycznego DIT w obrazowaniu), obecność specyficznych dla PMR prążków oligoklonalnych IgG pozwala spełnić kryterium rozsiania w czasie (DIT) i rozpoznać SM już po pierwszym rzucie.',
    tip: 'W kryteriach McDonalda 2017: DIS (≥2 z 4 okolic) + prążki oligoklonalne w PMR (typ 2 lub 3) = rozpoznanie SM bez czekania na kolejny rzut lub nowe ognisko w MRI.',
    gap: {
      pool: 'W starszych pytaniach opartych na kryteriach McDonalda 2010 prążki oligoklonalne służyły głównie w rozpoznaniu PPMS, a w RRMS do DIT wymagano jednoczesnego ogniska Gd+ i Gd− lub nowego ogniska T2 w kolejnym MRI.',
      now: 'Kryteria McDonalda 2017 włączyły prążki oligoklonalne (OCB) jako pełnoprawny substytut DIT u chorych z CIS spełniających DIS; ponadto propozycje rewizji z 2024 r. dodają nerw wzrokowy jako 5. lokalizację DIS oraz biomarkery MRI (central vein sign, paramagnetic rim lesions).'
    }
  },
  {
    t: 'leczenie',
    mod: '9',
    stem: '33-letnia kobieta z rozpoznaną od 4 lat postacią rzutowo-remisyjną SM (EDSS 1,5) zgłasza się na dyżur z powodu gwałtownego pogorszenia ostrości wzroku w oku prawym oraz nasilenia drętwienia i osłabienia nóg utrzymującego się od 6 godzin. Dzień wcześniej wróciła z gorącej sauny, a dziś ma temperaturę 38,5°C, ból okolicy lędźwiowej i dyzurię. Jakie postępowanie jest najwłaściwsze w pierwszej kolejności?',
    o: [
      'Natychmiastowe włączenie metyloprednizolonu 1000 mg i.v. bez dodatkowych badań laboratoryjnych',
      'Rozpoznanie pseudorzutu (zjawisko Uhthoffa nasilone gorączką w przebiegu infekcji) — pilne badanie ogólne i posiew moczu, leczenie przeciwgorączkowe oraz antybiotykoterapia ZUM przed ewentualną decyzją o steroidoterapii',
      'Natychmiastowa plazmafereza (PLEX) z powodu ciężkiego rzutu pniowego',
      'Zmiana terapii z interferonu beta na alemtuzumab w trybie ostrym na SOR',
      'Rozpoznanie konwersji do postaci wtórnie postępującej (SPMS)'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM [9] · Ćw TK05 · Podemski · Stępień',
    why: 'Prawdziwy rzut SM definiuje się jako pojawienie się nowych lub wyraźne nasilenie wcześniejszych objawów neurologicznych trwające ≥24 godziny przy braku gorączki i aktywnego zakażenia. Wzrost temperatury ciała (gorączka w ZUM, gorąca kąpiel/sauna) przejściowo blokuje przewodnictwo w zdemielinizowanych aksonach (objaw Uhthoffa / pseudorzut). Należy wyleczyć infekcję i zbić gorączkę; podanie GKS przy nierozpoznanej infekcji może ją zaostrzyć.',
    tip: 'Zawsze zanim rozpoznasz rzut SM i podasz metyloprednizolon: zapytaj o objawy infekcji (ZUM, przegrzanie) i sprawdź czas trwania objawów (≥24 h!).'
  },
  {
    t: 'leczenie',
    mod: '9',
    stem: '37-letni mężczyzna z wysoko aktywnym RRMS leczony od 32 miesięcy natalizumabem (wcześniej przez 2 lata stosował immunosupresję, aktualny indeks przeciwciał anty-JCV w surowicy wynosi 2,4) rozwija w ciągu 3 tygodni postępującą niezborność prawej ręki, zaburzenia mowy i niedowidzenie połowicze, bez gorączki. W MRI mózgu widoczne jest rozległe, asymetryczne ognisko hiperintensywne w T2/FLAIR obejmujące istotę białą podkorową i włókna U lewej półkuli, bez efektu masy i bez wzmocnienia kontrastowego. Jakie jest najbardziej prawdopodobne rozpoznanie i postępowanie?',
    o: [
      'Klasyczny rzut SM — podwojenie dawki natalizumabu i 5 dni metyloprednizolonu i.v.',
      'Postępująca wieloogniskowa leukoencefalopatia (PML) wywołana wirusem JC — natychmiastowe odstawienie natalizumabu, oznaczenie JCV-DNA (PCR) w PMR i rozważenie plazmaferezy (PLEX) z monitorowaniem w kierunku zespołu IRIS',
      'Zakażenie wirusem opryszczki pospolitej (HSV-1) — acyklowir i kontynuacja natalizumabu',
      'Obrzęk plamki związany z leczeniem — odstawienie leku i konsultacja okulistyczna',
      'Wtórna autoimmunologiczna małopłytkowość polekowa'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM [9] · Sem TK02 · Wytyczne EAN/ECTRIMS',
    why: 'Trzy główne czynniki ryzyka PML podczas leczenia natalizumabem to: wysokie miano przeciwciał anty-JCV, czas terapii >24 miesiące oraz wcześniejsza immunosupresja. Podostre objawy korowe/móżdżkowe z rozległą zmianą podkorową zajmującą włókna U bez efektu masy w MRI wymagają pilnego wykluczenia PML (PCR na JCV-DNA w PMR) i natychmiastowego przerwania podawania natalizumabu.',
    tip: 'Zapamiętaj powikłania flagowych leków DMT: natalizumab → PML (JCV); fingolimod → bradykardia/blok AV (monitoring EKG 6 h po 1. dawce) i obrzęk plamki; teryflunomid → silna teratogenność (wymywanie cholestyraminą); alemtuzumab → wtórne choroby autoimmunologiczne.',
    gap: {
      pool: 'W klasycznych schematach „eskalacyjnych” terapię rozpoczynano niemal zawsze od leków umiarkowanej skuteczności (IFN-β, octan glatirameru), a leki o wysokiej skuteczności (natalizumab, anty-CD20) włączano dopiero po niepowodzeniu leczenia.',
      now: 'Aktualne wytyczne EAN/ECTRIMS zalecają wczesne stosowanie terapii o wysokiej skuteczności (HET: okrelizumab, ofatumumab, natalizumab, kladrybina) od początku choroby u pacjentów z czynnikami złego rokowania lub wysoką aktywnością zapalną („flip the pyramid”).'
    }
  },
  {
    t: 'nmosd',
    mod: '9',
    stem: '31-letnia kobieta przebyła 3 tygodnie temu epizod uporczywej czkawki i niepowstrzymanych wymiotów trwający 9 dni (gastroskopia i diagnostyka gastrologiczna prawidłowe). Obecnie wystąpiło ciężkie obustronne pogorszenie ostrości wzroku oraz niedowład kończyn dolnych z zaburzeniami zwieraczy. W MRI rdzenia szyjno-piersiowego stwierdza się ciągłą zmianę hiperintensywną T2 zajmującą centralnie rdzeń na długości od C2 do C7 (6 segmentów kręgowych). W PMR brak prążków oligoklonalnych. Które stwierdzenie jest prawdziwe?',
    o: [
      'Obraz jest typowy dla SM — należy pilnie włączyć interferon beta-1a w wysokiej dawce',
      'Obraz odpowiada spektrum NMOSD (area postrema syndrome + obustronne ON + LETM ≥3 segmenty); należy oznaczyć AQP4-IgG, pilnie wdrożyć metyloprednizolon i.v. z wczesną plazmaferezą oraz bezwzględnie unikać interferonu beta, fingolimodu i natalizumabu',
      'Zmiana ≥3 segmentów w rdzeniu wyklucza chorobę demielinizacyjną i dowodzi guza śródrdzeniowego',
      'Rozstrzygające dla rozpoznania jest podanie próbne glikokortykosteroidów doustnych w małej dawce przez 2 miesiące',
      'W przypadku AQP4-IgG+ najlepszym leczeniem podtrzymującym jest fumaran dimetylu'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [9] · W03g · Kryteria IPND NMOSD',
    why: 'Zespół pola najdalszego (area postrema — czkawka/nudności/wymioty), ciężkie obustronne zapalenie nerwów wzrokowych oraz podłużnie rozległe poprzeczne zapalenie rdzenia (LETM ≥3 segmenty kręgowe w osi długiej, centralne w przekroju) przy braku OCB to klasyczny obraz NMOSD (związanego z przeciwciałami AQP4-IgG skierowanymi przeciwko kanałom wodnym na stopkach astrocytów). Leki stosowane w SM (IFN-β, fingolimod, natalizumab, alemtuzumab) mogą wywołać ciężkie zaostrzenie NMOSD!',
    tip: 'Czkawka/wymioty + ciężkie ON + LETM ≥3 segmenty = NMOSD (AQP4-IgG). W rzucie szybko GKS i.v. + PLEX, a NIGDY interferon beta ani fingolimod!'
  },
  {
    t: 'nmosd',
    mod: '9',
    stem: '21-letni mężczyzna 10 dni po infekcji dróg oddechowych rozwinął obustronne pogorszenie wzroku z wyraźnym obrzękiem obu tarcz nerwu wzrokowego w badaniu dna oka oraz parestezje krocza i zatrzymanie moczu. W MRI oczodołów widoczne obustronne wzmocnienie przednich odcinków i pochewek nerwów wzrokowych, a w MRI rdzenia zmiana LETM obejmująca stożek rdzeniowy. Przeciwciała AQP4-IgG oraz prążki oligoklonalne w PMR są ujemne, natomiast w teście komórkowym (CBA) stwierdzono wysokie miano MOG-IgG. Która cecha najlepiej charakteryzuje MOGAD w porównaniu z AQP4+ NMOSD?',
    o: [
      'Zawsze postępujący przebieg wtórny bez odpowiedzi na glikokortykosteroidy',
      'Wyraźna przewaga kobiet (~9:1) oraz stała obecność prążków oligoklonalnych w PMR (>90%)',
      'Częste zajęcie przedniego odcinka nerwu wzrokowego z obrzękiem tarczy n. II i stożka rdzeniowego (lub zespół ADEM-podobny), porównywalna częstość u obu płci oraz zwykle bardzo dobra odpowiedź na GKS i lepsze rokowanie funkcjonalne',
      'Pierwotna astrocytopatia z martwicą astrocytów w miejscu skrzyżowania wzrokowego',
      'Konieczność natychmiastowego włączenia interferonu beta jako leku I rzutu'
    ],
    k: 2,
    c: 'inf',
    s: 'Sylabus PUM [9] · Kryteria MOGAD 2023 · Stępień',
    why: 'MOGAD (choroba związana z przeciwciałami przeciwko glikoproteinie mieliny oligodendrocytów) dotyczy w równym stopniu kobiet i mężczyzn (często dzieci i młodych dorosłych), klasycznie wywołuje obustronne zapalenie przedniego odcinka nerwów wzrokowych z obrzękiem tarczy (papillitis) i wzmocnieniem pochewki (perineuritis), zapalenie stożka rdzeniowego lub ADEM. W odróżnieniu od AQP4+ NMOSD odpowiedź na wysokie dawki GKS bywa szybka, a utrwalone kalectwo rzadsze (choć choroba może nawracać po zbyt szybkim odstawieniu steroidów).',
    tip: 'Porównaj 3 lokalizacje nerwu wzrokowego: SM = krótkie jednostronne pozagałkowe (dno oka OK); NMOSD (AQP4) = długie tylne aż do skrzyżowania; MOGAD = obustronne przednie z obrzękiem tarczy i pochewki + stożek rdzeniowy!',
    gap: {
      pool: 'W starszych opracowaniach przypadki z zapaleniem nerwów wzrokowych i LETM przy ujemnych AQP4-IgG określano zbiorczo jako „seronegatywne NMO (choroba Devica)” bez odrębnego podtypu.',
      now: 'Międzynarodowe kryteria z 2023 r. wyodrębniają MOGAD jako odrębną jednostkę chorobową (typowy zespół kliniczny + dodatni wynik MOG-IgG w teście CBA), wymagającą powolnej redukcji GKS i odrębnych strategii zapobiegania nawrotom (np. podtrzymujące IVIG, azatiopryna, MMF lub tocilizumab; skuteczność anty-CD20 bywa niższa niż w AQP4+ NMOSD).'
    }
  },
  {
    t: 'zapalenia',
    mod: '9',
    stem: '23-letnia studentka została przyjęta na oddział psychiatryczny z powodu nagłej bezsenności, urojeń i pobudzenia psychoruchowego po przebytym 2 tygodnie wcześniej stanie podgorączkowym. W 5. dobie dołączyły się napady drgawkowe, rytmiczne dyskinezy ustno-twarzowe (mlaskanie, wykrzywianie warg), wahania ciśnienia tętniczego, tachykardia oraz zaburzenia świadomości. MRI mózgu nie wykazało ognisk, PCR PMR w kierunku HSV-1/2 jest ujemne, pleocytoza wynosi 28 limfocytów/µl, a w EEG opisano wzorzec „extreme delta brush”. Które postępowanie jest kluczowe?',
    o: [
      'Zwiększenie dawek neuroleptyków i wyłączna obserwacja psychiatryczna przez 4 tygodnie',
      'Oznaczenie przeciwciał anty-NMDAR w PMR (i surowicy), pilna diagnostyka obrazowa w kierunku potworniaka jajnika (USG/TK/MRI miednicy) oraz natychmiastowe włączenie immunoterapii I rzutu (metyloprednizolon i.v. + IVIG lub plazmafereza)',
      'Rozpoznanie zapalenia anty-LGI1 i poszukiwanie drobnokomórkowego raka płuca jako najczęstszej przyczyny u 23-latki',
      'Włączenie cyklofosfamidu w monoterapii bez steroidów i oczekiwanie na wynik biopsji mózgu',
      'Rozpoznanie stwardnienia rozsianego postaci piorunującej (Marburga) i podanie interferonu beta'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [9] · W03g · Kryteria Grausa AE',
    why: 'Obraz odpowiada autoimmunologicznemu zapaleniu mózgu z przeciwciałami przeciwko receptorowi NMDA (anty-NMDAR): charakterystyczny przebieg fazowy (prodrom → ostra psychoza/katatonia → napady → dyskinezy ustno-twarzowe, dysautonomia i hipowentylacja), częsty prawidłowy obraz MRI (~50%), wzorzec EEG „extreme delta brush” oraz silne powiązanie z potworniakiem jajnika (~40–50% u młodych kobiet). Przeciwciała anty-NMDAR są czulsze w PMR niż w surowicy, a po wykluczeniu infekcji (HSV) niezwłocznie wdraża się GKS i.v. + IVIG/PLEX i usuwa guz.',
    tip: 'Zapamiętaj duet AE na egzamin: młoda kobieta + psychoza + dyskinezy ustno-twarzowe + dysautonomia = anty-NMDAR (szukaj potworniaka jajnika!). Starszy chory + napady dystoniczne twarzowo-ramienne (FBDS) + hiponatremia = anty-LGI1.'
  }
];
