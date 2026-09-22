
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
    title: 'Sprogindstillinger...',
  },

  'select-language-dialog': {
    'title': 'Sprogindstillinger',
    'select-language': 'Vælg sprog',
    'system-setting': 'Systemindstilling',
    'decimal-separator': 'Decimaltegn',
    'decimal-separator-dot': 'Punktum',
    'decimal-separator-comma': 'Komma',
  },

  about: {
    tagline: 'Monte Carlo-risikoanalyse til nettet.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Alle rettigheder forbeholdes.',
    website: 'riskamp.com',
    'old-website-version': 'Leder du efter den gamle version af RiskAMP web? Brug {link}',
    report: 'Rapportér et problem',
    'report-subject': 'RiskAMP web — problemrapport',
    'report-body': '(beskriv problemet her)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nBrowser: {ua}\nSprog: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Fil',
      help: 'Hjælp',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Data og analyse',
      tools: 'Værktøjer',
      account: 'Konto',
    },

    'menu-commands': {
      documents: 'Dokumenter',
      'account-page': 'Kontoside',
      'sign-out': 'Log ud',
    },

    tabs: {
      home: 'Hjem',
      layout: 'Layout',
      format: 'Format',
      insert: 'Indsæt',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Data og analyse',
    },

    menu: {
      'about-riskamp': 'Om RiskAMP web',
      'function-documentation': 'Dokumentation for RiskAMP-funktioner',
      walkthrough: 'Gennemgangsmodel',
      contact: 'Kontakt os',
    },

    button: {
      'toggle-fullscreen': 'Skift fuldskærm',

      'new-spreadsheet': 'Nyt regneark',
      'import-file': 'Importér fil',
      'open-file': 'Åbn fil',
      'save-file': 'Gem fil',
      'save-file-as': 'Gem som...',
      'revert-file': 'Gendan fil',
      'save-to-desktop': 'Gem til skrivebord',
      'export-xlsx': 'Eksportér XLSX',
      'export-csv': 'Eksportér CSV',

      'sign-in': 'Log ind',
      'create-account': 'Opret konto',

      'search-cells': {
        label: 'Søg i celler',
      },
      'defined-names': {
        label: 'Definerede navne',
      },
      'fit-data': {
        label: 'Tilpas data',
      },
      notes: {
        label: 'Noter',
      },

      'monte-carlo-simulation': {
        label: 'Monte Carlo-simulering',
      },
      'run-simulation': {
        label: 'Kør simulering',
      },
      'run-simulation-again': {
        label: 'Kør simulering igen',
      },
      'las-vegas-simulation': {
        label: 'Las Vegas-simulering',
      },
      'simulation-settings': {
        label: 'Simuleringsindstillinger',
      },
      'quick-view': {
        label: 'Hurtig visning',
      },
      'quick-view-correlation': {
        label: 'Hurtig visning af korrelation',
      },
      recalculate: {
        label: 'Genberegn',
      },

      'align-left': {
        label: 'Venstrejustér',
      },
      'align-center': {
        label: 'Centrér',
      },
      'align-right': {
        label: 'Højrejustér',
      },

      'align-top': {
        label: 'Justér øverst',
      },
      'align-middle': {
        label: 'Justér i midten',
      },
      'align-bottom': {
        label: 'Justér nederst',
      },

      'increase-indent': {
        label: 'Forøg indrykning',
      },
      'decrease-indent': {
        label: 'Formindsk indrykning',
      },
      'wrap-text': {
        label: 'Ombryd tekst',
      },

      'toggle-integer-grouping': {
        label: 'Skift gruppering',
      },
      'increase-decimal-precision': {
        label: 'Forøg præcision',
      },
      'decrease-decimal-precision': {
        label: 'Formindsk præcision',
      },

      'merge-cells': {
        label: 'Flet celler',
      },
      'unmerge-cells': {
        label: 'Ophæv fletning af celler',
      },

      'lock-cells': {
        label: 'Lås celler for redigering',
      },
      'unlock-cells': {
        label: 'Lås celler op for redigering',
      },

      bold: {
        label: 'Skift fed tekst',
      },
      italic: {
        label: 'Skift kursiv tekst',
      },
      underline: {
        label: 'Skift understregning',
      },
      strikethrough: {
        label: 'Skift gennemstregning',
      },

      'insert-row': {
        label: 'Indsæt række',
      },
      'insert-column': {
        label: 'Indsæt kolonne',
      },
      'delete-row': {
        label: 'Slet række',
      },
      'delete-column': {
        label: 'Slet kolonne',
      },

      'text-color': {
        label: 'Tekstfarve',
      },
      'background-color': {
        label: 'Baggrundsfarve',
      },
      'border-color': {
        label: 'Kantfarve',
      },

      'border-top': {
        title: 'Øverste kant',
      },
      'border-bottom': {
        title: 'Nederste kant',
      },
      'border-double-bottom': {
        title: 'Dobbelt nederste kant',
      },
      'border-left': {
        title: 'Venstre kant',
      },
      'border-right': {
        title: 'Højre kant',
      },
      'border-all': {
        title: 'Alle kanter',
      },
      'border-none': {
        title: 'Fjern kanter',
      },
      'border-outside': {
        title: 'Yderkanter',
      },

      'correlation-matrix': {
        title: 'Korrelationsmatrix',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline-kolonne',
      'sparkline-line': 'Sparkline-linje',

      insert: {
        'bar-chart': 'Liggende søjlediagram',
        'donut-chart': 'Doughnutdiagram',
        'column-chart': 'Søjlediagram',
        'line-chart': 'Kurvediagram',
        'scatter-plot': 'Punktdiagram',
        'area-chart': 'Områdediagram',
        image: 'Billede',

        comment: 'Kommentar',
        table: 'Tabel',
      },

      forecast: 'Trendprognose',
    },

    'open-menu': 'Åbn menu',

    'more-commands-button': {
      label: 'Flere kommandoer...',
    },

    combobox: {
      'font-size': {
        label: 'Skriftstørrelse',
      },
      'number-format': {
        label: 'Talformat',
      },
    },

    label: {
      'spreadsheet-cells': 'Regnearksceller',
    },

    message: {
      'changes-stored-in-browser': 'Ændringer bevares i browserens lager, indtil du gemmer eller gendanner dem.',
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
        back: 'Tilbage',
        forward: 'Frem',
      },
    },
    label: {
      'close-sidebar': 'Luk sidepanel',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Parallel beregning',
        'max-workers': 'Antal workers (maksimum)',
        'explanatory-text': `Brug af flere parallelle workers forbedrer simuleringens ydeevne for komplekse modeller. I de fleste tilfælde anbefaler vi 4 eller 8 workers.`,
      },

      'random-sampling': {
        'section-header': 'Tilfældig stikprøve',
        'explanatory-text': 'Stikprøvemetoden gemmes sammen med dette regneark.\nVærdien, du vælger her, bruges også som standard for nye regneark.',
      },

      'random-seed': {
        'section-header': 'Tilfældig seed',
        'explanatory-text': 'Den tilfældige seed gemmes sammen med dette regneark.\nIndtast et tal for at bruge en fast seed, eller indtast 0 for at bruge en tilfældig seed i hver simulering.',

        'enter-seed-value': 'Indtast seed',
        'seed-value': 'Seedværdi',
        'reset-seed-value': 'Nulstil seed',
        'time-based-seed': 'Brug en tidsbaseret seed',
      },

      title: 'Simuleringsindstillinger',
      'latin-hypercube-sampling': 'Latin hypercube-stikprøve (LHS)',
      'standard-random-sampling': 'Standard tilfældig stikprøve',

      'fixed-random-seed': 'Fast seed',
      'seed-value-placeholder-text': 'Seedværdi',
    },

    'notes-panel': {
      title: 'Noter',
      'open-notes-with-spreadsheet': 'Åbn noter med regneark',
      edit_markdown: 'Redigér markdown',
      view_formatted: 'Vis formateret',
    },
    'fit-data-panel': {
      title: 'Tilpas data',
    },
  },

  'color-picker': {
    choose_color: 'Vælg farve',
    use_selected_color: 'Brug valgt farve',
    theme_colors: 'Temafarver',
    other_colors: 'Andre farver',
    no_color: 'Ingen farve',
    new_color: 'Ny farve',
    default_text_color: 'Standardtekstfarve',
    default_border_color: 'Standardkantfarve',
    no_fill: 'Ingen fyld',

    theme: {
      background: 'Baggrund',
      text: 'Tekst',
      accent: 'Fremhævning',
      lighter: 'Lysere',
      darker: 'Mørkere',
    },
  },

  'names-panel': {
    title: 'Definerede navne',
    header: {
      name: 'Navn',
      'name-scope': 'Område',
      value: 'Værdi',
    },
    'name-scope': {
      sheet: 'Ark',
      workbook: 'Projektmappe',
    },
    label: {
      'delete-name': 'Slet navn',
      'define-name': 'Definér navn',
      'edit-name': 'Redigér navn',
    },
    'name-type': {
      reference: 'Reference',
      expression: 'Udtryk',
    },
  },

  'search-panel': {
    title: 'Søg i celler',
    'search-text': {
      placeholder: 'Søgetekst',
    },
    'search-in': {
      text: 'Søg i',
    },
    'search-type': {
      'cell-values': 'Værdier',
      'cell-formulas': 'Formler',
      wildcards: 'Jokertegn',
    },
    'search-scope': {
      'current-sheet': 'Aktuelt ark',
      'all-sheets': 'Alle ark',
    },
    'search-results': {
      header: {
        address: 'Adresse',
        value: 'Værdi',
        formula: 'Formel',
      },
      information: {
        'enter-text': 'Indtast tekst for at søge',
        result: 'resultat',
        results: 'resultater',
      },
    },
  },
  'forecast-dialog': {
    title: 'Trendprognose',
    parameters: {
      dates: {
        title: 'Datoer',
      },
      values: {
        title: 'Værdier',
      },
      periods: 'Prognoseperioder',
      seasonality: 'Sæsonudsving',

      'fill-empty': 'Udfyld',
      'aggregate-multiple': 'Aggregér',
      'project-forward-periods': 'Perioder',
      'chart-type': {
        label: 'Diagramtype',
      },
      'chart-type-line-chart': 'Kurve',
      'chart-type-column-chart': 'Søjle',
    },
    options: {
      'model-type': 'Model',
      'forecast-type': 'Prognosetype',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel-kompatibel',
      'static-forecast': 'Statisk',
      'stochastic-forecast': 'Stokastisk',
    },
    settings: 'Indstillinger',
    'create-forecast-sheet': 'Opret prognoseark',
    seasonality: {
      'auto-detect': 'Registrér automatisk',
    },
    'fill-options': {
      interpolate: 'Interpolér',
      zeros: 'Nuller',
    },
    'aggregate-options': {
      average: 'Gennemsnit',
      median: 'Median',
      min: 'Min',
      max: 'Maks',
      sum: 'Sum',
      count: 'Antal',
    },

    'chart-labels': {
      values: 'Værdier',
      forecast: 'Prognose',
    },
  },

  'forecast-sheet-timeline-header': 'Tidslinje',
  'forecast-sheet-values-header': 'Værdier',
  'forecast-sheet-forecast-header': 'Prognose',
  'forecast-sheet-sample-header': 'Stikprøve',
  'forecast-sheet-statistics-header': 'Statistik',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Middelværdi',
    },
    'p80-range': {
      header: 'P80-interval',
    },
  },

  'sparkline-dialog': {
    title: 'Indsæt sparkline',
    parameters: {
      target: {
        title: 'Målcelle',
        'overwrite-warning': 'Data i målområdet overskrives',
        'merge-warning': 'De valgte celler flettes til sparkline',
      },
      source: {
        title: 'Kildedataområde',
      },
    },
    info: 'Brug cellens for- og baggrundsfarver til at style sparkline',

    'sparkline-type': 'Sparkline-type',
    'sparkline-type-line-chart': 'Kurve',
    'sparkline-type-column-chart': 'Søjle',
  },

  'quick-view-dialog': {
    title: 'Hurtig visning',
    'select-cell': 'Vælg celle',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Boksplot',
    'show-statistics': 'Statistik',
    'histogram-bin-algorithm-long': 'Intervalalgoritme',
    'histogram-bin-algorithm-short': 'Intervaller',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Whiskertype',
    'box-plot-whisker-type-short': 'Whiskers',
    'box-plot-whisker-type-minmax': 'Min/maks',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Der er ingen simuleringsdata for den valgte celle. Kør en simulering med knappen nedenfor for at indsamle data for denne celle.\n\nSimuleringsdata indsamles automatisk, når en celle refereres af en statistikfunktion (som SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Maks',
      first_quartile: '1. kvartil',
      third_quartile: '3. kvartil',
      median: 'Median',
      'interquartile-range': 'IQR',
      mean: 'Middelværdi',
      variance: 'Varians',
      'standard-deviation': 'Std.afv.',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Lås markeringen til hurtig visning',
        'click-to-unlock': 'Lås markeringen til hurtig visning op',
        'return-to-selection': 'Tilbage til valgt celle',
        'selection-locked': 'Markering låst',
      },
    },
  },

  'dialog-close-label': 'Luk',
  'dialog-close-title': 'Luk dialog',
  'dialog-help-title': 'Hjælp',

  'standard-buttons': {
    close: {
      label: 'Luk',
      title: 'Luk dialog',
    },
    apply: {
      title: 'Anvend',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Tilbage',
    },
    yes: {
      title: 'Ja',
    },
    no: {
      title: 'Nej',
    },
    accept: {
      title: 'Acceptér',
    },
    cancel: {
      title: 'Annullér',
    },
  },

  'confirm-dialog': {
    title: 'Er du sikker?',
    'alert-title': 'Advarsel',
    confirm: 'Bekræft',
    cancel: 'Annullér',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte Carlo-simulering',
  'run-simulation': {
    'number-of-trials': 'Antal forsøg',
    'screen-updates': 'Vis skærmopdateringer',
    starting: 'Starter...',
    'percent-complete': 'færdig',
  },
  'run-simulation-start-label': 'Start',
  'run-simulation-start-title': 'Start simulering',
  'run-simulation-cancel-label': 'Stop',
  'run-simulation-cancel-title': 'Stop simulering',

  'load-error': {
    'loading-document-failed': 'Den ønskede fil kunne ikke indlæses',
  },

  'save-as-dialog': {
    'default-title': 'Gem som',
    'rename-title': 'Omdøb dokument',
    'duplicate-title': 'Dublér dokument',
    folder: 'Mappe',
    name: 'Navn',
    access: 'Adgang',
    public: 'Offentlig',
    private: 'Privat',
    save: 'Gem',
    overwrite: 'Overskriv',
    'folder-placeholder': 'Valgfrit — f.eks. finance/reports',
    'name-placeholder': 'Dokumentnavn',
    'preview-label': 'Gemmes som',
    'copy-link': 'Kopiér link',
    'copy-link-copied': 'Link kopieret',
    collision: 'Der findes allerede et dokument på denne sti.',
    'collision-blocked': 'Der findes allerede et dokument på denne sti. Vælg et andet navn.',
    empty: 'Indtast et navn',
    saved: '„{name}“ gemt',
    'save-failed': '„{name}“ kunne ikke gemmes.',
    retry: 'Prøv igen',
    'overwrite-confirm-title': 'Overskriv dokument?',
    'overwrite-confirm-message': 'Der findes allerede et dokument på „{name}“. Ved overskrivning erstattes indholdet. Er du sikker?',

    'path-exists-title': 'Dokument findes',
    'path-exists-message': 'Der findes allerede et dokument med den sti. Slet det dokument først, hvis du vil genbruge stien.',

  },

  toast: {
    'region-label': 'Meddelelser',
    dismiss: 'Afvis',
  },

  'las-vegas-simulation-panel': {
    title: 'Las Vegas-simulering',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Acceptér',
        description: 'Acceptér er en celle, der returnerer TRUE eller FALSE for at acceptere eller afvise et forsøg. Påkrævet.',
      },
      complete: {
        title: 'Fuldfør',
        description: 'Fuldfør er en celle, der returnerer TRUE for at afslutte simuleringen, eller et antal accepterede forsøg. Påkrævet.',
      },
      fail: {
        title: 'Mislykkes',
        description: 'Mislykkes er en celle, der returnerer TRUE for at afslutte simuleringen, eller et maksimalt samlet antal forsøg. Valgfrit.',
      },
    },
    'more-information-link': {
      title: 'Flere oplysninger',
    },
    'running-simulation': 'Simulering kører...',
    'options-overview': 'Indtast indstillinger for en Las Vegas-simulering.',
  },

  'insert-function': {
    button: {
      title: 'Indsæt funktion...',
    },
    'insert-function': 'Indsæt funktion',
    'search-for-function': 'Søg efter funktion...',
    'function-result': 'Resultat',
  },

  'function-dialog': {
    'select-function': {
      title: 'Vælg funktion',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultat',
    volatile: 'volatil',
    'function-help-title': 'Hjælp til denne funktion',
  },

  'number-format': {
    general: 'Standard',
    number: 'Tal',
    integer: 'Heltal',
    percent: 'Procent',
    fraction: 'Brøk',
    accounting: 'Regnskab',
    currency: 'Valuta',
    scientific: 'Videnskabelig',

    timestamp: 'Tidsstempel',
    'long-date': 'Lang dato',
    'short-date': 'Kort dato',
  },

  'llm-chat': {
    panel: {
      title: 'AI-assistent',
    },
    'settings-tab': {
      title: 'Indstillinger',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Skift model?',
      message: 'Denne model bruger en anden udbyder, så den aktuelle samtale ryddes. Vil du fortsætte?',
      confirm: 'Skift model',
    },
    buttons: {
      'send-message': 'Send',

      'clear-conversation': 'Ryd samtale',
      save: 'Gem til skrivebord',
      resend: 'Send sidste besked igen',
      restart: 'Genstart fra første besked',
    },

    label: {
      'api-key': 'API-nøgle',
      'api-key-placeholder': 'Indsæt din API-nøgle',
      'reveal-api-key': 'Vis API-nøgle',
      'hide-api-key': 'Skjul API-nøgle',
      model: 'Model',
      'choose-a-model': 'Vælg en model',
      'select-a-model': 'Vælg en model',
      header: {
        important: 'Vigtigt',
      },
      disclaimer: 'AI-grænsefladen kører i bring-your-own-key-tilstand. For at bruge den skal du angive en API-nøgle til en understøttet udbyder/model.\nVi ser aldrig din API-nøgle. Den forbliver i din browser og sendes kun til den officielle udbyder, når du sender en chatbesked.\nDin modeludbyder opkræver betaling for tokens eller i henhold til dit abonnement.',

      provider_link: 'Udbyderens webside',
      model_information_link: 'Modeloplysninger',
      screenshots_disabled: 'Bemærk: denne model understøtter ikke skærmbilleder.',

    },

    // transient status shown while the assistant is working; these steps are
    // never persisted as message blocks (see chat-messages.tsx activity()).
    activity: {
      thinking: 'Tænker…',
      working: 'Arbejder…',
      running: 'Kører {tool}…',
    },

    error: {
      unknown: 'ukendt fejl',
      'unknown-type': 'ukendt type',
    },

    aborted: 'Generering stoppet.',
  },

  'developer-panel': {
    title: 'Udviklerinfo',
  },

  'fit-data-panel': {
    'select-range': 'Vælg område',
    'candidate-distributions': {
      label: 'Kandidatfordelinger',
      description: 'Kandidater er sorteret efter tættest tilpasning til den teoretiske fordeling',
    },
    'log-normal-graph': {
      description: 'Den lognormale graf tegnes med logaritmisk skala',
    },
    statistics: {
      error: 'Fejl',
      mean_square_error: 'Gennemsnitlig kvadratisk fejl',
      aggregate_error: 'Samlet fejl',
      max_error: 'Maksimal fejl',
      mean_error: 'Gennemsnitlig fejl',
    },

    label: {
      'click-to-lock': 'Lås markeringen til datatilpasning',
      'click-to-unlock': 'Lås markeringen til datatilpasning op',
    },

    'distribution-parameters': 'Fordelingsparametre',
    'spreadsheet-function': 'Regnearksfunktion',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Kopiér til udklipsholder',
      error: 'Kopieringsfejl',
      copied: 'Kopieret',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Ingen matchende kommandoer',
    'start-typing': 'Begynd at skrive for at finde en kommando',
    'run-highlighted-command': 'Tryk på Enter for at køre den fremhævede kommando',
    'command-palette': {
      label: 'Kommandopalet',
    },
  },

  'documents-page': {
    title: 'Dokumenter',

    scope: {
      all: 'Alle dokumenter',
      starred: 'Med stjerne',
      recent: 'Seneste',
      private: 'Privat',
    },

    rail: {
      label: 'Dokumentfiltre',
      folders: 'Mapper',
      'no-folders': 'Ingen mapper',
    },

    search: {
      placeholder: 'Søg i dokumenter',
      label: 'Søg i dokumenter',
      clear: {
        label: 'Ryd søgning',
      },
    },
    filter: {
      label: 'Filter',
    },

    action: {
      'new-document': 'Nyt dokument',
      open: 'Åbn',
      duplicate: 'Dublér',
      rename: 'Omdøb…',
      'delete': 'Slet',
      cancel: 'Annullér',
      'make-public': 'Gør offentlig',
      'make-private': 'Gør privat',
      'version-history': 'Versionshistorik',
    },

    access: {
      public: 'Offentlig',
      private: 'Privat',
    },

    selection: {
      count: {
        one: '{count} valgt',
        other: '{count} valgt',
      },
      'make-public': {
        label: 'Gør valgte dokumenter offentlige',
      },
      'make-private': {
        label: 'Gør valgte dokumenter private',
      },
      'delete': {
        label: 'Slet valgte dokumenter',
      },
    },

    table: {
      label: 'Dokumenter',
      'select-all': {
        label: 'Vælg alle dokumenter',
      },
    },
    column: {
      starred: 'Med stjerne',
      name: 'Navn',
      folder: 'Mappe',
      access: 'Adgang',
      version: 'Version',
      modified: 'Ændret',
      actions: 'Handlinger',
    },

    row: {
      select: {
        label: 'Vælg {name}',
      },
      star: {
        label: 'Giv {name} stjerne',
      },
      unstar: {
        label: 'Fjern stjerne fra {name}',
      },
      menu: {
        label: 'Handlinger for {name}',
      },
      unnamed: {
        title: 'Dette dokument har endnu ikke noget navn',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Slet dokument, er du sikker?',
      confirm_delete_documents: 'Slet dokumenter, er du sikker?',
    },

    error: {
      title: 'Dine dokumenter kunne ikke indlæses',
      detail: 'Indlæsning mislykkedes på grund af en fejl. Prøv igen senere.',
      retry: 'Prøv igen',
    },

    messages: {
      rename_failed: 'Omdøbning mislykkedes. Prøv igen senere.',
      rename_succeeded: 'Dokument omdøbt',

      delete_failed: 'Sletning mislykkedes. Prøv igen senere.',
      one_document_deleted: 'Dokument slettet',
      multiple_documents_deleted: 'Dokumenter slettet',

      update_failed: 'Opdatering mislykkedes. Prøv igen senere.',

      duplicate_succeeded: 'Dokument oprettet',
      duplicate_failed: 'Duplikering mislykkedes. Prøv igen senere.',

      restore_succeeded: 'Dokument gendannet',
      restore_failed: 'Gendannelse mislykkedes. Prøv igen senere.',

    },

    empty: {
      title: 'Ingen dokumenter endnu',
      detail: 'Regneark, du opretter eller importerer, vises her sammen med deres versionshistorik.',
    },

    'no-match': {
      title: 'Ingen dokumenter matcher „{query}“',
      detail: 'Søgningen dækker alle mapper. Prøv et kortere udtryk.',
      action: 'Ryd søgning',
    },

    'empty-filter': {
      title: 'Intet her',
      detail: 'Ingen dokumenter matcher dette filter.',
      'detail-folder': 'Ingen dokumenter i {folder}.',
      action: 'Vis alle dokumenter',
    },

    footer: {
      count: {
        one: '{count} dokument',
        other: '{count} dokumenter',
      },
      filtered: '{count} af {total} dokumenter',
      'searching-all': 'søger i alle mapper',
    },

    panel: {
      label: 'Dokumentdetaljer',
      open: {
        // tooltip on the linked title, which opens the current version
        title: 'Åbn dokument',
      },
      close: {
        label: 'Luk detaljer',
      },
      'copy-link': {
        label: 'Kopiér link',
        copied: {
          label: 'Link kopieret',
          title: 'Kopieret',
        },
      },
      'unnamed-hint': 'Endnu intet navn — dette er adressen. Omdøbning angiver et.',
      star: {
        label: 'Giv dette dokument stjerne',
      },
      unstar: {
        label: 'Fjern stjerne fra dette dokument',
      },
      field: {
        access: 'Adgang',
        starred: 'Med stjerne',
        created: 'Oprettet',
        modified: 'Ændret',
        version: 'Version',
      },
    },

    history: {
      title: 'Ældre versioner',
      loading: 'Indlæser versionshistorik',
      error: 'Versionshistorikken kunne ikke indlæses.',
      retry: 'Prøv igen',
      menu: {
        label: 'Handlinger for version {version}',
      },
      open: {
        text: 'Åbn denne version',
        /* the version tag is a link, and 'v3' on its own is thin as a link name --
        this is its accessible name, not visible text */
        label: 'Åbn version {version}',
      },
      duplicate: 'Dublér som nyt dokument',
      restore: 'Gendan',
      none: 'Endnu ingen ældre versioner. De vises her, når du gemmer.',
      kept: {
        one: 'Beholder én ældre version.',
        other: 'Beholder de sidste {count} ældre versioner.',
      },
    },

    time: {
      'just-now': 'lige nu',
      minutes: {
        one: 'for {count} minut siden',
        other: 'for {count} minutter siden',
      },
      hours: {
        one: 'for {count} time siden',
        other: 'for {count} timer siden',
      },
      days: {
        one: 'for {count} dag siden',
        other: 'for {count} dage siden',
      },
      today: 'i dag, {time}',
      yesterday: 'i går, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Dokument',
    },
    'updated-date': {
      label: 'Opdateret',
    },
    'created-date': {
      label: 'Oprettet',
    },
    access: {
      label: 'Adgang',
      'type-private': 'Privat',
      'type-public': 'Offentlig',
    },
    'filter-documents': {
      label: 'Filtrér dokumenter',
    },

    controls: {
      'delete-selected': 'Slet valgte',
      'make-public': 'Gør offentlig',
      'make-private': 'Gør privat',
    },
  },

  'account-page': {
    title: 'Konto',
  },

  'sign-in': {
    page: {
      title: 'Log ind',
    },
    form: {
      username: {
        placeholder: 'Brugernavn eller e-mail',
      },
      password: {
        placeholder: 'Adgangskode',
      },
      'sign-in-button': {
        label: 'Log ind',
      },
      'remember-me': 'Husk mig på denne enhed',
      instructions: 'Indtast dit brugernavn og din adgangskode for at logge ind',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Glemt adgangskode',
      },
      'create-account': {
        text: 'Opret konto',
      },
      'sign-in': {
        text: 'Log ind',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Glemt adgangskode',
    },
    form: {
      instructions: 'Indtast din e-mailadresse for at nulstille din adgangskode',
      email: {
        placeholder: 'E-mailadresse',
      },
      'reset-password-button': {
        label: 'Nulstil adgangskode',
      },
    },
  },

  contact: {
    page: {
      title: 'Kontakt os',
    },
  },

  'privacy-policy': {
    page: {
      title: 'Privatlivspolitik',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Brugsvilkår',
    },
  },

  'create-account': {
    page: {
      title: 'Opret konto',
    },
  },
  'create-password': {
    page: {
      title: 'Opret adgangskode',
    },
  },
  'update-password': {
    page: {
      title: 'Opdatér adgangskode',
    },
  },

  'theme-toggle': {
    'light-theme': 'Lyst tema',
    'dark-theme': 'Mørkt tema',
    'system-theme': 'Systemtema',
  },

  // adding command palette commands labels/alt text
  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Brug mørkt tema',
        alt: 'farveskema',
      },

      'light-theme': {
        label: 'Brug lyst tema',
        alt: 'farveskema',
      },

      'system-theme': {
        label: 'Brug systemtema',
        alt: 'farveskema lyst mørkt',
      },
    },

    'remove-hyperlink': {
      label: 'Fjern hyperlink',
      alt: 'slet ryd link',
    },

    'insert-hyperlink': {
      label: 'Indsæt hyperlink',
      alt: 'tilføj angiv link',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Indtast linkadresse (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Tilføj eller redigér cellekommentar',
      alt: 'note kommentar',

      parameter: {
        comment: {
          label: 'Indtast en kommentar. Tryk på Ctrl + Enter for at gemme.',
          'label-mac': 'Indtast en kommentar. Tryk på Cmd + Enter for at gemme.',
        },
      },
    },

    'remove-comment': {
      label: 'Fjern cellekommentar',
      alt: 'note',
    },

    'reset-background-color': {
      label: 'Nulstil baggrundsfarve i markering',
      alt: 'ryd fyld',
    },

    'set-background-color': {
      label: 'Angiv baggrundsfarve for markering',
      alt: 'fyld',
    },

    'reset-text-color': {
      label: 'Nulstil tekstfarve i markering',
      alt: 'ryd forgrund',
    },

    'set-text-color': {
      label: 'Angiv tekstfarve for markering',
      alt: 'forgrund',
    },

    'reset-border-color': {
      label: 'Nulstil kantfarve i markering',
      alt: 'ryd',
    },

    'set-border-color': {
      label: 'Angiv kantfarve for markering',
    },

    'borders-clear': {
      label: 'Kanter: ryd kanter',
    },
    'border-top': {
      label: 'Kanter: angiv øverste kant på markering',
    },
    'border-bottom': {
      label: 'Kanter: angiv nederste kant på markering',
    },
    'border-double-bottom': {
      label: 'Kanter: angiv dobbelt nederste kant på markering',
    },
    'border-left': {
      label: 'Kanter: angiv venstre kant på markering',
    },
    'border-right': {
      label: 'Kanter: angiv højre kant på markering',
    },

    'border-outside': {
      label: 'Kanter: angiv yderkant på markering',
      alt: 'ydre',
    },

    'border-all': {
      label: 'Kanter: angiv alle kanter på markering',
    },

    'reset-font-scale': {
      label: 'Nulstil skriftskala',
      alt: 'tekst skriftstørrelse',
    },

    'font-scale-increase': {
      label: 'Skriftskala: forøg 10%',
      alt: 'tekst skriftstørrelse',
    },

    'font-scale-decrease': {
      label: 'Skriftskala: formindsk 10%',
      alt: 'tekst skriftstørrelse',
    },

    'insert-donut-chart': {
      label: 'Indsæt doughnutdiagram',
      alt: 'diagram graf',
    },

    'insert-column-chart': {
      label: 'Indsæt søjlediagram',
      alt: 'diagram graf',
    },

    'insert-bar-chart': {
      label: 'Indsæt liggende søjlediagram',
      alt: 'diagram graf',
    },

    'insert-line-chart': {
      label: 'Indsæt kurvediagram',
      alt: 'diagram graf',
    },

    'insert-scatter-plot': {
      label: 'Indsæt punktdiagram',
      alt: 'diagram graf',
    },

    'insert-box-plot': {
      label: 'Indsæt boksplot',
      alt: 'diagram graf whiskers',
    },

    'insert-image': {
      label: 'Indsæt billede',
    },

    'cf-gradient-red-green': {
      label: 'Betinget formatering, forløb: rød-grøn',
    },
    'cf-gradient-green-red': {
      label: 'Betinget formatering, forløb: grøn-rød',
    },
    'cf-unique-values': {
      label: 'Betinget formatering: unikke værdier',

      parameter: {
        color: {
          label: 'Vælg farve til unikke værdier',
        },
      },
    },

    'cf-data-bars': {
      label: 'Betinget formatering: datalinjer',
      alt: 'datalinje',

      parameter: {
        color: {
          label: 'Vælg farve til datalinjer',
        },
        'hide-values': {
          label: 'Skjul værdier?',
          choice: {
            'true': 'Ja, skjul værdier',
            'false': 'Nej, vis værdier',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Betinget formatering: dublerede værdier',

      parameter: {
        color: {
          label: 'Vælg farve til dublerede værdier',
        },
      },
    },

    'cf-clear': {
      label: 'Ryd betinget formatering fra markering',
      alt: 'fjern',
    },

    'fit-column-widths': {
      label: 'Tilpas bredden på valgte kolonner (autostørrelse)',
    },

    'fit-data': {
      label: 'Tilpas data',
      alt: 'tilpas',
    },

    'named-ranges': {
      label: 'Navngivne områder og udtryk',
      alt: 'navnestyring definér navn slet navn ryd',
    },

    'set-tab-color': {
      label: 'Angiv fanefarve',
    },

    'reset-tab-color': {
      label: 'Nulstil fanefarve',
      alt: 'ryd fjern',
    },

    'fit-row-heights': {
      label: 'Tilpas højden på valgte rækker (autostørrelse)',
    },

    'correlation-matrix': {
      label: 'Kontrollér korrelationsmatrix',
    },

    'hide-sheet': {
      label: 'Skjul ark',
      alt: 'synlig',
    },

    'unhide-all-sheets': {
      label: 'Vis alle ark',
      alt: 'synlig',
    },

    'unhide-columns': {
      label: 'Vis skjulte kolonner i arket',
    },
    'unhide-rows': {
      label: 'Vis skjulte rækker i arket',
    },
    'hide-rows': {
      label: 'Skjul valgte rækker',
    },
    'hide-columns': {
      label: 'Skjul valgte kolonner',
    },

    'las-vegas-simulation': {
      label: 'Las Vegas-simulering...',
    },
    'simulation-settings': {
      label: 'Simuleringsindstillinger...',
    },
    'language-settings': {
      label: 'Sprogindstillinger...',
    },

    'load-desktop-file': {
      label: 'Indlæs skrivebordsfil...',
      alt: 'excel csv importér',
    },

    'save-xlsx': {
      label: 'Gem som XLSX',
      alt: 'download excel',
    },

    'save-csv': {
      label: 'Gem aktuelt ark som CSV',
      alt: 'download eksportér',
    },

    'save-to-cloud': {
      label: 'Gem til sky',
    },

    'load-document': {
      label: 'Indlæs dokument...',
      alt: 'åbn',
    },

    'download-json': {
      label: 'Download til skrivebord (JSON)',
      alt: 'gem',
    },

    'insert-function': {
      label: 'Indsæt funktion...',
    },
    find: {
      label: 'Find i værdier/formler...',
    },
    'insert-distribution': {
      label: 'Indsæt tilfældig fordeling...',
    },
    'run-simulation': {
      label: 'Kør simulering...',
    },
    'quick-view': {
      label: 'Hurtig visning...',
    },
    'new-model': {
      label: 'Ny model',
    },
    'revert-file': {
      label: 'Gendan fil',
    },
    recalculate: {
      label: 'Genberegn',
    },
    undo: {
      label: 'Fortryd',
    },
    'delete-columns': {
      label: 'Slet valgte kolonner',
    },
    'delete-rows': {
      label: 'Slet valgte rækker',
    },
    'insert-column': {
      label: 'Indsæt kolonne',
    },
    'insert-row': {
      label: 'Indsæt række',
    },
    'set-view-scale': {
      label: 'Angiv visningsskala (zoom)',

      parameter: {
        scale: {
          label: 'Indtast visningsskalaen',
        },
      },
    },
    'reset-view-scale': {
      label: 'Nulstil visningsskala (zoom)',
    },

    'rename-tab': {
      label: 'Omdøb fane',
      alt: 'ark side',

      parameter: {
        name: {
          label: 'Indtast et navn til denne fane',
        },
      },
    },

    'add-tab': {
      label: 'Tilføj fane',
      alt: 'ark side',

      parameter: {
        name: {
          label: 'Indtast et navn til den nye fane',
        },
      },
    },

    'delete-tab': {
      label: 'Slet fane',
      alt: 'ark side',
    },

    'increase-indent': {
      label: 'Forøg indrykning',
      alt: 'mere',
    },

    'decrease-indent': {
      label: 'Formindsk indrykning',
      alt: 'mindre',
    },

    'number-format-increase-precision': {
      label: 'Talformat: forøg præcision',
      alt: 'flere decimaler',
    },

    'number-format-decrease-precision': {
      label: 'Talformat: formindsk præcision',
      alt: 'færre decimaler',
    },

    'number-format': {
      label: 'Talformat',
      alt: 'brugerdefineret talformat',

      parameter: {
        format: {
          label: 'Indtast et talformat eller et symbolsk navn',
        },
      },
    },

    'merge-cells': {
      label: 'Flet valgte celler',
    },
    'unmerge-cells': {
      label: 'Ophæv fletning af valgte celler',
    },
    'lock-cells': {
      label: 'Lås valgte celler',
    },
    'unlock-cells': {
      label: 'Lås valgte celler op',
    },

    'valign-top': {
      label: 'Formatér markering: lodret justering øverst',
    },
    'valign-bottom': {
      label: 'Formatér markering: lodret justering nederst',
    },
    'valign-middle': {
      label: 'Formatér markering: lodret justering i midten',
    },

    'align-left': {
      label: 'Formatér markering: venstrejustér tekst',
      alt: 'vandret justering',
    },

    'align-right': {
      label: 'Formatér markering: højrejustér tekst',
      alt: 'vandret justering',
    },

    'align-center': {
      label: 'Formatér markering: centrér tekst',
      alt: 'vandret justering centrér',
    },

    'toggle-word-wrap': {
      label: 'Formatér markering: skift tekstombrydning',
    },

    'toggle-gridlines': {
      label: 'Skift gitterlinjer i aktivt ark',
    },
    'show-gridlines': {
      label: 'Vis gitterlinjer i aktivt ark',
    },
    'hide-gridlines': {
      label: 'Skjul gitterlinjer i aktivt ark',
    },

    'toggle-bold': {
      label: 'Formatér markering: skift fed',
    },
    'toggle-italic': {
      label: 'Formatér markering: skift kursiv',
    },
    'toggle-underline': {
      label: 'Formatér markering: skift understregning',
    },
    'toggle-strikethrough': {
      label: 'Formatér markering: skift gennemstregning',
    },

    'reset-text-formatting': {
      label: 'Formatér markering: nulstil tekstformatering',
      alt: 'ryd',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Fjern kommentar',
    },
    'save-button': {
      label: 'Gem',
    }
  },

  'correlation-matrix': {
    'title': 'Korrelationsmatrix',
    'accept-changes': 'Acceptér ændringer',
    'close-dialog': 'Luk',

    'invalid-shape': 'Vælg en kvadratisk matrix på mindst 2x2 celler.',
    'invalid-data': 'Korrelationsmatrixen skal have en enhedsdiagonal.\nHver celle på diagonalen skal give {unit}.',
    'asymmetric': 'Korrelationsmatrixen skal være symmetrisk, eller du kan udelade den øvre eller nedre trekant.',

    'solution-text': `Korrelationsmatrixen er ikke positivt definit. Vi fandt en løsning ved at foretage små justeringer af værdierne. Den samlede fejl er {error}.`,
    'positive-definite': `Korrelationsmatrixen er positivt definit.`,

  },

  //
  // sign-in page (the redesigned one -- the sign-in.* and auth.link.* keys
  // above belong to the old page. 'sign-in.page.title' is still live: it's the
  // toolbar's title, which isn't the same string as the heading on the page).
  //
  'sign-in-page': {
    heading: 'Log ind',
    subtitle: 'Indtast dit brugernavn og din adgangskode for at logge ind.',

    username: {
      label: 'Brugernavn eller e-mail',
      required: 'Indtast dit brugernavn eller din e-mail.',
    },

    password: {
      label: 'Adgangskode',
      required: 'Indtast din adgangskode.',
      show: {
        label: 'Vis adgangskode',
      },
      hide: {
        label: 'Skjul adgangskode',
      },
      'caps-lock': 'Caps Lock er slået til.',
    },

    remember: {
      label: 'Husk mig på denne enhed',
    },

    submit: {
      label: 'Log ind',
      pending: 'Logger ind…',
    },

    error: {
      rejected: 'Forkert brugernavn eller adgangskode.',
      unreachable: 'Kan ikke nå serveren. Kontrollér din forbindelse, og prøv igen.',
      incomplete: 'Login blev ikke fuldført. Prøv igen.',
    },

    link: {
      'forgot-password': 'Glemt adgangskode',
      'create-account': 'Opret konto',
    },
  },

  //
  // shared form rules -- the messages the validators in
  // ~/backstage/account-validation.ts return.
  //
  'backstage-form': {
    email: {
      required: 'Indtast din e-mailadresse.',
      invalid: 'Det ligner ikke en e-mailadresse.',
    },

    username: {
      required: 'Vælg et brugernavn.',
      'too-short': 'Brugernavne er på mindst {min} tegn.',
      'too-long': 'Brugernavne er på højst {max} tegn.',
      invalid: 'Brug bogstaver, tal, bindestreger og understregninger, der starter med et bogstav.',
    },

    password: {
      required: 'Vælg en adgangskode.',
      'too-short': 'Adgangskoder er på mindst {min} tegn.',
    },
  },

  //
  // create account page (the redesigned one).
  //
  'create-account-page': {
    heading: 'Opret konto',

    subtitle: 'Vi beder om en e-mailadresse og et brugernavn, fordi dokumenter gemmes under dit brugernavn.',

    // {link} is the terms of service link, spliced in so a translation can put it
    // where its own grammar needs it
    terms: {
      text: 'Læs venligst vores {link}.',
      link: 'servicevilkår',
    },

    email: {
      label: 'E-mailadresse',
      taken: 'Der findes allerede en konto med den e-mailadresse.',
    },

    username: {
      label: 'Brugernavn',
      taken: '@{username} er allerede taget.',
      reserved: '@{username} er ikke tilgængeligt.',
      checking: 'Kontrollerer tilgængelighed…',
      available: '@{username} er tilgængeligt.',
    },

    handle: {
      example: '@{username}/example',
      placeholder: 'brugernavn',
    },

    after: 'Vi sender dig en e-mail med et link til at bekræfte din adresse og oprette en adgangskode.',

    submit: {
      label: 'Opret konto',
      pending: 'Opretter konto…',
    },

    error: {
      unreachable: 'Kan ikke nå serveren. Kontrollér din forbindelse, og prøv igen.',
      rejected: 'Kontoen kunne ikke oprettes. Kontrollér dine oplysninger, og prøv igen.',
    },

    done: {
      heading: 'Tjek din e-mail',
      body: 'Vi har sendt et link til {email}. Åbn det for at bekræfte din adresse og vælge en adgangskode.',
      spam: 'Intet der? Vent et øjeblik, og tjek derefter din spammappe.',
      restart: 'Brug en anden adresse',
    },

    link: {
      'forgot-password': 'Glemt adgangskode',
      'sign-in': 'Log ind',
    },
  },

  //
  // forgot password page (the redesigned one).
  //
  'forgot-password-page': {
    heading: 'Glemt adgangskode',
    subtitle: 'Indtast din e-mailadresse, så sender vi dig et link til at vælge en ny adgangskode.',

    email: {
      label: 'E-mailadresse',
    },

    submit: {
      label: 'Send linket',
      pending: 'Sender…',
    },

    error: {
      unreachable: 'Kan ikke nå serveren. Kontrollér din forbindelse, og prøv igen.',
    },

    done: {
      heading: 'Tjek din e-mail',
      body: 'Hvis der findes en konto for {email}, har vi sendt den et link. Åbn det for at vælge en ny adgangskode.',
      spam: 'Intet der? Vent et øjeblik, og tjek derefter din spammappe.',
      restart: 'Brug en anden adresse',
    },

    link: {
      'sign-in': 'Log ind',
      'create-account': 'Opret konto',
    },
  },

  'contact-page': {
    eyebrow: 'Kontakt os',
    heading: 'Send en besked',
    subtitle: 'Vi læser hver besked. Send os fejl, idéer, eller fortæl os bare, hvad du synes.',

    name: {
      label: 'Navn',
    },

    email: {
      label: 'E-mail (valgfrit)',
    },

    message: {
      label: 'Besked',
    },

    submit: {
      label: 'Send',
      pending: 'Sender…',
    },

    error: {
      'name-required': 'Indtast dit navn.',
      'message-required': 'Indtast en besked.',
      unreachable: 'Kan ikke nå serveren. Kontrollér din forbindelse, og prøv igen.',
      failed: 'Noget gik galt ved afsendelsen af din besked. Prøv igen.',
    },

    done: {
      heading: 'Tak for din feedback!',
      body: 'Vi læser din besked og vender tilbage til dig, så snart vi kan.',
      home: 'Tilbage til start',
    },
  },

  //
  // update password page.
  //
  'create-password-page': {
    heading: 'Opret en adgangskode',
  },

  'update-password-page': {
    heading: 'Vælg en ny adgangskode',
    subtitle: 'Indtast tokenet fra linket, vi sendte dig.',

    identifier: {
      label: 'Brugernavn eller e-mail',
      required: 'Indtast dit brugernavn eller din e-mail.',
    },

    token: {
      label: 'Token',
      required: 'Indtast tokenet fra linket, vi sendte dig.',
      invalid: 'Det token er ikke gyldigt. Tjek linket, eller bed om et nyt.',
      expired: 'Det link er udløbet. Bed om et nyt.',
      used: 'Det link er allerede blevet brugt. Bed om et nyt.',
    },

    password: {
      label: 'Ny adgangskode',
      show: {
        label: 'Vis adgangskode',
      },
      hide: {
        label: 'Skjul adgangskode',
      },
      'caps-lock': 'Caps Lock er slået til.',

      common: 'Den adgangskode er for nem at gætte. Vælg en anden.',
    },

    strength: {
      title: 'Adgangskodestyrke',

      weak: 'Svag',
      fair: 'Nogenlunde',
      good: 'God',
      strong: 'Stærk',
    },

    submit: {
      label: 'Opdatér adgangskode',
      pending: 'Opdaterer…',
    },

    error: {
      unreachable: 'Kan ikke nå serveren. Kontrollér din forbindelse, og prøv igen.',
      rejected: 'Adgangskoden kunne ikke opdateres. Kontrollér dine oplysninger, og prøv igen.',
    },

    done: {
      heading: 'Adgangskode opdateret',
      body: 'Din nye adgangskode er gemt.',
      'continue': 'Fortsæt til appen',
    },

    link: {
      'sign-in': 'Log ind',
      'forgot-password': 'Send et nyt link',
    },
  },

  'new-document': {
    'discard-changes-message': 'Du har ikke-gemte ændringer. Er du sikker?',
    'discard-changes-confirm': 'Nyt dokument',
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Ikke-gemte ændringer',
    },
  },
} satisfies DeepPartial<I18N>;
