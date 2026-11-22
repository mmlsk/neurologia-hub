/* Neurologia V – moduł wpisów i krótkich artykułów klinicznych (lazy-loaded) */
window.HUB_ARTICLES = [
  {
    id: 'tromboliza-tnk-vs-rtpa',
    title: 'Tenekteplaza (TNK) vs Alteplaza (rtPA) w ostrym udarze',
    diagram: { src: 'diagrams/stroke-workflow.html', title: 'Kwalifikacja do rtPA / TNK i trombektomii w udarze' },
    subtitle: 'Kiedy pojedynczy bolus TNK zastępuje godzinny wlew rtPA i na co uważać w oknie 4,5 h przed trombektomią.',
    category: 'Wytyczne',
    group: 'A',
    mods: ['2', '1'],
    date: '2026-11-21',
    readMin: 3,
    tags: ['ESO 2024', 'Tenekteplaza', 'Udar MCA'],
    takeaway: 'TNK 0,25 mg/kg (maks. 25 mg) podaje się jako pojedynczy bolus i.v. w 5–10 s; przy LVO nie czekaj na efekt trombolizy przed przekazaniem na trombektomię mechaniczną.',
    body: `## Dlaczego TNK zyskała przewagę logistyczną?

W wytycznych **ESO** tenekteplaza w dawce **0,25 mg/kg (maks. 25 mg)** stanowi równoważną lub preferowaną alternatywę wobec alteplazy (**0,9 mg/kg, maks. 90 mg**), szczególnie u chorych z niedrożnością dużego naczynia (**LVO**) kwalifikowanych do trombektomii mechanicznej ([[atlas:udar]]).

| Parametr | Alteplaza (rtPA) | Tenekteplaza (TNK) |
|---|---|---|
| Dawka | 0,9 mg/kg (maks. 90 mg) | 0,25 mg/kg (maks. 25 mg) |
| Sposób podania | 10% bolus 1 min + 90% wlew 60 min | 100% w jednym bolusie i.v. (5–10 s) |
| Zastosowanie przy LVO | Standard przed MT | Preferowana logistycznie (*drip-and-ship*) |

## Warunki graniczne przed podaniem

1. Wykluczenie krwotoku śródczaszkowego w pilnym **TK głowy bez kontrastu**.
2. Ciśnienie tętnicze obniżone poniżej **185/110 mmHg** przed włączeniem leku (np. labetalol lub urapidyl i.v.).
3. Brak przeciwwskazań krwotocznych (INR > 1,7, przyjmowanie NOAC < 48 h bez odwrócenia/badań, PLT < 100 tys./µl).

## Pułapka egzaminacyjna

- Przez **24 godziny** po trombolizie obowiązuje zakaz podawania ASA, klopidogrelu i heparyny (do kontrolnego TK po 24 h).
- Jeśli pacjent **nie kwalifikuje się** do trombolizy ani trombektomii, nie obniżaj gwałtownie RR poniżej **220/120 mmHg**, aby nie zmniejszyć perfuzji penumbry. Zobacz też postępowanie przy wzroście ICP: [[guzy-oun-icp|Doktryna Monro–Kelliego i ICP]].`
  },
  {
    id: 'zespol-hornera-lokalizacja',
    title: 'Zespół Hornera: 3-neuronowa droga i szybka topodiagnostyka',
    diagram: { src: 'diagrams/horner-pathway.html', title: '3-neuronowa droga współczulna oka i lokalizacja zespołu Hornera' },
    subtitle: 'Ptoza, mioza i anhydroza — jak po objawach towarzyszących odróżnić uszkodzenie ośrodkowe od rozwarstwienia tętnicy szyjnej.',
    category: 'Badanie U02',
    group: 'B',
    mods: ['6', '5'],
    date: '2026-11-20',
    readMin: 3,
    tags: ['Zespół Hornera', 'Rozwarstwienie ICA', 'Wallenberg'],
    takeaway: 'Ostry ból szyi/twarzy + zespół Hornera to rozwarstwienie tętnicy szyjnej wewnętrznej (ICA) do czasu wykluczenia w angio-TK/angio-MR.',
    body: `## Triada objawów i dlaczego łatwo ją przeoczyć

Klasyczna triada zespołu Hornera obejmuje **niewielką ptozę** (porażenie mięśnia tarczkowego Müllera — bez całkowitego opadnięcia powieki jak w n. III), **miozę** (wyraźniejszą w przyciemnionym pokoju) oraz **anhydrozę** po stronie uszkodzenia ([[mod:6]]).

## Podział na 3 neurony

- **I neuron (ośrodkowy — podwzgórze → C8–Th2):** udar boczny opuszki (**zespół Wallenberga** z ataksją, dysfagią i naprzemiennymi zaburzeniami czucia), jamistość rdzenia.
- **II neuron (przedzwojowy — C8–Th2 → zwój szyjny górny):** guz szczytu płuca (**guz Pancoasta** z bólem barku i zanikiem mięśni dłoni C8–Th1).
- **III neuron (zazwojowy — splot szyjno-tętniczy → oczodół):** **rozwarstwienie tętnicy szyjnej wewnętrznej (ICA)**, klasterowy ból głowy, zakrzepica zatoki jamistej.

## Różnicowanie przy łóżku chorego

1. **Zespół Hornera vs porażenie n. III:** w n. III źrenica jest **szeroka** i niereagująca, powieka opada głęboko, a gałka ucieka „w dół i na zewnątrz”; w Hornerze źrenica jest **wąska**, a ruchomość gałki prawidłowa (porównaj z [[nerwy-czaszkowe-zespoly-pnia|zespołami nerwów III–XII]]).
2. **Anhydroza:** w uszkodzeniu III neuronu (powyżej rozwidlenia CCA) potliwość twarzy bywa zachowana, z wyjątkiem niewielkiego pola nad przyśrodkową częścią czoła.`
  },
  {
    id: 'stan-padaczkowy-esett',
    title: 'Stan padaczkowy (SE): algorytm czasowy 0–5–15–30 minut',
    diagram: { src: 'diagrams/se-timeline.html', title: 'Stan padaczkowy (SE) — oś czasu 0–5–15–30 min' },
    subtitle: 'Dlaczego benzodwuazepiny działają tylko na starcie, jak dobierać dawki II rzutu wg badania ESETT i kiedy włączyć tiaminę.',
    category: 'Stany nagłe',
    group: 'A',
    mods: ['4', '1'],
    date: '2026-11-19',
    readMin: 4,
    tags: ['Stan padaczkowy', 'ESETT', 'ILAE'],
    takeaway: 'Nie rozcieńczaj i nie dziel dawki leku II rzutu: lewetiracetam 60 mg/kg (maks. 4500 mg) ma taką samą skuteczność jak walproinian 40 mg/kg i fosfenytoina (~50%).',
    body: `## Progi czasowe ILAE dla drgawkowego stanu padaczkowego

- **t₁ = 5 minut:** napad toniczno-kloniczny trwający > 5 min traktujemy operacyjnie jako stan padaczkowy i natychmiast wdrażamy leczenie ([[atlas:padaczka]]).
- **t₂ = 30 minut:** granica ryzyka nieodwracalnego uszkodzenia neuronów.

## Sekwencja postępowania

1. **0–5 min (ABC + glukoza):** drożność dróg oddechowych, tlen, dostęp i.v., pomiar glikemii. Przy podejrzeniu niedoboru (alkoholizm, niedożywienie) podaj **tiaminę 100 mg i.v. przed glukozą**.
2. **5–15 min (I rzut — BZD):** **lorazepam 4 mg i.v.** (0,1 mg/kg) lub **diazepam 10 mg i.v.**; przy braku wkłucia **midazolam 10 mg i.m.** W razie utrzymywania się drgawek powtórz pełną dawkę po 5 min.
3. **15–30 min (II rzut — ESETT):** wybór równorzędny: **lewetiracetam 60 mg/kg i.v.** (maks. 4500 mg) albo **walproinian 40 mg/kg i.v.** (maks. 3000 mg; unikaj u kobiet w wieku rozrodczym).
4. **> 30 min (stan oporny — RSE):** intubacja i wlew anestetyku (propofol, midazolam lub tiopental) pod kontrolą ciągłego **EEG**. Przy podejrzeniu podłoża autoimmunologicznego (podostre napady + zaburzenia pamięci/psychotyczne) rozważ [[autoimmunologiczne-zapalenia-oun-azo|autoimmunologiczne zapalenie mózgu (AZO)]].`
  },
  {
    id: 'sm-vs-nmosd-pulapki',
    title: 'SM a NMOSD (AQP4-IgG): pułapka leczenia immunomodulującego',
    subtitle: 'Dlaczego długie poprzeczne zapalenie rdzenia (LETM) wymaga oznaczenia AQP4-IgG zanim włączysz interferon beta lub fingolimod.',
    category: 'Pułapki',
    group: 'C',
    mods: ['9'],
    date: '2026-11-18',
    readMin: 3,
    tags: ['SM', 'NMOSD', 'AQP4-IgG', 'McDonald'],
    takeaway: 'Leki stosowane w SM (IFN-β, fingolimod, natalizumab) mogą gwałtownie zaostrzyć NMOSD! Zawsze wyklucz LETM (≥3 segmenty) i oznacz AQP4-IgG przed startem DMT.',
    body: `## Kluczowe różnice w obrazie i diagnostyce

Choć zarówno **stwardnienie rozsiane (SM)**, jak i **NMOSD** mogą zaczynać się zapaleniem nerwu wzrokowego (ON) oraz zespołem rdzeniowym, ich patomechanizm jest odmienny (demielinizacja w SM vs astrocytopatia w NMOSD, [[atlas:autoimmuno]]).

| Cecha | SM (McDonald 2017) | NMOSD (AQP4-IgG) |
|---|---|---|
| Rdzeń w MRI | Krótkie ogniska (< 3 segmenty), obwodowe | **LETM (≥ 3 segmenty)**, centralnie w rdzeniu |
| Nerw wzrokowy | Zwykle jednostronne ON, dobra poprawa | Częściej obustronne lub skrzyżowanie, gorsze rokowanie |
| PMR (OCB IgG) | Dodatnie u > 85–90% chorych | Rzadko (~15–30%) |
| Stosunek K:M | ok. 2–3:1 | ok. **9:1** |

## Co grozi przy pomyłce terapeutycznej?

- Podanie **interferonu beta**, **fingolimodu** lub **natalizumabu** choremu z NMOSD może wywołać ciężki, nieodwracalny rzut choroby.
- W rzucie obu jednostek stosujemy **metyloprednizolon 1 g/d i.v. przez 3–5 dni**, a przy braku poprawy w NMOSD wcześnie wdrażamy **plazmaferezę (PLEX)** (zobacz też [[autoimmunologiczne-zapalenia-oun-azo|inne zespoły AZO i ZGB]]).`
  },
  {
    id: 'guzy-oun-icp',
    title: 'Guzy OUN i doktryna Monro–Kelliego: objawy ogniskowe vs ICP',
    diagram: { src: 'diagrams/icp-lifecycle.html', title: 'Dynamika ciśnienia śródczaszkowego (Monro–Kellie → wgłobienia)' },
    subtitle: 'Opracowanie na bazie wykładu PUM 2026: dynamika wzrostu ciśnienia śródczaszkowego, zespoły płatowe oraz różnicowanie guzów nad- i podnamiotowych.',
    category: 'Wykład PUM 2026',
    group: 'D',
    mods: ['13', '1'],
    date: '2026-11-21',
    readMin: 8,
    tags: ['Guzy OUN', 'ICP', 'Monro-Kellie', 'Oponiak', 'Glejak'],
    takeaway: 'Wczesnoporanny ból głowy, nudności/wymioty na czczo, bradykardia i obrzęk tarcz n. II to sygnały ciasnoty śródczaszkowej — w guzach podnamiotowych wodogłowie i ICP pojawiają się najwcześniej.',
    body: `## Doktryna Monro–Kelliego i mechanizmy kompensacji

Objętość jamy czaszki jest stała i dzielą ją trzy komponenty: **tkanka mózgowa (~80%)**, **krew żylna/tętnicza (~10%)** oraz **płyn mózgowo-rdzeniowy (~10%)**. Pojawienie się czwartego komponentu (guza lub obrzęku naczyniopochodnego wokół niego) początkowo jest kompensowane wypychaniem PMR do kanału kręgowego i zmniejszaniem objętości krwi żylnej.

Gdy rezerwa kompensacyjna zostanie wyczerpana (~20–22 mmHg), każdy kolejny mililitr masy wywołuje **gwałtowny, wykładniczy skok ICP** (krzywa Langfitta).

## Objawy ogólne nadciśnienia śródczaszkowego

- **Bóle głowy:** typowo wczesnoporanne (po przebudzeniu, wskutek nocnej hiperkapnii i rozszerzenia naczyń), nasilające się przy kaszlu i próbie Valsalvy.
- **Nudności i wymioty:** często na czczo, chlustające, bez poprzedzających nudności — szczególnie w guzach **podnamiotowych** drażniących dno komory IV.
- **Tarcza zastoinowa (obrzęk n. II):** początkowo bez spadku ostrości wzroku (w odróżnieniu od zapalenia n. II, gdzie spadek ostrości i ból przy ruchu gałki są wczesne!).
- **Triada Cushinga (stan krytyczny):** wzrost RR + **bradykardia** + nieregularny oddech.

## Guzy nadnamiotowe vs podnamiotowe

| Cecha | Lokalizacja nadnamiotowa | Lokalizacja podnamiotowa (tylny dół) |
|---|---|---|
| Wczesne objawy | **Napady padaczkowe**, niedowład, afazja, ubytki pola widzenia | **Wodogłowie obstrukcyjne**, bóle głowy, wymioty, ataksja |
| Zajęcie nerwów czaszkowych | Rzadziej (lub wtórne przez wgłobienie haka → n. III) | Wczesne (np. n. VIII, VII, V w guzach kąta mostowo-móżdżkowego) |
| Najczęstsze typy (dorośli) | Przerzuty, glejak wielopostaciowy (GBM), oponiak | Przerzuty, nerwiak osłonkowy n. VIII, wyściółczak |

## Zespoły ogniskowe w pigułce egzaminacyjnej

1. **Płat czołowy:** zaburzenia funkcji wykonawczych, odhamowanie lub apatia/abulia, niedowład połowiczy (zakręt przedśrodkowy), **afazja ruchowa Broki** (półkula dominująca), zwrot gałek ocznych w stronę ogniska w napadzie. Zespół Fostera–Kennedy’ego (guz podstawy płata czołowego): **zanik n. II po stronie guza + obrzęk tarczy po stronie przeciwnej**.
2. **Płat ciemieniowy:** niedoczulica połowicza, astereognozja, agnozja palców i **zespół zaniedbywania stronnego** (półkula niedominująca).
3. **Płat skroniowy:** **afazja czuciowa Wernickego**, kwadrantopsja górna jednoimienna (*pie in the sky*), napady z aurą węchową/smakową (*uncinate fits*).
4. **Płat potyliczny:** niedowidzenie połowicze jednoimienne z zaoszczędzeniem widzenia centralnego; obustronne uszkodzenie daje **ślepotę korową** (zachowany odruch źrenic na światło!).
5. **Okolica siodłowa:** gruczolak przysadki uciska skrzyżowanie wzrokowe od dołu → **niedowidzenie dwuskroniowe** (często najpierw górnokwadrantowe).

## Postępowanie doraźne i pułapka LP

- Obrzęk naczyniopochodny wokół guza reaguje szybko na **deksametazon i.v./p.o.** (w przeciwieństwie do obrzęku cytotoksycznego w udarze!).
- **ZAKAZ nakłucia lędźwiowego (LP)** przy podejrzeniu masy śródczaszkowej lub obrzęku tarcz n. II bez wcześniejszego TK/MR głowy — ryzyko wgłobienia migdałków móżdżku w otwór wielki ([[mod:13]]).`
  },
  {
    id: 'autoimmunologiczne-zapalenia-oun-azo',
    title: 'Autoimmunologiczne zapalenia mózgu (AZO) oraz ZGB i CIDP',
    subtitle: 'Opracowanie na bazie wykładu PUM 2026 cz. II: przeciwciała anty-NMDAR/LGI1, diagnostyka AZO oraz różnicowanie AIDP, AMAN, zespołu Millera-Fishera i CIDP.',
    category: 'Wykład PUM 2026',
    group: 'C',
    mods: ['9', '10'],
    date: '2026-11-21',
    readMin: 9,
    tags: ['AZO', 'anty-NMDAR', 'GBS', 'CIDP', 'Miller-Fisher'],
    takeaway: 'W zespole Guillain–Barré (ZGB/AIDP) glikokortykosteroidy są NIESKUTECZNE (stosujemy IVIg lub plazmaferezę), natomiast w CIDP GKS są jedną z terapii I linii obok IVIg i PLEX.',
    body: `## Autoimmunologiczne zapalenia mózgu (AZO)

AZO to nieinfekcyjne zapalenia OUN wywołane przeciwciałami przeciw antygenom **powierzchniowym/synaptycznym** (lepsza odpowiedź na immunoterapię, np. anty-NMDAR, anty-LGI1, anty-CASPR2, anty-GABABR) lub **wewnątrzkomórkowym / onkoneuronalnym** (anty-Hu, anty-Yo, anty-Ri — słabsza odpowiedź, silny związek z nowotworem).

### Kiedy podejrzewać AZO?

- **Podostry początek (< 3 miesięcy):** szybko narastające zaburzenia pamięci krótkotrwałej, splątanie, zmiana osobowości lub ostre objawy psychotyczne.
- **Napady padaczkowe** oporne na standardowe leki (np. napady dystoniczne twarzowo-ramienne w **anty-LGI1** z hiponatremią) — por. [[stan-padaczkowy-esett|algorytm stanu padaczkowego]].
- **Zapalenie anty-NMDAR:** często młode kobiety (związek z **potworniakiem jajnika**); po fazie grypopodobnej pojawiają się psychozy, dyskinezy ustno-twarzowe, katatonia i dysautonomia.

### Diagnostyka i leczenie I rzutu AZO

1. **MRI mózgu (FLAIR/T2):** obustronna hiperintensywność przyśrodkowych płatów skroniowych (układ limbiczny), choć w anty-NMDAR MRI bywa prawidłowy (~50%).
2. **EEG:** czynność wolna, zdezorganizowana, w anty-NMDAR charakterystyczny wzorzec *extreme delta brush*.
3. **PMR:** umiarkowana pleocytoza limfocytarna, podwyższone białko, prążki oligoklonalne (~50%).
4. **Terapia I rzutu:** **metyloprednizolon i.v. + IVIg lub plazmafereza (PLEX)** oraz pilne usunięcie guza (jeśli paranowotworowe); w II rzucie **rytuksymab** lub cyklofosfamid.

## Zespół Guillain–Barré (ZGB) — warianty kliniczne

ZGB jest najczęstszą przyczyną ostrego, wstępującego niedowładu wiotkiego u młodych dorosłych (często po infekcji *Campylobacter jejuni*, CMV, EBV).

| Wariant | Mechanizm / przeciwciała | Obraz kliniczny |
|---|---|---|
| **AIDP** (~90% w Europie) | Demielinizacja korzeni i nerwów | Wstępujący niedowład wiotki + zaburzenia czucia + zniesienie odruchów głębokich |
| **AMAN** | Aksonalny ruchowy (anty-GM1, GD1a) | Czysto ruchowy, bez zaburzeń czucia; odruchy czasem zachowane; często po *C. jejuni* |
| **AMSAN** | Aksonalny czuciowo-ruchowy | Cięższy przebieg niż AMAN, wolniejsza rekonwalescencja |
| **Zespół Millera–Fishera** | Anty-GQ1b (> 90%) | Klasyczna triada: **oftalmoplegia + ataksja + arefleksja** |

### Kluczowe zasady dyżurowe w ZGB

- **PMR:** rozszczepienie białkowo-komórkowe (wysokie białko przy prawidłowej cytozie < 10–50/µl) u 80–90% chorych — uwaga: w **1. tygodniu** PMR może być jeszcze prawidłowy!
- **Monitoruj wydolność oddechową (FVC, pojemność życiowa)** oraz dysautonomię (wahania RR, zaburzenia rytmu).
- **Leczenie:** wyłącznie **IVIg (0,4 g/kg/d przez 5 dni)** lub **plazmafereza (PLEX)**. **Pod zaliczenie i klinicznie: GKS NIE stosujemy w ZGB!**

## ZGB vs CIDP — najważniejsze rozróżnienie

- **ZGB:** przebieg ostry, jednofazowy, szczyt deficytu osiągany **do 4 tygodni**.
- **CIDP (przewlekła zapalna poliradikuloneuropatia demielinizacyjna):** narastanie lub nawroty przez **> 8 tygodni**; w leczeniu skuteczne są zarówno **glikokortykosteroidy**, jak i **IVIg / PLEX** ([[mod:10]]).`
  },
  {
    id: 'otepienia-alzheimer-naczyniowe-dlb',
    title: 'Otępienia: Alzheimer, naczyniopochodne, DLB i FTD w pigułce',
    subtitle: 'Opracowanie na bazie wykładu PUM 2026: progi MMSE, stadium przedkliniczne, kryteria różnicowe i odwracalne przyczyny otępienia.',
    category: 'Wykład PUM 2026',
    group: 'D',
    mods: ['15'],
    date: '2026-11-21',
    readMin: 8,
    tags: ['Otępienie', 'Alzheimer', 'DLB', 'FTD', 'MMSE'],
    takeaway: 'Zanim rozpoznasz otępienie zwyrodnieniowe, wyklucz przyczyny odwracalne: wodogłowie normociśnieniowe (triada Hakima), niedobór wit. B12, niedoczynność tarczycy, depresję (pseudootępienie) i krwiaka podtwardówkowego.',
    body: `## Od MCI do otępienia — granice w MMSE

- **Prawidłowa rezerwa poznawcza:** 27–30 pkt w skali **MMSE** (zawsze koryguj wynik względem wieku i wykształcenia).
- **Łagodne zaburzenia poznawcze (MCI):** MMSE **24–26 pkt**; obiektywne deficyty pamięci/poznania, ale **codzienna samodzielność jest zachowana**.
- **Otępienie:** zaburzenia pamięci i co najmniej jednej innej domeny poznawczej na tyle nasilone, że **istotnie upośledzają codzienne funkcjonowanie** ([[atlas:zwyrodnienia]]).

## Porównanie 4 najczęstszych zespołów otępiennych

| Jednostka | Początek i przebieg | Dominujące objawy | Obrazowanie / wskazówka |
|---|---|---|---|
| **Choroba Alzheimera (AD)** | Skryty, powolny (~2 dekady fazy przedklinicznej) | Wczesna utrata **pamięci epizodycznej**, dezorientacja, afazja, apraksja | Zanik hipokampów i przyśrodkowych płatów skroniowych |
| **Otępienie naczyniopochodne (VaD)** | Często **skokowy** po udarach lub podkorowy (choroba małych naczyń) | Spowolnienie myślenia, zaburzenia wykonawcze, wczesne objawy ogniskowe | Liczne ogniska naczyniowe/lakunarne, leukoarajoza |
| **Otępienie z ciałami Lewy’ego (DLB)** | Podostry/przewlekły z **fluktuacjami** uwagi | **Omamy wzrokowe** (wyraziste), parkinsonizm, zaburzenia fazy REM | **Skrajna nadwrażliwość na neuroleptyki** (unikaj haloperidolu!) |
| **Otępienie czołowo-skroniowe (FTD)** | Wcześniejszy wiek (50–65 r.ż.), skryty | Zmiana osobowości, **odhamowanie** lub apatia, wczesna afazja (PPA) | Zanik płatów czołowych/skroniowych przednich |

## Farmakoterapia choroby Alzheimera

- **Inhibitory acetylocholinoesterazy** (donepezil, rywastygmina, galantamina): lekka i umiarkowana postać AD (oraz DLB — zmniejszają też nasilenie omamów).
- **Antagonista receptora NMDA (memantyna):** umiarkowana i ciężka postać AD (często w terapii skojarzonej z IChE).

## Przyczyny potencjalnie odwracalne (obowiązkowy panel badań!)

1. **Wodogłowie normociśnieniowe (NPH — triada Hakima):** zaburzenia chodu („chód magnetyczny”) + nietrzymanie moczu + otępienie; poszerzenie układu komorowego nieproporcjonalne do zaniku kory.
2. **Niedobory i endokrynopatie:** witamina **B₁₂** (zobacz też objawy ze sznurów tylnych w [[mod:12]]), kwas foliowy, **TSH** (niedoczynność tarczycy), kiła / HIV (u młodszych).
3. **Przewlekły krwiak podtwardówkowy (SDH)** po banalnym urazie głowy u osoby starszej oraz **depresja** (pseudootępienie — pacjent częściej odpowiada „nie wiem” i ma zachowany wgląd).`
  },
  {
    id: 'nerwy-czaszkowe-zespoly-pnia',
    title: 'Nerwy czaszkowe III–XII i zespoły pniowe w badaniu klinicznym',
    subtitle: 'Opracowanie na bazie wykładu PUM 2026: porażenia n. III/IV/VI, MLF (INO), Bell vs Ramsay Hunt oraz zespół opuszkowy vs rzekomoopuszkowy.',
    category: 'Badanie U02',
    group: 'B',
    mods: ['6', '5'],
    date: '2026-11-21',
    readMin: 7,
    tags: ['Nerwy czaszkowe', 'MLF', 'Bell', 'Zespół opuszkowy'],
    takeaway: 'W zespole opuszkowym (LMN: IX, X, XII) język zanika, ma fascykulacje i zbacza W STRONĘ CHORĄ; w zespole rzekomoopuszkowym (UMN, zawsze obustronnym) odruchy podniebienne i żuchwowy są WZMOŻONE.',
    body: `## Nerwy gałkoruchowe (III, IV, VI) i międzyjądrowa oftalmoplegia (INO)

- **Nerw III (okoruchowy):** głębokie opadnięcie powieki + gałka ustawiona **„w dół i na zewnątrz”**. Jeśli źrenica jest **szeroka i niereagująca** (włókna przywspółczulne leżą powierzchownie!), w pierwszej kolejności wyklucz **tętniak tętnicy łączącej tylnej (PComA)** lub wgłobienie haka ([[guzy-oun-icp|nadciśnienie śródczaszkowe]]). W cukrzycowej neuropatii n. III źrenica bywa oszczędzona!
- **Nerw IV (bloczkowy):** porażenie mięśnia skośnego górnego → chory **przechyla głowę w stronę ZDROWEGO boku** (objaw Bielschowsky’ego) i zgłasza dwojenie przy schodzeniu ze schodów lub czytaniu.
- **Nerw VI (odwodzący):** brak odwiedzenia gałki, dwojenie poziome nasilające się przy patrzeniu w stronę chorą. Ze względu na długi przebieg wewnątrzczaszkowy często ulega uszkodzeniu wtórnie przy wzroście ICP.
- **Pęczek podłużny przyśrodkowy (MLF — INO):** upośledzenie przywodzenia gałki po stronie uszkodzenia + oczopląs odwodzonej gałki przeciwnej (klasyczne w SM u młodych i udarze pnia u starszych). Zobacz też lokalizację źrenic w [[zespol-hornera-lokalizacja|zespole Hornera]].

## Nerw VII: porażenie Bella vs zespół Ramsaya–Hunta

- **Ośrodkowe (nadjądrowe) uszkodzenie n. VII:** osłabienie wyłącznie **dolnej części twarzy** po stronie przeciwnej (czoło marszczy się symetrycznie dzięki obustronnemu unerwieniu).
- **Obwodowe (LMN — np. porażenie Bella):** porażenie **całej połowy twarzy** (niemożność zmarszczenia czoła i domknięcia szpary powiekowej — objaw Bella).
- **Zespół Ramsaya–Hunta:** reaktywacja VZV w **zwoju kolanka** → obwodowe porażenie n. VII + silny ból ucha + **pęcherzyki w przewodzie słuchowym zewnętrznym** i na małżowinie (wymaga acyklowiru + GKS!).

## Zespół opuszkowy vs zespół rzekomoopuszkowy

| Cecha | Zespół opuszkowy (LMN) | Zespół rzekomoopuszkowy (UMN) |
|---|---|---|
| Lokalizacja | Jądra IX, X, XII w opuszce lub korzenie/nerwy | Obustronne uszkodzenie dróg korowo-jądrowych |
| Symetria | Może być **jednostronny** lub obustronny | **Zawsze obustronny** |
| Język | **Zanik i fascykulacje**, zbacza w stronę chorą | Spastyczny, bez zaniku i bez fascykulacji |
| Odruchy (żuchwowy, podniebienny) | **Osłabione lub zniesione** | **Wzmożone** + labilność emocjonalna |

- **Pułapka z języczkiem (n. IX/X) i językiem (n. XII):** przy jednostronnym uszkodzeniu n. X podniebienie opada po stronie chorej, a języczek jest pociągany **w stronę ZDROWĄ**; przy uszkodzeniu n. XII język wysuwany jest **w stronę CHORĄ** ([[mod:6]]).`
  }
];
