
/** generated Sun Sep 13 2026 by DeepSeek (deepseek-flash) */

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
    title: 'Taalinstellingen...',
  },

  'select-language-dialog': {
    'title': 'Taal selecteren',
  },

  about: {
    tagline: 'Monte Carlo-risicoanalyse voor het web.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Alle rechten voorbehouden.',
    website: 'riskamp.com',
    report: 'Een probleem melden',
    'report-subject': 'RiskAMP web — probleemmelding',
    'report-body': '(beschrijf het probleem hier)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nBrowser: {ua}\nTaal: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Bestand',
      help: 'Help',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Gegevens en analyse',
      tools: 'Extra',
      account: 'Account',
    },

    'menu-commands': {
      documents: 'Documenten',
      'account-page': 'Accountpagina',
      'sign-out': 'Uitloggen',
    },

    tabs: {
      home: 'Start',
      layout: 'Indeling',
      format: 'Opmaak',
      insert: 'Invoegen',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Gegevens en analyse',
    },

    menu: {
      'about-riskamp': 'Over RiskAMP web',
      'function-documentation': 'Documentatie van RiskAMP-functies',
      walkthrough: 'Demonstratiemodel',
    },

    button: {
      'toggle-fullscreen': 'Volledig scherm in-/uitschakelen',

      'new-spreadsheet': 'Nieuwe spreadsheet',
      'import-file': 'Bestand importeren',
      'open-file': 'Bestand openen',
      'save-file': 'Bestand opslaan',
      'save-file-as': 'Opslaan als...',
      'revert-file': 'Bestand terugdraaien',
      'save-to-desktop': 'Opslaan naar bureaublad',
      'export-xlsx': 'XLSX exporteren',
      'export-csv': 'CSV exporteren',

      'sign-in': 'Inloggen',
      'create-account': 'Account aanmaken',

      'search-cells': {
        label: 'Cellen zoeken',
      },
      'defined-names': {
        label: 'Gedefinieerde namen',
      },
      'fit-data': {
        label: 'Gegevens aanpassen',
      },
      notes: {
        label: 'Notities',
      },

      'monte-carlo-simulation': {
        label: 'Monte Carlo-simulatie',
      },
      'run-simulation': {
        label: 'Simulatie uitvoeren',
      },
      'run-simulation-again': {
        label: 'Simulatie opnieuw uitvoeren',
      },
      'las-vegas-simulation': {
        label: 'Las Vegas-simulatie',
      },
      'simulation-settings': {
        label: 'Simulatie-instellingen',
      },
      'quick-view': {
        label: 'Snelle weergave',
      },
      'quick-view-correlation': {
        label: 'Snelle weergave correlatie',
      },
      recalculate: {
        label: 'Herberekenen',
      },

      'align-left': {
        label: 'Links uitlijnen',
      },
      'align-center': {
        label: 'Centreren',
      },
      'align-right': {
        label: 'Rechts uitlijnen',
      },

      'align-top': {
        label: 'Boven uitlijnen',
      },
      'align-middle': {
        label: 'Midden uitlijnen',
      },
      'align-bottom': {
        label: 'Onder uitlijnen',
      },

      'increase-indent': {
        label: 'Inspringing vergroten',
      },
      'decrease-indent': {
        label: 'Inspringing verkleinen',
      },
      'wrap-text': {
        label: 'Tekstterugloop',
      },

      'toggle-integer-grouping': {
        label: 'Groepering in-/uitschakelen',
      },
      'increase-decimal-precision': {
        label: 'Precisie verhogen',
      },
      'decrease-decimal-precision': {
        label: 'Precisie verlagen',
      },

      'merge-cells': {
        label: 'Cellen samenvoegen',
      },
      'unmerge-cells': {
        label: 'Samenvoeging van cellen opheffen',
      },

      'lock-cells': {
        label: 'Cellen vergrendelen voor bewerken',
      },
      'unlock-cells': {
        label: 'Cellen ontgrendelen voor bewerken',
      },

      bold: {
        label: 'Vette tekst in-/uitschakelen',
      },
      italic: {
        label: 'Cursieve tekst in-/uitschakelen',
      },
      underline: {
        label: 'Onderstrepen in-/uitschakelen',
      },
      strikethrough: {
        label: 'Doorhalen in-/uitschakelen',
      },

      'insert-row': {
        label: 'Rij invoegen',
      },
      'insert-column': {
        label: 'Kolom invoegen',
      },
      'delete-row': {
        label: 'Rij verwijderen',
      },
      'delete-column': {
        label: 'Kolom verwijderen',
      },

      'text-color': {
        label: 'Tekstkleur',
      },
      'background-color': {
        label: 'Achtergrondkleur',
      },
      'border-color': {
        label: 'Randkleur',
      },

      'border-top': {
        title: 'Bovenrand',
      },
      'border-bottom': {
        title: 'Onderrand',
      },
      'border-double-bottom': {
        title: 'Dubbele onderrand',
      },
      'border-left': {
        title: 'Linkerrand',
      },
      'border-right': {
        title: 'Rechterrand',
      },
      'border-all': {
        title: 'Alle randen',
      },
      'border-none': {
        title: 'Randen verwijderen',
      },
      'border-outside': {
        title: 'Buitenranden',
      },

      'correlation-matrix': {
        title: 'Correlatiematrix',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline-kolom',
      'sparkline-line': 'Sparkline-lijn',

      insert: {
        'bar-chart': 'Staafdiagram',
        'donut-chart': 'Ringdiagram',
        'column-chart': 'Kolomdiagram',
        'line-chart': 'Lijndiagram',
        'scatter-plot': 'Spreidingsdiagram',
        'area-chart': 'Vlakdiagram',
        image: 'Afbeelding',

        comment: 'Opmerking',
        table: 'Tabel',
      },

      forecast: 'Trendprognose',
    },

    'open-menu': 'Menu openen',

    'more-commands-button': {
      label: 'Meer opdrachten...',
    },

    combobox: {
      'font-size': {
        label: 'Lettergrootte',
      },
      'number-format': {
        label: 'Getalnotatie',
      },
    },

    label: {
      'spreadsheet-cells': 'Spreadsheetcellen',
    },

    message: {
      'changes-stored-in-browser': 'Wijzigingen worden in de browseropslag bewaard tot u ze opslaat of terugdraait.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'RiskAMP-documentatie',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Terug',
        forward: 'Vooruit',
      },
    },
    label: {
      'close-sidebar': 'Zijbalk sluiten',
    },

    simulation_settings: {
      'parallel-calculation': { 
        'section-header': 'Parallelle berekening',
        'max-workers': 'Aantal workers (maximum)',
        'explanatory-text': 'Het gebruik van meer parallelle workers verbetert de simulatieprestaties voor complexe modellen. In de meeste gevallen raden we 4 of 8 workers aan.',
      },

      'random-sampling': {
        'section-header': 'Willekeurige steekproef',
        'explanatory-text': 'De steekproefmethode wordt met deze spreadsheet opgeslagen.\nDe waarde die u hier selecteert, wordt ook gebruikt als standaard voor nieuwe spreadsheets.',
      },

      'random-seed': {
        'section-header': 'Willekeurige seed',
        'explanatory-text': 'De willekeurige seed wordt met deze spreadsheet opgeslagen.\nVoer een getal in voor een vaste seed, of voer 0 in om bij elke simulatie een willekeurige seed te gebruiken.',

        'enter-seed-value': 'Seed invoeren',
        'seed-value': 'Seedwaarde',
        'reset-seed-value': 'Seed opnieuw instellen',
        'time-based-seed': 'Een seed op basis van tijd gebruiken',
      },

      title: 'Simulatie-instellingen',
      'latin-hypercube-sampling': 'Latin hypercube sampling (LHS)',
      'standard-random-sampling': 'Standaard willekeurige steekproef',

      'fixed-random-seed': 'Vaste seed',
      'seed-value-placeholder-text': 'Seedwaarde',
    },

    'notes-panel': {
      title: 'Notities',
      'open-notes-with-spreadsheet': 'Notities openen met spreadsheet',
      edit_markdown: 'Markdown bewerken',
      view_formatted: 'Opmaak weergeven',
    },
    'fit-data-panel': {
      title: 'Gegevens aanpassen',
    },
  },

  'color-picker': {
    choose_color: 'Kleur kiezen',
    use_selected_color: 'Geselecteerde kleur gebruiken',
    theme_colors: 'Themakleuren',
    other_colors: 'Andere kleuren',
    no_color: 'Geen kleur',
    new_color: 'Nieuwe kleur',
    default_text_color: 'Standaard tekstkleur',
    default_border_color: 'Standaard randkleur',
    no_fill: 'Geen opvulling',

    theme: {
      background: 'Achtergrond',
      text: 'Tekst',
      accent: 'Accent',
      lighter: 'Lichter',
      darker: 'Donkerder',
    },
  },

  'names-panel': {
    title: 'Gedefinieerde namen',
    header: {
      name: 'Naam',
      'name-scope': 'Bereik',
      value: 'Waarde',
    },
    'name-scope': {
      sheet: 'Werkblad',
      workbook: 'Werkmap',
    },
    label: {
      'delete-name': 'Naam verwijderen',
      'define-name': 'Naam definiëren',
      'edit-name': 'Naam bewerken',
    },
    'name-type': {
      reference: 'Verwijzing',
      expression: 'Expressie',
    },
  },

  'search-panel': {
    title: 'Cellen zoeken',
    'search-text': {
      placeholder: 'Zoektekst',
    },
    'search-in': {
      text: 'Zoeken in',
    },
    'search-type': {
      'cell-values': 'Waarden',
      'cell-formulas': 'Formules',
      wildcards: 'Jokertekens',
    },
    'search-scope': {
      'current-sheet': 'Huidig werkblad',
      'all-sheets': 'Alle werkbladen',
    },
    'search-results': {
      header: {
        address: 'Adres',
        value: 'Waarde',
        formula: 'Formule',
      },
      information: {
        'enter-text': 'Voer tekst in om te zoeken',
        result: 'resultaat',
        results: 'resultaten',
      },
    },
  },
  'forecast-dialog': {
    title: 'Trendprognose',
    parameters: {
      dates: {
        title: 'Datums',
      },
      values: {
        title: 'Waarden',
      },
      periods: 'Prognoseperioden',
      seasonality: 'Seizoenspatroon',

      'fill-empty': 'Opvullen',
      'aggregate-multiple': 'Aggregeren',
      'project-forward-periods': 'Perioden',
      'chart-type': {
        label: 'Diagramtype',
      },
      'chart-type-line-chart': 'Lijn',
      'chart-type-column-chart': 'Kolom',
    },
    options: {
      'model-type': 'Model',
      'forecast-type': 'Prognosetype',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel-compatibel',
      'static-forecast': 'Statisch',
      'stochastic-forecast': 'Stochastisch',
    },
    settings: 'Instellingen',
    'create-forecast-sheet': 'Prognoseblad maken',
    seasonality: {
      'auto-detect': 'Automatisch detecteren',
    },
    'fill-options': {
      interpolate: 'Interpoleren',
      zeros: 'Nullen',
    },
    'aggregate-options': {
      average: 'Gemiddelde',
      median: 'Mediaan',
      min: 'Min',
      max: 'Max',
      sum: 'Som',
      count: 'Aantal',
    },

    'chart-labels': {
      values: 'Waarden',
      forecast: 'Prognose',
    },
  },

  'forecast-sheet-timeline-header': 'Tijdlijn',
  'forecast-sheet-values-header': 'Waarden',
  'forecast-sheet-forecast-header': 'Prognose',
  'forecast-sheet-sample-header': 'Steekproef',
  'forecast-sheet-statistics-header': 'Statistieken',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Gemiddelde',
    },
    'p80-range': {
      header: 'P80-bereik',
    },
  },

  'sparkline-dialog': {
    title: 'Sparkline invoegen',
    parameters: {
      target: {
        title: 'Doelcel',
        'overwrite-warning': 'Gegevens in het doelbereik worden overschreven',
        'merge-warning': 'De geselecteerde cellen worden samengevoegd voor de sparkline',
      },
      source: {
        title: 'Brongegevensbereik',
      },
    },
    info: 'Gebruik de voor- en achtergrondkleuren van de cel om de sparkline op te maken',

    'sparkline-type': 'Sparkline-type',
    'sparkline-type-line-chart': 'Lijn',
    'sparkline-type-column-chart': 'Kolom',
  },

  'quick-view-dialog': {
    title: 'Snelle weergave',
    'select-cell': 'Cel selecteren',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Boxplot',
    'show-statistics': 'Statistieken',
    'histogram-bin-algorithm-long': 'Binalgoritme',
    'histogram-bin-algorithm-short': 'Bins',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Whiskertype',
    'box-plot-whisker-type-short': 'Whiskers',
    'box-plot-whisker-type-minmax': 'Min/max',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Er zijn geen simulatiegegevens voor de geselecteerde cel. Voer met de knop hieronder een simulatie uit om gegevens voor deze cel te verzamelen.\n\nSimulatiegegevens worden automatisch verzameld wanneer een cel wordt gebruikt in een statistiekfunctie (zoals SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1e kwartiel',
      third_quartile: '3e kwartiel',
      median: 'Mediaan',
      'interquartile-range': 'IQR',
      mean: 'Gemiddelde',
      variance: 'Variantie',
      'standard-deviation': 'Std.afw.',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Snelle weergaveselectie vergrendelen',
        'click-to-unlock': 'Snelle weergaveselectie ontgrendelen',
        'return-to-selection': 'Terug naar geselecteerde cel',
        'selection-locked': 'Selectie vergrendeld',
      },
    },
  },

  'dialog-close-label': 'Sluiten',
  'dialog-close-title': 'Dialoogvenster sluiten',
  'dialog-help-title': 'Help',

  'standard-buttons': {
    close: {
      label: 'Sluiten',
      title: 'Dialoogvenster sluiten',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Terug',
    },
    yes: {
      title: 'Ja',
    },
    no: {
      title: 'Nee',
    },
    accept: {
      title: 'Accepteren',
    },
    cancel: {
      title: 'Annuleren',
    },
  },

  'confirm-dialog': {
    title: 'Weet u het zeker?',
    'alert-title': 'Waarschuwing',
    confirm: 'Bevestigen',
    cancel: 'Annuleren',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte Carlo-simulatie',
  'run-simulation': {
    'number-of-trials': 'Aantal uitvoeringen',
    'screen-updates': 'Schermupdates weergeven',
    starting: 'Bezig met starten...',
    'percent-complete': 'voltooid',
  },
  'run-simulation-start-label': 'Starten',
  'run-simulation-start-title': 'Simulatie starten',
  'run-simulation-cancel-label': 'Stoppen',
  'run-simulation-cancel-title': 'Simulatie stoppen',

  'load-error': {
    'loading-document-failed': 'Het opgevraagde bestand kon niet worden geladen',
  },

  'save-as-dialog': {
    'default-title': 'Opslaan als',
    'rename-title': 'Naam van document wijzigen',
    'duplicate-title': 'Document dupliceren',
    folder: 'Map',
    name: 'Naam',
    access: 'Toegang',
    public: 'Openbaar',
    private: 'Privé',
    save: 'Opslaan',
    overwrite: 'Overschrijven',
    'folder-placeholder': 'Optioneel — bijv. finance/reports',
    'name-placeholder': 'Documentnaam',
    'preview-label': 'Wordt opgeslagen als',
    'copy-link': 'Link kopiëren',
    'copy-link-copied': 'Link gekopieerd',
    collision: 'Er bestaat al een document op dit pad.',
    'collision-blocked': 'Er bestaat al een document op dit pad. Kies een andere naam.',
    empty: 'Voer een naam in',
    saved: '“{name}” opgeslagen',
    'save-failed': 'Kan “{name}” niet opslaan.',
    retry: 'Opnieuw proberen',
    'overwrite-confirm-title': 'Document overschrijven?',
    'overwrite-confirm-message': 'Er bestaat al een document met de naam “{name}”. Overschrijven vervangt de inhoud. Weet u het zeker?',

    'path-exists-title': 'Document bestaat al',
    'path-exists-message': 'Er bestaat al een document met dat pad. Verwijder dat document eerst als u het pad opnieuw wilt gebruiken.',

  },

  toast: {
    'region-label': 'Meldingen',
    dismiss: 'Sluiten',
  },

  'las-vegas-simulation-panel': {
    title: 'Las Vegas-simulatie',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Accepteren',
        description: 'Accepteren is een cel die TRUE of FALSE retourneert om een uitvoering te accepteren of te weigeren. Vereist.',
      },
      complete: {
        title: 'Voltooien',
        description: 'Voltooien is een cel die TRUE retourneert om de simulatie te beëindigen, of een aantal geaccepteerde uitvoeringen. Vereist.',
      },
      fail: {
        title: 'Mislukken',
        description: 'Mislukken is een cel die TRUE retourneert om de simulatie te beëindigen, of een maximumtotaal aantal uitvoeringen. Optioneel.',
      },
    },
    'more-information-link': {
      title: 'Meer informatie',
    },
    'running-simulation': 'Simulatie wordt uitgevoerd...',
    'options-overview': 'Voer opties in voor een Las Vegas-simulatie.',
  },

  'insert-function': {
    button: {
      title: 'Functie invoegen...',
    },
    'insert-function': 'Functie invoegen',
    'search-for-function': 'Zoeken naar een functie...',
    'function-result': 'Resultaat',
  },

  'function-dialog': {
    'select-function': {
      title: 'Functie selecteren',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultaat',
    volatile: 'volatiel',
    'function-help-title': 'Help over deze functie',
  },

  'number-format': {
    general: 'Algemeen',
    number: 'Getal',
    integer: 'Geheel getal',
    percent: 'Percentage',
    fraction: 'Breuk',
    accounting: 'Boekhouding',
    currency: 'Valuta',
    scientific: 'Wetenschappelijk',

    timestamp: 'Tijdstempel',
    'long-date': 'Lange datum',
    'short-date': 'Korte datum',
  },

  'llm-chat': {
    panel: {
      title: 'AI-assistent',
    },
    'settings-tab': {
      title: 'Instellingen',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Model wijzigen?',
      message: 'Dit model gebruikt een andere provider, waardoor het huidige gesprek wordt gewist. Doorgaan?',
      confirm: 'Model wijzigen',
    },
    buttons: {
      'send-message': 'Verzenden',

      'clear-conversation': 'Gesprek wissen',
      save: 'Opslaan naar bureaublad',
      resend: 'Laatste bericht opnieuw verzenden',
      restart: 'Opnieuw beginnen vanaf het eerste bericht',
    },

    label: {
      'api-key': 'API-sleutel',
      'api-key-placeholder': 'Plak uw API-sleutel',
      'reveal-api-key': 'API-sleutel weergeven',
      'hide-api-key': 'API-sleutel verbergen',
      model: 'Model',
      'choose-a-model': 'Een model kiezen',
      'select-a-model': 'Een model selecteren',
      header: {
        important: 'Belangrijk',
      },
      disclaimer: 'De AI-interface werkt met uw eigen sleutel (bring-your-own-key). Om deze te gebruiken moet u een API-sleutel opgeven voor een ondersteunde provider/model.\nWij zien uw API-sleutel nooit. Deze blijft in uw browser en wordt alleen naar de officiële provider verzonden wanneer u een chatbericht stuurt.\nUw modelprovider brengt kosten in rekening voor tokens of volgens uw abonnement.',

      provider_link: 'Webpagina van provider',
      model_information_link: 'Modelinformatie',
      screenshots_disabled: 'Opmerking: dit model ondersteunt geen schermafbeeldingen.',

    },

    activity: {
      thinking: 'Aan het nadenken…',
      working: 'Aan het werk…',
      running: '{tool} wordt uitgevoerd…',
    },

    error: {
      unknown: 'onbekende fout',
      'unknown-type': 'onbekend type',
    },
  },

  'developer-panel': {
    title: 'Ontwikkelaarsinfo',
  },

  'fit-data-panel': {
    'select-range': 'Bereik selecteren',
    'candidate-distributions': {
      label: 'Kandidaatverdelingen',
      description: 'Kandidaten zijn gesorteerd op de beste aanpassing aan de theoretische verdeling',
    },
    'log-normal-graph': {
      description: 'De lognormale grafiek wordt op logaritmische schaal weergegeven',
    },
    statistics: {
      error: 'Fout',
      mean_square_error: 'Gemiddelde kwadratische fout',
      aggregate_error: 'Geaggregeerde fout',
      max_error: 'Maximale fout',
      mean_error: 'Gemiddelde fout',
    },

    label: {
      'click-to-lock': 'Selectie voor gegevensaanpassing vergrendelen',
      'click-to-unlock': 'Selectie voor gegevensaanpassing ontgrendelen',
    },

    'distribution-parameters': 'Verdelingsparameters',
    'spreadsheet-function': 'Spreadsheetfunctie',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Naar klembord kopiëren',
      error: 'Kopieerfout',
      copied: 'Gekopieerd',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Geen overeenkomende opdrachten',
    'start-typing': 'Begin te typen om een opdracht te vinden',
    'run-highlighted-command': 'Druk op Enter om de gemarkeerde opdracht uit te voeren',
    'command-palette': {
      label: 'Opdrachtenpalet',
    },
  },

  'documents-page': {
    title: 'Documenten',

    scope: {
      all: 'Alle documenten',
      starred: 'Gemarkeerd',
      recent: 'Recent',
      private: 'Privé',
    },

    rail: {
      label: 'Documentfilters',
      folders: 'Mappen',
      'no-folders': 'Geen mappen',
    },

    search: {
      placeholder: 'Documenten zoeken',
      label: 'Documenten zoeken',
      clear: {
        label: 'Zoekopdracht wissen',
      },
    },
    filter: {
      label: 'Filteren',
    },

    action: {
      'new-document': 'Nieuw document',
      open: 'Openen',
      duplicate: 'Dupliceren',
      rename: 'Naam wijzigen…',
      'delete': 'Verwijderen',
      cancel: 'Annuleren',
      'make-public': 'Openbaar maken',
      'make-private': 'Privé maken',
      'version-history': 'Versiegeschiedenis',
    },

    access: {
      public: 'Openbaar',
      private: 'Privé',
    },

    selection: {
      count: {
        one: '{count} geselecteerd',
        other: '{count} geselecteerd',
      },
      'make-public': {
        label: 'Geselecteerde documenten openbaar maken',
      },
      'make-private': {
        label: 'Geselecteerde documenten privé maken',
      },
      'delete': {
        label: 'Geselecteerde documenten verwijderen',
      },
    },

    table: {
      label: 'Documenten',
      'select-all': {
        label: 'Alle documenten selecteren',
      },
    },
    column: {
      starred: 'Gemarkeerd',
      name: 'Naam',
      folder: 'Map',
      access: 'Toegang',
      version: 'Versie',
      modified: 'Gewijzigd',
      actions: 'Acties',
    },

    row: {
      select: {
        label: '{name} selecteren',
      },
      star: {
        label: '{name} markeren',
      },
      unstar: {
        label: 'Markering van {name} opheffen',
      },
      menu: {
        label: 'Acties voor {name}',
      },
      unnamed: {
        title: 'Dit document heeft nog geen naam',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Document verwijderen, weet u het zeker?',
      confirm_delete_documents: 'Documenten verwijderen, weet u het zeker?',
    },

    error: {
      title: 'Kan uw documenten niet laden',
      detail: 'Laden is mislukt door een fout. Probeer het later opnieuw.',
      retry: 'Opnieuw proberen',
    },

    messages: {
      rename_failed: 'Naam wijzigen mislukt. Probeer het later opnieuw.',
      rename_succeeded: 'Naam van document gewijzigd',

      delete_failed: 'Verwijderen mislukt. Probeer het later opnieuw.',
      one_document_deleted: 'Document verwijderd',
      multiple_documents_deleted: 'Documenten verwijderd',

      update_failed: 'Bijwerken mislukt. Probeer het later opnieuw.',

      duplicate_succeeded: 'Document gemaakt',
      duplicate_failed: 'Dupliceren mislukt. Probeer het later opnieuw.',

      restore_succeeded: 'Document hersteld',
      restore_failed: 'Herstellen mislukt. Probeer het later opnieuw.',

    },

    empty: {
      title: 'Nog geen documenten',
      detail: 'Spreadsheets die u maakt of importeert, verschijnen hier, samen met hun versiegeschiedenis.',
    },

    'no-match': {
      title: 'Geen documenten die overeenkomen met “{query}”',
      detail: 'Zoeken omvat elke map. Probeer een kortere term.',
      action: 'Zoekopdracht wissen',
    },

    'empty-filter': {
      title: 'Niets hier',
      detail: 'Er zijn geen documenten die bij dit filter passen.',
      'detail-folder': 'Geen documenten in {folder}.',
      action: 'Alle documenten weergeven',
    },

    footer: {
      count: {
        one: '{count} document',
        other: '{count} documenten',
      },
      filtered: '{count} van {total} documenten',
      'searching-all': 'alle mappen doorzoeken',
    },

    panel: {
      label: 'Documentdetails',
      open: {
        title: 'Document openen',
      },
      close: {
        label: 'Details sluiten',
      },
      'copy-link': {
        label: 'Link kopiëren',
        copied: {
          label: 'Link gekopieerd',
          title: 'Gekopieerd',
        },
      },
      'unnamed-hint': 'Nog geen naam — dit is het adres. Als u de naam wijzigt, wordt er een ingesteld.',
      star: {
        label: 'Dit document markeren',
      },
      unstar: {
        label: 'Markering van dit document opheffen',
      },
      field: {
        access: 'Toegang',
        starred: 'Gemarkeerd',
        created: 'Gemaakt',
        modified: 'Gewijzigd',
        version: 'Versie',
      },
    },

    history: {
      title: 'Oudere versies',
      loading: 'Versiegeschiedenis laden',
      error: 'Kan de versiegeschiedenis niet laden.',
      retry: 'Opnieuw proberen',
      menu: {
        label: 'Acties voor versie {version}',
      },
      open: {
        text: 'Deze versie openen',
        label: 'Versie {version} openen',
      },
      duplicate: 'Dupliceren als nieuw document',
      restore: 'Herstellen',
      none: 'Nog geen oudere versies. Ze verschijnen hier zodra u opslaat.',
      kept: {
        one: 'Er wordt één oudere versie bewaard.',
        other: 'De laatste {count} oudere versies worden bewaard.',
      },
    },

    time: {
      'just-now': 'zojuist',
      minutes: {
        one: '{count} minuut geleden',
        other: '{count} minuten geleden',
      },
      hours: {
        one: '{count} uur geleden',
        other: '{count} uur geleden',
      },
      days: {
        one: '{count} dag geleden',
        other: '{count} dagen geleden',
      },
      today: 'vandaag, {time}',
      yesterday: 'gisteren, {time}',
    },
  },

  'documents-table': {
    document: {
      label: 'Document',
    },
    'updated-date': {
      label: 'Bijgewerkt',
    },
    'created-date': {
      label: 'Gemaakt',
    },
    access: {
      label: 'Toegang',
      'type-private': 'Privé',
      'type-public': 'Openbaar',
    },
    'filter-documents': {
      label: 'Documenten filteren',
    },

    controls: {
      'delete-selected': 'Geselecteerde verwijderen',
      'make-public': 'Openbaar maken',
      'make-private': 'Privé maken',
    },
  },

  'account-page': {
    title: 'Account',
  },

  'sign-in': {
    page: {
      title: 'Inloggen',
    },
    form: {
      username: {
        placeholder: 'Gebruikersnaam of e-mailadres',
      },
      password: {
        placeholder: 'Wachtwoord',
      },
      'sign-in-button': {
        label: 'Inloggen',
      },
      'remember-me': 'Aangemeld blijven op dit apparaat',
      instructions: 'Voer uw gebruikersnaam en wachtwoord in om in te loggen',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Wachtwoord vergeten',
      },
      'create-account': {
        text: 'Account aanmaken',
      },
      'sign-in': {
        text: 'Inloggen',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Wachtwoord vergeten',
    },
    form: {
      instructions: 'Voer uw e-mailadres in om uw wachtwoord opnieuw in te stellen',
      email: {
        placeholder: 'E-mailadres',
      },
      'reset-password-button': {
        label: 'Wachtwoord opnieuw instellen',
      },
    },
  },

  'privacy-policy': {
    page: {
      title: 'Privacybeleid',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Gebruiksvoorwaarden',
    },
  },

  'create-account': {
    page: {
      title: 'Account aanmaken',
    },
  },
  'create-password': {
    page: {
      title: 'Wachtwoord aanmaken',
    },
  },
  'update-password': {
    page: {
      title: 'Wachtwoord bijwerken',
    },
  },

  'theme-toggle': {
    'light-theme': 'Licht thema',
    'dark-theme': 'Donker thema',
    'system-theme': 'Systeemthema',
  },

  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Donker thema gebruiken',
        alt: 'kleurenschema',
      },

      'light-theme': {
        label: 'Licht thema gebruiken',
        alt: 'kleurenschema',
      },

      'system-theme': {
        label: 'Systeemthema gebruiken',
        alt: 'kleurenschema licht donker',
      },
    },

    'remove-hyperlink': {
      label: 'Hyperlink verwijderen',
      alt: 'verwijderen wissen link',
    },

    'insert-hyperlink': {
      label: 'Hyperlink invoegen',
      alt: 'koppeling toevoegen instellen',

      parameter: {
        url: {
          label: 'Voer linkadres (URL) in',
        },
      },
    },

    'add-edit-comment': {
      label: 'Celopmerking toevoegen of bewerken',
      alt: 'notitie opmerking',

      parameter: {
        comment: {
          label: 'Voer een opmerking in. Druk op Ctrl + Enter om op te slaan.',
          'label-mac': 'Voer een opmerking in. Druk op Cmd + Enter om op te slaan.',
        },
      },
    },

    'remove-comment': {
      label: 'Celopmerking verwijderen',
      alt: 'notitie',
    },

    'reset-background-color': {
      label: 'Achtergrondkleur in selectie opnieuw instellen',
      alt: 'opvulling wissen',
    },

    'set-background-color': {
      label: 'Achtergrondkleur voor selectie instellen',
      alt: 'opvulling',
    },

    'reset-text-color': {
      label: 'Tekstkleur in selectie opnieuw instellen',
      alt: 'voorgrond wissen',
    },

    'set-text-color': {
      label: 'Tekstkleur voor selectie instellen',
      alt: 'voorgrond',
    },

    'reset-border-color': {
      label: 'Randkleur in selectie opnieuw instellen',
      alt: 'wissen',
    },

    'set-border-color': {
      label: 'Randkleur voor selectie instellen',
    },

    'borders-clear': {
      label: 'Randen: randen wissen',
    },
    'border-top': {
      label: 'Randen: bovenrand op selectie instellen',
    },
    'border-bottom': {
      label: 'Randen: onderrand op selectie instellen',
    },
    'border-double-bottom': {
      label: 'Randen: dubbele onderrand op selectie instellen',
    },
    'border-left': {
      label: 'Randen: linkerrand op selectie instellen',
    },
    'border-right': {
      label: 'Randen: rechterrand op selectie instellen',
    },

    'border-outside': {
      label: 'Randen: buitenrand op selectie instellen',
      alt: 'buitenste',
    },

    'border-all': {
      label: 'Randen: alle randen op selectie instellen',
    },

    'reset-font-scale': {
      label: 'Lettergrootte opnieuw instellen',
      alt: 'tekst lettergrootte',
    },

    'font-scale-increase': {
      label: 'Lettergrootte: 10% vergroten',
      alt: 'tekst lettergrootte',
    },

    'font-scale-decrease': {
      label: 'Lettergrootte: 10% verkleinen',
      alt: 'tekst lettergrootte',
    },

    'insert-donut-chart': {
      label: 'Ringdiagram invoegen',
      alt: 'diagram grafiek',
    },

    'insert-column-chart': {
      label: 'Kolomdiagram invoegen',
      alt: 'diagram grafiek',
    },

    'insert-bar-chart': {
      label: 'Staafdiagram invoegen',
      alt: 'diagram grafiek',
    },

    'insert-line-chart': {
      label: 'Lijndiagram invoegen',
      alt: 'diagram grafiek',
    },

    'insert-scatter-plot': {
      label: 'Spreidingsdiagram invoegen',
      alt: 'diagram grafiek',
    },

    'insert-box-plot': {
      label: 'Boxplot invoegen',
      alt: 'diagram grafiek whiskers',
    },

    'insert-image': {
      label: 'Afbeelding invoegen',
    },

    'cf-gradient-red-green': {
      label: 'Voorwaardelijke opmaak, verloop: rood-groen',
    },
    'cf-gradient-green-red': {
      label: 'Voorwaardelijke opmaak, verloop: groen-rood',
    },
    'cf-unique-values': {
      label: 'Voorwaardelijke opmaak: unieke waarden',

      parameter: {
        color: {
          label: 'Kleur voor unieke waarden selecteren',
        },
      },
    },

    'cf-data-bars': {
      label: 'Voorwaardelijke opmaak: gegevensbalken',
      alt: 'gegevensbalk',

      parameter: {
        color: {
          label: 'Kleur voor gegevensbalken selecteren',
        },
        'hide-values': {
          label: 'Waarden verbergen?',
          choice: {
            'true': 'Ja, waarden verbergen',
            'false': 'Nee, waarden weergeven',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Voorwaardelijke opmaak: dubbele waarden',

      parameter: {
        color: {
          label: 'Kleur voor dubbele waarden selecteren',
        },
      },
    },

    'cf-clear': {
      label: 'Voorwaardelijke opmaak uit selectie wissen',
      alt: 'verwijderen',
    },

    'fit-column-widths': {
      label: 'Breedte van geselecteerde kolommen aanpassen (automatisch)',
    },

    'fit-data': {
      label: 'Gegevens aanpassen',
      alt: 'aanpassen',
    },

    'named-ranges': {
      label: 'Benoemde bereiken en expressies',
      alt: 'naambeheer naam definiëren naam verwijderen wissen',
    },

    'set-tab-color': {
      label: 'Tabbladkleur instellen',
    },

    'reset-tab-color': {
      label: 'Tabbladkleur opnieuw instellen',
      alt: 'wissen verwijderen',
    },

    'fit-row-heights': {
      label: 'Hoogte van geselecteerde rijen aanpassen (automatisch)',
    },

    'correlation-matrix': {
      label: 'Correlatiematrix controleren',
    },

    'hide-sheet': {
      label: 'Werkblad verbergen',
      alt: 'zichtbaar',
    },

    'unhide-all-sheets': {
      label: 'Alle werkbladen zichtbaar maken',
      alt: 'zichtbaar',
    },

    'unhide-columns': {
      label: 'Werkbladkolommen zichtbaar maken',
    },
    'unhide-rows': {
      label: 'Werkbladrijen zichtbaar maken',
    },
    'hide-rows': {
      label: 'Geselecteerde rijen verbergen',
    },
    'hide-columns': {
      label: 'Geselecteerde kolommen verbergen',
    },

    'las-vegas-simulation': {
      label: 'Las Vegas-simulatie...',
    },
    'simulation-settings': {
      label: 'Simulatie-instellingen...',
    },
    'language-settings': {
      label: 'Taalinstellingen...',
    },

    'load-desktop-file': {
      label: 'Bureaubladbestand laden...',
      alt: 'excel csv importeren',
    },

    'save-xlsx': {
      label: 'Opslaan als XLSX',
      alt: 'excel downloaden',
    },

    'save-csv': {
      label: 'Huidig werkblad opslaan als CSV',
      alt: 'export downloaden',
    },

    'save-to-cloud': {
      label: 'Opslaan naar cloud',
    },

    'load-document': {
      label: 'Document laden...',
      alt: 'openen',
    },

    'download-json': {
      label: 'Naar bureaublad downloaden (JSON)',
      alt: 'opslaan',
    },

    'insert-function': {
      label: 'Functie invoegen...',
    },
    find: {
      label: 'Zoeken in waarden/formules...',
    },
    'insert-distribution': {
      label: 'Willekeurige verdeling invoegen...',
    },
    'run-simulation': {
      label: 'Simulatie uitvoeren...',
    },
    'quick-view': {
      label: 'Snelle weergave...',
    },
    'new-model': {
      label: 'Nieuw model',
    },
    'revert-file': {
      label: 'Bestand terugdraaien',
    },
    recalculate: {
      label: 'Herberekenen',
    },
    undo: {
      label: 'Ongedaan maken',
    },
    'delete-columns': {
      label: 'Geselecteerde kolommen verwijderen',
    },
    'delete-rows': {
      label: 'Geselecteerde rijen verwijderen',
    },
    'insert-column': {
      label: 'Kolom invoegen',
    },
    'insert-row': {
      label: 'Rij invoegen',
    },
    'set-view-scale': {
      label: 'Weergaveschaal instellen (zoom)',

      parameter: {
        scale: {
          label: 'Voer de weergaveschaal in',
        },
      },
    },
    'reset-view-scale': {
      label: 'Weergaveschaal opnieuw instellen (zoom)',
    },

    'rename-tab': {
      label: 'Tabbladnaam wijzigen',
      alt: 'werkblad pagina',

      parameter: {
        name: {
          label: 'Voer een naam in voor dit tabblad',
        },
      },
    },

    'add-tab': {
      label: 'Tabblad toevoegen',
      alt: 'werkblad pagina',

      parameter: {
        name: {
          label: 'Voer een naam in voor het nieuwe tabblad',
        },
      },
    },

    'delete-tab': {
      label: 'Tabblad verwijderen',
      alt: 'werkblad pagina',
    },

    'increase-indent': {
      label: 'Inspringing vergroten',
      alt: 'meer',
    },

    'decrease-indent': {
      label: 'Inspringing verkleinen',
      alt: 'minder',
    },

    'number-format-increase-precision': {
      label: 'Getalnotatie: precisie verhogen',
      alt: 'meer decimalen',
    },

    'number-format-decrease-precision': {
      label: 'Getalnotatie: precisie verlagen',
      alt: 'minder minder decimalen',
    },

    'number-format': {
      label: 'Getalnotatie',
      alt: 'aangepaste getalnotatie',

      parameter: {
        format: {
          label: 'Voer een getalnotatie of een symbolische naam in',
        },
      },
    },

    'merge-cells': {
      label: 'Geselecteerde cellen samenvoegen',
    },
    'unmerge-cells': {
      label: 'Samenvoeging van geselecteerde cellen opheffen',
    },
    'lock-cells': {
      label: 'Geselecteerde cellen vergrendelen',
    },
    'unlock-cells': {
      label: 'Geselecteerde cellen ontgrendelen',
    },

    'valign-top': {
      label: 'Opmaak selectie: verticaal boven uitlijnen',
    },
    'valign-bottom': {
      label: 'Opmaak selectie: verticaal onder uitlijnen',
    },
    'valign-middle': {
      label: 'Opmaak selectie: verticaal midden uitlijnen',
    },

    'align-left': {
      label: 'Opmaak selectie: tekst links uitlijnen',
      alt: 'horizontaal uitlijnen',
    },

    'align-right': {
      label: 'Opmaak selectie: tekst rechts uitlijnen',
      alt: 'horizontaal uitlijnen',
    },

    'align-center': {
      label: 'Opmaak selectie: tekst centreren',
      alt: 'horizontaal uitlijnen centreren',
    },

    'toggle-word-wrap': {
      label: 'Opmaak selectie: tekstterugloop in-/uitschakelen',
    },

    'toggle-gridlines': {
      label: 'Rasterlijnen in actief werkblad in-/uitschakelen',
    },
    'show-gridlines': {
      label: 'Rasterlijnen in actief werkblad weergeven',
    },
    'hide-gridlines': {
      label: 'Rasterlijnen in actief werkblad verbergen',
    },

    'toggle-bold': {
      label: 'Opmaak selectie: vet in-/uitschakelen',
    },
    'toggle-italic': {
      label: 'Opmaak selectie: cursief in-/uitschakelen',
    },
    'toggle-underline': {
      label: 'Opmaak selectie: onderstrepen in-/uitschakelen',
    },
    'toggle-strikethrough': {
      label: 'Opmaak selectie: doorhalen in-/uitschakelen',
    },

    'reset-text-formatting': {
      label: 'Opmaak selectie: tekstopmaak opnieuw instellen',
      alt: 'wissen',
    },
  },

  'correlation-matrix': {
    'title': 'Correlatiematrix',
    'accept-changes': 'Wijzigingen accepteren',
    'close-dialog': 'Sluiten',

    'invalid-shape': 'Selecteer een vierkante matrix van ten minste 2x2 cellen.',
    'invalid-data': 'De correlatiematrix moet een eenheidsdiagonaal hebben.\nElke cel op de diagonaal moet {unit} opleveren.',
    'asymmetric': 'De correlatiematrix moet symmetrisch zijn, of u kunt de bovenste of onderste driehoek weglaten.',

    'solution-text': 'De correlatiematrix is niet positief definiet. We hebben een oplossing gevonden door kleine aanpassingen aan de waarden te doen. De geaggregeerde fout is {error}.',
    'positive-definite': 'De correlatiematrix is positief definiet.',

  },

  'sign-in-page': {
    heading: 'Inloggen',
    subtitle: 'Voer uw gebruikersnaam en wachtwoord in om in te loggen.',

    username: {
      label: 'Gebruikersnaam of e-mailadres',
      required: 'Voer uw gebruikersnaam of e-mailadres in.',
    },

    password: {
      label: 'Wachtwoord',
      required: 'Voer uw wachtwoord in.',
      show: {
        label: 'Wachtwoord weergeven',
      },
      hide: {
        label: 'Wachtwoord verbergen',
      },
      'caps-lock': 'Caps Lock is ingeschakeld.',
    },

    remember: {
      label: 'Aangemeld blijven op dit apparaat',
    },

    submit: {
      label: 'Inloggen',
      pending: 'Bezig met inloggen…',
    },

    error: {
      rejected: 'Onjuiste gebruikersnaam of wachtwoord.',
      unreachable: 'Kan de server niet bereiken. Controleer uw verbinding en probeer het opnieuw.',
      incomplete: 'Inloggen is niet voltooid. Probeer het opnieuw.',
    },

    link: {
      'forgot-password': 'Wachtwoord vergeten',
      'create-account': 'Account aanmaken',
    },
  },

  'backstage-form': {
    email: {
      required: 'Voer uw e-mailadres in.',
      invalid: 'Dat lijkt geen geldig e-mailadres te zijn.',
    },

    username: {
      required: 'Kies een gebruikersnaam.',
      'too-short': 'Gebruikersnamen hebben ten minste {min} tekens.',
      'too-long': 'Gebruikersnamen hebben maximaal {max} tekens.',
      invalid: 'Gebruik letters, cijfers, koppeltekens en underscores, beginnend met een letter.',
    },

    password: {
      required: 'Kies een wachtwoord.',
      'too-short': 'Wachtwoorden hebben ten minste {min} tekens.',
    },
  },

  'create-account-page': {
    heading: 'Account aanmaken',

    subtitle: 'We vragen om een e-mailadres en een gebruikersnaam omdat documenten onder uw gebruikersnaam worden opgeslagen.',

    terms: {
      text: 'Lees onze {link} door.',
      link: 'gebruiksvoorwaarden',
    },

    email: {
      label: 'E-mailadres',
      taken: 'Er bestaat al een account met dat e-mailadres.',
    },

    username: {
      label: 'Gebruikersnaam',
      taken: '@{username} is al in gebruik.',
      reserved: '@{username} is niet beschikbaar.',
      checking: 'Beschikbaarheid controleren…',
      available: '@{username} is beschikbaar.',
    },

    handle: {
      example: '@{username}/example',
      placeholder: 'gebruikersnaam',
    },

    after: 'We sturen u een e-mail met een link om uw adres te bevestigen en een wachtwoord aan te maken.',

    submit: {
      label: 'Account aanmaken',
      pending: 'Account wordt aangemaakt…',
    },

    error: {
      unreachable: 'Kan de server niet bereiken. Controleer uw verbinding en probeer het opnieuw.',
      rejected: 'Dat account kon niet worden aangemaakt. Controleer uw gegevens en probeer het opnieuw.',
    },

    done: {
      heading: 'Controleer uw e-mail',
      body: 'We hebben een link gestuurd naar {email}. Open deze om uw adres te bevestigen en een wachtwoord te kiezen.',
      spam: 'Niets ontvangen? Wacht een minuutje en controleer dan uw spammap.',
      restart: 'Een ander adres gebruiken',
    },

    link: {
      'forgot-password': 'Wachtwoord vergeten',
      'sign-in': 'Inloggen',
    },
  },

  'forgot-password-page': {
    heading: 'Wachtwoord vergeten',
    subtitle: 'Voer uw e-mailadres in en we sturen u een link om een nieuw wachtwoord te kiezen.',

    email: {
      label: 'E-mailadres',
    },

    submit: {
      label: 'De link verzenden',
      pending: 'Verzenden…',
    },

    error: {
      unreachable: 'Kan de server niet bereiken. Controleer uw verbinding en probeer het opnieuw.',
    },

    done: {
      heading: 'Controleer uw e-mail',
      body: 'Als er een account is voor {email}, hebben we er een link naartoe gestuurd. Open deze om een nieuw wachtwoord te kiezen.',
      spam: 'Niets ontvangen? Wacht een minuutje en controleer dan uw spammap.',
      restart: 'Een ander adres gebruiken',
    },

    link: {
      'sign-in': 'Inloggen',
      'create-account': 'Account aanmaken',
    },
  },

  'create-password-page': {
    heading: 'Een wachtwoord aanmaken',
  },

  'update-password-page': {
    heading: 'Een nieuw wachtwoord kiezen',
    subtitle: 'Voer het token uit de link die we u hebben gestuurd in.',

    identifier: {
      label: 'Gebruikersnaam of e-mailadres',
      required: 'Voer uw gebruikersnaam of e-mailadres in.',
    },

    token: {
      label: 'Token',
      required: 'Voer het token uit de link die we u hebben gestuurd in.',
      invalid: 'Dat token is ongeldig. Controleer de link of vraag een nieuwe aan.',
      expired: 'Die link is verlopen. Vraag een nieuwe aan.',
      used: 'Die link is al gebruikt. Vraag een nieuwe aan.',
    },

    password: {
      label: 'Nieuw wachtwoord',
      show: {
        label: 'Wachtwoord weergeven',
      },
      hide: {
        label: 'Wachtwoord verbergen',
      },
      'caps-lock': 'Caps Lock is ingeschakeld.',

      common: 'Dat wachtwoord is te gemakkelijk te raden. Kies een ander.',
    },

    strength: {
      title: 'Wachtwoordsterkte',

      weak: 'Zwak',
      fair: 'Redelijk',
      good: 'Goed',
      strong: 'Sterk',
    },

    submit: {
      label: 'Wachtwoord bijwerken',
      pending: 'Bijwerken…',
    },

    error: {
      unreachable: 'Kan de server niet bereiken. Controleer uw verbinding en probeer het opnieuw.',
      rejected: 'Dat wachtwoord kon niet worden bijgewerkt. Controleer uw gegevens en probeer het opnieuw.',
    },

    done: {
      heading: 'Wachtwoord bijgewerkt',
      body: 'Uw nieuwe wachtwoord is opgeslagen.',
      'continue': 'Doorgaan naar de app',
    },

    link: {
      'sign-in': 'Inloggen',
      'forgot-password': 'Een nieuwe link verzenden',
    },
  },

  'new-document': {
    'discard-changes-message': 'U hebt niet-opgeslagen wijzigingen. Weet u het zeker?',
    'discard-changes-confirm': 'Nieuw document',
  },

  'status-pill': {
    messages: {
      'unsaved-changes': 'Niet-opgeslagen wijzigingen',
    },
  },
} satisfies DeepPartial<I18N>;
