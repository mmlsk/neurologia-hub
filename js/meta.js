/* Metadane Neurologia V · Hub nauki — sylabus Kliniki Neurologii PUM 2026/2027 */
window.HUB_META = (function () {
  'use strict';

  const GROUPS = {
    A: { id: 'A', name: 'Stany nagłe, naczyniowe i przytomność', short: 'Nagłe i udary', color: 'var(--red)', soft: 'var(--red-l)' },
    B: { id: 'B', name: 'Semiologia, badanie i zespoły bólowe', short: 'Badanie i bóle', color: 'var(--amber)', soft: 'var(--amber-l)' },
    C: { id: 'C', name: 'Autoimmunologia, układ obwodowy i mięśnie', short: 'Autoimmuno i nerw.-mięśn.', color: 'var(--blue)', soft: 'var(--blue-l)' },
    D: { id: 'D', name: 'Neuroonkologia, zwyrodnienia i diagnostyka', short: 'Onko · Zwyrodn. · Diagn.', color: 'var(--violet)', soft: 'var(--violet-l)' }
  };

  const MODS = [
    { id: '1', g: 'A', n: 'Stany nagłe w neurologii', at: 'nagle', a: 'triage', desc: 'Wzmożone ICP, wgłobienie, ZOMR, urazy czaszkowo-mózgowe' },
    { id: '2', g: 'A', n: 'Choroby naczyniowe i udar mózgu', at: 'udar', a: 'tetnice', desc: 'Tętnice mózgowe, kwalifikacja do rtPA/MT, krwotok i SAH' },
    { id: '3', g: 'A', n: 'Zaburzenia przytomności i świadomości', at: 'nagle', a: 'swiadomosc', desc: 'GCS, śpiączki metaboliczne i strukturalne, odruchy pniowe' },
    { id: '4', g: 'A', n: 'Padaczka i stany drgawkowe', at: 'padaczka', a: 'klasyfikacja', desc: 'Klasyfikacja ILAE, EEG, omdlenia vs napady, LPP i SE' },
    { id: '5', g: 'B', n: 'Badanie neurologiczne i neurofizjologia', at: 'badanie', a: 'technika', desc: 'Protokół U02, UMN vs LMN, odruchy, móżdżek vs sznury tylne' },
    { id: '6', g: 'B', n: 'Nerwy czaszkowe i zaburzenia mowy', at: 'badanie', a: 'nerwy', desc: 'Nerwy I–XII, VII ośrodkowy vs obwodowy, szczelina oczodołowa, afazja' },
    { id: '7', g: 'B', n: 'Bóle głowy i neuralgia nerwu V', at: 'bole', a: 'glowa', desc: 'Flagi SNOOP, migrena, TAC, ból napięciowy, neuralgia V' },
    { id: '8', g: 'B', n: 'Bóle barku, bóle krzyża i rwa kulszowa', at: 'bole', a: 'kregoslup', desc: 'Radikulopatie szyjne/lędźwiowe, objawy rozciągowe, ogon koński' },
    { id: '9', g: 'C', n: 'Choroby autoimmunologiczne OUN (SM)', at: 'autoimmuno', a: 'sm', desc: 'Stwardnienie rozsiane, kryteria McDonalda, rzut i DMT, NMOSD/AIE' },
    { id: '10', g: 'C', n: 'Choroby obwodowego układu nerwowego', at: 'obwodowy', a: 'polineuropatie', desc: 'Polineuropatie aksonalne i demielinizacyjne, GBS, CIDP' },
    { id: '11', g: 'C', n: 'Choroby złącza nerwowo-mięśniowego i mięśni', at: 'obwodowy', a: 'miastenia', desc: 'Miastenia gravis, przełomy, LEMS, miopatie i dystrofie' },
    { id: '12', g: 'C', n: 'Zespoły neurologiczne w chorobach wewnętrznych', at: 'diagnostyka', a: 'interna', desc: 'Encefalopatie metaboliczne, niedobory B12/B1, cukrzyca, alkoholizm' },
    { id: '13', g: 'D', n: 'Guzy ośrodkowego układu nerwowego', at: 'guzy', a: 'lokalizacja', desc: 'ICP, zespoły płatowe, glejaki, oponiaki, przerzuty i guzy rdzenia' },
    { id: '14', g: 'D', n: 'Choroby zwyrodnieniowe OUN (Parkinson, SLA)', at: 'zwyrodnienia', a: 'parkinson', desc: 'Choroba Parkinsona, MSA/PSP/DLB, SLA (UMN+LMN), Huntington' },
    { id: '15', g: 'D', n: 'Zespoły otępienne (Alzheimer, FTD, VaD)', at: 'zwyrodnienia', a: 'otepienia', desc: 'Choroba Alzheimera, FTD, otępienie naczyniopochodne, NPH, MMSE' },
    { id: '16', g: 'D', n: 'Badania dodatkowe w neurologii', at: 'diagnostyka', a: 'obrazowanie', desc: 'TK/MRI w stanach nagłych, PMR, EEG, EMG/ENG, Doppler' }
  ];

  const ATLASES = [
    { id: 'nagle', dir: 'modul-1-3-stany-nagle', prefix: 'nagle-q', n: 'Stany nagłe i przytomność', sub: 'Triage, świadomość, ICP, ZOMR i urazy', g: 'A', mods: ['1', '3'], secs: [['triage', 'Ocena i triage'], ['swiadomosc', 'Świadomość'], ['icp', 'Wzmożone ICP'], ['zomr', 'Neuroinfekcje'], ['urazy', 'Urazy OUN'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'udar', dir: 'modul-2-udar-naczyniowe', prefix: 'udar-q', n: 'Choroby naczyniowe i udar mózgu', sub: 'Tętnice mózgowe, rtPA/MT, krwotok i SAH', g: 'A', mods: ['2'], secs: [['tetnice', 'Tętnice mózgowe'], ['kwalifikacja', 'Kwalifikacja rtPA/MT'], ['leczenie', 'Postępowanie'], ['krwotoczny', 'Udar krwotoczny'], ['sah', 'SAH i zatoki'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'padaczka', dir: 'modul-4-padaczka', prefix: 'pad-q', n: 'Padaczka i stany drgawkowe', sub: 'Klasyfikacja ILAE, EEG, różnicowanie i stan padaczkowy', g: 'A', mods: ['4'], secs: [['klasyfikacja', 'Klasyfikacja ILAE'], ['diagnostyka', 'Diagnostyka i EEG'], ['roznicowanie', 'Różnicowanie'], ['leczenie', 'Farmakoterapia'], ['status', 'Stan padaczkowy'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'badanie', dir: 'modul-5-6-badanie-nerwy', prefix: 'bad-q', n: 'Badanie neurologiczne i nerwy I–XII', sub: 'Technika U02, UMN/LMN, móżdżek, nerwy i mowa', g: 'B', mods: ['5', '6'], secs: [['technika', 'Badanie U02'], ['neurony', 'UMN vs LMN'], ['ataksja', 'Móżdżek vs sznury'], ['nerwy', 'Nerwy I–XII'], ['mowa', 'Afazja i dyzartria'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'bole', dir: 'modul-7-8-bole-glowy-kregoslup', prefix: 'bol-q', n: 'Bóle głowy i zespoły kręgosłupa', sub: 'SNOOP, migrena, neuralgia V, rwa i ogon koński', g: 'B', mods: ['7', '8'], secs: [['glowa', 'Klasyfikacja i SNOOP'], ['migrena', 'Migrena i TAC'], ['neuralgia', 'Neuralgia V'], ['kregoslup', 'Bóle barku i krzyża'], ['ogon', 'Zespół ogona końskiego'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'autoimmuno', dir: 'modul-9-autoimmunologia', prefix: 'auto-q', n: 'Choroby autoimmunologiczne OUN', sub: 'SM, kryteria McDonalda, DMT, NMOSD, MOGAD i AIE', g: 'C', mods: ['9'], secs: [['sm', 'Obraz SM'], ['mcdonald', 'Kryteria McDonalda'], ['leczenie', 'Rzut i DMT'], ['nmosd', 'NMOSD i MOGAD'], ['zapalenia', 'Zapalenia autoimmun.'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'obwodowy', dir: 'modul-10-11-obwodowy-miesnie', prefix: 'obw-q', n: 'Układ obwodowy, złącze i mięśnie', sub: 'Polineuropatie, GBS/CIDP, miastenia, LEMS i miopatie', g: 'C', mods: ['10', '11'], secs: [['polineuropatie', 'Polineuropatie'], ['gbs', 'GBS i CIDP'], ['miastenia', 'Miastenia gravis'], ['lems', 'LEMS i przełomy'], ['miopatie', 'Miopatie'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'guzy', dir: 'modul-13-guzy-oun', prefix: 'guzy-q', n: 'Guzy ośrodkowego układu nerwowego', sub: 'ICP, objawy ogniskowe, typy guzów i rdzeń', g: 'D', mods: ['13'], secs: [['lokalizacja', 'Lokalizacja i ICP'], ['objawy', 'Objawy ogniskowe'], ['typy', 'Karty guzów'], ['rdzen', 'Guzy rdzenia'], ['leczenie', 'Diagnostyka i leczenie'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'zwyrodnienia', dir: 'modul-14-15-zwyrodnienia-otepienia', prefix: 'zwyr-q', n: 'Zwyrodnienia OUN i otępienia', sub: 'Parkinson, parkinsonizm atypowy, SLA, AD, FTD i VaD', g: 'D', mods: ['14', '15'], secs: [['parkinson', 'Choroba Parkinsona'], ['atypowe', 'Parkinsonizm atypowy'], ['sla', 'SLA (UMN + LMN)'], ['otepienia', 'Otępienia (AD/FTD/VaD)'], ['testy', 'Skale i odwracalne'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] },
    { id: 'diagnostyka', dir: 'modul-12-16-diagnostyka-interna', prefix: 'diag-q', n: 'Diagnostyka dodatkowa i interna', sub: 'TK/MRI, PMR, EEG/EMG, encefalopatie i niedobory', g: 'D', mods: ['12', '16'], secs: [['obrazowanie', 'TK i MRI mózgu'], ['pmr', 'Nakłucie i PMR'], ['elektro', 'EEG i EMG/ENG'], ['interna', 'Neurologia w internie'], ['niedobory', 'Niedobory i toksyny'], ['zadania', 'Zadania testowe'], ['klucz', 'Klucz vs wytyczne'], ['pulapki', 'Pułapki'], ['zrodla', 'Źródła']] }
  ];

  const modById = Object.fromEntries(MODS.map(m => [m.id, m]));
  const atById = Object.fromEntries(ATLASES.map(a => [a.id, a]));

  const TRAPS = [
    { id: 't1', category: 'test', t: 'Uszkodzenie nerwów gałkoruchowych (III, IV, VI)', mods: ['6', '5'], eq: 'Mylenie ustawienia gałki w porażeniu III (przyśrodkowo) lub IV (brak odwodzenia) z VI', out: 'n. III: oko „w dół i na zewnątrz” + opadanie powieki + szeroka sztywna źrenica; n. IV: diplopia pionowa/skośna przy patrzeniu w dół i do środka (schody); n. VI: zez zbieżny, brak odwodzenia', tip: 'Wskazówka PUM #1: W porażeniu n. IV pacjent przechyla głowę na zdrowy bark (kompensacja objawu Bielschowsky’ego).' },
    { id: 't2', category: 'test', t: 'Niedowład podniebienia miękkiego (IX, X) i języczek', mods: ['6', '5'], eq: 'Błędne założenie, że języczek zbacza w stronę chorą (jak język w XII)', out: 'Języczek i łuk podniebienny są pociągane przez mięśnie zdrowej połowy — odchylenie języczka oraz objaw firanki Verneta kierują się W STRONĘ ZDROWĄ', tip: 'Wskazówka PUM #2: Język (n. XII) zbacza w stronę CHORĄ, a języczek podniebienny (n. X) w stronę ZDROWĄ.' },
    { id: 't3', category: 'bedside', t: 'Ośrodkowe vs obwodowe porażenie nerwu twarzowego (VII)', mods: ['6', '2'], eq: 'Rozpoznawanie porażenia Bella u chorego z oszczędzeniem czoła lub przeoczenie udaru pnia', out: 'Ośrodkowe (nadjądrowe): osłabienie wyłącznie dolnej 2/3 twarzy po stronie przeciwnej (czoło marszczy się symetrycznie). Obwodowe: porażenie całego połowiczego mięśniowia twarzy po tej samej stronie z niedomykalnością szpary powiekowej (objaw Bella)', tip: 'Wskazówka PUM #3: Zawsze każ choremu zmarszczyć czoło i zacisnąć mocno powieki przed oceną kąta ust.' },
    { id: 't4', category: 'test', t: 'Zespół szczeliny oczodołowej górnej vs szczyt oczodołu', mods: ['6', '13'], eq: 'Ograniczenie szczeliny oczodołowej górnej tylko do nerwów gałkoruchowych bez V1 lub włączanie n. II', out: 'Szczelina oczodołowa górna = n. III, IV, VI + V1 (brak czucia na czole i zniesiony odruch rogówkowy) z zachowaną ostrością wzroku. Gdy dołącza n. II (ślepota/RAPD) → zespół szczytu oczodołu', tip: 'Wskazówka PUM #4: Przez szczelinę oczodołową górną nie przechodzi nerw wzrokowy (kanał wzrokowy).' },
    { id: 't5', category: 'test', t: 'Topografia tętnic mózgowych (ACA, MCA, PCA, BA, PICA)', mods: ['2', '6'], eq: 'Traktowanie każdego niedowładu połowiczego jako zespołu MCA bez oceny kończyny dominującej', out: 'ACA: niedowład przeciwstronny KD > KG + abulia; MCA: twarz/KG > KD + afazja/zaniedbywanie; PCA: niedowidzenie połowicze jednoimienne; BA: tetrapareza/locked-in/zaburzenia świadomości; PICA (Wallenberg): zespół skrzyżowany bez niedowładu piramidowego', tip: 'Wskazówka PUM #5: W zespole Wallenberga brak porażenia kończyn, bo piramidy leżą przyśrodkowo (unaczynienie ASA).' },
    { id: 't6', category: 'bedside', t: 'Kwalifikacja do trombolizy (rtPA) i trombektomii (MT)', mods: ['2', '1', '16'], eq: 'Czekanie na pełne zmiany niedokrwienne w TK lub rutynowe obniżanie RR poniżej 140 mmHg', out: 'rtPA do 4,5 h (0,9 mg/kg, max 90 mg) po WYKLUCZENIU krwotoku w TK i przy RR <185/110 mmHg; MT do 6 h (do 24 h w oknie tkankowym DAWN/DEFUSE-3 przy LVO)', tip: 'Wskazówka PUM #6: Prawidłowy obraz wczesnego TK głowy w ostrym deficycie ogniskowym nie wyklucza udaru — otwiera drogę do rtPA.' },
    { id: 't7', category: 'test', t: 'Górny (UMN) vs dolny (LMN) neuron ruchowy', mods: ['5', '14'], eq: 'Mylenie wiotkości ostrego szoku rdzeniowego/udarowego z trwałym uszkodzeniem LMN', out: 'UMN: spastyczność (objaw scyzorykowy), wygórowanie odruchów głębokich, klonusy, Babiński (+), brak fascykulacji. LMN: wiotkość, hipo-/arefleksja, szybki zanik mięśni, fascykulacje, brak Babińskiego', tip: 'Wskazówka PUM #7: W ostrej fazie udaru lub urazu rdzenia odruchy mogą być przejściowo zniesione zanim rozwinie się spastyczność.' },
    { id: 't8', category: 'test', t: 'Rozpoznanie choroby Parkinsona i rola lewodopy', mods: ['14'], eq: 'Rozpoznawanie Parkinsona przy izolowanym drżeniu bez bradykinezji lub przy wczesnych upadkach', out: 'Warunek konieczny: bradykinezja + sztywność („koło zębate”) i/lub drżenie spoczynkowe 4–6 Hz; wybitna odpowiedź na lewodopę. Wczesne upadki do tyłu i porażenie spojrzenia w dół wskazują na PSP', tip: 'Wskazówka PUM #8: Drżenie samoistne jest pozycyjno-kinetyczne (8–12 Hz), często rodzinne i ustępuje po małej dawce alkoholu.' },
    { id: 't9', category: 'test', t: 'Stwardnienie zanikowe boczne (SLA) — kryteria kliniczne', mods: ['14', '5'], eq: 'Wykluczanie SLA z powodu braku zaburzeń czucia albo podejrzenie SLA przy wczesnych zaburzeniach zwieraczy', out: 'SLA = jednoczesne objawy UMN (wygórowane odruchy, Babiński) i LMN (zaniki, fascykulacje) w kilku piętrach przy ZACHOWANYM czuciu i funkcji zwieraczy', tip: 'Wskazówka PUM #9: Jeśli u pacjenta z podejrzeniem SLA stwierdzasz poziom zaburzeń czucia i zatrzymanie moczu — wykonaj pilne MRI kręgosłupa (mielopatia!).' },
    { id: 't10', category: 'bedside', t: 'Zespół móżdżkowy vs zwyrodnienie sznurów tylnych', mods: ['5', '12'], eq: 'Utożsamianie dodatniej próby Romberga wyłącznie z uszkodzeniem móżdżku', out: 'Móżdżek: pacjent chwieje się już przy oczach otwartych (zamknięcie oczu nie pogarsza dramatycznie wyniku), dysmetria, dysdiadochokineza. Sznury tylne (B12, kiła): chory stoi stabilnie przy oczach otwartych i pada po zamknięciu (Romberg +), zniesione czucie wibracji/ułożenia', tip: 'Wskazówka PUM #10: Próba Romberga bada sznury tylne i narząd przedsionkowy, nie jest swoista dla móżdżku.' },
    { id: 't11', category: 'bedside', t: 'Stan padaczkowy (SE) — próg czasowy t1 = 5 minut', mods: ['4', '1'], eq: 'Oczekiwanie na samoistne ustąpienie drgawek przez 30 minut przed podaniem benzodiazepiny', out: 'Dla drgawkowego stanu padaczkowego t1 = 5 min: natychmiast zabezpiecz drogi oddechowe, oznacz glukozę i podaj benzodiazepinę (lorazepam 4 mg i.v. / diazepam 10 mg i.v. / midazolam 10 mg i.m.)', tip: 'Krytyczny stan nagły: 30 min to czas t2 (ryzyko trwałego uszkodzenia neuronów), nie czas rozpoczęcia leczenia.' },
    { id: 't12', category: 'bedside', t: 'Bakteryjne ZOMR: antybiotyk przed TK i przeciwwskazania do LP', mods: ['1', '16'], eq: 'Wykonanie punkcji lędźwiowej mimo objawów ogniskowych albo zwlekanie z antybiotykiem do wyniku TK', out: 'Przy ognisku, obrzęku tarczy n. II, napadzie lub GCS <12 najpierw pobierz posiewy krwi, podaj ceftriakson (+ wankomycynę/ampicylinę) oraz deksametazon 10 mg i.v., a dopiero potem wykonaj TK przed ewentualną LP', tip: 'Krytyczny stan nagły: nigdy nie opóźniaj pierwszej dawki antybiotyku w ropnym ZOMR o czas oczekiwania na tomografię.' },
    { id: 't13', category: 'bedside', t: 'Krwotok podpajęczynówkowy (SAH) z prawidłowym TK po >6 h', mods: ['2', '7', '16'], eq: 'Wypisanie chorego z piorunującym bólem głowy po prawidłowym TK głowy wykonanym w 24. godzinie', out: 'Czułość TK bez kontrastu w SAH jest niemal 100% w pierwszych 6 h, lecz spada z czasem; po >6–12 h przy ujemnym TK obowiązkowe jest nakłucie lędźwiowe (ksantochromia) lub angio-TK', tip: 'Krytyczny stan nagły: nie rozpoznawaj migreny u chorego z pierwszym w życiu piorunującym bólem głowy („worst headache of life”).' },
    { id: 't14', category: 'bedside', t: 'Zespół ogona końskiego (CES) — pilna interwencja chirurgiczna', mods: ['8', '13'], eq: 'Leczenie zachowawcze NLPZ i rehabilitacją jak w zwykłej rwie kulszowej', out: 'Znieczulenie typu spodenek jeździeckich + ostre zatrzymanie/nietrzymanie moczu + osłabienie zwieracza odbytu i niedowład kończyn dolnych = pilne MRI L-S i odbarczenie operacyjne w trybie ostrodyżurowym (<24–48 h)', tip: 'Krytyczny stan nagły: opóźnienie odbarczenia skutkuje trwałym kalectwem urologicznym i paraplegią wiotką.' },
    { id: 't15', category: 'bedside', t: 'Przełom miasteniczny vs przełom cholinergiczny', mods: ['11', '1'], eq: 'Zwiększanie dawki pirydostygminy w ciemno przy ostrej duszności lub wykonywanie próby edrofoniowej bez intubacji', out: 'Przełom cholinergiczny daje objawy muskarynowe (zwężenie źrenic, ślinotok, bradykardia, biegunka, poty) i fascykulacje. W OBU przełomach priorytetem jest zabezpieczenie oddechu (intubacja przy FVC <15 ml/kg lub hiperkapnii)', tip: 'Krytyczny stan nagły: w przełomie miastenicznym stosuj plazmaferezę (PLEX) lub IVIG oraz odstaw czasowo anty-AChE po intubacji.' },
    { id: 't16', category: 'bedside', t: 'Wgłobienie skroniowe (haka hipokampa) i objaw Kernohana', mods: ['1', '3', '13'], eq: 'Interpretacja poszerzonej źrenicy jako objawu lokalizującego zawsze po stronie przeciwnej do niedowładu', out: 'Ucisk n. III daje poszerzenie źrenicy PO STRONIE guza/krwiaka; niedowład jest zwykle przeciwstronny, lecz przy dociśnięciu przeciwnego konaru mózgu do namiotu (wcięcie Kernohana) może wystąpić po tej samej stronie co poszerzona źrenica', tip: 'Krytyczny stan nagły: poszerzona sztywna źrenica + narastająca śpiączka + triada Cushinga wymagają natychmiastowego mannitolu/hiperwentylacji krótkotrwałej i konsultacji neurochirurgicznej.' }
  ];

  const CONF = {
    src: { id: 'src', n: 'Zgodne ze źródłem', l: 'Wytyczne / sylabus', desc: 'Potwierdzone aktualnymi wytycznymi (ESO/AHA/EAN/ILAE) oraz sylabusem PUM', cls: 'green' },
    inf: { id: 'inf', n: 'Rozbieżność klucz vs klinika', l: 'Podwójna prawda', desc: 'Klasyczne sformułowanie testowe różni się od aktualnych wytycznych klinicznych', cls: 'amber' },
    unk: { id: 'unk', n: 'Weryfikuj w ChPL / literaturze', l: 'Wymaga sprawdzenia', desc: 'Dawkowanie lub kryterium wymagające sprawdzenia w ChPL i podręczniku Podemskiego', cls: 'red' },
    did: { id: 'did', n: 'Rekonstrukcja dydaktyczna', l: 'Zadanie ćwiczeniowe', desc: 'Pytanie opracowane dydaktycznie na podstawie 10 wskazówek egzaminacyjnych PUM', cls: 'blue' },
    own: { id: 'own', n: 'Własne pytanie', l: 'Dodane lokalnie', desc: 'Pytanie zaimportowane lub dodane lokalnie przez studenta', cls: 'violet' }
  };

  const BANKS = {
    zaklad: { id: 'zaklad', n: 'Pula Katedry / Zakładu', short: 'Zakład PUM', desc: 'Zadania z 10 wskazówek egzaminacyjnych i ćwiczeń Kliniki Neurologii PUM' },
    modulowa: { id: 'modulowa', n: 'Trening modułowy', short: 'Modułowa', desc: 'Pytania przekrojowe z 16 modułów sylabusa (wykłady, seminaria, ćwiczenia)' },
    lek: { id: 'lek', n: 'Styl LEK (neurologia)', short: 'LEK', desc: 'Pytania w formacie LEK z udarów, padaczki, bólów głowy i neurointerny' },
    pes: { id: 'pes', n: 'Poziom PES / kliniczny', short: 'PES', desc: 'Rozszerzone przypadki topodiagnostyczne i kwalifikacja interwencyjna' },
    custom: { id: 'custom', n: 'Moje pytania (import)', short: 'Własne', desc: 'Pytania wklejone lub zaimportowane lokalnie w formacie tekstowym albo JSON' }
  };

  const WIKILINKS = {
    '1': [
      { target: '3', atlas: 'nagle', sec: 'swiadomosc', label: 'Śpiączka i wzmożone ICP w GCS ≤8', type: 'diag', concept: 'Wgłobienie i triada Cushinga' },
      { target: '16', atlas: 'diagnostyka', sec: 'pmr', label: 'Kiedy TK głowy przed punkcją lędźwiową', type: 'trap', concept: 'Bezpieczeństwo LP w ZOMR' },
      { target: '2', atlas: 'udar', sec: 'kwalifikacja', label: 'Okno czasowe rtPA i MT w ostrym triage', type: 'diag', concept: 'Triage udarowy' }
    ],
    '2': [
      { target: '16', atlas: 'diagnostyka', sec: 'obrazowanie', label: 'Rola wczesnego TK (wykluczenie krwotoku) vs DWI MRI', type: 'trap', concept: 'Obrazowanie w ostrym udarze' },
      { target: '6', atlas: 'badanie', sec: 'nerwy', label: 'Zespoły pniowe skrzyżowane (Wallenberg, Weber)', type: 'diag', concept: 'Udar tylnego krążenia' },
      { target: '7', atlas: 'bole', sec: 'glowa', label: 'Piorunujący ból głowy w SAH a udar krwotoczny', type: 'trap', concept: 'Diagnostyka różnicowa SAH' }
    ],
    '3': [
      { target: '1', atlas: 'nagle', sec: 'icp', label: 'Odruchy pniowe i ocena wgłobienia przy śpiączce', type: 'diag', concept: 'Ocena przytomności i pnia' },
      { target: '12', atlas: 'diagnostyka', sec: 'interna', label: 'Śpiączki metaboliczne (hipoglikemia, encefalopatia W-K)', type: 'trap', concept: 'Odwracalne przyczyny śpiączki' }
    ],
    '4': [
      { target: '16', atlas: 'diagnostyka', sec: 'elektro', label: 'Czułość spoczynkowego EEG i rola monitorowania', type: 'trap', concept: 'EEG w padaczce i SE' },
      { target: '1', atlas: 'nagle', sec: 'triage', label: 'Stan padaczkowy: t1 = 5 min i natychmiastowa BZD', type: 'diag', concept: 'Postępowanie w SE' },
      { target: '3', atlas: 'nagle', sec: 'swiadomosc', label: 'Omdlenie drgawkowe vs uogólniony napad T-K', type: 'trap', concept: 'Różnicowanie utrat przytomności' }
    ],
    '5': [
      { target: '6', atlas: 'badanie', sec: 'nerwy', label: 'Badanie nerwów czaszkowych I–XII w schemacie U02', type: 'diag', concept: 'Protokół U02 nerwy' },
      { target: '14', atlas: 'zwyrodnienia', sec: 'sla', label: 'Zespół UMN + LMN w SLA bez zaburzeń czucia', type: 'trap', concept: 'Różnicowanie UMN/LMN' },
      { target: '12', atlas: 'diagnostyka', sec: 'niedobory', label: 'Ataksja móżdżkowa vs tylnosznurowa (Romberg)', type: 'trap', concept: 'Badanie zborności i czucia głębokiego' }
    ],
    '6': [
      { target: '2', atlas: 'udar', sec: 'tetnice', label: 'Ośrodkowe vs obwodowe porażenie n. VII i zespoły pniowe', type: 'trap', concept: 'Lokalizacja uszkodzenia VII' },
      { target: '13', atlas: 'guzy', sec: 'objawy', label: 'Zespół kąta mostowo-móżdżkowego (V, VII, VIII) i szczeliny oczodołowej', type: 'diag', concept: 'Guzy podstawy czaszki' },
      { target: '5', atlas: 'badanie', sec: 'technika', label: 'Objaw firanki Verneta (IX/X) vs zbaczanie języka (XII)', type: 'trap', concept: 'Badanie grupy opuszkowej' }
    ],
    '7': [
      { target: '2', atlas: 'udar', sec: 'sah', label: 'Flagi SNOOP: ból piorunujący = wyklucz SAH i CVST', type: 'trap', concept: 'Alarmowe bóle głowy' },
      { target: '13', atlas: 'guzy', sec: 'lokalizacja', label: 'Ból głowy ze wzmożonym ICP (poranny, przy kaszlu)', type: 'diag', concept: 'Ból guzowy' },
      { target: '6', atlas: 'badanie', sec: 'nerwy', label: 'Neuralgia nerwu trójdzielnego (V2/V3) i odruch rogówkowy', type: 'diag', concept: 'Topografia gałęzi n. V' }
    ],
    '8': [
      { target: '13', atlas: 'guzy', sec: 'rdzen', label: 'Zespół ogona końskiego vs rwa kulszowa i guzy kanału kręgowego', type: 'trap', concept: 'Alarmy rdzeniowe' },
      { target: '5', atlas: 'badanie', sec: 'neurony', label: 'Odruchy skokowe (S1), kolanowe (L3–L4) i objaw Lasègue’a', type: 'diag', concept: 'Badanie korzeniowe' }
    ],
    '9': [
      { target: '16', atlas: 'diagnostyka', sec: 'pmr', label: 'Prążki oligoklonalne typu II w kryteriach McDonalda (DIT)', type: 'diag', concept: 'PMR w SM' },
      { target: '6', atlas: 'badanie', sec: 'nerwy', label: 'Pozagałkowe zapalenie nerwu II i międzyjądrowe porażenie spojrzenia (INO)', type: 'diag', concept: 'Objawy rzutowe SM' }
    ],
    '10': [
      { target: '16', atlas: 'diagnostyka', sec: 'pmr', label: 'Rozszczepienie białkowo-komórkowe w GBS od 2. tygodnia', type: 'diag', concept: 'PMR i ENG w GBS' },
      { target: '11', atlas: 'obwodowy', sec: 'miastenia', label: 'Polineuropatia / GBS vs miastenia gravis (czucie i odruchy)', type: 'trap', concept: 'Niedowład wiotki różnicowanie' },
      { target: '12', atlas: 'diagnostyka', sec: 'interna', label: 'Polineuropatia cukrzycowa, alkoholowa i niedobór B12', type: 'diag', concept: 'Etiologia polineuropatii' }
    ],
    '11': [
      { target: '10', atlas: 'obwodowy', sec: 'gbs', label: 'Przełom miasteniczny z wydolnym czuciem vs GBS z arefleksją', type: 'trap', concept: 'Ostra niewydolność oddechowa' },
      { target: '16', atlas: 'diagnostyka', sec: 'elektro', label: 'Próba nużliwości w EMG (dekrement) w MG vs inkrement w LEMS', type: 'diag', concept: 'Elektrofizjologia złącza' }
    ],
    '12': [
      { target: '3', atlas: 'nagle', sec: 'swiadomosc', label: 'Encefalopatia Wernickego: tiamina przed glukozą i.v.!', type: 'trap', concept: 'Stany metaboliczne w śpiączce' },
      { target: '5', atlas: 'badanie', sec: 'ataksja', label: 'Zwyrodnienie powrózkowe rdzenia (B12): sznury tylne + piramidowe', type: 'diag', concept: 'Niedobór witaminy B12' }
    ],
    '13': [
      { target: '1', atlas: 'nagle', sec: 'icp', label: 'Obrzęk wokół guza, wgłobienie i rola deksametazonu', type: 'diag', concept: 'Obrzęk naczyniopochodny' },
      { target: '8', atlas: 'bole', sec: 'ogon', label: 'Przerzuty do kręgosłupa i ostra kompresja rdzenia', type: 'trap', concept: 'Kompresja rdzenia kręgowego' }
    ],
    '14': [
      { target: '5', atlas: 'badanie', sec: 'neurony', label: 'SLA jako współistnienie cech UMN i LMN', type: 'diag', concept: 'Badanie w SLA' },
      { target: '15', atlas: 'zwyrodnienia', sec: 'otepienia', label: 'Otępienie z ciałami Lewy’ego (DLB) vs otępienie w Ch. Parkinsona', type: 'trap', concept: 'Synukleinopatie z otępieniem' }
    ],
    '15': [
      { target: '14', atlas: 'zwyrodnienia', sec: 'atypowe', label: 'Wodogłowie normotensyjne (triada Hakima) jako otępienie odwracalne', type: 'trap', concept: 'Odwracalne przyczyny otępienia' },
      { target: '12', atlas: 'diagnostyka', sec: 'niedobory', label: 'Badania przesiewowe: TSH, wit. B12, kiła, jonogram przed rozpoznaniem AD', type: 'diag', concept: 'Diagnostyka wykluczeń otępienia' }
    ],
    '16': [
      { target: '2', atlas: 'udar', sec: 'kwalifikacja', label: 'TK bez kontrastu w udarze: cel i ograniczenia w pierwszych godzinach', type: 'trap', concept: 'Neuroobrazowanie udaru' },
      { target: '1', atlas: 'nagle', sec: 'zomr', label: 'Profile PMR: ropny vs wirusowy vs gruźliczy vs GBS vs SAH', type: 'diag', concept: 'Interpretacja PMR' }
    ]
  };

  const SEMANTIC_GAPS = [
    { id: 'gap-1', from: '5', to: '6', fromName: 'Badanie neurologiczne (U02)', toName: 'Nerwy czaszkowe (VII)', title: 'Ośrodkowe vs obwodowe porażenie nerwu VII', clinicalReason: 'Jądro części górnej nerwu VII otrzymuje unerwienie korowe z obu półkul, dlatego udar półkulowy oszczędza mięśnie czoła, natomiast uszkodzenie samego nerwu lub jądra w moście poraża całą połowę twarzy.', examTrap: 'Student rozpoznaje porażenie Bella na podstawie samej asymetrii fałdu nosowo-wargowego bez sprawdzenia marszczenia czoła i przeocza udar mózgu.', mods: ['5', '6', '2'] },
    { id: 'gap-2', from: '2', to: '16', fromName: 'Udar mózgu', toName: 'TK / MRI mózgu', title: 'Prawidłowe wczesne TK głowy nie wyklucza udaru niedokrwiennego', clinicalReason: 'W pierwszych 3–6 h od zachorowania niedokrwienie może nie dawać hipodensji w TK bez kontrastu; badanie służy pilnemu wykluczeniu krwotoku śródmózgowego przed podaniem alteplazy.', examTrap: 'Wstrzymanie kwalifikacji do rtPA z uzasadnieniem „TK wyszło prawidłowe, więc nie ma udaru”.', mods: ['2', '16'] },
    { id: 'gap-3', from: '1', to: '16', fromName: 'Neuroinfekcje (ZOMR)', toName: 'Nakłucie lędźwiowe', title: 'Kolejność: posiew → antybiotyk + deksametazon → TK → LP', clinicalReason: 'Przy objawach ogniskowych, obrzęku tarczy n. II lub GCS <12 nakłucie lędźwiowe grozi wgłobieniem; trzeba wykonać TK, ale pierwszą dawkę antybiotyku i sterydu podaje się natychmiast przed TK.', examTrap: 'Oczekiwanie na wynik TK i punkcję przez 1–2 godziny bez wdrożenia leczenia empirycznego w ropnym ZOMR.', mods: ['1', '16'] },
    { id: 'gap-4', from: '5', to: '14', fromName: 'UMN vs LMN', toName: 'SLA (choroba neuronu ruchowego)', title: 'SLA łączy UMN i LMN, ale oszczędza czucie i zwieracze', clinicalReason: 'Zwyrodnienie neuronów ruchowych kory i rogów przednich rdzenia daje jednocześnie hiperrefleksję/Babińskiego oraz zaniki/fascykulacje bez zajęcia dróg czuciowych i ośrodków zwieraczowych.', examTrap: 'Rozpoznanie SLA bez wykluczenia mielopatii szyjnej w MRI lub traktowanie obecności zaburzeń czucia jako typowej cechy SLA.', mods: ['5', '14'] },
    { id: 'gap-5', from: '5', to: '12', fromName: 'Ataksja i próba Romberga', toName: 'Niedobór witaminy B12', title: 'Próba Romberga różnicuje sznury tylne od móżdżku', clinicalReason: 'Wzrok kompensuje deficyt propriocepcji sznurów tylnych, więc zamknięcie oczu ujawnia gwałtowną niestabilność; w zespole móżdżkowym pacjent jest niestabilny już przy oczach otwartych.', examTrap: 'Błędne utożsamianie „dodatniego objawu Romberga” z zespołem móżdżkowym na egzaminie i przy łóżku chorego.', mods: ['5', '12'] },
    { id: 'gap-6', from: '4', to: '3', fromName: 'Padaczka', toName: 'Zaburzenia przytomności', title: 'Omdlenie drgawkowe vs napad toniczno-kloniczny', clinicalReason: 'Krótkotrwała hipoperfuzja mózgu w omdleniu może wywołać kilka mioklonii, lecz chory szybko odzyskuje pełną orientację; napad padaczkowy cechuje dłuższe splątanie ponapadowe, przygryzienie boku języka i sinica.', examTrap: 'Rozpoczęcie przewlekłej terapii przeciwpadaczkowej na podstawie samych mioklonii po omdleniu bez oceny EKG i wywiadu.', mods: ['4', '3'] },
    { id: 'gap-7', from: '7', to: '2', fromName: 'Bóle głowy (SNOOP)', toName: 'SAH i zakrzepica zatok (CVST)', title: 'Piorunujący ból głowy wymaga wykluczenia SAH mimo ujemnego późnego TK', clinicalReason: 'Krew w przestrzeni podpajęczynówkowej ulega wypłukaniu i rozkładowi w kolejnych godzinach; po >6 h czułość TK spada i konieczne jest nakłucie lędźwiowe na obecność ksantochromii.', examTrap: 'Poprzestanie na prawidłowym TK głowy w 2. dobie bólu piorunującego bez wykonania LP i badania angio-TK/wenografii.', mods: ['7', '2', '16'] },
    { id: 'gap-8', from: '11', to: '10', fromName: 'Miastenia gravis', toName: 'Zespół Guillaina-Barrégo', title: 'Niedowład wiotki bez arefleksji i bez zaburzeń czucia vs poliradikulopatia', clinicalReason: 'W miastenii deficyt dotyczy złącza nerwowo-mięśniowego — nasila się pod koniec dnia (nużliwość), odruchy głębokie pozostają zachowane i brak zaburzeń czucia; w GBS wcześnie znikają odruchy i pojawiają się parestezje.', examTrap: 'Mylenie ciężkiego przełomu miastenicznego z zespołem Guillaina-Barrégo przy ocenie duszności i zaburzeń połykania.', mods: ['11', '10'] }
  ];

  const SYMPTOM_CLUSTERS = [
    {
      id: 's1', name: 'Nagły deficyt ogniskowy (udar / TIA)', icon: '⚡', tag: 'Czas to mózg', mods: ['2', '1', '16'],
      redFlags: ['Nagły niedowład połowiczy lub asymetria twarzy', 'Afazja lub dyzartria', 'Niedowidzenie połowicze / amaurosis fugax', 'Czas od ostatniego stanu bez objawów <4,5–24 h'],
      keyRule: 'Pierwsze badanie to TK głowy bez kontrastu w celu wykluczenia krwotoku — prawidłowy wynik TK w pierwszych godzinach nie wyklucza udaru niedokrwiennego.',
      branches: [
        { mod: '2', name: 'Udar niedokrwienny (MCA/ACA/PCA)', clue: 'Kwalifikacja do rtPA (<4,5 h) i MT (<6–24 h przy LVO)', atlas: 'udar', sec: 'kwalifikacja', linkText: 'Kwalifikacja rtPA/MT' },
        { mod: '2', name: 'Krwotok śródmózgowy', clue: 'Hiperdensyjne ognisko w TK, szybki ból głowy, RR <140 mmHg', atlas: 'udar', sec: 'krwotoczny', linkText: 'Udar krwotoczny' },
        { mod: '4', name: 'Porażenie ponapadowe Todda', clue: 'Przemijający niedowład po napadzie ogniskowym — mimetyk udaru', atlas: 'padaczka', sec: 'roznicowanie', linkText: 'Różnicowanie napadów' }
      ],
      trap: { type: 'bedside', badge: 'Pułapka SOR', title: 'Agresywne zbijanie RR przed TK', desc: 'Przed wykluczeniem krwotoku i bez podania rtPA nie obniżaj gwałtownie RR (progi dopiero >220/120 mmHg lub <185/110 przed trombolizą).' },
      examTip: 'Rozróżniaj ACA (noga > ręka), MCA (twarz/ręka > noga + afazja/zaniedbywanie) i PCA (niedowidzenie jednoimienne).'
    },
    {
      id: 's2', name: 'Zaburzenia przytomności i śpiączka', icon: '🧠', tag: 'GCS ≤ 8', mods: ['3', '1', '12'],
      redFlags: ['GCS ≤8 pkt — zagrożenie drożności dróg oddechowych', 'Asymetria źrenic (poszerzona sztywna źrenica)', 'Triada Cushinga (nadciśnienie, bradykardia, nieregularny oddech)', 'Hipoglikemia lub zatrucie opioidami'],
      keyRule: 'Zawsze najpierw ABC, glukometr i tiamina przed glukozą u niedożywionych/uzależnionych; asymetria źrenic nakazuje pilne wykluczenie wgłobienia.',
      branches: [
        { mod: '3', name: 'Śpiączka strukturalna / wgłobienie', clue: 'Anizokoria (n. III), objawy ogniskowe, brak reakcji źrenic', atlas: 'nagle', sec: 'swiadomosc', linkText: 'Świadomość i pień' },
        { mod: '12', name: 'Śpiączka metaboliczna / toksyczna', clue: 'Zachowana reakcja źrenic na światło, mioklonie, asterixis', atlas: 'diagnostyka', sec: 'interna', linkText: 'Encefalopatie w internie' },
        { mod: '4', name: 'Niedrgawkowy stan padaczkowy (NCSE)', clue: 'Niewyjaśnione zaburzenia świadomości wymagające pilnego EEG', atlas: 'padaczka', sec: 'status', linkText: 'Stan padaczkowy' }
      ],
      trap: { type: 'bedside', badge: 'Zasada krytyczna', title: 'Glukoza bez tiaminy (B1)', desc: 'Podanie samej glukozy choremu z niedoborem witaminy B1 może wywołać lub zaostrzyć encefalopatię Wernickego.' },
      examTip: 'W śpiączce metabolicznej odruch źreniczny na światło pozostaje zwykle zachowany aż do stanu agonalnego.'
    },
    {
      id: 's3', name: 'Podwójne widzenie, ptoza i asymetria twarzy', icon: '👁️', tag: 'Nerwy I–XII', mods: ['6', '11', '2'],
      redFlags: ['Nagłe opadanie powieki z szeroką źrenicą (tętniak tętnicy łączącej tylnej!)', 'Porażenie III, IV, VI + brak czucia V1 (szczelina oczodołowa górna)', 'Zmienność dobowa diplopii i ptozy (miastenia)', 'Ośrodkowe vs obwodowe porażenie VII'],
      keyRule: 'Bolesne porażenie n. III z szeroką sztywną źrenicą to alarm tętniaka PComA do czasu wykluczenia w angio-TK/angio-MR.',
      branches: [
        { mod: '6', name: 'Porażenie III / IV / VI i VII', clue: 'Badanie ruchów gałek, źrenic oraz marszczenia czoła', atlas: 'badanie', sec: 'nerwy', linkText: 'Nerwy czaszkowe I–XII' },
        { mod: '11', name: 'Miastenia oczna / uogólniona', clue: 'Ptoza i diplopia bez zmian źrenic, dodatnia próba nużliwości', atlas: 'obwodowy', sec: 'miastenia', linkText: 'Miastenia gravis' },
        { mod: '9', name: 'Porażenie międzyjądrowe (INO)', clue: 'Deficyt przywodzenia oka + oczopląs oka odwodzącego w SM', atlas: 'autoimmuno', sec: 'sm', linkText: 'Objawy SM' }
      ],
      trap: { type: 'test', badge: 'Pułapka PUM', title: 'Źrenice w miastenii vs n. III', desc: 'Miastenia NIGDY nie daje poszerzenia i sztywności źrenicy — szeroka źrenica w ptozie oznacza uszkodzenie nerwu III.' },
      examTip: 'W zespole szczeliny oczodołowej górnej zajęte są III, IV, VI + V1, zaś nerw II dołącza dopiero w zespole szczytu oczodołu.'
    },
    {
      id: 's4', name: 'Ból głowy z objawami alarmowymi', icon: '🤕', tag: 'SNOOP', mods: ['7', '1', '2'],
      redFlags: ['Piorunujący początek (szczyt <1 minuty — SAH)', 'Gorączka i sztywność karku (ZOMR)', 'Ból poranny nasilany kaszlem + obrzęk tarczy n. II (guz/ICP)', 'Nowy ból >50 r.ż. + tkliwość tętnicy skroniowej + wysokie OB (GCA)'],
      keyRule: 'Przed rozpoznaniem migreny lub napięciowego bólu głowy wyklucz wszystkie czerwone flagi SNOOP.',
      branches: [
        { mod: '7', name: 'Pierwotne bóle głowy i neuralgia V', clue: 'Migrena z/bez aury, klasterowy ból (TAC), karbamazepina w neuralgii V', atlas: 'bole', sec: 'migrena', linkText: 'Migrena i TAC' },
        { mod: '2', name: 'SAH i zakrzepica zatok (CVST)', clue: 'TK głowy, a po >6 h punkt lędźwiowy (ksantochromia) + angio-TK', atlas: 'udar', sec: 'sah', linkText: 'SAH i zatoki' },
        { mod: '1', name: 'ZOMR i ropień mózgu', clue: 'Antybiotyk + deksametazon przed TK przy gorączce i ognisku', atlas: 'nagle', sec: 'zomr', linkText: 'Neuroinfekcje' }
      ],
      trap: { type: 'test', badge: 'Wskazówka PUM', title: 'Neuralgia n. V vs klasterowy ból głowy', desc: 'Neuralgia V daje sekundowe wyładowania „prądu” w V2/V3 wyzwalane dotykiem/żuciem; ból klasterowy trwa 15–180 min wokół oka z łzawieniem i pobudzeniem.' },
      examTip: 'W neuralgii nerwu V lekiem pierwszego rzutu jest karbamazepina (lub okskarbazepina), nie tryptan ani NLPZ.'
    },
    {
      id: 's5', name: 'Napad drgawkowy i zaburzenia napadowe', icon: '⚡', tag: 'ILAE / SE', mods: ['4', '1', '3'],
      redFlags: ['Drgawki >5 minut (stan padaczkowy t1)', 'Brak powrotu świadomości między napadami', 'Pierwszy napad u dorosłego (wyklucz guz, udar, zaburzenia elektrolitowe)', 'Ciąża / wiek rozrodczy przy doborze LPP'],
      keyRule: 'Pojedynczy nieprowokowany napad z prawidłowym EEG i MRI nie zawsze oznacza rozpoznanie padaczki — kluczowe jest ryzyko nawrotu ≥60% w 10 lat.',
      branches: [
        { mod: '4', name: 'Klasyfikacja ILAE i dobór LPP', clue: 'Napady ogniskowe (karbamazepina/lamotrygina/lewetyracetam) vs uogólnione', atlas: 'padaczka', sec: 'leczenie', linkText: 'Farmakoterapia padaczki' },
        { mod: '4', name: 'Stan padaczkowy (SE)', clue: '0–5 min stabilizacja, 5–20 min BZD, 20–40 min lewetyracetam/walproinian/fosfenytoina', atlas: 'padaczka', sec: 'status', linkText: 'Algorytm SE' },
        { mod: '13', name: 'Napad objawowy w guzie lub udarze', clue: 'Pierwszy napad >40 r.ż. wymaga pilnego obrazowania OUN', atlas: 'guzy', sec: 'lokalizacja', linkText: 'Guzy OUN' }
      ],
      trap: { type: 'test', badge: 'Pułapka kliniczna', title: 'Prawidłowe spoczynkowe EEG', desc: 'Prawidłowe pojedyncze międzynapadowe EEG nie wyklucza padaczki (czułość ok. 30–50% bez aktywacji/wielokrotnych zapisów).' },
      examTip: 'Unikaj kwasu walproinowego u kobiet w wieku rozrodczym z uwagi na wysoką teratogenność.'
    },
    {
      id: 's6', name: 'Postępujący niedowład wiotki i męczliwość', icon: '🪫', tag: 'Obwód i złącze', mods: ['10', '11', '14'],
      redFlags: ['Niewydolność oddechowa (spadek FVC, słaby kaszel)', 'Dysfagia i mowa nosowa (zajęcie opuszki)', 'Szybko wstępujący niedowład z arefleksją po infekcji (GBS)', 'Zmienność dobowa i opadanie powiek (miastenia)'],
      keyRule: 'W ostrym niedowładzie opuszki lub kończyn monitoruj pojemność życiową (FVC) i wydolność oddechową częściej niż samą saturację SpO2!',
      branches: [
        { mod: '10', name: 'Zespół Guillaina-Barrégo (GBS)', clue: 'Arefleksja, parestezje, rozszczepienie białkowo-komórkowe → IVIG lub PLEX', atlas: 'obwodowy', sec: 'gbs', linkText: 'GBS i CIDP' },
        { mod: '11', name: 'Miastenia gravis i LEMS', clue: 'Nużliwość w MG (przeciwciała AChR/MuSK) vs poprawa po wysiłku w LEMS (VGCC)', atlas: 'obwodowy', sec: 'lems', linkText: 'LEMS i przełomy' },
        { mod: '14', name: 'SLA (stadium wczesne)', clue: 'Fascykulacje i zaniki z wygórowanymi odruchami bez zaburzeń czucia', atlas: 'zwyrodnienia', sec: 'sla', linkText: 'SLA (UMN + LMN)' }
      ],
      trap: { type: 'bedside', badge: 'Pułapka lekowa', title: 'Sterydy w GBS vs miastenii', desc: 'W przeciwieństwie do CIDP i miastenii, w ostrym GBS glikokortykosteroidy są NIESKUTECZNE — stosuje się wyłącznie IVIG lub plazmaferezę.' },
      examTip: 'Zespół LEMS w >50% przypadków ma podłoże paraneoplastyczne (drobnokomórkowy rak płuca).'
    },
    {
      id: 's7', name: 'Ataksja, zawroty głowy i zaburzenia chodu', icon: '🌀', tag: 'Móżdżek / B12 / PD', mods: ['5', '14', '15'],
      redFlags: ['Nagły zawrót z objawami pniowymi (HINTS wskazujący na ośrodkowy — udar PICA/AICA)', 'Wczesne upadki do tyłu i ograniczenie spojrzenia w dół (PSP)', 'Chód magnetyczny + nietrzymanie moczu + otępienie (triada Hakima)', 'Zanik czucia wibracji z pogorszeniem w ciemności (B12)'],
      keyRule: 'Zawsze oceń, czy chory traci równowagę już przy otwartych oczach (móżdżek), czy dopiero po zamknięciu oczu (sznury tylne).',
      branches: [
        { mod: '5', name: 'Móżdżek vs sznury tylne', clue: 'Dysmetria i dysdiadochokineza vs próba Romberga i wibracja', atlas: 'badanie', sec: 'ataksja', linkText: 'Móżdżek vs sznury' },
        { mod: '14', name: 'Choroba Parkinsona i atypowe', clue: 'Chód drobnymi kroczkami, sztywność, bradykinezja, brak współruchów', atlas: 'zwyrodnienia', sec: 'parkinson', linkText: 'Choroba Parkinsona' },
        { mod: '15', name: 'Wodogłowie normotensyjne (NPH)', clue: 'Odwracalna przyczyna zaburzeń chodu i otępienia — poszerzenie komór (Evans >0,3)', atlas: 'zwyrodnienia', sec: 'testy', linkText: 'Odwracalne otępienia' }
      ],
      trap: { type: 'test', badge: 'Pułapka HINTS', title: 'Test HINTS w ostrym zespole przedsionkowym', desc: 'Prawidłowy odruch przedsionkowo-oczny (brak sakkady korekcyjnej w teście pchnięcia głowy) u pacjenta z ostrym zawrotem głowy i oczopląsem przemawia za UDARMEM OŚRODKOWYM, nie zapaleniem błędnika!' },
      examTip: 'W zapaleniu neuronu przedsionkowego odruch pchnięcia głowy jest nieprawidłowy (sakkada korekcyjna), a oczopląs jest jednokierunkowy.'
    },
    {
      id: 's8', name: 'Ból kręgosłupa z niedowładem lub objawami zwieraczy', icon: '🦴', tag: 'Ogon koński', mods: ['8', '13', '5'],
      redFlags: ['Znieczulenie okolicy krocza i pośladków („spodenki jeździeckie”)', 'Zatrzymanie moczu lub nietrzymanie stolca', 'Postępujące opadanie stopy (L5) lub osłabienie zgięcia podeszwowego (S1)', 'Ból nocny u chorego onkologicznego (przerzut do kręgosłupa)'],
      keyRule: 'Każdy ból krzyża ze świeżym zaburzeniem zwieraczy lub niedowładem ruchowym kończyn wymaga pilnego MRI kręgosłupa, nigdy tylko leczenia przeciwbólowego.',
      branches: [
        { mod: '8', name: 'Rwa kulszowa (L5 vs S1) i barkowa', clue: 'L5: osłabienie prostowania palucha/stopy; S1: brak odruchu skokowego', atlas: 'bole', sec: 'kregoslup', linkText: 'Bóle barku i krzyża' },
        { mod: '8', name: 'Zespół ogona końskiego (CES)', clue: 'Spodenki jeździeckie + pęcherz → pilna dekompresja neurochirurgiczna', atlas: 'bole', sec: 'ogon', linkText: 'Zespół ogona końskiego' },
        { mod: '13', name: 'Guzy i przerzuty do rdzenia', clue: 'Kompresja zewnątrzoponowa: pilny deksametazon + MRI całego kręgosłupa', atlas: 'guzy', sec: 'rdzen', linkText: 'Guzy rdzenia' }
      ],
      trap: { type: 'test', badge: 'Topografia korzeni', title: 'Odruch kolanowy vs skokowy', desc: 'Przepuklina L4–L5 uciska zwykle korzeń L5 (brak zaburzeń odruchów, opadanie stopy/palucha), a L5–S1 uciska S1 (zniesienie odruchu skokowego).' },
      examTip: 'W stożku rdzeniowym objawy zwieraczowe występują bardzo wcześnie i symetrycznie; w ogonie końskim dominuje silny asymetryczny ból korzeniowy.'
    }
  ];

  const NEURO_EXAM_PROTOCOL = {
    syllabusMeta: {
      institution: 'Pomorski Uniwersytet Medyczny w Szczecinie',
      unit: 'Klinika Neurologii PUM',
      subject: 'Neurologia',
      academicYear: '2026/2027',
      yearOfStudy: 'V rok · kierunek lekarski',
      ects: 6,
      hours: { total: 85, lectures: 5, seminars: 20, exercises: 60, selfStudy: 90, studentWorkload: 175 },
      examFormat: 'Egzamin końcowy testowy (ET)',
      head: 'dr hab. n. med. Marta Masztalewicz',
      coordinator: 'dr hab. n. med. Monika Gołąb-Janowska',
      url: 'https://www.pum.edu.pl/studenci/informacje_z_jednostek/wm/klinika_neurologii/',
      learningOutcomes: [
        'W01–W03 (E.W1, E.W13, E.W14): epidemiologia, zespoły objawowe oraz diagnostyka i leczenie chorób układu nerwowego',
        'U01–U14 (E.U1, E.U3, E.U7, E.U12–E.U38): wywiad, badanie neurologiczne U02, ocena przytomności, stany zagrożenia życia, interpretacja PMR',
        'K01–K04: postawa lekarska, dobro chorego i komunikacja z pacjentem neurologicznym'
      ]
    },
    lectures: [
      { code: 'TK01', title: 'Stany nagłe w neurologii', hours: 1, outcomes: 'W01–W03, U06', mods: ['1', '2', '4'] },
      { code: 'TK02', title: 'Zaburzenia przytomności i świadomości', hours: 1, outcomes: 'W01–W03, U03, U05, U07', mods: ['3'] },
      { code: 'TK03', title: 'Bóle barku i bóle krzyża', hours: 1, outcomes: 'W01–W03, U04, U08', mods: ['8'] },
      { code: 'TK04', title: 'Zespoły neurologiczne w chorobach wewnętrznych', hours: 1, outcomes: 'W01–W03, U04, U08, U13', mods: ['12'] },
      { code: 'TK05', title: 'Badania dodatkowe w neurologii', hours: 1, outcomes: 'U04, U08', mods: ['16'] }
    ],
    seminars: [
      { code: 'TK01', title: 'Neurofizjologia w zarysie', hours: 1, outcomes: 'W02, U04', mods: ['5'] },
      { code: 'TK02', title: 'Choroby ośrodkowego układu nerwowego o podłożu autoimmunologicznym', hours: 2, outcomes: 'W01–W03, U04, U06, U08, U09', mods: ['9'] },
      { code: 'TK03', title: 'Choroby obwodowego układu nerwowego o podłożu autoimmunologicznym', hours: 2, outcomes: 'W01–W03, U04, U06, U08, U09', mods: ['10'] },
      { code: 'TK04', title: 'Padaczka', hours: 2, outcomes: 'W01–W03, U04, U06, U08, U09', mods: ['4'] },
      { code: 'TK05', title: 'Guzy ośrodkowego układu nerwowego', hours: 2, outcomes: 'W01–W03, U04, U08, U09', mods: ['13'] },
      { code: 'TK06', title: 'Choroby zwyrodnieniowe OUN', hours: 2, outcomes: 'W01–W03, U04, U08', mods: ['14'] },
      { code: 'TK07', title: 'Choroby układu nerwowego przebiegające z otępieniem', hours: 2, outcomes: 'W01–W03, U04, U08', mods: ['15'] },
      { code: 'TK08', title: 'Choroby obwodowego układu nerwowego', hours: 2, outcomes: 'W01–W03, U04, U08, U09', mods: ['10'] },
      { code: 'TK09', title: 'Choroby złącza nerwowo-mięśniowego i mięśni', hours: 2, outcomes: 'W01–W03, U04, U08, U09', mods: ['11'] },
      { code: 'TK10', title: 'Nerwy czaszkowe', hours: 2, outcomes: 'W02, U04, U08', mods: ['6'] },
      { code: 'TK11', title: 'Bóle głowy', hours: 1, outcomes: 'W03, U04, U08', mods: ['7'] }
    ],
    exercises: [
      { code: 'TK01', title: 'Badanie neurologiczne w praktyce, technika, prawidłowy stan neurologiczny', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['5'] },
      { code: 'TK02', title: 'Pacjent w stanie nagłym', hours: 5, outcomes: 'U01–U05, K01–K04', mods: ['1'] },
      { code: 'TK03', title: 'Chory z zaburzeniem świadomości, przytomności', hours: 5, outcomes: 'U01–U05, K01–K04', mods: ['3'] },
      { code: 'TK04', title: 'Chory z bólem barku, krzyża', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['8'] },
      { code: 'TK05', title: 'Chory ze stwardnieniem rozsianym', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['9'] },
      { code: 'TK06', title: 'Chory po napadzie drgawkowym', hours: 5, outcomes: 'U01–U05, K01–K04', mods: ['4'] },
      { code: 'TK07', title: 'Chory z udarem mózgu', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['2'] },
      { code: 'TK08', title: 'Chory z zaburzeniami mowy; ocena i różnicowanie', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['6'] },
      { code: 'TK09', title: 'Chory z guzem ośrodkowego układu nerwowego (mózg, rdzeń kręgowy)', hours: 5, outcomes: 'U01–U05, K01–K04', mods: ['13'] },
      { code: 'TK10', title: 'Chory z polineuropatią', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['10'] },
      { code: 'TK11', title: 'Chory z miastenią', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['11'] },
      { code: 'TK12', title: 'Chory z bólem głowy', hours: 5, outcomes: 'U01–U04, K01–K04', mods: ['7'] }
    ],
    literature: [
      { role: 'Podstawowa', citation: 'Kompendium Neurologii, red. Ryszard Podemski, Via Medica, Wyd. IV, Gdańsk 2019' },
      { role: 'Uzupełniająca', citation: 'Badanie neurologiczne – to proste, G. Fuller, PZWL, Wyd. V, 2022' },
      { role: 'Uzupełniająca', citation: 'Neurologia Tom I, II, III, A. Stępień, Medical Tribune Polska, Wyd. II, 2022' },
      { role: 'Uzupełniająca', citation: 'Neurologia. Podręcznik dla studentów medycyny, W. Kozubski, P. Liberski [red.], PZWL, Warszawa, Wyd. 2, 2021' }
    ],
    cranialNerves: [
      { num: 'I', name: 'Węchowy (n. olfactorius)', category: 'czuciowy', exit: 'Blaszka sitowa kości sitowej', test: 'Rozpoznawanie łagodnych zapachów (kawa, mięta) każdym otworem nosowym osobno (nie amoniak — drażni V!)', lesionSigns: 'Hiposmia/anosmia jednostronna lub obustronna', examTrap: 'Zespół Foster-Kennedy’ego (guz rynienki węchowej): anosmia i zanik tarczy n. II po stronie guza + obrzęk tarczy po stronie przeciwnej.' },
      { num: 'II', name: 'Wzrokowy (n. opticus)', category: 'czuciowy', exit: 'Kanał wzrokowy', test: 'Ostrość wzroku (Snellen), pole widzenia konfrontacyjne, badanie dna oka, dośrodkowa odruchu źrenicznego', lesionSigns: 'Ślepota oka, niedowidzenie dwuskroniowe (skrzyżowanie), jednoimienne połowicze (pasmo/promienistość), RAPD (Marcus-Gunn)', examTrap: 'W zespole szczytu oczodołu dołącza n. II do porażenia III, IV, VI + V1 (w szczelinie oczodołowej górnej wzrok jest zachowany).' },
      { num: 'III', name: 'Okoruchowy (n. oculomotorius)', category: 'ruchowy + przywspółczulny', exit: 'Szczelina oczodołowa górna', test: 'Ruchy gałki w górę, dół, przyśrodkowo; unoszenie powieki górnej; bezpośrednia/konsensualna reakcja źrenicy na światło', lesionSigns: 'Ptoza, gałka „w dół i na zewnątrz”, poszerzona sztywna źrenica (mydriasis)', examTrap: 'Uszkodzenie uciskowe (tętniak PComA, wgłobienie) najpierw poszerza źrenicę (włókna powierzchowne); niedokrwienne w cukrzycy zwykle ją oszczędza!' },
      { num: 'IV', name: 'Bloczkowy (n. trochlearis)', category: 'ruchowy', exit: 'Szczelina oczodołowa górna', test: 'Patrzenie w dół przy przywiedzeniu gałki (mięsień skośny górny); test pochylania głowy Bielschowsky’ego', lesionSigns: 'Diplopia pionowo-skośna przy czytaniu i schodzeniu po schodach; wyrównawcze przechylenie głowy na zdrowy bark', examTrap: 'Jedyny nerw czaszkowy wychodzący po stronie grzbietowej pnia mózgu i całkowicie skrzyżowany.' },
      { num: 'V', name: 'Trójdzielny (n. trigeminus)', category: 'mieszany', exit: 'V1 szczelina oczodołowa górna · V2 otwór okrągły · V3 otwór owalny', test: 'Czucie dotyku/bólu w V1–V3, odruch rogówkowy (dośrodkowa V1, odśrodkowa VII), zaciskanie żwaczy i odwodzenie żuchwy (V3)', lesionSigns: 'Niedoczulica połowy twarzy, zanik żwaczy i zbaczanie żuchwy w stronę chorą, neuralgia V2/V3', examTrap: 'Ośrodkowe zaburzenia czucia na twarzy mają układ „łupinek cebuli” (jądro rdzeniowe V), obwodowe odpowiadają gałęziom V1/V2/V3.' },
      { num: 'VI', name: 'Odwodzący (n. abducens)', category: 'ruchowy', exit: 'Szczelina oczodołowa górna', test: 'Odwodzenie gałki ocznej na zewnątrz (mięsień prosty boczny)', lesionSigns: 'Zez zbieżny, poziome podwójne widzenie nasilające się przy patrzeniu w stronę porażoną', examTrap: 'Długi przebieg pod oponą czyni go najczęstszym „objawem rzekomego umiejscowienia” przy wzmożonym ICP (jedno- lub obustronne porażenie VI).' },
      { num: 'VII', name: 'Twarzowy (n. facialis)', category: 'mieszany + przywspółczulny', exit: 'Przewód słuchowy wewnętrzny → kanał VII → otwór rylcowo-sutkowy', test: 'Marszczenie czoła, zaciskanie powiek, wyszczerzenie zębów, nadymanie policzków, smak na 2/3 przednich języka', lesionSigns: 'Obwodowe: porażenie czoła + oka (objaw Bella) + ust; ośrodkowe: tylko dolne 2/3 twarzy po stronie przeciwnej', examTrap: 'Wskazówka PUM #3: Zawsze sprawdź marszczenie czoła — zaoszczędzone górne piętro oznacza udar lub guz nadjądrowy!' },
      { num: 'VIII', name: 'Przedsionkowo-ślimakowy (n. vestibulocochlearis)', category: 'czuciowy', exit: 'Przewód słuchowy wewnętrzny', test: 'Słuch (szept, próby Webera i Rinnego), równowaga i oczopląs, test pchnięcia głowy (HIT)', lesionSigns: 'Niedosłuch odbiorczy, szumy uszne, zawroty głowy układowe i oczopląs', examTrap: 'Jednostronny niedosłuch + ubytek czucia V + porażenie VII + ataksja = zespół kąta mostowo-móżdżkowego (osłoniak).' },
      { num: 'IX', name: 'Językowo-gardłowy (n. glossopharyngeus)', category: 'mieszany', exit: 'Otwór szyjny', test: 'Czucie tylnej ściany gardła (dośrodkowa odruchu gardłowego), smak z 1/3 tylnej języka', lesionSigns: 'Osłabienie odruchu gardłowego, łagodna dysfagia, neuralgia gardłowo-uszna', examTrap: 'Razem z X i XI tworzy zespół otworu szyjnego (Verneta).' },
      { num: 'X', name: 'Błędny (n. vagus)', category: 'mieszany + przywspółczulny', exit: 'Otwór szyjny', test: 'Unoszenie łuków podniebiennych („aaa”), położenie języczka, odruch gardłowy (odśrodkowa), fonacja i kaszel', lesionSigns: 'Chrypka, dysfagia, mowa nosowa, opadnięcie łuku po stronie chorej, języczek zbacza W STRONĘ ZDROWĄ (objaw firanki Verneta)', examTrap: 'Wskazówka PUM #2: Języczek i ściana gardła przesuwają się na stronę zdrową!' },
      { num: 'XI', name: 'Dodatkowy (n. accessorius)', category: 'ruchowy', exit: 'Otwór szyjny', test: 'Unoszenie barków przeciw oporowi (m. czworoboczny), skręt głowy przeciw oporowi (m. MOS)', lesionSigns: 'Opadnięcie barku po stronie chorej, osłabienie skrętu głowy w stronę ZDROWĄ', examTrap: 'Prawy mięsień MOS obraca głowę w lewo — przy uszkodzeniu prawego n. XI chory słabiej obraca głowę w lewo!' },
      { num: 'XII', name: 'Podjęzykowy (n. hypoglossus)', category: 'ruchowy', exit: 'Kanał nerwu podjęzykowego', test: 'Wysunięcie języka prosto na zewnątrz, ocena zaników i fascykulacji na języku leżącym w jamie ustnej', lesionSigns: 'W uszkodzeniu obwodowym język zbacza W STRONĘ CHORĄ + zanik i fascykulacje tej połowy języka (np. w SLA)', examTrap: 'W uszkodzeniu ośrodkowym nadjądrowym język zbacza zwykle w stronę przeciwną do ogniska (w stronę niedowładu kończyn) i nie ma zaniku.' }
    ],
    u02Checklist: [
      {
        id: 'u02-nerwy', title: '1. Stan przytomności, mowa i nerwy czaszkowe (I–XII)',
        items: [
          { id: 'u-gcs', label: 'Ocena przytomności (GCS) i orientacji auto-/allopsychicznej', norm: 'GCS 15 pkt, pełna orientacja', pathology: 'GCS ≤8 pkt wymaga pilnego zabezpieczenia dróg oddechowych' },
          { id: 'u-mowa', label: 'Ocena mowy: rozumienie, płynność, powtarzanie, nazywanie', norm: 'Mowa płynna, prawidłowe rozumienie i artykulacja', pathology: 'Afazja (kora dominująca) vs dyzartria (zaburzenie artykulacji)' },
          { id: 'u-cn-o', label: 'Nerwy II, III, IV, VI: ostrość, pole, źrenice i ruchy gałek', norm: 'Źrenice równe okrągłe reaktywne, pełne ruchy bez diplopii', pathology: 'Anizokoria, RAPD, porażenie spojrzenia lub izolowane III/IV/VI' },
          { id: 'u-cn-f', label: 'Nerwy V, VII, IX, X, XI, XII: czucie twarzy, czoło vs usta, gardło, język', norm: 'Symetria mimiki (czoło i usta), łuki i język w linii', pathology: 'Ośrodkowy vs obwodowy VII, objaw firanki (X), zbaczanie języka (XII)' }
        ]
      },
      {
        id: 'u02-sila', title: '2. Układ ruchowy: trofika, napięcie i siła (Lovett 0–5)',
        items: [
          { id: 'u-trofika', label: 'Oglądanie mięśni: zaniki, przerosty, fascykulacje', norm: 'Symetryczna masa mięśniowa bez fascykulacji', pathology: 'Zanik i fascykulacje = LMN / SLA' },
          { id: 'u-napiecie', label: 'Napięcie mięśniowe przy ruchach biernych', norm: 'Prawidłowe napięcie mięśniowe symetryczne', pathology: 'Spastyczność (scyzoryk = UMN), sztywność (koło zębate/ołowiana = PD), wiotkość (LMN)' },
          { id: 'u-barre', label: 'Próby opadania (Barrego KG i Mingazziniego KD) + skala Lovetta 0–5', norm: 'Utrzymuje kończyny bez pronacji/opadania, siła 5/5', pathology: 'Opadanie z pronacją = subtelny niedowład piramidowy' }
        ]
      },
      {
        id: 'u02-odruchy-fiz', title: '3. Odruchy fizjologiczne (głębokie i powierzchowne)',
        items: [
          { id: 'u-ref-kg', label: 'Kończyny górne: z m. dwugłowego (C5–C6), promieniowo-ramienny (C6), trójgłowego (C7)', norm: 'Obustronnie równe, żywe (++)', pathology: 'Wygórowane (+++/klonus = UMN) vs zniesione/osłabione (0/+ = LMN/korzeń)' },
          { id: 'u-ref-kd', label: 'Kończyny dolne: kolanowy (L3–L4) i skokowy (S1)', norm: 'Obustronnie równe, żywe (++)', pathology: 'Brak skokowego przy radikulopatii S1 lub polineuropatii' },
          { id: 'u-ref-sk', label: 'Odruchy powierzchowne skórne tułowia (Th7–Th12) i podeszwowy', norm: 'Zachowane symetrycznie, podeszwowy zgięciowy', pathology: 'Zniesienie odruchów skórnych tułowia po stronie uszkodzenia piramidowego (np. w SM)' }
        ]
      },
      {
        id: 'u02-odruchy-pat', title: '4. Odruchy patologiczne i piramidowe',
        items: [
          { id: 'u-babinski', label: 'Objaw Babińskiego (drażnienie bocznej krawędzi podeszwy)', norm: 'Zgięcie podeszwowe palców', pathology: 'Powolne grzbietowe prostowanie palucha + wachlarzowe rozstawienie palców = uszkodzenie drogi piramidowej' },
          { id: 'u-klonus', label: 'Klonus rzepki i stopy oraz objaw Hoffmanna / Rossolimo', norm: 'Brak klonusów i odruchów z grupy Babińskiego', pathology: 'Wyczerpywalny lub niewyczerpywalny klonus potwierdza uszkodzenie UMN' }
        ]
      },
      {
        id: 'u02-czucie', title: '5. Czucie powierzchniowe i głębokie',
        items: [
          { id: 'u-pow', label: 'Czucie dotyku, bólu (szpilka jednorazowa) i temperatury — dermatomy i rozkład „rękawiczkowo-skarpetkowy”', norm: 'Symetryczne we wszystkich dermatomach', pathology: 'Połowicze (wzgórze/kora), poziom rdzeniowy (mielopatia), dystalne skarpetkowe (polineuropatia)' },
          { id: 'u-gleb', label: 'Czucie ułożenia palucha/palca i wibracji (kamerton 128 Hz)', norm: 'Prawidłowe rozpoznawanie kierunku ruchu i drgań na kostkach', pathology: 'Utrata wibracji i propriocepcji = sznury tylne (B12, kiła) lub neuropatia grubych włókien' }
        ]
      },
      {
        id: 'u02-zbornosc', title: '6. Próby zborności (móżdżek) i ocena chodu',
        items: [
          { id: 'u-palec', label: 'Próba palec–nos, pięta–kolano i diadochokineza', norm: 'Ruchy płynne, dokładne, bez drżenia zamiarowego', pathology: 'Dysmetria, drżenie zamiarowe, dysdiadochokineza po stronie uszkodzonej półkuli móżdżku' },
          { id: 'u-romberg', label: 'Próba Romberga (z asekuracją!) i próba chodu (zwykły, tandem, pięty/palce)', norm: 'Stabilna postawa z oczami otwartymi i zamkniętymi; chód pewny', pathology: 'Upadek po zamknięciu oczu (sznury tylne) vs niestabilność z oczami otwartymi (móżdżek)' }
        ]
      },
      {
        id: 'u02-opony', title: '7. Objawy oponowe i korzeniowe / kręgosłupowe',
        items: [
          { id: 'u-sztywnosc', label: 'Sztywność karku, objaw Brudzińskiego (karkowy/łonowy) i Kerniga', norm: 'Bródka dotyka mostka bez oporu, brak odruchowego zgięcia kolan', pathology: 'Dodatnie w ZOMR, SAH oraz w zaawansowanym podrażnieniu opon' },
          { id: 'u-lasegue', label: 'Objaw Lasègue’a (L4–S1), Mackiewicza (L2–L4) i ocena czucia krocza', norm: 'Uniesienie wyprostowanej nogi do 70–90° bez bólu korzeniowego', pathology: 'Ból promieniujący do stopy przy <45° = rwa kulszowa; znieczulenie siodłowe + zatrzymanie moczu = ogon koński!' }
        ]
      }
    ]
  };


  return {
    GROUPS,
    MODS,
    ATLASES,
    TRAPS,
    CONF,
    BANKS,
    WIKILINKS,
    SEMANTIC_GAPS,
    SYMPTOM_CLUSTERS,
    NEURO_EXAM_PROTOCOL,
    modById,
    atById
  };
})();
