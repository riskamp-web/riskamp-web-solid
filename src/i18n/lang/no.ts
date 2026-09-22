
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
    title: 'Språkinnstillinger...',
  },

  'select-language-dialog': {
    'title': 'Språkinnstillinger',
    'select-language': 'Velg språk',
    'system-setting': 'Systeminnstilling',
    'decimal-separator': 'Desimalskilletegn',
    'decimal-separator-dot': 'Punktum',
    'decimal-separator-comma': 'Komma',
  },

  about: {
    tagline: 'Monte Carlo-risikoanalyse for nettet.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Med enerett.',
    website: 'riskamp.com',
    'old-website-version': 'Ser du etter den gamle versjonen av RiskAMP web? Bruk {link}',
    report: 'Rapporter et problem',
    'report-subject': 'RiskAMP web — problemrapport',
    'report-body': '(beskriv problemet her)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nBrowser: {ua}\nSpråk: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Fil',
      help: 'Hjelp',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Data og analyse',
      tools: 'Verktøy',
      account: 'Konto',
    },

    'menu-commands': {
      documents: 'Dokumenter',
      'account-page': 'Kontoside',
      'sign-out': 'Logg av',
    },

    tabs: {
      home: 'Hjem',
      layout: 'Oppsett',
      format: 'Format',
      insert: 'Sett inn',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Data og analyse',
    },

    menu: {
      'about-riskamp': 'Om RiskAMP web',
      'function-documentation': 'RiskAMP-funksjonsdokumentasjon',
      walkthrough: 'Gjennomgangsmodell',
      contact: 'Kontakt oss',
    },

    button: {
      'toggle-fullscreen': 'Veksle fullskjerm',

      'new-spreadsheet': 'Nytt regneark',
      'import-file': 'Importer fil',
      'open-file': 'Åpne fil',
      'save-file': 'Lagre fil',
      'save-file-as': 'Lagre som...',
      'revert-file': 'Tilbakestill fil',
      'save-to-desktop': 'Lagre til skrivebord',
      'export-xlsx': 'Eksporter XLSX',
      'export-csv': 'Eksporter CSV',

      'sign-in': 'Logg inn',
      'create-account': 'Opprett konto',

      'search-cells': {
        label: 'Søk i celler',
      },
      'defined-names': {
        label: 'Definerte navn',
      },
      'fit-data': {
        label: 'Tilpass data',
      },
      notes: {
        label: 'Notater',
      },

      'monte-carlo-simulation': {
        label: 'Monte Carlo-simulering',
      },
      'run-simulation': {
        label: 'Kjør simulering',
      },
      'run-simulation-again': {
        label: 'Kjør simulering på nytt',
      },
      'las-vegas-simulation': {
        label: 'Las Vegas-simulering',
      },
      'simulation-settings': {
        label: 'Simuleringsinnstillinger',
      },
      'quick-view': {
        label: 'Hurtigvisning',
      },
      'quick-view-correlation': {
        label: 'Hurtigvisning korrelasjon',
      },
      recalculate: {
        label: 'Beregn på nytt',
      },

      'align-left': {
        label: 'Venstrejuster',
      },
      'align-center': {
        label: 'Midtstill',
      },
      'align-right': {
        label: 'Høyrejuster',
      },

      'align-top': {
        label: 'Juster øverst',
      },
      'align-middle': {
        label: 'Juster i midten',
      },
      'align-bottom': {
        label: 'Juster nederst',
      },

      'increase-indent': {
        label: 'Øk innrykk',
      },
      'decrease-indent': {
        label: 'Reduser innrykk',
      },
      'wrap-text': {
        label: 'Tekstbryting',
      },

      'toggle-integer-grouping': {
        label: 'Veksle gruppering',
      },
      'increase-decimal-precision': {
        label: 'Øk presisjon',
      },
      'decrease-decimal-precision': {
        label: 'Reduser presisjon',
      },

      'merge-cells': {
        label: 'Slå sammen celler',
      },
      'unmerge-cells': {
        label: 'Del opp celler',
      },

      'lock-cells': {
        label: 'Lås celler for redigering',
      },
      'unlock-cells': {
        label: 'Lås opp celler for redigering',
      },

      bold: {
        label: 'Veksle fet tekst',
      },
      italic: {
        label: 'Veksle kursiv tekst',
      },
      underline: {
        label: 'Veksle understreking',
      },
      strikethrough: {
        label: 'Veksle gjennomstreking',
      },

      'insert-row': {
        label: 'Sett inn rad',
      },
      'insert-column': {
        label: 'Sett inn kolonne',
      },
      'delete-row': {
        label: 'Slett rad',
      },
      'delete-column': {
        label: 'Slett kolonne',
      },

      'text-color': {
        label: 'Tekstfarge',
      },
      'background-color': {
        label: 'Bakgrunnsfarge',
      },
      'border-color': {
        label: 'Kantlinjefarge',
      },

      'border-top': {
        title: 'Kantlinje øverst',
      },
      'border-bottom': {
        title: 'Kantlinje nederst',
      },
      'border-double-bottom': {
        title: 'Dobbel kantlinje nederst',
      },
      'border-left': {
        title: 'Kantlinje venstre',
      },
      'border-right': {
        title: 'Kantlinje høyre',
      },
      'border-all': {
        title: 'Alle kantlinjer',
      },
      'border-none': {
        title: 'Fjern kantlinjer',
      },
      'border-outside': {
        title: 'Ytre kantlinjer',
      },

      'correlation-matrix': {
        title: 'Korrelasjonsmatrise',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline-kolonne',
      'sparkline-line': 'Sparkline-linje',

      insert: {
        'bar-chart': 'Stolpediagram',
        'donut-chart': 'Smultringdiagram',
        'column-chart': 'Søylediagram',
        'line-chart': 'Linjediagram',
        'scatter-plot': 'Punktdiagram',
        'area-chart': 'Områdediagram',
        image: 'Bilde',

        comment: 'Kommentar',
        table: 'Tabell',
      },

      forecast: 'Trendprognose',
    },

    'open-menu': 'Åpne meny',

    'more-commands-button': {
      label: 'Flere kommandoer...',
    },

    combobox: {
      'font-size': {
        label: 'Skriftstørrelse',
      },
      'number-format': {
        label: 'Tallformat',
      },
    },

    label: {
      'spreadsheet-cells': 'Regnearkceller',
    },

    message: {
      'changes-stored-in-browser': 'Endringer beholdes i nettleserlagringen til du lagrer eller tilbakestiller dem.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'RiskAMP-dokumentasjon',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Tilbake',
        forward: 'Fremover',
      },
    },
    label: {
      'close-sidebar': 'Lukk sidepanel',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Parallell beregning',
        'max-workers': 'Antall arbeidere (maksimum)',
        'explanatory-text': `Å bruke flere arbeidere parallelt forbedrer simuleringsytelsen for komplekse modeller. I de fleste tilfeller anbefaler vi 4 eller 8 arbeidere.`,
      },

      'random-sampling': {
        'section-header': 'Tilfeldig utvalg',
        'explanatory-text': 'Utvalgsmetoden lagres med dette regnearket.\nVerdien du velger her, brukes også som standard for nye regneark.',
      },

      'random-seed': {
        'section-header': 'Tilfeldig seed',
        'explanatory-text': 'Den tilfeldige seed-verdien lagres med dette regnearket.\nSkriv inn et tall for å bruke en fast seed, eller skriv inn 0 for å bruke en tilfeldig seed i hver simulering.',

        'enter-seed-value': 'Skriv inn seed',
        'seed-value': 'Seed-verdi',
        'reset-seed-value': 'Tilbakestill seed',
        'time-based-seed': 'Bruk en tidsbasert seed',
      },

      title: 'Simuleringsinnstillinger',
      'latin-hypercube-sampling': 'Latin hypercube-utvalg (LHS)',
      'standard-random-sampling': 'Standard tilfeldig utvalg',

      'fixed-random-seed': 'Fast seed',
      'seed-value-placeholder-text': 'Seed-verdi',
    },

    'notes-panel': {
      title: 'Notater',
      'open-notes-with-spreadsheet': 'Åpne notater med regneark',
      edit_markdown: 'Rediger markdown',
      view_formatted: 'Vis formatert',
    },
    'fit-data-panel': {
      title: 'Tilpass data',
    },
  },

  'color-picker': {
    choose_color: 'Velg farge',
    use_selected_color: 'Bruk valgt farge',
    theme_colors: 'Temafarger',
    other_colors: 'Andre farger',
    no_color: 'Ingen farge',
    new_color: 'Ny farge',
    default_text_color: 'Standard tekstfarge',
    default_border_color: 'Standard kantlinjefarge',
    no_fill: 'Ingen fyll',

    theme: {
      background: 'Bakgrunn',
      text: 'Tekst',
      accent: 'Aksent',
      lighter: 'Lysere',
      darker: 'Mørkere',
    },
  },

  'names-panel': {
    title: 'Definerte navn',
    header: {
      name: 'Navn',
      'name-scope': 'Omfang',
      value: 'Verdi',
    },
    'name-scope': {
      sheet: 'Ark',
      workbook: 'Arbeidsbok',
    },
    label: {
      'delete-name': 'Slett navn',
      'define-name': 'Definer navn',
      'edit-name': 'Rediger navn',
    },
    'name-type': {
      reference: 'Referanse',
      expression: 'Uttrykk',
    },
  },

  'search-panel': {
    title: 'Søk i celler',
    'search-text': {
      placeholder: 'Søketekst',
    },
    'search-in': {
      text: 'Søk i',
    },
    'search-type': {
      'cell-values': 'Verdier',
      'cell-formulas': 'Formler',
      wildcards: 'Jokertegn',
    },
    'search-scope': {
      'current-sheet': 'Gjeldende ark',
      'all-sheets': 'Alle ark',
    },
    'search-results': {
      header: {
        address: 'Adresse',
        value: 'Verdi',
        formula: 'Formel',
      },
      information: {
        'enter-text': 'Skriv inn tekst for å søke',
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
        title: 'Verdier',
      },
      periods: 'Prognoseperioder',
      seasonality: 'Sesongvariasjon',

      'fill-empty': 'Fyll',
      'aggregate-multiple': 'Aggreger',
      'project-forward-periods': 'Perioder',
      'chart-type': {
        label: 'Diagramtype',
      },
      'chart-type-line-chart': 'Linje',
      'chart-type-column-chart': 'Søyle',
    },
    options: {
      'model-type': 'Modell',
      'forecast-type': 'Prognosetype',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel-kompatibel',
      'static-forecast': 'Statisk',
      'stochastic-forecast': 'Stokastisk',
    },
    settings: 'Innstillinger',
    'create-forecast-sheet': 'Opprett prognoseark',
    seasonality: {
      'auto-detect': 'Oppdag automatisk',
    },
    'fill-options': {
      interpolate: 'Interpoler',
      zeros: 'Nuller',
    },
    'aggregate-options': {
      average: 'Gjennomsnitt',
      median: 'Median',
      min: 'Min',
      max: 'Maks',
      sum: 'Sum',
      count: 'Antall',
    },

    'chart-labels': {
      values: 'Verdier',
      forecast: 'Prognose',
    },
  },

  'forecast-sheet-timeline-header': 'Tidslinje',
  'forecast-sheet-values-header': 'Verdier',
  'forecast-sheet-forecast-header': 'Prognose',
  'forecast-sheet-sample-header': 'Utvalg',
  'forecast-sheet-statistics-header': 'Statistikk',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Gjennomsnitt',
    },
    'p80-range': {
      header: 'P80-område',
    },
  },

  'sparkline-dialog': {
    title: 'Sett inn sparkline',
    parameters: {
      target: {
        title: 'Målcelle',
        'overwrite-warning': 'Data i målområdet blir overskrevet',
        'merge-warning': 'De valgte cellene blir slått sammen for sparklinen',
      },
      source: {
        title: 'Kildedataområde',
      },
    },
    info: 'Bruk cellens forgrunns- og bakgrunnsfarger for å style sparklinen',

    'sparkline-type': 'Sparkline-type',
    'sparkline-type-line-chart': 'Linje',
    'sparkline-type-column-chart': 'Søyle',
  },

  'quick-view-dialog': {
    title: 'Hurtigvisning',
    'select-cell': 'Velg celle',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Boksplott',
    'show-statistics': 'Statistikk',
    'histogram-bin-algorithm-long': 'Intervallalgoritme',
    'histogram-bin-algorithm-short': 'Intervaller',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Whisker-type',
    'box-plot-whisker-type-short': 'Whiskere',
    'box-plot-whisker-type-minmax': 'Min/maks',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Det finnes ingen simuleringsdata for den valgte cellen. Kjør en simulering med knappen nedenfor for å samle inn data for denne cellen.\n\nSimuleringsdata samles inn automatisk når en celle refereres av en statistikkfunksjon (som SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Maks',
      first_quartile: '1. kvartil',
      third_quartile: '3. kvartil',
      median: 'Median',
      'interquartile-range': 'IQR',
      mean: 'Gjennomsnitt',
      variance: 'Varians',
      'standard-deviation': 'St.avvik',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Lås hurtigvisningsvalget',
        'click-to-unlock': 'Lås opp hurtigvisningsvalget',
        'return-to-selection': 'Tilbake til valgt celle',
        'selection-locked': 'Valg låst',
      },
    },
  },

  'dialog-close-label': 'Lukk',
  'dialog-close-title': 'Lukk dialog',
  'dialog-help-title': 'Hjelp',

  'standard-buttons': {
    close: {
      label: 'Lukk',
      title: 'Lukk dialog',
    },
    apply: {
      title: 'Bruk',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Tilbake',
    },
    yes: {
      title: 'Ja',
    },
    no: {
      title: 'Nei',
    },
    accept: {
      title: 'Godta',
    },
    cancel: {
      title: 'Avbryt',
    },
  },

  'confirm-dialog': {
    title: 'Er du sikker?',
    'alert-title': 'Varsel',
    confirm: 'Bekreft',
    cancel: 'Avbryt',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte Carlo-simulering',
  'run-simulation': {
    'number-of-trials': 'Antall forsøk',
    'screen-updates': 'Vis skjermoppdateringer',
    starting: 'Starter...',
    'percent-complete': 'fullført',
  },
  'run-simulation-start-label': 'Start',
  'run-simulation-start-title': 'Start simulering',
  'run-simulation-cancel-label': 'Stopp',
  'run-simulation-cancel-title': 'Stopp simulering',

  'load-error': {
    'loading-document-failed': 'Den forespurte filen kunne ikke lastes inn',
  },

  'save-as-dialog': {
    'default-title': 'Lagre som',
    'rename-title': 'Gi dokumentet nytt navn',
    'duplicate-title': 'Dupliser dokument',
    folder: 'Mappe',
    name: 'Navn',
    access: 'Tilgang',
    public: 'Offentlig',
    private: 'Privat',
    save: 'Lagre',
    overwrite: 'Overskriv',
    'folder-placeholder': 'Valgfritt — f.eks. finance/reports',
    'name-placeholder': 'Dokumentnavn',
    'preview-label': 'Lagres som',
    'copy-link': 'Kopier lenke',
    'copy-link-copied': 'Lenke kopiert',
    collision: 'Det finnes allerede et dokument på denne banen.',
    'collision-blocked': 'Det finnes allerede et dokument på denne banen. Velg et annet navn.',
    empty: 'Skriv inn et navn',
    saved: '«{name}» lagret',
    'save-failed': 'Kunne ikke lagre «{name}».',
    retry: 'Prøv igjen',
    'overwrite-confirm-title': 'Overskrive dokument?',
    'overwrite-confirm-message': 'Det finnes allerede et dokument på «{name}». Overskriving erstatter innholdet. Er du sikker?',

    'path-exists-title': 'Dokumentet finnes',
    'path-exists-message': 'Det finnes allerede et dokument med den banen. Slett det dokumentet først hvis du vil gjenbruke banen.',

  },

  toast: {
    'region-label': 'Varsler',
    dismiss: 'Lukk',
  },

  'las-vegas-simulation-panel': {
    title: 'Las Vegas-simulering',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Godta',
        description: 'Godta er en celle som returnerer TRUE eller FALSE for å godta eller avvise et forsøk. Påkrevd.',
      },
      complete: {
        title: 'Fullfør',
        description: 'Fullfør er en celle som returnerer TRUE for å avslutte simuleringen, eller et antall godtatte forsøk. Påkrevd.',
      },
      fail: {
        title: 'Mislykkes',
        description: 'Mislykkes er en celle som returnerer TRUE for å avslutte simuleringen, eller et maksimalt totalt antall forsøk. Valgfritt.',
      },
    },
    'more-information-link': {
      title: 'Mer informasjon',
    },
    'running-simulation': 'Kjører simulering...',
    'options-overview': 'Skriv inn alternativer for en Las Vegas-simulering.',
  },

  'insert-function': {
    button: {
      title: 'Sett inn funksjon...',
    },
    'insert-function': 'Sett inn funksjon',
    'search-for-function': 'Søk etter funksjon...',
    'function-result': 'Resultat',
  },

  'function-dialog': {
    'select-function': {
      title: 'Velg funksjon',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultat',
    volatile: 'flyktig',
    'function-help-title': 'Hjelp om denne funksjonen',
  },

  'number-format': {
    general: 'Generelt',
    number: 'Tall',
    integer: 'Heltall',
    percent: 'Prosent',
    fraction: 'Brøk',
    accounting: 'Regnskap',
    currency: 'Valuta',
    scientific: 'Vitenskapelig',

    timestamp: 'Tidsstempel',
    'long-date': 'Lang dato',
    'short-date': 'Kort dato',
  },

  'llm-chat': {
    panel: {
      title: 'KI-assistent',
    },
    'settings-tab': {
      title: 'Innstillinger',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Bytte modell?',
      message: 'Denne modellen bruker en annen leverandør, så den gjeldende samtalen blir slettet. Fortsette?',
      confirm: 'Bytt modell',
    },
    buttons: {
      'send-message': 'Send',

      'clear-conversation': 'Tøm samtale',
      save: 'Lagre til skrivebord',
      resend: 'Send siste melding på nytt',
      restart: 'Start på nytt fra første melding',
    },

    label: {
      'api-key': 'API-nøkkel',
      'api-key-placeholder': 'Lim inn API-nøkkelen din',
      'reveal-api-key': 'Vis API-nøkkel',
      'hide-api-key': 'Skjul API-nøkkel',
      model: 'Modell',
      'choose-a-model': 'Velg en modell',
      'select-a-model': 'Velg en modell',
      header: {
        important: 'Viktig',
      },
      disclaimer: 'KI-grensesnittet kjører i bring-your-own-key-modus. For å bruke det må du oppgi en API-nøkkel for en støttet leverandør/modell.\nVi ser aldri API-nøkkelen din. Den forblir i nettleseren din og sendes bare til den offisielle leverandøren når du sender en chatmelding.\nModelleverandøren din belaster deg for tokener eller i henhold til abonnementet ditt.',

      provider_link: 'Leverandørens nettside',
      model_information_link: 'Modellinformasjon',
      screenshots_disabled: 'Merk: denne modellen støtter ikke skjermbilder.',

    },

    // transient status shown while the assistant is working; these steps are
    // never persisted as message blocks (see chat-messages.tsx activity()).
    activity: {
      thinking: 'Tenker…',
      working: 'Arbeider…',
      running: 'Kjører {tool}…',
    },

    error: {
      unknown: 'ukjent feil',
      'unknown-type': 'ukjent type',
    },

    aborted: 'Generering stoppet.',
  },

  'developer-panel': {
    title: 'Utviklerinfo',
  },

  'fit-data-panel': {
    'select-range': 'Velg område',
    'candidate-distributions': {
      label: 'Kandidatfordelinger',
      description: 'Kandidater sorteres etter nærmest tilpasning til den teoretiske fordelingen',
    },
    'log-normal-graph': {
      description: 'Den lognormale grafen tegnes med logaritmisk skala',
    },
    statistics: {
      error: 'Feil',
      mean_square_error: 'Gjennomsnittlig kvadratisk feil',
      aggregate_error: 'Aggregert feil',
      max_error: 'Maksimal feil',
      mean_error: 'Gjennomsnittlig feil',
    },

    label: {
      'click-to-lock': 'Lås datatilpasningsvalget',
      'click-to-unlock': 'Lås opp datatilpasningsvalget',
    },

    'distribution-parameters': 'Fordelingsparametere',
    'spreadsheet-function': 'Regnearkfunksjon',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Kopier til utklippstavlen',
      error: 'Kopieringsfeil',
      copied: 'Kopiert',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Ingen samsvarende kommandoer',
    'start-typing': 'Begynn å skrive for å finne en kommando',
    'run-highlighted-command': 'Trykk Enter for å kjøre den uthevede kommandoen',
    'command-palette': {
      label: 'Kommandopalett',
    },
  },

  'documents-page': {
    title: 'Dokumenter',

    scope: {
      all: 'Alle dokumenter',
      starred: 'Stjernemerket',
      recent: 'Nylige',
      private: 'Private',
    },

    rail: {
      label: 'Dokumentfiltre',
      folders: 'Mapper',
      'no-folders': 'Ingen mapper',
    },

    search: {
      placeholder: 'Søk i dokumenter',
      label: 'Søk i dokumenter',
      clear: {
        label: 'Tøm søk',
      },
    },
    filter: {
      label: 'Filter',
    },

    action: {
      'new-document': 'Nytt dokument',
      open: 'Åpne',
      duplicate: 'Dupliser',
      rename: 'Gi nytt navn…',
      'delete': 'Slett',
      cancel: 'Avbryt',
      'make-public': 'Gjør offentlig',
      'make-private': 'Gjør privat',
      'version-history': 'Versjonshistorikk',
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
        label: 'Gjør valgte dokumenter offentlige',
      },
      'make-private': {
        label: 'Gjør valgte dokumenter private',
      },
      'delete': {
        label: 'Slett valgte dokumenter',
      },
    },

    table: {
      label: 'Dokumenter',
      'select-all': {
        label: 'Velg alle dokumenter',
      },
    },
    column: {
      starred: 'Stjernemerket',
      name: 'Navn',
      folder: 'Mappe',
      access: 'Tilgang',
      version: 'Versjon',
      modified: 'Endret',
      actions: 'Handlinger',
    },

    row: {
      select: {
        label: 'Velg {name}',
      },
      star: {
        label: 'Stjernemerk {name}',
      },
      unstar: {
        label: 'Fjern stjernemerke fra {name}',
      },
      menu: {
        label: 'Handlinger for {name}',
      },
      unnamed: {
        title: 'Dette dokumentet har ikke noe navn ennå',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Slette dokument, er du sikker?',
      confirm_delete_documents: 'Slette dokumenter, er du sikker?',
    },

    error: {
      title: 'Kunne ikke laste inn dokumentene dine',
      detail: 'Innlasting mislyktes på grunn av en feil. Prøv igjen senere.',
      retry: 'Prøv igjen',
    },

    messages: {
      rename_failed: 'Endring av navn mislyktes. Prøv igjen senere.',
      rename_succeeded: 'Dokumentet fikk nytt navn',

      delete_failed: 'Sletting mislyktes. Prøv igjen senere.',
      one_document_deleted: 'Dokument slettet',
      multiple_documents_deleted: 'Dokumenter slettet',

      update_failed: 'Oppdatering mislyktes. Prøv igjen senere.',

      duplicate_succeeded: 'Dokument opprettet',
      duplicate_failed: 'Duplisering mislyktes. Prøv igjen senere.',

      restore_succeeded: 'Dokument gjenopprettet',
      restore_failed: 'Gjenoppretting mislyktes. Prøv igjen senere.',

    },

    empty: {
      title: 'Ingen dokumenter ennå',
      detail: 'Regneark du oppretter eller importerer, vises her sammen med versjonshistorikken.',
    },

    'no-match': {
      title: 'Ingen dokumenter samsvarer med «{query}»',
      detail: 'Søket dekker alle mapper. Prøv et kortere søkeord.',
      action: 'Tøm søk',
    },

    'empty-filter': {
      title: 'Ingenting her',
      detail: 'Ingen dokumenter samsvarer med dette filteret.',
      'detail-folder': 'Ingen dokumenter i {folder}.',
      action: 'Vis alle dokumenter',
    },

    footer: {
      count: {
        one: '{count} dokument',
        other: '{count} dokumenter',
      },
      filtered: '{count} av {total} dokumenter',
      'searching-all': 'søker i alle mapper',
    },

    panel: {
      label: 'Dokumentdetaljer',
      open: {
        // tooltip on the linked title, which opens the current version
        title: 'Åpne dokument',
      },
      close: {
        label: 'Lukk detaljer',
      },
      'copy-link': {
        label: 'Kopier lenke',
        copied: {
          label: 'Lenke kopiert',
          title: 'Kopiert',
        },
      },
      'unnamed-hint': 'Ikke noe navn ennå — dette er adressen. Å gi nytt navn angir ett.',
      star: {
        label: 'Stjernemerk dette dokumentet',
      },
      unstar: {
        label: 'Fjern stjernemerke fra dette dokumentet',
      },
      field: {
        access: 'Tilgang',
        starred: 'Stjernemerket',
        created: 'Opprettet',
        modified: 'Endret',
        version: 'Versjon',
      },
    },

    history: {
      title: 'Eldre versjoner',
      loading: 'Laster inn versjonshistorikk',
      error: 'Kunne ikke laste inn versjonshistorikken.',
      retry: 'Prøv igjen',
      menu: {
        label: 'Handlinger for versjon {version}',
      },
      open: {
        text: 'Åpne denne versjonen',
        /* the version tag is a link, and 'v3' on its own is thin as a link name --
        this is its accessible name, not visible text */
        label: 'Åpne versjon {version}',
      },
      duplicate: 'Dupliser som nytt dokument',
      restore: 'Gjenopprett',
      none: 'Ingen eldre versjoner ennå. De vises her etter hvert som du lagrer.',
      kept: {
        one: 'Beholder én eldre versjon.',
        other: 'Beholder de siste {count} eldre versjonene.',
      },
    },

    time: {
      'just-now': 'akkurat nå',
      minutes: {
        one: 'for {count} minutt siden',
        other: 'for {count} minutter siden',
      },
      hours: {
        one: 'for {count} time siden',
        other: 'for {count} timer siden',
      },
      days: {
        one: 'for {count} dag siden',
        other: 'for {count} dager siden',
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
      label: 'Oppdatert',
    },
    'created-date': {
      label: 'Opprettet',
    },
    access: {
      label: 'Tilgang',
      'type-private': 'Privat',
      'type-public': 'Offentlig',
    },
    'filter-documents': {
      label: 'Filtrer dokumenter',
    },

    controls: {
      'delete-selected': 'Slett valgte',
      'make-public': 'Gjør offentlig',
      'make-private': 'Gjør privat',
    },
  },

  'account-page': {
    title: 'Konto',
  },

  'sign-in': {
    page: {
      title: 'Logg inn',
    },
    form: {
      username: {
        placeholder: 'Brukernavn eller e-post',
      },
      password: {
        placeholder: 'Passord',
      },
      'sign-in-button': {
        label: 'Logg inn',
      },
      'remember-me': 'Husk meg på denne enheten',
      instructions: 'Skriv inn brukernavn og passord for å logge inn',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Glemt passord',
      },
      'create-account': {
        text: 'Opprett konto',
      },
      'sign-in': {
        text: 'Logg inn',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Glemt passord',
    },
    form: {
      instructions: 'Skriv inn e-postadressen din for å tilbakestille passordet',
      email: {
        placeholder: 'E-postadresse',
      },
      'reset-password-button': {
        label: 'Tilbakestill passord',
      },
    },
  },

  contact: {
    page: {
      title: 'Kontakt oss',
    },
  },

  'privacy-policy': {
    page: {
      title: 'Personvernerklæring',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Bruksvilkår',
    },
  },

  'create-account': {
    page: {
      title: 'Opprett konto',
    },
  },
  'create-password': {
    page: {
      title: 'Opprett passord',
    },
  },
  'update-password': {
    page: {
      title: 'Oppdater passord',
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
        label: 'Bruk mørkt tema',
        alt: 'fargeskjema',
      },

      'light-theme': {
        label: 'Bruk lyst tema',
        alt: 'fargeskjema',
      },

      'system-theme': {
        label: 'Bruk systemtema',
        alt: 'fargeskjema lyst mørkt',
      },
    },

    'remove-hyperlink': {
      label: 'Fjern hyperkobling',
      alt: 'slett tøm kobling',
    },

    'insert-hyperlink': {
      label: 'Sett inn hyperkobling',
      alt: 'legg til angi kobling',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Skriv inn koblingsadresse (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Legg til eller rediger cellekommentar',
      alt: 'notat kommentar',

      parameter: {
        comment: {
          label: 'Skriv inn en kommentar. Trykk Ctrl + Enter for å lagre.',
          'label-mac': 'Skriv inn en kommentar. Trykk Cmd + Enter for å lagre.',
        },
      },
    },

    'remove-comment': {
      label: 'Fjern cellekommentar',
      alt: 'notat',
    },

    'reset-background-color': {
      label: 'Tilbakestill bakgrunnsfarge i utvalget',
      alt: 'tøm fyll',
    },

    'set-background-color': {
      label: 'Angi bakgrunnsfarge for utvalget',
      alt: 'fyll',
    },

    'reset-text-color': {
      label: 'Tilbakestill tekstfarge i utvalget',
      alt: 'tøm forgrunn',
    },

    'set-text-color': {
      label: 'Angi tekstfarge for utvalget',
      alt: 'forgrunn',
    },

    'reset-border-color': {
      label: 'Tilbakestill kantlinjefarge i utvalget',
      alt: 'tøm',
    },

    'set-border-color': {
      label: 'Angi kantlinjefarge for utvalget',
    },

    'borders-clear': {
      label: 'Kantlinjer: fjern kantlinjer',
    },
    'border-top': {
      label: 'Kantlinjer: angi øvre kantlinje på utvalget',
    },
    'border-bottom': {
      label: 'Kantlinjer: angi nedre kantlinje på utvalget',
    },
    'border-double-bottom': {
      label: 'Kantlinjer: angi dobbel nedre kantlinje på utvalget',
    },
    'border-left': {
      label: 'Kantlinjer: angi venstre kantlinje på utvalget',
    },
    'border-right': {
      label: 'Kantlinjer: angi høyre kantlinje på utvalget',
    },

    'border-outside': {
      label: 'Kantlinjer: angi ytre kantlinje på utvalget',
      alt: 'ytre',
    },

    'border-all': {
      label: 'Kantlinjer: angi alle kantlinjer på utvalget',
    },

    'reset-font-scale': {
      label: 'Tilbakestill skriftskala',
      alt: 'tekst skriftstørrelse',
    },

    'font-scale-increase': {
      label: 'Skriftskala: øk 10 %',
      alt: 'tekst skriftstørrelse',
    },

    'font-scale-decrease': {
      label: 'Skriftskala: reduser 10 %',
      alt: 'tekst skriftstørrelse',
    },

    'insert-donut-chart': {
      label: 'Sett inn smultringdiagram',
      alt: 'diagram graf',
    },

    'insert-column-chart': {
      label: 'Sett inn søylediagram',
      alt: 'diagram graf',
    },

    'insert-bar-chart': {
      label: 'Sett inn stolpediagram',
      alt: 'diagram graf',
    },

    'insert-line-chart': {
      label: 'Sett inn linjediagram',
      alt: 'diagram graf',
    },

    'insert-scatter-plot': {
      label: 'Sett inn punktdiagram',
      alt: 'diagram graf',
    },

    'insert-box-plot': {
      label: 'Sett inn boksplott',
      alt: 'diagram graf whiskere',
    },

    'insert-image': {
      label: 'Sett inn bilde',
    },

    'cf-gradient-red-green': {
      label: 'Betinget formatering, fargeovergang: rød-grønn',
    },
    'cf-gradient-green-red': {
      label: 'Betinget formatering, fargeovergang: grønn-rød',
    },
    'cf-unique-values': {
      label: 'Betinget formatering: unike verdier',

      parameter: {
        color: {
          label: 'Velg farge for unike verdier',
        },
      },
    },

    'cf-data-bars': {
      label: 'Betinget formatering: datastolper',
      alt: 'datastolpe',

      parameter: {
        color: {
          label: 'Velg farge for datastolper',
        },
        'hide-values': {
          label: 'Skjule verdier?',
          choice: {
            'true': 'Ja, skjul verdier',
            'false': 'Nei, vis verdier',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Betinget formatering: dupliserte verdier',

      parameter: {
        color: {
          label: 'Velg farge for dupliserte verdier',
        },
      },
    },

    'cf-clear': {
      label: 'Fjern betinget formatering fra utvalget',
      alt: 'fjern',
    },

    'fit-column-widths': {
      label: 'Tilpass bredden på valgte kolonner (autotilpass)',
    },

    'fit-data': {
      label: 'Tilpass data',
      alt: 'tilpass',
    },

    'named-ranges': {
      label: 'Navngitte områder og uttrykk',
      alt: 'navnebehandling definer navn slett navn tøm',
    },

    'set-tab-color': {
      label: 'Angi fanefarge',
    },

    'reset-tab-color': {
      label: 'Tilbakestill fanefarge',
      alt: 'tøm fjern',
    },

    'fit-row-heights': {
      label: 'Tilpass høyden på valgte rader (autotilpass)',
    },

    'correlation-matrix': {
      label: 'Kontroller korrelasjonsmatrise',
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
      label: 'Vis skjulte rader i arket',
    },
    'hide-rows': {
      label: 'Skjul valgte rader',
    },
    'hide-columns': {
      label: 'Skjul valgte kolonner',
    },

    'las-vegas-simulation': {
      label: 'Las Vegas-simulering...',
    },
    'simulation-settings': {
      label: 'Simuleringsinnstillinger...',
    },
    'language-settings': {
      label: 'Språkinnstillinger...',
    },

    'load-desktop-file': {
      label: 'Last inn skrivebordsfil...',
      alt: 'excel csv importer',
    },

    'save-xlsx': {
      label: 'Lagre som XLSX',
      alt: 'last ned excel',
    },

    'save-csv': {
      label: 'Lagre gjeldende ark som CSV',
      alt: 'last ned eksporter',
    },

    'save-to-cloud': {
      label: 'Lagre til skyen',
    },

    'load-document': {
      label: 'Last inn dokument...',
      alt: 'åpne',
    },

    'download-json': {
      label: 'Last ned til skrivebord (JSON)',
      alt: 'lagre',
    },

    'insert-function': {
      label: 'Sett inn funksjon...',
    },
    find: {
      label: 'Søk i verdier/formler...',
    },
    'insert-distribution': {
      label: 'Sett inn tilfeldig fordeling...',
    },
    'run-simulation': {
      label: 'Kjør simulering...',
    },
    'quick-view': {
      label: 'Hurtigvisning...',
    },
    'new-model': {
      label: 'Ny modell',
    },
    'revert-file': {
      label: 'Tilbakestill fil',
    },
    recalculate: {
      label: 'Beregn på nytt',
    },
    undo: {
      label: 'Angre',
    },
    'delete-columns': {
      label: 'Slett valgte kolonner',
    },
    'delete-rows': {
      label: 'Slett valgte rader',
    },
    'insert-column': {
      label: 'Sett inn kolonne',
    },
    'insert-row': {
      label: 'Sett inn rad',
    },
    'set-view-scale': {
      label: 'Angi visningsskala (zoom)',

      parameter: {
        scale: {
          label: 'Skriv inn visningsskalaen',
        },
      },
    },
    'reset-view-scale': {
      label: 'Tilbakestill visningsskala (zoom)',
    },

    'rename-tab': {
      label: 'Gi fanen nytt navn',
      alt: 'ark side',

      parameter: {
        name: {
          label: 'Skriv inn et navn for denne fanen',
        },
      },
    },

    'add-tab': {
      label: 'Legg til fane',
      alt: 'ark side',

      parameter: {
        name: {
          label: 'Skriv inn et navn for den nye fanen',
        },
      },
    },

    'delete-tab': {
      label: 'Slett fane',
      alt: 'ark side',
    },

    'increase-indent': {
      label: 'Øk innrykk',
      alt: 'mer',
    },

    'decrease-indent': {
      label: 'Reduser innrykk',
      alt: 'mindre',
    },

    'number-format-increase-precision': {
      label: 'Tallformat: øk presisjon',
      alt: 'flere desimaler',
    },

    'number-format-decrease-precision': {
      label: 'Tallformat: reduser presisjon',
      alt: 'færre desimaler',
    },

    'number-format': {
      label: 'Tallformat',
      alt: 'egendefinert tallformat',

      parameter: {
        format: {
          label: 'Skriv inn tallformat eller et symbolsk navn',
        },
      },
    },

    'merge-cells': {
      label: 'Slå sammen valgte celler',
    },
    'unmerge-cells': {
      label: 'Del opp valgte celler',
    },
    'lock-cells': {
      label: 'Lås valgte celler',
    },
    'unlock-cells': {
      label: 'Lås opp valgte celler',
    },

    'valign-top': {
      label: 'Formater utvalg: vertikal justering øverst',
    },
    'valign-bottom': {
      label: 'Formater utvalg: vertikal justering nederst',
    },
    'valign-middle': {
      label: 'Formater utvalg: vertikal justering midt',
    },

    'align-left': {
      label: 'Formater utvalg: venstrejuster tekst',
      alt: 'horisontal justering',
    },

    'align-right': {
      label: 'Formater utvalg: høyrejuster tekst',
      alt: 'horisontal justering',
    },

    'align-center': {
      label: 'Formater utvalg: midtstill tekst',
      alt: 'horisontal justering midtstill',
    },

    'toggle-word-wrap': {
      label: 'Formater utvalg: veksle tekstbryting',
    },

    'toggle-gridlines': {
      label: 'Veksle rutenett i aktivt ark',
    },
    'show-gridlines': {
      label: 'Vis rutenett i aktivt ark',
    },
    'hide-gridlines': {
      label: 'Skjul rutenett i aktivt ark',
    },

    'toggle-bold': {
      label: 'Formater utvalg: veksle fet',
    },
    'toggle-italic': {
      label: 'Formater utvalg: veksle kursiv',
    },
    'toggle-underline': {
      label: 'Formater utvalg: veksle understreking',
    },
    'toggle-strikethrough': {
      label: 'Formater utvalg: veksle gjennomstreking',
    },

    'reset-text-formatting': {
      label: 'Formater utvalg: tilbakestill tekstformatering',
      alt: 'tøm',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Fjern kommentar',
    },
    'save-button': {
      label: 'Lagre',
    }
  },

  'correlation-matrix': {
    'title': 'Korrelasjonsmatrise',
    'accept-changes': 'Godta endringer',
    'close-dialog': 'Lukk',

    'invalid-shape': 'Velg en kvadratisk matrise med minst 2x2 celler.',
    'invalid-data': 'Korrelasjonsmatrisen må ha en enhetsdiagonal.\nHver celle på diagonalen må gi {unit}.',
    'asymmetric': 'Korrelasjonsmatrisen må være symmetrisk, eller du kan utelate den øvre eller nedre triangelen.',

    'solution-text': `Korrelasjonsmatrisen er ikke positivt definitt. Vi fant en løsning ved å gjøre små justeringer av verdiene. Den aggregerte feilen er {error}.`,
    'positive-definite': `Korrelasjonsmatrisen er positivt definitt.`,

  },

  //
  // sign-in page (the redesigned one -- the sign-in.* and auth.link.* keys
  // above belong to the old page. 'sign-in.page.title' is still live: it's the
  // toolbar's title, which isn't the same string as the heading on the page).
  //
  'sign-in-page': {
    heading: 'Logg inn',
    subtitle: 'Skriv inn brukernavn og passord for å logge inn.',

    username: {
      label: 'Brukernavn eller e-post',
      required: 'Skriv inn brukernavn eller e-post.',
    },

    password: {
      label: 'Passord',
      required: 'Skriv inn passordet ditt.',
      show: {
        label: 'Vis passord',
      },
      hide: {
        label: 'Skjul passord',
      },
      'caps-lock': 'Caps Lock er på.',
    },

    remember: {
      label: 'Husk meg på denne enheten',
    },

    submit: {
      label: 'Logg inn',
      pending: 'Logger inn…',
    },

    error: {
      rejected: 'Feil brukernavn eller passord.',
      unreachable: 'Får ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen.',
      incomplete: 'Innloggingen ble ikke fullført. Prøv igjen.',
    },

    link: {
      'forgot-password': 'Glemt passord',
      'create-account': 'Opprett konto',
    },
  },

  //
  // shared form rules -- the messages the validators in
  // ~/backstage/account-validation.ts return.
  //
  'backstage-form': {
    email: {
      required: 'Skriv inn e-postadressen din.',
      invalid: 'Det ser ikke ut som en e-postadresse.',
    },

    username: {
      required: 'Velg et brukernavn.',
      'too-short': 'Brukernavn har minst {min} tegn.',
      'too-long': 'Brukernavn har høyst {max} tegn.',
      invalid: 'Bruk bokstaver, tall, bindestreker og understreker, og begynn med en bokstav.',
    },

    password: {
      required: 'Velg et passord.',
      'too-short': 'Passord har minst {min} tegn.',
    },
  },

  //
  // create account page (the redesigned one).
  //
  'create-account-page': {
    heading: 'Opprett konto',

    subtitle: 'Vi ber om en e-postadresse og et brukernavn fordi dokumenter lagres under brukernavnet ditt.',

    // {link} is the terms of service link, spliced in so a translation can put it
    // where its own grammar needs it
    terms: {
      text: 'Se gjennom våre {link}.',
      link: 'tjenestevilkår',
    },

    email: {
      label: 'E-postadresse',
      taken: 'Det finnes allerede en konto med den e-postadressen.',
    },

    username: {
      label: 'Brukernavn',
      taken: '@{username} er allerede tatt.',
      reserved: '@{username} er ikke tilgjengelig.',
      checking: 'Sjekker tilgjengelighet…',
      available: '@{username} er tilgjengelig.',
    },

    handle: {
      example: '@{username}/example',
      placeholder: 'brukernavn',
    },

    after: 'Vi sender deg en e-post med en lenke for å bekrefte adressen din og opprette et passord.',

    submit: {
      label: 'Opprett konto',
      pending: 'Oppretter konto…',
    },

    error: {
      unreachable: 'Får ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen.',
      rejected: 'Kontoen kunne ikke opprettes. Sjekk opplysningene dine og prøv igjen.',
    },

    done: {
      heading: 'Sjekk e-posten din',
      body: 'Vi sendte en lenke til {email}. Åpne den for å bekrefte adressen din og velge et passord.',
      spam: 'Ingenting der? Vent et minutt, og sjekk deretter søppelpostmappen.',
      restart: 'Bruk en annen adresse',
    },

    link: {
      'forgot-password': 'Glemt passord',
      'sign-in': 'Logg inn',
    },
  },

  //
  // forgot password page (the redesigned one).
  //
  'forgot-password-page': {
    heading: 'Glemt passord',
    subtitle: 'Skriv inn e-postadressen din, så sender vi deg en lenke for å velge et nytt passord.',

    email: {
      label: 'E-postadresse',
    },

    submit: {
      label: 'Send lenken',
      pending: 'Sender…',
    },

    error: {
      unreachable: 'Får ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen.',
    },

    done: {
      heading: 'Sjekk e-posten din',
      body: 'Hvis det finnes en konto for {email}, har vi sendt en lenke til den. Åpne den for å velge et nytt passord.',
      spam: 'Ingenting der? Vent et minutt, og sjekk deretter søppelpostmappen.',
      restart: 'Bruk en annen adresse',
    },

    link: {
      'sign-in': 'Logg inn',
      'create-account': 'Opprett konto',
    },
  },

  'contact-page': {
    eyebrow: 'Kontakt oss',
    heading: 'Send en melding',
    subtitle: 'Vi leser hver melding. Send oss feil, ideer, eller bare fortell oss hva du synes.',

    name: {
      label: 'Navn',
    },

    email: {
      label: 'E-post (valgfritt)',
    },

    message: {
      label: 'Melding',
    },

    submit: {
      label: 'Send',
      pending: 'Sender…',
    },

    error: {
      'name-required': 'Skriv inn navnet ditt.',
      'message-required': 'Skriv inn en melding.',
      unreachable: 'Får ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen.',
      failed: 'Noe gikk galt under sending av meldingen din. Prøv igjen.',
    },

    done: {
      heading: 'Takk for tilbakemeldingen!',
      body: 'Vi leser meldingen din og kommer tilbake til deg så snart vi kan.',
      home: 'Tilbake til startsiden',
    },
  },

  //
  // update password page.
  //
  'create-password-page': {
    heading: 'Opprett et passord',
  },

  'update-password-page': {
    heading: 'Velg et nytt passord',
    subtitle: 'Skriv inn tokenet fra lenken vi sendte deg.',

    identifier: {
      label: 'Brukernavn eller e-post',
      required: 'Skriv inn brukernavn eller e-post.',
    },

    token: {
      label: 'Token',
      required: 'Skriv inn tokenet fra lenken vi sendte deg.',
      invalid: 'Det tokenet er ikke gyldig. Sjekk lenken, eller be om et nytt.',
      expired: 'Den lenken er utløpt. Be om en ny.',
      used: 'Den lenken er allerede brukt. Be om en ny.',
    },

    password: {
      label: 'Nytt passord',
      show: {
        label: 'Vis passord',
      },
      hide: {
        label: 'Skjul passord',
      },
      'caps-lock': 'Caps Lock er på.',

      common: 'Det passordet er for lett å gjette. Velg et annet.',
    },

    strength: {
      title: 'Passordstyrke',

      weak: 'Svakt',
      fair: 'Middels',
      good: 'Godt',
      strong: 'Sterkt',
    },

    submit: {
      label: 'Oppdater passord',
      pending: 'Oppdaterer…',
    },

    error: {
      unreachable: 'Får ikke kontakt med serveren. Sjekk tilkoblingen og prøv igjen.',
      rejected: 'Det passordet kunne ikke oppdateres. Sjekk opplysningene dine og prøv igjen.',
    },

    done: {
      heading: 'Passord oppdatert',
      body: 'Det nye passordet ditt er lagret.',
      'continue': 'Fortsett til appen',
    },

    link: {
      'sign-in': 'Logg inn',
      'forgot-password': 'Send en ny lenke',
    },
  },

  'new-document': {
    'discard-changes-message': 'Du har ulagrede endringer. Er du sikker?',
    'discard-changes-confirm': 'Nytt dokument',
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Ulagrede endringer',
    },
  },
} satisfies DeepPartial<I18N>;
