
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
    title: 'Språkinställningar...',
  },

  'select-language-dialog': {
    'title': 'Språkinställningar',
    'select-language': 'Välj språk',
    'system-setting': 'Systeminställning',
    'decimal-separator': 'Decimaltecken',
    'decimal-separator-dot': 'Punkt',
    'decimal-separator-comma': 'Komma',
  },

  about: {
    tagline: 'Monte Carlo-riskanalys för webben.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Med ensamrätt.',
    website: 'riskamp.com',
    'old-website-version': 'Letar du efter den gamla versionen av RiskAMP web? Använd {link}',
    report: 'Rapportera ett problem',
    'report-subject': 'RiskAMP web — problemrapport',
    'report-body': '(beskriv problemet här)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nWebbläsare: {ua}\nSpråk: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Arkiv',
      help: 'Hjälp',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Data och analys',
      tools: 'Verktyg',
      account: 'Konto',
    },

    'menu-commands': {
      documents: 'Dokument',
      'account-page': 'Kontosida',
      'sign-out': 'Logga ut',
    },

    tabs: {
      home: 'Start',
      layout: 'Layout',
      format: 'Format',
      insert: 'Infoga',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Data och analys',
    },

    menu: {
      'about-riskamp': 'Om RiskAMP web',
      'function-documentation': 'Dokumentation för RiskAMP-funktioner',
      walkthrough: 'Genomgångsmodell',
      contact: 'Kontakta oss',
    },

    button: {
      'toggle-fullscreen': 'Växla helskärm',

      'new-spreadsheet': 'Nytt kalkylblad',
      'import-file': 'Importera fil',
      'open-file': 'Öppna fil',
      'save-file': 'Spara fil',
      'save-file-as': 'Spara som...',
      'revert-file': 'Återställ fil',
      'save-to-desktop': 'Spara till skrivbordet',
      'export-xlsx': 'Exportera XLSX',
      'export-csv': 'Exportera CSV',

      'sign-in': 'Logga in',
      'create-account': 'Skapa konto',

      'search-cells': {
        label: 'Sök celler',
      },
      'defined-names': {
        label: 'Definierade namn',
      },
      'fit-data': {
        label: 'Anpassa data',
      },
      notes: {
        label: 'Anteckningar',
      },

      'monte-carlo-simulation': {
        label: 'Monte Carlo-simulering',
      },
      'run-simulation': {
        label: 'Kör simulering',
      },
      'run-simulation-again': {
        label: 'Kör simulering igen',
      },
      'las-vegas-simulation': {
        label: 'Las Vegas-simulering',
      },
      'simulation-settings': {
        label: 'Simuleringsinställningar',
      },
      'quick-view': {
        label: 'Snabbvy',
      },
      'quick-view-correlation': {
        label: 'Snabbvy korrelation',
      },
      recalculate: {
        label: 'Räkna om',
      },

      'align-left': {
        label: 'Vänsterjustera',
      },
      'align-center': {
        label: 'Centrera',
      },
      'align-right': {
        label: 'Högerjustera',
      },

      'align-top': {
        label: 'Justera överst',
      },
      'align-middle': {
        label: 'Justera i mitten',
      },
      'align-bottom': {
        label: 'Justera nederst',
      },

      'increase-indent': {
        label: 'Öka indrag',
      },
      'decrease-indent': {
        label: 'Minska indrag',
      },
      'wrap-text': {
        label: 'Radbryt text',
      },

      'toggle-integer-grouping': {
        label: 'Växla gruppering',
      },
      'increase-decimal-precision': {
        label: 'Öka precision',
      },
      'decrease-decimal-precision': {
        label: 'Minska precision',
      },

      'merge-cells': {
        label: 'Sammanfoga celler',
      },
      'unmerge-cells': {
        label: 'Dela upp celler',
      },

      'lock-cells': {
        label: 'Lås celler för redigering',
      },
      'unlock-cells': {
        label: 'Lås upp celler för redigering',
      },

      bold: {
        label: 'Växla fet text',
      },
      italic: {
        label: 'Växla kursiv text',
      },
      underline: {
        label: 'Växla understrykning',
      },
      strikethrough: {
        label: 'Växla genomstrykning',
      },

      'insert-row': {
        label: 'Infoga rad',
      },
      'insert-column': {
        label: 'Infoga kolumn',
      },
      'delete-row': {
        label: 'Ta bort rad',
      },
      'delete-column': {
        label: 'Ta bort kolumn',
      },

      'text-color': {
        label: 'Textfärg',
      },
      'background-color': {
        label: 'Bakgrundsfärg',
      },
      'border-color': {
        label: 'Kantlinjefärg',
      },

      'border-top': {
        title: 'Övre kantlinje',
      },
      'border-bottom': {
        title: 'Nedre kantlinje',
      },
      'border-double-bottom': {
        title: 'Dubbel nedre kantlinje',
      },
      'border-left': {
        title: 'Vänster kantlinje',
      },
      'border-right': {
        title: 'Höger kantlinje',
      },
      'border-all': {
        title: 'Alla kantlinjer',
      },
      'border-none': {
        title: 'Ta bort kantlinjer',
      },
      'border-outside': {
        title: 'Yttre kantlinjer',
      },

      'correlation-matrix': {
        title: 'Korrelationsmatris',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline-kolumn',
      'sparkline-line': 'Sparkline-linje',

      insert: {
        'bar-chart': 'Stapeldiagram',
        'donut-chart': 'Ringdiagram',
        'column-chart': 'Kolumndiagram',
        'line-chart': 'Linjediagram',
        'scatter-plot': 'Punktdiagram',
        'area-chart': 'Ytdiagram',
        image: 'Bild',

        comment: 'Kommentar',
        table: 'Tabell',
      },

      forecast: 'Trendprognos',
    },

    'open-menu': 'Öppna meny',

    'more-commands-button': {
      label: 'Fler kommandon...',
    },

    combobox: {
      'font-size': {
        label: 'Teckenstorlek',
      },
      'number-format': {
        label: 'Talformat',
      },
    },

    label: {
      'spreadsheet-cells': 'Kalkylbladsceller',
    },

    message: {
      'changes-stored-in-browser': 'Ändringar sparas i webbläsarens lagring tills du sparar eller återställer dem.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'RiskAMP-dokumentation',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Bakåt',
        forward: 'Framåt',
      },
    },
    label: {
      'close-sidebar': 'Stäng sidopanel',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Parallell beräkning',
        'max-workers': 'Antal arbetare (maximum)',
        'explanatory-text': `Att använda fler arbetare parallellt förbättrar simuleringsprestandan för komplexa modeller. I de flesta fall rekommenderar vi 4 eller 8 arbetare.`,
      },

      'random-sampling': {
        'section-header': 'Slumpmässig sampling',
        'explanatory-text': 'Samplingsmetoden sparas med det här kalkylbladet.\nVärdet du väljer här används också som standard för nya kalkylblad.',
      },

      'random-seed': {
        'section-header': 'Slumpfrö',
        'explanatory-text': 'Slumpfröet sparas med det här kalkylbladet.\nAnge ett tal för att använda ett fast frö, eller ange 0 för att använda ett slumpmässigt frö i varje simulering.',

        'enter-seed-value': 'Ange frö',
        'seed-value': 'Frövärde',
        'reset-seed-value': 'Återställ frö',
        'time-based-seed': 'Använd ett tidsbaserat frö',
      },

      title: 'Simuleringsinställningar',
      'latin-hypercube-sampling': 'Latin hypercube-sampling (LHS)',
      'standard-random-sampling': 'Standard slumpmässig sampling',

      'fixed-random-seed': 'Fast frö',
      'seed-value-placeholder-text': 'Frövärde',
    },

    'notes-panel': {
      title: 'Anteckningar',
      'open-notes-with-spreadsheet': 'Öppna anteckningar med kalkylbladet',
      edit_markdown: 'Redigera markdown',
      view_formatted: 'Visa formaterat',
    },
    'fit-data-panel': {
      title: 'Anpassa data',
    },
  },

  'color-picker': {
    choose_color: 'Välj färg',
    use_selected_color: 'Använd vald färg',
    theme_colors: 'Temafärger',
    other_colors: 'Andra färger',
    no_color: 'Ingen färg',
    new_color: 'Ny färg',
    default_text_color: 'Standardtextfärg',
    default_border_color: 'Standardfärg för kantlinje',
    no_fill: 'Ingen fyllning',

    theme: {
      background: 'Bakgrund',
      text: 'Text',
      accent: 'Accent',
      lighter: 'Ljusare',
      darker: 'Mörkare',
    },
  },

  'names-panel': {
    title: 'Definierade namn',
    header: {
      name: 'Namn',
      'name-scope': 'Omfattning',
      value: 'Värde',
    },
    'name-scope': {
      sheet: 'Blad',
      workbook: 'Arbetsbok',
    },
    label: {
      'delete-name': 'Ta bort namn',
      'define-name': 'Definiera namn',
      'edit-name': 'Redigera namn',
    },
    'name-type': {
      reference: 'Referens',
      expression: 'Uttryck',
    },
  },

  'search-panel': {
    title: 'Sök celler',
    'search-text': {
      placeholder: 'Söktext',
    },
    'search-in': {
      text: 'Sök i',
    },
    'search-type': {
      'cell-values': 'Värden',
      'cell-formulas': 'Formler',
      wildcards: 'Jokertecken',
    },
    'search-scope': {
      'current-sheet': 'Aktuellt blad',
      'all-sheets': 'Alla blad',
    },
    'search-results': {
      header: {
        address: 'Adress',
        value: 'Värde',
        formula: 'Formel',
      },
      information: {
        'enter-text': 'Ange text att söka efter',
        result: 'resultat',
        results: 'resultat',
      },
    },
  },
  'forecast-dialog': {
    title: 'Trendprognos',
    parameters: {
      dates: {
        title: 'Datum',
      },
      values: {
        title: 'Värden',
      },
      periods: 'Prognosperioder',
      seasonality: 'Säsongsvariation',

      'fill-empty': 'Fyll',
      'aggregate-multiple': 'Aggregera',
      'project-forward-periods': 'Perioder',
      'chart-type': {
        label: 'Diagramtyp',
      },
      'chart-type-line-chart': 'Linje',
      'chart-type-column-chart': 'Kolumn',
    },
    options: {
      'model-type': 'Modell',
      'forecast-type': 'Prognostyp',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel-kompatibel',
      'static-forecast': 'Statisk',
      'stochastic-forecast': 'Stokastisk',
    },
    settings: 'Inställningar',
    'create-forecast-sheet': 'Skapa prognosblad',
    seasonality: {
      'auto-detect': 'Identifiera automatiskt',
    },
    'fill-options': {
      interpolate: 'Interpolera',
      zeros: 'Nollor',
    },
    'aggregate-options': {
      average: 'Medelvärde',
      median: 'Median',
      min: 'Min',
      max: 'Max',
      sum: 'Summa',
      count: 'Antal',
    },

    'chart-labels': {
      values: 'Värden',
      forecast: 'Prognos',
    },
  },

  'forecast-sheet-timeline-header': 'Tidslinje',
  'forecast-sheet-values-header': 'Värden',
  'forecast-sheet-forecast-header': 'Prognos',
  'forecast-sheet-sample-header': 'Stickprov',
  'forecast-sheet-statistics-header': 'Statistik',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Medelvärde',
    },
    'p80-range': {
      header: 'P80-intervall',
    },
  },

  'sparkline-dialog': {
    title: 'Infoga sparkline',
    parameters: {
      target: {
        title: 'Målcell',
        'overwrite-warning': 'Data i målområdet skrivs över',
        'merge-warning': 'De markerade cellerna sammanfogas för sparkline-diagrammet',
      },
      source: {
        title: 'Källdataområde',
      },
    },
    info: 'Använd cellens förgrunds- och bakgrundsfärger för att utforma sparkline-diagrammet',

    'sparkline-type': 'Sparkline-typ',
    'sparkline-type-line-chart': 'Linje',
    'sparkline-type-column-chart': 'Kolumn',
  },

  'quick-view-dialog': {
    title: 'Snabbvy',
    'select-cell': 'Välj cell',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Lådagram',
    'show-statistics': 'Statistik',
    'histogram-bin-algorithm-long': 'Klassindelningsalgoritm',
    'histogram-bin-algorithm-short': 'Klasser',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Whiskertyp',
    'box-plot-whisker-type-short': 'Whiskers',
    'box-plot-whisker-type-minmax': 'Min/max',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Det finns inga simuleringsdata för den markerade cellen. Kör en simulering med knappen nedan för att samla in data för den här cellen.\n\nSimuleringsdata samlas in automatiskt när en cell refereras av en statistikfunktion (som SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1:a kvartilen',
      third_quartile: '3:e kvartilen',
      median: 'Median',
      'interquartile-range': 'IQR',
      mean: 'Medelvärde',
      variance: 'Varians',
      'standard-deviation': 'Standardavv.',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Lås snabbvyns markering',
        'click-to-unlock': 'Lås upp snabbvyns markering',
        'return-to-selection': 'Återgå till markerad cell',
        'selection-locked': 'Markering låst',
      },
    },
  },

  'dialog-close-label': 'Stäng',
  'dialog-close-title': 'Stäng dialogruta',
  'dialog-help-title': 'Hjälp',

  'standard-buttons': {
    close: {
      label: 'Stäng',
      title: 'Stäng dialogruta',
    },
    apply: {
      title: 'Verkställ',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Bakåt',
    },
    yes: {
      title: 'Ja',
    },
    no: {
      title: 'Nej',
    },
    accept: {
      title: 'Acceptera',
    },
    cancel: {
      title: 'Avbryt',
    },
  },

  'confirm-dialog': {
    title: 'Är du säker?',
    'alert-title': 'Varning',
    confirm: 'Bekräfta',
    cancel: 'Avbryt',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte Carlo-simulering',
  'run-simulation': {
    'number-of-trials': 'Antal försök',
    'screen-updates': 'Visa skärmuppdateringar',
    starting: 'Startar...',
    'percent-complete': 'klart',
  },
  'run-simulation-start-label': 'Starta',
  'run-simulation-start-title': 'Starta simulering',
  'run-simulation-cancel-label': 'Stoppa',
  'run-simulation-cancel-title': 'Stoppa simulering',

  'load-error': {
    'loading-document-failed': 'Den begärda filen kunde inte läsas in',
  },

  'save-as-dialog': {
    'default-title': 'Spara som',
    'rename-title': 'Byt namn på dokument',
    'duplicate-title': 'Duplicera dokument',
    folder: 'Mapp',
    name: 'Namn',
    access: 'Åtkomst',
    public: 'Offentlig',
    private: 'Privat',
    save: 'Spara',
    overwrite: 'Skriv över',
    'folder-placeholder': 'Valfritt — t.ex. finance/reports',
    'name-placeholder': 'Dokumentnamn',
    'preview-label': 'Sparas som',
    'copy-link': 'Kopiera länk',
    'copy-link-copied': 'Länk kopierad',
    collision: 'Det finns redan ett dokument på den här sökvägen.',
    'collision-blocked': 'Det finns redan ett dokument på den här sökvägen. Välj ett annat namn.',
    empty: 'Ange ett namn',
    saved: '”{name}” sparat',
    'save-failed': 'Det gick inte att spara ”{name}”.',
    retry: 'Försök igen',
    'overwrite-confirm-title': 'Skriva över dokument?',
    'overwrite-confirm-message': 'Det finns redan ett dokument med namnet ”{name}”. Om du skriver över ersätts innehållet. Är du säker?',

    'path-exists-title': 'Dokumentet finns redan',
    'path-exists-message': 'Ett dokument med den sökvägen finns redan. Ta bort det dokumentet först om du vill återanvända sökvägen.',

  },

  toast: {
    'region-label': 'Aviseringar',
    dismiss: 'Avfärda',
  },

  'las-vegas-simulation-panel': {
    title: 'Las Vegas-simulering',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Acceptera',
        description: 'Acceptera är en cell som returnerar TRUE eller FALSE för att godkänna eller avvisa ett försök. Obligatorisk.',
      },
      complete: {
        title: 'Slutför',
        description: 'Slutför är en cell som returnerar TRUE för att avsluta simuleringen, eller ett antal accepterade försök. Obligatorisk.',
      },
      fail: {
        title: 'Misslyckas',
        description: 'Misslyckas är en cell som returnerar TRUE för att avsluta simuleringen, eller ett maximalt totalt antal försök. Valfri.',
      },
    },
    'more-information-link': {
      title: 'Mer information',
    },
    'running-simulation': 'Simuleringen körs...',
    'options-overview': 'Ange alternativ för en Las Vegas-simulering.',
  },

  'insert-function': {
    button: {
      title: 'Infoga funktion...',
    },
    'insert-function': 'Infoga funktion',
    'search-for-function': 'Sök efter en funktion...',
    'function-result': 'Resultat',
  },

  'function-dialog': {
    'select-function': {
      title: 'Välj funktion',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultat',
    volatile: 'flyktig',
    'function-help-title': 'Hjälp om den här funktionen',
  },

  'number-format': {
    general: 'Allmänt',
    number: 'Tal',
    integer: 'Heltal',
    percent: 'Procent',
    fraction: 'Bråk',
    accounting: 'Bokföring',
    currency: 'Valuta',
    scientific: 'Vetenskaplig',

    timestamp: 'Tidsstämpel',
    'long-date': 'Långt datum',
    'short-date': 'Kort datum',
  },

  'llm-chat': {
    panel: {
      title: 'AI-assistent',
    },
    'settings-tab': {
      title: 'Inställningar',
    },
    'chat-tab': {
      title: 'Chatt',
    },
    'change-model': {
      title: 'Byta modell?',
      message: 'Den här modellen använder en annan leverantör, så den aktuella konversationen rensas. Vill du fortsätta?',
      confirm: 'Byt modell',
    },
    buttons: {
      'send-message': 'Skicka',

      'clear-conversation': 'Rensa konversation',
      save: 'Spara till skrivbordet',
      resend: 'Skicka det senaste meddelandet igen',
      restart: 'Starta om från det första meddelandet',
    },

    label: {
      'api-key': 'API-nyckel',
      'api-key-placeholder': 'Klistra in din API-nyckel',
      'reveal-api-key': 'Visa API-nyckel',
      'hide-api-key': 'Dölj API-nyckel',
      model: 'Modell',
      'choose-a-model': 'Välj en modell',
      'select-a-model': 'Markera en modell',
      header: {
        important: 'Viktigt',
      },
      disclaimer: 'AI-gränssnittet körs i läget "ta med din egen nyckel". För att använda det måste du ange en API-nyckel för en leverantör eller modell som stöds.\nVi ser aldrig din API-nyckel. Den stannar i din webbläsare och skickas endast till den officiella leverantören när du skickar ett chattmeddelande.\nDin modellleverantör debiterar dig för token eller enligt din prenumerationsplan.',

      provider_link: 'Leverantörens webbsida',
      model_information_link: 'Modellinformation',
      screenshots_disabled: 'Obs! Den här modellen stöder inte skärmdumpar.',

    },

    // transient status shown while the assistant is working; these steps are
    // never persisted as message blocks (see chat-messages.tsx activity()).
    activity: {
      thinking: 'Tänker…',
      working: 'Arbetar…',
      running: 'Kör {tool}…',
    },

    error: {
      unknown: 'okänt fel',
      'unknown-type': 'okänd typ',
    },
  },

  'developer-panel': {
    title: 'Utvecklarinfo',
  },

  'fit-data-panel': {
    'select-range': 'Välj område',
    'candidate-distributions': {
      label: 'Kandidatfördelningar',
      description: 'Kandidaterna sorteras efter närmast passning till den teoretiska fördelningen',
    },
    'log-normal-graph': {
      description: 'Den lognormala grafen ritas med logaritmisk skala',
    },
    statistics: {
      error: 'Fel',
      mean_square_error: 'Medelkvadratfel',
      aggregate_error: 'Aggregerat fel',
      max_error: 'Maximalt fel',
      mean_error: 'Medelfel',
    },

    label: {
      'click-to-lock': 'Lås markeringen för dataanpassning',
      'click-to-unlock': 'Lås upp markeringen för dataanpassning',
    },

    'distribution-parameters': 'Fördelningsparametrar',
    'spreadsheet-function': 'Kalkylbladsfunktion',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Kopiera till urklipp',
      error: 'Kopieringsfel',
      copied: 'Kopierat',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Inga matchande kommandon',
    'start-typing': 'Börja skriva för att hitta ett kommando',
    'run-highlighted-command': 'Tryck på Retur för att köra det markerade kommandot',
    'command-palette': {
      label: 'Kommandopalett',
    },
  },

  'documents-page': {
    title: 'Dokument',

    scope: {
      all: 'Alla dokument',
      starred: 'Stjärnmärkta',
      recent: 'Senaste',
      private: 'Privat',
    },

    rail: {
      label: 'Dokumentfilter',
      folders: 'Mappar',
      'no-folders': 'Inga mappar',
    },

    search: {
      placeholder: 'Sök dokument',
      label: 'Sök dokument',
      clear: {
        label: 'Rensa sökning',
      },
    },
    filter: {
      label: 'Filter',
    },

    action: {
      'new-document': 'Nytt dokument',
      open: 'Öppna',
      duplicate: 'Duplicera',
      rename: 'Byt namn…',
      'delete': 'Ta bort',
      cancel: 'Avbryt',
      'make-public': 'Gör offentlig',
      'make-private': 'Gör privat',
      'version-history': 'Versionshistorik',
    },

    access: {
      public: 'Offentlig',
      private: 'Privat',
    },

    selection: {
      count: {
        one: '{count} markerat',
        other: '{count} markerade',
      },
      'make-public': {
        label: 'Gör markerade dokument offentliga',
      },
      'make-private': {
        label: 'Gör markerade dokument privata',
      },
      'delete': {
        label: 'Ta bort markerade dokument',
      },
    },

    table: {
      label: 'Dokument',
      'select-all': {
        label: 'Markera alla dokument',
      },
    },
    column: {
      starred: 'Stjärnmärkt',
      name: 'Namn',
      folder: 'Mapp',
      access: 'Åtkomst',
      version: 'Version',
      modified: 'Ändrad',
      actions: 'Åtgärder',
    },

    row: {
      select: {
        label: 'Markera {name}',
      },
      star: {
        label: 'Stjärnmärk {name}',
      },
      unstar: {
        label: 'Ta bort stjärnmärkning från {name}',
      },
      menu: {
        label: 'Åtgärder för {name}',
      },
      unnamed: {
        title: 'Det här dokumentet har inget namn ännu',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Ta bort dokument, är du säker?',
      confirm_delete_documents: 'Ta bort dokument, är du säker?',
    },

    error: {
      title: 'Det gick inte att läsa in dina dokument',
      detail: 'Inläsningen misslyckades på grund av ett fel. Försök igen senare.',
      retry: 'Försök igen',
    },

    messages: {
      rename_failed: 'Namnbytet misslyckades. Försök igen senare.',
      rename_succeeded: 'Dokumentets namn ändrat',

      delete_failed: 'Borttagningen misslyckades. Försök igen senare.',
      one_document_deleted: 'Dokument borttaget',
      multiple_documents_deleted: 'Dokument borttagna',

      update_failed: 'Uppdateringen misslyckades. Försök igen senare.',

      duplicate_succeeded: 'Dokument skapat',
      duplicate_failed: 'Dupliceringen misslyckades. Försök igen senare.',

      restore_succeeded: 'Dokument återställt',
      restore_failed: 'Återställningen misslyckades. Försök igen senare.',

    },

    empty: {
      title: 'Inga dokument ännu',
      detail: 'Kalkylblad du skapar eller importerar visas här, tillsammans med sin versionshistorik.',
    },

    'no-match': {
      title: 'Inga dokument matchar ”{query}”',
      detail: 'Sökningen omfattar alla mappar. Prova en kortare term.',
      action: 'Rensa sökning',
    },

    'empty-filter': {
      title: 'Inget här',
      detail: 'Inga dokument matchar det här filtret.',
      'detail-folder': 'Inga dokument i {folder}.',
      action: 'Visa alla dokument',
    },

    footer: {
      count: {
        one: '{count} dokument',
        other: '{count} dokument',
      },
      filtered: '{count} av {total} dokument',
      'searching-all': 'söker i alla mappar',
    },

    panel: {
      label: 'Dokumentinformation',
      open: {
        // tooltip on the linked title, which opens the current version
        title: 'Öppna dokument',
      },
      close: {
        label: 'Stäng information',
      },
      'copy-link': {
        label: 'Kopiera länk',
        copied: {
          label: 'Länk kopierad',
          title: 'Kopierad',
        },
      },
      'unnamed-hint': 'Inget namn ännu — det här är adressen. Namnbyte anger ett.',
      star: {
        label: 'Stjärnmärk det här dokumentet',
      },
      unstar: {
        label: 'Ta bort stjärnmärkning från det här dokumentet',
      },
      field: {
        access: 'Åtkomst',
        starred: 'Stjärnmärkt',
        created: 'Skapad',
        modified: 'Ändrad',
        version: 'Version',
      },
    },

    history: {
      title: 'Äldre versioner',
      loading: 'Läser in versionshistorik',
      error: 'Det gick inte att läsa in versionshistoriken.',
      retry: 'Försök igen',
      menu: {
        label: 'Åtgärder för version {version}',
      },
      open: {
        text: 'Öppna den här versionen',
        /* the version tag is a link, and 'v3' on its own is thin as a link name --
        this is its accessible name, not visible text */
        label: 'Öppna version {version}',
      },
      duplicate: 'Duplicera som nytt dokument',
      restore: 'Återställ',
      none: 'Inga äldre versioner ännu. De visas här när du sparar.',
      kept: {
        one: 'Behåller en äldre version.',
        other: 'Behåller de senaste {count} äldre versionerna.',
      },
    },

    time: {
      'just-now': 'nyss',
      minutes: {
        one: 'för {count} minut sedan',
        other: 'för {count} minuter sedan',
      },
      hours: {
        one: 'för {count} timme sedan',
        other: 'för {count} timmar sedan',
      },
      days: {
        one: 'för {count} dag sedan',
        other: 'för {count} dagar sedan',
      },
      today: 'idag, {time}',
      yesterday: 'igår, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Dokument',
    },
    'updated-date': {
      label: 'Uppdaterad',
    },
    'created-date': {
      label: 'Skapad',
    },
    access: {
      label: 'Åtkomst',
      'type-private': 'Privat',
      'type-public': 'Offentlig',
    },
    'filter-documents': {
      label: 'Filtrera dokument',
    },

    controls: {
      'delete-selected': 'Ta bort markerade',
      'make-public': 'Gör offentlig',
      'make-private': 'Gör privat',
    },
  },

  'account-page': {
    title: 'Konto',
  },

  'sign-in': {
    page: {
      title: 'Logga in',
    },
    form: {
      username: {
        placeholder: 'Användarnamn eller e-post',
      },
      password: {
        placeholder: 'Lösenord',
      },
      'sign-in-button': {
        label: 'Logga in',
      },
      'remember-me': 'Kom ihåg mig på den här enheten',
      instructions: 'Ange ditt användarnamn och lösenord för att logga in',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Glömt lösenord',
      },
      'create-account': {
        text: 'Skapa konto',
      },
      'sign-in': {
        text: 'Logga in',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Glömt lösenord',
    },
    form: {
      instructions: 'Ange din e-postadress för att återställa ditt lösenord',
      email: {
        placeholder: 'E-postadress',
      },
      'reset-password-button': {
        label: 'Återställ lösenord',
      },
    },
  },

  contact: {
    page: {
      title: 'Kontakta oss',
    },
  },

  'privacy-policy': {
    page: {
      title: 'Integritetspolicy',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Användarvillkor',
    },
  },

  'create-account': {
    page: {
      title: 'Skapa konto',
    },
  },
  'create-password': {
    page: {
      title: 'Skapa lösenord',
    },
  },
  'update-password': {
    page: {
      title: 'Uppdatera lösenord',
    },
  },

  'theme-toggle': {
    'light-theme': 'Ljust tema',
    'dark-theme': 'Mörkt tema',
    'system-theme': 'Systemtema',
  },

  // adding command palette commands labels/alt text
  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Använd mörkt tema',
        alt: 'färgschema',
      },

      'light-theme': {
        label: 'Använd ljust tema',
        alt: 'färgschema',
      },

      'system-theme': {
        label: 'Använd systemtema',
        alt: 'färgschema ljust mörkt',
      },
    },

    'remove-hyperlink': {
      label: 'Ta bort hyperlänk',
      alt: 'radera rensa länk',
    },

    'insert-hyperlink': {
      label: 'Infoga hyperlänk',
      alt: 'lägg till ange länk',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Ange länkadress (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Lägg till eller redigera cellkommentar',
      alt: 'notering kommentar',

      parameter: {
        comment: {
          label: 'Ange en kommentar. Tryck Ctrl + Retur för att spara.',
          'label-mac': 'Ange en kommentar. Tryck Cmd + Retur för att spara.',
        },
      },
    },

    'remove-comment': {
      label: 'Ta bort cellkommentar',
      alt: 'notering',
    },

    'reset-background-color': {
      label: 'Återställ bakgrundsfärg i markering',
      alt: 'rensa fyllning',
    },

    'set-background-color': {
      label: 'Ange bakgrundsfärg för markering',
      alt: 'fyllning',
    },

    'reset-text-color': {
      label: 'Återställ textfärg i markering',
      alt: 'rensa förgrund',
    },

    'set-text-color': {
      label: 'Ange textfärg för markering',
      alt: 'förgrund',
    },

    'reset-border-color': {
      label: 'Återställ kantlinjefärg i markering',
      alt: 'rensa',
    },

    'set-border-color': {
      label: 'Ange kantlinjefärg för markering',
    },

    'borders-clear': {
      label: 'Kantlinjer: rensa kantlinjer',
    },
    'border-top': {
      label: 'Kantlinjer: ange övre kantlinje för markering',
    },
    'border-bottom': {
      label: 'Kantlinjer: ange nedre kantlinje för markering',
    },
    'border-double-bottom': {
      label: 'Kantlinjer: ange dubbel nedre kantlinje för markering',
    },
    'border-left': {
      label: 'Kantlinjer: ange vänster kantlinje för markering',
    },
    'border-right': {
      label: 'Kantlinjer: ange höger kantlinje för markering',
    },

    'border-outside': {
      label: 'Kantlinjer: ange yttre kantlinje för markering',
      alt: 'yttre',
    },

    'border-all': {
      label: 'Kantlinjer: ange alla kantlinjer för markering',
    },

    'reset-font-scale': {
      label: 'Återställ teckenskala',
      alt: 'text teckenstorlek',
    },

    'font-scale-increase': {
      label: 'Teckenskala: öka 10 %',
      alt: 'text teckenstorlek',
    },

    'font-scale-decrease': {
      label: 'Teckenskala: minska 10 %',
      alt: 'text teckenstorlek',
    },

    'insert-donut-chart': {
      label: 'Infoga ringdiagram',
      alt: 'diagram graf',
    },

    'insert-column-chart': {
      label: 'Infoga kolumndiagram',
      alt: 'diagram graf',
    },

    'insert-bar-chart': {
      label: 'Infoga stapeldiagram',
      alt: 'diagram graf',
    },

    'insert-line-chart': {
      label: 'Infoga linjediagram',
      alt: 'diagram graf',
    },

    'insert-scatter-plot': {
      label: 'Infoga punktdiagram',
      alt: 'diagram graf',
    },

    'insert-box-plot': {
      label: 'Infoga lådagram',
      alt: 'diagram graf whiskers',
    },

    'insert-image': {
      label: 'Infoga bild',
    },

    'cf-gradient-red-green': {
      label: 'Villkorsstyrd formatering, toning: röd-grön',
    },
    'cf-gradient-green-red': {
      label: 'Villkorsstyrd formatering, toning: grön-röd',
    },
    'cf-unique-values': {
      label: 'Villkorsstyrd formatering: unika värden',

      parameter: {
        color: {
          label: 'Välj färg för unika värden',
        },
      },
    },

    'cf-data-bars': {
      label: 'Villkorsstyrd formatering: datastaplar',
      alt: 'datastapel',

      parameter: {
        color: {
          label: 'Välj färg för datastaplar',
        },
        'hide-values': {
          label: 'Dölj värden?',
          choice: {
            'true': 'Ja, dölj värden',
            'false': 'Nej, visa värden',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Villkorsstyrd formatering: dubblettvärden',

      parameter: {
        color: {
          label: 'Välj färg för dubblettvärden',
        },
      },
    },

    'cf-clear': {
      label: 'Rensa villkorsstyrd formatering från markering',
      alt: 'ta bort',
    },

    'fit-column-widths': {
      label: 'Anpassa markerade kolumnbredder (autostorlek)',
    },

    'fit-data': {
      label: 'Anpassa data',
      alt: 'anpassa',
    },

    'named-ranges': {
      label: 'Namngivna områden och uttryck',
      alt: 'namnhanterare definiera namn ta bort namn rensa',
    },

    'set-tab-color': {
      label: 'Ange flikfärg',
    },

    'reset-tab-color': {
      label: 'Återställ flikfärg',
      alt: 'rensa ta bort',
    },

    'fit-row-heights': {
      label: 'Anpassa markerade radhöjder (autostorlek)',
    },

    'correlation-matrix': {
      label: 'Kontrollera korrelationsmatris',
    },

    'hide-sheet': {
      label: 'Dölj blad',
      alt: 'synlig',
    },

    'unhide-all-sheets': {
      label: 'Visa alla dolda blad',
      alt: 'synlig',
    },

    'unhide-columns': {
      label: 'Visa dolda bladkolumner',
    },
    'unhide-rows': {
      label: 'Visa dolda bladrader',
    },
    'hide-rows': {
      label: 'Dölj markerade rader',
    },
    'hide-columns': {
      label: 'Dölj markerade kolumner',
    },

    'las-vegas-simulation': {
      label: 'Las Vegas-simulering...',
    },
    'simulation-settings': {
      label: 'Simuleringsinställningar...',
    },
    'language-settings': {
      label: 'Språkinställningar...',
    },

    'load-desktop-file': {
      label: 'Läs in skrivbordsfil...',
      alt: 'excel csv importera',
    },

    'save-xlsx': {
      label: 'Spara som XLSX',
      alt: 'excel ladda ner',
    },

    'save-csv': {
      label: 'Spara aktuellt blad som CSV',
      alt: 'exportera ladda ner',
    },

    'save-to-cloud': {
      label: 'Spara till molnet',
    },

    'load-document': {
      label: 'Läs in dokument...',
      alt: 'öppna',
    },

    'download-json': {
      label: 'Ladda ner till skrivbordet (JSON)',
      alt: 'spara',
    },

    'insert-function': {
      label: 'Infoga funktion...',
    },
    find: {
      label: 'Sök i värden/formler...',
    },
    'insert-distribution': {
      label: 'Infoga slumpfördelning...',
    },
    'run-simulation': {
      label: 'Kör simulering...',
    },
    'quick-view': {
      label: 'Snabbvy...',
    },
    'new-model': {
      label: 'Ny modell',
    },
    'revert-file': {
      label: 'Återställ fil',
    },
    recalculate: {
      label: 'Räkna om',
    },
    undo: {
      label: 'Ångra',
    },
    'delete-columns': {
      label: 'Ta bort markerade kolumner',
    },
    'delete-rows': {
      label: 'Ta bort markerade rader',
    },
    'insert-column': {
      label: 'Infoga kolumn',
    },
    'insert-row': {
      label: 'Infoga rad',
    },
    'set-view-scale': {
      label: 'Ange visningsskala (zoom)',

      parameter: {
        scale: {
          label: 'Ange visningsskalan',
        },
      },
    },
    'reset-view-scale': {
      label: 'Återställ visningsskala (zoom)',
    },

    'rename-tab': {
      label: 'Byt namn på flik',
      alt: 'blad sida',

      parameter: {
        name: {
          label: 'Ange ett namn för den här fliken',
        },
      },
    },

    'add-tab': {
      label: 'Lägg till flik',
      alt: 'blad sida',

      parameter: {
        name: {
          label: 'Ange ett namn för den nya fliken',
        },
      },
    },

    'delete-tab': {
      label: 'Ta bort flik',
      alt: 'blad sida',
    },

    'increase-indent': {
      label: 'Öka indrag',
      alt: 'mer',
    },

    'decrease-indent': {
      label: 'Minska indrag',
      alt: 'mindre',
    },

    'number-format-increase-precision': {
      label: 'Talformat: öka precision',
      alt: 'fler decimaler',
    },

    'number-format-decrease-precision': {
      label: 'Talformat: minska precision',
      alt: 'färre decimaler',
    },

    'number-format': {
      label: 'Talformat',
      alt: 'anpassat talformat',

      parameter: {
        format: {
          label: 'Ange talformat eller ett symboliskt namn',
        },
      },
    },

    'merge-cells': {
      label: 'Sammanfoga markerade celler',
    },
    'unmerge-cells': {
      label: 'Dela upp markerade celler',
    },
    'lock-cells': {
      label: 'Lås markerade celler',
    },
    'unlock-cells': {
      label: 'Lås upp markerade celler',
    },

    'valign-top': {
      label: 'Formatera markering: vertikal justering överst',
    },
    'valign-bottom': {
      label: 'Formatera markering: vertikal justering nederst',
    },
    'valign-middle': {
      label: 'Formatera markering: vertikal justering i mitten',
    },

    'align-left': {
      label: 'Formatera markering: vänsterjustera text',
      alt: 'horisontell justering',
    },

    'align-right': {
      label: 'Formatera markering: högerjustera text',
      alt: 'horisontell justering',
    },

    'align-center': {
      label: 'Formatera markering: centrera text',
      alt: 'horisontell justering centrera',
    },

    'toggle-word-wrap': {
      label: 'Formatera markering: växla radbrytning',
    },

    'toggle-gridlines': {
      label: 'Växla stödlinjer i aktivt blad',
    },
    'show-gridlines': {
      label: 'Visa stödlinjer i aktivt blad',
    },
    'hide-gridlines': {
      label: 'Dölj stödlinjer i aktivt blad',
    },

    'toggle-bold': {
      label: 'Formatera markering: växla fet',
    },
    'toggle-italic': {
      label: 'Formatera markering: växla kursiv',
    },
    'toggle-underline': {
      label: 'Formatera markering: växla understrykning',
    },
    'toggle-strikethrough': {
      label: 'Formatera markering: växla genomstrykning',
    },

    'reset-text-formatting': {
      label: 'Formatera markering: återställ textformatering',
      alt: 'rensa',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Ta bort kommentar',
    },
    'save-button': {
      label: 'Spara',
    }
  },

  'correlation-matrix': {
    'title': 'Korrelationsmatris',
    'accept-changes': 'Acceptera ändringar',
    'close-dialog': 'Stäng',

    'invalid-shape': 'Välj en kvadratisk matris med minst 2x2 celler.',
    'invalid-data': 'Korrelationsmatrisen måste ha en enhetsdiagonal.\nVarje cell på diagonalen måste utvärderas till {unit}.',
    'asymmetric': 'Korrelationsmatrisen måste vara symmetrisk, eller så kan du utelämna den övre eller nedre triangeln.',

    'solution-text': `Korrelationsmatrisen är inte positivt definit. Vi hittade en lösning genom att göra små justeringar av värdena. Det aggregerade felet är {error}.`,
    'positive-definite': `Korrelationsmatrisen är positivt definit.`,

  },

  //
  // sign-in page (the redesigned one -- the sign-in.* and auth.link.* keys
  // above belong to the old page. 'sign-in.page.title' is still live: it's the
  // toolbar's title, which isn't the same string as the heading on the page).
  //
  'sign-in-page': {
    heading: 'Logga in',
    subtitle: 'Ange ditt användarnamn och lösenord för att logga in.',

    username: {
      label: 'Användarnamn eller e-post',
      required: 'Ange ditt användarnamn eller din e-post.',
    },

    password: {
      label: 'Lösenord',
      required: 'Ange ditt lösenord.',
      show: {
        label: 'Visa lösenord',
      },
      hide: {
        label: 'Dölj lösenord',
      },
      'caps-lock': 'Caps Lock är på.',
    },

    remember: {
      label: 'Kom ihåg mig på den här enheten',
    },

    submit: {
      label: 'Logga in',
      pending: 'Loggar in…',
    },

    error: {
      rejected: 'Felaktigt användarnamn eller lösenord.',
      unreachable: 'Kan inte nå servern. Kontrollera din anslutning och försök igen.',
      incomplete: 'Inloggningen slutfördes inte. Försök igen.',
    },

    link: {
      'forgot-password': 'Glömt lösenord',
      'create-account': 'Skapa konto',
    },
  },

  //
  // shared form rules -- the messages the validators in
  // ~/backstage/account-validation.ts return.
  //
  'backstage-form': {
    email: {
      required: 'Ange din e-postadress.',
      invalid: 'Det där ser inte ut som en e-postadress.',
    },

    username: {
      required: 'Välj ett användarnamn.',
      'too-short': 'Användarnamn har minst {min} tecken.',
      'too-long': 'Användarnamn har högst {max} tecken.',
      invalid: 'Använd bokstäver, siffror, bindestreck och understreck, med en bokstav i början.',
    },

    password: {
      required: 'Välj ett lösenord.',
      'too-short': 'Lösenord har minst {min} tecken.',
    },
  },

  //
  // create account page (the redesigned one).
  //
  'create-account-page': {
    heading: 'Skapa konto',

    subtitle: 'Vi ber om en e-postadress och ett användarnamn eftersom dokument lagras under ditt användarnamn.',

    // {link} is the terms of service link, spliced in so a translation can put it
    // where its own grammar needs it
    terms: {
      text: 'Läs igenom våra {link}.',
      link: 'användarvillkor',
    },

    email: {
      label: 'E-postadress',
      taken: 'Det finns redan ett konto med den e-postadressen.',
    },

    username: {
      label: 'Användarnamn',
      taken: '@{username} är redan taget.',
      reserved: '@{username} är inte tillgängligt.',
      checking: 'Kontrollerar tillgänglighet…',
      available: '@{username} är tillgängligt.',
    },

    handle: {
      example: '@{username}/example',
      placeholder: 'användarnamn',
    },

    after: 'Vi mejlar dig en länk för att bekräfta din adress och skapa ett lösenord.',

    submit: {
      label: 'Skapa konto',
      pending: 'Skapar konto…',
    },

    error: {
      unreachable: 'Kan inte nå servern. Kontrollera din anslutning och försök igen.',
      rejected: 'Det gick inte att skapa kontot. Kontrollera dina uppgifter och försök igen.',
    },

    done: {
      heading: 'Kolla din e-post',
      body: 'Vi skickade en länk till {email}. Öppna den för att bekräfta din adress och välja ett lösenord.',
      spam: 'Inget där? Vänta en minut och kolla sedan din skräppostmapp.',
      restart: 'Använd en annan adress',
    },

    link: {
      'forgot-password': 'Glömt lösenord',
      'sign-in': 'Logga in',
    },
  },

  //
  // forgot password page (the redesigned one).
  //
  'forgot-password-page': {
    heading: 'Glömt lösenord',
    subtitle: 'Ange din e-postadress så skickar vi dig en länk för att välja ett nytt lösenord.',

    email: {
      label: 'E-postadress',
    },

    submit: {
      label: 'Skicka länken',
      pending: 'Skickar…',
    },

    error: {
      unreachable: 'Kan inte nå servern. Kontrollera din anslutning och försök igen.',
    },

    done: {
      heading: 'Kolla din e-post',
      body: 'Om det finns ett konto för {email} har vi skickat en länk dit. Öppna den för att välja ett nytt lösenord.',
      spam: 'Inget där? Vänta en minut och kolla sedan din skräppostmapp.',
      restart: 'Använd en annan adress',
    },

    link: {
      'sign-in': 'Logga in',
      'create-account': 'Skapa konto',
    },
  },

  'contact-page': {
    eyebrow: 'Kontakta oss',
    heading: 'Skicka ett meddelande',
    subtitle: 'Vi läser varje meddelande. Skicka oss buggar, idéer eller berätta bara vad du tycker.',

    name: {
      label: 'Namn',
    },

    email: {
      label: 'E-post (valfritt)',
    },

    message: {
      label: 'Meddelande',
    },

    submit: {
      label: 'Skicka',
      pending: 'Skickar…',
    },

    error: {
      'name-required': 'Ange ditt namn.',
      'message-required': 'Ange ett meddelande.',
      unreachable: 'Kan inte nå servern. Kontrollera din anslutning och försök igen.',
      failed: 'Något gick fel när ditt meddelande skickades. Försök igen.',
    },

    done: {
      heading: 'Tack för din feedback!',
      body: 'Vi läser ditt meddelande och återkommer så snart vi kan.',
      home: 'Tillbaka till startsidan',
    },
  },

  //
  // update password page -- where the link from the recovery email lands, and
  // where a new account chooses its first password.
  //
  'create-password-page': {
    heading: 'Skapa ett lösenord',
  },

  'update-password-page': {
    heading: 'Välj ett nytt lösenord',
    subtitle: 'Ange token från länken vi skickade till dig.',

    identifier: {
      label: 'Användarnamn eller e-post',
      required: 'Ange ditt användarnamn eller din e-post.',
    },

    token: {
      label: 'Token',
      required: 'Ange token från länken vi skickade till dig.',
      invalid: 'Den token är inte giltig. Kontrollera länken eller be om en ny.',
      expired: 'Den länken har upphört att gälla. Be om en ny.',
      used: 'Den länken har redan använts. Be om en ny.',
    },

    password: {
      label: 'Nytt lösenord',
      show: {
        label: 'Visa lösenord',
      },
      hide: {
        label: 'Dölj lösenord',
      },
      'caps-lock': 'Caps Lock är på.',

      common: 'Det lösenordet är för lätt att gissa. Välj ett annat.',
    },

    strength: {
      title: 'Lösenordsstyrka',

      weak: 'Svagt',
      fair: 'Hyfsat',
      good: 'Bra',
      strong: 'Starkt',
    },

    submit: {
      label: 'Uppdatera lösenord',
      pending: 'Uppdaterar…',
    },

    error: {
      unreachable: 'Kan inte nå servern. Kontrollera din anslutning och försök igen.',
      rejected: 'Det gick inte att uppdatera lösenordet. Kontrollera dina uppgifter och försök igen.',
    },

    done: {
      heading: 'Lösenord uppdaterat',
      body: 'Ditt nya lösenord har sparats.',
      'continue': 'Fortsätt till appen',
    },

    link: {
      'sign-in': 'Logga in',
      'forgot-password': 'Skicka en ny länk',
    },
  },

  'new-document': {
    'discard-changes-message': 'Du har osparade ändringar. Är du säker?',
    'discard-changes-confirm': 'Nytt dokument',
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Osparade ändringar',
    },
  },
} satisfies DeepPartial<I18N>;
