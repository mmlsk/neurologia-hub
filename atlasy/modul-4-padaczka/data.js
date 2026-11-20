/* Dane modułu [4]: Padaczka i stany drgawkowe — Sylabus PUM 2026/2027 */
(function () {
  'use strict';

  window.ATLAS_TOPICS = {
    klas: 'Klasyfikacja ILAE i semiologia',
    dx: 'Diagnostyka i EEG',
    tx: 'Farmakoterapia LPP',
    se: 'Stan padaczkowy i różnicowanie'
  };

  window.ATLAS_Q = [
    {
      t: 'klas',
      mod: '4',
      stem: 'Zgodnie z praktyczną definicją ILAE (2014) padaczkę można rozpoznać już po JEDNYM napadzie nieprowokowanym, jeżeli:',
      o: [
        'napad wystąpił podczas gorączki lub w przebiegu ostrej hipoglikemii (<40 mg/dl)',
        'prawdopodobieństwo wystąpienia kolejnych napadów w ciągu najbliższych 10 lat wynosi co najmniej 60% (np. ognisko strukturalne w MRI i zmiany padaczkokształtne w EEG)',
        'u pacjenta stwierdzono prawidłowe EEG i prawidłowe MRI mózgu, ale napad trwał powyżej 60 sekund',
        'był to izolowany napad w ciągu pierwszych 7 dni po ostrym udarze niedokrwiennym mózgu'
      ],
      k: 1,
      c: 'src',
      s: 'ILAE 2014; Podemski wyd. IV; Sylabus W03c',
      why: 'Praktyczna definicja ILAE dopuszcza rozpoznanie padaczki w trzech sytuacjach: (1) ≥2 napady nieprowokowane w odstępie >24 h, (2) 1 napad nieprowokowany przy ryzyku nawrotu ≥60% w kolejnych 10 latach (porównywalnym do ryzyka po 2 napadach), (3) rozpoznanie określonego zespołu padaczkowego. Napady w ostrej fazie udaru (≤7 dni), hipoglikemii czy gorączce są napadami prowokowanymi (objawowymi ostrymi) i nie upoważniają do rozpoznania padaczki.',
      tip: 'Odróżniaj napad ostry objawowy (np. w przebiegu hiponatremii lub świeżego udaru) od nieprowokowanego — pierwszy nie wymaga przewlekłego leczenia przeciwpadaczkowego po usunięciu przyczyny.',
      gap: {
        pool: 'W starszych opracowaniach testowych warunkiem rozpoznania padaczki bywało wyłącznie wystąpienie co najmniej dwóch samoistnych napadów w wywiadzie.',
        now: 'Obowiązująca definicja ILAE (2014) pozwala rozpoznać padaczkę już po 1 napadzie nieprowokowanym, jeśli ryzyko nawrotu w ciągu 10 lat wynosi ≥60% (np. blizna poudarowa/guz + iglice w EEG) lub spełnione są kryteria zespołu padaczkowego.'
      }
    },
    {
      t: 'klas',
      mod: '4',
      stem: '26-letni pacjent zgłasza epizody trwające około 60–90 sekund, poprzedzone nagłym uczuciem gorąca w nadbrzuszu i wrażeniem déjà vu. Świadkowie opisują zastyganie wzroku, mlaskanie oraz skubanie rękawa, a po ustąpieniu epizodu chory przez kilka minut jest zdezorientowany. Według klasyfikacji ILAE 2017 jest to:',
      o: [
        'uogólniony napad nieświadomości (typowy)',
        'napad ogniskowy z zaburzoną świadomością (dawniej złożony częściowy)',
        'napad ogniskowy z zachowaną świadomością bez automatyzmów',
        'psychogenny napad niepadaczkowy (PNES)',
        'napad atoniczny'
      ],
      k: 1,
      c: 'did',
      s: 'ILAE 2017; Stępień Neurologia t. II',
      why: 'Aura nadbrzuszna i déjà vu wskazują na ogniskowy początek w przyśrodkowym płacie skroniowym, po czym następuje utrata kontaktu z otoczeniem, automatyzmy oralne i manualne oraz przedłużone splątanie ponapadowe — to klasyczny napad ogniskowy z zaburzoną świadomością (FIAS, dawniej częściowy złożony). Typowy napad nieświadomości trwa 5–15 s, zaczyna się i kończy nagle bez aury i bez splątania ponapadowego.',
      tip: 'Aura = początek napadu ogniskowego z zachowaną świadomością. Automatyzmy i splątanie ponapadowe odróżniają napad skroniowy od napadu nieświadomości.'
    },
    {
      t: 'dx',
      mod: '4',
      stem: '20-letnia studentka zgłosiła się po pierwszym w życiu uogólnionym napadzie toniczno-klonicznym po nieprzespanej nocy. W wywiadzie od 2 lat miewa rano po przebudzeniu krótkie, obustronne szarpnięcia kończyn górnych („upuszczanie lub rozlanie kawy”). Rutynowe spoczynkowe EEG jest prawidłowe. Które stwierdzenie jest NAJBARDZIEJ trafne?',
      o: [
        'prawidłowe spoczynkowe EEG wyklucza padaczkę i nakazuje zakończenie diagnostyki',
        'obraz przemawia za młodzieńczą padaczką miokloniczną (JME); należy powtórzyć EEG po deprywacji snu z fotostymulacją (poszukując poliiglica–fala 4–6 Hz)',
        'wskazane jest natychmiastowe włączenie karbamazepiny jako leku I rzutu',
        'poranne mioklonie świadczą o ognisku w korze ruchowej i nakazują pilne leczenie neurochirurgiczne'
      ],
      k: 1,
      c: 'src',
      s: 'Sylabus Sem TK04; Kozubski & Liberski',
      why: 'Poranne mioklonie ramion prowokowane brakiem snu oraz napad GTC u młodego dorosłego to klasyczny obraz młodzieńczej padaczki mioklonicznej (JME). Pojedyncze spoczynkowe EEG ma czułość zaledwie ~30–50%, więc prawidłowy zapis nie wyklucza padaczki — zwiększa ją powtórzenie badania z aktywacją (hiperwentylacja, fotostymulacja) oraz po deprywacji snu (typowe uogólnione zespoły poliiglica–fala 4–6 Hz).',
      tip: 'Prawidłowe pojedyncze spoczynkowe EEG NIE wyklucza padaczki. W JME nigdy nie włączaj karbamazepiny, okskarbazepiny ani fenytoiny — nasilają mioklonie!'
    },
    {
      t: 'se',
      mod: '4',
      stem: '29-letni mężczyzna podczas pobierania krwi poczuł mroczki przed oczami, zbledł i stracił przytomność. W pozycji półleżącej przez około 8 sekund obserwowano kilka nieregularnych zrywań kończyn górnych. Bezpośrednio po ocknięciu był zorientowany co do miejsca i czasu, nie przygryzł języka i nie oddał moczu. Jakie jest właściwe rozpoznanie i pierwszy krok?',
      o: [
        'napad toniczno-kloniczny — należy pilnie włączyć walproinian przewlekle',
        'omdlenie drgawkowe (odruchowe) — należy wykonać 12-odprowadzeniowe EKG oraz zebrać wywiad kardiologiczny, bez włączania leków przeciwpadaczkowych',
        'stan padaczkowy — należy podać lorazepam 4 mg i.v.',
        'napad ogniskowy czołowy — należy skierować pacjenta wyłącznie na wideo-EEG bez badania serca'
      ],
      k: 1,
      c: 'inf',
      s: 'Fuller 2022; Sylabus Ćw TK06; Moduł [3]',
      why: 'Krótkotrwała hipoperfuzja mózgu w omdleniu (stres, ból, pozycja stojąca, bladość, mroczki) często wywołuje kilka asynchronicznych mioklonii („omdlenie drgawkowe”), co bywa błędnie brane za padaczkę. Kluczowe dla omdlenia są wyzwalacz wazowagalny, czas utraty przytomności zwykle <20 s, brak sinicy i brak splątania ponapadowego. Każdy chory po utracie przytomności wymaga 12-odprowadzeniowego EKG (wykluczenie arytmii i zespołu długiego QT).',
      tip: 'Krótkie szarpnięcia w omdleniu z szybkim powrotem pełnej świadomości ≠ padaczka. Zawsze oceń EKG zanim pomyślisz o LPP.'
    },
    {
      t: 'tx',
      mod: '4',
      stem: 'U 23-letniej kobiety w wieku rozrodczym z nowo rozpoznaną młodzieńczą padaczką miokloniczną (JME) leczeniem przeciwpadaczkowym pierwszego wyboru jest:',
      o: [
        'karbamazepina w monoterapii',
        'fenytoina w monoterapii',
        'lewetyracetam (lub lamotrygina przy zachowaniu ostrożności co do ewentualnego nasilenia mioklonii)',
        'kwas walproinowy jako bezwzględny lek pierwszego rzutu niezależnie od antykoncepcji',
        'etosuksymid w monoterapii'
      ],
      k: 2,
      c: 'src',
      s: 'EMA PRAC 2018; PTN; ILAE; Podemski',
      why: 'Ze względu na wysoką teratogenność kwasu walproinowego (~10–11% dużych wad wrodzonych, w tym rozszczep kręgosłupa, oraz 30–40% zaburzeń neurorozwojowych), u kobiet w wieku rozrodczym jest on przeciwwskazany, chyba że inne LPP są nieskuteczne i spełnione są wymogi Programu Zapobiegania Ciąży. Lekiem I rzutu w JME u kobiet jest lewetyracetam (ewentualnie lamotrygina, choć u części chorych może nasilać mioklonie). Karbamazepina i fenytoina pogarszają napady miokloniczne, a etosuksymid nie chroni przed GTC.',
      tip: 'Na egzaminie kojarz dwa zakazy w jednym pytaniu: walproinian (teratogenność u kobiet w wieku rozrodczym) + blokery Na⁺ (karbamazepina/fenytoina nasilają JME i absence).',
      gap: {
        pool: 'W starszych skryptach walproinian bywał wskazywany jako uniwersalny lek pierwszego rzutu we wszystkich padaczkach uogólnionych idiopatycznych.',
        now: 'Wytyczne EMA, PTN i ILAE zakazują stosowania walproinianu jako leku pierwszego wyboru u dziewcząt i kobiet w wieku rozrodczym — preferuje się lewetyracetam lub lamotryginę.'
      }
    },
    {
      t: 'se',
      mod: '4',
      stem: 'Do SOR przywieziono 45-letniego chorego z uogólnionymi drgawkami toniczno-klonicznymi trwającymi nieprzerwanie od 7 minut. Zespół ratownictwa nie zdołał jeszcze uzyskać dostępu dożylnego, glikemia włośniczkowa wynosi 114 mg/dl. Jakie powinno być NATYCHMIASTOWE postępowanie?',
      o: [
        'czekać z podaniem leków do pełnych 30 minut trwania napadu (klasyczna definicja stanu padaczkowego)',
        'rozpoznać drgawkowy stan padaczkowy (przekroczony próg t₁ = 5 min) i natychmiast podać midazolam 10 mg i.m. (ew. donosowo/dopoliczkowo), nie opóźniając terapii próbami kaniulacji żył',
        'natychmiast wykonać punkcję lędźwiową przed stabilizacją chorego',
        'podać wyłącznie 2 mg diazepamu i.m. i wykonać planowe EEG za 24 h'
      ],
      k: 1,
      c: 'src',
      s: 'ILAE 2015; AES 2016; RAMPART; Meta Hub t11',
      why: 'Według definicji ILAE (2015) punkt czasowy t₁ = 5 min dla drgawkowego stanu padaczkowego oznacza moment rozpoznania SE i natychmiastowego podania pełnej dawki benzodiazepiny (I linia). Badanie RAMPART wykazało co najmniej równorzędną skuteczność i szybszy czas podania midazolamu 10 mg i.m. w porównaniu z lorazepamem i.v., gdy brak wkłucia dożylnego.',
      tip: 'Zapamiętaj dwa progi ILAE: t₁ = 5 min (czas rozpoczęcia leczenia ratunkowego SE), t₂ = 30 min (czas ryzyka nieodwracalnego uszkodzenia neuronów).',
      gap: {
        pool: 'Starsze podręczniki definiowały stan padaczkowy dopiero jako napad (lub serię napadów bez powrotu świadomości) trwający ≥30 minut.',
        now: 'Aktualnie (ILAE 2015, AES, PTN) leczenie drgawkowego SE wdraża się już po t₁ = 5 minutach ciągłych drgawek; 30 minut stanowi próg t₂ (ryzyko trwałych następstw neuronalnych).'
      }
    },
    {
      t: 'tx',
      mod: '4',
      stem: 'U 80-kilogramowego chorego z drgawkowym stanem padaczkowym po 2 pełnych dawkach lorazepamu i.v. (łącznie 8 mg) w 20. minucie napadu drgawki nadal się utrzymują. Według randomizowanego badania ESETT w drugiej fazie leczenia (20–40 min) równorzędną skuteczność (~45–47%) wykazują dożylne dawki nasycające:',
      o: [
        'lewetyracetam 60 mg/kg (maks. 4500 mg), walproinian 40 mg/kg (maks. 3000 mg) lub fosfenytoina/fenytoina 20 mg/kg (maks. 1500 mg)',
        'etosuksymid 15 mg/kg i.v. lub karbamazepina 10 mg/kg i.v.',
        'kolejne 4 bolusy diazepamu i.v. bez leku II linii przed 60. minutą',
        'wyłącznie tiopental w dawce 50 mg/kg i.v. bez intubacji'
      ],
      k: 0,
      c: 'own',
      s: 'ESETT (NEJM 2019); AES; Kalkulator SE Hubu',
      why: 'Badanie ESETT potwierdziło porównywalną skuteczność (~45–47% przerwania SE w ciągu 60 min) oraz bezpieczeństwo trzech leków II rzutu podawanych i.v. w wysokich dawkach nasycających: lewetyracetamu 60 mg/kg (maks. 4500 mg), walproinianu 40 mg/kg (maks. 3000 mg) oraz fosfenytoiny 20 mg PE/kg (maks. 1500 mg; w warunkach polskich dostępna fenytoina 20 mg/kg maks. 1500 mg ≤50 mg/min pod kontrolą EKG i BP). Po >40 min opornego SE (RSE) wdraża się leki znieczulenia ogólnego na OIT z cEEG.',
      tip: 'Przelicz szybko dawki dla 80 kg: LEV = 4500 mg (limit), VPA = 3000 mg (limit), PHT = 1500 mg (limit). Lewetyracetam ma najmniej interakcji i przeciwwskazań.'
    }
  ];

  window.ATLAS_EEG_PATTERNS = {
    '3hz': {
      title: 'Iglica–fala wolna 3 Hz (Napady nieświadomości)',
      tag: 'Uogólnione · ILAE absence',
      provoke: 'Hiperwentylacja (prowokuje niemal u 100% nieleczonych chorych)',
      clinical: 'Nagłe wyłączenia świadomości (5–15 s) z przerwaniem czynności i natychmiastowym powrotem bez splątania ponapadowego.',
      therapy: 'I rzut: etosuksymid (izolowane absence) lub walproinian (gdy współistnieją GTC); alternatywnie lamotrygina. Karbamazepina i fenytoina nasilają napady!',
      svg: '<rect width="560" height="150" fill="#09101a"/><g stroke="#162436" stroke-width="0.9"><path d="M0 37H560M0 75H560M0 113H560M70 0V150M140 0V150M210 0V150M280 0V150M350 0V150M420 0V150M490 0V150"/></g><path d="M12 75 Q42 70 72 75 T100 75 L107 24 L114 84 Q129 124 146 75 L153 22 L160 84 Q175 124 192 75 L199 22 L206 84 Q221 124 238 75 L245 22 L252 84 Q267 124 284 75 L291 22 L298 84 Q313 124 330 75 L337 22 L344 84 Q359 124 376 75 L383 22 L390 84 Q405 124 422 75 L429 26 L436 82 Q448 110 462 75 Q505 70 548 75" fill="none" stroke="#38bdf8" stroke-width="2.4" stroke-linejoin="round"/><text x="280" y="18" fill="#fbbf24" font-size="11.5" font-weight="700" text-anchor="middle">Uogólnione wyładowania iglica–fala wolna 3 Hz (nagły początek i koniec na prawidłowym tle)</text><text x="14" y="140" fill="#94a3b8" font-size="10.5">F3–C3 / F4–C4 · 1 s / działka</text>'
    },
    'jme': {
      title: 'Poliiglica–fala 4–6 Hz (Młodzieńcza padaczka miokloniczna — JME)',
      tag: 'Uogólnione · JME',
      provoke: 'Deprywacja snu oraz fotostymulacja (reakcja fotoparoksyzmalna)',
      clinical: 'Poranne obustronne mioklonie ramion tuż po przebudzeniu („rozlanie kawy”) i napady GTC u nastolatków i młodych dorosłych.',
      therapy: 'Mężczyźni: walproinian; kobiety w wieku rozrodczym: lewetyracetam lub lamotrygina. Unikaj karbamazepiny i fenytoiny!',
      svg: '<rect width="560" height="150" fill="#09101a"/><g stroke="#162436" stroke-width="0.9"><path d="M0 37H560M0 75H560M0 113H560M70 0V150M140 0V150M210 0V150M280 0V150M350 0V150M420 0V150M490 0V150"/></g><path d="M12 78 Q50 74 88 78 L96 26 L101 76 L107 18 L112 78 L118 24 L124 86 Q142 128 160 78 H192 L200 25 L205 76 L211 18 L216 78 L222 24 L228 86 Q246 128 264 78 H298 L306 25 L311 76 L317 19 L322 78 L328 24 L334 86 Q352 128 370 78 H404 L412 26 L417 76 L423 18 L428 78 L434 25 L440 86 Q458 128 476 78 Q512 74 548 78" fill="none" stroke="#f59e0b" stroke-width="2.3" stroke-linejoin="round"/><text x="280" y="18" fill="#fde68a" font-size="11.5" font-weight="700" text-anchor="middle">Uogólnione zespoły wieloiglica–fala 4–6 Hz (polyspike-and-wave)</text><text x="14" y="140" fill="#94a3b8" font-size="10.5">Fotostymulacja 15 Hz · po deprywacji snu</text>'
    },
    'lpd': {
      title: 'Ogniskowe iglice / Okresowe wyładowania lateralizujące (LPD skroniowe)',
      tag: 'Ogniskowe · Skroniowe / HSV',
      provoke: 'Senność i fazy NREM zwiększają ogniskowe wyładowania międzynapadowe',
      clinical: 'Napady skroniowe z aurą (déjà vu, nadbrzuszna) lub w ostrym zespole gorączkowo-afazyjnym — podejrzenie opryszczkowego zapalenia mózgu (HSV-1)!',
      therapy: 'Ogniskowa padaczka: lamotrygina, lewetyracetam lub karbamazepina. Przy LPD skroniowych z gorączką: pilny acyklowir i.v. + MRI FLAIR/DWI!',
      svg: '<rect width="560" height="150" fill="#09101a"/><g stroke="#162436" stroke-width="0.9"><path d="M0 37H560M0 75H560M0 113H560M70 0V150M140 0V150M210 0V150M280 0V150M350 0V150M420 0V150M490 0V150"/></g><path d="M14 52 Q36 47 58 52 L67 20 L75 68 Q92 78 110 52 Q138 58 166 52 L175 19 L183 69 Q200 78 218 52 Q246 58 274 52 L283 20 L291 68 Q308 78 326 52 Q354 58 382 52 L391 19 L399 69 Q416 78 434 52 Q488 58 544 52" fill="none" stroke="#f87171" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 108 Q85 101 156 108 T298 108 T440 108 T544 108" fill="none" stroke="#64748b" stroke-width="1.8"/><text x="280" y="18" fill="#fca5a5" font-size="11.5" font-weight="700" text-anchor="middle">T3–T5 (lewa skroniowa): okresowe wyładowania LPD co ~1 s (dolna linia: prawa półkula)</text><text x="14" y="140" fill="#94a3b8" font-size="10.5">Asymetria ogniskowa · wyładowania nad płatem skroniowym</text>'
    },
    'metab': {
      title: 'Spowolnienie rozlane theta/delta i fale trójfazowe (NCSE vs encefalopatia)',
      tag: 'Różnicowanie · OIT / SOR',
      provoke: 'Niewydolność wątroby, mocznica, hiponatremia, leki vs niedrgawkowy SE',
      clinical: 'Fluktuujące zaburzenia świadomości i asterixis (encefalopatia) lub przedłużające się splątanie po drgawkach (NCSE).',
      therapy: 'Wyrównanie przyczyny metabolicznej. Gdy różnicowanie z NCSE jest niejednoznaczne: test z benzodiazepiną i.v. pod kontrolą ciągłego EEG.',
      svg: '<rect width="560" height="150" fill="#09101a"/><g stroke="#162436" stroke-width="0.9"><path d="M0 37H560M0 75H560M0 113H560M70 0V150M140 0V150M210 0V150M280 0V150M350 0V150M420 0V150M490 0V150"/></g><path d="M14 78 Q44 62 74 78 L88 92 L108 26 L134 108 Q158 96 182 76 Q204 60 226 78 L240 92 L260 28 L286 108 Q310 96 334 76 Q356 61 378 78 L392 92 L412 26 L438 108 Q462 96 486 76 Q516 62 544 78" fill="none" stroke="#a78bfa" stroke-width="2.4" stroke-linejoin="round"/><text x="280" y="18" fill="#ddd6fe" font-size="11.5" font-weight="700" text-anchor="middle">Uogólnione zwolnienie rytmu podstawowego + czołowe fale trójfazowe</text><text x="14" y="140" fill="#94a3b8" font-size="10.5">Zanik rytmu alfa 8–13 Hz · różnicuj z NCSE</text>'
    }
  };
})();
