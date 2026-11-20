/* Bank zadań modułów [14][15]: Choroby zwyrodnieniowe OUN (Parkinson, atypowe, SLA) i zespoły otępienne */
/* c: 'src' = potwierdzone wytycznymi/sylabusem, 'inf' = wnioskowane, 'did' = dydaktyczne PUM, 'unk' = niepewne */
window.ATLAS_TOPICS = {
  parkinson: 'Parkinson i atypowe',
  sla: 'SLA (UMN + LMN)',
  otepienia: 'Otępienia (AD/FTD/VaD/DLB)',
  testy: 'Skale i odwracalne (NPH)'
};

window.ATLAS_Q = [
  {
    t: 'parkinson',
    mod: '14',
    stem: '63-letni mężczyzna zgłasza stopniowo narastające od 8 miesięcy spowolnienie ruchowe prawej ręki, trudność z zapinaniem guzików, ściszenie mowy (hipofonia) oraz spoczynkowe drżenie palców prawej dłoni o charakterze „liczenia pieniędzy”, które zmniejsza się przy sięganiu po kubek. W badaniu stwierdzono bradykinezję i wzmożenie napięcia mięśniowego typu koła zębatego po stronie prawej, odruchy głębokie symetryczne, próba pociągnięcia prawidłowa. Który zestaw jest najbardziej charakterystyczny dla rozpoznania oraz leczenia I rzutu?',
    o: [
      'Drżenie spoczynkowe jest warunkiem koniecznym rozpoznania; lekiem z wyboru jest haloperidol w małej dawce',
      'Warunkiem koniecznym rozpoznania jest bradykinezja z min. jednym objawem osiowym (sztywność typu koła zębatego lub drżenie spoczynkowe 4–6 Hz); podstawowym lekiem objawowym jest lewodopa z inhibitorem dekarboksylazy',
      'Rozpoznanie wymaga wczesnych upadków do tyłu w 1. roku choroby oraz pionowego porażenia spojrzenia w dół',
      'Podstawą leczenia przyczynowego jest ryluzol 2×50 mg oraz natychmiastowe odstawienie białek w diecie',
      'Rozpoznanie stawia się wyłącznie po stwierdzeniu objawu Babińskiego i zaniku mięśni kłębu ręki'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03d · Sem TK06 · Wskazówka #8 · Podemski',
    why: 'Zgodnie z Wskazówką egzaminacyjną PUM #8 i kryteriami MDS chorobę Parkinsona rozpoznaje się na podstawie obecności bradykinezji (warunek konieczny!) oraz co najmniej jednego z objawów: sztywności mięśniowej („koło zębate” / „ołowiana rura”) lub drżenia spoczynkowego 4–6 Hz ustępującego przy ruchu celowym. Złotym standardem leczenia objawowego, dającym wyraźną poprawę (test z lewodopą), jest lewodopa z inhibitorem dekarboksylazy (benserazyd lub karbidopa), przyjmowana 30–60 min przed posiłkiem.',
    tip: 'Wskazówka PUM #8: Bradykinezja to warunek konieczny PD; asymetryczny początek i wybitna poprawa po lewodopie różnicują idiopatyczną PD od parkinsonizmów atypowych.',
    gap: {
      pool: 'W starszych materiałach dydaktycznych u młodszych chorych (<65 r.ż.) zalecano rutynowe opóźnianie włączenia lewodopy na rzecz agonistów dopaminy lub inhibitorów MAO-B, aby odwlec wystąpienie dyskinez.',
      now: 'Aktualne wytyczne MDS/EAN podkreślają, że nie należy wstrzymywać lewodopy u chorych z objawami upośledzającymi funkcjonowanie niezależnie od wieku — jest najskuteczniejsza, a ryzyko dyskinez zależy głównie od czasu trwania choroby i pulsacyjnej stymulacji, nie samego momentu startu L-dopy.'
    }
  },
  {
    t: 'parkinson',
    mod: '14',
    stem: '68-letnia kobieta od 10 miesięcy ma szybko postępujące zaburzenia równowagi z wielokrotnymi upadkami do tyłu, symetryczną sztywność osiową tułowia i szyi (retrocollis), niewyraźną mowę oraz brak poprawy po zwiększaniu dawki lewodopy do 1000 mg/dobę. W badaniu stwierdzono niemal całkowite zniesienie ruchów gałek ocznych w płaszczyźnie pionowej (zwłaszcza patrzenia w dół) i „zdziwiony” wyraz twarzy, a w MRI mózgu zanik nakrywki śródmózgowia (objaw kolibra). Najbardziej prawdopodobne rozpoznanie to:',
    o: [
      'Idiopatyczna choroba Parkinsona',
      'Zanik wieloukładowy (MSA)',
      'Postępujące porażenie nadjądrowe (PSP)',
      'Zwyrodnienie korowo-podstawne (CBD)',
      'Wodogłowie normotensyjne (NPH)'
    ],
    k: 2,
    c: 'src',
    s: 'Sylabus PUM W03d · Sem TK06 · Stępień · Kozubski',
    why: 'Wczesne upadki do tyłu (<1. roku choroby), symetryczny parkinsonizm osiowy z retrocollis, porażenie pionowego spojrzenia (początkowo w dół), brak odpowiedzi na lewodopę oraz zanik śródmózgowia dający w strzałkowym MRI „objaw kolibra” to klasyczny obraz postępującego porażenia nadjądrowego (PSP — taupatia 4R). MSA cechuje wczesna ciężka dysautonomia (hipotonia ortostatyczna, nietrzymanie moczu) i „objaw krzyża w moście”, a CBD — skrajna asymetria ze zjawiskiem obcej ręki.',
    tip: 'Szybkie skojarzenia Parkinson-plus: PSP = upadki do tyłu + spojrzenie w dół + koliber; MSA = ortostaza + zwieracze + krzyż w moście; CBD = asymetria + obca ręka.'
  },
  {
    t: 'sla',
    mod: '14',
    stem: '58-letni mężczyzna zgłasza postępujące od 7 miesięcy osłabienie i wyraźny zanik drobnych mięśni prawej ręki z widocznymi drżeniami pęczkowymi (fascykulacjami) przedramion oraz kurczami łydek, a ostatnio także niewyraźną mowę i trudności w połykaniu. W badaniu neurologicznym stwierdza się zanik mięśni międzykostnych i kłębu ręki, fascykulacje języka, a jednocześnie wygórowane odruchy głębokie w obu kończynach górnych i dolnych z obustronnym objawem Babińskiego. Czucie dotyku, bólu i wibracji oraz funkcja zwieraczy są całkowicie prawidłowe. Które rozpoznanie i lek modyfikujący przebieg choroby są właściwe?',
    o: [
      'Zespół Guillaina-Barrégo; dożylne immunoglobuliny (IVIG)',
      'Stwardnienie zanikowe boczne (SLA); ryluzol 2×50 mg p.o.',
      'Mielopatia szyjna ze zwyrodnienia kręgosłupa; wyłącznie lewodopa',
      'Miastenia gravis (postać opuszkowa); pirydostygmina i tymektomia',
      'Zwyrodnienie powrózkowe rdzenia kręgowego; witamina B12 i.m.'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03d · Wskazówka #9 · Podemski · Stępień',
    why: 'Zgodnie z Wskazówką egzaminacyjną PUM #9 jednoczesne występowanie objawów uszkodzenia dolnego neuronu ruchowego (LMN: zaniki mięśni, fascykulacje na kończynach i języku) oraz górnego neuronu ruchowego (UMN: wygórowane odruchy z zanikłych mięśni, objaw Babińskiego) przy całkowitym zaoszczędzeniu czucia i funkcji zwieraczy jest patognomoniczne dla stwardnienia zanikowego bocznego (SLA). Jedynym klasycznym lekiem doustnym o udowodnionym wydłużeniu przeżycia jest ryluzol (antyglutaminergiczny), obok wczesnej wentylacji nieinwazyjnej (NIV).',
    tip: 'Wskazówka PUM #9: SLA = UMN + LMN (zanik + fascykulacje + wygórowane odruchy/Babiński) BEZ zaburzeń czucia i zwieraczy. Zawsze wyklucz w MRI mielopatię szyjną!',
    gap: {
      pool: 'Tradycyjnie w pytaniach testowych rozpoznanie SLA opiera się na kryteriach El Escorial (pewne, prawdopodobne, możliwe), a jedynym wymienianym lekiem jest ryluzol.',
      now: 'Współczesne wytyczne stosują uproszczone kryteria Gold Coast (UMN+LMN w ≥1 okolicy lub LMN w ≥2 okolicach po wykluczeniu mimików), rutynowo poszukują mutacji (zwłaszcza SOD1 i C9orf72) i dopuszczają terapię celowaną antysensowną (tofersen w SOD1-SLA) oraz edarawon; przeżycie najmocniej wydłuża wczesna NIV i gastrostomia (PEG).'
    }
  },
  {
    t: 'otepienia',
    mod: '15',
    stem: '75-letnia kobieta została przywieziona przez rodzinę z powodu trwającego od 2 lat powolnego, jednostajnego pogarszania się pamięci — powtarza te same pytania po kilku minutach, zapomina niedawnych rozmów, gubi się w nowej okolicy i ma trudności z nazywaniem przedmiotów, natomiast pamięć wydarzeń z młodości jest początkowo zachowana. W badaniu przedmiotowym bez ogniskowego niedowładu, wynik MMSE 20/30 pkt; w MRI uogólniony zanik korowy z wyraźną przewagą w przyśrodkowych częściach płatów skroniowych (hipokampy). Jaki profil biomarkerów w płynie mózgowo-rdzeniowym i jakie leczenie I rzutu odpowiadają temu rozpoznaniu?',
    o: [
      'Podwyższone Aβ42 i obniżone białko tau w PMR; haloperidol i memantyna',
      'Obniżone Aβ42 oraz podwyższone p-tau/t-tau w PMR; inhibitor acetylocholinoesterazy (np. donepezil lub rywastygmina)',
      'Prawidłowy profil PMR; w chorobie Alzheimera leki cholinergiczne są przeciwwskazane',
      'Obniżone białko tau i obecność prążków oligoklonalnych IgG; wysokie dawki metyloprednizolonu',
      'Zwiększone stężenie białka 14-3-3 w PMR charakterystyczne dla otępienia naczyniopochodnego; tylko ASA'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM W03f · Sem TK07 · Podemski · Stępień',
    why: 'Podstępny, powoli postępujący ubytek pamięci epizodycznej (świeżej) z zanikiem przyśrodkowych płatów skroniowych (hipokampów) to typowa choroba Alzheimera (AD). Odkładanie β-amyloidu w płytkach starczych w mózgu powoduje obniżenie stężenia rozpuszczalnego peptydu Aβ42 w PMR (oraz stosunku Aβ42/40), natomiast zwyrodnienie neurofibrylarne uwalnia do PMR hiperfosforylowane tau (↑ p-tau) i całkowite tau (↑ t-tau). W otępieniu lekkim i umiarkowanym lekiem I rzutu są inhibitory acetylocholinoesterazy (donepezil, rywastygmina, galantamina), a w umiarkowanym/ciężkim dołącza się memantynę.',
    tip: 'W chorobie Alzheimera w PMR spada Aβ42 (bo „uwięziony” w płytkach w korze!), a rośnie p-tau i t-tau (bo neurony ulegają rozpadowi).',
    gap: {
      pool: 'Klasycznie w sylabusie i egzaminach wymienia się wyłącznie leczenie objawowe AD: inhibitory AChE (donepezil, rywastygmina, galantamina) oraz antagonistę NMDA (memantyna).',
      now: 'Aktualnie rozpoznanie AD opiera się na kryteriach biologicznych ATN (amyloid-tau-neurodegeneracja: PMR lub PET amyloid/tau), a w wytycznych pojawiły się pierwsze terapie modyfikujące przebieg wczesnej AD — przeciwciała anty-amyloidowe (lekanemab, donanemab), wymagające monitorowania MRI pod kątem powikłań ARIA.'
    }
  },
  {
    t: 'otepienia',
    mod: '15',
    stem: '57-letni dotychczas zdrowy mężczyzna od roku stał się wulgarny, utracił empatię wobec bliskich, podejmuje ryzykowne decyzje finansowe, objada się słodyczami i powtarza stereotypowe gesty. Jednocześnie bez trudu przypomina sobie niedawne wydarzenia rodzinne, orientuje się w czasie i przestrzeni oraz uzyskuje 28/30 pkt w skali MMSE. W MRI głowy widoczny asymetryczny zanik płatów czołowych i przednich części płatów skroniowych. Które rozpoznanie i stwierdzenie terapeutyczne są prawdziwe?',
    o: [
      'Otępienie z ciałami Lewy’ego (DLB); wskazany haloperidol i.m.',
      'Wariant behawioralny otępienia czołowo-skroniowego (bvFTD); inhibitory acetylocholinoesterazy (donepezil) nie przynoszą korzyści i mogą nasilać pobudzenie',
      'Wczesna choroba Alzheimera; wynik MMSE 28/30 wyklucza proces neurozwyrodnieniowy',
      'Otępienie naczyniopochodne (VaD); skala Hachińskiego wynosi zwykle <4 pkt',
      'Depresja rzekomootępienna; konieczne natychmiastowe podanie rysperydonu'
    ],
    k: 1,
    c: 'inf',
    s: 'Sylabus PUM W03f · Sem TK07 · Kozubski · Stępień',
    why: 'Wczesny wiek zachorowania (przed 65. r.ż.), wiodąca zmiana osobowości i zachowania społecznego (odhamowanie, utrata empatii, hiperoralność, stereotypie) przy względnym zachowaniu pamięci epizodycznej i orientacji wzrokowo-przestrzennej (oraz wysokim wyniku MMSE!) z zanikiem płatów czołowo-skroniowych w MRI to klasyczny wariant behawioralny FTD (bvFTD). W przeciwieństwie do AD i DLB w FTD nie występuje wiodący deficyt cholinergiczny, więc inhibitory AChE są nieskuteczne i mogą nasilać pobudzenie.',
    tip: 'Prawidłowe MMSE (27–30 pkt) NIE wyklucza FTD ani wczesnego VaD — w bvFTD zawodzą funkcje wykonawcze i zachowanie społeczne, a nie pamięć świeża!'
  },
  {
    t: 'otepienia',
    mod: '15',
    stem: '76-letni chory z narastającymi od roku wahaniami sprawności poznawczej („raz rozmawia logicznie, po południu jest głęboko splątany”) opisuje szczegółowe, powtarzające się omamy wzrokowe (widzi obce dzieci w pokoju), od kilku miesięcy porusza się wolno i sztywno (łagodny parkinsonizm), a żona podaje wieloletnie „odgrywanie snów” z krzykami w nocy (RBD). W oddziale internistycznym z powodu niepokoju podano mu doraźnie haloperidol, po którym rozwinął ciężką sztywność uogólnioną, zaburzenia świadomości i gorączkę. Najbardziej prawdopodobna diagnoza podstawowa to:',
    o: [
      'Otępienie z ciałami Lewy’ego (DLB) powikłane ciężką reakcją nadwrażliwości na neuroleptyki',
      'Otępienie czołowo-skroniowe (FTD) z niedoborem witaminy B12',
      'Choroba Alzheimera o typowym, jednostajnym przebiegu',
      'Otępienie wielozawałowe (VaD) po udarze móżdżku',
      'Zespół rzekomootępienny w przebiegu niedoczynności tarczycy'
    ],
    k: 0,
    c: 'src',
    s: 'Sylabus PUM W03f · Sem TK07 · Stępień · Kozubski',
    why: 'Triada: fluktuacje poznawcze i uwagi + wczesne żywe omamy wzrokowe + parkinsonizm (występujący równolegle lub ≤1 rok przed/po początku otępienia — „reguła 1 roku”) oraz zaburzenia zachowania w fazie snu REM (RBD) definiuje otępienie z ciałami Lewy’ego (DLB). Cechą kluczową klinicznie jest skrajna nadwrażliwość na klasyczne neuroleptyki (np. haloperidol) mogąca prowadzić do zagrażającego życiu zespołu neuroleptycznego lub nieodwracalnego pogorszenia sprawności.',
    tip: 'W DLB i otępieniu w PD haloperidol jest ŚMIERTELNIE groźną pułapką! Na omamy i funkcje poznawcze stosuj rywastygminę/donepezil, a doraźnie tylko kwetiapinę lub klozapinę.'
  },
  {
    t: 'testy',
    mod: '15',
    stem: '73-letni mężczyzna zgłasza się z powodu postępującego od 6 miesięcy zaburzenia chodu („nie może oderwać stóp od podłogi”, chodzi drobnymi krokami na szerokiej podstawie, tzw. chód magnetyczny), spowolnienia myślenia (MoCA 19/30) oraz naglących parć i nietrzymania moczu. Siła w nogach w badaniu na leżąco jest prawidłowa (5/5), brak zaników i objawu Babińskiego. W TK głowy poszerzenie układu komorowego przy wąskich bruzdach na sklepistości mózgu (wskaźnik Evansa 0,36). Które rozpoznanie i badanie potwierdzające wskazanie do leczenia przyczynowego są właściwe?',
    o: [
      'Choroba Alzheimera; oznaczenie stężenia amoniaku i włączenie donepezilu',
      'Wodogłowie normotensyjne (NPH — triada Hakima); test upustowy PMR (30–50 ml) z oceną poprawy chodu i kwalifikacja do zastawki komorowo-otrzewnowej (VPS)',
      'Zwyrodnienie korowo-podstawne (CBD); podanie wysokich dawek metyloprednizolonu',
      'Stwardnienie zanikowe boczne; włączenie ryluzolu bez nakłucia lędźwiowego',
      'Otępienie czołowo-skroniowe; terapia elektrokonwulsyjna'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM W03f · Sem TK07 · Podemski · Stępień',
    why: 'Klasyczna triada Hakima (zaburzenia chodu typu magnetycznego jako objaw najwcześniejszy + otępienie podkorowe + nietrzymanie moczu) ze wskaźnikiem Evansa >0,30 i zachowaną siłą mięśniową na leżąco wskazuje na wodogłowie normotensyjne (NPH) — jedną z najważniejszych potencjalnie odwracalnych przyczyn otępienia i zaburzeń chodu. Przejściowa obiektywna poprawa chodu po upuście 30–50 ml PMR (tap-test) potwierdza celowość implantacji zastawki komorowo-otrzewnowej (VPS).',
    tip: 'W NPH kolejność objawów i szans na poprawę po zastawce to: najpierw i najlepiej reaguje CHÓD („mokry, chwiejny i otępiały” = wet, wobbly, wacky).'
  }
];
