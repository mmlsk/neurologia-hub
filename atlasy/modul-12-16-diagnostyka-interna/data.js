/* Bank zadań modułów [12][16]: Badania dodatkowe w neurologii i zespoły w chorobach wewnętrznych */
window.ATLAS_TOPICS = {
  obrazowanie: 'TK, MRI i Doppler',
  pmr: 'LP i profile PMR',
  elektro: 'EEG i EMG/ENG',
  interna: 'Interna i niedobory'
};

window.ATLAS_Q = [
  {
    t: 'obrazowanie',
    mod: '16',
    stem: '66-letni mężczyzna z nagłą afazją i prawostronnym niedowładem kończyny górnej obudził się z objawami (ostatnio widziany zdrowy 7 godzin temu). TK głowy bez kontrastu wykluczyło krwotok i rozległą hipodensję. W pilnym MRI stwierdzono wyraźną restrykcję dyfuzji w lewym terytorium MCA (DWI jasne, ADC ciemne) przy braku zmian hiperintensywnych w sekwencji FLAIR. Co oznacza układ sygnałów DWI(+)/FLAIR(−)?',
    o: [
      'Przewlekły, dokonany zawał niedokrwienny sprzed kilku miesięcy z obecnością gliozy',
      'Bardzo świeży zawał niedokrwienny (&lt;4,5 h od zachorowania) — stanowi przesłankę do rozważenia trombolizy dożylnej w protokole WAKE-UP',
      'Krwotok śródmózgowy w fazie nadostrej wymagający natychmiastowego odwrócenia krzepnięcia',
      'Odkładanie manganu w jądrach podstawy w przebiegu encefalopatii wątrobowej',
      'Wykluczenie ostrego niedokrwienia i rozpoznanie przedłużonej aury migrenowej'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM [16] · Wykład TK04 / U11 · MRI w ostrym udarze',
    why: 'Ograniczenie dyfuzji (DWI jasne + mapa ADC ciemna) pojawia się już po kilkunastu minutach od zamknięcia naczynia (obrzęk cytotoksyczny), natomiast hiperintensywność w sekwencji FLAIR rozwija się dopiero po ok. 4,5 godziny. Niezgodność DWI(+)/FLAIR(−) wskazuje więc na bardzo wczesny udar mieszczący się w oknie trombolizy dożylnej.',
    tip: 'DWI + ADC reagują w minutach; FLAIR potrzebuje ok. 4,5 h. Mismatch DWI(+)/FLAIR(−) otwiera drogę do rtPA przy nieznanym czasie zachorowania.',
    gap: {
      pool: 'W klasycznym kryterium zegarowym (0–4,5 h od momentu ostatniego stanu bez objawów) pacjent z udarem po przebudzeniu o nieznanym czasie zachorowania był wykluczany z trombolizy dożylnej.',
      now: 'Aktualne wytyczne ESO (badania WAKE-UP i EXTEND) dopuszczają trombolizę i.v. przy nieznanym czasie zachorowania na podstawie „zegara tkankowego”: niezgodności DWI(+)/FLAIR(−) w MRI lub korzystnej penumbry w perfuzji TK/MRI.'
    }
  },
  {
    t: 'pmr',
    mod: '16',
    stem: '42-letni mężczyzna trafił do SOR z gorączką 39,4°C, silnym bólem głowy, sztywnością karku oraz świeżo stwierdzonym niedowładem lewej kończyny górnej i sennością (GCS 11). Podejrzewasz ostre bakteryjne zapalenie opon mózgowo-rdzeniowych (ZOMR). Jaka jest prawidłowa kolejność działań diagnostyczno-terapeutycznych?',
    o: [
      'Natychmiastowe wykonanie nakłucia lędźwiowego bez wcześniejszego TK i podanie antybiotyku dopiero po uzyskaniu wyniku posiewu PMR',
      'Pobranie posiewów krwi, natychmiastowe podanie empirycznego antybiotyku i.v. oraz deksametazonu PRZED wykonaniem TK głowy, następnie TK i — po wykluczeniu przeciwwskazań — nakłucie lędźwiowe',
      'Wykonanie planowego MRI mózgu z gadolinem i wstrzymanie się z lekami do czasu wykluczenia ropnia',
      'Odstąpienie od antybiotykoterapii w pierwszych 24 godzinach do momentu weryfikacji wirusowego ZOMR w PMR'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [16] · Wykład TK05 / U12 · Bezpieczne LP i ZOMR',
    why: 'Deficyt ogniskowy oraz zaburzenia świadomości (GCS <12–13) są bezwzględnym wskazaniem do wykonania TK głowy przed nakłuciem lędźwiowym (ryzyko wklinowania przy obecności masy lub obrzęku). Nie wolno jednak z tego powodu opóźniać leczenia bakteryjnego ZOMR — po pobraniu krwi na posiew podaje się antybiotyk i.v. i deksametazon jeszcze przed wyjazdem na TK.',
    tip: 'Przy wskazaniach do TK przed LP w podejrzeniu ropnego ZOMR obowiązuje zasada: posiewy krwi → antybiotyk + deksametazon → TK → LP.',
    gap: {
      pool: 'W pytaniach akademickich akcentuje się konieczność wykluczenia wzmożonego ICP i zmian ogniskowych w TK przed wykonaniem nakłucia lędźwiowego.',
      now: 'Wytyczne ESCMID i IDSA podkreślają równolegle, że oczekiwanie na TK nigdy nie może opóźnić podania antybiotyku i steroidu — leczenie empiryczne należy włączyć natychmiast po pobraniu posiewów krwi, przed obrazowaniem.'
    }
  },
  {
    t: 'pmr',
    mod: '16',
    stem: 'U 34-letniego pacjenta 2 tygodnie po ostrej infekcji przewodu pokarmowego narasta od stóp ku górze symetryczny niedowład wiotki kończyn dolnych i górnych ze zniesieniem odruchów głębokich, bez gorączki. W badaniu PMR w 10. dobie choroby stwierdzono: płyn wodojasny, cytoza 2 komórki/µl, stężenie białka 195 mg/dl, glukoza prawidłowa (68% glikemii). Jak nazywa się ten profil PMR i na co wskazuje?',
    o: [
      'Rozszczepienie białkowo-komórkowe — charakterystyczne dla zespołu Guillaina-Barrégo (GBS)',
      'Pleocytoza granulocytarna z hipoglikorachią — ropne bakteryjne ZOMR',
      'Rozszczepienie komórkowo-białkowe — swoiste dla stwardnienia rozsianego',
      'Błona włóknikowa (pajęczynka) — gruźlicze ZOMR',
      'Ksantochromia — krwotok podpajęczynówkowy (SAH)'
    ],
    k: 0,
    c: 'inf',
    s: 'Sylabus PUM [16][10] · U12 · Profile PMR (GBS)',
    why: 'Wyraźnie podwyższone stężenie białka (>45 mg/dl, często >100–200 mg/dl) przy prawidłowej liczbie komórek (<5/µl) to klasyczne rozszczepienie białkowo-komórkowe w zespole Guillaina-Barrégo (lub CIDP). Uwaga kliniczna: w pierwszych 3–7 dniach choroby stężenie białka w PMR bywa jeszcze prawidłowe i nie wyklucza GBS.',
    tip: 'GBS w PMR = wysokie białko + prawidłowa cytoza (rozszczepienie białkowo-komórkowe). W 1. tygodniu białko może być jeszcze w normie!',
  },
  {
    t: 'elektro',
    mod: '16',
    stem: 'W badaniu elektroneurograficznym (ENG) u pacjenta z przewlekłą symetryczną polineuropatią „skarpetkowo-rękawiczkową” stwierdzono znaczne obniżenie amplitudy potencjałów ruchowych (CMAP) i czuciowych (SNAP) przy prawidłowej (lub minimalnie obniżonej) prędkości przewodzenia nerwowego (NCV) i prawidłowych latencjach dystalnych, a w EMG igłowym – fibrylacje i dodatnie fale ostre w mięśniach dystalnych. Jaki typ uszkodzenia opisuje ten wynik?',
    o: [
      'Uszkodzenie pierwotnie demielinizacyjne (typowe dla AIDP/CIDP)',
      'Pierwotnie miopatyczne uszkodzenie włókien mięśniowych',
      'Polineuropatia aksonalna (typowo np. w cukrzycy, alkoholizmie lub niedoborze B₁₂)',
      'Zaburzenie transmisji presynaptycznej w złączu nerwowo-mięśniowym (LEMS)'
    ],
    k: 2,
    c: 'did',
    s: 'Sylabus PUM [16] · Wykład TK05 / U13 · Neurofizjologia ENG/EMG',
    why: 'W uszkodzeniu aksonalnym spada liczba czynnych aksonów, co bezpośrednio obniża amplitudę potencjałów CMAP i SNAP, podczas gdy pozostałe sprawne włókna przewodzą impulsy z prawidłową lub niemal prawidłową prędkością (NCV). Odnerwienie objawia się w EMG spoczynkowymi fibrylacjami i dodatnimi falami ostrymi. W demielinizacji dominują zaś zwolnienie NCV, wydłużenie latencji i bloki przewodzenia.',
    tip: 'Amplituda w dół + prawidłowa prędkość = aksonopatia (cukrzyca, alkohol). Prędkość w dół + wydłużone latencje / fali F = demielinizacja (GBS/CIDP).'
  },
  {
    t: 'interna',
    mod: '12',
    stem: 'Do SOR przywieziono wychudzonego 53-letniego mężczyznę z wywiadem przewlekłego alkoholizmu, splątanego, z oczopląsem poziomym, obustronnym niedowładem odwodzenia gałek ocznych (n. VI) i ciężką ataksją tułowia. Glikemia z palca wynosi 52 mg/dl. Które postępowanie jest bezwzględnym priorytetem terapeutycznym?',
    o: [
      'Podanie najpierw stężonej glukozy 40% i.v. oraz obserwacja przez 6 godzin przed ewentualnym podaniem witamin',
      'Natychmiastowe podanie wysokich dawek witaminy B₁ (tiaminy) dożylnie PRZED podaniem glukozy (lub równolegle po rozpoczęciu wlewu tiaminy)',
      'Podanie witaminy B₆ doustnie oraz wykonanie planowego EMG kończyn dolnych',
      'Włączenie haloperidolu i mannitolu jako leczenia z wyboru psychozy Korsakowa'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [12] · Wykład TK04 / TK05 · Encefalopatia Wernickego',
    why: 'Triada: zaburzenia świadomości, oftalmoplegia/oczopląs i ataksja chodu u chorego niedożywionego lub z alkoholizmem to obraz encefalopatii Wernickego z niedoboru tiaminy (B₁). Podanie samej glukozy zużywa resztki tiaminy jako kofaktora dehydrogenazy pirogronianowej, wywołując lub gwałtownie nasilając martwicę ciał suteczkowatych i wzgórza — dlatego tiaminę i.v. podaje się PRZED glukozą.',
    tip: 'W każdym podejrzeniu alkoholizmu/niedożywienia z hipoglikemią lub zaburzeniami świadomości: najpierw witamina B₁ i.v., dopiero potem glukoza!',
    gap: {
      pool: 'W starszych opracowaniach podręcznikowych podawano jako standard 100 mg tiaminy i.m. lub i.v. na dobę.',
      now: 'Aktualne wytyczne EFNS i NICE zalecają w podejrzeniu encefalopatii Wernickego wysokie dawki pozajelitowe: 200–500 mg tiaminy i.v. co 8 h przez 3–5 dni (doustne wchłanianie jest niewystarczające, a 100 mg często nie zapobiega zespołowi Korsakowa).'
    }
  },
  {
    t: 'interna',
    mod: '12',
    stem: '64-letnia wegetarianka od roku przyjmująca przewlekle inhibitory pompy protonowej zgłasza drętwienie stóp i niepewność chodu, szczególnie nasilone w ciemności i podczas mycia twarzy nad umywalką. W badaniu neurologicznym: zniesione czucie wibracji i ułożenia w palcach stóp, wygórowane odruchy kolanowe, obustronny objaw Babińskiego oraz wyraźne zachwianie i tendencja do upadku natychmiast po zamknięciu oczu (przy oczach otwartych stoi stabilnie). Które rozpoznanie i interpretacja próby Romberga są prawidłowe?',
    o: [
      'Zespół móżdżkowy (ataksja móżdżkowa) — dodatni objaw Romberga świadczy o uszkodzeniu robaka móżdżku',
      'Zwyrodnienie powrózkowe rdzenia z niedoboru witaminy B₁₂ (uszkodzenie sznurów tylnych i bocznych) — dodatni objaw Romberga przy oczach zamkniętych świadczy o ataksji tylnosznurowej (czuciowej)',
      'Stwardnienie zanikowe boczne (SLA) — izolowane uszkodzenie sznurów tylnych z zachowanym czuciem wibracji',
      'Encefalopatia wątrobowa — dodatni objaw Romberga wywołany hiperamonemią',
      'Zespół ogona końskiego — obustronny objaw Babińskiego wynika z ucisku korzeni L5–S1'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM [12] · Wskazówka PUM #10 · Niedobór B₁₂ i sznury tylne',
    why: 'Zespół łączy uszkodzenie sznurów tylnych (zniesione czucie głębokie wibracji i ułożenia, dodatnia próba Romberga — chory kompensuje deficyt wzrokiem przy oczach otwartych i traci równowagę po ich zamknięciu) oraz sznurów bocznych (wygórowane odruchy kolanowe, obustronny objaw Babińskiego) — to klasyczne podostre złożone zwyrodnienie rdzenia z niedoboru wit. B₁₂. W zespole móżdżkowym chory chwieje się już przy oczach otwartych.',
    tip: 'Wskazówka PUM #10: próba Romberga dodatnia (upadek po zamknięciu oczu) = sznury tylne / czucie głębokie (np. B₁₂). W uszkodzeniu móżdżku pacjent jest niestabilny już przy oczach otwartych!'
  },
  {
    t: 'interna',
    mod: '12',
    stem: '61-letni chory z wieloletnią, źle kontrolowaną cukrzycą typu 2 zgłosił się z powodu nagłego dwojenia, opadnięcia lewej powieki oraz ustawienia lewej gałki ocznej na zewnątrz i ku dołowi. W badaniu stwierdzono zniesienie ruchów przywodzenia, unoszenia i obniżania lewego oka, natomiast obie źrenice były równe (3 mm) i żywo reagowały na światło. Która interpretacja jest właściwa?',
    o: [
      'Oszczędzenie źrenicy przemawia za niedokrwiennym (mikronaczyniowym) uszkodzeniem nerwu III w przebiegu cukrzycy (zawał środka pnia nerwu)',
      'Zachowana reakcja źrenicy jest objawem alarmowym pękniętego tętniaka tętnicy łączącej tylnej (TComP) uciskającego nerw III od zewnątrz',
      'Obraz odpowiada porażeniu nerwu IV (bloczkowego), w którym oko ucieka do dołu i do wewnątrz',
      'Jest to klasyczny zespół Lamberta-Eatona poprzedzający wykrycie raka drobnokomórkowego płuca'
    ],
    k: 0,
    c: 'own',
    s: 'Sylabus PUM [12][6] · Neuropatie cukrzycowe i Wskazówka PUM #1',
    why: 'Włókna przywspółczulne zwężające źrenicę biegną na obwodzie (powierzchownie) nerwu okoruchowego (n. III) i otrzymują dobre ukrwienie z naczyń opony miękkiej. Cukrzycowa mononeuropatia niedokrwienna dotyczy naczyń własnych wnętrza nerwu (vasa nervorum), oszczędzając powierzchowne włókna źreniczne. Odwrotnie, ucisk z zewnątrz (np. tętniak TComP) najpierw uszkadza włókna przywspółczulne — daje rozszerzoną, niereagującą źrenicę i wymaga pilnego angio-TK.',
    tip: 'Nerw III w cukrzycy = oszczędzona źrenica (niedokrwienie środka pnia). Nerw III z szeroką źrenicą = pilnie wyklucz tętniaka TComP w angio-TK!'
  }
];
