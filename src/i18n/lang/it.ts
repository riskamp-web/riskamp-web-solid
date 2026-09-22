
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
    title: 'Impostazioni lingua...',
  },

  'select-language-dialog': {
    'title': 'Impostazioni lingua',
    'select-language': 'Seleziona lingua',
    'system-setting': 'Impostazione di sistema',
    'decimal-separator': 'Separatore decimale',
    'decimal-separator-dot': 'Punto',
    'decimal-separator-comma': 'Virgola',
  },

  about: {
    tagline: 'Analisi del rischio Monte Carlo per il web.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Tutti i diritti riservati.',
    website: 'riskamp.com',
    'old-website-version': 'Cerchi la vecchia versione di RiskAMP web? Usa {link}',
    report: 'Segnala un problema',
    'report-subject': 'RiskAMP web — segnalazione di un problema',
    'report-body': '(descrivi qui il problema)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nBrowser: {ua}\nLingua: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'File',
      help: 'Aiuto',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Dati e analisi',
      tools: 'Strumenti',
      account: 'Account',
    },

    'menu-commands': {
      documents: 'Documenti',
      'account-page': 'Pagina account',
      'sign-out': 'Esci',
    },

    tabs: {
      home: 'Home',
      layout: 'Layout',
      format: 'Formato',
      insert: 'Inserisci',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Dati e analisi',
    },

    menu: {
      'about-riskamp': 'Informazioni su RiskAMP web',
      'function-documentation': 'Documentazione delle funzioni di RiskAMP',
      walkthrough: 'Modello dimostrativo',
      contact: 'Contattaci',
    },

    button: {
      'toggle-fullscreen': 'Attiva/disattiva schermo intero',

      'new-spreadsheet': 'Nuovo foglio di calcolo',
      'import-file': 'Importa file',
      'open-file': 'Apri file',
      'save-file': 'Salva file',
      'save-file-as': 'Salva con nome...',
      'revert-file': 'Ripristina file',
      'save-to-desktop': 'Salva sul desktop',
      'export-xlsx': 'Esporta XLSX',
      'export-csv': 'Esporta CSV',

      'sign-in': 'Accedi',
      'create-account': 'Crea account',

      'search-cells': {
        label: 'Cerca celle',
      },
      'defined-names': {
        label: 'Nomi definiti',
      },
      'fit-data': {
        label: 'Adatta dati',
      },
      notes: {
        label: 'Note',
      },

      'monte-carlo-simulation': {
        label: 'Simulazione Monte Carlo',
      },
      'run-simulation': {
        label: 'Esegui simulazione',
      },
      'run-simulation-again': {
        label: 'Esegui di nuovo la simulazione',
      },
      'las-vegas-simulation': {
        label: 'Simulazione Las Vegas',
      },
      'simulation-settings': {
        label: 'Impostazioni della simulazione',
      },
      'quick-view': {
        label: 'Vista rapida',
      },
      'quick-view-correlation': {
        label: 'Correlazione vista rapida',
      },
      recalculate: {
        label: 'Ricalcola',
      },

      'align-left': {
        label: 'Allinea a sinistra',
      },
      'align-center': {
        label: 'Allinea al centro',
      },
      'align-right': {
        label: 'Allinea a destra',
      },

      'align-top': {
        label: 'Allinea in alto',
      },
      'align-middle': {
        label: 'Allinea al centro verticale',
      },
      'align-bottom': {
        label: 'Allinea in basso',
      },

      'increase-indent': {
        label: 'Aumenta rientro',
      },
      'decrease-indent': {
        label: 'Riduci rientro',
      },
      'wrap-text': {
        label: 'Testo a capo',
      },

      'toggle-integer-grouping': {
        label: 'Attiva/disattiva raggruppamento',
      },
      'increase-decimal-precision': {
        label: 'Aumenta precisione',
      },
      'decrease-decimal-precision': {
        label: 'Riduci precisione',
      },

      'merge-cells': {
        label: 'Unisci celle',
      },
      'unmerge-cells': {
        label: 'Dividi celle',
      },

      'lock-cells': {
        label: 'Blocca celle per la modifica',
      },
      'unlock-cells': {
        label: 'Sblocca celle per la modifica',
      },

      bold: {
        label: 'Attiva/disattiva grassetto',
      },
      italic: {
        label: 'Attiva/disattiva corsivo',
      },
      underline: {
        label: 'Attiva/disattiva sottolineato',
      },
      strikethrough: {
        label: 'Attiva/disattiva barrato',
      },

      'insert-row': {
        label: 'Inserisci riga',
      },
      'insert-column': {
        label: 'Inserisci colonna',
      },
      'delete-row': {
        label: 'Elimina riga',
      },
      'delete-column': {
        label: 'Elimina colonna',
      },

      'text-color': {
        label: 'Colore testo',
      },
      'background-color': {
        label: 'Colore di sfondo',
      },
      'border-color': {
        label: 'Colore bordo',
      },

      'border-top': {
        title: 'Bordo superiore',
      },
      'border-bottom': {
        title: 'Bordo inferiore',
      },
      'border-double-bottom': {
        title: 'Bordo inferiore doppio',
      },
      'border-left': {
        title: 'Bordo sinistro',
      },
      'border-right': {
        title: 'Bordo destro',
      },
      'border-all': {
        title: 'Tutti i bordi',
      },
      'border-none': {
        title: 'Rimuovi bordi',
      },
      'border-outside': {
        title: 'Bordi esterni',
      },

      'correlation-matrix': {
        title: 'Matrice di correlazione',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline a colonne',
      'sparkline-line': 'Sparkline a linee',

      insert: {
        'bar-chart': 'Grafico a barre',
        'donut-chart': 'Grafico ad anello',
        'column-chart': 'Grafico a colonne',
        'line-chart': 'Grafico a linee',
        'scatter-plot': 'Grafico a dispersione',
        'area-chart': 'Grafico ad area',
        image: 'Immagine',

        comment: 'Commento',
        table: 'Tabella',
      },

      forecast: 'Previsione di tendenza',
    },

    'open-menu': 'Apri menu',

    'more-commands-button': {
      label: 'Altri comandi...',
    },

    combobox: {
      'font-size': {
        label: 'Dimensione carattere',
      },
      'number-format': {
        label: 'Formato numero',
      },
    },

    label: {
      'spreadsheet-cells': 'Celle del foglio di calcolo',
    },

    message: {
      'changes-stored-in-browser': 'Le modifiche vengono conservate nell’archiviazione del browser finché non le salvi o le ripristini.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'Documentazione di RiskAMP',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Indietro',
        forward: 'Avanti',
      },
    },
    label: {
      'close-sidebar': 'Chiudi barra laterale',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Calcolo parallelo',
        'max-workers': 'Numero di worker (massimo)',
        'explanatory-text': `Usare più worker in parallelo migliora le prestazioni della simulazione nei modelli complessi. Nella maggior parte dei casi consigliamo 4 o 8 worker.`,
      },

      'random-sampling': {
        'section-header': 'Campionamento casuale',
        'explanatory-text': 'Il metodo di campionamento verrà salvato con questo foglio di calcolo.\nIl valore selezionato qui verrà usato anche come predefinito per i nuovi fogli di calcolo.',
      },

      'random-seed': {
        'section-header': 'Seme casuale',
        'explanatory-text': 'Il seme casuale verrà salvato con questo foglio di calcolo.\nInserisci un numero per usare un seme fisso, oppure inserisci 0 per usare un seme casuale in ogni simulazione.',

        'enter-seed-value': 'Inserisci il seme',
        'seed-value': 'Valore del seme',
        'reset-seed-value': 'Reimposta seme',
        'time-based-seed': 'Usa un seme basato sul tempo',
      },

      title: 'Impostazioni della simulazione',
      'latin-hypercube-sampling': 'Campionamento con ipercubo latino (LHS)',
      'standard-random-sampling': 'Campionamento casuale standard',

      'fixed-random-seed': 'Seme fisso',
      'seed-value-placeholder-text': 'Valore del seme',
    },

    'notes-panel': {
      title: 'Note',
      'open-notes-with-spreadsheet': 'Apri le note con il foglio di calcolo',
      edit_markdown: 'Modifica markdown',
      view_formatted: 'Visualizza formattato',
    },
    'fit-data-panel': {
      title: 'Adatta dati',
    },
  },

  'color-picker': {
    choose_color: 'Scegli colore',
    use_selected_color: 'Usa il colore selezionato',
    theme_colors: 'Colori del tema',
    other_colors: 'Altri colori',
    no_color: 'Nessun colore',
    new_color: 'Nuovo colore',
    default_text_color: 'Colore testo predefinito',
    default_border_color: 'Colore bordo predefinito',
    no_fill: 'Nessun riempimento',

    theme: {
      background: 'Sfondo',
      text: 'Testo',
      accent: 'Accento',
      lighter: 'Più chiaro',
      darker: 'Più scuro',
    },
  },

  'names-panel': {
    title: 'Nomi definiti',
    header: {
      name: 'Nome',
      'name-scope': 'Ambito',
      value: 'Valore',
    },
    'name-scope': {
      sheet: 'Foglio',
      workbook: 'Cartella',
    },
    label: {
      'delete-name': 'Elimina nome',
      'define-name': 'Definisci nome',
      'edit-name': 'Modifica nome',
    },
    'name-type': {
      reference: 'Riferimento',
      expression: 'Espressione',
    },
  },

  'search-panel': {
    title: 'Cerca celle',
    'search-text': {
      placeholder: 'Cerca testo',
    },
    'search-in': {
      text: 'Cerca in',
    },
    'search-type': {
      'cell-values': 'Valori',
      'cell-formulas': 'Formule',
      wildcards: 'Caratteri jolly',
    },
    'search-scope': {
      'current-sheet': 'Foglio corrente',
      'all-sheets': 'Tutti i fogli',
    },
    'search-results': {
      header: {
        address: 'Indirizzo',
        value: 'Valore',
        formula: 'Formula',
      },
      information: {
        'enter-text': 'Inserisci il testo da cercare',
        result: 'risultato',
        results: 'risultati',
      },
    },
  },
  'forecast-dialog': {
    title: 'Previsione di tendenza',
    parameters: {
      dates: {
        title: 'Date',
      },
      values: {
        title: 'Valori',
      },
      periods: 'Periodi di previsione',
      seasonality: 'Stagionalità',

      'fill-empty': 'Riempi',
      'aggregate-multiple': 'Aggrega',
      'project-forward-periods': 'Periodi',
      'chart-type': {
        label: 'Tipo di grafico',
      },
      'chart-type-line-chart': 'Linee',
      'chart-type-column-chart': 'Colonne',
    },
    options: {
      'model-type': 'Modello',
      'forecast-type': 'Tipo di previsione',
    },
    'model-type': {
      'excel-compatible-forecast': 'Compatibile con Excel',
      'static-forecast': 'Statica',
      'stochastic-forecast': 'Stocastica',
    },
    settings: 'Impostazioni',
    'create-forecast-sheet': 'Crea foglio di previsione',
    seasonality: {
      'auto-detect': 'Rileva automaticamente',
    },
    'fill-options': {
      interpolate: 'Interpola',
      zeros: 'Zeri',
    },
    'aggregate-options': {
      average: 'Media',
      median: 'Mediana',
      min: 'Min',
      max: 'Max',
      sum: 'Somma',
      count: 'Conteggio',
    },

    'chart-labels': {
      values: 'Valori',
      forecast: 'Previsione',
    },
  },

  'forecast-sheet-timeline-header': 'Sequenza temporale',
  'forecast-sheet-values-header': 'Valori',
  'forecast-sheet-forecast-header': 'Previsione',
  'forecast-sheet-sample-header': 'Campione',
  'forecast-sheet-statistics-header': 'Statistiche',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Media',
    },
    'p80-range': {
      header: 'Intervallo P80',
    },
  },

  'sparkline-dialog': {
    title: 'Inserisci sparkline',
    parameters: {
      target: {
        title: 'Cella di destinazione',
        'overwrite-warning': 'I dati nell’intervallo di destinazione verranno sovrascritti',
        'merge-warning': 'Le celle selezionate verranno unite per lo sparkline',
      },
      source: {
        title: 'Intervallo di dati di origine',
      },
    },
    info: 'Usa i colori di primo piano e di sfondo della cella per definire lo stile dello sparkline',

    'sparkline-type': 'Tipo di sparkline',
    'sparkline-type-line-chart': 'Linee',
    'sparkline-type-column-chart': 'Colonne',
  },

  'quick-view-dialog': {
    title: 'Vista rapida',
    'select-cell': 'Seleziona cella',
    'tab-histogram': 'Istogramma',
    'tab-box-plot': 'Box plot',
    'show-statistics': 'Statistiche',
    'histogram-bin-algorithm-long': 'Algoritmo degli intervalli',
    'histogram-bin-algorithm-short': 'Intervalli',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Tipo di baffi',
    'box-plot-whisker-type-short': 'Baffi',
    'box-plot-whisker-type-minmax': 'Min/max',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Non ci sono dati di simulazione per la cella selezionata. Esegui una simulazione con il pulsante qui sotto per raccogliere i dati di questa cella.\n\nI dati di simulazione verranno raccolti automaticamente quando una cella è referenziata da una funzione statistica (come SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1° quartile',
      third_quartile: '3° quartile',
      median: 'Mediana',
      'interquartile-range': 'IQR',
      mean: 'Media',
      variance: 'Varianza',
      'standard-deviation': 'DevSt',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Blocca la selezione della vista rapida',
        'click-to-unlock': 'Sblocca la selezione della vista rapida',
        'return-to-selection': 'Torna alla cella selezionata',
        'selection-locked': 'Selezione bloccata',
      },
    },
  },

  'dialog-close-label': 'Chiudi',
  'dialog-close-title': 'Chiudi finestra di dialogo',
  'dialog-help-title': 'Aiuto',

  'standard-buttons': {
    close: {
      label: 'Chiudi',
      title: 'Chiudi finestra di dialogo',
    },
    apply: {
      title: 'Applica',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Indietro',
    },
    yes: {
      title: 'Sì',
    },
    no: {
      title: 'No',
    },
    accept: {
      title: 'Accetta',
    },
    cancel: {
      title: 'Annulla',
    },
  },

  'confirm-dialog': {
    title: 'Sei sicuro?',
    'alert-title': 'Avviso',
    confirm: 'Conferma',
    cancel: 'Annulla',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Simulazione Monte Carlo',
  'run-simulation': {
    'number-of-trials': 'Numero di prove',
    'screen-updates': 'Mostra aggiornamenti a schermo',
    starting: 'Avvio in corso...',
    'percent-complete': 'completato',
  },
  'run-simulation-start-label': 'Avvia',
  'run-simulation-start-title': 'Avvia simulazione',
  'run-simulation-cancel-label': 'Interrompi',
  'run-simulation-cancel-title': 'Interrompi simulazione',

  'load-error': {
    'loading-document-failed': 'Impossibile caricare il file richiesto',
  },

  'save-as-dialog': {
    'default-title': 'Salva con nome',
    'rename-title': 'Rinomina documento',
    'duplicate-title': 'Duplica documento',
    folder: 'Cartella',
    name: 'Nome',
    access: 'Accesso',
    public: 'Pubblico',
    private: 'Privato',
    save: 'Salva',
    overwrite: 'Sovrascrivi',
    'folder-placeholder': 'Facoltativo — es. finanza/report',
    'name-placeholder': 'Nome del documento',
    'preview-label': 'Verrà salvato come',
    'copy-link': 'Copia link',
    'copy-link-copied': 'Link copiato',
    collision: 'Esiste già un documento in questo percorso.',
    'collision-blocked': 'Esiste già un documento in questo percorso. Scegli un nome diverso.',
    empty: 'Inserisci un nome',
    saved: 'Salvato “{name}”',
    'save-failed': 'Impossibile salvare “{name}”.',
    retry: 'Riprova',
    'overwrite-confirm-title': 'Sovrascrivere il documento?',
    'overwrite-confirm-message': 'Esiste già un documento in “{name}”. La sovrascrittura ne sostituisce il contenuto. Sei sicuro?',

    'path-exists-title': 'Documento esistente',
    'path-exists-message': 'Esiste già un documento con questo percorso. Elimina prima quel documento se vuoi riutilizzare il percorso.',

  },

  toast: {
    'region-label': 'Notifiche',
    dismiss: 'Ignora',
  },

  'las-vegas-simulation-panel': {
    title: 'Simulazione Las Vegas',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Accetta',
        description: 'Accetta è una cella che restituisce TRUE o FALSE per accettare o rifiutare una prova. Obbligatorio.',
      },
      complete: {
        title: 'Completa',
        description: 'Completa è una cella che restituisce TRUE per terminare la simulazione, oppure un numero di prove accettate. Obbligatorio.',
      },
      fail: {
        title: 'Fallisci',
        description: 'Fallisci è una cella che restituisce TRUE per uscire dalla simulazione, oppure un numero massimo totale di prove. Facoltativo.',
      },
    },
    'more-information-link': {
      title: 'Ulteriori informazioni',
    },
    'running-simulation': 'Simulazione in corso...',
    'options-overview': 'Inserisci le opzioni per una simulazione Las Vegas.',
  },

  'insert-function': {
    button: {
      title: 'Inserisci funzione...',
    },
    'insert-function': 'Inserisci funzione',
    'search-for-function': 'Cerca una funzione...',
    'function-result': 'Risultato',
  },

  'function-dialog': {
    'select-function': {
      title: 'Seleziona funzione',
    },
  },

  'arguments-dialog': {
    'function-result': 'Risultato',
    volatile: 'volatile',
    'function-help-title': 'Guida su questa funzione',
  },

  'number-format': {
    general: 'Generale',
    number: 'Numero',
    integer: 'Numero intero',
    percent: 'Percentuale',
    fraction: 'Frazione',
    accounting: 'Contabilità',
    currency: 'Valuta',
    scientific: 'Scientifico',

    timestamp: 'Data e ora',
    'long-date': 'Data estesa',
    'short-date': 'Data breve',
  },

  'llm-chat': {
    panel: {
      title: 'Assistente IA',
    },
    'settings-tab': {
      title: 'Impostazioni',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Cambiare modello?',
      message: 'Questo modello usa un provider diverso, quindi la conversazione attuale verrà cancellata. Continuare?',
      confirm: 'Cambia modello',
    },
    buttons: {
      'send-message': 'Invia',

      'clear-conversation': 'Cancella conversazione',
      save: 'Salva sul desktop',
      resend: 'Invia di nuovo l’ultimo messaggio',
      restart: 'Ricomincia dal primo messaggio',
    },

    label: {
      'api-key': 'Chiave API',
      'api-key-placeholder': 'Incolla la tua chiave API',
      'reveal-api-key': 'Mostra la chiave API',
      'hide-api-key': 'Nascondi la chiave API',
      model: 'Modello',
      'choose-a-model': 'Scegli un modello',
      'select-a-model': 'Seleziona un modello',
      header: {
        important: 'Importante',
      },
      disclaimer: 'L’interfaccia IA funziona in modalità «porta la tua chiave». Per usarla, devi fornire una chiave API di un provider/modello supportato.\nNon vediamo mai la tua chiave API. Rimane nel tuo browser e viene inviata al provider ufficiale solo quando invii un messaggio in chat.\nIl tuo provider del modello ti addebiterà i token o secondo il tuo piano di abbonamento.',

      provider_link: 'Pagina web del provider',
      model_information_link: 'Informazioni sul modello',
      screenshots_disabled: 'Nota: questo modello non supporta gli screenshot.',

    },

    // transient status shown while the assistant is working; these steps are
    // never persisted as message blocks (see chat-messages.tsx activity()).
    activity: {
      thinking: 'Riflessione…',
      working: 'Elaborazione…',
      running: 'Esecuzione di {tool}…',
    },

    error: {
      unknown: 'errore sconosciuto',
      'unknown-type': 'tipo sconosciuto',
    },

    aborted: 'Generazione interrotta.',
  },

  'developer-panel': {
    title: 'Informazioni per gli sviluppatori',
  },

  'fit-data-panel': {
    'select-range': 'Seleziona intervallo',
    'candidate-distributions': {
      label: 'Distribuzioni candidate',
      description: 'Le candidate sono ordinate in base alla maggiore vicinanza alla distribuzione teorica',
    },
    'log-normal-graph': {
      description: 'Il grafico log-normale è tracciato in scala logaritmica',
    },
    statistics: {
      error: 'Errore',
      mean_square_error: 'Errore quadratico medio',
      aggregate_error: 'Errore aggregato',
      max_error: 'Errore massimo',
      mean_error: 'Errore medio',
    },

    label: {
      'click-to-lock': 'Blocca la selezione di adattamento dei dati',
      'click-to-unlock': 'Sblocca la selezione di adattamento dei dati',
    },

    'distribution-parameters': 'Parametri della distribuzione',
    'spreadsheet-function': 'Funzione del foglio di calcolo',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Copia negli appunti',
      error: 'Errore di copia',
      copied: 'Copiato',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Nessun comando corrispondente',
    'start-typing': 'Inizia a digitare per trovare un comando',
    'run-highlighted-command': 'Premi Invio per eseguire il comando evidenziato',
    'command-palette': {
      label: 'Palette dei comandi',
    },
  },

  'documents-page': {
    title: 'Documenti',

    scope: {
      all: 'Tutti i documenti',
      starred: 'Preferiti',
      recent: 'Recenti',
      private: 'Privati',
    },

    rail: {
      label: 'Filtri dei documenti',
      folders: 'Cartelle',
      'no-folders': 'Nessuna cartella',
    },

    search: {
      placeholder: 'Cerca documenti',
      label: 'Cerca documenti',
      clear: {
        label: 'Cancella ricerca',
      },
    },
    filter: {
      label: 'Filtra',
    },

    action: {
      'new-document': 'Nuovo documento',
      open: 'Apri',
      duplicate: 'Duplica',
      rename: 'Rinomina…',
      'delete': 'Elimina',
      cancel: 'Annulla',
      'make-public': 'Rendi pubblico',
      'make-private': 'Rendi privato',
      'version-history': 'Cronologia versioni',
    },

    access: {
      public: 'Pubblico',
      private: 'Privato',
    },

    selection: {
      count: {
        one: '{count} selezionato',
        other: '{count} selezionati',
      },
      'make-public': {
        label: 'Rendi pubblici i documenti selezionati',
      },
      'make-private': {
        label: 'Rendi privati i documenti selezionati',
      },
      'delete': {
        label: 'Elimina i documenti selezionati',
      },
    },

    table: {
      label: 'Documenti',
      'select-all': {
        label: 'Seleziona tutti i documenti',
      },
    },
    column: {
      starred: 'Preferito',
      name: 'Nome',
      folder: 'Cartella',
      access: 'Accesso',
      version: 'Versione',
      modified: 'Modificato',
      actions: 'Azioni',
    },

    row: {
      select: {
        label: 'Seleziona {name}',
      },
      star: {
        label: 'Aggiungi {name} ai preferiti',
      },
      unstar: {
        label: 'Rimuovi {name} dai preferiti',
      },
      menu: {
        label: 'Azioni per {name}',
      },
      unnamed: {
        title: 'Questo documento non ha ancora un nome',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Eliminare il documento, sei sicuro?',
      confirm_delete_documents: 'Eliminare i documenti, sei sicuro?',
    },

    error: {
      title: 'Impossibile caricare i tuoi documenti',
      detail: 'Il caricamento non è riuscito a causa di un errore. Riprova più tardi.',
      retry: 'Riprova',
    },

    messages: {
      rename_failed: 'Rinomina non riuscita. Riprova più tardi.',
      rename_succeeded: 'Documento rinominato',

      delete_failed: 'Eliminazione non riuscita. Riprova più tardi.',
      one_document_deleted: 'Documento eliminato',
      multiple_documents_deleted: 'Documenti eliminati',

      update_failed: 'Aggiornamento non riuscito. Riprova più tardi.',

      duplicate_succeeded: 'Documento creato',
      duplicate_failed: 'Duplicazione non riuscita. Riprova più tardi.',

      restore_succeeded: 'Documento ripristinato',
      restore_failed: 'Ripristino non riuscito. Riprova più tardi.',

    },

    empty: {
      title: 'Ancora nessun documento',
      detail: 'I fogli di calcolo che crei o importi appariranno qui, insieme alla loro cronologia delle versioni.',
    },

    'no-match': {
      title: 'Nessun documento corrisponde a “{query}”',
      detail: 'La ricerca copre tutte le cartelle. Prova con un termine più breve.',
      action: 'Cancella ricerca',
    },

    'empty-filter': {
      title: 'Qui non c’è niente',
      detail: 'Nessun documento corrisponde a questo filtro.',
      'detail-folder': 'Nessun documento in {folder}.',
      action: 'Mostra tutti i documenti',
    },

    footer: {
      count: {
        one: '{count} documento',
        other: '{count} documenti',
      },
      filtered: '{count} di {total} documenti',
      'searching-all': 'ricerca in tutte le cartelle',
    },

    panel: {
      label: 'Dettagli del documento',
      open: {
        title: 'Apri documento',
      },
      close: {
        label: 'Chiudi dettagli',
      },
      'copy-link': {
        label: 'Copia link',
        copied: {
          label: 'Link copiato',
          title: 'Copiato',
        },
      },
      'unnamed-hint': 'Ancora senza nome — questo è l’indirizzo. Rinominandolo ne assegni uno.',
      star: {
        label: 'Aggiungi questo documento ai preferiti',
      },
      unstar: {
        label: 'Rimuovi questo documento dai preferiti',
      },
      field: {
        access: 'Accesso',
        starred: 'Preferito',
        created: 'Creato',
        modified: 'Modificato',
        version: 'Versione',
      },
    },

    history: {
      title: 'Versioni precedenti',
      loading: 'Caricamento della cronologia delle versioni',
      error: 'Impossibile caricare la cronologia delle versioni.',
      retry: 'Riprova',
      menu: {
        label: 'Azioni per la versione {version}',
      },
      open: {
        text: 'Apri questa versione',
        label: 'Apri la versione {version}',
      },
      duplicate: 'Duplica come nuovo documento',
      restore: 'Ripristina',
      none: 'Ancora nessuna versione precedente. Appariranno qui man mano che salvi.',
      kept: {
        one: 'Viene conservata una versione precedente.',
        other: 'Vengono conservate le ultime {count} versioni precedenti.',
      },
    },

    time: {
      'just-now': 'proprio ora',
      minutes: {
        one: '{count} minuto fa',
        other: '{count} minuti fa',
      },
      hours: {
        one: '{count} ora fa',
        other: '{count} ore fa',
      },
      days: {
        one: '{count} giorno fa',
        other: '{count} giorni fa',
      },
      today: 'oggi, {time}',
      yesterday: 'ieri, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Documento',
    },
    'updated-date': {
      label: 'Aggiornato',
    },
    'created-date': {
      label: 'Creato',
    },
    access: {
      label: 'Accesso',
      'type-private': 'Privato',
      'type-public': 'Pubblico',
    },
    'filter-documents': {
      label: 'Filtra documenti',
    },

    controls: {
      'delete-selected': 'Elimina selezionati',
      'make-public': 'Rendi pubblico',
      'make-private': 'Rendi privato',
    },
  },

  'account-page': {
    title: 'Account',
  },

  'sign-in': {
    page: {
      title: 'Accedi',
    },
    form: {
      username: {
        placeholder: 'Nome utente o email',
      },
      password: {
        placeholder: 'Password',
      },
      'sign-in-button': {
        label: 'Accedi',
      },
      'remember-me': 'Ricordami su questo dispositivo',
      instructions: 'Inserisci il tuo nome utente e la tua password per accedere',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Password dimenticata',
      },
      'create-account': {
        text: 'Crea account',
      },
      'sign-in': {
        text: 'Accedi',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Password dimenticata',
    },
    form: {
      instructions: 'Inserisci il tuo indirizzo email per reimpostare la password',
      email: {
        placeholder: 'Indirizzo email',
      },
      'reset-password-button': {
        label: 'Reimposta password',
      },
    },
  },

  contact: {
    page: {
      title: 'Contattaci',
    },
  },

  'privacy-policy': {
    page: {
      title: 'Informativa sulla privacy',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Condizioni d’uso',
    },
  },

  'create-account': {
    page: {
      title: 'Crea account',
    },
  },
  'create-password': {
    page: {
      title: 'Crea password',
    },
  },
  'update-password': {
    page: {
      title: 'Aggiorna password',
    },
  },

  'theme-toggle': {
    'light-theme': 'Tema chiaro',
    'dark-theme': 'Tema scuro',
    'system-theme': 'Tema di sistema',
  },

  // adding command palette commands labels/alt text
  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Usa il tema scuro',
        alt: 'combinazione di colori',
      },

      'light-theme': {
        label: 'Usa il tema chiaro',
        alt: 'combinazione di colori',
      },

      'system-theme': {
        label: 'Usa il tema di sistema',
        alt: 'combinazione di colori chiaro scuro',
      },
    },

    'remove-hyperlink': {
      label: 'Rimuovi collegamento ipertestuale',
      alt: 'elimina cancella link',
    },

    'insert-hyperlink': {
      label: 'Inserisci collegamento ipertestuale',
      alt: 'aggiungi imposta link',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Inserisci l’indirizzo del link (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Aggiungi o modifica il commento della cella',
      alt: 'nota commento',

      parameter: {
        comment: {
          label: 'Inserisci un commento. Premi Ctrl + Invio per salvare.',
          'label-mac': 'Inserisci un commento. Premi Cmd + Invio per salvare.',
        },
      },
    },

    'remove-comment': {
      label: 'Rimuovi il commento della cella',
      alt: 'nota',
    },

    'reset-background-color': {
      label: 'Reimposta il colore di sfondo nella selezione',
      alt: 'cancella riempimento',
    },

    'set-background-color': {
      label: 'Imposta il colore di sfondo della selezione',
      alt: 'riempimento',
    },

    'reset-text-color': {
      label: 'Reimposta il colore del testo nella selezione',
      alt: 'cancella primo piano',
    },

    'set-text-color': {
      label: 'Imposta il colore del testo della selezione',
      alt: 'primo piano',
    },

    'reset-border-color': {
      label: 'Reimposta il colore del bordo nella selezione',
      alt: 'cancella',
    },

    'set-border-color': {
      label: 'Imposta il colore del bordo della selezione',
    },

    'borders-clear': {
      label: 'Bordi: rimuovi i bordi',
    },
    'border-top': {
      label: 'Bordi: imposta il bordo superiore nella selezione',
    },
    'border-bottom': {
      label: 'Bordi: imposta il bordo inferiore nella selezione',
    },
    'border-double-bottom': {
      label: 'Bordi: imposta il bordo inferiore doppio nella selezione',
    },
    'border-left': {
      label: 'Bordi: imposta il bordo sinistro nella selezione',
    },
    'border-right': {
      label: 'Bordi: imposta il bordo destro nella selezione',
    },

    'border-outside': {
      label: 'Bordi: imposta il bordo esterno nella selezione',
      alt: 'esterno',
    },

    'border-all': {
      label: 'Bordi: imposta tutti i bordi nella selezione',
    },

    'reset-font-scale': {
      label: 'Reimposta la scala del carattere',
      alt: 'dimensione carattere testo',
    },

    'font-scale-increase': {
      label: 'Scala del carattere: aumenta del 10%',
      alt: 'dimensione carattere testo',
    },

    'font-scale-decrease': {
      label: 'Scala del carattere: riduci del 10%',
      alt: 'dimensione carattere testo',
    },

    'insert-donut-chart': {
      label: 'Inserisci grafico ad anello',
      alt: 'grafico diagramma',
    },

    'insert-column-chart': {
      label: 'Inserisci grafico a colonne',
      alt: 'grafico diagramma',
    },

    'insert-bar-chart': {
      label: 'Inserisci grafico a barre',
      alt: 'grafico diagramma',
    },

    'insert-line-chart': {
      label: 'Inserisci grafico a linee',
      alt: 'grafico diagramma',
    },

    'insert-scatter-plot': {
      label: 'Inserisci grafico a dispersione',
      alt: 'grafico diagramma',
    },

    'insert-box-plot': {
      label: 'Inserisci box plot',
      alt: 'grafico diagramma baffi',
    },

    'insert-image': {
      label: 'Inserisci immagine',
    },

    'cf-gradient-red-green': {
      label: 'Formattazione condizionale sfumatura: rosso-verde',
    },
    'cf-gradient-green-red': {
      label: 'Formattazione condizionale sfumatura: verde-rosso',
    },
    'cf-unique-values': {
      label: 'Formattazione condizionale: valori univoci',

      parameter: {
        color: {
          label: 'Seleziona il colore per i valori univoci',
        },
      },
    },

    'cf-data-bars': {
      label: 'Formattazione condizionale: barre dei dati',
      alt: 'barra dei dati',

      parameter: {
        color: {
          label: 'Seleziona il colore per le barre dei dati',
        },
        'hide-values': {
          label: 'Nascondere i valori?',
          choice: {
            'true': 'Sì, nascondi i valori',
            'false': 'No, mostra i valori',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Formattazione condizionale: valori duplicati',

      parameter: {
        color: {
          label: 'Seleziona il colore per i valori duplicati',
        },
      },
    },

    'cf-clear': {
      label: 'Cancella la formattazione condizionale dalla selezione',
      alt: 'rimuovi',
    },

    'fit-column-widths': {
      label: 'Adatta la larghezza delle colonne selezionate (dimensionamento automatico)',
    },

    'fit-data': {
      label: 'Adatta dati',
      alt: 'adatta',
    },

    'named-ranges': {
      label: 'Intervalli ed espressioni con nome',
      alt: 'gestione nomi definisci nome elimina nome cancella',
    },

    'set-tab-color': {
      label: 'Imposta il colore della scheda',
    },

    'reset-tab-color': {
      label: 'Reimposta il colore della scheda',
      alt: 'cancella rimuovi',
    },

    'fit-row-heights': {
      label: 'Adatta l’altezza delle righe selezionate (dimensionamento automatico)',
    },

    'correlation-matrix': {
      label: 'Controlla la matrice di correlazione',
    },

    'hide-sheet': {
      label: 'Nascondi foglio',
      alt: 'visibile',
    },

    'unhide-all-sheets': {
      label: 'Mostra tutti i fogli',
      alt: 'visibile',
    },

    'unhide-columns': {
      label: 'Mostra le colonne nascoste del foglio',
    },
    'unhide-rows': {
      label: 'Mostra le righe nascoste del foglio',
    },
    'hide-rows': {
      label: 'Nascondi le righe selezionate',
    },
    'hide-columns': {
      label: 'Nascondi le colonne selezionate',
    },

    'las-vegas-simulation': {
      label: 'Simulazione Las Vegas...',
    },
    'simulation-settings': {
      label: 'Impostazioni della simulazione...',
    },
    'language-settings': {
      label: 'Impostazioni lingua...',
    },

    'load-desktop-file': {
      label: 'Carica file dal desktop...',
      alt: 'excel csv importa',
    },

    'save-xlsx': {
      label: 'Salva come XLSX',
      alt: 'scarica excel',
    },

    'save-csv': {
      label: 'Salva il foglio corrente come CSV',
      alt: 'scarica esporta',
    },

    'save-to-cloud': {
      label: 'Salva nel cloud',
    },

    'load-document': {
      label: 'Carica documento...',
      alt: 'apri',
    },

    'download-json': {
      label: 'Scarica sul desktop (JSON)',
      alt: 'salva',
    },

    'insert-function': {
      label: 'Inserisci funzione...',
    },
    find: {
      label: 'Trova nei valori/nelle formule...',
    },
    'insert-distribution': {
      label: 'Inserisci distribuzione casuale...',
    },
    'run-simulation': {
      label: 'Esegui simulazione...',
    },
    'quick-view': {
      label: 'Vista rapida...',
    },
    'new-model': {
      label: 'Nuovo modello',
    },
    'revert-file': {
      label: 'Ripristina file',
    },
    recalculate: {
      label: 'Ricalcola',
    },
    undo: {
      label: 'Annulla',
    },
    'delete-columns': {
      label: 'Elimina le colonne selezionate',
    },
    'delete-rows': {
      label: 'Elimina le righe selezionate',
    },
    'insert-column': {
      label: 'Inserisci colonna',
    },
    'insert-row': {
      label: 'Inserisci riga',
    },
    'set-view-scale': {
      label: 'Imposta la scala di visualizzazione (zoom)',

      parameter: {
        scale: {
          label: 'Inserisci la scala di visualizzazione',
        },
      },
    },
    'reset-view-scale': {
      label: 'Reimposta la scala di visualizzazione (zoom)',
    },

    'rename-tab': {
      label: 'Rinomina scheda',
      alt: 'foglio pagina',

      parameter: {
        name: {
          label: 'Inserisci un nome per questa scheda',
        },
      },
    },

    'add-tab': {
      label: 'Aggiungi scheda',
      alt: 'foglio pagina',

      parameter: {
        name: {
          label: 'Inserisci un nome per la nuova scheda',
        },
      },
    },

    'delete-tab': {
      label: 'Elimina scheda',
      alt: 'foglio pagina',
    },

    'increase-indent': {
      label: 'Aumenta rientro',
      alt: 'più',
    },

    'decrease-indent': {
      label: 'Riduci rientro',
      alt: 'meno',
    },

    'number-format-increase-precision': {
      label: 'Formato numero: aumenta precisione',
      alt: 'più decimali',
    },

    'number-format-decrease-precision': {
      label: 'Formato numero: riduci precisione',
      alt: 'meno decimali',
    },

    'number-format': {
      label: 'Formato numero',
      alt: 'formato numero personalizzato',

      parameter: {
        format: {
          label: 'Inserisci un formato numero o un nome simbolico',
        },
      },
    },

    'merge-cells': {
      label: 'Unisci le celle selezionate',
    },
    'unmerge-cells': {
      label: 'Dividi le celle selezionate',
    },
    'lock-cells': {
      label: 'Blocca le celle selezionate',
    },
    'unlock-cells': {
      label: 'Sblocca le celle selezionate',
    },

    'valign-top': {
      label: 'Formatta selezione: allinea verticalmente in alto',
    },
    'valign-bottom': {
      label: 'Formatta selezione: allinea verticalmente in basso',
    },
    'valign-middle': {
      label: 'Formatta selezione: allinea verticalmente al centro',
    },

    'align-left': {
      label: 'Formatta selezione: allinea il testo a sinistra',
      alt: 'allineamento orizzontale',
    },

    'align-right': {
      label: 'Formatta selezione: allinea il testo a destra',
      alt: 'allineamento orizzontale',
    },

    'align-center': {
      label: 'Formatta selezione: centra il testo',
      alt: 'allineamento orizzontale giustifica',
    },

    'toggle-word-wrap': {
      label: 'Formatta selezione: attiva/disattiva il testo a capo',
    },

    'toggle-gridlines': {
      label: 'Attiva/disattiva la griglia nel foglio attivo',
    },
    'show-gridlines': {
      label: 'Mostra la griglia nel foglio attivo',
    },
    'hide-gridlines': {
      label: 'Nascondi la griglia nel foglio attivo',
    },

    'toggle-bold': {
      label: 'Formatta selezione: attiva/disattiva grassetto',
    },
    'toggle-italic': {
      label: 'Formatta selezione: attiva/disattiva corsivo',
    },
    'toggle-underline': {
      label: 'Formatta selezione: attiva/disattiva sottolineato',
    },
    'toggle-strikethrough': {
      label: 'Formatta selezione: attiva/disattiva barrato',
    },

    'reset-text-formatting': {
      label: 'Formatta selezione: reimposta la formattazione del testo',
      alt: 'cancella',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Rimuovi commento',
    },
    'save-button': {
      label: 'Salva',
    }
  },

  'correlation-matrix': {
    'title': 'Matrice di correlazione',
    'accept-changes': 'Accetta le modifiche',
    'close-dialog': 'Chiudi',

    'invalid-shape': 'Seleziona una matrice quadrata di almeno 2x2 celle.',
    'invalid-data': 'La matrice di correlazione deve avere una diagonale unitaria.\nOgni cella sulla diagonale deve dare come risultato {unit}.',
    'asymmetric': 'La matrice di correlazione deve essere simmetrica, oppure puoi omettere la triangolare superiore o inferiore.',

    'solution-text': `La matrice di correlazione non è definita positiva. Abbiamo trovato una soluzione apportando piccoli aggiustamenti ai valori. L’errore aggregato è {error}.`,
    'positive-definite': `La matrice di correlazione è definita positiva.`,

  },

  'sign-in-page': {
    heading: 'Accedi',
    subtitle: 'Inserisci il tuo nome utente e la tua password per accedere.',

    username: {
      label: 'Nome utente o email',
      required: 'Inserisci il tuo nome utente o email.',
    },

    password: {
      label: 'Password',
      required: 'Inserisci la tua password.',
      show: {
        label: 'Mostra password',
      },
      hide: {
        label: 'Nascondi password',
      },
      'caps-lock': 'Il Blocco maiuscole è attivo.',
    },

    remember: {
      label: 'Ricordami su questo dispositivo',
    },

    submit: {
      label: 'Accedi',
      pending: 'Accesso in corso…',
    },

    error: {
      rejected: 'Nome utente o password errati.',
      unreachable: 'Impossibile raggiungere il server. Controlla la connessione e riprova.',
      incomplete: 'L’accesso non è stato completato. Riprova.',
    },

    link: {
      'forgot-password': 'Password dimenticata',
      'create-account': 'Crea account',
    },
  },

  'backstage-form': {
    email: {
      required: 'Inserisci il tuo indirizzo email.',
      invalid: 'Questo non sembra un indirizzo email.',
    },

    username: {
      required: 'Scegli un nome utente.',
      'too-short': 'I nomi utente devono avere almeno {min} caratteri.',
      'too-long': 'I nomi utente possono avere al massimo {max} caratteri.',
      invalid: 'Usa lettere, numeri, trattini e trattini bassi, iniziando con una lettera.',
    },

    password: {
      required: 'Scegli una password.',
      'too-short': 'Le password devono avere almeno {min} caratteri.',
    },
  },

  'create-account-page': {
    heading: 'Crea account',

    subtitle: 'Ti chiediamo un indirizzo email e un nome utente perché i documenti vengono archiviati sotto il tuo nome utente.',

    terms: {
      text: 'Consulta le nostre {link}.',
      link: 'condizioni di servizio',
    },

    email: {
      label: 'Indirizzo email',
      taken: 'Esiste già un account con questo indirizzo email.',
    },

    username: {
      label: 'Nome utente',
      taken: '@{username} è già in uso.',
      reserved: '@{username} non è disponibile.',
      checking: 'Verifica della disponibilità…',
      available: '@{username} è disponibile.',
    },

    handle: {
      example: '@{username}/esempio',
      placeholder: 'nome utente',
    },

    after: 'Ti invieremo un’email con un link per confermare il tuo indirizzo e creare una password.',

    submit: {
      label: 'Crea account',
      pending: 'Creazione dell’account…',
    },

    error: {
      unreachable: 'Impossibile raggiungere il server. Controlla la connessione e riprova.',
      rejected: 'Impossibile creare l’account. Controlla i tuoi dati e riprova.',
    },

    done: {
      heading: 'Controlla la tua email',
      body: 'Abbiamo inviato un link a {email}. Aprilo per confermare il tuo indirizzo e scegliere una password.',
      spam: 'Non trovi niente? Aspetta un minuto, poi controlla la cartella spam.',
      restart: 'Usa un indirizzo diverso',
    },

    link: {
      'forgot-password': 'Password dimenticata',
      'sign-in': 'Accedi',
    },
  },

  'forgot-password-page': {
    heading: 'Password dimenticata',
    subtitle: 'Inserisci il tuo indirizzo email e ti invieremo un link per scegliere una nuova password.',

    email: {
      label: 'Indirizzo email',
    },

    submit: {
      label: 'Invia il link',
      pending: 'Invio in corso…',
    },

    error: {
      unreachable: 'Impossibile raggiungere il server. Controlla la connessione e riprova.',
    },

    done: {
      heading: 'Controlla la tua email',
      body: 'Se esiste un account per {email}, gli abbiamo inviato un link. Aprilo per scegliere una nuova password.',
      spam: 'Non trovi niente? Aspetta un minuto, poi controlla la cartella spam.',
      restart: 'Usa un indirizzo diverso',
    },

    link: {
      'sign-in': 'Accedi',
      'create-account': 'Crea account',
    },
  },

  'contact-page': {
    eyebrow: 'Contattaci',
    heading: 'Invia un messaggio',
    subtitle: 'Leggiamo ogni messaggio. Segnalaci bug, idee o semplicemente dicci cosa ne pensi.',

    name: {
      label: 'Nome',
    },

    email: {
      label: 'Email (facoltativa)',
    },

    message: {
      label: 'Messaggio',
    },

    submit: {
      label: 'Invia',
      pending: 'Invio in corso…',
    },

    error: {
      'name-required': 'Inserisci il tuo nome.',
      'message-required': 'Inserisci un messaggio.',
      unreachable: 'Impossibile raggiungere il server. Controlla la connessione e riprova.',
      failed: 'Si è verificato un errore durante l’invio del messaggio. Riprova.',
    },

    done: {
      heading: 'Grazie per il tuo feedback!',
      body: 'Leggeremo il tuo messaggio e ti risponderemo il prima possibile.',
      home: 'Torna alla home',
    },
  },

  'create-password-page': {
    heading: 'Crea una password',
  },

  'update-password-page': {
    heading: 'Scegli una nuova password',
    subtitle: 'Inserisci il token dal link che ti abbiamo inviato.',

    identifier: {
      label: 'Nome utente o email',
      required: 'Inserisci il tuo nome utente o email.',
    },

    token: {
      label: 'Token',
      required: 'Inserisci il token dal link che ti abbiamo inviato.',
      invalid: 'Questo token non è valido. Controlla il link o richiedine uno nuovo.',
      expired: 'Questo link è scaduto. Richiedine uno nuovo.',
      used: 'Questo link è già stato usato. Richiedine uno nuovo.',
    },

    password: {
      label: 'Nuova password',
      show: {
        label: 'Mostra password',
      },
      hide: {
        label: 'Nascondi password',
      },
      'caps-lock': 'Il Blocco maiuscole è attivo.',

      common: 'Questa password è troppo facile da indovinare. Scegline un’altra.',
    },

    strength: {
      title: 'Sicurezza della password',

      weak: 'Debole',
      fair: 'Discreta',
      good: 'Buona',
      strong: 'Forte',
    },

    submit: {
      label: 'Aggiorna password',
      pending: 'Aggiornamento in corso…',
    },

    error: {
      unreachable: 'Impossibile raggiungere il server. Controlla la connessione e riprova.',
      rejected: 'Impossibile aggiornare la password. Controlla i tuoi dati e riprova.',
    },

    done: {
      heading: 'Password aggiornata',
      body: 'La tua nuova password è stata salvata.',
      'continue': 'Continua all’app',
    },

    link: {
      'sign-in': 'Accedi',
      'forgot-password': 'Invia un nuovo link',
    },
  },

  'new-document': {
    'discard-changes-message': 'Hai modifiche non salvate. Sei sicuro?',
    'discard-changes-confirm': 'Nuovo documento',
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Modifiche non salvate',
    },
  },

} satisfies DeepPartial<I18N>;
