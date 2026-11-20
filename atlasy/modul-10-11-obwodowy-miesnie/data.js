/* Bank zadań i tematów modułów [10][11]: Choroby układu obwodowego, złącza nerwowo-mięśniowego i mięśni */
window.ATLAS_TOPICS = {
  neuropatie: 'Polineuropatie i mononeuropatie',
  gbs: 'GBS i CIDP',
  zlacze: 'Miastenia, LEMS i przełomy',
  miopatie: 'Miopatie i EMG'
};

window.ATLAS_Q = [
  {
    t: 'neuropatie',
    mod: '10',
    stem: '58-letni mężczyzna po zabiegu endoprotezoplastyki prawego stawu kolanowego budzi się z opadaniem prawej stopy. W badaniu stwierdza się znaczne osłabienie zgięcia grzbietowego i nawracania (ewersji) prawej stopy oraz zaburzenia czucia na grzbiecie stopy i bocznej powierzchni podudzia. Siła odwracania (inwersji) stopy i odwodzenia prawego biodra jest prawidłowa, objaw Lasègue’a ujemny, a odruchy kolanowy i skokowy są zachowane. Która struktura uległa uszkodzeniu?',
    o: [
      'korzeń nerwowy L5 po stronie prawej',
      'nerw strzałkowy wspólny w okolicy główki strzałki',
      'nerw piszczelowy w dole podkolanowym',
      'korzeń nerwowy S1 po stronie prawej',
      'nerw udowy po stronie prawej'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM [10] · Ćw TK10 · Topodiagnostyka obwodowa',
    why: 'Nerw strzałkowy wspólny (często uciskany na główce strzałki) zaopatruje prostowniki stopy i palucha oraz mięśnie strzałkowe (ewersja stopy). Natomiast mięsień piszczelowy tylny (inwersja stopy) i pośladkowy średni (odwodzenie biodra) otrzymują unerwienie z korzenia L5 innymi nerwami (piszczelowym i pośladkowym górnym), dlatego ich pełna sprawność wyklucza radikulopatię L5.',
    tip: 'Test różnicowy opadania stopy przy łóżku: zbadaj inwersję (odwracanie) stopy. Prawidłowa inwersja = nerw strzałkowy; osłabiona inwersja + ból krzyża = korzeń L5.'
  },
  {
    t: 'neuropatie',
    mod: '10',
    stem: '64-letnia chora z 18-letnim wywiadem cukrzycy typu 2 skarży się na symetryczne drętwienie, mrowienie i palenie stóp o układzie „skarpetek”, osłabienie czucia wibracji 128 Hz na kostkach oraz obustronnie zniesione odruchy skokowe. W badaniu elektroneurograficznym (ENG) stwierdzono wyraźne obniżenie amplitudy potencjałów CMAP i SNAP przy prawidłowych lub granicznie zwolnionych szybkościach przewodzenia. Jaki typ uszkodzenia odpowiada temu obrazowi?',
    o: [
      'ostra zapalna poliradikuloneuropatia demielinizacyjna (AIDP)',
      'dystalna symetryczna polineuropatia aksonalna',
      'przewlekła zapalna polineuropatia demielinizacyjna (CIDP)',
      'dziedziczna polineuropatia demielinizacyjna typu CMT1A'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM [10] · Sem TK03 · Podemski / Stępień',
    why: 'Zanik amplitud odpowiedzi ruchowych (CMAP) i czuciowych (SNAP) przy prawidłowej bądź nieznacznie obniżonej szybkości przewodzenia (NCV) w dystalnym rozkładzie zależnym od długości aksonu („skarpetki i rękawiczki”) jest klasycznym wzorcem polineuropatii aksonalnej — typowej m.in. dla cukrzycy, alkoholu oraz niedoboru witaminy B12. W neuropatiach demielinizacyjnych (AIDP, CIDP, CMT1A) dominuje znaczne zwolnienie NCV, wydłużenie latencji fali F i blok przewodzenia.',
    tip: 'Reguła ENG: Aksonalna = spadek AMPLITUDY (CMAP/SNAP); Demielinizacyjna = spadek SZYBKOŚCI przewodzenia (NCV), wydłużenie latencji i blok przewodzenia.',
    gap: {
      pool: 'W pytaniach testowych polineuropatię cukrzycową klasyfikuje się jako typową dystalną symetryczną polineuropatię aksonalną zależną od długości nerwów.',
      now: 'W praktyce klinicznej (EAN/AAN) nawet u chorego na cukrzycę przed ostatecznym przypisaniem objawów wyłącznie cukrzycy należy wykonać panel przesiewowy przyczyn odwracalnych: stężenie witaminy B12, TSH oraz elektroforezę białek surowicy z immunofiksacją (wykluczenie gammapatii monoklonalnej).'
    }
  },
  {
    t: 'gbs',
    mod: '10',
    stem: '32-letni mężczyzna trafia na SOR z powodu szybko narastającego od 4 dni symetrycznego osłabienia kończyn dolnych, które w ostatniej dobie objęło ręce i mięśnie mimiczne twarzy. Dwa tygodnie wcześniej przebył ostrą biegunkę bakteryjną. W badaniu: wiotki niedowład czterokończynowy, zniesione wszystkie odruchy głębokie, niewielkie parestezje dystalne bez wyraźnego poziomu czucia. W PMR pobranym w 9. dobie: białko 192 mg/dl, cytoza 3 komórki/µl. Które postępowanie jest właściwe?',
    o: [
      'natychmiastowe włączenie dożylnego metyloprednizolonu 1000 mg/d przez 5 dni',
      'podanie dożylnych immunoglobulin (IVIG) lub wykonanie plazmaferezy (PLEX) z monitorowaniem wydolności oddechowej (FVC) i EKG',
      'rozpoczęcie doustnej pirydostygminy 60 mg co 4 godziny',
      'podanie acyklowiru i ceftriaksonu do czasu wykluczenia zapalenia mózgu',
      'wypisanie pacjenta z zaleceniem planowego EMG za 6 tygodni'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [10] · W03h / Sem TK08 · Wytyczne EAN/PNS 2023',
    why: 'Postępujący wstępujący wiotki niedowład z arefleksją po infekcji (klasycznie Campylobacter jejuni) oraz rozszczepieniem białkowo-komórkowym w PMR (wysokie białko przy prawidłowej cytozie) to typowy obraz zespołu Guillaina-Barrégo (GBS). Jedynym skutecznym leczeniem przyczynowym o równoważnej skuteczności są IVIG lub plazmafereza (PLEX), przy ścisłym monitorowaniu pojemności życiowej (FVC) i zaburzeń autonomicznych. Glikokortykosteroidy w GBS NIE działają.',
    tip: 'Złota zasada GBS: IVIG lub plazmafereza TAK, glikokortykosteroidy NIE! Pilnuj FVC (<20 ml/kg lub „zasada 20/30/40”) i EKG z powodu ryzyka nagłej niewydolności oddechowej i dysautonomii.',
    gap: {
      pool: 'Klasyczny opis podręcznikowy podkreśla obecność rozszczepienia białkowo-komórkowego w PMR (podwyższone białko, prawidłowa liczba komórek) od ok. 2. tygodnia choroby oraz zakaz stosowania steroidów.',
      now: 'Wytyczne EAN/PNS 2023 zwracają uwagę, że w 1. tygodniu objawów białko w PMR jest prawidłowe u 30–50% chorych z GBS — prawidłowy wynik wczesnego nakłucia nie wyklucza rozpoznania i nie może opóźniać włączenia IVIG/PLEX. Wariant ruchowy AMAN po C. jejuni często wiąże się z przeciwciałami anty-GM1/GD1a, a zespół Millera-Fishera z anty-GQ1b.'
    }
  },
  {
    t: 'gbs',
    mod: '10',
    stem: '56-letnia kobieta od 3 miesięcy obserwuje stopniowo narastający, symetryczny niedowład mięśni proksymalnych (trudność ze wstawaniem z krzesła i unoszeniem rąk) i dystalnych kończyn wraz z mrowieniem stóp oraz uogólnionym zniesieniem odruchów głębokich. W badaniu ENG stwierdzono wyraźne zwolnienie szybkości przewodzenia, wydłużenie latencji fali F oraz częściowy blok przewodzenia, a w PMR białko wynosi 135 mg/dl przy 2 limfocytach/µl. Które rozpoznanie i postępowanie jest prawidłowe?',
    o: [
      'zespół Guillaina-Barrégo — glikokortykosteroidy są przeciwwskazane',
      'przewlekła zapalna poliradikuloneuropatia demielinizacyjna (CIDP) — leczeniem I rzutu są glikokortykosteroidy, IVIG lub plazmafereza',
      'stwardnienie zanikowe boczne (SLA) — należy włączyć ryluzol',
      'dystrofia mięśniowa obręczowo-kończynowa — rozpoznanie stawia się bez ENG na podstawie samej biopsji mięśnia'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [10] · Sem TK08 · EAN/PNS CIDP 2021',
    why: 'Progresja lub nawrotowy przebieg niedowładu symetrycznego (zajmującego zarówno mięśnie proksymalne, jak i dystalne) trwający powyżej 8 tygodni (>2 miesiące) z arefleksją, demielinizacją w ENG oraz rozszczepieniem białkowo-komórkowym w PMR rozpoznaje się jako CIDP. W przeciwieństwie do GBS glikokortykosteroidy są w CIDP jedną z podstawowych, bardzo skutecznych metod leczenia pierwszego rzutu (obok IVIG i plazmaferezy).',
    tip: 'GBS <4 tygodnie (GKS nieskuteczne!) vs CIDP >8 tygodni (GKS skuteczne jako lek I rzutu obok IVIG/PLEX).'
  },
  {
    t: 'zlacze',
    mod: '11',
    stem: '29-letnia kobieta z rozpoznaną miastenią gravis (przeciwciała anty-AChR dodatnie, po tymektomii) zgłasza się na SOR w przebiegu zakażenia układu moczowego leczonego od 2 dni gentamycyną i cyprofloksacyną. Rozwinęła szybko narastającą dyzartrię nosową, dysfagię, nasiloną duszność, tachykardię, zlewne poty i lęk; źrenice są szerokie, po 5 mm, odruchy głębokie prawidłowe, a pacjentka nie jest w stanie policzyć na jednym wydechu do 12. Które postępowanie jest najwłaściwsze?',
    o: [
      'natychmiastowe zwiększenie dawki doustnej pirydostygminy i dołączenie siarczanu magnezu i.v.',
      'rozpoznanie przełomu cholinergicznego i podanie dużej dawki atropiny bez zabezpieczania dróg oddechowych',
      'rozpoznanie przełomu miastenicznego: pilne zabezpieczenie dróg oddechowych (intubacja/OIT), odstawienie antybiotyków nasilających blok NM, czasowe wstrzymanie pirydostygminy oraz włączenie IVIG lub plazmaferezy',
      'wykonanie punkcji lędźwiowej i podanie dożylnego metyloprednizolonu w dawce 1 g bez wspomagania oddechu'
    ],
    k: 2,
    c: 'did',
    s: 'Sylabus PUM [11] · Sem TK09 / Ćw TK11 · MGFA / EAN',
    why: 'Infekcja oraz leki blokujące złącze nerwowo-mięśniowe (aminoglikozydy — gentamycyna, fluorochinolony — cyprofloksacyna) wywołały przełom miasteniczny z zagrażającą niewydolnością oddechową (liczenie na wydechu <20). W przeciwieństwie do przełomu cholinergicznego nie ma tu zwężenia źrenic ani objawów SLUDGE. Priorytetem jest wczesna intubacja na OIT, czasowe wstrzymanie inhibitorów AChE (by nie nasilać wydzieliny w drogach oddechowych), leczenie przyczynowe IVIG lub PLEX oraz zmiana antybiotyku na bezpieczny w MG. Magnez i.v. jest w MG bezwzględnie przeciwwskazany!',
    tip: 'Przełom miasteniczny = szerokie źrenice + duszność + wyzwalacz (infekcja / aminoglikozyd / fluorochinolon / Mg²⁺). Przełom cholinergiczny = wąskie źrenice (mioza) + ślinotok/biegunka/fascykulacje (SLUDGE).',
    gap: {
      pool: 'Klasycznie przełom miasteniczny i cholinergiczny różnicowano próbą z edrofonium (Tensilon), a w leczeniu MG podkreślano zestaw: pirydostygmina, prednizon, azatiopryna i tymektomia przy grasiczaku.',
      now: 'Próba z edrofonium nie jest dziś rutynowo stosowana (ryzyko zatrzymania krążenia i zaostrzenia bloku); przy każdej zagrażającej niewydolności oddechowej w MG najpierw zabezpiecza się drogi oddechowe i podaje IVIG lub PLEX. Dodatkowo w uogólnionej MG anty-AChR bez grasiczaka tymektomia poprawia rokowanie (MGTX), w MG anty-MuSK lekiem z wyboru bywa rytuksymab, a w opornej MG stosuje się blokery FcRn (efgartigimod) i inhibitory C5.'
    }
  },
  {
    t: 'zlacze',
    mod: '11',
    stem: '63-letni wieloletni palacz papierosów zgłasza się z powodu postępującego od kilku miesięcy osłabienia mięśni ud i obręczy biodrowej (trudność przy wstawaniu z krzesła i wchodzeniu po schodach) oraz dokuczliwej suchości w jamie ustnej i zaparć. W badaniu stwierdza się niedowład proksymalny kończyn dolnych bez ptozy i bez zaburzeń czucia oraz zniesione odruchy kolanowe i skokowe, które jednak wyraźnie pojawiają się po 10 sekundach maksymalnego skurczu mięśnia czworogłowego. Które rozpoznanie i wynik badań są najbardziej prawdopodobne?',
    o: [
      'miastenia gravis z grasiczakiem — dekrement >10% w stymulacji 3 Hz oraz przeciwciała anty-AChR',
      'zespół miasteniczny Lamberta-Eatona (LEMS) — przeciwciała anty-VGCC, inkrement CMAP >60–100% przy stymulacji wysoką częstotliwością (20–50 Hz) oraz konieczność pilnego TK klatki piersiowej w kierunku raka drobnokomórkowego płuca (SCLC)',
      'zatrucie jadem kiełbasianym (botulizm) — wąskie źrenice i zstępujące porażenie gałek ocznych',
      'zapalenie skórno-mięśniowe — prawidłowe odruchy głębokie i brak zmian w stymulacji nerwów'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [11] · Sem TK09 · Podemski / Stępień',
    why: 'Osłabienie proksymalne głównie kończyn dolnych, objawy dysautonomii (suchość w ustach, zaparcia), arefleksja poprawiająca się po krótkim wysiłku (fenomen rozgrzewki / torowania powysiłkowego) u palacza to klasyczny obraz zespołu Lamberta-Eatona (LEMS). Autoprzeciwciała przeciw presynaptycznym kanałom wapniowym (anty-VGCC) upośledzają uwalnianie ACh, dając niską wyjściową amplitudę CMAP i wyraźny inkrement (>60–100%) przy stymulacji 20–50 Hz. U >50% chorych LEMS jest zespołem paraneoplastycznym związanym z SCLC.',
    tip: 'LEMS = kanały presynaptyczne VGCC + SCLC u palacza + suchość w ustach + poprawa po wysiłku (inkrement w EMG). Miastenia = receptory postsynaptyczne AChR/MuSK + grasiczak + pogorszenie po wysiłku (dekrement 3 Hz).'
  },
  {
    t: 'miopatie',
    mod: '11',
    stem: '49-letnia pacjentka od 2 miesięcy ma trudności z podnoszeniem się z niskiego krzesła, wchodzeniem po schodach i czesaniem włosów, przy pełnej sile uścisku dłoni. Na grzbietach stawów śródręczno-paliczkowych widoczne są sino-czerwone grudki, a wokół oczu fioletowawy rumień. Czucie powierzchowne i głębokie oraz odruchy głębokie są prawidłowe, a aktywność kinazy kreatynowej (CK) wynosi 4600 U/l. Jakiego zapisu spodziewasz się w badaniu EMG igłowym i jakie jest dalsze kluczowe działanie?',
    o: [
      'potencjałów jednostek ruchowych (MUP) o dużej amplitudzie i wydłużonym czasie trwania z ubogą rekrutacją; włączenie dożylnego magnezu',
      'potencjałów MUP o niskiej amplitudzie, krótkim czasie trwania i polifazowych z przedwczesną rekrutacją; rozpoznanie zapalenia skórno-mięśniowego, włączenie GKS i pilny skrining onkologiczny',
      'prawidłowego zapisu EMG igłowego przy wybitnym dekrementem 3 Hz w próbie stymulacyjnej',
      'zwolnienia szybkości przewodzenia nerwowego (NCV <25 m/s) i wydłużenia latencji fali F bez podwyższenia CK'
    ],
    k: 1,
    c: 'own',
    s: 'Sylabus PUM [11] · Sem TK09 / Ćw TK11 · Podemski / Stępień',
    why: 'Symetryczne osłabienie proksymalne bez zaburzeń czucia i z zachowanymi odruchami oraz wysokim stężeniem CK wskazuje na miopatię pierwotną — tu zapalenie skórno-mięśniowe (grudki Gottrona + rumień heliotropowy). Zapis miogenny w EMG igłowym cechuje się małymi, krótkimi, polifazowymi potencjałami MUP oraz przedwczesną (nadmierną) rekrutacją. U dorosłych z zapaleniem skórno-mięśniowym obowiązkowy jest szeroki skrining w kierunku nowotworu złośliwego.',
    tip: 'Zapis MIOGENNY = potencjały Niskie, Krótkie, Polifazowe + Wczesna rekrutacja (przeciwieństwo zapisu NEUROGENNEGO: Wysokie, Szerokie MUP + Uboga rekrutacja). Przy DM u dorosłych zawsze szukaj nowotworu, a u chorego >50 r.ż. opornego na GKS z zajęciem zginaczy palców pamiętaj o IBM!'
  }
];
