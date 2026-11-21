/* Neurologia V – dane kliniczne (lazy-loaded dla tras SOR/OSCE, Kalkulatora i Diagnostyki) */
window.HUB_META = window.HUB_META || {};
(function () {
  const OSCE_STATIONS = [
    {
      id: 'stacja-1-nerwy-czaszkowe',
      number: 1,
      title: 'Stacja 1 · Nerwy czaszkowe i porażenie VII',
      shortTitle: 'Nerwy czaszkowe',
      topic: 'Różnicowanie uszkodzenia nerwu VII, gałkoruchowych i opuszkowych',
      mods: ['6', '5', '2'],
      patient: { name: 'Pan Marek K.', age: 58, weight: 82, gender: 'M', avatarType: 'adult', vitalsInitial: { hr: 78, bp: '148/88', rr: 16, spo2: 98, temp: 36.7, gcs: 15 } },
      briefing: {
        scenario: '58-letni mężczyzna zgłosił się z powodu nagłego opadnięcia lewego kącika ust oraz dwojenia przy patrzeniu w lewo i po schodach, które zauważył rano po obudzeniu.',
        task: 'Przeprowadź celowany wywiad, zbadaj nerwy czaszkowe i układ ruchowy w odpowiednich strefach, odróżnij uszkodzenie ośrodkowe od obwodowego/pniowego i zaplanuj pilną diagnostykę.'
      },
      scale: {
        id: 'cn-eval',
        name: 'Protokół oceny nerwów czaszkowych (U02)',
        maxScore: 6,
        unit: 'pkt',
        items: [
          { id: 'cn-front', label: 'Ocena marszczenia czoła (piętro górne VII)', triggerManeuvers: ['m1-vii-czolo'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Czoło marszczy symetrycznie', normVal: 'Symetria obustronna' },
          { id: 'cn-lower', label: 'Ocena dolnego piętra twarzy (VII)', triggerManeuvers: ['m1-vii-usta'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Wygładzony lewy fałd nosowo-wargowy', normVal: 'Symetria fałdów' },
          { id: 'cn-eyemov', label: 'Ruchy gałek ocznych (III, IV, VI)', triggerManeuvers: ['m1-galki'], triggerQuestions: [1], score: 2, maxItemScore: 2, findingVal: 'Ograniczone odwodzenie oka prawego, ptoza ujemna', normVal: 'Pełne ruchy, brak diplopii' },
          { id: 'cn-bulbar', label: 'Łuki podniebienne i język (IX, X, XII)', triggerManeuvers: ['m1-gardlo'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Łuki unoszą się symetrycznie, język w linii', normVal: 'Symetria, brak dyzartrii' },
          { id: 'cn-motor', label: 'Siła mięśniowa i próba Barrego (kończyny)', triggerManeuvers: ['m1-barre'], triggerQuestions: [0], score: 1, maxItemScore: 1, findingVal: 'Opadanie lewej kończyny górnej i dolnej', normVal: 'Bez opadania, siła 5/5' }
        ],
        interpretations: [
          { max: 2, label: 'Niekompletne badanie nerwów czaszkowych', color: 'var(--red)', tip: 'Nie sprawdzono kluczowej różnicy ośrodkowy vs obwodowy VII ani układu ruchowego.' },
          { max: 4, label: 'Badanie częściowe — wymagana weryfikacja pnia/kończyn', color: 'var(--amber)', tip: 'Uzupełnij ocenę siły kończyn, aby nie przeoczyć zespołu skrzyżowanego.' },
          { max: 6, label: 'Pełne badanie celowane U02', color: 'var(--green)', tip: 'Wykazano ośrodkowe uszkodzenie VII z niedowładem lewostronnym lub zespół pniowy.' }
        ]
      },
      interview: [
        { q: 'Kiedy dokładnie pojawiły się objawy i czy słabiej Pan porusza lewą ręką lub nogą?', a: 'Obudziłem się 2 godziny temu z krzywymi ustami i zauważam, że lewa ręka jest cięższa.', isKey: true },
        { q: 'W którym kierunku patrzenia podwójne widzenie jest najsilniejsze i czy znika po zasłonięciu jednego oka?', a: 'Widzę podwójnie obok siebie przy patrzeniu w prawo; po zasłonięciu jednego oka obraz staje się pojedynczy.', isKey: true },
        { q: 'Czy choruje Pan na nadciśnienie tętnicze, migotanie przedsionków lub cukrzycę?', a: 'Leczę się nieregularnie na nadciśnienie i od roku miewam kołatania serca.', isKey: true },
        { q: 'Czy bolało Pana wcześniej ucho lub pojawiła się wysypka w przewodzie słuchowym?', a: 'Nie, ucho mnie nie bolało ani nie miałem zmian skórnych.', isKey: false }
      ],
      zones: [
        {
          id: 'glowa_nerwy', name: 'Głowa i oczy (II–VI)', icon: '👁️', x: 50, y: 12,
          maneuvers: [
            { id: 'm1-galki', label: 'Badanie ruchów gałek ocznych (III, IV, VI) i źrenic', isKey: true, isFatal: false, finding: 'Źrenice równe, reaktywne. Wyraźny deficyt odwodzenia oka prawego z diplopią poziomą przy patrzeniu w prawo (n. VI prawy).', reaction: { type: 'pain', text: 'Pacjent mruży prawe oko: „Jak patrzę w prawo, obrazy się rozjeżdżają”.' } },
            { id: 'm1-v-czucie', label: 'Czucie na twarzy (V1–V3) i odruch rogówkowy', isKey: false, isFatal: false, finding: 'Czucie dotyku i bólu w zakresie V1–V3 symetryczne, odruch rogówkowy obustronnie żywy.', reaction: { type: 'normal', text: 'Czuję dotyk tak samo po obu stronach.' } },
            { id: 'm1-strop', label: 'Zakropienie atropiny w celu dokładniejszej oceny dna oka przed oceną źrenic', isKey: false, isFatal: true, fatalMessage: 'BŁĄD KRYTYCZNY: Rozszerzenie źrenic farmakologicznie uniemożliwia monitorowanie ucisku nerwu III i wgłobienia u pacjenta z podejrzeniem ostrego ogniska pniowego/naczyniowego!', complicationVitals: { hr: 96, bp: '166/98', gcs: 14 }, finding: 'Źrenice sztucznie rozszerzone — utracono kluczowy parametr monitorowania neurologicznego.', reaction: { type: 'crisis', text: 'Źrenice przestały reagować na światło po kroplach!' } }
          ]
        },
        {
          id: 'twarz_mowa', name: 'Twarz i mowa (VII, IX, X, XII)', icon: '🗣️', x: 50, y: 19,
          maneuvers: [
            { id: 'm1-vii-czolo', label: 'Polecenie zmarszczenia czoła i zaciśnięcia powiek (górne piętro VII)', isKey: true, isFatal: false, finding: 'Zmarszczki czołowe symetryczne, szpary powiekowe domykają się całkowicie obustronnie (zaoszczędzenie górnego piętra!).', reaction: { type: 'normal', text: 'Czoło marszczy się równo po lewej i prawej stronie.' } },
            { id: 'm1-vii-usta', label: 'Wyszczerzenie zębów i nadęcie policzków (dolne piętro VII)', isKey: true, isFatal: false, finding: 'Wyraźne spłycenie lewego fałdu nosowo-wargowego i opadnięcie lewego kącika ust — ośrodkowy niedowład n. VII po lewej.', reaction: { type: 'normal', text: 'Lewy kącik ust nie unosi się przy uśmiechu.' } },
            { id: 'm1-gardlo', label: 'Ocena podniebienia („aaa”), języczka (IX, X) i wysunięcia języka (XII)', isKey: true, isFatal: false, finding: 'Łuki podniebienne unoszą się symetrycznie, języczek w linii środkowej, język wysuwa się prosto.', reaction: { type: 'normal', text: 'Mowa płynna, bez dysfagii.' } }
          ]
        },
        {
          id: 'konczyny_gorne', name: 'Kończyny górne', icon: '💪', x: 24, y: 44,
          maneuvers: [
            { id: 'm1-barre', label: 'Próba Barrego i ocena siły w skali Lovetta', isKey: true, isFatal: false, finding: 'Opadanie i pronacja lewej kończyny górnej w próbie Barrego (4/5 wg Lovetta); kończyna prawa 5/5.', reaction: { type: 'lethargy', text: 'Lewa ręka wyraźnie opada po kilku sekundach.' } }
          ]
        },
        {
          id: 'konczyny_dolne', name: 'Kończyny dolne i Babiński', icon: '🦵', x: 60, y: 76,
          maneuvers: [
            { id: 'm1-babinski', label: 'Odruch podeszwowy (objaw Babińskiego) i siła kończyn dolnych', isKey: true, isFatal: false, finding: 'W lewej kończynie dolnej siła 4/5, obecny objaw Babińskiego po lewej; po prawej odruch zgięciowy prawidłowy.', reaction: { type: 'normal', text: 'Paluch lewej stopy unosi się grzbietowo.' } }
          ]
        }
      ],
      synthesis: {
        questionDiagnostic: 'Jak najtrafniej zinterpretujesz stwierdzony obraz kliniczny (porażenie odwodzenia oka prawego + ośrodkowy niedowład VII i kończyn po stronie lewej)?',
        optionsDiagnostic: [
          { id: 'd1', label: 'Zespół skrzyżowany pnia mózgu (prawa część mostu — ognisko naczyniowe: n. VI prawy + droga korowo-rdzeniowa/korowo-jądrowa dla lewej połowy ciała)', isCorrect: true, explanation: 'Uszkodzenie n. VI po stronie prawej współistniejące z niedowładem piramidowym (ośrodkowy VII + kończyny) po stronie lewej lokalizuje ognisko w prawym moście (zespół Foville’a / Millarda-Gublera wariant z VI).' },
          { id: 'd2', label: 'Obwodowe porażenie nerwu twarzowego (porażenie Bella) po lewej stronie', isCorrect: false, explanation: 'W porażeniu obwodowym n. VII zajęte jest także górne piętro (czoło i powieka) i nie występuje niedowład kończyn ani porażenie n. VI po stronie przeciwnej.' },
          { id: 'd3', label: 'Zespół szczeliny oczodołowej górnej po prawej stronie', isCorrect: false, explanation: 'Zespół szczeliny oczodołowej górnej obejmuje III, IV, VI oraz V1 po tej samej stronie bez niedowładu kończyn i bez zajęcia n. VII.' }
        ],
        differentialOptions: [
          { id: 'df1', label: 'Udar niedokrwienny w obszarze tętnicy podstawnej / gałęzi przeszywających mostu', isCorrect: true },
          { id: 'df2', label: 'Guz lub zmiana demielinizacyjna w pniu mózgu (np. SM)', isCorrect: true },
          { id: 'df3', label: 'Izolowane idiopatyczne porażenie Bella', isCorrect: false },
          { id: 'df4', label: 'Zespół ogona końskiego', isCorrect: false }
        ],
        actionOptions: [
          { id: 'a1', label: 'Pilne TK głowy + angio-TK (wykluczenie krwotoku i ocena tętnicy podstawnej) oraz kwalifikacja w oknie udarowym', isCorrect: true },
          { id: 'a2', label: 'Włączenie doustnego prednizonu i wypis do domu z zaleceniem kontroli u laryngologa za 7 dni', isCorrect: false, isFatal: true, fatalMessage: 'Wypisanie chorego z zespołem pniowym jako „porażenia Bella” grozi progresją zakrzepicy tętnicy podstawnej i śmiertelnym zawałem pnia mózgu!' },
          { id: 'a3', label: 'Oznaczenie glikemii, EKG (migotanie przedsionków) i monitorowanie parametrów życiowych', isCorrect: true }
        ]
      },
      statusPraesens: {
        title: 'Karta badania neurologicznego · Stacja 1',
        sections: [
          { num: 1, title: 'Stan świadomości i wywiad', content: 'GCS 15 pkt, chory zorientowany, objawy wystąpiły rano po przebudzeniu (okno do oceny w DWI-FLAIR / wake-up stroke).' },
          { num: 2, title: 'Nerwy czaszkowe (U02)', content: 'Porażenie odwodzenia gałki ocznej prawej (n. VI prawy); górne piętro twarzy zaoszczędzone obustronnie, ośrodkowy niedowład n. VII po lewej.' },
          { num: 3, title: 'Układ ruchowy i odruchy', content: 'Niedowład połowiczy lewostronny 4/5 z dodatnim objawem Babińskiego po stronie lewej — klasyczny zespół skrzyżowany mostu.' }
        ],
        conclusions: 'Pilne TK/angio-TK + rozważenie MRI DWI w celu oceny wake-up stroke i pilnej rewaskularyzacji.'
      }
    },
    {
      id: 'stacja-2-udar-nihss',
      number: 2,
      title: 'Stacja 2 · Ostry udar i skala NIHSS',
      shortTitle: 'Udar i NIHSS',
      topic: 'Ocena ostrego udaru MCA i kwalifikacja do trombolizy/trombektomii',
      mods: ['2', '1', '16'],
      patient: { name: 'Pani Anna W.', age: 69, weight: 70, gender: 'F', avatarType: 'adult', vitalsInitial: { hr: 94, bp: '172/94', rr: 18, spo2: 97, temp: 36.6, gcs: 14 } },
      briefing: {
        scenario: '69-letnia kobieta przywieziona przez ZRM o godz. 10:15 z powodu nagłego zaburzenia mowy i osłabienia prawej ręki, które wystąpiły o godz. 08:45 (1,5 h temu).',
        task: 'Ustal dokładny czas początku (last known well), zbierz wywiad w kierunku przeciwwskazań do rtPA, przeprowadź kluczowe elementy badania NIHSS i podejmij właściwe decyzje na SOR.'
      },
      scale: {
        id: 'nihss-mini',
        name: 'Kluczowe elementy skali NIHSS (przesiew SOR)',
        maxScore: 14,
        unit: 'pkt',
        items: [
          { id: 'n-loc', label: '1b/1c. Pytania i polecenia (orientacja)', triggerManeuvers: ['m2-mowa'], triggerQuestions: [0], score: 2, maxItemScore: 2, findingVal: 'Rozumie częściowo, afazja ruchowa', normVal: '0 pkt — pełna odpowiedź' },
          { id: 'n-gaze', label: '2. Ruchy gałek ocznych (zwrot w lewo)', triggerManeuvers: ['m2-gaze'], triggerQuestions: [], score: 1, maxItemScore: 2, findingVal: 'Częściowe porażenie spojrzenia w prawo', normVal: '0 pkt — pełne ruchy' },
          { id: 'n-face', label: '4. Porażenie mięśni twarzy', triggerManeuvers: ['m2-twarz'], triggerQuestions: [], score: 2, maxItemScore: 3, findingVal: 'Częściowy niedowład dolny prawy (2 pkt)', normVal: '0 pkt — symetria' },
          { id: 'n-arm', label: '5b. Prawa kończyna górna', triggerManeuvers: ['m2-kg'], triggerQuestions: [], score: 3, maxItemScore: 4, findingVal: 'Brak uniesienia przeciw grawitacji (3 pkt)', normVal: '0 pkt — utrzymuje 10 s' },
          { id: 'n-leg', label: '6b. Prawa kończyna dolna', triggerManeuvers: ['m2-kd'], triggerQuestions: [], score: 1, maxItemScore: 4, findingVal: 'Lekki niedowład — opada przed 5 s (1 pkt)', normVal: '0 pkt — utrzymuje 5 s' },
          { id: 'n-lang', label: '9. Mowa (afazja)', triggerManeuvers: ['m2-mowa'], triggerQuestions: [1], score: 2, maxItemScore: 3, findingVal: 'Wyraźna afazja Broca (2 pkt)', normVal: '0 pkt — bez afazji' }
        ],
        interpretations: [
          { max: 4, label: 'Udar lekki (1–4 pkt)', color: 'var(--green)', tip: 'Niewielki deficyt, przy niesprawności funkcjonalnej rozważ rtPA.' },
          { max: 15, label: 'Udar umiarkowany (5–15 pkt) — kandydat do rtPA / angio-TK!', color: 'var(--amber)', tip: 'Suma ok. 11 pkt w oknie 1,5 h: pilne TK bez kontrastu + angio-TK pod kątem LVO.' },
          { max: 42, label: 'Udar ciężki (>15 pkt)', color: 'var(--red)', tip: 'Wysokie prawdopodobieństwo okluzji dużego naczynia (LVO) — trombektomia.' }
        ]
      },
      interview: [
        { q: 'O której godzinie chora była ostatnio widziana w pełni zdrowa (last known well)?', a: 'Mąż potwierdza: o 08:45 rozmawiali przy śniadaniu, nagle upuściła kubek i przestała składać zdania.', isKey: true },
        { q: 'Czy chora przyjmuje doustne antykoagulanty (warfaryna, DOAC) lub przeszła niedawno operację/krwawienie?', a: 'Nie bierze leków przeciwkrzepliwych (tylko ramipryl), żadnych operacji ani urazów głowy.', isKey: true },
        { q: 'Czy w przeszłości występowały podobne krótkotrwałe incydenty (TIA)?', a: 'Nie, to pierwszy taki epizod w życiu.', isKey: false }
      ],
      zones: [
        {
          id: 'glowa_nerwy', name: 'Gałki oczne i pole widzenia', icon: '👁️', x: 50, y: 12,
          maneuvers: [
            { id: 'm2-gaze', label: 'Ocena ruchów poziomych gałek ocznych i pola widzenia', isKey: true, isFatal: false, finding: 'Gałki oczne mają tendencję do zbaczania w lewo (w stronę ogniska!), z trudem przekraczają linię środkową w prawo.', reaction: { type: 'lethargy', text: 'Pacjentka patrzy preferencyjnie w lewo.' } }
          ]
        },
        {
          id: 'twarz_mowa', name: 'Mowa i dolne piętro twarzy', icon: '🗣️', x: 50, y: 19,
          maneuvers: [
            { id: 'm2-mowa', label: 'Ocena mowy (nazywanie, powtarzanie, proste polecenia)', isKey: true, isFatal: false, finding: 'Mowa z trudem, pojedyncze słowa (afazja ruchowa Broca), proste 1-etapowe polecenia wykonuje.', reaction: { type: 'pain', text: 'Pacjentka denerwuje się, że nie może wypowiedzieć pełnych słów.' } },
            { id: 'm2-twarz', label: 'Ocena symetrii twarzy (marszczenie czoła vs kącik ust)', isKey: true, isFatal: false, finding: 'Czoło symetryczne, prawy kącik ust opadnięty (ośrodkowy niedowład n. VII po prawej).', reaction: { type: 'normal', text: 'Zauważalna asymetria dolnej części twarzy.' } }
          ]
        },
        {
          id: 'konczyny_gorne', name: 'Kończyny górne (NIHSS 5)', icon: '💪', x: 24, y: 44,
          maneuvers: [
            { id: 'm2-kg', label: 'Uniesienie obu kończyn górnych (90° siedząc / 45° leżąc)', isKey: true, isFatal: false, finding: 'Prawa kończyna górna nie pokonuje grawitacji (ruchy na płaszczyźnie łóżka, NIHSS 3 pkt); lewa 0 pkt.', reaction: { type: 'lethargy', text: 'Prawa ręka nie unosi się ponad materac.' } },
            { id: 'm2-asa-przed-tk', label: 'Natychmiastowe podanie 300 mg ASA i wlewu nicardypiny do RR 125/70 przed TK głowy', isKey: false, isFatal: true, fatalMessage: 'BŁĄD KRYTYCZNY: Nigdy nie podawaj kwasu acetylosalicylowego ani rtPA przed wykluczeniem krwotoku w TK, ani nie zbijaj agresywnie RR do 125/70 (grozi hipoperfuzją penumbry)!', complicationVitals: { bp: '122/68', gcs: 11 }, finding: 'Po nagłym spadku ciśnienia chora stała się senna, a niedowład narósł.', reaction: { type: 'crisis', text: 'Chora przestała reagować na głos po spadku ciśnienia!' } }
          ]
        },
        {
          id: 'konczyny_dolne', name: 'Kończyny dolne (NIHSS 6)', icon: '🦵', x: 60, y: 76,
          maneuvers: [
            { id: 'm2-kd', label: 'Uniesienie kończyn dolnych pod kątem 30° przez 5 s', isKey: true, isFatal: false, finding: 'Prawa noga opada na łóżko w 3. sekundzie (NIHSS 1 pkt) — wyraźna przewaga niedowładu ręki i twarzy nad nogą (MCA!).', reaction: { type: 'normal', text: 'Prawa noga opada znacznie wolniej niż bezwładna ręka.' } }
          ]
        }
      ],
      synthesis: {
        questionDiagnostic: 'Które terytorium naczyniowe odpowiada za obraz kliniczny (afazja ruchowa + zwrot gałek w lewo + niedowład prawej twarzy/ręki > nogi)?',
        optionsDiagnostic: [
          { id: 'd1', label: 'Lewa tętnica środkowa mózgu (MCA) — pień lub gałąź górna po stronie dominującej', isCorrect: true, explanation: 'MCA zaopatruje boczną powierzchnię półkuli (reprezentacja twarzy i kończyny górnej) oraz ośrodek Broca w lewym płacie czołowym.' },
          { id: 'd2', label: 'Lewa tętnica przednia mózgu (ACA)', isCorrect: false, explanation: 'ACA powoduje niedowład głównie kończyny dolnej przeciwstronnie i abulię, bez ciężkiego niedowładu ręki i twarzy.' },
          { id: 'd3', label: 'Prawa tętnica tylna mózgu (PCA)', isCorrect: false, explanation: 'PCA wywołuje jednoimienne niedowidzenie połowicze po stronie przeciwnej, nie zaś afazję Broca z dominującym niedowładem ręki.' }
        ],
        differentialOptions: [
          { id: 'df1', label: 'Udar niedokrwienny w obszarze lewej MCA (kandydat do rtPA i/lub MT)', isCorrect: true },
          { id: 'df2', label: 'Krwotok śródmózgowy w lewej półkuli (wymaga wykluczenia w TK)', isCorrect: true },
          { id: 'df3', label: 'Hipoglikemia (udomowiony mimetyk udaru — wymaga glukometru)', isCorrect: true },
          { id: 'df4', label: 'Zespół Wallenberga', isCorrect: false }
        ],
        actionOptions: [
          { id: 'a1', label: 'Natychmiastowe TK głowy bez kontrastu + angio-TK + glikemia/INR/APTT/płytki i wdrożenie rtPA (63 mg dla 70 kg) po wykluczeniu krwotoku', isCorrect: true },
          { id: 'a2', label: 'Podanie rtPA w karetce bez TK głowy, bo czas to mózg', isCorrect: false, isFatal: true, fatalMessage: 'Bezwzględnym warunkiem podania alteplazy jest WYKLUCZENIE krwotoku śródmózgowego w TK/MRI!' },
          { id: 'a3', label: 'Utrzymywanie RR <185/110 mmHg przed rtPA i konsultacja pracowni radiologii zabiegowej w razie LVO (M1)', isCorrect: true }
        ]
      },
      statusPraesens: {
        title: 'Karta ostrego udaru · Stacja 2',
        sections: [
          { num: 1, title: 'Okno czasowe i parametry', content: 'Czas od początku 1,5 h (<4,5 h). RR 172/94 mmHg (<185/110 mmHg — spełnia kryterium dla rtPA bez agresywnej hipotensji).' },
          { num: 2, title: 'Wynik NIHSS i lokalizacja', content: 'NIHSS ok. 11 pkt: afazja ruchowa, zwrot gałek w lewo, ośrodkowy VII po prawej, KG 3 pkt > KD 1 pkt → terytorium lewej MCA.' },
          { num: 3, title: 'Plan dawkowania rtPA (70 kg)', content: '0,9 mg/kg × 70 kg = 63 mg alteplazy (6,3 mg bolus i.v. + 56,7 mg wlew 60 min) po ujemnym TK dla krwotoku; ASA dopiero po 24 h i kontrolnym TK.' }
        ],
        conclusions: 'Pilna ścieżka udarowa: TK + angio-TK → rtPA → ewentualna trombektomia mechaniczna przy okluzji M1.'
      }
    },
    {
      id: 'stacja-3-ataksja-umn',
      number: 3,
      title: 'Stacja 3 · Ataksja i UMN vs LMN',
      shortTitle: 'Ataksja i UMN/LMN',
      topic: 'Różnicowanie zespołu móżdżkowego, sznurów tylnych i zespołu UMN/LMN',
      mods: ['5', '14', '12'],
      patient: { name: 'Pan Piotr S.', age: 63, weight: 78, gender: 'M', avatarType: 'adult', vitalsInitial: { hr: 72, bp: '132/80', rr: 15, spo2: 98, temp: 36.5, gcs: 15 } },
      briefing: {
        scenario: '63-letni mężczyzna zgłasza postępujące od 6 miesięcy chwianie się przy chodzeniu (szczególnie w ciemnym korytarzu lub pod prysznicem po zamknięciu oczu) oraz mrowienie stóp.',
        task: 'Przeprowadź badanie czucia powierzchownego i głębokiego, próby zborności, próbę Romberga oraz odruchy, aby zróżnicować ataksję tylnosznurową, móżdżkową i chorobę neuronu ruchowego.'
      },
      scale: {
        id: 'ataxia-eval',
        name: 'Protokół różnicowania ataksji i neuronów ruchowych',
        maxScore: 5,
        unit: 'pkt',
        items: [
          { id: 'at-romberg', label: 'Próba Romberga (oczy otwarte vs zamknięte)', triggerManeuvers: ['m3-romberg'], triggerQuestions: [0], score: 2, maxItemScore: 2, findingVal: 'Dodatnia — gwałtowne chwianie/upadek po zamknięciu oczu', normVal: 'Stabilny z oczami zamkniętymi' },
          { id: 'at-vib', label: 'Czucie głębokie (wibracja kamertonem 128 Hz + ułożenie)', triggerManeuvers: ['m3-wibracja'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Zniesione wibracje od kostek po kolana', normVal: 'Prawidłowe do kostek' },
          { id: 'at-cereb', label: 'Próby móżdżkowe (palec-nos, dysdiadochokineza)', triggerManeuvers: ['m3-palec-nos'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Bez drżenia zamiarowego i dysmetrii przy oczach otwartych', normVal: 'Płynne i precyzyjne' },
          { id: 'at-refl', label: 'Odruchy głębokie i objaw Babińskiego', triggerManeuvers: ['m3-odruchy'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Wygórowane kolanowe + obustronny Babiński przy słabych skokowych', normVal: 'Symetryczne ++, podeszwowy zgięciowy' }
        ],
        interpretations: [
          { max: 2, label: 'Niekompletna diagnostyka ataksji', color: 'var(--red)', tip: 'Brak oceny czucia głębokiego i próby Romberga uniemożliwia odróżnienie móżdżku od sznurów tylnych.' },
          { max: 4, label: 'Rozpoznano ataksję czuciową — oceń układ piramidowy', color: 'var(--amber)', tip: 'Dodaj ocenę odruchów i objawu Babińskiego w kierunku zwyrodnienia powrózkowego (B12).' },
          { max: 5, label: 'Pełne rozpoznanie topodiagnostyczne', color: 'var(--green)', tip: 'Ataksja tylnosznurowa + cechy piramidowe i neuropatia = klasyczny obraz niedoboru witaminy B12.' }
        ]
      },
      interview: [
        { q: 'Kiedy chód najbardziej się pogarsza — w dzień czy po ciemku / przy myciu twarzy z zamkniętymi oczami?', a: 'Pod prysznicem, gdy zamykam oczy, od razu tracę równowagę i muszę trzymać się ściany.', isKey: true },
        { q: 'Czy przeszedł Pan operacje żołądka/jelit, przyjmuje metforminę/IPP lub stosuje dietę wegańską?', a: 'Od 8 lat biorę omeprazol oraz metforminę i miałem przewlekłe zapalenie błony śluzowej żołądka.', isKey: true },
        { q: 'Czy ma Pan zawroty głowy z wymiotami albo niewyraźną mowę?', a: 'Nie, nie kręci mi się w głowie i mówię wyraźnie.', isKey: false }
      ],
      zones: [
        {
          id: 'twarz_mowa', name: 'Mowa i oczopląs (móżdżek)', icon: '🗣️', x: 50, y: 19,
          maneuvers: [
            { id: 'm3-mowa', label: 'Ocena mowy skandowanej i oczopląsu', isKey: false, isFatal: false, finding: 'Mowa płynna (bez skandowania), oczopląs nieobecny.', reaction: { type: 'normal', text: 'Wymowa czysta i rytmiczna.' } }
          ]
        },
        {
          id: 'konczyny_gorne', name: 'Próby móżdżkowe (KG)', icon: '✋', x: 24, y: 44,
          maneuvers: [
            { id: 'm3-palec-nos', label: 'Próba palec-nos i naprzemienna pronacja/supinacja', isKey: true, isFatal: false, finding: 'Z oczami otwartymi bez dysmetrii i bez dysdiadochokinezy; po zamknięciu oczu lekko zbacza z powodu braku czucia ułożenia.', reaction: { type: 'normal', text: 'Przy otwartych oczach trafia pewnie w nos.' } }
          ]
        },
        {
          id: 'tulow_odruchy', name: 'Próba Romberga i chód', icon: '🧍', x: 50, y: 48,
          maneuvers: [
            { id: 'm3-romberg', label: 'Próba Romberga (stopy złączone, oczy otwarte → zamknięte)', isKey: true, isFatal: false, finding: 'Przy oczach otwartych stoi stabilnie; bezpośrednio po zamknięciu oczu gwałtownie chwieje się i wymaga asekuracji (objaw Romberga wyraźnie dodatni!).', reaction: { type: 'pain', text: 'Po zamknięciu oczu pacjent natychmiast traci równowagę — asekuracja!' } },
            { id: 'm3-romberg-no-asekuracja', label: 'Polecenie stania na jednej nodze z zamkniętymi oczami bez asekuracji', isKey: false, isFatal: true, fatalMessage: 'BŁĄD BEZPIECZEŃSTWA (U02): Podczas próby Romberga badający MUSI stać blisko i asekurować chorego z obu stron przed upadkiem!', complicationVitals: { hr: 98, bp: '150/90' }, finding: 'Chory upadłby podczas badania bez asekuracji — uraz głowy!', reaction: { type: 'crisis', text: 'Pacjent przewraca się w bok bez podtrzymania!' } }
          ]
        },
        {
          id: 'konczyny_dolne', name: 'Czucie głębokie i odruchy KD', icon: '🦵', x: 60, y: 76,
          maneuvers: [
            { id: 'm3-wibracja', label: 'Badanie czucia wibracji (128 Hz) i ułożenia palucha', isKey: true, isFatal: false, finding: 'Zniesienie czucia wibracji na kostkach przyśrodkowych i nieprawidłowe rozpoznawanie kierunku ruchu palucha.', reaction: { type: 'normal', text: 'Nie czuję drgań kamertonu na stopach.' } },
            { id: 'm3-odruchy', label: 'Odruchy kolanowe, skokowe i objaw Babińskiego', isKey: true, isFatal: false, finding: 'Odruchy kolanowe wygórowane (+++), skokowe osłabione (+), obustronny objaw Babińskiego (+) — współistnienie uszkodzenia dróg piramidowych i polineuropatii.', reaction: { type: 'normal', text: 'Mieszany profil odruchów + Babiński dodatni.' } }
          ]
        }
      ],
      synthesis: {
        questionDiagnostic: 'Która lokalizacja i rozpoznanie najlepiej tłumaczą dodatnią próbę Romberga, zniesione czucie wibracji, osłabienie odruchów skokowych i obustronny objaw Babińskiego?',
        optionsDiagnostic: [
          { id: 'd1', label: 'Zwyrodnienie powrózkowe rdzenia kręgowego (sznury tylne + drogi korowo-rdzeniowe + nerwy obwodowe) w przebiegu niedoboru witaminy B12', isCorrect: true, explanation: 'Połączenie ataksji tylnosznurowej (Romberg +, brak wibracji), cech UMN (kolanowe +++, Babiński +) oraz polineuropatii (skokowe +) jest patognomoniczne dla niedoboru kobalaminy.' },
          { id: 'd2', label: 'Izolowane uszkodzenie półkuli móżdżku', isCorrect: false, explanation: 'Zespół móżdżkowy daje chwianie już przy oczach otwartych, dysmetrię i hipotonię bez zaburzeń czucia wibracji i bez objawu Babińskiego.' },
          { id: 'd3', label: 'Stwardnienie zanikowe boczne (SLA)', isCorrect: false, explanation: 'W SLA czucie powierzchowne i głębokie pozostaje prawidłowe.' }
        ],
        differentialOptions: [
          { id: 'df1', label: 'Niedobór witaminy B12 (metformina + IPP + zapalenie żołądka)', isCorrect: true },
          { id: 'df2', label: 'Wiąd rdzenia (kiła późna) lub niedobór miedzi', isCorrect: true },
          { id: 'df3', label: 'Zespół Guillaina-Barrégo', isCorrect: false },
          { id: 'df4', label: 'Choroba Parkinsona', isCorrect: false }
        ],
        actionOptions: [
          { id: 'a1', label: 'Oznaczenie witaminy B12, kwasu metylomalonowego, homocysteiny, morfologii (MCV), MRI rdzenia szyjnego/piersiowego oraz suplementacja B12 i.m.', isCorrect: true },
          { id: 'a2', label: 'Podanie samej wysokiej dawki kwasu foliowego bez witaminy B12', isCorrect: false, isFatal: true, fatalMessage: 'BŁĄD: Kwas foliowy maskuje niedokrwistość megaloblastyczną i nasila nieodwracalne uszkodzenie sznurów tylnych rdzenia przy niedoborze B12!' },
          { id: 'a3', label: 'Zlecenie ENG/EMG w celu oceny współistniejącej polineuropatii', isCorrect: true }
        ]
      },
      statusPraesens: {
        title: 'Karta badania ataksji · Stacja 3',
        sections: [
          { num: 1, title: 'Zborność i próba Romberga', content: 'Brak dysmetrii móżdżkowej przy oczach otwartych; wyraźnie dodatnia próba Romberga (ataksja czuciowa) oraz chód na szerszej podstawie.' },
          { num: 2, title: 'Czucie głębokie i odruchy', content: 'Zniesienie wibracji i propriocepcji dystalnie; kolanowe +++, skokowe +, obustronny Babiński (+).' }
        ],
        conclusions: 'Obraz zwyrodnienia powrózkowego rdzenia — pilne oznaczenie B12, MMA i pozajelitowa suplementacja cyjanokobalaminy.'
      }
    },
    {
      id: 'stacja-4-opony-korzenie',
      number: 4,
      title: 'Stacja 4 · Objawy oponowe i korzeniowe',
      shortTitle: 'Opony i korzenie',
      topic: 'ZOMR / SAH vs radikulopatia i zespół ogona końskiego',
      mods: ['1', '7', '8', '16'],
      patient: { name: 'Pani Karolina M.', age: 42, weight: 65, gender: 'F', avatarType: 'adult', vitalsInitial: { hr: 108, bp: '126/78', rr: 20, spo2: 98, temp: 38.9, gcs: 13 } },
      briefing: {
        scenario: '42-letnia kobieta z narastającym od 18 godzin silnym bólem głowy, gorączką 38,9°C, nudnościami i światłowstrętem; od 2 godzin mąż zauważył senność oraz trudność ze znalezieniem słów.',
        task: 'Zbadaj objawy oponowe i korzeniowe, sprawdź dno oka / obecność ogniskowości oraz zaplanuj bezpieczną kolejność diagnostyki i leczenia.'
      },
      scale: {
        id: 'meningeal-safety',
        name: 'Bezpieczeństwo w podejrzeniu ZOMR / neuroinfekcji',
        maxScore: 5,
        unit: 'pkt',
        items: [
          { id: 'men-neck', label: 'Sztywność karku i objaw Brudzińskiego', triggerManeuvers: ['m4-kark'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Sztywność na 4 palce, Brudziński (+)', normVal: 'Bródka dotyka mostka' },
          { id: 'men-kernig', label: 'Objaw Kerniga (różnicowanie z Lasègue’iem)', triggerManeuvers: ['m4-kernig'], triggerQuestions: [], score: 1, maxItemScore: 1, findingVal: 'Dodatni obustronnie przy wyproście kolana (90°/90°)', normVal: 'Ujemny obustronnie' },
          { id: 'men-fundus', label: 'Ocena ogniskowości / dna oka przed LP', triggerManeuvers: ['m4-dno-oka'], triggerQuestions: [0], score: 2, maxItemScore: 2, findingVal: 'Senność (GCS 13) + dysfazja + zatarte granice tarczy n. II', normVal: 'GCS 15, bez ogniska i obrzęku tarczy' },
          { id: 'men-cauda', label: 'Wykluczenie objawów ucisku ogona końskiego', triggerManeuvers: ['m4-lasegue'], triggerQuestions: [1], score: 1, maxItemScore: 1, findingVal: 'Brak zatrzymania moczu i znieczulenia krocza', normVal: 'Czucie krocza prawidłowe' }
        ],
        interpretations: [
          { max: 2, label: 'Ryzyko błędu przy kwalifikacji do LP', color: 'var(--red)', tip: 'Koniecznie oceń przeciwwskazania do punkcji lędźwiowej przed zabiegiem.' },
          { max: 4, label: 'Rozpoznano zespół oponowy', color: 'var(--amber)', tip: 'Upewnij się co do kolejności: posiewy → antybiotyk + deksametazon → TK głowy.' },
          { max: 5, label: 'Bezpieczne postępowanie w neuroinfekcji', color: 'var(--green)', tip: 'Rozpoznano przeciwwskazania do natychmiastowej LP; priorytetem antybiotyk przed TK.' }
        ]
      },
      interview: [
        { q: 'Czy pojawiła się senność, zaburzenia mowy, drgawki lub osłabienie jednej strony ciała?', a: 'Mąż mówi, że od 2 godzin myli słowa i staje się coraz bardziej senna.', isKey: true },
        { q: 'Czy ma Pani problemy z oddaniem moczu albo drętwienie w okolicy pośladków i krocza?', a: 'Nie, oddawała mocz normalnie i nie ma drętwienia nóg.', isKey: false },
        { q: 'Czy w ostatnim tygodniu przeszła Pani zapalenie zatok lub ucha środkowego?', a: 'Tak, przez tydzień miała silny ropny katar i ból zatok czołowych.', isKey: true }
      ],
      zones: [
        {
          id: 'glowa_nerwy', name: 'Dno oka i nerwy czaszkowe', icon: '👁️', x: 50, y: 12,
          maneuvers: [
            { id: 'm4-dno-oka', label: 'Oftalmoskopia (ocena tarczy nerwu II) i ocena mowy', isKey: true, isFatal: false, finding: 'Granice tarczy nerwu II lekko zatarte (obrzęk!), chora senna (GCS 13) z elementami dysfazji.', reaction: { type: 'lethargy', text: 'Pacjentka z trudem otwiera oczy na światło oftalmoskopu.' } }
          ]
        },
        {
          id: 'kark_opony', name: 'Kark (sztywność i Brudziński)', icon: '🧠', x: 50, y: 27,
          maneuvers: [
            { id: 'm4-kark', label: 'Sztywność karku i górny objaw Brudzińskiego', isKey: true, isFatal: false, finding: 'Wyraźna sztywność karku (4 cm / 3 palce od mostka) oraz odruchowe zgięcie w stawach kolanowych (Brudziński +).', reaction: { type: 'pain', text: 'Wyraźny grymas bólowy przy próbie zgięcia szyi.' } }
          ]
        },
        {
          id: 'tulow_odruchy', name: 'Okolica lędźwiowa (LP)', icon: '💉', x: 50, y: 48,
          maneuvers: [
            { id: 'm4-lp-natychmiast', label: 'Natychmiastowe nakłucie lędźwiowe BEZ wcześniejszego TK głowy mimo GCS 13, dysfazji i obrzęku tarczy', isKey: false, isFatal: true, fatalMessage: 'BŁĄD KRYTYCZNY: Obecność objawów ogniskowych (dysfazja), zaburzeń świadomości i obrzęku tarczy n. II jest BEZWZGLĘDNYM przeciwwskazaniem do LP przed TK głowy — ryzyko wgłobienia!', complicationVitals: { hr: 52, bp: '188/104', rr: 10, gcs: 7 }, finding: 'Gwałtowne pogorszenie stanu, bradykardia i poszerzenie źrenicy (wgłobienie!).', reaction: { type: 'crisis', text: 'Alarm monitora! Bradykardia i spadek GCS do 7 pkt!' } }
          ]
        },
        {
          id: 'konczyny_dolne', name: 'Kernig i Lasègue (KD)', icon: '🦵', x: 60, y: 76,
          maneuvers: [
            { id: 'm4-kernig', label: 'Objaw Kerniga (zgięcie biodra 90° → wyprost kolana)', isKey: true, isFatal: false, finding: 'Obustronny opór bólowy przy prostowaniu podudzia z jednoczesnym zgięciem w biodrze (Kernig + obustronny = zespół oponowy).', reaction: { type: 'pain', text: 'Ból ciągnący wzdłuż obu nóg i karku.' } },
            { id: 'm4-lasegue', label: 'Objaw Lasègue’a (unoszenie wyprostowanej kończyny)', isKey: false, isFatal: false, finding: 'Ograniczony symetrycznie obustronnie przy >60° wtórnie do podrażnienia opon (w typowej rwie kulszowej jest jednostronny i <45°).', reaction: { type: 'normal', text: 'Brak jednostronnego bólu korzeniowego do stopy.' } }
          ]
        }
      ],
      synthesis: {
        questionDiagnostic: 'Jakie rozpoznanie wstępne i bezwzględna kolejność działań obowiązują u chorej (gorączka + sztywność karku + dysfazja + obrzęk tarczy n. II)?',
        optionsDiagnostic: [
          { id: 'd1', label: 'Podejrzenie bakteryjnego ZOMR (lub ropnia mózgu po zapaleniu zatok) z cechami wzmożonego ICP — zakaz natychmiastowej LP przed TK', isCorrect: true, explanation: 'Połączenie triady oponowej z ogniskiem (dysfazja) i obrzękiem tarczy n. II wymaga najpierw wdrożenia antybiotyku + deksametazonu i wykonania TK głowy przed decyzją o LP.' },
          { id: 'd2', label: 'Łagodny wirusowy ból głowy bez konieczności antybiotykoterapii', isCorrect: false, explanation: 'GCS 13 i dysfazja po zapaleniu zatok przy gorączce 38,9°C wykluczają łagodny zespół.' },
          { id: 'd3', label: 'Zespół ogona końskiego', isCorrect: false, explanation: 'Brak dysfunkcji zwieraczy i znieczulenia krocza; dominuje zespół oponowo-mózgowy.' }
        ],
        differentialOptions: [
          { id: 'df1', label: 'Bakteryjne zapalenie opon mózgowo-rdzeniowych (np. S. pneumoniae po zapaleniu zatok)', isCorrect: true },
          { id: 'df2', label: 'Ropień mózgu lub ropniak podtwardówkowy', isCorrect: true },
          { id: 'df3', label: 'Opryszczkowe zapalenie mózgu (HSV-1)', isCorrect: true },
          { id: 'df4', label: 'Przepuklina jądra miażdżystego L5–S1', isCorrect: false }
        ],
        actionOptions: [
          { id: 'a1', label: '2× posiew krwi → deksametazon 10 mg i.v. + ceftriakson 2 g i.v. + wankomycyna (ew. acyklowir) → dopiero potem pilne TK głowy', isCorrect: true },
          { id: 'a2', label: 'Oczekiwanie na wynik TK głowy przed podaniem pierwszej dawki antybiotyku', isCorrect: false, isFatal: true, fatalMessage: 'Opóźnianie antybiotyku w podejrzeniu ropnego ZOMR o czas oczekiwania na TK zwiększa śmiertelność!' },
          { id: 'a3', label: 'Wykonanie LP dopiero gdy TK wykluczy efekt masy i przesunięcie linii środkowej', isCorrect: true }
        ]
      },
      statusPraesens: {
        title: 'Karta ostrego zespołu oponowego · Stacja 4',
        sections: [
          { num: 1, title: 'Objawy oponowe i korzeniowe', content: 'Sztywność karku (+), Brudziński górny (+), Kernig (+) obustronnie; objaw Lasègue’a bez jednostronnej asymetrii korzeniowej.' },
          { num: 2, title: 'Przeciwwskazania do pilnej LP', content: 'GCS 13 pkt, dysfazja i zatarte granice tarczy n. II nakazują wykonanie TK głowy przed LP — po uprzednim podaniu antybiotyku i sterydu.' }
        ],
        conclusions: 'Pobierz krew na posiew, podaj natychmiast deksametazon + ceftriakson + wankomycynę, wykonaj pilne TK głowy z kontrastem.'
      }
    }
  ];


  const IMAGING_TRAINER_CASES = [
    {
      id: 'tk-udar-mca',
      modality: 'tk',
      title: 'TK głowy · wczesny udar niedokrwienny lewej MCA',
      short: 'Hiperdensyjna MCA i zatarcie wyspy',
      mods: ['2', '16'],
      atlas: 'udar',
      sec: 'kwalifikacja',
      vignette: '71-letni mężczyzna przywieziony 90 min po nagłym wystąpieniu afazji ruchowej i niedowładu prawej ręki (NIHSS 13). W wykonanym pilnie TK głowy bez kontrastu wykluczono krwotok, widoczny jest wczesny objaw w lewym dole Sylwiusza.',
      svgType: 'tk-udar-mca',
      hotspot: { id: 'hs-mca', name: 'Hiperdensyjna lewa MCA (objaw pasma)', targetX: 252, targetY: 162, radius: 34, hint: 'Sprawdź hiperdensyjne naczynie (skrzeplinę w odcinku M1) po stronie radiologicznej prawej (= anatomicznie lewej) oraz zatarcie wstęgi wyspy.' },
      clinicalQuestion: {
        q: 'Co oznacza hiperdensyjny przebieg lewej tętnicy środkowej mózgu w TK bez kontrastu przy braku krwotoku śródmózgowego?',
        opts: [
          'Obecność skrzepliny w odcinku M1 lewej MCA (LVO) — bezwzględne wskazanie do pilnego angio-TK i kwalifikacji do rtPA oraz trombektomii mechanicznej',
          'Rozległy krwotok śródmózgowy będący przeciwwskazaniem do leczenia reperfuzyjnego',
          'Prawidłowy wariant zwapnienia fizjologicznego niewymagający dalszej diagnostyki',
          'Przewlekłą bliznę poudarową wykluczającą wdrożenie trombolizy'
        ],
        correct: 0,
        explanation: 'Hiperdensyjna MCA świadczy o świeżym zakrzepie zamykającym główny pień tętnicy (LVO). Nie jest to krwotok — chory w oknie <4,5 h powinien otrzymać rtPA i pilne angio-TK pod kątem trombektomii (MT).',
        pearl: 'Wskazówka PUM #6: Prawidłowy obraz miąższu w pierwszych godzinach TK nie wyklucza udaru — otwiera okno do trombolizy.'
      }
    },
    {
      id: 'tk-krwotok',
      modality: 'tk',
      title: 'TK głowy · krwotok śródmózgowy do jąder podstawy',
      short: 'Hiperdensyjny krwiak w skorupie/wzgórzu',
      mods: ['2', '1', '16'],
      atlas: 'udar',
      sec: 'krwotoczny',
      vignette: '64-letni chory z wieloletnim nieleczonym nadciśnieniem tętniczym (przy przyjęciu RR 218/118 mmHg) doznał nagłego bólu głowy, wymiotów, narastającego niedowładu lewostronnego oraz senności (GCS 11).',
      svgType: 'tk-krwotok',
      hotspot: { id: 'hs-ich', name: 'Hiperdensyjne ognisko krwotoczne w prawej skorupie', targetX: 152, targetY: 146, radius: 36, hint: 'Wskaż wyraźnie jasną (hiperdensyjną) masę krwi w głębi prawej półkuli (strona lewa obrazu TK) uciskającą róg przedni komory bocznej.' },
      clinicalQuestion: {
        q: 'Jakie jest priorytetowe postępowanie po stwierdzeniu ostrego krwotoku śródmózgowego u tego chorego?',
        opts: [
          'Kontrolowane obniżenie skurczowego ciśnienia tętniczego (cel ~140 mmHg i.v.), odwrócenie ewentualnej antykoagulacji i ocena neurochirurgiczna',
          'Natychmiastowe podanie alteplazy 0,9 mg/kg i kwasu acetylosalicylowego 300 mg',
          'Zlecenie planowego MRI za 7 dni bez modyfikacji ciśnienia tętniczego',
          'Rutynowe wykonanie nakłucia lędźwiowego w celu potwierdzenia krwi w PMR'
        ],
        correct: 0,
        explanation: 'W nadciśnieniowym krwotoku śródmózgowym kluczowe jest zapobieganie powiększaniu krwiaka poprzez stopniowe obniżenie SBP do ok. 140 mmHg (np. urapidyl/labetalol/nikardypina i.v.), korekta koagulopatii oraz profilaktyka wgłobienia.',
        pearl: 'Najczęstszą lokalizacją krwotoku nadciśnieniowego są jądra podstawy (skorupa), następnie wzgórze, most i móżdżek.'
      }
    },
    {
      id: 'tk-sah',
      modality: 'tk',
      title: 'TK głowy · krwotok podpajęczynówkowy (SAH)',
      short: 'Krew w zbiornikach podstawy („gwiazda”)',
      mods: ['2', '7', '1', '16'],
      atlas: 'udar',
      sec: 'sah',
      vignette: '48-letnia kobieta podczas wysiłku poczuła nagły, najsilniejszy w życiu ból głowy w okolicy potylicznej z krótkotrwałą utratą przytomności, wymiotami i sztywnością karku.',
      svgType: 'tk-sah',
      hotspot: { id: 'hs-sah', name: 'Hiperdensyjna krew w zbiornikach podstawy i bruzdach Sylwiusza', targetX: 200, targetY: 168, radius: 34, hint: 'Wskaż jasne pasma krwi wypełniające gwiaździście zbiorniki podstawy wokół śródmózgowia i szczeliny Sylwiusza.' },
      clinicalQuestion: {
        q: 'Jakie badanie wykonujesz w następnym kroku po potwierdzeniu SAH w TK głowy bez kontrastu?',
        opts: [
          'Pilne angio-TK naczyń mózgowych (lub DSA) w poszukiwaniu pękniętego tętniaka oraz profilaktykę skurczu naczyniowego nimodypiną',
          'Wyłącznie wypisanie sumatryptanu i obserwację w poradni migrenowej',
          'Włączenie heparyny drobnocząsteczkowej w dawce terapeutycznej',
          'Rozpoczęcie dożylnej trombolizy alteplazą'
        ],
        correct: 0,
        explanation: 'Po potwierdzeniu SAH w TK (skala Fishera) konieczne jest pilne uwidocznienie tętniaka w angio-TK/angiografii subtrakcyjnej (klipsowanie lub embolizacja wewnątrznaczyniowa) i włączenie nimodypiny p.o. w celu prewencji skurczu naczyniowego.',
        pearl: 'Gdy TK wykonane >6 h od piorunującego bólu głowy jest ujemne, SAH wyklucza się nakłuciem lędźwiowym (ksantochromia).'
      }
    },
    {
      id: 'tk-krwiak-podtw',
      modality: 'tk',
      title: 'TK głowy · ostry krwiak podtwardówkowy',
      short: 'Sierpowata masa przekraczająca szwy',
      mods: ['1', '3', '16'],
      atlas: 'nagle',
      sec: 'urazy',
      vignette: '76-letni pacjent przyjmujący apiksaban z powodu migotania przedsionków po upadku przed 12 godzinami zgłasza narastający ból głowy, senność oraz niedowład prawej kończyny górnej; lewa źrenica jest szersza niż prawa.',
      svgType: 'tk-krwiak-podtw',
      hotspot: { id: 'hs-sdh', name: 'Sierpowaty krwiak podtwardówkowy przy sklepistości z efektem masy', targetX: 288, targetY: 132, radius: 36, hint: 'Wskaż wklęsło-wypukłą (sierpowatą) hiperdensyjną warstwę rozciągającą się wzdłuż całej lewej półkuli (strona prawa obrazu) i spychającą linię środkową.' },
      clinicalQuestion: {
        q: 'Jaka cecha morfologiczna odróżnia krwiak podtwardówkowy (SDH) od nadtwardówkowego (EDH) w TK głowy?',
        opts: [
          'Kształt sierpowaty (wklęsły od strony mózgu) przekraczający szwy czaszki, ale ograniczony przez sierp i namiot móżdżku',
          'Kształt dwuwypukłej soczewki ograniczony wyłącznie do jednego płata między szwami czaszki',
          'Wypełnienie wyłącznie komór bocznych bez ucisku sklepistości',
          'Brak możliwości wystąpienia przesunięcia linii środkowej'
        ],
        correct: 0,
        explanation: 'Krwiak podtwardówkowy wynika zwykle z rozerwania żył mostkowych, szerzy się wzdłuż przestrzeni podtwardówkowej jako sierp i przekracza szwy (w przeciwieństwie do soczewkowatego tętniczego EDH z tętnicy oponowej środkowej).',
        pearl: 'Zawsze pytaj chorych po urazach głowy w podeszłym wieku o przyjmowanie antykoagulantów (NOAC/VKA).'
      }
    },
    {
      id: 'mri-sm',
      modality: 'mri',
      title: 'MRI mózgu FLAIR · ogniska demielinizacji w SM',
      short: 'Owalne zmiany okołokomorowe („palce Dawsona”)',
      mods: ['9', '16'],
      atlas: 'autoimmuno',
      sec: 'mcdonald',
      vignette: '29-letnia kobieta po przebytym przed rokiem pozagałkowym zapaleniu nerwu wzrokowego prawego obecnie zgłasza osłabienie i drętwienie kończyn dolnych oraz objaw Lhermitte’a.',
      svgType: 'mri-sm',
      hotspot: { id: 'hs-ms', name: 'Okołokomorowe ogniska hiperintensywne w FLAIR (palce Dawsona)', targetX: 168, targetY: 118, radius: 34, hint: 'Wskaż jasne, owalne ogniska przylegające prostopadle do brzegów komór bocznych w istocie białej.' },
      clinicalQuestion: {
        q: 'Które stwierdzenie poprawnie opisuje rolę MRI w kryteriach McDonalda dla stwardnienia rozsianego?',
        opts: [
          'Umożliwia wykazanie rozsiania w przestrzeni (DIS ≥2 z 4 lokalizacji: okołokomorowo, podkorowo/przykory, podnamiotowo, rdzeń) oraz w czasie (DIT: jednoczesne zmiany Gd+ i Gd−)',
          'Do rozpoznania SM wystarczy pojedyncza zmiana okołokomorowa bez objawów klinicznych',
          'Obecność prążków oligoklonalnych wyklucza rozsianie w czasie',
          'Badaniem z wyboru do oceny płytek demielinizacyjnych w SM jest TK bez kontrastu'
        ],
        correct: 0,
        explanation: 'MRI w sekwencjach T2/FLAIR oraz T1 z gadolinem stanowi podstawę kryteriów McDonalda (2017): 4 typowe lokalizacje OUN dla DIS oraz współistnienie ognisk wzmacniających i niewzmacniających po kontraście (lub prążki oligoklonalne w PMR) dla DIT.',
        pearl: 'W rzucie SM z deficytem funkcjonalnym podaje się metyloprednizolon i.v. (1000 mg/d przez 3–5 dni), nie stosuje się go jako przewlekłego DMT.'
      }
    },
    {
      id: 'mri-guz-tylny',
      modality: 'mri',
      title: 'MRI mózgu T1+Gd · guz kąta mostowo-móżdżkowego',
      short: 'Zmiana z wrastaniem do przewodu słuchowego',
      mods: ['13', '6', '16'],
      atlas: 'guzy',
      sec: 'typy',
      vignette: '54-letni pacjent z postępującym od 2 lat jednostronnym niedosłuchem odbiorczym w prawym uchu, szumami usznymi, osłabieniem odruchu rogówkowego oraz łagodną ataksją prawej ręki.',
      svgType: 'mri-guz-tylny',
      hotspot: { id: 'hs-cpa', name: 'Wzmacniający się guz prawego kąta mostowo-móżdżkowego', targetX: 146, targetY: 184, radius: 34, hint: 'Wskaż dobrze odgraniczoną, silnie wzmacniającą masę w przestrzeni między mostem a móżdżkiem po stronie prawej (strona lewa przekroju), uciskającą pień i IV komorę.' },
      clinicalQuestion: {
        q: 'Jaki guz jest najczęstszą przyczyną tego zespołu i jakie nerwy czaszkowe ulegają uszkodzeniu w kącie mostowo-móżdżkowym?',
        opts: [
          'Osłoniak przedsionkowy (nerwiak n. VIII) — zajmuje n. VIII, V (zniesienie odruchu rogówkowego) i VII, a przy wzroście powoduje ataksję móżdżkową i wodogłowie',
          'Glejak wielopostaciowy płata czołowego — zajmuje n. I i n. XII',
          'Gruczolak przysadki — powoduje wyłącznie niedowidzenie dwuskroniowe',
          'Oponiak rynienki węchowej — powoduje zespół Foster-Kennedy’ego'
        ],
        correct: 0,
        explanation: 'Najczęstszym guzem kąta mostowo-móżdżkowego jest osłoniak nerwu VIII (następnie oponiak i perlak). Wczesny objaw to jednostronny niedosłuch i szumy (VIII), potem ubytek czucia V i porażenie VII oraz objawy móżdżkowe.',
        pearl: 'Przy każdym jednostronnym postępującym niedosłuchu odbiorczym lub braku odruchu rogówkowego wykonaj MRI głowy z kontrastem.'
      }
    }
  ];

  const NEURO_DRUG_DATABASE = [
    {
      id: 'alteplaza',
      name: 'Alteplaza (rtPA)',
      category: 'udar',
      categoryName: 'Tromboliza i udar',
      defaultRoute: 'i.v.',
      tradeNames: ['Actilyse'],
      forms: [
        { id: 'rtpa-50', name: 'Proszek i rozp. do r-ru do wstrz./inf. 50 mg (1 mg/ml)', strengthMgPerMl: 1, strengthLabel: '1 mg/ml (50 mg/50 ml)', packLabel: 'Fiolka 50 mg + 50 ml' },
        { id: 'rtpa-20', name: 'Proszek i rozp. do r-ru do wstrz./inf. 20 mg (1 mg/ml)', strengthMgPerMl: 1, strengthLabel: '1 mg/ml (20 mg/20 ml)', packLabel: 'Fiolka 20 mg + 20 ml' }
      ],
      indications: [
        { id: 'ind-ais', name: 'Ostry udar niedokrwienny (<4,5 h)', doseScheme: '0,9 mg/kg m.c. (maks. 90 mg): 10% bolus i.v. w 1 min, 90% wlew i.v. przez 60 min', durationDays: 1, note: 'Alternatywa wg wytycznych ESO/AHA: tenekteplaza 0,25 mg/kg (maks. 25 mg) w pojedynczym bolusie i.v.' }
      ],
      patientAdvice: 'Wyjaśnić choremu lub rodzinie pilny cel leczenia reperfuzyjnego i ryzyko krwawienia śródczaszkowego; ścisły nadzór neurologiczny przez 24 h.',
      warning: 'BEZWZGLĘDNIE wykluczyć krwotok w TK/MRI! RR przed podaniem <185/110 mmHg; nie podawać leków przeciwpłytkowych/antykoagulantów przez 24 h po wlewie i do kontrolnego TK.'
    },
    {
      id: 'kwas-acetylosalicylowy',
      name: 'Kwas acetylosalicylowy (ASA)',
      category: 'udar',
      categoryName: 'Tromboliza i udar',
      defaultRoute: 'p.o.',
      tradeNames: ['Acard', 'Polocard', 'Aspirin Protect'],
      forms: [
        { id: 'asa-75', name: 'Tabletki dojelitowe 75 mg', strengthLabel: '75 mg/tabl.', packLabel: 'Op. 60 tabl.' },
        { id: 'asa-150', name: 'Tabletki dojelitowe 150 mg', strengthLabel: '150 mg/tabl.', packLabel: 'Op. 60 tabl.' },
        { id: 'asa-300', name: 'Tabletki 300 mg (dawka nasycająca)', strengthLabel: '300 mg/tabl.', packLabel: 'Op. 20 tabl.' }
      ],
      indications: [
        { id: 'ind-asa-ais', name: 'Ostry udar niedokrwienny (bez rtPA) / prewencja wtórna', doseScheme: '150–300 mg w ciągu 24–48 h po wykluczeniu krwotoku, następnie 75–150 mg/d', durationDays: 30, note: 'W TIA wysokiego ryzyka (ABCD2 ≥4) lub lekkim udarze (NIHSS ≤3) rozważ krótką DAPT (ASA + klopidogrel przez 21 dni).' }
      ],
      patientAdvice: 'Przyjmować regularnie po posiłku; w prewencji wtórnej nie odstawiać samodzielnie bez konsultacji lekarskiej.',
      warning: 'Po podaniu alteplazy odczekać minimum 24 h i wykonać kontrolne TK głowy wykluczające ukrwotocznienie przed włączeniem ASA.'
    },
    {
      id: 'lewetyracetam',
      name: 'Lewetyracetam',
      category: 'padaczka',
      categoryName: 'Leki przeciwpadaczkowe',
      defaultRoute: 'p.o. / i.v.',
      tradeNames: ['Keppra', 'Vetira', 'Cezarius'],
      forms: [
        { id: 'lev-500', name: 'Tabletki powlekane 500 mg', strengthLabel: '500 mg/tabl.', packLabel: 'Op. 50 tabl.' },
        { id: 'lev-1000', name: 'Tabletki powlekane 1000 mg', strengthLabel: '1000 mg/tabl.', packLabel: 'Op. 50 tabl.' },
        { id: 'lev-iv', name: 'Koncentrat do sporz. r-ru do inf. 100 mg/ml', strengthMgPerMl: 100, strengthLabel: '100 mg/ml (500 mg/5 ml)', packLabel: 'Fiolka 5 ml' }
      ],
      indications: [
        { id: 'ind-lev-epi', name: 'Padaczka ogniskowa i uogólniona (przewlekle)', doseScheme: 'Początkowo 500 mg 2×/d (maks. 1500 mg 2×/d)', durationDays: 30, note: 'Minimalne interakcje lekowe, lek preferowany u kobiet w wieku rozrodczym i u chorych wielolekowych.' },
        { id: 'ind-lev-se', name: 'Stan padaczkowy — II linia po benzodiazepinie', doseScheme: '60 mg/kg m.c. i.v. we wlewie 10–15 min (maks. 4500 mg)', durationDays: 1, note: 'Równorzędna skuteczność z walproinianem i fosfenytoiną (badanie ESETT).' }
      ],
      patientAdvice: 'Nie przerywać nagle terapii (ryzyko napadu z odbicia/SE); zgłaszać nasilone zmiany nastroju lub drażliwość.',
      warning: 'Redukować dawkę przy niewydolności nerek; monitorować działania niepożądane psychiczne (drażliwość, depresja).'
    },
    {
      id: 'kwas-walproinowy',
      name: 'Kwas walproinowy / walproinian sodu',
      category: 'padaczka',
      categoryName: 'Leki przeciwpadaczkowe',
      defaultRoute: 'p.o. / i.v.',
      tradeNames: ['Depakine Chrono', 'Convulex', 'Absenor'],
      forms: [
        { id: 'vpa-500', name: 'Tabletki o przedłużonym uwalnianiu 500 mg', strengthLabel: '500 mg/tabl.', packLabel: 'Op. 30 tabl.' },
        { id: 'vpa-iv', name: 'Proszek i rozp. do wstrz. i.v. 400 mg', strengthMgPerMl: 100, strengthLabel: '100 mg/ml (400 mg/4 ml)', packLabel: 'Fiolka 400 mg' }
      ],
      indications: [
        { id: 'ind-vpa-gen', name: 'Padaczka uogólniona (np. JME, napady nieświadomości, T-K)', doseScheme: '500–1500 mg/d w 1–2 dawkach (zwykle 15–30 mg/kg/d)', durationDays: 30, note: 'Najszersze spektrum w padaczkach uogólnionych idiopatycznych u mężczyzn.' },
        { id: 'ind-vpa-se', name: 'Stan padaczkowy — II linia', doseScheme: '40 mg/kg m.c. i.v. (maks. 3000 mg) w ciągu 10 min', durationDays: 1, note: 'Przeciwwskazany w ciężkim uszkodzeniu wątroby i zaburzeniach cyklu mocznikowego.' }
      ],
      patientAdvice: 'Kontrolować masę ciała, morfologię, próby wątrobowe oraz zgłaszać silne bóle w nadbrzuszu, senność lub drżenia.',
      warning: 'WYSOKA TERATOGENNOŚĆ (wady cewy nerwowej, zaburzenia neurorozwojowe) — przeciwwskazany u kobiet w wieku rozrodczym bez spełnienia programu zapobiegania ciąży!'
    },
    {
      id: 'karbamazepina',
      name: 'Karbamazepina',
      category: 'bol',
      categoryName: 'Bóle i neuralgie',
      defaultRoute: 'p.o.',
      tradeNames: ['Tegretol CR', 'Amizepin', 'Neurotop retard'],
      forms: [
        { id: 'cbz-200', name: 'Tabletki o zmodyfikowanym uwalnianiu 200 mg', strengthLabel: '200 mg/tabl.', packLabel: 'Op. 50 tabl.' },
        { id: 'cbz-400', name: 'Tabletki o zmodyfikowanym uwalnianiu 400 mg', strengthLabel: '400 mg/tabl.', packLabel: 'Op. 30 tabl.' }
      ],
      indications: [
        { id: 'ind-cbz-tn', name: 'Neuralgia nerwu trójdzielnego (lek I rzutu)', doseScheme: 'Start 100–200 mg 1–2×/d, powolne zwiększanie do 400–800 mg/d (maks. 1200 mg/d)', durationDays: 30, note: 'Alternatywa o lepszej tolerancji: okskarbazepina.' },
        { id: 'ind-cbz-foc', name: 'Padaczka z napadami ogniskowymi', doseScheme: '400–1200 mg/d w 2 dawkach podzielonych CR', durationDays: 30, note: 'Może nasilać napady uogólnione nieświadomości i miokloniczne!' }
      ],
      patientAdvice: 'Wprowadzać lek stopniowo, aby uniknąć zawrotów głowy i senności; unikać soku grejpfrutowego i alkoholu.',
      warning: 'Induktor CYP450 (osłabia antykoncepcję, DOAC, warfarynę); ryzyko hiponatremii (SIADH), leukopenii i zespołu Stevensa-Johnsona (HLA-B*1502).'
    },
    {
      id: 'diazepam',
      name: 'Diazepam (oraz BZD w stanie padaczkowym)',
      category: 'nagle',
      categoryName: 'Stany nagłe / SE',
      defaultRoute: 'i.v. / p.r.',
      tradeNames: ['Relanium', 'Diazepam Desitin'],
      forms: [
        { id: 'dzp-iv', name: 'Roztwór do wstrzykiwań 5 mg/ml (amp. 10 mg/2 ml)', strengthMgPerMl: 5, strengthLabel: '5 mg/ml (10 mg/2 ml)', packLabel: 'Amp. 2 ml' },
        { id: 'dzp-pr', name: 'Wlewka doodbytnicza 10 mg/2,5 ml', strengthMgPerMl: 4, strengthLabel: '10 mg/2,5 ml', packLabel: 'Tubka 2,5 ml' }
      ],
      indications: [
        { id: 'ind-dzp-se', name: 'Drgawkowy stan padaczkowy (t1 = 5 min) — I linia', doseScheme: '10 mg i.v. (maks. 2–5 mg/min); można powtórzyć po 5 min do maks. 20 mg; alternatywnie lorazepam 4 mg i.v. lub midazolam 10 mg i.m.', durationDays: 1, note: 'W warunkach przedszpitalnych/domowych bez wkłucia: midazolam i.m./donosowo lub diazepam p.r.' }
      ],
      patientAdvice: 'Po podaniu benzodiazepin zakaz prowadzenia pojazdów; po wyprowadzeniu ze stanu padaczkowego konieczna diagnostyka przyczyny napadu.',
      warning: 'Ryzyko depresji oddechowej i hipotonii — mieć przygotowany zestaw do udrożnienia dróg oddechowych i wentylacji!'
    },
    {
      id: 'sumatryptan',
      name: 'Sumatryptan',
      category: 'bol',
      categoryName: 'Bóle i neuralgie',
      defaultRoute: 'p.o. / s.c.',
      tradeNames: ['Imigran', 'Sumamigren', 'Cinie'],
      forms: [
        { id: 'sum-50', name: 'Tabletki powlekane 50 mg', strengthLabel: '50 mg/tabl.', packLabel: 'Op. 6 tabl.' },
        { id: 'sum-100', name: 'Tabletki powlekane 100 mg', strengthLabel: '100 mg/tabl.', packLabel: 'Op. 6 tabl.' },
        { id: 'sum-sc', name: 'Roztwór do wstrzykiwań s.c. 6 mg/0,5 ml', strengthMgPerMl: 12, strengthLabel: '6 mg/0,5 ml', packLabel: 'Amp.-strzyk. 2 szt.' }
      ],
      indications: [
        { id: 'ind-sum-mig', name: 'Ostry napad migreny (przerywanie)', doseScheme: '50–100 mg p.o. jak najwcześniej w fazie bólu (maks. 200–300 mg/d)', durationDays: 10, note: 'Nie podawać w trakcie samej aury ani częściej niż 9 dni/miesiąc (polekowy ból głowy MOH).' },
        { id: 'ind-sum-tac', name: 'Klasterowy ból głowy (napad ostry)', doseScheme: '6 mg s.c. (+ tlen 100% 12–15 l/min przez maskę bezzwrotną)', durationDays: 10, note: 'Tlenoterapia wysokoprzepływowa i sumatryptan s.c. to standard przerywania napadu klasterowego.' }
      ],
      patientAdvice: 'Przyjąć na początku bólu głowy; jeśli ból nawróci, kolejną tabletkę można przyjąć nie wcześniej niż po 2 h.',
      warning: 'PRZECIWWSKAZANY w chorobie wieńcowej, po zawale, przebytym udarze/TIA, w niekontrolowanym nadciśnieniu oraz migrenie połowiczoporaźnej/pniowej!'
    },
    {
      id: 'lewodopa-benserazyd',
      name: 'Lewodopa + benserazyd (lub karbidopa)',
      category: 'zwyrodnienia',
      categoryName: 'Układ pozapiramidowy',
      defaultRoute: 'p.o.',
      tradeNames: ['Madopar', 'Madopar HBS', 'Nakom'],
      forms: [
        { id: 'ld-125', name: 'Kapsułki 100 mg + 25 mg (Madopar 125)', strengthLabel: '100 mg lewodopy + 25 mg benserazydu', packLabel: 'Op. 30 lub 100 kaps.' },
        { id: 'ld-250', name: 'Tabletki 200 mg + 50 mg (Madopar 250)', strengthLabel: '200 mg lewodopy + 50 mg benserazydu', packLabel: 'Op. 30 lub 100 tabl.' }
      ],
      indications: [
        { id: 'ind-ld-pd', name: 'Choroba Parkinsona — leczenie objawowe (złoty standard)', doseScheme: 'Start 50–100 mg lewodopy 2–3×/d, stopniowe miareczkowanie wg objawów (zwykle 300–800 mg/d)', durationDays: 30, note: 'Wybitna poprawa bradykinezji i sztywności potwierdza idiopatyczną chorobę Parkinsona w przeciwieństwie do MSA/PSP.' }
      ],
      patientAdvice: 'Przyjmować 30–60 min przed posiłkiem lub 1–2 h po posiłku (białka konkurują o wchłanianie w jelicie i barierze krew-mózg); nie odstawiać nagle (ryzyko złośliwego zespołu neuroleptycznego!).',
      warning: 'Po kilku latach terapii rozwijają się fluktuacje ruchowe („wearing-off”) i dyskinezy szczytu dawki; uwaga na hipotonię ortostatyczną.'
    },
    {
      id: 'pirydostygmina',
      name: 'Pirydostygmina',
      category: 'zlacze',
      categoryName: 'Złącze i autoimmunologia',
      defaultRoute: 'p.o.',
      tradeNames: ['Mestinon'],
      forms: [
        { id: 'pyr-60', name: 'Tabletki drażowane 60 mg', strengthLabel: '60 mg/tabl.', packLabel: 'Op. 20 lub 150 tabl.' }
      ],
      indications: [
        { id: 'ind-pyr-mg', name: 'Miastenia gravis — leczenie objawowe I linii', doseScheme: '30–60 mg co 4–6 h w ciągu dnia (zwykle 180–360 mg/d w 4–6 dawkach)', durationDays: 30, note: 'Inhibitor acetylocholinoesterazy (nie działa na mechanizm autoimmunologiczny — łączy się z GKS/azatiopryną).' }
      ],
      patientAdvice: 'Zapisywać godziny dawek i nasilenie ptozy/połykania; unikać leków nasilających blok złącza (aminoglikozydy, makrolidy, fluorochinolony, beta-blokery, sole magnezu).',
      warning: 'Przedawkowanie wywołuje PRZEŁOM CHOLINERGICZNY (wąskie źrenice, ślinotok, poty, bradykardia, biegunka, fascykulacje i narastające osłabienie)!'
    },
    {
      id: 'metyloprednizolon',
      name: 'Metyloprednizolon (pulsy i.v.)',
      category: 'zlacze',
      categoryName: 'Złącze i autoimmunologia',
      defaultRoute: 'i.v.',
      tradeNames: ['Solu-Medrol', 'Meprelon'],
      forms: [
        { id: 'mp-500', name: 'Proszek i rozp. do wstrz. i.v. 500 mg', strengthLabel: '500 mg/fiol.', packLabel: 'Fiolka 500 mg' },
        { id: 'mp-1000', name: 'Proszek i rozp. do wstrz. i.v. 1000 mg', strengthLabel: '1000 mg/fiol.', packLabel: 'Fiolka 1000 mg' }
      ],
      indications: [
        { id: 'ind-mp-sm', name: 'Rzut stwardnienia rozsianego (SM) / NMOSD / AIE', doseScheme: '1000 mg/d i.v. we wlewie 60 min przez 3–5 dni', durationDays: 5, note: 'Skraca czas trwania rzutu, ale nie zmienia odległej niepełnosprawności (do tego służą leki DMT).' }
      ],
      patientAdvice: 'Przyjmować osłonowo inhibitor pompy protonowej; monitorować glikemię, ciśnienie tętnicze oraz nastrój i senność podczas pulsoterapii.',
      warning: 'Przed podaniem pulsów wykluczyć aktywne zakażenie (np. ZOMR/ropień, utajona gruźlica); w ostrym GBS sterydy są NIESKUTECZNE.'
    },
    {
      id: 'mannitol',
      name: 'Mannitol 15% / 20%',
      category: 'nagle',
      categoryName: 'Stany nagłe / ICP',
      defaultRoute: 'i.v.',
      tradeNames: ['Mannitol 15% Fresenius', 'Mannitol 20% Baxter'],
      forms: [
        { id: 'man-20', name: 'Roztwór do infuzji 20% (200 mg/ml, 250 ml)', strengthMgPerMl: 200, strengthLabel: '200 mg/ml (20%)', packLabel: 'Butelka 250 ml' },
        { id: 'man-15', name: 'Roztwór do infuzji 15% (150 mg/ml, 250 ml)', strengthMgPerMl: 150, strengthLabel: '150 mg/ml (15%)', packLabel: 'Butelka 250 ml' }
      ],
      indications: [
        { id: 'ind-man-icp', name: 'Ostre wzmożone ICP / zagrażające wgłobienie mózgu', doseScheme: '0,25–1 g/kg m.c. i.v. we wlewie 15–20 min (następnie ewent. 0,25–0,5 g/kg co 4–6 h)', durationDays: 2, note: 'Unieść wezgłowie o 30°, utrzymywać normowolemię; alternatywa: stężony NaCl 3%.' }
      ],
      patientAdvice: 'Leczenie wyłącznie szpitalne pod ścisłym monitoringiem bilansu płynów, diurezy, elektrolitów i stanu neurologicznego.',
      warning: 'Kontrolować osmolalność osocza (<320 mOsm/kg) i sód — ryzyko odwodnienia, ostrego uszkodzenia nerek oraz efektu z odbicia przy długim podawaniu.'
    },
    {
      id: 'ceftriakson',
      name: 'Ceftriakson (empiria bakteryjnego ZOMR)',
      category: 'nagle',
      categoryName: 'Stany nagłe / Neuroinfekcje',
      defaultRoute: 'i.v.',
      tradeNames: ['Biotrakson', 'Tartriakson', 'Rocephin'],
      forms: [
        { id: 'cef-2g', name: 'Proszek do sporz. r-ru do inf. 2 g', strengthLabel: '2 g/fiol.', packLabel: 'Fiolka 2 g' }
      ],
      indications: [
        { id: 'ind-cef-zomr', name: 'Bakteryjne zapalenie opon mózgowo-rdzeniowych (empiria)', doseScheme: '2 g i.v. co 12 h (4 g/d) + wankomycyna (+ ampicylina 2 g co 4 h u osób >50 r.ż. lub w immunosupresji)', durationDays: 10, note: 'Podać z pierwszą dawką deksametazonu (10 mg i.v. co 6 h przez 4 dni) natychmiast po pobraniu posiewów krwi, PRZED TK!' }
      ],
      patientAdvice: 'Poinformować zespół o ewentualnej nadwrażliwości na beta-laktamy; pełna terapia dożylna w oddziale szpitalnym.',
      warning: 'Nie opóźniać pierwszej dawki ceftriaksonu oczekiwaniem na TK głowy ani na wynik punkcji lędźwiowej przy podejrzeniu ropnego ZOMR.'
    }
  ];

  const PRESCRIPTION_CHALLENGES = [
    {
      id: 'chal-rtpa',
      title: 'Tromboliza dożylna alteplazą (rtPA) · pacjent 70 kg',
      vignette: '70-kilogramowy chory z nagłym niedowładem lewostronnym i dyzartrią (NIHSS 9 pkt) trafił na SOR 75 minut od zachorowania. TK głowy bez kontrastu wykluczyło krwotok, RR 168/90 mmHg, INR 1,0.',
      drugId: 'alteplaza',
      weight: 70,
      steps: [
        {
          step: 1, title: 'Dawka całkowita alteplazy',
          q: 'Jaką dawkę całkowitą alteplazy obliczysz dla chorego o masie ciała 70 kg (schemat 0,9 mg/kg, maks. 90 mg)?',
          opts: ['63 mg (0,9 × 70 kg)', '90 mg (zawsze dawka maksymalna)', '35 mg (0,5 mg/kg)', '17,5 mg'],
          correct: 0,
          explanation: 'Dawka standardowa alteplazy wynosi 0,9 mg/kg m.c. (do limitu 90 mg przy masie ≥100 kg): 0,9 × 70 = 63 mg. (17,5 mg to dawka tenekteplazy 0,25 mg/kg).'
        },
        {
          step: 2, title: 'Podział bolus / wlew ciągły',
          q: 'W jakim schemacie podasz obliczone 63 mg (stężenie 1 mg/ml)?',
          opts: ['10% w bolusie i.v. (6,3 mg w 1 min) + 90% we wlewie 60 min (56,7 mg)', '50% w bolusie i 50% przez 30 min', 'Całość 63 mg w szybkim bolusie 10-sekundowym', 'Całość we wlewie 24-godzinnym'],
          correct: 0,
          explanation: 'Alteplazę podaje się w podziale 10% dawki całkowitej w bolusie przez 1 min (6,3 mg = 6,3 ml) i pozostałe 90% w pompie infuzyjnej przez 60 min (56,7 ml/h).'
        },
        {
          step: 3, title: 'Bezpieczeństwo ciśnienia i leków',
          q: 'Kiedy u tego chorego wolno bezpiecznie włączyć kwas acetylosalicylowy (ASA)?',
          opts: ['Dopiero po upływie ≥24 h od rtPA i po wykluczeniu ukrwotocznienia w kontrolnym TK głowy', 'Natychmiast razem z bolusem alteplazy', 'Po 2 godzinach od zakończenia wlewu bez kontrolnego TK', 'Nie wolno w ogóle podawać ASA po udarze niedokrwiennym'],
          correct: 0,
          explanation: 'Przez pierwsze 24 h po alteplazie nie podaje się leków przeciwpłytkowych ani przeciwkrzepliwych; warunkiem włączenia ASA jest kontrolne badanie TK po 24 h bez krwotoku.'
        }
      ],
      pearl: 'Wskazówka PUM #6: Jeśli chory waży 120 kg, dawka całkowita alteplazy pozostaje ograniczona do 90 mg (9 mg bolus + 81 mg wlew).'
    },
    {
      id: 'chal-se',
      title: 'Stan padaczkowy (SE) · pacjent 80 kg',
      vignette: '80-kilogramowy chory na padaczkę ma uogólnione drgawki toniczno-kloniczne trwające nieprzerwanie od 7 minut na oddziale ratunkowym. Glikemia włośniczkowa 118 mg/dl, zapewniono dostęp i.v. i tlen.',
      drugId: 'diazepam',
      weight: 80,
      steps: [
        {
          step: 1, title: 'Próg czasowy i lek I rzutu',
          q: 'Która decyzja jest właściwa w 7. minucie uogólnionych drgawek (po przekroczeniu t1 = 5 min)?',
          opts: ['Natychmiastowe podanie benzodiazepiny i.v. (diazepam 10 mg i.v. lub lorazepam 4 mg i.v.)', 'Obserwacja do 30. minuty napadu przed włączeniem leków', 'Natychmiastowe podanie karbamazepiny doustnie', 'Wykonanie planowego EEG przed podaniem leku'],
          correct: 0,
          explanation: 'Dla drgawkowego stanu padaczkowego t1 = 5 min oznacza moment rozpoznania SE i natychmiastowego podania benzodiazepiny I rzutu.'
        },
        {
          step: 2, title: 'II linia po nieskuteczności benzodiazepiny',
          q: 'Mimo dwóch dawek benzodiazepiny drgawki nawróciły po 12 minutach. Jaką dawkę lewetyracetamu i.v. zastosujesz w II linii (60 mg/kg, maks. 4500 mg)?',
          opts: ['4500 mg i.v. we wlewie 10–15 min (limit dawki maksymalnej mimo 60×80 = 4800 mg)', '500 mg i.v. raz dziennie', '100 mg i.v. w szybkim bolusie', '9000 mg i.v.'],
          correct: 0,
          explanation: 'Obliczona dawka 60 mg/kg × 80 kg = 4800 mg przekracza dopuszczalny limit 4500 mg, dlatego podaje się maksymalną dawkę jednorazową 4500 mg i.v.'
        },
        {
          step: 3, title: 'Ostrożność przy wyborze walproinianu',
          q: 'Gdyby w II linii w analogicznej sytuacji leczyć młodą kobietę w wieku rozrodczym, dlaczego walproinian nie jest pierwszym wyborem w leczeniu przewlekłym?',
          opts: ['Z powodu bardzo wysokiego ryzyka teratogenności (wady cewy nerwowej, zaburzenia rozwoju poznawczego płodu)', 'Ponieważ walproinian wywołuje wyłącznie napady ogniskowe', 'Ponieważ wymaga podawania co 2 godziny', 'Ponieważ nie działa w napadach uogólnionych'],
          correct: 0,
          explanation: 'Walproinian jest wysoce skuteczny w napadach uogólnionych, ale u kobiet w wieku rozrodczym jest obarczony najwyższym ryzykiem wad wrodzonych — lekiem bezpieczniejszym jest lewetyracetam lub lamotrygina.'
        }
      ],
      pearl: 'Stan padaczkowy leczy się według zegara: 0–5 min ABC/glukoza, 5–20 min BZD, 20–40 min LPP II linii i.v., >40 min znieczulenie ogólne (propofol/midazolam/tiopental).'
    },
    {
      id: 'chal-zomr',
      title: 'Podejrzenie bakteryjnego ZOMR · pacjent 62-letni',
      vignette: '62-letni mężczyzna (75 kg) z gorączką 39,2°C, sztywnością karku, splątaniem (GCS 12) i dyskretnym niedowładem prawej ręki po przebytym zapaleniu ucha środkowego.',
      drugId: 'ceftriakson',
      weight: 75,
      steps: [
        {
          step: 1, title: 'Kolejność postępowania wobec niedowładu i GCS 12',
          q: 'Jaka jest właściwa kolejność działań u pacjenta z podejrzeniem ropnego ZOMR i deficytem ogniskowym?',
          opts: ['2× posiew krwi → deksametazon i.v. + antybiotyki empiryczne → pilne TK głowy → dopiero po wykluczeniu masy ewentualna LP', 'Natychmiastowa punkcja lędźwiowa przed TK i antybiotykami', 'Najpierw TK głowy, potem oczekiwanie 2 godziny na opis, dopiero wtedy antybiotyk', 'Podanie samego paracetamolu i obserwacja na sali'],
          correct: 0,
          explanation: 'Objawy ogniskowe wymagają wykluczenia efektu masy w TK przed LP, ale pierwszą dawkę antybiotyku i deksametazonu należy podać NIEZWŁOCZNIE po pobraniu krwi na posiew, przed TK!'
        },
        {
          step: 2, title: 'Dawka ceftriaksonu w ZOMR',
          q: 'Jakie dawkowanie ceftriaksonu obowiązuje w bakteryjnym zapaleniu opon mózgowo-rdzeniowych u dorosłego?',
          opts: ['2 g i.v. co 12 h (4 g/dobę — podwójna dawka oponowa dla penetracji przez barierę krew-mózg)', '1 g i.v. co 24 h', '500 mg p.o. co 12 h', '250 mg i.m. jednorazowo'],
          correct: 0,
          explanation: 'Penetracja antybiotyków do PMR wymaga maksymalnych dawek oponowych — ceftriakson stosuje się w dawce 2 g co 12 h i.v. (+ wankomycyna).'
        },
        {
          step: 3, title: 'Pokrycie drobnoustrojów w wieku 62 lat',
          q: 'Dlaczego u pacjenta w wieku >50 lat do ceftriaksonu i wankomycyny dodaje się ampicylinę 2 g i.v. co 4 h?',
          opts: ['Aby objąć spektrum Listeria monocytogenes (cefalosporyny nie działają na Listerię)', 'W celu leczenia opryszczkowego zapalenia mózgu', 'Dla obniżenia ciśnienia śródczaszkowego', 'Ponieważ ampicylina zastępuje deksametazon'],
          correct: 0,
          explanation: 'U dorosłych >50 r.ż., kobiet w ciąży i chorych z niedoborem odporności częstszym patogenem jest Listeria monocytogenes — oporna na cefalosporyny, wrażliwa na ampicylinę.'
        }
      ],
      pearl: 'Deksametazon (10 mg i.v. co 6 h) podaje się przed lub jednocześnie z pierwszą dawką antybiotyku (zmniejsza powikłania w ZOMR wywołanym przez S. pneumoniae).'
    },
    {
      id: 'chal-v',
      title: 'Neuralgia nerwu trójdzielnego · wybór terapii',
      vignette: '56-letnia kobieta od 3 tygodni odczuwa sekundowe, przeszywające napady bólu prawego policzka i żuchwy (V2/V3) wyzwalane myciem zębów i podmuchem wiatru; brak ubytków w badaniu neurologicznym.',
      drugId: 'karbamazepina',
      weight: 68,
      steps: [
        {
          step: 1, title: 'Lek pierwszego rzutu w neuralgii V',
          q: 'Który lek jest złotym standardem farmakoterapii pierwszego rzutu w klasycznej neuralgii nerwu trójdzielnego?',
          opts: ['Karbamazepina (lub okskarbazepina) w stopniowo miareczkowanej dawce', 'Sumatryptan 100 mg doraźnie', 'Ketoprofen + tramadol', 'Kwas acetylosalicylowy 300 mg/d'],
          correct: 0,
          explanation: 'Tryptany i NLPZ/opioidy są w neuralgii V nieskuteczne — lekami z wyboru są stabilizatory kanałów sodowych: karbamazepina lub okskarbazepina.'
        },
        {
          step: 2, title: 'Sposób włączania i badania kontrolne',
          q: 'Jakie parametry laboratoryjne wymagają kontroli podczas terapii karbamazepiną?',
          opts: ['Jonogram (ryzyko hiponatremii/SIADH), morfologia krwi (leukopenia) oraz próby wątrobowe', 'Wyłącznie stężenie witaminy B12', 'Wyłącznie krzywą cukrową', 'Badania laboratoryjne nie są potrzebne'],
          correct: 0,
          explanation: 'Karbamazepina może wywoływać hiponatremię z niedoboru ADH (SIADH), supresję szpiku oraz wzrost transaminaz.'
        },
        {
          step: 3, title: 'Alarm diagnostyczny w neuralgii V',
          q: 'Kiedy u pacjenta z bólem twarzy podejrzewasz neuralgię wtórną (objawową) wymagającą pilnego MRI mózgu?',
          opts: ['U osoby młodej (<40 r.ż.), przy zajęciu V1, obustronnych objawach lub stwierdzeniu ubytku czucia / zniesionego odruchu rogówkowego', 'Wyłącznie gdy ból trwa krócej niż 2 sekundy', 'Gdy ból ustępuje po karbamazepinie', 'Gdy brak zaburzeń czucia i wiek >55 lat'],
          correct: 0,
          explanation: 'Młody wiek, zajęcie V1, objawy obustronne lub obiektywny ubytek neurologiczny (niedoczulica, brak odruchu rogówkowego) nakazują pilne wykluczenie SM lub guza kąta mostowo-móżdżkowego w MRI.'
        }
      ],
      pearl: 'Wskazówka PUM: Ubytki czucia lub brak odruchu rogówkowego przemawiają przeciw klasycznej idiopatycznej neuralgii V — szukaj kompresji lub guza/SM.'
    },
    {
      id: 'chal-pd',
      title: 'Choroba Parkinsona · włączenie lewodopy',
      vignette: '67-letni mężczyzna (76 kg) z asymetrycznym drżeniem spoczynkowym lewej ręki (4–5 Hz), spowolnieniem ruchowym (bradykinezja) i objawem koła zębatego w lewym nadgarstku.',
      drugId: 'lewodopa-benserazyd',
      weight: 76,
      steps: [
        {
          step: 1, title: 'Dobór leku o najwyższej skuteczności objawowej',
          q: 'Dlaczego lewodopę łączy się z inhibitorem obwodowej dekarboksylazy (benserazyd lub karbidopa)?',
          opts: ['Aby zapobiec obwodowemu przekształcaniu lewodopy w dopaminę (zwiększa dostępność w mózgu i zmniejsza nudności/hipotonię)', 'Aby wydłużyć czas przejścia przez żołądek do 24 godzin', 'Aby całkowicie wyleczyć i zatrzymać zwyrodnienie istoty czarnej', 'Aby zastąpić leki przeciwpadaczkowe'],
          correct: 0,
          explanation: 'Inhibitory DDCI (benserazyd/karbidopa) nie przechodzą przez barierę krew-mózg i blokują rozpad lewodopy na obwodzie.'
        },
        {
          step: 2, title: 'Zasada przyjmowania względem posiłków',
          q: 'Jak należy poinstruować chorego o porze przyjmowania lewodopy?',
          opts: ['30–60 minut przed posiłkiem (szczególnie przed posiłkami bogatymi w białko)', 'Zawsze w trakcie obfitego obiadu mięsnego', 'Jednorazowo raz w tygodniu przed snem', 'Wyłącznie doraźnie w momencie silnego drżenia'],
          correct: 0,
          explanation: 'Duże obojętne aminokwasy z diety konkurują z lewodopą o transporter w jelicie i na barierze krew-mózg, osłabiając efekt dawki.'
        },
        {
          step: 3, title: 'Powikłania wieloletniej terapii lewodopą',
          q: 'Jakie charakterystyczne powikłanie pojawia się najczęściej po 4–6 latach leczenia lewodopą?',
          opts: ['Fluktuacje ruchowe („wearing-off”, zjawisko on-off) oraz dyskinezy szczytu dawki', 'Rozszczepienie białkowo-komórkowe w PMR', 'Poszerzenie źrenicy z opadaniem powieki', 'Ostre zatrzymanie moczu już po 1. tabletce'],
          correct: 0,
          explanation: 'W miarę utraty neuronów dopaminergicznych skraca się okno terapeutyczne, co prowadzi do skracania czasu działania dawki (wearing-off) i ruchów mimowolnych (dyskinez).'
        }
      ],
      pearl: 'Wskazówka PUM #8: Rozpoznanie Parkinsona opiera się na bradykinezji + sztywności/drżeniu spoczynkowym i dobrej odpowiedzi na lewodopę.'
    }
  ];

  const TOPODIAGNOSIS_DATABASE = [
    {
      id: 'mca-stroke',
      name: 'Zespół tętnicy środkowej mózgu (MCA)',
      altName: 'Udar półkulowy krążenia przedniego',
      lesionSite: 'Boczna powierzchnia półkuli mózgu (zakręt przedśrodkowy/zaśrodkowy dla twarzy i ręki, ośrodki mowy w półkuli dominującej)',
      classicSign: 'Przeciwstronny niedowład twarzy (dolne VII) i kończyny górnej wyraźnie większy niż kończyny dolnej + afazja (lewa półkula) lub zespół zaniedbywania (prawa)',
      motorPattern: 'Niedowład połowiczy przeciwstronny (twarz i KG > KD); w ostrej fazie zwrot gałek ocznych w stronę ogniska („patrzy na ognisko”)',
      sensoryPattern: 'Połowicza niedoczulica korowa twarzy i kończyny górnej po stronie przeciwnej + niedowidzenie połowicze jednoimienne',
      reflexPattern: 'Początkowo osłabione (szok), następnie wygórowane odruchy głębokie i objaw Babińskiego (+) po stronie przeciwnej',
      cranialNerves: 'Ośrodkowy niedowład n. VII po stronie przeciwnej (zaoszczędzone czoło!), ewentualnie ośrodkowy XII',
      bodyRegions: ['face_contra', 'arm_contra'],
      specialZones: [
        { label: 'Półkula dominująca (zwykle lewa)', desc: 'Afazja ruchowa Broca, czuciowa Wernickego lub całkowita (globalna)' },
        { label: 'Półkula niedominująca (zwykle prawa)', desc: 'Zespół zaniedbywania połowiczego (hemineglect), anozognozja, apraksja konstrukcyjna' }
      ],
      differential: ['Zespół ACA (noga > ręka)', 'Zespół pniowy (objawy skrzyżowane)', 'Porażenie Todda po napadzie', 'Krwotok śródmózgowy'],
      treatment: 'Pilne TK bez kontrastu → rtPA 0,9 mg/kg (<4,5 h) + angio-TK → trombektomia mechaniczna w LVO (<6–24 h).',
      trap: 'Wskazówka PUM #3 i #5: Upewnij się, że czoło marszczy się symetrycznie (ośrodkowe VII) oraz że niedowład dominuje w twarzy i ręce, nie w nodze.',
      pearl: 'Zwrot gałek ocznych w udarze półkulowym MCA kieruje się W STRONĘ PÓŁKULI CHOREJ („chory patrzy na swoje ognisko”); w udarze mostu — w stronę przeciwną!'
    },
    {
      id: 'aca-stroke',
      name: 'Zespół tętnicy przedniej mózgu (ACA)',
      altName: 'Udar przyśrodkowej powierzchni płata czołowego',
      lesionSite: 'Przyśrodkowa powierzchnia półkuli mózgu (reprezentacja kończyny dolnej w homunkulusie + płacik przyśrodkowy i dodatkowa kora ruchowa)',
      classicSign: 'Przeciwstronny niedowład i zaburzenia czucia głównie kończyny dolnej + abulia / apatia + odruch chwytny',
      motorPattern: 'Przeciwstronny niedowład kończyny dolnej zdecydowanie przeważający nad ręką i twarzą (KD >> KG)',
      sensoryPattern: 'Niedoczulica korowa przeciwstronnej kończyny dolnej (szczególnie dystalnie)',
      reflexPattern: 'Wygórowany odruch kolanowy/skokowy i Babiński (+) w przeciwnej nodze + prymitywny odruch chwytny ręki',
      cranialNerves: 'Zwykle bez zajęcia nerwów czaszkowych (twarz zaoszczędzona)',
      bodyRegions: ['leg_contra'],
      specialZones: [
        { label: 'Płacik przyśrodkowy czołowy', desc: 'Nietrzymanie moczu z utratą hamowania korowego mikcji oraz abulia / mutyzm akinetyczny (przy ognisku obustronnym)' }
      ],
      differential: ['Zespół MCA (twarz/ręka > noga)', 'Mielopatia lub guz sierpa mózgu (oponiak przymózgowy)', 'Wodogłowie normotensyjne'],
      treatment: 'Ścieżka udarowa: TK wykluczające krwotok, kwalifikacja do rtPA (<4,5 h), kontrola czynników naczyniowych.',
      trap: 'Izolowane osłabienie jednej nogi z nietrzymaniem moczu bywa mylone z zespołem rdzeniowym lub rwa kulszową — sprawdź Babińskiego i objawy czołowe!',
      pearl: 'Obustronne zamknięcie ACA (np. z nieparzystej tętnicy przedniej) daje porażenie obu nóg (paraplegia mózgowa!) i mutyzm akinetyczny.'
    },
    {
      id: 'wallenberg',
      name: 'Zespół Wallenberga (boczny opuszki)',
      altName: 'Zespół tętnicy móżdżkowej dolnej tylnej (PICA) / kręgowej',
      lesionSite: 'Boczno-grzbietowa część opuszki rdzenia (jądro rdzeniowe V, droga rdzeniowo-wzgórzowa, jądro dwuznaczne, włókna współczulne, konar móżdżku dolny)',
      classicSign: 'Skrzyżowana analgezja (twarz po stronie ogniska + kończyny po stronie przeciwnej) + Horner + dysfagia/chrypka + ataksja, BEZ niedowładu kończyn!',
      motorPattern: 'BRAK niedowładu piramidowego kończyn (piramidy leżą przyśrodkowo poza obszarem PICA!)',
      sensoryPattern: 'Utrata czucia bólu i temperatury: na twarzy PO STRONIE OGNISKA (V), na tułowiu i kończynach PO STRONIE PRZECIWNEJ (droga rdzeniowo-wzgórzowa)',
      reflexPattern: 'Odruchy w kończynach prawidłowe, brak objawu Babińskiego; zniesiony odruch gardłowy po stronie ogniska',
      cranialNerves: 'Zajęcie IX, X (dysfagia, chrypka, objaw firanki w stronę zdrową), V (ból/temperatura twarzy), VIII (zawroty, oczopląs) + zstępujący układ współczulny (Horner ipsi)',
      bodyRegions: ['face_ipsi', 'trunk_contra', 'arm_contra', 'leg_contra', 'bulbar', 'cerebellar'],
      specialZones: [
        { label: 'Drogi współczulne (zstępujące)', desc: 'Zespół Hornera po stronie ogniska: ptoza, mioza, enoftalmia/anhidroza' },
        { label: 'Jądro dwuznaczne (IX, X)', desc: 'Ciężka dysfagia wymagająca oceny połykania przed podaniem pokarmu/leków p.o.' }
      ],
      differential: ['Zespół przyśrodkowy opuszki (Dejerine — porażenie XII ipsi + niedowład contra)', 'Zespół kąta mostowo-móżdżkowego', 'Udar móżdżku'],
      treatment: 'Pilne angio-TK/MRI DWI (poszukiwanie rozwarstwienia tętnicy kręgowej!), ochrona przed zachłyśnięciem, rtPA w oknie czasowym.',
      trap: 'Wskazówka PUM #5: Zespół Wallenberga NIE powoduje porażenia połowiczego kończyn! Prawidłowa siła mięśniowa nie wyklucza udaru pnia.',
      pearl: 'Jeśli do dysfagii, zawrotów i zespołu Hornera dołącza czkawka oporna na leczenie — podejrzewaj boczny zawał opuszki.'
    },
    {
      id: 'weber',
      name: 'Zespół Webera (podstawa konaru śródmózgowia)',
      altName: 'Zespół naprzemienny śródmózgowia',
      lesionSite: 'Brzuszna część śródmózgowia (włókna korzeniowe n. III przechodzące przez podstawę konaru mózgu + droga korowo-rdzeniowa)',
      classicSign: 'Porażenie nerwu III po stronie ogniska (ptoza, oko w dół i na zewnątrz, szeroka źrenica) + przeciwstronny niedowład połowiczy',
      motorPattern: 'Przeciwstronny niedowład połowiczy kończyn i dolnej części twarzy (UMN)',
      sensoryPattern: 'Zazwyczaj prawidłowe czucie powierzchowne i głębokie (chyba że ognisko szerzy się grzbietowo ku wstędze przyśrodkowej)',
      reflexPattern: 'Wygórowane odruchy głębokie i objaw Babińskiego (+) po stronie przeciwnej do ogniska',
      cranialNerves: 'Obwodowe porażenie nerwu III PO STRONIE OGNISKA (opadanie powieki, brak przywodzenia, szeroka nie-reagująca źrenica)',
      bodyRegions: ['eyes', 'face_contra', 'arm_contra', 'leg_contra'],
      specialZones: [
        { label: 'Zróżnicowanie z wgłobieniem', desc: 'Nagłe porażenie n. III + niedowład mogą być też objawem wgłobienia haka hipokampa przez wcięcie namiotu!' }
      ],
      differential: ['Wgłobienie skroniowe (objaw masy/krwiaka)', 'Tętniak tętnicy łączącej tylnej (izolowane bolesne n. III bez niedowładu)', 'Zespół Benedikta (n. III + drżenie/ataksja contra)'],
      treatment: 'Pilne TK/angio-TK (wykluczenie tętniaka PComA i krwotoku) oraz MRI śródmózgowia; leczenie udaru niedokrwiennego lub neurochirurgiczne.',
      trap: 'Zawsze odróżniaj udar podstawy konaru (zespół Webera) od ucisku nerwu III przez wgłobienie skroniowe lub pękający tętniak PComA.',
      pearl: 'Zasada zespołów naprzemiennych pnia: nerw czaszkowy wskazuje POZIOM i STRONĘ ogniska (III = śródmózgowie, VI/VII = most, XII = opuszka).'
    },
    {
      id: 'millard-gubler',
      name: 'Zespół Millarda-Gublera (brzuszny most)',
      altName: 'Zespół naprzemienny mostu',
      lesionSite: 'Brzuszno-dolna część mostu (włókna n. VII i często n. VI + pęczek piramidowy przed skrzyżowaniem)',
      classicSign: 'Obwodowe porażenie n. VII (i często n. VI) po stronie ogniska + przeciwstronny niedowład połowiczy kończyn',
      motorPattern: 'Przeciwstronny niedowład połowiczy (UMN) z wygórowaniem odruchów po stronie przeciwnej',
      sensoryPattern: 'Zazwyczaj bez zaburzeń czucia kończyn',
      reflexPattern: 'Babiński (+) i hiperrefleksja po stronie przeciwnej do porażenia VII',
      cranialNerves: 'OBWODOWE porażenie n. VII (razem z czołem i powieką!) ± n. VI po tej samej stronie co ognisko w moście',
      bodyRegions: ['face_ipsi', 'eyes', 'arm_contra', 'leg_contra'],
      specialZones: [
        { label: 'Różnicowanie z zespołem Foville’a', desc: 'Gdy dodatkowo występuje porażenie skojarzonego spojrzenia w stronę ogniska + VII obwodowe + niedowład contra → zespół Foville’a' }
      ],
      differential: ['Udar półkulowy (wtedy n. VII jest ośrodkowe — oszczędza czoło — i po tej samej stronie co niedowład kończyn!)', 'Porażenie Bella (brak niedowładu kończyn)', 'Guz/demielinizacja mostu'],
      treatment: 'Pilne MRI/TK + angio-TK (ocena tętnicy podstawnej!), ochrona rogówki zamykaniem oka na noc przy niedomykalności powieki.',
      trap: 'Wskazówka PUM #3: Jeśli porażenie VII obejmuje także czoło (obwodowe), a niedowład kończyn jest po DRUGIEJ stronie — ognisko leży w moście!',
      pearl: 'W uszkodzeniu mostu gałki oczne uciekają od strony ogniska („chory patrzy na swoje porażone kończyny”, odwrotnie niż w półkuli).'
    },
    {
      id: 'brown-sequard',
      name: 'Zespół Brown-Séquarda (połowicze uszkodzenie rdzenia)',
      altName: 'Hemisekscja rdzenia kręgowego',
      lesionSite: 'Połowa poprzecznego przekroju rdzenia kręgowego (np. uraz kłuty, dyskopatia boczna, guz zewnątrzrdzeniowy, ognisko SM)',
      classicSign: 'Po stronie ogniska: niedowład piramidowy + brak czucia głębokiego; po stronie przeciwnej (1–2 segmenty poniżej): brak czucia bólu i temperatury',
      motorPattern: 'Po stronie ogniska: niedowład LMN dokładnie na poziomie uszkodzenia oraz niedowład spastyczny UMN poniżej poziomu uszkodzenia',
      sensoryPattern: 'Po stronie ogniska: utrata wibracji i propriocepcji (sznury tylne niekrzyżowane); po stronie przeciwnej: utrata bólu i temperatury (droga rdzeniowo-wzgórzowa krzyżuje się w rdzeniu)',
      reflexPattern: 'Na poziomie ogniska brak odruchu; poniżej po stronie ogniska hiperrefleksja i Babiński (+)',
      cranialNerves: 'Prawidłowe (chyba że uraz górnego odcinka szyjnego obejmuje korzeń rdzeniowy n. XI lub powoduje zespół Hornera z C8–Th1)',
      bodyRegions: ['arm_ipsi', 'leg_ipsi', 'leg_contra', 'trunk_contra'],
      specialZones: [
        { label: 'Pas przeczulicy / znieczulenia na poziomie', desc: 'Na dokładnym dermatomie uszkodzenia występuje jednostronna utrata wszystkich rodzajów czucia i zanik LMN' }
      ],
      differential: ['Zespół tętnicy rdzeniowej przedniej (obustronna paraplegia + utrata bólu/temp., ZACHOWANE sznury tylne!)', 'Poprzeczne zapalenie rdzenia', 'Jamistość rdzenia (rozszczepienie czucia „pelerynowe”)'],
      treatment: 'Pilne MRI kręgosłupa na poziomie wskazanym przez segmenty czuciowe; pilna dekompresja przy ucisku lub wysokie dawki metyloprednizolonu w zapaleniu.',
      trap: 'Utrata bólu i temperatury po stronie przeciwnej zaczyna się zwykle 1–2 segmenty PONIŻEJ rzeczywistego poziomu uszkodzenia (droga wstępuje przez pęczek Lissauera przed skrzyżowaniem).',
      pearl: 'W zespole tętnicy rdzeniowej przedniej (ASA) sznury tylne są zaoszczędzone (czucie wibracji prawidłowe!), mimo całkowitej utraty siły i bólu/temperatury.'
    },
    {
      id: 'cauda-equina',
      name: 'Zespół ogona końskiego (CES)',
      altName: 'Kompresja korzeni L2–S5 w kanale kręgowym',
      lesionSite: 'Korzenie nerwowe poniżej stożka rdzeniowego (poniżej L1/L2), najczęściej masywna centralna przepuklina L4–L5/L5–S1, przerzut, ropień nadtwardówkowy',
      classicSign: 'Znieczulenie typu „spodenek jeździeckich” + ostre zatrzymanie moczu/przepełnienie + asymetryczny ból korzeniowy i niedowład wiotki nóg',
      motorPattern: 'Asymetryczny niedowład wiotki kończyn dolnych typu LMN (opadanie stóp, osłabienie zgięcia podeszwowego)',
      sensoryPattern: 'Niedoczulica okolicy krocza, pośladków i przyśrodkowych ud („spodenki jeździeckie” S2–S5)',
      reflexPattern: 'Zniesienie odruchów skokowych (S1), zwieracza odbytu i opuszkowo-jamistego; BRAK objawu Babińskiego (to LMN!)',
      cranialNerves: 'Prawidłowe',
      bodyRegions: ['saddle', 'bilateral_legs'],
      specialZones: [
        { label: 'Ośrodek zwieraczy vs korzenie', desc: 'W stożku rdzeniowym (Th12–L1) objawy zwieraczowe są wczesne i symetryczne bez silnego bólu korzeniowego, czasem z mieszanym Babińskim; w CES ból korzeniowy jest dominujący' }
      ],
      differential: ['Zespół stożka rdzeniowego', 'Zwykła jednostronna rwa kulszowa bez zajęcia zwieraczy', 'Zespół Guillaina-Barrégo'],
      treatment: 'PILNE MRI odcinka lędźwiowo-krzyżowego i natychmiastowe odbarczenie neurochirurgiczne (<24–48 h); w kompresji nowotworowej dodatkowo deksametazon i.v.',
      trap: 'Brak objawu Babińskiego przy wiotkich nogach w zespole ogona końskiego nie oznacza łagodności — to uszkodzenie LMN (korzeni) wymagające pilnej operacji!',
      pearl: 'Zawsze przy bólu krzyża zapytaj o oddawanie moczu i sprawdź czucie okolicy krocza (S3–S5).'
    },
    {
      id: 'cerebellar',
      name: 'Zespół móżdżkowy (półkula vs robak)',
      altName: 'Ataksja móżdżkowa',
      lesionSite: 'Półkula móżdżku (ataksja kończyn po TEJ SAMEJ stronie!) lub robak móżdżku (ataksja tułowia i chodu na szerokiej podstawie)',
      classicSign: 'Dysmetria, drżenie zamiarowe, dysdiadochokineza, hipotonia, mowa skandowana, oczopląs; pacjent niestabilny już przy OCZACH OTWARTYCH',
      motorPattern: 'Brak prawdziwego niedowładu (siła 5/5!), lecz wyraźna niezborność ruchów celowych, odbicie (objaw Stewarta-Holmesa), hipotonia po stronie ogniska',
      sensoryPattern: 'Czucie powierzchowne i głębokie (wibracja, ułożenie) PRAWIDŁOWE',
      reflexPattern: 'Odruchy głębokie prawidłowe lub wahadłowe (pendular), brak Babińskiego',
      cranialNerves: 'Oczopląs poziomowy (zwłaszcza w stronę ogniska), mowa skandowana (dyzartria móżdżkowa)',
      bodyRegions: ['cerebellar', 'arm_ipsi', 'leg_ipsi'],
      specialZones: [
        { label: 'Półkula vs robak móżdżku', desc: 'Uszkodzenie półkuli daje objawy w kończynach po tej samej stronie (podwójne skrzyżowanie); uszkodzenie robaka daje ataksję tułowia i chód „pijacki” (często w alkoholizmie i guzach linii środkowej)' }
      ],
      differential: ['Ataksja czuciowa tylnosznurowa (Romberg +, brak wibracji)', 'Zatrucie lekami (fenytoina, karbamazepina, lit, alkohol)', 'Zapalenie błędnika (test HINTS!)'],
      treatment: 'Obrazowanie MRI/TK tylnego dołu czaszki (pilnie przy ostrym początku — obrzęk móżdżku może zamknąć IV komorę i wywołać wodogłowie!), odstawienie toksyn.',
      trap: 'Wskazówka PUM #10: Próba Romberga nie jest swoista dla móżdżku — chory z uszkodzeniem móżdżku chwieje się już z oczami otwartymi.',
      pearl: 'Objawy z półkuli móżdżku występują IPSILATERALNIE (po tej samej stronie co ognisko w móżdżku).'
    },
    {
      id: 'dorsal-columns',
      name: 'Zespół sznurów tylnych (ataksja czuciowa)',
      altName: 'Zwyrodnienie powrózkowe rdzenia (np. niedobór B12)',
      lesionSite: 'Pęczki smukły i klinowaty w sznurach tylnych rdzenia kręgowego (w niedoborze B12 także sznury boczne — drogi piramidowe)',
      classicSign: 'Utrata czucia wibracji i ułożenia dystalnie + wybitnie dodatnia próba Romberga (upadek po zamknięciu oczu) + chód „tupiący”',
      motorPattern: 'Siła zachowana w czystym zespole sznurów tylnych; w niedoborze B12 dołącza spastyczny niedowład nóg (sznury boczne)',
      sensoryPattern: 'Zniesienie czucia wibracji (128 Hz) i propriocepcji od palców/kostek w górę; czucie bólu i temperatury zachowane (jeśli brak współistniejącej polineuropatii)',
      reflexPattern: 'W izolowanym wiądzie rdzenia odruchy kolanowe/skokowe zniesione; w niedoborze B12 klasycznie kolanowe wygórowane (UMN) przy słabych skokowych (neuropatia) + Babiński (+)',
      cranialNerves: 'Zwykle prawidłowe (w ciężkim niedoborze B12 możliwa neuropatia n. II i zaburzenia poznawcze)',
      bodyRegions: ['bilateral_legs', 'glove_stocking'],
      specialZones: [
        { label: 'Próba Romberga i chód w ciemności', desc: 'Pacjent kompensuje brak czucia stawowego wzrokiem — zamykając oczy pod prysznicem lub w nocy gwałtownie traci równowagę' }
      ],
      differential: ['Zespół móżdżkowy', 'Polineuropatia cukrzycowa/alkoholowa', 'Niedobór miedzi (identyczny obraz jak B12)', 'Wiąd rdzenia (kiła III-rzędowa)'],
      treatment: 'Suplementacja witaminy B12 (cyjanokobalamina/hydroksykobalamina i.m.), leczenie choroby podstawowej (niedokrwistość złośliwa, resekcja żołądka, odstawienie podtlenku azotu).',
      trap: 'Wskazówka PUM #10: Nie podawaj samego kwasu foliowego bez witaminy B12 — maskuje niedokrwistość megaloblastyczną i pogłębia uszkodzenie rdzenia!',
      pearl: 'Objaw Lhermitte’a (prąd wzdłuż kręgosłupa przy zgięciu karku) występuje nie tylko w SM, ale również w niedoborze B12 i ucisku szyjnym.'
    },
    {
      id: 'upper-orbital-fissure',
      name: 'Zespół szczeliny oczodołowej górnej',
      altName: 'Zespół Rochona-Duvigneauda (vs zespół szczytu oczodołu)',
      lesionSite: 'Szczelina oczodołowa górna kości klinowej (np. guz, tętniak zatoki jamistej, zapalenie ziarniniakowe Tolosy-Hunta, uraz)',
      classicSign: 'Jednoczesne porażenie n. III, IV, VI (oftalmoplegia + ptoza + szeroka źrenica) + brak czucia V1 (czoło, rogówka) przy ZACHOWANEJ ostrości wzroku',
      motorPattern: 'Prawidłowa siła i czucie kończyn',
      sensoryPattern: 'Niedoczulica w zakresie V1 (czoło, grzbiet nosa, powieka górna) oraz zniesienie odruchu rogówkowego',
      reflexPattern: 'Odruchy kończyn prawidłowe; zniesiony jednostronnie odruch rogówkowy (uszkodzenie dośrodkowej V1)',
      cranialNerves: 'Uszkodzenie III, IV, VI + V1; nerw II ZAOSZCZĘDZONY (gdy dochodzi n. II → zespół szczytu oczodołu)',
      bodyRegions: ['eyes', 'face_ipsi'],
      specialZones: [
        { label: 'Szczelina oczodołowa górna vs zatoka jamista vs szczyt oczodołu', desc: 'Szczelina: III, IV, VI, V1. Zatoka jamista: dochodzi V2 i włókna współczulne Hornera. Szczyt oczodołu: dochodzi nerw wzrokowy II!' }
      ],
      differential: ['Zespół szczytu oczodołu (dodatkowo ubytek ostrości wzroku / RAPD)', 'Zakrzepica / przetoka zatoki jamistej (wytrzeszcz, przekrwienie, V2)', 'Miastenia oczna (prawidłowe źrenice i czucie V1!)'],
      treatment: 'Pilne MRI oczodołów i podstawy czaszki z kontrastem + angio-MR/angio-TK; leczenie przyczynowe (chirurgia, sterydy w zespole Tolosy-Hunta, antybiotyki w zakrzepicy septycznej).',
      trap: 'Wskazówka PUM #4: Pytanie testowe o szczelinę oczodołową górną sprawdza 4 nerwy (III, IV, VI, V1) — obecność zaburzeń widzenia (n. II) przesuwa lokalizację do szczytu oczodołu!',
      pearl: 'W zespole szczeliny oczodołowej górnej odruch rogówkowy jest zniesiony z powodu uszkodzenia gałęzi ocznej (V1), mimo że V2 i V3 pozostają prawidłowe.'
    }
  ];

  const TOPO_PUZZLES = [
    {
      id: 'topo-p1',
      title: 'Zagadka 1 · Dysfagia, Horner i skrzyżowany ból/temperatura',
      vignette: '52-letni mężczyzna po gwałtownym skręcie szyi poczuł silny ból karku po prawej stronie, zawroty głowy, chrypkę oraz trudności z połykaniem. Badanie: prawostronna ptoza i wąska źrenica, ataksja prawej ręki, zniesienie czucia bólu i temperatury na prawej połowie twarzy oraz na lewej połowie tułowia i lewych kończynach; siła kończyn 5/5.',
      topoId: 'wallenberg',
      step1: {
        q: 'Gdzie dokładnie zlokalizowane jest ognisko naczyniowe u tego pacjenta?',
        opts: [
          'Boczno-grzbietowa część opuszki po stronie prawej (obszar PICA / rozwarstwienie prawej tętnicy kręgowej)',
          'Lewy płat czołowy w obszarze MCA',
          'Podstawa lewego konaru śródmózgowia',
          'Prawa połowa rdzenia na poziomie Th6'
        ],
        correct: 0,
        explanation: 'Horner, ataksja i zniesienie bólu/temperatury twarzy po stronie PRAWEJ wskazują na prawą boczną opuszkę, natomiast analgezja lewej połowy ciała to zajęcie nieskrzyżowanej jeszcze w pniu drogi rdzeniowo-wzgórzowej prawej.'
      },
      step2: {
        q: 'Dlaczego u chorego siła mięśniowa wszystkich czterech kończyn wynosi 5/5?',
        opts: [
          'Drogi piramidowe biegną w przyśrodkowych piramidach opuszki zaopatrywanych przez tętnicę rdzeniową przednią, poza obszarem PICA',
          'W udarze pnia mózgu nigdy nie występują niedowłady kończyn',
          'Zawał objął wyłącznie nerw VII i XII',
          'To jedynie migrena przedsionkowa bez zmian niedokrwiennych'
        ],
        correct: 0,
        explanation: 'Zespół Wallenberga jest klasycznym zespołem pniowym bez zajęcia dróg piramidowych (w przeciwieństwie do przyśrodkowego zawału opuszki).'
      },
      pearl: 'Wskazówka PUM #5: Skrzyżowana analgezja (twarz ipsi, kończyny contra) + Horner + dysfagia bez niedowładu = zespół Wallenberga.'
    },
    {
      id: 'topo-p2',
      title: 'Zagadka 2 · Opadająca powieka po lewej i niedowład po prawej',
      vignette: '68-letni chory z nagłym opadnięciem lewej powieki, ustawieniem lewej gałki ocznej w dół i na zewnątrz z szeroką sztywną źrenicą oraz jednoczesnym niedowładem spastycznym prawej ręki i prawej nogi z objawem Babińskiego po prawej.',
      topoId: 'weber',
      step1: {
        q: 'Jak nazywa się ten zespół topodiagnostyczny i gdzie leży ognisko?',
        opts: [
          'Zespół Webera — lewa podstawa konaru śródmózgowia',
          'Zespół Millarda-Gublera — prawy most',
          'Zespół Wallenberga — lewa opuszka',
          'Zespół Brown-Séquarda — odcinek szyjny rdzenia'
        ],
        correct: 0,
        explanation: 'Obwodowe uszkodzenie lewego nerwu III (wskazuje stronę i poziom śródmózgowia) + uszkodzenie lewej drogi piramidowej przed skrzyżowaniem (dające niedowład prawych kończyn) = zespół Webera.'
      },
      step2: {
        q: 'Co odróżnia ten zespół od izolowanego porażenia n. III w cukrzycy?',
        opts: [
          'Współistniejący przeciwstronny niedowład kończyn oraz włączenie włókien źrenicznych (szeroka źrenica)',
          'Oszczędzenie mięśni zewnątrzgałkowych w zespole Webera',
          'W zespole Webera porażony jest wyłącznie nerw IV',
          'W cukrzycy zawsze występuje zespół Babińskiego'
        ],
        correct: 0,
        explanation: 'Niedokrwienie pnia nerwu III w cukrzycy oszczędza zwykle powierzchowne włókna przywspółczulne (źrenica jest prawidłowa) i nie daje niedowładu kończyn.'
      },
      pearl: 'Zespół Webera = III po stronie ogniska + niedowład połowiczy po stronie przeciwnej.'
    },
    {
      id: 'topo-p3',
      title: 'Zagadka 3 · Rozszczepiona utrata czucia i niedowład jednej nogi',
      vignette: '34-letni pacjent z postępującym od kilku tygodni osłabieniem prawej kończyny dolnej (wygórowany odruch kolanowy, klonus i Babiński po prawej), utratą czucia wibracji w prawej stopie oraz utratą odczuwania bólu i temperatury na lewej nodze aż do poziomu pępka.',
      topoId: 'brown-sequard',
      step1: {
        q: 'Którą strukturę i po której stronie zajmuje proces chorobowy?',
        opts: [
          'Prawą połowę rdzenia kręgowego w odcinku piersiowym (ok. Th8 — 1–2 segmenty powyżej poziomu zaburzeń na lewej stronie)',
          'Lewą połowę rdzenia kręgowego w odcinku lędźwiowym',
          'Ogon koński (korzenie L4–S1)',
          'Prawą półkulę móżdżku'
        ],
        correct: 0,
        explanation: 'Niedowład UMN i brak wibracji po stronie PRAWEJ wskazują na uszkodzenie prawej połowy rdzenia (droga korowo-rdzeniowa i sznury tylne już skrzyżowane wyżej). Droga rdzeniowo-wzgórzowa krzyżuje się w rdzeniu, więc jej uszkodzenie po prawej daje brak bólu/temperatury na LEWEJ nodze.'
      },
      step2: {
        q: 'Dlaczego w zespole ogona końskiego nie uzyskasz takiego obrazu z Babińskim i rozszczepieniem czucia?',
        opts: [
          'Ogon koński tworzą korzenie LMN poniżej L1/L2 — uszkodzenie daje niedowład wiotki bez Babińskiego oraz zniesienie wszystkich rodzajów czucia w kształcie spodenek jeździeckich',
          'Ogon koński leży w odcinku szyjnym',
          'W ogonie końskim zawsze występuje niedowład połowiczy twarzy',
          'Ogon koński zajmuje wyłącznie nerwy wzrokowe'
        ],
        correct: 0,
        explanation: 'Rozszczepienie na ból/temperaturę po przeciwnej stronie i piramidowy Babiński po tej samej stronie są swoiste dla hemisekcji samego rdzenia kręgowego.'
      },
      pearl: 'W Brown-Séquardzie: siła i wibracja giną po stronie ogniska, a ból i temperatura po stronie przeciwnej.'
    },
    {
      id: 'topo-p4',
      title: 'Zagadka 4 · Afazja ruchowa z asymetrią ręki nad nogą',
      vignette: '74-letnia kobieta po nagłym epizodzie utraty mowy (wypowiada jedynie pojedyncze sylaby, ale wykonuje polecenia) ma spłycony prawy fałd nosowo-wargowy przy symetrycznym marszczeniu czoła, siłę prawej ręki 1/5 i prawej nogi 4/5.',
      topoId: 'mca-stroke',
      step1: {
        q: 'Gdzie leży ognisko i które naczynie jest najpewniej zamknięte?',
        opts: [
          'Lewa półkula mózgu — lewa tętnica środkowa mózgu (MCA)',
          'Lewa tętnica przednia mózgu (ACA)',
          'Prawa tętnica tylna mózgu (PCA)',
          'Lewy most (zespół Millarda-Gublera)'
        ],
        correct: 0,
        explanation: 'Ośrodkowe porażenie VII po prawej + przewaga niedowładu prawej ręki nad nogą + afazja ruchowa (ośrodek Broca) jednoznacznie lokalizują zawał w terytorium lewej MCA.'
      },
      step2: {
        q: 'Co zmieniłoby się w obrazie, gdyby zamknięta była lewa ACA zamiast MCA?',
        opts: [
          'Niedowład dotyczyłby głównie prawej nogi przy relatywnym zaoszczędzeniu ręki i twarzy oraz często nietrzymaniu moczu i abulii',
          'Wystąpiłaby obustronna głuchota',
          'Niedowład kończyny dolnej byłby po lewej stronie',
          'Znikłoby całkowicie marszczenie czoła po prawej stronie'
        ],
        correct: 0,
        explanation: 'Homunkulus dla kończyny dolnej leży na przyśrodkowej powierzchni półkuli unaczynianej przez ACA.'
      },
      pearl: 'Wskazówka PUM #3 i #5: Ośrodkowe VII po tej samej stronie co niedowład ręki i afazja = korowo-podkorowy udar MCA.'
    },
    {
      id: 'topo-p5',
      title: 'Zagadka 5 · Ptoza, porażenie ruchów oka i znieczulone czoło',
      vignette: '46-letni pacjent z narastającym bólem za lewym okiem zgłosił się z całkowitym opadnięciem lewej powieki, znieruchomieniem lewej gałki ocznej we wszystkich kierunkach, poszerzoną lewą źrenicą oraz brakiem odruchu rogówkowego i czucia na lewym czole. Ostrość wzroku i dno oka są całkowicie prawidłowe.',
      topoId: 'upper-orbital-fissure',
      step1: {
        q: 'Jakie rozpoznanie topodiagnostyczne tłumaczy zajęcie III, IV, VI i V1 przy prawidłowym widzeniu?',
        opts: [
          'Zespół szczeliny oczodołowej górnej po stronie lewej',
          'Zespół szczytu oczodołu po stronie lewej',
          'Przełom miasteniczny',
          'Zespół Wallenberga'
        ],
        correct: 0,
        explanation: 'Przez szczelinę oczodołową górną przechodzą III, IV, VI oraz V1 (czoło i rogówka), natomiast nerw II biegnie oddzielnie przez kanał wzrokowy.'
      },
      step2: {
        q: 'Jaki nowy objaw wskazywałby na poszerzenie procesu na szczyt oczodołu?',
        opts: [
          'Spadek ostrości wzroku / ślepota oka lewego oraz względny dośrodkowy deficyt źreniczny (RAPD)',
          'Zanik żwaczy (V3)',
          'Opadanie kącika ust (VII)',
          'Chrypka i dysfagia (IX, X)'
        ],
        correct: 0,
        explanation: 'Dołączenie nerwu wzrokowego (II) różnicuje zespół szczytu oczodołu od zespołu szczeliny oczodołowej górnej.'
      },
      pearl: 'Wskazówka PUM #4: Szczelina oczodołowa górna = III, IV, VI + V1 (bez II).'
    },
    {
      id: 'topo-p6',
      title: 'Zagadka 6 · Upadki pod prysznicem po zamknięciu oczu',
      vignette: '66-letnia wegetarianka po resekcji żołądka zauważyła mrowienie stóp oraz gwałtowne tracenie równowagi zawsze wtedy, gdy zamyka oczy przy myciu włosów. W badaniu: chód na szerszej podstawie, brak dysmetrii z otwartymi oczami, gwałtowny upadek w próbie Romberga po zamknięciu oczu i brak czucia wibracji poniżej kolan.',
      topoId: 'dorsal-columns',
      step1: {
        q: 'Która struktura odpowiada za dodatnią próbę Romberga i zniesienie czucia wibracji?',
        opts: [
          'Sznury tylne rdzenia kręgowego (ataksja czuciowa w przebiegu niedoboru witaminy B12)',
          'Robak i półkule móżdżku',
          'Rogi przednie rdzenia kręgowego (SLA)',
          'Prawy nerw błędny'
        ],
        correct: 0,
        explanation: 'Wzrok kompensuje brak informacji proprioceptywnej ze sznurów tylnych, dlatego dopiero zamknięcie oczu w próbie Romberga ujawnia niestabilność (w przeciwieństwie do zespołu móżdżkowego).'
      },
      step2: {
        q: 'Czego bezwzględnie NIE wolno podać w monoterapii przed wyrównaniem witaminy B12 u tej chorej?',
        opts: [
          'Kwasu foliowego w monoterapii — poprawia morfologię, lecz nasila nieodwracalne uszkodzenie rdzenia kręgowego',
          'Witaminy B12 domięśniowo',
          'Oznaczenia kwasu metylomalonowego (MMA)',
          'MRI odcinka szyjno-piersiowego rdzenia'
        ],
        correct: 0,
        explanation: 'Sam kwas foliowy koryguje megaloblastyczną niedokrwistość, ukrywając niedobór B12 i przyspieszając demielinizację sznurów tylnych i bocznych.'
      },
      pearl: 'Wskazówka PUM #10: Romberg (+) = sznury tylne / układ przedsionkowy; niestabilność już przy oczach otwartych = móżdżek.'
    }
  ];

  Object.assign(window.HUB_META, {
    OSCE_STATIONS,
    IMAGING_TRAINER_CASES,
    NEURO_DRUG_DATABASE,
    PRESCRIPTION_CHALLENGES,
    TOPODIAGNOSIS_DATABASE,
    TOPO_PUZZLES
  });
})();
