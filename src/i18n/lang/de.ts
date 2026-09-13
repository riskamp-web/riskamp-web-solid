
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
    title: 'Spracheinstellungen...',
  },

  'select-language-dialog': {
    'title': 'Sprache auswählen',
  },

  about: {
    tagline: 'Monte-Carlo-Risikoanalyse für das Web.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Alle Rechte vorbehalten.',
    website: 'riskamp.com',
    'old-website-version': 'Suchen Sie die alte Version von RiskAMP web? Verwenden Sie {link}',
    report: 'Problem melden',
    'report-subject': 'RiskAMP web — Problembericht',
    'report-body': '(beschreiben Sie das Problem hier)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nBrowser: {ua}\nSprache: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Datei',
      help: 'Hilfe',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Daten & Analyse',
      tools: 'Extras',
      account: 'Konto',
    },

    'menu-commands': {
      documents: 'Dokumente',
      'account-page': 'Kontoseite',
      'sign-out': 'Abmelden',
    },

    tabs: {
      home: 'Start',
      layout: 'Layout',
      format: 'Format',
      insert: 'Einfügen',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Daten & Analyse',
    },

    menu: {
      'about-riskamp': 'Über RiskAMP web',
      'function-documentation': 'RiskAMP-Funktionsdokumentation',
      walkthrough: 'Walkthrough-Modell',
    },

    button: {
      'toggle-fullscreen': 'Vollbild umschalten',

      'new-spreadsheet': 'Neue Tabelle',
      'import-file': 'Datei importieren',
      'open-file': 'Datei öffnen',
      'save-file': 'Datei speichern',
      'save-file-as': 'Speichern unter...',
      'revert-file': 'Datei zurücksetzen',
      'save-to-desktop': 'Auf Desktop speichern',
      'export-xlsx': 'XLSX exportieren',
      'export-csv': 'CSV exportieren',

      'sign-in': 'Anmelden',
      'create-account': 'Konto erstellen',

      'search-cells': {
        label: 'Zellen suchen',
      },
      'defined-names': {
        label: 'Definierte Namen',
      },
      'fit-data': {
        label: 'Daten anpassen',
      },
      notes: {
        label: 'Notizen',
      },

      'monte-carlo-simulation': {
        label: 'Monte-Carlo-Simulation',
      },
      'run-simulation': {
        label: 'Simulation ausführen',
      },
      'run-simulation-again': {
        label: 'Simulation erneut ausführen',
      },
      'las-vegas-simulation': {
        label: 'Las-Vegas-Simulation',
      },
      'simulation-settings': {
        label: 'Simulationseinstellungen',
      },
      'quick-view': {
        label: 'Schnellansicht',
      },
      'quick-view-correlation': {
        label: 'Schnellansicht Korrelation',
      },
      recalculate: {
        label: 'Neu berechnen',
      },

      'align-left': {
        label: 'Linksbündig ausrichten',
      },
      'align-center': {
        label: 'Zentriert ausrichten',
      },
      'align-right': {
        label: 'Rechtsbündig ausrichten',
      },

      'align-top': {
        label: 'Oben ausrichten',
      },
      'align-middle': {
        label: 'Mittig ausrichten',
      },
      'align-bottom': {
        label: 'Unten ausrichten',
      },

      'increase-indent': {
        label: 'Einzug vergrößern',
      },
      'decrease-indent': {
        label: 'Einzug verkleinern',
      },
      'wrap-text': {
        label: 'Textumbruch',
      },

      'toggle-integer-grouping': {
        label: 'Gruppierung umschalten',
      },
      'increase-decimal-precision': {
        label: 'Genauigkeit erhöhen',
      },
      'decrease-decimal-precision': {
        label: 'Genauigkeit verringern',
      },

      'merge-cells': {
        label: 'Zellen verbinden',
      },
      'unmerge-cells': {
        label: 'Zellenverbindung aufheben',
      },

      'lock-cells': {
        label: 'Zellen für die Bearbeitung sperren',
      },
      'unlock-cells': {
        label: 'Zellen für die Bearbeitung entsperren',
      },

      bold: {
        label: 'Fetten Text umschalten',
      },
      italic: {
        label: 'Kursiven Text umschalten',
      },
      underline: {
        label: 'Unterstreichung umschalten',
      },
      strikethrough: {
        label: 'Durchstreichung umschalten',
      },

      'insert-row': {
        label: 'Zeile einfügen',
      },
      'insert-column': {
        label: 'Spalte einfügen',
      },
      'delete-row': {
        label: 'Zeile löschen',
      },
      'delete-column': {
        label: 'Spalte löschen',
      },

      'text-color': {
        label: 'Textfarbe',
      },
      'background-color': {
        label: 'Hintergrundfarbe',
      },
      'border-color': {
        label: 'Rahmenfarbe',
      },

      'border-top': {
        title: 'Rahmen oben',
      },
      'border-bottom': {
        title: 'Rahmen unten',
      },
      'border-double-bottom': {
        title: 'Doppelter Rahmen unten',
      },
      'border-left': {
        title: 'Rahmen links',
      },
      'border-right': {
        title: 'Rahmen rechts',
      },
      'border-all': {
        title: 'Alle Rahmen',
      },
      'border-none': {
        title: 'Rahmen entfernen',
      },
      'border-outside': {
        title: 'Äußere Rahmen',
      },

      'correlation-matrix': {
        title: 'Korrelationsmatrix',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline-Spalte',
      'sparkline-line': 'Sparkline-Linie',

      insert: {
        'bar-chart': 'Balkendiagramm',
        'donut-chart': 'Ringdiagramm',
        'column-chart': 'Säulendiagramm',
        'line-chart': 'Liniendiagramm',
        'scatter-plot': 'Punktdiagramm',
        'area-chart': 'Flächendiagramm',
        image: 'Bild',

        comment: 'Kommentar',
        table: 'Tabelle',
      },

      forecast: 'Trendprognose',
    },

    'open-menu': 'Menü öffnen',

    'more-commands-button': {
      label: 'Weitere Befehle...',
    },

    combobox: {
      'font-size': {
        label: 'Schriftgröße',
      },
      'number-format': {
        label: 'Zahlenformat',
      },
    },

    label: {
      'spreadsheet-cells': 'Tabellenzellen',
    },

    message: {
      'changes-stored-in-browser': 'Änderungen werden im Browserspeicher aufbewahrt, bis Sie sie speichern oder zurücksetzen.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'RiskAMP-Dokumentation',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Zurück',
        forward: 'Vorwärts',
      },
    },
    label: {
      'close-sidebar': 'Seitenleiste schließen',
    },

    simulation_settings: {
      'parallel-calculation': { 
        'section-header': 'Parallele Berechnung',
        'max-workers': 'Anzahl der Worker (Maximum)',
        'explanatory-text': `Mehr parallele Worker verbessern die Simulationsleistung bei komplexen Modellen. In den meisten Fällen empfehlen wir 4 oder 8 Worker.`,
      },

      'random-sampling': {
        'section-header': 'Zufälliges Stichprobenverfahren',
        'explanatory-text': 'Das Stichprobenverfahren wird mit dieser Tabelle gespeichert.\nDer hier ausgewählte Wert wird auch als Standard für neue Tabellen verwendet.',
      },

      'random-seed': {
        'section-header': 'Zufallszahlen-Seed',
        'explanatory-text': 'Der Zufallszahlen-Seed wird mit dieser Tabelle gespeichert.\nGeben Sie eine Zahl ein, um einen festen Seed zu verwenden, oder geben Sie 0 ein, um in jeder Simulation einen zufälligen Seed zu verwenden.',

        'enter-seed-value': 'Seed eingeben',
        'seed-value': 'Seed-Wert',
        'reset-seed-value': 'Seed zurücksetzen',
        'time-based-seed': 'Zeitbasierten Seed verwenden',
      },

      title: 'Simulationseinstellungen',
      'latin-hypercube-sampling': 'Latin-Hypercube-Stichprobenverfahren (LHS)',
      'standard-random-sampling': 'Standard-Zufallsstichprobe',

      'fixed-random-seed': 'Fester Seed',
      'seed-value-placeholder-text': 'Seed-Wert',
    },

    'notes-panel': {
      title: 'Notizen',
      'open-notes-with-spreadsheet': 'Notizen mit Tabelle öffnen',
      edit_markdown: 'Markdown bearbeiten',
      view_formatted: 'Formatiert anzeigen',
    },
    'fit-data-panel': {
      title: 'Daten anpassen',
    },
  },

  'color-picker': {
    choose_color: 'Farbe wählen',
    use_selected_color: 'Ausgewählte Farbe verwenden',
    theme_colors: 'Designfarben',
    other_colors: 'Weitere Farben',
    no_color: 'Keine Farbe',
    new_color: 'Neue Farbe',
    default_text_color: 'Standard-Textfarbe',
    default_border_color: 'Standard-Rahmenfarbe',
    no_fill: 'Keine Füllung',

    theme: {
      background: 'Hintergrund',
      text: 'Text',
      accent: 'Akzent',
      lighter: 'Heller',
      darker: 'Dunkler',
    },
  },

  'names-panel': {
    title: 'Definierte Namen',
    header: {
      name: 'Name',
      'name-scope': 'Gültigkeitsbereich',
      value: 'Wert',
    },
    'name-scope': {
      sheet: 'Arbeitsblatt',
      workbook: 'Arbeitsmappe',
    },
    label: {
      'delete-name': 'Namen löschen',
      'define-name': 'Namen definieren',
      'edit-name': 'Namen bearbeiten',
    },
    'name-type': {
      reference: 'Bezug',
      expression: 'Ausdruck',
    },
  },

  'search-panel': {
    title: 'Zellen suchen',
    'search-text': {
      placeholder: 'Suchtext',
    },
    'search-in': {
      text: 'Suchen in',
    },
    'search-type': {
      'cell-values': 'Werte',
      'cell-formulas': 'Formeln',
      wildcards: 'Platzhalter',
    },
    'search-scope': {
      'current-sheet': 'Aktuelles Arbeitsblatt',
      'all-sheets': 'Alle Arbeitsblätter',
    },
    'search-results': {
      header: {
        address: 'Adresse',
        value: 'Wert',
        formula: 'Formel',
      },
      information: {
        'enter-text': 'Text zum Suchen eingeben',
        result: 'Ergebnis',
        results: 'Ergebnisse',
      },
    },
  },
  'forecast-dialog': {
    title: 'Trendprognose',
    parameters: {
      dates: {
        title: 'Datumswerte',
      },
      values: {
        title: 'Werte',
      },
      periods: 'Prognosezeiträume',
      seasonality: 'Saisonalität',

      'fill-empty': 'Füllen',
      'aggregate-multiple': 'Aggregieren',
      'project-forward-periods': 'Perioden',
      'chart-type': {
        label: 'Diagrammtyp',
      },
      'chart-type-line-chart': 'Linie',
      'chart-type-column-chart': 'Säule',
    },
    options: {
      'model-type': 'Modell',
      'forecast-type': 'Prognosetyp',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel-kompatibel',
      'static-forecast': 'Statisch',
      'stochastic-forecast': 'Stochastisch',
    },
    settings: 'Einstellungen',
    'create-forecast-sheet': 'Prognose-Arbeitsblatt erstellen',
    seasonality: {
      'auto-detect': 'Automatisch erkennen',
    },
    'fill-options': {
      interpolate: 'Interpolieren',
      zeros: 'Nullen',
    },
    'aggregate-options': {
      average: 'Mittelwert',
      median: 'Median',
      min: 'Min',
      max: 'Max',
      sum: 'Summe',
      count: 'Anzahl',
    },

    'chart-labels': {
      values: 'Werte',
      forecast: 'Prognose',
    },
  },

  'forecast-sheet-timeline-header': 'Zeitachse',
  'forecast-sheet-values-header': 'Werte',
  'forecast-sheet-forecast-header': 'Prognose',
  'forecast-sheet-sample-header': 'Stichprobe',
  'forecast-sheet-statistics-header': 'Statistik',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Mittelwert',
    },
    'p80-range': {
      header: 'P80-Bereich',
    },
  },

  'sparkline-dialog': {
    title: 'Sparkline einfügen',
    parameters: {
      target: {
        title: 'Zielzelle',
        'overwrite-warning': 'Daten im Zielbereich werden überschrieben',
        'merge-warning': 'Die ausgewählten Zellen werden für die Sparkline verbunden',
      },
      source: {
        title: 'Quelldatenbereich',
      },
    },
    info: 'Verwenden Sie Vordergrund- und Hintergrundfarbe der Zelle, um die Sparkline zu gestalten',

    'sparkline-type': 'Sparkline-Typ',
    'sparkline-type-line-chart': 'Linie',
    'sparkline-type-column-chart': 'Säule',
  },

  'quick-view-dialog': {
    title: 'Schnellansicht',
    'select-cell': 'Zelle auswählen',
    'tab-histogram': 'Histogramm',
    'tab-box-plot': 'Boxplot',
    'show-statistics': 'Statistik',
    'histogram-bin-algorithm-long': 'Klassen-Algorithmus',
    'histogram-bin-algorithm-short': 'Klassen',
    'bin-algorithm-automatic': 'Automatisch',
    'box-plot-whisker-type-long': 'Whisker-Typ',
    'box-plot-whisker-type-short': 'Whisker',
    'box-plot-whisker-type-minmax': 'Min/Max',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Für die ausgewählte Zelle liegen keine Simulationsdaten vor. Führen Sie unten eine Simulation aus, um Daten für diese Zelle zu sammeln.\n\nSimulationsdaten werden automatisch gesammelt, wenn eine Zelle von einer Statistikfunktion (wie SimulationMean) referenziert wird.',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1. Quartil',
      third_quartile: '3. Quartil',
      median: 'Median',
      'interquartile-range': 'IQR',
      mean: 'Mittelwert',
      variance: 'Varianz',
      'standard-deviation': 'Std.-Abw.',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Auswahl der Schnellansicht sperren',
        'click-to-unlock': 'Auswahl der Schnellansicht entsperren',
        'return-to-selection': 'Zurück zur ausgewählten Zelle',
        'selection-locked': 'Auswahl gesperrt',
      },
    },
  },

  'dialog-close-label': 'Schließen',
  'dialog-close-title': 'Dialog schließen',
  'dialog-help-title': 'Hilfe',

  'standard-buttons': {
    close: {
      label: 'Schließen',
      title: 'Dialog schließen',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Zurück',
    },
    yes: {
      title: 'Ja',
    },
    no: {
      title: 'Nein',
    },
    accept: {
      title: 'Übernehmen',
    },
    cancel: {
      title: 'Abbrechen',
    },
  },

  'confirm-dialog': {
    title: 'Sind Sie sicher?',
    'alert-title': 'Warnung',
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte-Carlo-Simulation',
  'run-simulation': {
    'number-of-trials': 'Anzahl der Durchläufe',
    'screen-updates': 'Bildschirmaktualisierungen anzeigen',
    starting: 'Wird gestartet...',
    'percent-complete': 'abgeschlossen',
  },
  'run-simulation-start-label': 'Start',
  'run-simulation-start-title': 'Simulation starten',
  'run-simulation-cancel-label': 'Stopp',
  'run-simulation-cancel-title': 'Simulation stoppen',

  'load-error': {
    'loading-document-failed': 'Die angeforderte Datei konnte nicht geladen werden',
  },

  'save-as-dialog': {
    'default-title': 'Speichern unter',
    'rename-title': 'Dokument umbenennen',
    'duplicate-title': 'Dokument duplizieren',
    folder: 'Ordner',
    name: 'Name',
    access: 'Zugriff',
    public: 'Öffentlich',
    private: 'Privat',
    save: 'Speichern',
    overwrite: 'Überschreiben',
    'folder-placeholder': 'Optional — z. B. finance/reports',
    'name-placeholder': 'Dokumentname',
    'preview-label': 'Wird gespeichert als',
    'copy-link': 'Link kopieren',
    'copy-link-copied': 'Link kopiert',
    collision: 'Unter diesem Pfad existiert bereits ein Dokument.',
    'collision-blocked': 'Unter diesem Pfad existiert bereits ein Dokument. Wählen Sie einen anderen Namen.',
    empty: 'Geben Sie einen Namen ein',
    saved: '„{name}“ gespeichert',
    'save-failed': '„{name}“ konnte nicht gespeichert werden.',
    retry: 'Erneut versuchen',
    'overwrite-confirm-title': 'Dokument überschreiben?',
    'overwrite-confirm-message': 'Unter „{name}“ existiert bereits ein Dokument. Beim Überschreiben wird sein Inhalt ersetzt. Sind Sie sicher?',

    'path-exists-title': 'Dokument existiert',
    'path-exists-message': 'Ein Dokument mit diesem Pfad existiert bereits. Löschen Sie dieses Dokument zuerst, wenn Sie den Pfad wiederverwenden möchten.',

  },

  toast: {
    'region-label': 'Benachrichtigungen',
    dismiss: 'Verwerfen',
  },

  'las-vegas-simulation-panel': {
    title: 'Las-Vegas-Simulation',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Akzeptieren',
        description: 'Akzeptieren ist eine Zelle, die TRUE oder FALSE zurückgibt, um einen Durchlauf anzunehmen oder abzulehnen. Erforderlich.',
      },
      complete: {
        title: 'Abschließen',
        description: 'Abschließen ist eine Zelle, die TRUE zurückgibt, um die Simulation zu beenden, oder eine Anzahl akzeptierter Durchläufe. Erforderlich.',
      },
      fail: {
        title: 'Fehlschlagen',
        description: 'Fehlschlagen ist eine Zelle, die TRUE zurückgibt, um die Simulation zu beenden, oder eine maximale Gesamtzahl von Durchläufen. Optional.',
      },
    },
    'more-information-link': {
      title: 'Weitere Informationen',
    },
    'running-simulation': 'Simulation wird ausgeführt...',
    'options-overview': 'Geben Sie Optionen für eine Las-Vegas-Simulation ein.',
  },

  'insert-function': {
    button: {
      title: 'Funktion einfügen...',
    },
    'insert-function': 'Funktion einfügen',
    'search-for-function': 'Nach Funktion suchen...',
    'function-result': 'Ergebnis',
  },

  'function-dialog': {
    'select-function': {
      title: 'Funktion auswählen',
    },
  },

  'arguments-dialog': {
    'function-result': 'Ergebnis',
    volatile: 'volatil',
    'function-help-title': 'Hilfe zu dieser Funktion',
  },

  'number-format': {
    general: 'Allgemein',
    number: 'Zahl',
    integer: 'Ganzzahl',
    percent: 'Prozent',
    fraction: 'Bruch',
    accounting: 'Buchhaltung',
    currency: 'Währung',
    scientific: 'Wissenschaftlich',

    timestamp: 'Zeitstempel',
    'long-date': 'Langes Datum',
    'short-date': 'Kurzes Datum',
  },

  'llm-chat': {
    panel: {
      title: 'KI-Assistent',
    },
    'settings-tab': {
      title: 'Einstellungen',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Modell wechseln?',
      message: 'Dieses Modell verwendet einen anderen Anbieter, daher wird die aktuelle Unterhaltung gelöscht. Fortfahren?',
      confirm: 'Modell wechseln',
    },
    buttons: {
      'send-message': 'Senden',

      'clear-conversation': 'Unterhaltung löschen',
      save: 'Auf Desktop speichern',
      resend: 'Letzte Nachricht erneut senden',
      restart: 'Ab der ersten Nachricht neu starten',
    },

    label: {
      'api-key': 'API-Schlüssel',
      'api-key-placeholder': 'Fügen Sie Ihren API-Schlüssel ein',
      'reveal-api-key': 'API-Schlüssel anzeigen',
      'hide-api-key': 'API-Schlüssel ausblenden',
      model: 'Modell',
      'choose-a-model': 'Modell wählen',
      'select-a-model': 'Modell auswählen',
      header: {
        important: 'Wichtig',
      },
      disclaimer: 'Die KI-Schnittstelle arbeitet nach dem Bring-your-own-Key-Prinzip. Um sie zu nutzen, müssen Sie einen API-Schlüssel für einen unterstützten Anbieter oder ein unterstütztes Modell angeben.\nWir sehen Ihren API-Schlüssel niemals. Er bleibt in Ihrem Browser und wird nur an den offiziellen Anbieter gesendet, wenn Sie eine Chat-Nachricht senden.\nIhr Modellanbieter berechnet Ihnen Tokens oder rechnet sie über Ihren Abonnementplan ab.',

      provider_link: 'Webseite des Anbieters',
      model_information_link: 'Modellinformationen',
      screenshots_disabled: 'Hinweis: Dieses Modell unterstützt keine Screenshots.',

    },

    activity: {
      thinking: 'Denkt nach…',
      working: 'Arbeitet…',
      running: '{tool} wird ausgeführt…',
    },

    error: {
      unknown: 'unbekannter Fehler',
      'unknown-type': 'unbekannter Typ',
    },
  },

  'developer-panel': {
    title: 'Entwicklerinformationen',
  },

  'fit-data-panel': {
    'select-range': 'Bereich auswählen',
    'candidate-distributions': {
      label: 'Kandidaten-Verteilungen',
      description: 'Kandidaten werden nach der besten Anpassung an die theoretische Verteilung sortiert',
    },
    'log-normal-graph': {
      description: 'Der Log-Normal-Graph wird mit logarithmischer Skala gezeichnet',
    },
    statistics: {
      error: 'Fehler',
      mean_square_error: 'Mittlerer quadratischer Fehler',
      aggregate_error: 'Aggregierter Fehler',
      max_error: 'Maximaler Fehler',
      mean_error: 'Mittlerer Fehler',
    },

    label: {
      'click-to-lock': 'Auswahl für die Datenanpassung sperren',
      'click-to-unlock': 'Auswahl für die Datenanpassung entsperren',
    },

    'distribution-parameters': 'Verteilungsparameter',
    'spreadsheet-function': 'Tabellenfunktion',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'In die Zwischenablage kopieren',
      error: 'Kopierfehler',
      copied: 'Kopiert',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Keine passenden Befehle',
    'start-typing': 'Tippen Sie, um einen Befehl zu finden',
    'run-highlighted-command': 'Drücken Sie die Eingabetaste, um den markierten Befehl auszuführen',
    'command-palette': {
      label: 'Befehlspalette',
    },
  },

  'documents-page': {
    title: 'Dokumente',

    scope: {
      all: 'Alle Dokumente',
      starred: 'Markiert',
      recent: 'Zuletzt verwendet',
      private: 'Privat',
    },

    rail: {
      label: 'Dokumentfilter',
      folders: 'Ordner',
      'no-folders': 'Keine Ordner',
    },

    search: {
      placeholder: 'Dokumente suchen',
      label: 'Dokumente suchen',
      clear: {
        label: 'Suche löschen',
      },
    },
    filter: {
      label: 'Filter',
    },

    action: {
      'new-document': 'Neues Dokument',
      open: 'Öffnen',
      duplicate: 'Duplizieren',
      rename: 'Umbenennen…',
      'delete': 'Löschen',
      cancel: 'Abbrechen',
      'make-public': 'Öffentlich machen',
      'make-private': 'Privat machen',
      'version-history': 'Versionsverlauf',
    },

    access: {
      public: 'Öffentlich',
      private: 'Privat',
    },

    selection: {
      count: {
        one: '{count} ausgewählt',
        other: '{count} ausgewählt',
      },
      'make-public': {
        label: 'Ausgewählte Dokumente öffentlich machen',
      },
      'make-private': {
        label: 'Ausgewählte Dokumente privat machen',
      },
      'delete': {
        label: 'Ausgewählte Dokumente löschen',
      },
    },

    table: {
      label: 'Dokumente',
      'select-all': {
        label: 'Alle Dokumente auswählen',
      },
    },
    column: {
      starred: 'Markiert',
      name: 'Name',
      folder: 'Ordner',
      access: 'Zugriff',
      version: 'Version',
      modified: 'Geändert',
      actions: 'Aktionen',
    },

    row: {
      select: {
        label: '{name} auswählen',
      },
      star: {
        label: '{name} markieren',
      },
      unstar: {
        label: 'Markierung von {name} aufheben',
      },
      menu: {
        label: 'Aktionen für {name}',
      },
      unnamed: {
        title: 'Dieses Dokument hat noch keinen Namen',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Dokument löschen, sind Sie sicher?',
      confirm_delete_documents: 'Dokumente löschen, sind Sie sicher?',
    },

    error: {
      title: 'Ihre Dokumente konnten nicht geladen werden',
      detail: 'Das Laden ist aufgrund eines Fehlers fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      retry: 'Erneut versuchen',
    },

    messages: {
      rename_failed: 'Umbenennen fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      rename_succeeded: 'Dokument umbenannt',

      delete_failed: 'Löschen fehlgeschlagen. Bitte versuchen Sie es später erneut.',
      one_document_deleted: 'Dokument gelöscht',
      multiple_documents_deleted: 'Dokumente gelöscht',

      update_failed: 'Aktualisieren fehlgeschlagen. Bitte versuchen Sie es später erneut.',

      duplicate_succeeded: 'Dokument erstellt',
      duplicate_failed: 'Duplizieren fehlgeschlagen. Bitte versuchen Sie es später erneut.',

      restore_succeeded: 'Dokument wiederhergestellt',
      restore_failed: 'Wiederherstellen fehlgeschlagen. Bitte versuchen Sie es später erneut.',

    },

    empty: {
      title: 'Noch keine Dokumente',
      detail: 'Tabellen, die Sie erstellen oder importieren, erscheinen hier zusammen mit ihrem Versionsverlauf.',
    },

    'no-match': {
      title: 'Keine Dokumente entsprechen „{query}“',
      detail: 'Die Suche umfasst alle Ordner. Versuchen Sie einen kürzeren Begriff.',
      action: 'Suche löschen',
    },

    'empty-filter': {
      title: 'Hier ist nichts',
      detail: 'Keine Dokumente entsprechen diesem Filter.',
      'detail-folder': 'Keine Dokumente in {folder}.',
      action: 'Alle Dokumente anzeigen',
    },

    footer: {
      count: {
        one: '{count} Dokument',
        other: '{count} Dokumente',
      },
      filtered: '{count} von {total} Dokumenten',
      'searching-all': 'alle Ordner werden durchsucht',
    },

    panel: {
      label: 'Dokumentdetails',
      open: {
        title: 'Dokument öffnen',
      },
      close: {
        label: 'Details schließen',
      },
      'copy-link': {
        label: 'Link kopieren',
        copied: {
          label: 'Link kopiert',
          title: 'Kopiert',
        },
      },
      'unnamed-hint': 'Noch kein Name — dies ist die Adresse. Beim Umbenennen wird einer festgelegt.',
      star: {
        label: 'Dieses Dokument markieren',
      },
      unstar: {
        label: 'Markierung dieses Dokuments aufheben',
      },
      field: {
        access: 'Zugriff',
        starred: 'Markiert',
        created: 'Erstellt',
        modified: 'Geändert',
        version: 'Version',
      },
    },

    history: {
      title: 'Ältere Versionen',
      loading: 'Versionsverlauf wird geladen',
      error: 'Der Versionsverlauf konnte nicht geladen werden.',
      retry: 'Erneut versuchen',
      menu: {
        label: 'Aktionen für Version {version}',
      },
      open: {
        text: 'Diese Version öffnen',
        label: 'Version {version} öffnen',
      },
      duplicate: 'Als neues Dokument duplizieren',
      restore: 'Wiederherstellen',
      none: 'Noch keine älteren Versionen. Sie erscheinen hier, wenn Sie speichern.',
      kept: {
        one: 'Eine ältere Version wird aufbewahrt.',
        other: 'Die letzten {count} älteren Versionen werden aufbewahrt.',
      },
    },

    time: {
      'just-now': 'gerade eben',
      minutes: {
        one: 'vor {count} Minute',
        other: 'vor {count} Minuten',
      },
      hours: {
        one: 'vor {count} Stunde',
        other: 'vor {count} Stunden',
      },
      days: {
        one: 'vor {count} Tag',
        other: 'vor {count} Tagen',
      },
      today: 'heute, {time}',
      yesterday: 'gestern, {time}',
    },
  },

  'documents-table': {
    document: {
      label: 'Dokument',
    },
    'updated-date': {
      label: 'Aktualisiert',
    },
    'created-date': {
      label: 'Erstellt',
    },
    access: {
      label: 'Zugriff',
      'type-private': 'Privat',
      'type-public': 'Öffentlich',
    },
    'filter-documents': {
      label: 'Dokumente filtern',
    },

    controls: {
      'delete-selected': 'Ausgewählte löschen',
      'make-public': 'Öffentlich machen',
      'make-private': 'Privat machen',
    },
  },

  'account-page': {
    title: 'Konto',
  },

  'sign-in': {
    page: {
      title: 'Anmelden',
    },
    form: {
      username: {
        placeholder: 'Benutzername oder E-Mail-Adresse',
      },
      password: {
        placeholder: 'Passwort',
      },
      'sign-in-button': {
        label: 'Anmelden',
      },
      'remember-me': 'Auf diesem Gerät angemeldet bleiben',
      instructions: 'Geben Sie Ihren Benutzernamen und Ihr Passwort ein, um sich anzumelden',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Passwort vergessen',
      },
      'create-account': {
        text: 'Konto erstellen',
      },
      'sign-in': {
        text: 'Anmelden',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Passwort vergessen',
    },
    form: {
      instructions: 'Geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen',
      email: {
        placeholder: 'E-Mail-Adresse',
      },
      'reset-password-button': {
        label: 'Passwort zurücksetzen',
      },
    },
  },

  'privacy-policy': {
    page: {
      title: 'Datenschutzrichtlinie',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Nutzungsbedingungen',
    },
  },

  'create-account': {
    page: {
      title: 'Konto erstellen',
    },
  },
  'create-password': {
    page: {
      title: 'Passwort erstellen',
    },
  },
  'update-password': {
    page: {
      title: 'Passwort aktualisieren',
    },
  },

  'theme-toggle': {
    'light-theme': 'Helles Design',
    'dark-theme': 'Dunkles Design',
    'system-theme': 'System-Design',
  },

  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Dunkles Design verwenden',
        alt: 'Farbschema',
      },

      'light-theme': {
        label: 'Helles Design verwenden',
        alt: 'Farbschema',
      },

      'system-theme': {
        label: 'System-Design verwenden',
        alt: 'Farbschema hell dunkel',
      },
    },

    'remove-hyperlink': {
      label: 'Hyperlink entfernen',
      alt: 'löschen Link entfernen',
    },

    'insert-hyperlink': {
      label: 'Hyperlink einfügen',
      alt: 'hinzufügen Link festlegen',

      parameter: {
        url: {
          label: 'Linkadresse (URL) eingeben',
        },
      },
    },

    'add-edit-comment': {
      label: 'Zellkommentar hinzufügen oder bearbeiten',
      alt: 'Notiz Kommentar',

      parameter: {
        comment: {
          label: 'Geben Sie einen Kommentar ein. Drücken Sie Ctrl + Enter zum Speichern.',
          'label-mac': 'Geben Sie einen Kommentar ein. Drücken Sie Cmd + Enter zum Speichern.',
        },
      },
    },

    'remove-comment': {
      label: 'Zellkommentar entfernen',
      alt: 'Notiz',
    },

    'reset-background-color': {
      label: 'Hintergrundfarbe in der Auswahl zurücksetzen',
      alt: 'Füllung löschen',
    },

    'set-background-color': {
      label: 'Hintergrundfarbe für die Auswahl festlegen',
      alt: 'Füllung',
    },

    'reset-text-color': {
      label: 'Textfarbe in der Auswahl zurücksetzen',
      alt: 'Vordergrund löschen',
    },

    'set-text-color': {
      label: 'Textfarbe für die Auswahl festlegen',
      alt: 'Vordergrund',
    },

    'reset-border-color': {
      label: 'Rahmenfarbe in der Auswahl zurücksetzen',
      alt: 'löschen',
    },

    'set-border-color': {
      label: 'Rahmenfarbe für die Auswahl festlegen',
    },

    'borders-clear': {
      label: 'Rahmen: Rahmen entfernen',
    },
    'border-top': {
      label: 'Rahmen: oberen Rahmen für die Auswahl festlegen',
    },
    'border-bottom': {
      label: 'Rahmen: unteren Rahmen für die Auswahl festlegen',
    },
    'border-double-bottom': {
      label: 'Rahmen: doppelten unteren Rahmen für die Auswahl festlegen',
    },
    'border-left': {
      label: 'Rahmen: linken Rahmen für die Auswahl festlegen',
    },
    'border-right': {
      label: 'Rahmen: rechten Rahmen für die Auswahl festlegen',
    },

    'border-outside': {
      label: 'Rahmen: äußeren Rahmen für die Auswahl festlegen',
      alt: 'außen',
    },

    'border-all': {
      label: 'Rahmen: alle Rahmen für die Auswahl festlegen',
    },

    'reset-font-scale': {
      label: 'Schriftskalierung zurücksetzen',
      alt: 'Text Schriftgröße',
    },

    'font-scale-increase': {
      label: 'Schriftskalierung: um 10 % erhöhen',
      alt: 'Text Schriftgröße',
    },

    'font-scale-decrease': {
      label: 'Schriftskalierung: um 10 % verringern',
      alt: 'Text Schriftgröße',
    },

    'insert-donut-chart': {
      label: 'Ringdiagramm einfügen',
      alt: 'Diagramm Grafik',
    },

    'insert-column-chart': {
      label: 'Säulendiagramm einfügen',
      alt: 'Diagramm Grafik',
    },

    'insert-bar-chart': {
      label: 'Balkendiagramm einfügen',
      alt: 'Diagramm Grafik',
    },

    'insert-line-chart': {
      label: 'Liniendiagramm einfügen',
      alt: 'Diagramm Grafik',
    },

    'insert-scatter-plot': {
      label: 'Punktdiagramm einfügen',
      alt: 'Diagramm Grafik',
    },

    'insert-box-plot': {
      label: 'Boxplot einfügen',
      alt: 'Diagramm Grafik Whisker',
    },

    'insert-image': {
      label: 'Bild einfügen',
    },

    'cf-gradient-red-green': {
      label: 'Bedingte Formatierung Farbverlauf: Rot-Grün',
    },
    'cf-gradient-green-red': {
      label: 'Bedingte Formatierung Farbverlauf: Grün-Rot',
    },
    'cf-unique-values': {
      label: 'Bedingte Formatierung: eindeutige Werte',

      parameter: {
        color: {
          label: 'Farbe für eindeutige Werte auswählen',
        },
      },
    },

    'cf-data-bars': {
      label: 'Bedingte Formatierung: Datenbalken',
      alt: 'Datenbalken',

      parameter: {
        color: {
          label: 'Farbe für Datenbalken auswählen',
        },
        'hide-values': {
          label: 'Werte ausblenden?',
          choice: {
            'true': 'Ja, Werte ausblenden',
            'false': 'Nein, Werte anzeigen',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Bedingte Formatierung: doppelte Werte',

      parameter: {
        color: {
          label: 'Farbe für doppelte Werte auswählen',
        },
      },
    },

    'cf-clear': {
      label: 'Bedingte Formatierung aus der Auswahl entfernen',
      alt: 'entfernen',
    },

    'fit-column-widths': {
      label: 'Breite der ausgewählten Spalten anpassen (automatisch)',
    },

    'fit-data': {
      label: 'Daten anpassen',
      alt: 'anpassen',
    },

    'named-ranges': {
      label: 'Benannte Bereiche und Ausdrücke',
      alt: 'Namensverwaltung Namen definieren Namen löschen entfernen',
    },

    'set-tab-color': {
      label: 'Tab-Farbe festlegen',
    },

    'reset-tab-color': {
      label: 'Tab-Farbe zurücksetzen',
      alt: 'löschen entfernen',
    },

    'fit-row-heights': {
      label: 'Höhe der ausgewählten Zeilen anpassen (automatisch)',
    },

    'correlation-matrix': {
      label: 'Korrelationsmatrix prüfen',
    },

    'hide-sheet': {
      label: 'Arbeitsblatt ausblenden',
      alt: 'sichtbar',
    },

    'unhide-all-sheets': {
      label: 'Alle Arbeitsblätter einblenden',
      alt: 'sichtbar',
    },

    'unhide-columns': {
      label: 'Ausgeblendete Spalten des Arbeitsblatts einblenden',
    },
    'unhide-rows': {
      label: 'Ausgeblendete Zeilen des Arbeitsblatts einblenden',
    },
    'hide-rows': {
      label: 'Ausgewählte Zeilen ausblenden',
    },
    'hide-columns': {
      label: 'Ausgewählte Spalten ausblenden',
    },

    'las-vegas-simulation': {
      label: 'Las-Vegas-Simulation...',
    },
    'simulation-settings': {
      label: 'Simulationseinstellungen...',
    },
    'language-settings': {
      label: 'Spracheinstellungen...',
    },

    'load-desktop-file': {
      label: 'Desktop-Datei laden...',
      alt: 'Excel CSV Import',
    },

    'save-xlsx': {
      label: 'Als XLSX speichern',
      alt: 'Excel herunterladen',
    },

    'save-csv': {
      label: 'Aktuelles Arbeitsblatt als CSV speichern',
      alt: 'Export herunterladen',
    },

    'save-to-cloud': {
      label: 'In der Cloud speichern',
    },

    'load-document': {
      label: 'Dokument laden...',
      alt: 'öffnen',
    },

    'download-json': {
      label: 'Auf Desktop herunterladen (JSON)',
      alt: 'speichern',
    },

    'insert-function': {
      label: 'Funktion einfügen...',
    },
    find: {
      label: 'In Werten/Formeln suchen...',
    },
    'insert-distribution': {
      label: 'Zufallsverteilung einfügen...',
    },
    'run-simulation': {
      label: 'Simulation ausführen...',
    },
    'quick-view': {
      label: 'Schnellansicht...',
    },
    'new-model': {
      label: 'Neues Modell',
    },
    'revert-file': {
      label: 'Datei zurücksetzen',
    },
    recalculate: {
      label: 'Neu berechnen',
    },
    undo: {
      label: 'Rückgängig',
    },
    'delete-columns': {
      label: 'Ausgewählte Spalten löschen',
    },
    'delete-rows': {
      label: 'Ausgewählte Zeilen löschen',
    },
    'insert-column': {
      label: 'Spalte einfügen',
    },
    'insert-row': {
      label: 'Zeile einfügen',
    },
    'set-view-scale': {
      label: 'Ansichtsgröße festlegen (Zoom)',

      parameter: {
        scale: {
          label: 'Ansichtsgröße eingeben',
        },
      },
    },
    'reset-view-scale': {
      label: 'Ansichtsgröße zurücksetzen (Zoom)',
    },

    'rename-tab': {
      label: 'Tab umbenennen',
      alt: 'Arbeitsblatt Seite',

      parameter: {
        name: {
          label: 'Geben Sie einen Namen für diesen Tab ein',
        },
      },
    },

    'add-tab': {
      label: 'Tab hinzufügen',
      alt: 'Arbeitsblatt Seite',

      parameter: {
        name: {
          label: 'Geben Sie einen Namen für den neuen Tab ein',
        },
      },
    },

    'delete-tab': {
      label: 'Tab löschen',
      alt: 'Arbeitsblatt Seite',
    },

    'increase-indent': {
      label: 'Einzug vergrößern',
      alt: 'mehr',
    },

    'decrease-indent': {
      label: 'Einzug verkleinern',
      alt: 'weniger',
    },

    'number-format-increase-precision': {
      label: 'Zahlenformat: Genauigkeit erhöhen',
      alt: 'mehr Dezimalstellen',
    },

    'number-format-decrease-precision': {
      label: 'Zahlenformat: Genauigkeit verringern',
      alt: 'weniger Dezimalstellen',
    },

    'number-format': {
      label: 'Zahlenformat',
      alt: 'benutzerdefiniertes Zahlenformat',

      parameter: {
        format: {
          label: 'Zahlenformat oder einen symbolischen Namen eingeben',
        },
      },
    },

    'merge-cells': {
      label: 'Ausgewählte Zellen verbinden',
    },
    'unmerge-cells': {
      label: 'Zellenverbindung der Auswahl aufheben',
    },
    'lock-cells': {
      label: 'Ausgewählte Zellen sperren',
    },
    'unlock-cells': {
      label: 'Ausgewählte Zellen entsperren',
    },

    'valign-top': {
      label: 'Auswahl formatieren: oben ausrichten',
    },
    'valign-bottom': {
      label: 'Auswahl formatieren: unten ausrichten',
    },
    'valign-middle': {
      label: 'Auswahl formatieren: mittig ausrichten',
    },

    'align-left': {
      label: 'Auswahl formatieren: Text linksbündig',
      alt: 'horizontal ausrichten',
    },

    'align-right': {
      label: 'Auswahl formatieren: Text rechtsbündig',
      alt: 'horizontal ausrichten',
    },

    'align-center': {
      label: 'Auswahl formatieren: Text zentrieren',
      alt: 'horizontal ausrichten zentrieren',
    },

    'toggle-word-wrap': {
      label: 'Auswahl formatieren: Textumbruch umschalten',
    },

    'toggle-gridlines': {
      label: 'Gitternetzlinien im aktiven Arbeitsblatt umschalten',
    },
    'show-gridlines': {
      label: 'Gitternetzlinien im aktiven Arbeitsblatt anzeigen',
    },
    'hide-gridlines': {
      label: 'Gitternetzlinien im aktiven Arbeitsblatt ausblenden',
    },

    'toggle-bold': {
      label: 'Auswahl formatieren: Fett umschalten',
    },
    'toggle-italic': {
      label: 'Auswahl formatieren: Kursiv umschalten',
    },
    'toggle-underline': {
      label: 'Auswahl formatieren: Unterstreichung umschalten',
    },
    'toggle-strikethrough': {
      label: 'Auswahl formatieren: Durchstreichung umschalten',
    },

    'reset-text-formatting': {
      label: 'Auswahl formatieren: Textformatierung zurücksetzen',
      alt: 'löschen',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Kommentar entfernen',
    },
    'save-button': {
      label: 'Speichern',
    }
  },

  'correlation-matrix': {
    'title': 'Korrelationsmatrix',
    'accept-changes': 'Änderungen übernehmen',
    'close-dialog': 'Schließen',

    'invalid-shape': 'Bitte wählen Sie eine quadratische Matrix mit mindestens 2x2 Zellen.',
    'invalid-data': 'Die Korrelationsmatrix muss eine Einheitsdiagonale haben.\nJede Zelle auf der Diagonale muss {unit} ergeben.',
    'asymmetric': 'Die Korrelationsmatrix muss symmetrisch sein, oder Sie können die obere oder untere Dreiecksmatrix weglassen.',

    'solution-text': `Die Korrelationsmatrix ist nicht positiv definit. Wir haben eine Lösung gefunden, indem wir die Werte geringfügig angepasst haben. Der aggregierte Fehler beträgt {error}.`,
    'positive-definite': `Die Korrelationsmatrix ist positiv definit.`,

  },

  'sign-in-page': {
    heading: 'Anmelden',
    subtitle: 'Geben Sie Ihren Benutzernamen und Ihr Passwort ein, um sich anzumelden.',

    username: {
      label: 'Benutzername oder E-Mail-Adresse',
      required: 'Geben Sie Ihren Benutzernamen oder Ihre E-Mail-Adresse ein.',
    },

    password: {
      label: 'Passwort',
      required: 'Geben Sie Ihr Passwort ein.',
      show: {
        label: 'Passwort anzeigen',
      },
      hide: {
        label: 'Passwort ausblenden',
      },
      'caps-lock': 'Die Feststelltaste ist aktiviert.',
    },

    remember: {
      label: 'Auf diesem Gerät angemeldet bleiben',
    },

    submit: {
      label: 'Anmelden',
      pending: 'Anmeldung läuft…',
    },

    error: {
      rejected: 'Falscher Benutzername oder falsches Passwort.',
      unreachable: 'Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      incomplete: 'Die Anmeldung wurde nicht abgeschlossen. Versuchen Sie es erneut.',
    },

    link: {
      'forgot-password': 'Passwort vergessen',
      'create-account': 'Konto erstellen',
    },
  },

  'backstage-form': {
    email: {
      required: 'Geben Sie Ihre E-Mail-Adresse ein.',
      invalid: 'Das sieht nicht nach einer E-Mail-Adresse aus.',
    },

    username: {
      required: 'Wählen Sie einen Benutzernamen.',
      'too-short': 'Benutzernamen haben mindestens {min} Zeichen.',
      'too-long': 'Benutzernamen haben höchstens {max} Zeichen.',
      invalid: 'Verwenden Sie Buchstaben, Zahlen, Bindestriche und Unterstriche, beginnend mit einem Buchstaben.',
    },

    password: {
      required: 'Wählen Sie ein Passwort.',
      'too-short': 'Passwörter haben mindestens {min} Zeichen.',
    },
  },

  'create-account-page': {
    heading: 'Konto erstellen',

    subtitle: 'Wir fragen nach einer E-Mail-Adresse und einem Benutzernamen, weil Dokumente unter Ihrem Benutzernamen gespeichert werden.',

    terms: {
      text: 'Bitte lesen Sie unsere {link}.',
      link: 'Nutzungsbedingungen',
    },

    email: {
      label: 'E-Mail-Adresse',
      taken: 'Es gibt bereits ein Konto mit dieser E-Mail-Adresse.',
    },

    username: {
      label: 'Benutzername',
      taken: '@{username} ist bereits vergeben.',
      reserved: '@{username} ist nicht verfügbar.',
      checking: 'Verfügbarkeit wird geprüft…',
      available: '@{username} ist verfügbar.',
    },

    handle: {
      example: '@{username}/example',
      placeholder: 'username',
    },

    after: 'Wir senden Ihnen einen Link per E-Mail, um Ihre Adresse zu bestätigen und ein Passwort zu erstellen.',

    submit: {
      label: 'Konto erstellen',
      pending: 'Konto wird erstellt…',
    },

    error: {
      unreachable: 'Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      rejected: 'Das Konto konnte nicht erstellt werden. Prüfen Sie Ihre Angaben und versuchen Sie es erneut.',
    },

    done: {
      heading: 'Prüfen Sie Ihre E-Mails',
      body: 'Wir haben einen Link an {email} gesendet. Öffnen Sie ihn, um Ihre Adresse zu bestätigen und ein Passwort zu wählen.',
      spam: 'Nichts erhalten? Warten Sie eine Minute und prüfen Sie dann Ihren Spam-Ordner.',
      restart: 'Andere Adresse verwenden',
    },

    link: {
      'forgot-password': 'Passwort vergessen',
      'sign-in': 'Anmelden',
    },
  },

  'forgot-password-page': {
    heading: 'Passwort vergessen',
    subtitle: 'Geben Sie Ihre E-Mail-Adresse ein, und wir senden Ihnen einen Link, um ein neues Passwort zu wählen.',

    email: {
      label: 'E-Mail-Adresse',
    },

    submit: {
      label: 'Link senden',
      pending: 'Wird gesendet…',
    },

    error: {
      unreachable: 'Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
    },

    done: {
      heading: 'Prüfen Sie Ihre E-Mails',
      body: 'Wenn ein Konto für {email} existiert, haben wir ihm einen Link gesendet. Öffnen Sie ihn, um ein neues Passwort zu wählen.',
      spam: 'Nichts erhalten? Warten Sie eine Minute und prüfen Sie dann Ihren Spam-Ordner.',
      restart: 'Andere Adresse verwenden',
    },

    link: {
      'sign-in': 'Anmelden',
      'create-account': 'Konto erstellen',
    },
  },

  'create-password-page': {
    heading: 'Ein Passwort erstellen',
  },

  'update-password-page': {
    heading: 'Neues Passwort wählen',
    subtitle: 'Geben Sie den Token aus dem Link ein, den wir Ihnen gesendet haben.',

    identifier: {
      label: 'Benutzername oder E-Mail-Adresse',
      required: 'Geben Sie Ihren Benutzernamen oder Ihre E-Mail-Adresse ein.',
    },

    token: {
      label: 'Token',
      required: 'Geben Sie den Token aus dem Link ein, den wir Ihnen gesendet haben.',
      invalid: 'Dieser Token ist ungültig. Prüfen Sie den Link, oder fordern Sie einen neuen an.',
      expired: 'Dieser Link ist abgelaufen. Fordern Sie einen neuen an.',
      used: 'Dieser Link wurde bereits verwendet. Fordern Sie einen neuen an.',
    },

    password: {
      label: 'Neues Passwort',
      show: {
        label: 'Passwort anzeigen',
      },
      hide: {
        label: 'Passwort ausblenden',
      },
      'caps-lock': 'Die Feststelltaste ist aktiviert.',

      common: 'Dieses Passwort ist zu leicht zu erraten. Wählen Sie ein anderes.',
    },

    strength: {
      title: 'Passwortstärke',

      weak: 'Schwach',
      fair: 'Mittel',
      good: 'Gut',
      strong: 'Stark',
    },

    submit: {
      label: 'Passwort aktualisieren',
      pending: 'Wird aktualisiert…',
    },

    error: {
      unreachable: 'Der Server ist nicht erreichbar. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
      rejected: 'Das Passwort konnte nicht aktualisiert werden. Prüfen Sie Ihre Angaben und versuchen Sie es erneut.',
    },

    done: {
      heading: 'Passwort aktualisiert',
      body: 'Ihr neues Passwort wurde gespeichert.',
      'continue': 'Weiter zur App',
    },

    link: {
      'sign-in': 'Anmelden',
      'forgot-password': 'Neuen Link senden',
    },
  },

  'new-document': {
    'discard-changes-message': 'Sie haben ungespeicherte Änderungen. Sind Sie sicher?',
    'discard-changes-confirm': 'Neues Dokument',
  },

  'status-pill': {
    messages: {
      'unsaved-changes': 'Ungespeicherte Änderungen',
    },
  },
} satisfies DeepPartial<I18N>;
