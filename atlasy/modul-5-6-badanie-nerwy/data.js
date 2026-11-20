/* Bank zadań i tematów modułów [5][6]: Badanie neurologiczne U02, nerwy czaszkowe I–XII i zaburzenia mowy */
window.ATLAS_TOPICS = {
  u02: 'Badanie U02 i UMN/LMN',
  ataksja: 'Móżdżek vs sznury tylne',
  nerwy: 'Nerwy czaszkowe I–XII',
  mowa: 'Afazja i dyzartria'
};

window.ATLAS_Q = [
  {
    t: 'u02',
    mod: '5',
    stem: 'Który zestaw objawów jest najbardziej charakterystyczny dla utrwalonego uszkodzenia dolnego neuronu ruchowego (LMN) w porównaniu z uszkodzeniem górnego neuronu ruchowego (UMN)?',
    o: [
      'wzmożone napięcie typu „scyzoryka”, wygórowane odruchy głębokie i objaw Babińskiego',
      'obniżone napięcie mięśniowe (wiotkość), zanik mięśni, fascykulacje oraz osłabienie lub zniesienie odruchów głębokich',
      'sztywność typu „koła zębatego”, drżenie spoczynkowe i prawidłowe odruchy głębokie',
      'zniesienie odruchów powierzchownych brzusznych, klonus stopy i brak zaników mięśniowych',
      'wygórowane odruchy głębokie przy jednoczesnych fascykulacjach i zachowanym czuciu'
    ],
    k: 1,
    c: 'src',
    s: 'Wskazówka PUM #7 · Sem TK01 / Ćw TK01',
    why: 'Uszkodzenie dolnego neuronu ruchowego (róg przedni rdzenia, jądro ruchowe pnia lub włókno nerwu obwodowego) przerywa ramię odśrodkowe łuku odruchowego, co skutkuje wiotkością, wczesnym zanikiem neurogennym, fascykulacjami i hipo-/arefleksją bez objawu Babińskiego. Wygórowane odruchy z klonusem, spastycznością i Babińskim (+) cechują UMN, a opcja E odpowiada zespołowi mieszanemu (SLA).',
    tip: 'Wskazówka PUM #7: UMN = spastyczność + hiperrefleksja + Babiński (+); LMN = wiotkość + zaniki + fascykulacje + arefleksja.',
    gap: {
      pool: 'W pytaniach testowych przyjmuje się schematycznie: UMN = spastyczność, wygórowane odruchy i Babiński (+), a LMN = wiotkość, zaniki, fascykulacje i zniesione odruchy.',
      now: 'W praktyce klinicznej w pierwszych godzinach/dniach ostrego rozległego udaru lub urazu rdzenia (faza szoku mózgowego/rdzeniowego) świeże uszkodzenie UMN przebiega przejściowo z wiotkością i zniesieniem odruchów, zanim rozwinie się spastyczność.'
    }
  },
  {
    t: 'ataksja',
    mod: '5',
    stem: '64-letni chory po częściowej resekcji żołądka zgłasza mrowienia stóp oraz gwałtowne tracenie równowagi podczas mycia twarzy i zamykania oczu pod prysznicem. W badaniu przy oczach otwartych stoi stabilnie, nie ma dysmetrii ani oczopląsu, natomiast w próbie Romberga po zamknięciu oczu natychmiast chwieje się i upada; na kostkach nie odczuwa wibracji kamertonu 128 Hz. Która struktura jest uszkodzona?',
    o: [
      'prawa półkula móżdżku',
      'robak móżdżku',
      'sznury tylne rdzenia kręgowego (ataksja czuciowa)',
      'droga korowo-rdzeniowa w odcinku lędźwiowym'
    ],
    k: 2,
    c: 'src',
    s: 'Wskazówka PUM #10 · Podemski / Fuller U02',
    why: 'Pacjent z uszkodzeniem sznurów tylnych (pęczki smukły i klinowaty) kompensuje ubytek propriocepcji wzrokiem — stoi stabilnie z otwartymi oczami i traci równowagę dopiero po ich zamknięciu (próba Romberga wybitnie dodatnia), z jednoczesnym zniesieniem czucia wibracji i ułożenia. W zespole móżdżkowym chory chwieje się już przy oczach otwartych.',
    tip: 'Wskazówka PUM #10: Dodatnia próba Romberga nie jest swoista dla móżdżku — bada sznury tylne (B12, kiła) oraz narząd przedsionkowy.',
    gap: {
      pool: 'Klucz testowy z Wskazówki #10: próba Romberga (+) i utrata czucia wibracji różnicują zwyrodnienie sznurów tylnych od zespołu móżdżkowego.',
      now: 'W niedoborze witaminy B12 (zwyrodnienie powrózkowe rdzenia) zajęciu sznurów tylnych często towarzyszy uszkodzenie sznurów bocznych (Babiński +) oraz polineuropatia (zniesione odruchy skokowe); nigdy nie podawaj samego kwasu foliowego bez wyrównania B12.'
    }
  },
  {
    t: 'nerwy',
    mod: '6',
    stem: 'U pacjenta stwierdzono całkowite opadnięcie prawej powieki górnej (ptoza), ustawienie prawej gałki ocznej „w dół i na zewnątrz” oraz poszerzoną, niereagującą na światło prawą źrenicę. Który nerw czaszkowy uległ uszkodzeniu?',
    o: [
      'prawy nerw odwodzący (VI)',
      'prawy nerw bloczkowy (IV)',
      'prawy nerw okoruchowy (III)',
      'prawa gałąź oczna nerwu trójdzielnego (V1)'
    ],
    k: 2,
    c: 'src',
    s: 'Wskazówka PUM #1 · Sem TK10',
    why: 'Nerw III unerwia mięśnie prosty górny, dolny, przyśrodkowy, skośny dolny, dźwigacz powieki górnej oraz włókna przywspółczulne zwieracza źrenicy. Jego porażenie pozostawia niezrównoważone działanie m. prostego bocznego (VI) i skośnego górnego (IV), ustawiając oko „w dół i na zewnątrz”, z ptozą i szeroką źrenicą.',
    tip: 'Wskazówka PUM #1: III = ptoza + oko w dół i na zewnątrz + szeroka źrenica; IV = diplopia przy schodzeniu po schodach; VI = zez zbieżny.',
    gap: {
      pool: 'W klasycznym opisie testowym porażenie n. III daje łącznie ptozę, ustawienie gałki w dół i na zewnątrz oraz poszerzoną sztywną źrenicę.',
      now: 'Klinicznie (ESO/AAN) bolesne porażenie n. III z poszerzoną źrenicą jest alarmem ucisku przez tętniak tętnicy łączącej tylnej (pilne angio-TK/MR) lub wgłobienie; natomiast mikronaczyniowe porażenie n. III w cukrzycy zazwyczaj oszczędza źrenicę.'
    }
  },
  {
    t: 'nerwy',
    mod: '6',
    stem: 'Chory zgłosił się z całkowitym zniesieniem ruchów lewej gałki ocznej (porażenie nerwów III, IV i VI), ptozą, poszerzoną lewą źrenicą oraz brakiem czucia na lewym czole i zniesieniem lewego odruchu rogówkowego. Ostrość wzroku i dno oka lewego są prawidłowe. Który zespół rozpoznasz?',
    o: [
      'zespół szczeliny oczodołowej górnej',
      'zespół szczytu oczodołu',
      'zespół Wallenberga (boczny opuszki)',
      'zespół kąta mostowo-móżdżkowego',
      'zespół Fostera-Kennedy’ego'
    ],
    k: 0,
    c: 'src',
    s: 'Wskazówka PUM #4 · Sem TK10',
    why: 'Przez szczelinę oczodołową górną przechodzą nerwy III, IV, VI oraz gałąź oczna nerwu V (V1 — czucie czoła i ramię dośrodkowe odruchu rogówkowego). Nerw wzrokowy (II) biegnie oddzielnie przez kanał wzrokowy, dlatego jego zaoszczędzenie różnicuje zespół szczeliny oczodołowej górnej od zespołu szczytu oczodołu.',
    tip: 'Wskazówka PUM #4: Szczelina oczodołowa górna = III, IV, VI + V1 (bez II). Gdy dołącza ślepota/RAPD (n. II) → szczyt oczodołu.'
  },
  {
    t: 'nerwy',
    mod: '6',
    stem: '70-letni mężczyzna trafił na SOR z nagłym wygładzeniem prawego fałdu nosowo-wargowego i opadnięciem prawego kącika ust. Podczas badania potrafi jednak symetrycznie zmarszczyć czoło i mocno zacisnąć obie powieki, a w prawej kończynie górnej stwierdza się spadek siły do 4/5. Jak zlokalizujesz uszkodzenie nerwu VII?',
    o: [
      'obwodowe porażenie prawego nerwu VII (porażenie Bella)',
      'uszkodzenie jądra nerwu VII w prawym moście',
      'ośrodkowe (nadjądrowe) uszkodzenie drogi korowo-jądrowej w lewej półkuli mózgu',
      'uszkodzenie nerwu VII w przewodzie słuchowym wewnętrznym po prawej'
    ],
    k: 2,
    c: 'src',
    s: 'Wskazówka PUM #3 · Sem TK10',
    why: 'Górne piętro twarzy (m. czołowy i okrężny oka) ma obustronne unerwienie korowe, dlatego w uszkodzeniu ośrodkowym (nadjądrowym) zostaje zaoszczędzone. Niedowład obejmuje dolne 2/3 twarzy po stronie przeciwnej do ogniska w lewej półkuli (współistnieje tu z prawostronnym niedowładem kończyny górnej w unaczynieniu lewej MCA).',
    tip: 'Wskazówka PUM #3: Zawsze poleć choremu zmarszczyć czoło i zacisnąć powieki — zaoszczędzone czoło wyklucza porażenie Bella.'
  },
  {
    t: 'nerwy',
    mod: '6',
    stem: 'Podczas badania gardła u chorego z chrypką i dysfagią przy fonacji głoski „aaa” stwierdzono opadnięcie prawego łuku podniebiennego oraz przesunięcie języczka i tylnej ściany gardła w stronę lewą (objaw firanki Verneta). Język wysuwa się prosto, bez zaniku. Uszkodzenie których nerwów odpowiada za ten obraz?',
    o: [
      'lewych nerwów IX i X',
      'prawego nerwu podjęzykowego (XII)',
      'lewego nerwu podjęzykowego (XII)',
      'prawych nerwów językowo-gardłowego (IX) i błędnego (X)'
    ],
    k: 3,
    c: 'src',
    s: 'Wskazówka PUM #2 · Sem TK10',
    why: 'W niedowładzie podniebienia i ściany gardła (IX, X) porażone mięśnie strony prawej są wiotkie, dlatego zdrowa strona lewa pociąga języczek oraz tylną ścianę gardła w stronę ZDROWĄ (w lewo). W uszkodzeniu nerwu XII wysunięty język zbaczałby odwrotnie — w stronę CHORĄ.',
    tip: 'Wskazówka PUM #2: Języczek (n. X) ucieka w stronę ZDROWĄ; język (n. XII) zbacza w stronę CHORĄ.'
  },
  {
    t: 'mowa',
    mod: '6',
    stem: 'U praworęcznego pacjenta po udarze mowa spontaniczna jest płynna i wielomówna, ale zawiera liczne parafazje głoskowe oraz neologizmy. Chory nie rozumie poleceń słownych, nie potrafi powtarzać wypowiadanych przez badającego słów i nie ma niedowładu kończyn. Jaki typ zaburzenia mowy występuje u tego pacjenta?',
    o: [
      'afazja ruchowa (Broca)',
      'afazja czuciowa (Wernickego)',
      'afazja przewodzenia (kondukcyjna)',
      'dyzartria móżdżkowa (mowa skandowana)',
      'afazja globalna'
    ],
    k: 1,
    c: 'inf',
    s: 'Ćw TK08 · Podemski / Stępień',
    why: 'Płynna mowa z parafazjami i neologizmami przy głębokim zaburzeniu rozumienia oraz powtarzania i braku niedowładu ruchowego odpowiada afazji czuciowej (Wernickego, tylna część lewego zakrętu skroniowego górnego). W afazji przewodzenia rozumienie jest zachowane, w afazji Broca mowa jest niepłynna przy zachowanym rozumieniu, a w dyzartrii zachowane jest rozumienie i struktura języka.',
    tip: 'Schemat przy łóżku: Broca = niepłynna + rozumie; Wernicke = płynna + nie rozumie; Przewodzenia = płynna + rozumie + nie powtarza.'
  }
];
