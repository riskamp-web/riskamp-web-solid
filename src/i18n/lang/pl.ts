
/** generated Sun Sep 21 2026 by Claude Opus 4.8 <noreply@anthropic.com> */

import type { DeepPartial, I18N } from '~/i18n/i18n';

/**
 * a translation is a partial mirror of en.ts: supply what you have, and english
 * fills in the rest at load. `satisfies` rather than an annotation, so a key
 * that doesn't exist in english is an error here instead of a string nobody
 * ever reads.
 */
export default {

  test: {
    title: 'Test',
  },

  'update-language': {
    title: 'Ustawienia języka...',
  },

  'select-language-dialog': {
    'title': 'Ustawienia języka',
    'select-language': 'Wybierz język',
    'system-setting': 'Ustawienie systemowe',
    'decimal-separator': 'Separator dziesiętny',
    'decimal-separator-dot': 'Kropka',
    'decimal-separator-comma': 'Przecinek',
  },

  about: {
    tagline: 'Analiza ryzyka metodą Monte Carlo dla sieci Web.',
    build: 'Kompilacja {commit}',
    copyright: '© {year} Structured Data LLC. Wszelkie prawa zastrzeżone.',
    website: 'riskamp.com',
    'old-website-version': 'Szukasz starej wersji RiskAMP web? Użyj {link}',
    report: 'Zgłoś problem',
    'report-subject': 'RiskAMP web — zgłoszenie problemu',
    'report-body': '(opisz tutaj problem)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nPrzeglądarka: {ua}\nJęzyk: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Plik',
      help: 'Pomoc',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Dane i analiza',
      tools: 'Narzędzia',
      account: 'Konto',
    },

    'menu-commands': {
      documents: 'Dokumenty',
      'account-page': 'Strona konta',
      'sign-out': 'Wyloguj się',
    },

    tabs: {
      home: 'Narzędzia główne',
      layout: 'Układ',
      format: 'Format',
      insert: 'Wstawianie',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Dane i analiza',
    },

    menu: {
      'about-riskamp': 'O programie RiskAMP web',
      'function-documentation': 'Dokumentacja funkcji RiskAMP',
      walkthrough: 'Model demonstracyjny',
      contact: 'Kontakt',
    },

    button: {
      'toggle-fullscreen': 'Przełącz pełny ekran',

      'new-spreadsheet': 'Nowy arkusz',
      'import-file': 'Importuj plik',
      'open-file': 'Otwórz plik',
      'save-file': 'Zapisz plik',
      'save-file-as': 'Zapisz jako...',
      'revert-file': 'Przywróć plik',
      'save-to-desktop': 'Zapisz na pulpicie',
      'export-xlsx': 'Eksportuj XLSX',
      'export-csv': 'Eksportuj CSV',

      'sign-in': 'Zaloguj się',
      'create-account': 'Utwórz konto',

      'search-cells': {
        label: 'Szukaj w komórkach',
      },
      'defined-names': {
        label: 'Nazwy zdefiniowane',
      },
      'fit-data': {
        label: 'Dopasuj dane',
      },
      notes: {
        label: 'Notatki',
      },

      'monte-carlo-simulation': {
        label: 'Symulacja Monte Carlo',
      },
      'run-simulation': {
        label: 'Uruchom symulację',
      },
      'run-simulation-again': {
        label: 'Uruchom symulację ponownie',
      },
      'las-vegas-simulation': {
        label: 'Symulacja Las Vegas',
      },
      'simulation-settings': {
        label: 'Ustawienia symulacji',
      },
      'quick-view': {
        label: 'Szybki podgląd',
      },
      'quick-view-correlation': {
        label: 'Korelacja szybkiego podglądu',
      },
      recalculate: {
        label: 'Przelicz ponownie',
      },

      'align-left': {
        label: 'Wyrównaj do lewej',
      },
      'align-center': {
        label: 'Wyśrodkuj',
      },
      'align-right': {
        label: 'Wyrównaj do prawej',
      },

      'align-top': {
        label: 'Wyrównaj do góry',
      },
      'align-middle': {
        label: 'Wyśrodkuj w pionie',
      },
      'align-bottom': {
        label: 'Wyrównaj do dołu',
      },

      'increase-indent': {
        label: 'Zwiększ wcięcie',
      },
      'decrease-indent': {
        label: 'Zmniejsz wcięcie',
      },
      'wrap-text': {
        label: 'Zawijaj tekst',
      },

      'toggle-integer-grouping': {
        label: 'Przełącz grupowanie',
      },
      'increase-decimal-precision': {
        label: 'Zwiększ dokładność',
      },
      'decrease-decimal-precision': {
        label: 'Zmniejsz dokładność',
      },

      'merge-cells': {
        label: 'Scal komórki',
      },
      'unmerge-cells': {
        label: 'Rozdziel komórki',
      },

      'lock-cells': {
        label: 'Zablokuj komórki do edycji',
      },
      'unlock-cells': {
        label: 'Odblokuj komórki do edycji',
      },

      bold: {
        label: 'Przełącz pogrubienie',
      },
      italic: {
        label: 'Przełącz kursywę',
      },
      underline: {
        label: 'Przełącz podkreślenie',
      },
      strikethrough: {
        label: 'Przełącz przekreślenie',
      },

      'insert-row': {
        label: 'Wstaw wiersz',
      },
      'insert-column': {
        label: 'Wstaw kolumnę',
      },
      'delete-row': {
        label: 'Usuń wiersz',
      },
      'delete-column': {
        label: 'Usuń kolumnę',
      },

      'text-color': {
        label: 'Kolor tekstu',
      },
      'background-color': {
        label: 'Kolor tła',
      },
      'border-color': {
        label: 'Kolor obramowania',
      },

      'border-top': {
        title: 'Obramowanie górne',
      },
      'border-bottom': {
        title: 'Obramowanie dolne',
      },
      'border-double-bottom': {
        title: 'Podwójne obramowanie dolne',
      },
      'border-left': {
        title: 'Obramowanie lewe',
      },
      'border-right': {
        title: 'Obramowanie prawe',
      },
      'border-all': {
        title: 'Wszystkie obramowania',
      },
      'border-none': {
        title: 'Usuń obramowania',
      },
      'border-outside': {
        title: 'Obramowania zewnętrzne',
      },

      'correlation-matrix': {
        title: 'Macierz korelacji',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline kolumnowy',
      'sparkline-line': 'Sparkline liniowy',

      insert: {
        'bar-chart': 'Wykres słupkowy',
        'donut-chart': 'Wykres pierścieniowy',
        'column-chart': 'Wykres kolumnowy',
        'line-chart': 'Wykres liniowy',
        'scatter-plot': 'Wykres punktowy',
        'area-chart': 'Wykres warstwowy',
        image: 'Obraz',

        comment: 'Komentarz',
        table: 'Tabela',
      },

      forecast: 'Prognozowanie trendów',
    },

    'open-menu': 'Otwórz menu',

    'more-commands-button': {
      label: 'Więcej poleceń...',
    },

    combobox: {
      'font-size': {
        label: 'Rozmiar czcionki',
      },
      'number-format': {
        label: 'Format liczb',
      },
    },

    label: {
      'spreadsheet-cells': 'Komórki arkusza',
    },

    message: {
      'changes-stored-in-browser': 'Zmiany są przechowywane w pamięci przeglądarki do momentu ich zapisania lub przywrócenia.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'Dokumentacja RiskAMP',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Wstecz',
        forward: 'Dalej',
      },
    },
    label: {
      'close-sidebar': 'Zamknij panel boczny',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Obliczenia równoległe',
        'max-workers': 'Liczba wątków roboczych (maksymalnie)',
        'explanatory-text': `Użycie większej liczby wątków roboczych równolegle poprawi wydajność symulacji w przypadku złożonych modeli. W większości przypadków zalecamy 4 lub 8 wątków roboczych.`,
      },

      'random-sampling': {
        'section-header': 'Próbkowanie losowe',
        'explanatory-text': 'Metoda próbkowania zostanie zapisana z tym arkuszem.\nWybrana tutaj wartość będzie także używana jako domyślna dla nowych arkuszy.',
      },

      'random-seed': {
        'section-header': 'Ziarno losowe',
        'explanatory-text': 'Ziarno losowe zostanie zapisane z tym arkuszem.\nWprowadź liczbę, aby użyć stałego ziarna, lub wprowadź 0, aby w każdej symulacji używać losowego ziarna.',

        'enter-seed-value': 'Wprowadź ziarno',
        'seed-value': 'Wartość ziarna',
        'reset-seed-value': 'Zresetuj ziarno',
        'time-based-seed': 'Użyj ziarna opartego na czasie',
      },

      title: 'Ustawienia symulacji',
      'latin-hypercube-sampling': 'Próbkowanie metodą hipersześcianu łacińskiego (LHS)',
      'standard-random-sampling': 'Standardowe próbkowanie losowe',

      'fixed-random-seed': 'Stałe ziarno',
      'seed-value-placeholder-text': 'Wartość ziarna',
    },

    'notes-panel': {
      title: 'Notatki',
      'open-notes-with-spreadsheet': 'Otwieraj notatki wraz z arkuszem',
      edit_markdown: 'Edytuj markdown',
      view_formatted: 'Wyświetl sformatowane',
    },
    'fit-data-panel': {
      title: 'Dopasuj dane',
    },
  },

  'color-picker': {
    choose_color: 'Wybierz kolor',
    use_selected_color: 'Użyj wybranego koloru',
    theme_colors: 'Kolory motywu',
    other_colors: 'Inne kolory',
    no_color: 'Brak koloru',
    new_color: 'Nowy kolor',
    default_text_color: 'Domyślny kolor tekstu',
    default_border_color: 'Domyślny kolor obramowania',
    no_fill: 'Brak wypełnienia',

    theme: {
      background: 'Tło',
      text: 'Tekst',
      accent: 'Akcent',
      lighter: 'Jaśniejszy',
      darker: 'Ciemniejszy',
    },
  },

  'names-panel': {
    title: 'Nazwy zdefiniowane',
    header: {
      name: 'Nazwa',
      'name-scope': 'Zakres',
      value: 'Wartość',
    },
    'name-scope': {
      sheet: 'Arkusz',
      workbook: 'Skoroszyt',
    },
    label: {
      'delete-name': 'Usuń nazwę',
      'define-name': 'Zdefiniuj nazwę',
      'edit-name': 'Edytuj nazwę',
    },
    'name-type': {
      reference: 'Odwołanie',
      expression: 'Wyrażenie',
    },
  },

  'search-panel': {
    title: 'Szukaj w komórkach',
    'search-text': {
      placeholder: 'Szukany tekst',
    },
    'search-in': {
      text: 'Szukaj w',
    },
    'search-type': {
      'cell-values': 'Wartości',
      'cell-formulas': 'Formuły',
      wildcards: 'Symbole wieloznaczne',
    },
    'search-scope': {
      'current-sheet': 'Bieżący arkusz',
      'all-sheets': 'Wszystkie arkusze',
    },
    'search-results': {
      header: {
        address: 'Adres',
        value: 'Wartość',
        formula: 'Formuła',
      },
      information: {
        'enter-text': 'Wprowadź tekst do wyszukania',
        result: 'wynik',
        results: 'wyniki',
      },
    },
  },
  'forecast-dialog': {
    title: 'Prognozowanie trendów',
    parameters: {
      dates: {
        title: 'Daty',
      },
      values: {
        title: 'Wartości',
      },
      periods: 'Okresy prognozy',
      seasonality: 'Sezonowość',

      'fill-empty': 'Wypełnij',
      'aggregate-multiple': 'Agreguj',
      'project-forward-periods': 'Okresy',
      'chart-type': {
        label: 'Typ wykresu',
      },
      'chart-type-line-chart': 'Liniowy',
      'chart-type-column-chart': 'Kolumnowy',
    },
    options: {
      'model-type': 'Model',
      'forecast-type': 'Typ prognozy',
    },
    'model-type': {
      'excel-compatible-forecast': 'Zgodny z Excel',
      'static-forecast': 'Statyczna',
      'stochastic-forecast': 'Stochastyczna',
    },
    settings: 'Ustawienia',
    'create-forecast-sheet': 'Utwórz arkusz prognozy',
    seasonality: {
      'auto-detect': 'Wykryj automatycznie',
    },
    'fill-options': {
      interpolate: 'Interpoluj',
      zeros: 'Zera',
    },
    'aggregate-options': {
      average: 'Średnia',
      median: 'Mediana',
      min: 'Min',
      max: 'Maks',
      sum: 'Suma',
      count: 'Liczność',
    },

    'chart-labels': {
      values: 'Wartości',
      forecast: 'Prognoza',
    },
  },

  'forecast-sheet-timeline-header': 'Oś czasu',
  'forecast-sheet-values-header': 'Wartości',
  'forecast-sheet-forecast-header': 'Prognoza',
  'forecast-sheet-sample-header': 'Próbka',
  'forecast-sheet-statistics-header': 'Statystyki',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Średnia',
    },
    'p80-range': {
      header: 'Zakres P80',
    },
  },

  'sparkline-dialog': {
    title: 'Wstaw sparkline',
    parameters: {
      target: {
        title: 'Komórka docelowa',
        'overwrite-warning': 'Dane w zakresie docelowym zostaną nadpisane',
        'merge-warning': 'Wybrane komórki zostaną scalone dla sparkline',
      },
      source: {
        title: 'Zakres danych źródłowych',
      },
    },
    info: 'Użyj koloru pierwszego planu i tła komórki, aby ostylować sparkline',

    'sparkline-type': 'Typ sparkline',
    'sparkline-type-line-chart': 'Liniowy',
    'sparkline-type-column-chart': 'Kolumnowy',
  },

  'quick-view-dialog': {
    title: 'Szybki podgląd',
    'select-cell': 'Wybierz komórkę',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Wykres pudełkowy',
    'show-statistics': 'Statystyki',
    'histogram-bin-algorithm-long': 'Algorytm przedziałów',
    'histogram-bin-algorithm-short': 'Przedziały',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Typ wąsów',
    'box-plot-whisker-type-short': 'Wąsy',
    'box-plot-whisker-type-minmax': 'Min/maks',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Brak danych symulacji dla wybranej komórki. Uruchom symulację za pomocą przycisku poniżej, aby zebrać dane dla tej komórki.\n\nDane symulacji będą zbierane automatycznie, gdy komórka jest przywoływana przez funkcję statystyczną (taką jak SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Maks',
      first_quartile: '1. kwartyl',
      third_quartile: '3. kwartyl',
      median: 'Mediana',
      'interquartile-range': 'IQR',
      mean: 'Średnia',
      variance: 'Wariancja',
      'standard-deviation': 'Odch. std',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Zablokuj wybór szybkiego podglądu',
        'click-to-unlock': 'Odblokuj wybór szybkiego podglądu',
        'return-to-selection': 'Wróć do wybranej komórki',
        'selection-locked': 'Wybór zablokowany',
      },
    },
  },

  'dialog-close-label': 'Zamknij',
  'dialog-close-title': 'Zamknij okno dialogowe',
  'dialog-help-title': 'Pomoc',

  'standard-buttons': {
    close: {
      label: 'Zamknij',
      title: 'Zamknij okno dialogowe',
    },
    apply: {
      title: 'Zastosuj',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Wstecz',
    },
    yes: {
      title: 'Tak',
    },
    no: {
      title: 'Nie',
    },
    accept: {
      title: 'Akceptuj',
    },
    cancel: {
      title: 'Anuluj',
    },
  },

  'confirm-dialog': {
    title: 'Czy na pewno?',
    'alert-title': 'Ostrzeżenie',
    confirm: 'Potwierdź',
    cancel: 'Anuluj',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Symulacja Monte Carlo',
  'run-simulation': {
    'number-of-trials': 'Liczba prób',
    'screen-updates': 'Pokaż aktualizacje ekranu',
    starting: 'Rozpoczynanie...',
    'percent-complete': 'ukończono',
  },
  'run-simulation-start-label': 'Rozpocznij',
  'run-simulation-start-title': 'Rozpocznij symulację',
  'run-simulation-cancel-label': 'Zatrzymaj',
  'run-simulation-cancel-title': 'Zatrzymaj symulację',

  'load-error': {
    'loading-document-failed': 'Nie można było załadować żądanego pliku',
  },

  'save-as-dialog': {
    'default-title': 'Zapisz jako',
    'rename-title': 'Zmień nazwę dokumentu',
    'duplicate-title': 'Duplikuj dokument',
    folder: 'Folder',
    name: 'Nazwa',
    access: 'Dostęp',
    public: 'Publiczny',
    private: 'Prywatny',
    save: 'Zapisz',
    overwrite: 'Nadpisz',
    'folder-placeholder': 'Opcjonalnie — np. finanse/raporty',
    'name-placeholder': 'Nazwa dokumentu',
    'preview-label': 'Zostanie zapisany jako',
    'copy-link': 'Kopiuj link',
    'copy-link-copied': 'Link skopiowany',
    collision: 'W tej ścieżce istnieje już dokument.',
    'collision-blocked': 'W tej ścieżce istnieje już dokument. Wybierz inną nazwę.',
    empty: 'Wprowadź nazwę',
    saved: 'Zapisano „{name}”',
    'save-failed': 'Nie można zapisać „{name}”.',
    retry: 'Spróbuj ponownie',
    'overwrite-confirm-title': 'Nadpisać dokument?',
    'overwrite-confirm-message': 'W lokalizacji „{name}” istnieje już dokument. Nadpisanie zastąpi jego zawartość. Czy na pewno?',

    'path-exists-title': 'Dokument istnieje',
    'path-exists-message': 'Dokument o tej ścieżce już istnieje. Usuń najpierw ten dokument, jeśli chcesz ponownie wykorzystać tę ścieżkę.',

  },

  toast: {
    'region-label': 'Powiadomienia',
    dismiss: 'Odrzuć',
  },

  'las-vegas-simulation-panel': {
    title: 'Symulacja Las Vegas',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Akceptuj',
        description: 'Akceptuj to komórka, która zwraca TRUE lub FALSE, aby przyjąć lub odrzucić próbę. Wymagane.',
      },
      complete: {
        title: 'Zakończ',
        description: 'Zakończ to komórka, która zwraca TRUE, aby zakończyć symulację, lub liczbę przyjętych prób. Wymagane.',
      },
      fail: {
        title: 'Niepowodzenie',
        description: 'Niepowodzenie to komórka, która zwraca TRUE, aby zakończyć symulację, lub maksymalną łączną liczbę prób. Opcjonalne.',
      },
    },
    'more-information-link': {
      title: 'Więcej informacji',
    },
    'running-simulation': 'Trwa wykonywanie symulacji...',
    'options-overview': 'Wprowadź opcje symulacji Las Vegas.',
  },

  'insert-function': {
    button: {
      title: 'Wstaw funkcję...',
    },
    'insert-function': 'Wstaw funkcję',
    'search-for-function': 'Szukaj funkcji...',
    'function-result': 'Wynik',
  },

  'function-dialog': {
    'select-function': {
      title: 'Wybierz funkcję',
    },
  },

  'arguments-dialog': {
    'function-result': 'Wynik',
    volatile: 'ulotna',
    'function-help-title': 'Pomoc dotycząca tej funkcji',
  },

  'number-format': {
    general: 'Ogólne',
    number: 'Liczba',
    integer: 'Liczba całkowita',
    percent: 'Procent',
    fraction: 'Ułamek',
    accounting: 'Księgowy',
    currency: 'Walutowy',
    scientific: 'Naukowy',

    timestamp: 'Znacznik czasu',
    'long-date': 'Data długa',
    'short-date': 'Data krótka',
  },

  'llm-chat': {
    panel: {
      title: 'Asystent AI',
    },
    'settings-tab': {
      title: 'Ustawienia',
    },
    'chat-tab': {
      title: 'Czat',
    },
    'change-model': {
      title: 'Zmienić model?',
      message: 'Ten model korzysta z innego dostawcy, więc bieżąca rozmowa zostanie wyczyszczona. Kontynuować?',
      confirm: 'Zmień model',
    },
    buttons: {
      'send-message': 'Wyślij',

      'clear-conversation': 'Wyczyść rozmowę',
      save: 'Zapisz na pulpicie',
      resend: 'Wyślij ponownie ostatnią wiadomość',
      restart: 'Rozpocznij od pierwszej wiadomości',
    },

    label: {
      'api-key': 'Klucz API',
      'api-key-placeholder': 'Wklej swój klucz API',
      'reveal-api-key': 'Pokaż klucz API',
      'hide-api-key': 'Ukryj klucz API',
      model: 'Model',
      'choose-a-model': 'Wybierz model',
      'select-a-model': 'Wybierz model',
      header: {
        important: 'Ważne',
      },
      disclaimer: 'Interfejs AI działa w trybie „przynieś własny klucz”. Aby z niego korzystać, musisz podać klucz API obsługiwanego dostawcy lub modelu.\nNigdy nie widzimy Twojego klucza API. Pozostaje on w Twojej przeglądarce i jest wysyłany do oficjalnego dostawcy tylko wtedy, gdy wysyłasz wiadomość na czacie.\nDostawca modelu obciąży Cię opłatą za tokeny lub w ramach Twojego planu subskrypcji.',

      provider_link: 'Strona internetowa dostawcy',
      model_information_link: 'Informacje o modelu',
      screenshots_disabled: 'Uwaga: ten model nie obsługuje zrzutów ekranu.',

    },

    // transient status shown while the assistant is working; these steps are
    // never persisted as message blocks (see chat-messages.tsx activity()).
    activity: {
      thinking: 'Myślę…',
      working: 'Pracuję…',
      running: 'Uruchamianie {tool}…',
    },

    error: {
      unknown: 'nieznany błąd',
      'unknown-type': 'nieznany typ',
    },
  },

  'developer-panel': {
    title: 'Informacje dla programistów',
  },

  'fit-data-panel': {
    'select-range': 'Wybierz zakres',
    'candidate-distributions': {
      label: 'Rozkłady kandydujące',
      description: 'Kandydaci są sortowani według najlepszego dopasowania do rozkładu teoretycznego',
    },
    'log-normal-graph': {
      description: 'Wykres logarytmiczno-normalny jest rysowany w skali logarytmicznej',
    },
    statistics: {
      error: 'Błąd',
      mean_square_error: 'Błąd średniokwadratowy',
      aggregate_error: 'Błąd zagregowany',
      max_error: 'Błąd maksymalny',
      mean_error: 'Błąd średni',
    },

    label: {
      'click-to-lock': 'Zablokuj wybór dopasowania danych',
      'click-to-unlock': 'Odblokuj wybór dopasowania danych',
    },

    'distribution-parameters': 'Parametry rozkładu',
    'spreadsheet-function': 'Funkcja arkusza',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Kopiuj do schowka',
      error: 'Błąd kopiowania',
      copied: 'Skopiowano',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Brak pasujących poleceń',
    'start-typing': 'Zacznij pisać, aby znaleźć polecenie',
    'run-highlighted-command': 'Naciśnij Enter, aby uruchomić wyróżnione polecenie',
    'command-palette': {
      label: 'Paleta poleceń',
    },
  },

  'documents-page': {
    title: 'Dokumenty',

    scope: {
      all: 'Wszystkie dokumenty',
      starred: 'Oznaczone gwiazdką',
      recent: 'Ostatnie',
      private: 'Prywatne',
    },

    rail: {
      label: 'Filtry dokumentów',
      folders: 'Foldery',
      'no-folders': 'Brak folderów',
    },

    search: {
      placeholder: 'Szukaj dokumentów',
      label: 'Szukaj dokumentów',
      clear: {
        label: 'Wyczyść wyszukiwanie',
      },
    },
    filter: {
      label: 'Filtruj',
    },

    action: {
      'new-document': 'Nowy dokument',
      open: 'Otwórz',
      duplicate: 'Duplikuj',
      rename: 'Zmień nazwę…',
      'delete': 'Usuń',
      cancel: 'Anuluj',
      'make-public': 'Ustaw jako publiczny',
      'make-private': 'Ustaw jako prywatny',
      'version-history': 'Historia wersji',
    },

    access: {
      public: 'Publiczny',
      private: 'Prywatny',
    },

    selection: {
      count: {
        one: 'Zaznaczono: {count}',
        other: 'Zaznaczono: {count}',
      },
      'make-public': {
        label: 'Ustaw zaznaczone dokumenty jako publiczne',
      },
      'make-private': {
        label: 'Ustaw zaznaczone dokumenty jako prywatne',
      },
      'delete': {
        label: 'Usuń zaznaczone dokumenty',
      },
    },

    table: {
      label: 'Dokumenty',
      'select-all': {
        label: 'Zaznacz wszystkie dokumenty',
      },
    },
    column: {
      starred: 'Gwiazdka',
      name: 'Nazwa',
      folder: 'Folder',
      access: 'Dostęp',
      version: 'Wersja',
      modified: 'Zmodyfikowano',
      actions: 'Akcje',
    },

    row: {
      select: {
        label: 'Zaznacz {name}',
      },
      star: {
        label: 'Oznacz {name} gwiazdką',
      },
      unstar: {
        label: 'Usuń gwiazdkę z {name}',
      },
      menu: {
        label: 'Akcje dla {name}',
      },
      unnamed: {
        title: 'Ten dokument nie ma jeszcze nazwy',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Usunąć dokument, czy na pewno?',
      confirm_delete_documents: 'Usunąć dokumenty, czy na pewno?',
    },

    error: {
      title: 'Nie można załadować Twoich dokumentów',
      detail: 'Ładowanie nie powiodło się z powodu błędu. Spróbuj ponownie później.',
      retry: 'Spróbuj ponownie',
    },

    messages: {
      rename_failed: 'Zmiana nazwy nie powiodła się. Spróbuj ponownie później.',
      rename_succeeded: 'Zmieniono nazwę dokumentu',

      delete_failed: 'Usuwanie nie powiodło się. Spróbuj ponownie później.',
      one_document_deleted: 'Usunięto dokument',
      multiple_documents_deleted: 'Usunięto dokumenty',

      update_failed: 'Aktualizacja nie powiodła się. Spróbuj ponownie później.',

      duplicate_succeeded: 'Utworzono dokument',
      duplicate_failed: 'Duplikowanie nie powiodło się. Spróbuj ponownie później.',

      restore_succeeded: 'Przywrócono dokument',
      restore_failed: 'Przywracanie nie powiodło się. Spróbuj ponownie później.',

    },

    empty: {
      title: 'Brak dokumentów',
      detail: 'Arkusze, które utworzysz lub zaimportujesz, pojawią się tutaj wraz z historią wersji.',
    },

    'no-match': {
      title: 'Żaden dokument nie pasuje do „{query}”',
      detail: 'Wyszukiwanie obejmuje wszystkie foldery. Spróbuj krótszego terminu.',
      action: 'Wyczyść wyszukiwanie',
    },

    'empty-filter': {
      title: 'Nic tu nie ma',
      detail: 'Żaden dokument nie pasuje do tego filtra.',
      'detail-folder': 'Brak dokumentów w folderze {folder}.',
      action: 'Pokaż wszystkie dokumenty',
    },

    footer: {
      count: {
        one: '{count} dokument',
        other: '{count} dokumentów',
      },
      filtered: '{count} z {total} dokumentów',
      'searching-all': 'przeszukiwanie wszystkich folderów',
    },

    panel: {
      label: 'Szczegóły dokumentu',
      open: {
        title: 'Otwórz dokument',
      },
      close: {
        label: 'Zamknij szczegóły',
      },
      'copy-link': {
        label: 'Kopiuj link',
        copied: {
          label: 'Link skopiowany',
          title: 'Skopiowano',
        },
      },
      'unnamed-hint': 'Brak nazwy — to jest adres. Zmiana nazwy ją ustawia.',
      star: {
        label: 'Oznacz ten dokument gwiazdką',
      },
      unstar: {
        label: 'Usuń gwiazdkę z tego dokumentu',
      },
      field: {
        access: 'Dostęp',
        starred: 'Gwiazdka',
        created: 'Utworzono',
        modified: 'Zmodyfikowano',
        version: 'Wersja',
      },
    },

    history: {
      title: 'Starsze wersje',
      loading: 'Ładowanie historii wersji',
      error: 'Nie można załadować historii wersji.',
      retry: 'Spróbuj ponownie',
      menu: {
        label: 'Akcje dla wersji {version}',
      },
      open: {
        text: 'Otwórz tę wersję',
        label: 'Otwórz wersję {version}',
      },
      duplicate: 'Duplikuj jako nowy dokument',
      restore: 'Przywróć',
      none: 'Brak starszych wersji. Pojawią się tutaj w miarę zapisywania.',
      kept: {
        one: 'Zachowywana jest jedna starsza wersja.',
        other: 'Zachowywane są ostatnie {count} starsze wersje.',
      },
    },

    time: {
      'just-now': 'przed chwilą',
      minutes: {
        one: '{count} minutę temu',
        other: '{count} minut temu',
      },
      hours: {
        one: '{count} godzinę temu',
        other: '{count} godzin temu',
      },
      days: {
        one: '{count} dzień temu',
        other: '{count} dni temu',
      },
      today: 'dzisiaj, {time}',
      yesterday: 'wczoraj, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Dokument',
    },
    'updated-date': {
      label: 'Zaktualizowano',
    },
    'created-date': {
      label: 'Utworzono',
    },
    access: {
      label: 'Dostęp',
      'type-private': 'Prywatny',
      'type-public': 'Publiczny',
    },
    'filter-documents': {
      label: 'Filtruj dokumenty',
    },

    controls: {
      'delete-selected': 'Usuń zaznaczone',
      'make-public': 'Ustaw jako publiczny',
      'make-private': 'Ustaw jako prywatny',
    },
  },

  'account-page': {
    title: 'Konto',
  },

  'sign-in': {
    page: {
      title: 'Zaloguj się',
    },
    form: {
      username: {
        placeholder: 'Nazwa użytkownika lub e-mail',
      },
      password: {
        placeholder: 'Hasło',
      },
      'sign-in-button': {
        label: 'Zaloguj się',
      },
      'remember-me': 'Zapamiętaj mnie na tym urządzeniu',
      instructions: 'Wprowadź nazwę użytkownika i hasło, aby się zalogować',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Nie pamiętam hasła',
      },
      'create-account': {
        text: 'Utwórz konto',
      },
      'sign-in': {
        text: 'Zaloguj się',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Nie pamiętam hasła',
    },
    form: {
      instructions: 'Wprowadź swój adres e-mail, aby zresetować hasło',
      email: {
        placeholder: 'Adres e-mail',
      },
      'reset-password-button': {
        label: 'Zresetuj hasło',
      },
    },
  },

  contact: {
    page: {
      title: 'Kontakt',
    },
  },

  'privacy-policy': {
    page: {
      title: 'Polityka prywatności',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Warunki użytkowania',
    },
  },

  'create-account': {
    page: {
      title: 'Utwórz konto',
    },
  },
  'create-password': {
    page: {
      title: 'Utwórz hasło',
    },
  },
  'update-password': {
    page: {
      title: 'Zaktualizuj hasło',
    },
  },

  'theme-toggle': {
    'light-theme': 'Motyw jasny',
    'dark-theme': 'Motyw ciemny',
    'system-theme': 'Motyw systemowy',
  },

  // adding command palette commands labels/alt text
  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Użyj motywu ciemnego',
        alt: 'schemat kolorów',
      },

      'light-theme': {
        label: 'Użyj motywu jasnego',
        alt: 'schemat kolorów',
      },

      'system-theme': {
        label: 'Użyj motywu systemowego',
        alt: 'schemat kolorów jasny ciemny',
      },
    },

    'remove-hyperlink': {
      label: 'Usuń hiperłącze',
      alt: 'usuń wyczyść link',
    },

    'insert-hyperlink': {
      label: 'Wstaw hiperłącze',
      alt: 'dodaj ustaw link',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Wprowadź adres łącza (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Dodaj lub edytuj komentarz komórki',
      alt: 'notatka komentarz',

      parameter: {
        comment: {
          label: 'Wprowadź komentarz. Naciśnij Ctrl + Enter, aby zapisać.',
          'label-mac': 'Wprowadź komentarz. Naciśnij Cmd + Enter, aby zapisać.',
        },
      },
    },

    'remove-comment': {
      label: 'Usuń komentarz komórki',
      alt: 'notatka',
    },

    'reset-background-color': {
      label: 'Zresetuj kolor tła w zaznaczeniu',
      alt: 'wyczyść wypełnienie',
    },

    'set-background-color': {
      label: 'Ustaw kolor tła dla zaznaczenia',
      alt: 'wypełnienie',
    },

    'reset-text-color': {
      label: 'Zresetuj kolor tekstu w zaznaczeniu',
      alt: 'wyczyść pierwszy plan',
    },

    'set-text-color': {
      label: 'Ustaw kolor tekstu dla zaznaczenia',
      alt: 'pierwszy plan',
    },

    'reset-border-color': {
      label: 'Zresetuj kolor obramowania w zaznaczeniu',
      alt: 'wyczyść',
    },

    'set-border-color': {
      label: 'Ustaw kolor obramowania dla zaznaczenia',
    },

    'borders-clear': {
      label: 'Obramowania: usuń obramowania',
    },
    'border-top': {
      label: 'Obramowania: ustaw obramowanie górne w zaznaczeniu',
    },
    'border-bottom': {
      label: 'Obramowania: ustaw obramowanie dolne w zaznaczeniu',
    },
    'border-double-bottom': {
      label: 'Obramowania: ustaw podwójne obramowanie dolne w zaznaczeniu',
    },
    'border-left': {
      label: 'Obramowania: ustaw obramowanie lewe w zaznaczeniu',
    },
    'border-right': {
      label: 'Obramowania: ustaw obramowanie prawe w zaznaczeniu',
    },

    'border-outside': {
      label: 'Obramowania: ustaw obramowanie zewnętrzne w zaznaczeniu',
      alt: 'zewnętrzne',
    },

    'border-all': {
      label: 'Obramowania: ustaw wszystkie obramowania w zaznaczeniu',
    },

    'reset-font-scale': {
      label: 'Zresetuj skalę czcionki',
      alt: 'tekst rozmiar czcionki',
    },

    'font-scale-increase': {
      label: 'Skala czcionki: zwiększ o 10%',
      alt: 'tekst rozmiar czcionki',
    },

    'font-scale-decrease': {
      label: 'Skala czcionki: zmniejsz o 10%',
      alt: 'tekst rozmiar czcionki',
    },

    'insert-donut-chart': {
      label: 'Wstaw wykres pierścieniowy',
      alt: 'wykres diagram',
    },

    'insert-column-chart': {
      label: 'Wstaw wykres kolumnowy',
      alt: 'wykres diagram',
    },

    'insert-bar-chart': {
      label: 'Wstaw wykres słupkowy',
      alt: 'wykres diagram',
    },

    'insert-line-chart': {
      label: 'Wstaw wykres liniowy',
      alt: 'wykres diagram',
    },

    'insert-scatter-plot': {
      label: 'Wstaw wykres punktowy',
      alt: 'wykres diagram',
    },

    'insert-box-plot': {
      label: 'Wstaw wykres pudełkowy',
      alt: 'wykres diagram wąsy',
    },

    'insert-image': {
      label: 'Wstaw obraz',
    },

    'cf-gradient-red-green': {
      label: 'Gradient formatowania warunkowego: czerwony-zielony',
    },
    'cf-gradient-green-red': {
      label: 'Gradient formatowania warunkowego: zielony-czerwony',
    },
    'cf-unique-values': {
      label: 'Formatowanie warunkowe: wartości unikatowe',

      parameter: {
        color: {
          label: 'Wybierz kolor dla wartości unikatowych',
        },
      },
    },

    'cf-data-bars': {
      label: 'Formatowanie warunkowe: paski danych',
      alt: 'pasek danych',

      parameter: {
        color: {
          label: 'Wybierz kolor dla pasków danych',
        },
        'hide-values': {
          label: 'Ukryć wartości?',
          choice: {
            'true': 'Tak, ukryj wartości',
            'false': 'Nie, pokaż wartości',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Formatowanie warunkowe: wartości zduplikowane',

      parameter: {
        color: {
          label: 'Wybierz kolor dla wartości zduplikowanych',
        },
      },
    },

    'cf-clear': {
      label: 'Wyczyść formatowanie warunkowe z zaznaczenia',
      alt: 'usuń',
    },

    'fit-column-widths': {
      label: 'Dopasuj szerokość zaznaczonych kolumn (autodopasowanie)',
    },

    'fit-data': {
      label: 'Dopasuj dane',
      alt: 'dopasuj',
    },

    'named-ranges': {
      label: 'Nazwane zakresy i wyrażenia',
      alt: 'menedżer nazw definiuj nazwę usuń nazwę wyczyść',
    },

    'set-tab-color': {
      label: 'Ustaw kolor karty',
    },

    'reset-tab-color': {
      label: 'Zresetuj kolor karty',
      alt: 'wyczyść usuń',
    },

    'fit-row-heights': {
      label: 'Dopasuj wysokość zaznaczonych wierszy (autodopasowanie)',
    },

    'correlation-matrix': {
      label: 'Sprawdź macierz korelacji',
    },

    'hide-sheet': {
      label: 'Ukryj arkusz',
      alt: 'widoczny',
    },

    'unhide-all-sheets': {
      label: 'Odkryj wszystkie arkusze',
      alt: 'widoczny',
    },

    'unhide-columns': {
      label: 'Odkryj kolumny arkusza',
    },
    'unhide-rows': {
      label: 'Odkryj wiersze arkusza',
    },
    'hide-rows': {
      label: 'Ukryj zaznaczone wiersze',
    },
    'hide-columns': {
      label: 'Ukryj zaznaczone kolumny',
    },

    'las-vegas-simulation': {
      label: 'Symulacja Las Vegas...',
    },
    'simulation-settings': {
      label: 'Ustawienia symulacji...',
    },
    'language-settings': {
      label: 'Ustawienia języka...',
    },

    'load-desktop-file': {
      label: 'Wczytaj plik z pulpitu...',
      alt: 'excel csv import',
    },

    'save-xlsx': {
      label: 'Zapisz jako XLSX',
      alt: 'pobierz excel',
    },

    'save-csv': {
      label: 'Zapisz bieżący arkusz jako CSV',
      alt: 'pobierz eksport',
    },

    'save-to-cloud': {
      label: 'Zapisz w chmurze',
    },

    'load-document': {
      label: 'Wczytaj dokument...',
      alt: 'otwórz',
    },

    'download-json': {
      label: 'Pobierz na pulpit (JSON)',
      alt: 'zapisz',
    },

    'insert-function': {
      label: 'Wstaw funkcję...',
    },
    find: {
      label: 'Znajdź w wartościach/formułach...',
    },
    'insert-distribution': {
      label: 'Wstaw rozkład losowy...',
    },
    'run-simulation': {
      label: 'Uruchom symulację...',
    },
    'quick-view': {
      label: 'Szybki podgląd...',
    },
    'new-model': {
      label: 'Nowy model',
    },
    'revert-file': {
      label: 'Przywróć plik',
    },
    recalculate: {
      label: 'Przelicz ponownie',
    },
    undo: {
      label: 'Cofnij',
    },
    'delete-columns': {
      label: 'Usuń zaznaczone kolumny',
    },
    'delete-rows': {
      label: 'Usuń zaznaczone wiersze',
    },
    'insert-column': {
      label: 'Wstaw kolumnę',
    },
    'insert-row': {
      label: 'Wstaw wiersz',
    },
    'set-view-scale': {
      label: 'Ustaw skalę widoku (powiększenie)',

      parameter: {
        scale: {
          label: 'Wprowadź skalę widoku',
        },
      },
    },
    'reset-view-scale': {
      label: 'Zresetuj skalę widoku (powiększenie)',
    },

    'rename-tab': {
      label: 'Zmień nazwę karty',
      alt: 'arkusz strona',

      parameter: {
        name: {
          label: 'Wprowadź nazwę tej karty',
        },
      },
    },

    'add-tab': {
      label: 'Dodaj kartę',
      alt: 'arkusz strona',

      parameter: {
        name: {
          label: 'Wprowadź nazwę nowej karty',
        },
      },
    },

    'delete-tab': {
      label: 'Usuń kartę',
      alt: 'arkusz strona',
    },

    'increase-indent': {
      label: 'Zwiększ wcięcie',
      alt: 'więcej',
    },

    'decrease-indent': {
      label: 'Zmniejsz wcięcie',
      alt: 'mniej',
    },

    'number-format-increase-precision': {
      label: 'Format liczb: zwiększ dokładność',
      alt: 'więcej miejsc dziesiętnych',
    },

    'number-format-decrease-precision': {
      label: 'Format liczb: zmniejsz dokładność',
      alt: 'mniej miejsc dziesiętnych',
    },

    'number-format': {
      label: 'Format liczb',
      alt: 'niestandardowy format liczb',

      parameter: {
        format: {
          label: 'Wprowadź format liczb lub nazwę symboliczną',
        },
      },
    },

    'merge-cells': {
      label: 'Scal zaznaczone komórki',
    },
    'unmerge-cells': {
      label: 'Rozdziel zaznaczone komórki',
    },
    'lock-cells': {
      label: 'Zablokuj zaznaczone komórki',
    },
    'unlock-cells': {
      label: 'Odblokuj zaznaczone komórki',
    },

    'valign-top': {
      label: 'Formatuj zaznaczenie: wyrównaj w pionie do góry',
    },
    'valign-bottom': {
      label: 'Formatuj zaznaczenie: wyrównaj w pionie do dołu',
    },
    'valign-middle': {
      label: 'Formatuj zaznaczenie: wyrównaj w pionie do środka',
    },

    'align-left': {
      label: 'Formatuj zaznaczenie: wyrównaj tekst do lewej',
      alt: 'wyrównanie poziome',
    },

    'align-right': {
      label: 'Formatuj zaznaczenie: wyrównaj tekst do prawej',
      alt: 'wyrównanie poziome',
    },

    'align-center': {
      label: 'Formatuj zaznaczenie: wyśrodkuj tekst',
      alt: 'wyrównanie poziome justuj',
    },

    'toggle-word-wrap': {
      label: 'Formatuj zaznaczenie: przełącz zawijanie tekstu',
    },

    'toggle-gridlines': {
      label: 'Przełącz linie siatki w aktywnym arkuszu',
    },
    'show-gridlines': {
      label: 'Pokaż linie siatki w aktywnym arkuszu',
    },
    'hide-gridlines': {
      label: 'Ukryj linie siatki w aktywnym arkuszu',
    },

    'toggle-bold': {
      label: 'Formatuj zaznaczenie: przełącz pogrubienie',
    },
    'toggle-italic': {
      label: 'Formatuj zaznaczenie: przełącz kursywę',
    },
    'toggle-underline': {
      label: 'Formatuj zaznaczenie: przełącz podkreślenie',
    },
    'toggle-strikethrough': {
      label: 'Formatuj zaznaczenie: przełącz przekreślenie',
    },

    'reset-text-formatting': {
      label: 'Formatuj zaznaczenie: zresetuj formatowanie tekstu',
      alt: 'wyczyść',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Usuń komentarz',
    },
    'save-button': {
      label: 'Zapisz',
    }
  },

  'correlation-matrix': {
    'title': 'Macierz korelacji',
    'accept-changes': 'Zaakceptuj zmiany',
    'close-dialog': 'Zamknij',

    'invalid-shape': 'Wybierz kwadratową macierz o wymiarach co najmniej 2x2 komórek.',
    'invalid-data': 'Macierz korelacji musi mieć jednostkową przekątną.\nKażda komórka na przekątnej musi mieć wartość {unit}.',
    'asymmetric': 'Macierz korelacji musi być symetryczna lub możesz pominąć górny albo dolny trójkąt.',

    'solution-text': `Macierz korelacji nie jest dodatnio określona. Znaleźliśmy rozwiązanie, wprowadzając niewielkie korekty wartości. Błąd zagregowany wynosi {error}.`,
    'positive-definite': `Macierz korelacji jest dodatnio określona.`,

  },

  //
  // sign-in page (the redesigned one -- the sign-in.* and auth.link.* keys
  // above belong to the old page. 'sign-in.page.title' is still live: it's the
  // toolbar's title, which isn't the same string as the heading on the page).
  //
  'sign-in-page': {
    heading: 'Zaloguj się',
    subtitle: 'Wprowadź nazwę użytkownika i hasło, aby się zalogować.',

    username: {
      label: 'Nazwa użytkownika lub e-mail',
      required: 'Wprowadź nazwę użytkownika lub adres e-mail.',
    },

    password: {
      label: 'Hasło',
      required: 'Wprowadź hasło.',
      show: {
        label: 'Pokaż hasło',
      },
      hide: {
        label: 'Ukryj hasło',
      },
      'caps-lock': 'Klawisz Caps Lock jest włączony.',
    },

    remember: {
      label: 'Zapamiętaj mnie na tym urządzeniu',
    },

    submit: {
      label: 'Zaloguj się',
      pending: 'Logowanie…',
    },

    error: {
      rejected: 'Nieprawidłowa nazwa użytkownika lub hasło.',
      unreachable: 'Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.',
      incomplete: 'Logowanie nie zostało ukończone. Spróbuj ponownie.',
    },

    link: {
      'forgot-password': 'Nie pamiętam hasła',
      'create-account': 'Utwórz konto',
    },
  },

  //
  // shared form rules -- the messages the validators in
  // ~/backstage/account-validation.ts return.
  //
  'backstage-form': {
    email: {
      required: 'Wprowadź swój adres e-mail.',
      invalid: 'To nie wygląda na adres e-mail.',
    },

    username: {
      required: 'Wybierz nazwę użytkownika.',
      'too-short': 'Nazwy użytkowników mają co najmniej {min} znaków.',
      'too-long': 'Nazwy użytkowników mają najwyżej {max} znaków.',
      invalid: 'Używaj liter, cyfr, myślników i podkreśleń, zaczynając od litery.',
    },

    password: {
      required: 'Wybierz hasło.',
      'too-short': 'Hasła mają co najmniej {min} znaków.',
    },
  },

  //
  // create account page (the redesigned one).
  //
  'create-account-page': {
    heading: 'Utwórz konto',

    subtitle: 'Prosimy o adres e-mail i nazwę użytkownika, ponieważ dokumenty są przechowywane pod Twoją nazwą użytkownika.',

    terms: {
      text: 'Zapoznaj się z naszymi {link}.',
      link: 'warunkami użytkowania',
    },

    email: {
      label: 'Adres e-mail',
      taken: 'Istnieje już konto z tym adresem e-mail.',
    },

    username: {
      label: 'Nazwa użytkownika',
      taken: '@{username} jest już zajęta.',
      reserved: '@{username} jest niedostępna.',
      checking: 'Sprawdzanie dostępności…',
      available: '@{username} jest dostępna.',
    },

    handle: {
      example: '@{username}/przyklad',
      placeholder: 'uzytkownik',
    },

    after: 'Wyślemy Ci e-mailem link, aby potwierdzić Twój adres i utworzyć hasło.',

    submit: {
      label: 'Utwórz konto',
      pending: 'Tworzenie konta…',
    },

    error: {
      unreachable: 'Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.',
      rejected: 'Nie można było utworzyć tego konta. Sprawdź swoje dane i spróbuj ponownie.',
    },

    done: {
      heading: 'Sprawdź swoją pocztę',
      body: 'Wysłaliśmy link na adres {email}. Otwórz go, aby potwierdzić swój adres i wybrać hasło.',
      spam: 'Nic tam nie ma? Odczekaj chwilę, a następnie sprawdź folder ze spamem.',
      restart: 'Użyj innego adresu',
    },

    link: {
      'forgot-password': 'Nie pamiętam hasła',
      'sign-in': 'Zaloguj się',
    },
  },

  //
  // forgot password page (the redesigned one). the confirmation is worded
  // conditionally on purpose. don't "fix" this into the direct form.
  //
  'forgot-password-page': {
    heading: 'Nie pamiętam hasła',
    subtitle: 'Wprowadź swój adres e-mail, a wyślemy Ci link umożliwiający wybór nowego hasła.',

    email: {
      label: 'Adres e-mail',
    },

    submit: {
      label: 'Wyślij link',
      pending: 'Wysyłanie…',
    },

    error: {
      unreachable: 'Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.',
    },

    done: {
      heading: 'Sprawdź swoją pocztę',
      body: 'Jeśli istnieje konto dla adresu {email}, wysłaliśmy na nie link. Otwórz go, aby wybrać nowe hasło.',
      spam: 'Nic tam nie ma? Odczekaj chwilę, a następnie sprawdź folder ze spamem.',
      restart: 'Użyj innego adresu',
    },

    link: {
      'sign-in': 'Zaloguj się',
      'create-account': 'Utwórz konto',
    },
  },

  'contact-page': {
    eyebrow: 'Kontakt',
    heading: 'Wyślij wiadomość',
    subtitle: 'Czytamy każdą wiadomość. Zgłaszaj błędy, dziel się pomysłami lub po prostu powiedz, co myślisz.',

    name: {
      label: 'Imię i nazwisko',
    },

    email: {
      label: 'E-mail (opcjonalnie)',
    },

    message: {
      label: 'Wiadomość',
    },

    submit: {
      label: 'Wyślij',
      pending: 'Wysyłanie…',
    },

    error: {
      'name-required': 'Wprowadź swoje imię i nazwisko.',
      'message-required': 'Wprowadź wiadomość.',
      unreachable: 'Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.',
      failed: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.',
    },

    done: {
      heading: 'Dziękujemy za opinię!',
      body: 'Przeczytamy Twoją wiadomość i odpowiemy najszybciej, jak to możliwe.',
      home: 'Wróć na stronę główną',
    },
  },

  //
  // update password page -- where the link from the recovery email lands, and
  // where a new account chooses its first password.
  //
  'create-password-page': {
    heading: 'Utwórz hasło',
  },

  'update-password-page': {
    heading: 'Wybierz nowe hasło',
    subtitle: 'Wprowadź token z linku, który Ci wysłaliśmy.',

    identifier: {
      label: 'Nazwa użytkownika lub e-mail',
      required: 'Wprowadź nazwę użytkownika lub adres e-mail.',
    },

    token: {
      label: 'Token',
      required: 'Wprowadź token z linku, który Ci wysłaliśmy.',
      invalid: 'Ten token jest nieprawidłowy. Sprawdź link lub poproś o nowy.',
      expired: 'Ten link wygasł. Poproś o nowy.',
      used: 'Ten link został już użyty. Poproś o nowy.',
    },

    password: {
      label: 'Nowe hasło',
      show: {
        label: 'Pokaż hasło',
      },
      hide: {
        label: 'Ukryj hasło',
      },
      'caps-lock': 'Klawisz Caps Lock jest włączony.',

      common: 'To hasło jest zbyt łatwe do odgadnięcia. Wybierz inne.',
    },

    strength: {
      title: 'Siła hasła',

      weak: 'Słabe',
      fair: 'Dostateczne',
      good: 'Dobre',
      strong: 'Silne',
    },

    submit: {
      label: 'Zaktualizuj hasło',
      pending: 'Aktualizowanie…',
    },

    error: {
      unreachable: 'Nie można połączyć się z serwerem. Sprawdź połączenie i spróbuj ponownie.',
      rejected: 'Nie można było zaktualizować tego hasła. Sprawdź swoje dane i spróbuj ponownie.',
    },

    done: {
      heading: 'Hasło zaktualizowane',
      body: 'Twoje nowe hasło zostało zapisane.',
      'continue': 'Przejdź do aplikacji',
    },

    link: {
      'sign-in': 'Zaloguj się',
      'forgot-password': 'Wyślij nowy link',
    },
  },

  'new-document': {
    'discard-changes-message': 'Masz niezapisane zmiany. Czy na pewno?',
    'discard-changes-confirm': 'Nowy dokument',
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Niezapisane zmiany',
    },
  },
} satisfies DeepPartial<I18N>;
