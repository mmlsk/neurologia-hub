/* Bank zadań modułów [7][8]: Bóle głowy, neuralgia nerwu V oraz bóle barku i krzyża */
window.ATLAS_TOPICS = {
  glowa: 'Klasyfikacja, SNOOP i migrena',
  tac: 'Klasterowy i neuralgia V',
  rwa: 'Radikulopatie C / L-S',
  ogon: 'Zespół ogona końskiego'
};

window.ATLAS_Q = [
  {
    t: 'glowa',
    mod: '7',
    stem: '48-letnia kobieta bez wcześniejszego wywiadu bólów głowy zgłasza nagły, najsilniejszy w życiu ból okolicy potylicznej, który osiągnął maksimum w ciągu 30 sekund podczas wysiłku fizycznego, z nudnościami i światłowstrętem. TK głowy bez kontrastu wykonane w 10. godzinie od początku objawów nie wykazuje krwi. Jakie jest właściwe dalsze postępowanie?',
    o: [
      'Rozpoznanie pierwszego w życiu napadu migreny bez aury i podanie sumatryptanu 6 mg s.c.',
      'Wykluczenie krwotoku na podstawie prawidłowego TK i wypisanie chorej z NLPZ',
      'Pilne wykonanie nakłucia lędźwiowego (ocena ksantochromii) oraz/lub angio-TK naczyń mózgowych w kierunku SAH',
      'Zlecenie planowego MRI w trybie ambulatoryjnym za 4 tygodnie oraz propranololu p.o.',
      'Włączenie karbamazepiny w dawce 200 mg/d w kierunku neuralgii potylicznej'
    ],
    k: 2,
    c: 'did',
    s: 'Sylabus PUM [7] · W03a / Sem TK11 · SNOOP10',
    why: 'Piorunujący ból głowy (szczyt <1 min) to główna czerwona flaga SNOOP10 nakazująca wykluczenie krwotoku podpajęczynówkowego (SAH). Po upływie >6 h od początku objawów czułość samego TK bez kontrastu spada, więc ujemny wynik TK NIE wyklucza SAH i wymaga pilnego nakłucia lędźwiowego (ksantochromia) lub angio-TK.',
    tip: 'Nigdy nie rozpoznawaj migreny „de novo” przy piorunującym bólu głowy. Granica wysokiej czułości TK w SAH to pierwsze 6 godzin.',
    gap: {
      pool: 'W klasycznym schemacie egzaminacyjnym przy podejrzeniu SAH z ujemnym TK zawsze wykonuje się punkcję lędźwiową (ocena ksantochromii/krwinkotoku).',
      now: 'Kryterium 6 godzin (Ottawa SAH / ESO): czułość nowoczesnego TK w pierwszych 6 h od początku bólu wynosi niemal 100%, natomiast >6 h obowiązkowe jest nakłucie lędźwiowe lub angio-TK.'
    }
  },
  {
    t: 'glowa',
    mod: '7',
    stem: '32-letnia pacjentka z migreną z typową aurą wzrokową (mroczki migoczące trwające ok. 25 minut przed napadem) ma 8 dni bólowych w miesiącu i przyjmuje doustną antykoncepcję zawierającą etynyloestradiol. Wywiad kardiologiczny jest ujemny. Które stwierdzenie jest prawdziwe?',
    o: [
      'W profilaktyce migreny lekiem pierwszego wyboru u tej pacjentki jest kwas walproinowy',
      'Sumatryptan należy podać natychmiast na początku aury wzrokowej, aby zapobiec fazie bólowej',
      'Doustna antykoncepcja estrogenowa jest przeciwwskazana z powodu zwiększonego ryzyka udaru niedokrwiennego mózgu',
      'Łączne podanie sumatryptanu i winianu ergotaminy podczas jednego napadu jest zalecanym standardem w migrenie z aurą'
    ],
    k: 2,
    c: 'inf',
    s: 'Sylabus PUM [7] · Sem TK11 · IHS / PTBG',
    why: 'Migrena z aurą stanowi istotny czynnik ryzyka udaru niedokrwiennego, a stosowanie złożonej antykoncepcji zawierającej estrogeny dodatkowo to ryzyko zwielokrotnia i jest przeciwwskazane. Kwas walproinowy jest bezwzględnie odradzany u kobiet w wieku rozrodczym (teratogenność). Tryptany podaje się na początku fazy bólu (nie w aurze) i nie wolno łączyć ich z ergotaminą (<24 h).',
    tip: 'Zapamiętaj triadę pułapek w migrenie: brak estrogenów w migrenie z aurą, brak walproinianu u kobiet w wieku rozrodczym i zakaz łączenia tryptanu z ergotaminą.',
    gap: {
      pool: 'Tradycyjna profilaktyka pierwszego rzutu obejmuje β-blokery (propranolol), topiramat, amitryptylinę oraz (poza ciążą/wiekiem rozrodczym) walproinian; leczenie doraźne to NLPZ i tryptany.',
      now: 'Aktualne wytyczne IHS/EAN rekomendują przeciwciała anty-CGRP (erenumab, fremanezumab, galkanezumab, eptinezumab) i gepanty (rimegepant, atogepant) także wcześnie w profilaktyce, a rimegepant doraźnie przy przeciwwskazaniach naczyniowych do tryptanów.'
    }
  },
  {
    t: 'tac',
    mod: '7',
    stem: '36-letni mężczyzna od 2 tygodni budzi się codziennie ok. godz. 02:00 z powodu rozrywającego bólu za lewym okiem trwającego 45 minut. Podczas ataku chodzi niespokojnie po pokoju, ma zaczerwienioną lewą spojówkę, obfite łzawienie, wodnisty wyciek z lewego nozdrza oraz niepełny zespół Hornera po stronie lewej. Które postępowanie przerywa taki napad najszybciej?',
    o: [
      'Karbamazepina 400 mg p.o. jednorazowo',
      '100% tlen przez maskę z rezerwuarem (12–15 L/min przez 15 min) oraz/lub sumatryptan 6 mg s.c.',
      'Ibuprofen 400 mg p.o. i leżenie w zaciemnionym, cichym pomieszczeniu',
      'Prednizon 60 mg p.o. jako jedyny lek doraźny działający w kilka minut'
    ],
    k: 1,
    c: 'src',
    s: 'Sylabus PUM [7] · Wykład TK03 · TAC',
    why: 'Obraz odpowiada klasterowemu bólowi głowy (czas trwania 15–180 min, okołodobowa powtarzalność w nocy, pobudzenie psychoruchowe i ipsilateralne objawy autonomiczne). Leczeniem przerywającym I rzutu są inhalacje 100% tlenu o wysokim przepływie (12–15 L/min) oraz podskórny sumatryptan 6 mg. Prednizon służy do krótkiej terapii pomostowej przed osiągnięciem efektu werapamilu, a nie do przerywania pojedynczego napadu.',
    tip: 'Klaster = pobudzenie + łzawienie/Horner + 15–180 min. Doraźnie: 100% O₂ + sumatryptan s.c.; profilaktycznie: werapamil (z kontrolą EKG).'
  },
  {
    t: 'tac',
    mod: '7',
    stem: '29-letnia kobieta od 3 tygodni odczuwa napadowe, trwające ułamek sekundy przeszycia przypominające „rażenie prądem” w zakresie szczęki i żuchwy po obu stronach twarzy, wyzwalane myciem zębów i lekkim dotykiem. W badaniu stwierdzono osłabienie odruchu rogówkowego po stronie prawej. Jakie jest najwłaściwsze postępowanie?',
    o: [
      'Rozpoznanie pierwotnej neuralgii nerwu V i włączenie paracetamolu z ibuprofenem',
      'Pilne MRI mózgu z kontrastem w celu wykluczenia wtórnej neuralgii (np. SM lub guza kąta mostowo-móżdżkowego) oraz włączenie karbamazepiny/okskarbazepiny',
      'Podanie sumatryptanu 6 mg s.c. i obserwacja przez 4 tygodnie',
      'Zastosowanie indometacyny jako swoistego leku pierwszego rzutu w neuralgii nerwu trójdzielnego',
      'Skierowanie chorej wyłącznie na ekstrakcję zębów przedtrzonowych'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM [7] · Wykład TK03 / Ćw TK04 · Neuralgia V',
    why: 'Młody wiek (<40 r.ż.), obustronne występowanie bólu oraz ubytek w badaniu nerwu V (osłabiony odruch rogówkowy) są czerwonymi flagami neuralgii objawowej — klasycznie w przebiegu stwardnienia rozsianego (SM) lub guza kąta mostowo-móżdżkowego. Konieczne jest MRI z kontrastem, a leczeniem farmakologicznym I rzutu pozostaje karbamazepina (lub okskarbazepina). Indometacyna jest testem/lekiem swoistym dla hemikranii napadowej.',
    tip: 'Młody wiek + neuralgia V (zwłaszcza obustronna lub z ubytkiem czucia/odruchu rogówkowego) → pomyśl o stwardnieniu rozsianym [9] i zleć MRI!'
  },
  {
    t: 'rwa',
    mod: '8',
    stem: '44-letni mężczyzna skarży się na ból krzyża promieniujący po bocznej stronie uda i podudzia aż do grzbietu stopy i palucha po stronie prawej. W badaniu: dodatni objaw Lasègue’a przy 40°, osłabienie zgięcia grzbietowego stopy i prostowania palucha po prawej (nie potrafi stanąć na pięcie), natomiast odruch kolanowy i skokowy są obustronnie żywe i symetryczne. Który korzeń nerwowy jest uciśnięty?',
    o: [
      'Korzeń L3 (przepuklina na poziomie L2–L3)',
      'Korzeń L4 (przepuklina na poziomie L3–L4)',
      'Korzeń L5 (najczęściej przepuklina na poziomie L4–L5)',
      'Korzeń S1 (najczęściej przepuklina na poziomie L5–S1)'
    ],
    k: 2,
    c: 'inf',
    s: 'Sylabus PUM [8] · W03h / Ćw TK12 · Topografia L4–S1',
    why: 'Zespół korzeniowy L5 (typowo z przepukliny krążka L4–L5) daje ból wzdłuż bocznej powierzchni kończyny do grzbietu stopy i palucha, osłabienie prostowników stopy i palucha (trudność w staniu na piętach, opadanie stopy) oraz PRAWIDŁOWE odruchy kolanowy (L3–L4) i skokowy (S1). Odruch skokowy zanika w uszkodzeniu S1 (przepuklina L5–S1).',
    tip: 'Pułapka topograficzna: przepuklina L4–L5 uciska korzeń L5 (brak zaburzeń odruchów głębokich!), a przepuklina L5–S1 uciska S1 (brak odruchu skokowego).'
  },
  {
    t: 'rwa',
    mod: '8',
    stem: '51-letni pacjent zgłasza ból szyi promieniujący przez ramię i przedramię do palca środkowego lewej ręki, nasilający się przy próbie Spurlinga. W badaniu neurologicznym stwierdzono osłabienie wyprostu w lewym stawie łokciowym oraz wyraźnie osłabiony odruch z mięśnia trójgłowego ramienia. Który korzeń szyjny odpowiada za ten zespół?',
    o: [
      'Korzeń C5',
      'Korzeń C6',
      'Korzeń C7',
      'Korzeń C8'
    ],
    k: 2,
    c: 'own',
    s: 'Sylabus PUM [8] · Ćw TK12 · Bóle barku i radikulopatia szyjna',
    why: 'Najczęstsza radikulopatia szyjna dotyczy korzenia C7 (przepuklina C6–C7): ból i parestezje sięgają palca środkowego, osłabiony jest mięsień trójgłowy ramienia (prostowanie łokcia), a odruch z mięśnia trójgłowego ulega osłabieniu lub zniesieniu. Korzeń C6 unerwia kciuk/palec wskazujący i odruch z m. ramienno-promieniowego/dwugłowego, a C8 palec mały oraz mięśnie drobne ręki.',
    tip: 'Zapamiętaj 7-kę w szyi: C7 = triceps + prostowanie łokcia + środkowy palec (najczęstsza radikulopatia szyjna).'
  },
  {
    t: 'ogon',
    mod: '8',
    stem: '52-letni mężczyzna po dźwignięciu ciężaru odczuł gwałtowny ból krzyża promieniujący do obu pośladków. Po 8 godzinach pojawiło się znieczulenie okolicy krocza („spodenki jeździeckie”), zatrzymanie moczu mimo pełnego pęcherza oraz osłabienie zgięcia podeszwowego stóp. Które stwierdzenie opisuje prawidłową interpretację i postępowanie?',
    o: [
      'Należy zastosować leczenie zachowawcze NLPZ przez 4 tygodnie i dopiero przy braku poprawy wykonać MRI kręgosłupa',
      'Jest to zespół ogona końskiego (uszkodzenie LMN) wymagający pilnego MRI kręgosłupa L-S i pilnej dekompresji neurochirurgicznej',
      'W tym zespole charakterystyczne jest wygórowanie odruchów skokowych i obustronny objaw Babińskiego',
      'Najczulszym objawem potwierdzającym ten zespół jest izolowany odwrócony objaw Lasègue’a (Mackiewicza) przy prawidłowej mikcji'
    ],
    k: 1,
    c: 'did',
    s: 'Sylabus PUM [8] · W03h / Sem TK11 · Zespół ogona końskiego',
    why: 'Ból korzeniowy z zaburzeniami zwieraczy (retencja moczu) i znieczuleniem okolicy krocza w kształcie „spodenek jeździeckich” to obraz zespołu ogona końskiego (CES) — pilnego stanu neurochirurgicznego. Ponieważ w skład ogona końskiego wchodzą korzenie poniżej L1/L2, jest to uszkodzenie obwodowe (LMN): odruchy głębokie i odbytowy ulegają zniesieniu, a objaw Babińskiego nie występuje.',
    tip: 'Każdy ból krzyża ze świeżymi zaburzeniami mikcji lub znieczuleniem krocza = natychmiastowe MRI L-S i pilny neurochirurg (<24–48 h).',
    gap: {
      pool: 'W pytaniach testowych rozpoznanie ogona końskiego opiera się na klasycznej triadzie pełnoobjawowej: znieczulenie siodłowe, ostre zatrzymanie moczu/nietrzymanie stolca i niedowład wiotki kończyn.',
      now: 'Wytyczne NICE/BASS podkreślają pilne MRI już na etapie tzw. CES-suspected / incomplete (np. samo pogorszenie czucia krocza lub osłabienie strumienia moczu), zanim dojdzie do nieodwracalnego zatrzymania moczu z przepełnienia.'
    }
  }
];
