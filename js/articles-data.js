/* Neurologia V – moduł wpisów i krótkich artykułów klinicznych (lazy-loaded) */
window.HUB_ARTICLES = [
  {
    id: 'tromboliza-tnk-vs-rtpa',
    title: 'Tenekteplaza (TNK) vs Alteplaza (rtPA) w ostrym udarze',
    subtitle: 'Kiedy pojedynczy bolus TNK zastępuje godzinny wlew rtPA i na co uważać w oknie 4,5 h przed trombektomią.',
    category: 'Wytyczne',
    group: 'A',
    mods: ['2', '1'],
    date: '2026-11-21',
    readMin: 3,
    tags: ['ESO 2024', 'Tenekteplaza', 'Udar MCA'],
    takeaway: 'TNK 0,25 mg/kg (maks. 25 mg) podaje się jako pojedynczy bolus i.v. w 5–10 s; przy LVO nie czekaj na efekt trombolizy przed przekazaniem na trombektomię mechaniczną.',
    body: `## Dlaczego TNK zyskała przewagę logistyczną?

W wytycznych **ESO** tenekteplaza w dawce **0,25 mg/kg (maks. 25 mg)** stanowi równoważną lub preferowaną alternatywę wobec alteplazy (**0,9 mg/kg, maks. 90 mg**), szczególnie u chorych z niedrożnością dużego naczynia (**LVO**) kwalifikowanych do trombektomii mechanicznej.

- **Alteplaza (rtPA):** 10% dawki w bolusie i.v. przez 1 minutę + 90% we wlewie ciągłym przez 60 minut.
- **Tenekteplaza (TNK):** 100% dawki w jednym szybkim bolusie i.v. (5–10 s), co upraszcza transport międzyszpitalny (*drip-and-ship*).

## Warunki graniczne przed podaniem

1. Wykluczenie krwotoku śródczaszkowego w pilnym **TK głowy bez kontrastu**.
2. Ciśnienie tętnicze obniżone poniżej **185/110 mmHg** przed włączeniem leku (np. labetalol lub urapidyl i.v.).
3. Brak przeciwwskazań krwotocznych (INR > 1,7, przyjmowanie NOAC < 48 h bez odwrócenia/badań, PLT < 100 tys./µl).

## Pułapka egzaminacyjna

- Przez **24 godziny** po trombolizie obowiązuje zakaz podawania ASA, klopidogrelu i heparyny (do kontrolnego TK po 24 h).
- Jeśli pacjent **nie kwalifikuje się** do trombolizy ani trombektomii, nie obniżaj gwałtownie RR poniżej **220/120 mmHg**, aby nie zmniejszyć perfuzji penumbry.`
  },
  {
    id: 'zespol-hornera-lokalizacja',
    title: 'Zespół Hornera: 3-neuronowa droga i szybka topodiagnostyka',
    subtitle: 'Ptoza, mioza i anhydroza — jak po objawach towarzyszących odróżnić uszkodzenie ośrodkowe od rozwarstwienia tętnicy szyjnej.',
    category: 'Badanie U02',
    group: 'B',
    mods: ['6', '5'],
    date: '2026-11-20',
    readMin: 3,
    tags: ['Zespół Hornera', 'Rozwarstwienie ICA', 'Wallenberg'],
    takeaway: 'Ostry ból szyi/twarzy + zespół Hornera to rozwarstwienie tętnicy szyjnej wewnętrznej (ICA) do czasu wykluczenia w angio-TK/angio-MR.',
    body: `## Triada objawów i dlaczego łatwo ją przeoczyć

Klasyczna triada zespołu Hornera obejmuje **niewielką ptozę** (porażenie mięśnia tarczkowego Müllera — bez całkowitego opadnięcia powieki jak w n. III), **miozę** (wyraźniejszą w przyciemnionym pokoju) oraz **anhydrozę** po stronie uszkodzenia.

## Podział na 3 neurony

- **I neuron (ośrodkowy — podwzgórze → C8–Th2):** udar boczny opuszki (**zespół Wallenberga** z ataksją, dysfagią i naprzemiennymi zaburzeniami czucia), jamistość rdzenia.
- **II neuron (przedzwojowy — C8–Th2 → zwój szyjny górny):** guz szczytu płuca (**guz Pancoasta** z bólem barku i zanikiem mięśni dłoni C8–Th1).
- **III neuron (zazwojowy — splot szyjno-tętniczy → oczodół):** **rozwarstwienie tętnicy szyjnej wewnętrznej (ICA)**, klasterowy ból głowy, zakrzepica zatoki jamistej.

## Różnicowanie przy łóżku chorego

1. **Zespół Hornera vs porażenie n. III:** w n. III źrenica jest **szeroka** i niereagująca, powieka opada głęboko, a gałka ucieka „w dół i na zewnątrz”; w Hornerze źrenica jest **wąska**, a ruchomość gałki prawidłowa.
2. **Anhydroza:** w uszkodzeniu III neuronu (powyżej rozwidlenia CCA) potliwość twarzy bywa zachowana, z wyjątkiem niewielkiego pola nad przyśrodkową częścią czoła.`
  },
  {
    id: 'stan-padaczkowy-esett',
    title: 'Stan padaczkowy (SE): algorytm czasowy 0–5–15–30 minut',
    subtitle: 'Dlaczego benzodwuazepiny działają tylko na starcie, jak dobierać dawki II rzutu wg badania ESETT i kiedy włączyć tiaminę.',
    category: 'Stany nagłe',
    group: 'A',
    mods: ['4', '1'],
    date: '2026-11-19',
    readMin: 4,
    tags: ['Stan padaczkowy', 'ESETT', 'ILAE'],
    takeaway: 'Nie rozcieńczaj i nie dziel dawki leku II rzutu: lewetiracetam 60 mg/kg (maks. 4500 mg) ma taką samą skuteczność jak walproinian 40 mg/kg i fosfenytoina (~50%).',
    body: `## Progi czasowe ILAE dla drgawkowego stanu padaczkowego

- **t₁ = 5 minut:** napad toniczno-kloniczny trwający > 5 min traktujemy operacyjnie jako stan padaczkowy i natychmiast wdrażamy leczenie.
- **t₂ = 30 minut:** granica ryzyka nieodwracalnego uszkodzenia neuronów.

## Sekwencja postępowania

1. **0–5 min (ABC + glukoza):** drożność dróg oddechowych, tlen, dostęp i.v., pomiar glikemii. Przy podejrzeniu niedoboru (alkoholizm, niedożywienie) podaj **tiaminę 100 mg i.v. przed glukozą**.
2. **5–15 min (I rzut — BZD):** **lorazepam 4 mg i.v.** (0,1 mg/kg) lub **diazepam 10 mg i.v.**; przy braku wkłucia **midazolam 10 mg i.m.** W razie utrzymywania się drgawek powtórz pełną dawkę po 5 min.
3. **15–30 min (II rzut — ESETT):** wybór równorzędny: **lewetiracetam 60 mg/kg i.v.** (maks. 4500 mg) albo **walproinian 40 mg/kg i.v.** (maks. 3000 mg; unikaj u kobiet w wieku rozrodczym).
4. **> 30 min (stan oporny — RSE):** intubacja i wlew anestetyku (propofol, midazolam lub tiopental) pod kontrolą ciągłego **EEG**.`
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

Choć zarówno **stwardnienie rozsiane (SM)**, jak i **NMOSD** mogą zaczynać się zapaleniem nerwu wzrokowego (ON) oraz zespołem rdzeniowym, ich patomechanizm jest odmienny (demielinizacja w SM vs astrocytopatia w NMOSD).

- **Rdzeń w MRI:** w SM ogniska są krótkie (**< 3 segmenty kręgowe**, obwodowe); w NMOSD klasyczne jest **LETM (≥ 3 segmenty**, centralnie w rdzeniu).
- **Nerw wzrokowy:** w NMOSD częściej zajęcie obustronne lub skrzyżowania wzrokowego z cięższym deficytem ostrości wzroku.
- **PMR:** prążki oligoklonalne (OCB IgG) typowe dla SM (> 85–90%), w NMOSD występują rzadko (~15–30%).

## Co grozi przy pomyłce terapeutycznej?

- Podanie **interferonu beta**, **fingolimodu** lub **natalizumabu** choremu z NMOSD może wywołać ciężki, nieodwracalny rzut choroby.
- W rzucie obu jednostek stosujemy **metyloprednizolon 1 g/d i.v. przez 3–5 dni**, a przy braku poprawy w NMOSD wcześnie wdrażamy **plazmaferezę (PLEX)**.`
  }
];
