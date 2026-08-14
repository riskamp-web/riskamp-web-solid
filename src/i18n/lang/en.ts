
export default {

  test: {
    title: 'Test',
  },
  'update-language': {
    title: 'Update language',
  },

  toolbar: {
    menus: {
      file: 'File',
      help: 'Help',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Data & Analysis',
      tools: 'Tools',
      account: 'Account',
    },

    'menu-commands': {
      documents: 'Documents',
      'account-page': 'Account page',
      'sign-out': 'Sign out',
    },

    tabs: {
      home: 'Home',
      layout: 'Layout',
      format: 'Format',
      insert: 'Insert',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Data & Analysis',
    },

    menu: {
      'about-riskamp': 'About RiskAMP Web',
      'function-documentation': 'RiskAMP function documentation',
      walkthrough: 'Walkthrough model',
    },

    button: {
      'toggle-fullscreen': 'Toggle Fullscreen',

      'new-spreadsheet': 'New spreadsheet',
      'import-file': 'Import file',
      'open-file': 'Open file',
      'save-file': 'Save file',
      'save-file-as': 'Save as...',
      'revert-file': 'Revert file',
      'save-to-desktop': 'Save to desktop',
      'export-xlsx': 'Export XLSX',
      'export-csv': 'Export CSV',

      'sign-in': 'Sign in',
      'create-account': 'Create account',

      'search-cells': {
        label: 'Search cells',
      },
      'defined-names': {
        label: 'Defined names',
      },
      'fit-data': {
        label: 'Fit data',
      },
      notes: {
        label: 'Notes',
      },

      'monte-carlo-simulation': {
        label: 'Monte Carlo simulation',
      },
      'run-simulation': {
        label: 'Run simulation',
      },
      'run-simulation-again': {
        label: 'Run simulation again',
      },
      'las-vegas-simulation': {
        label: 'Las Vegas simulation',
      },
      'simulation-settings': {
        label: 'Simulation settings',
      },
      'quick-view': {
        label: 'Quick view',
      },
      'quick-view-correlation': {
        label: 'Quick view correlation',
      },
      recalculate: {
        label: 'Recalculate',
      },

      'align-left': {
        label: 'Align left',
      },
      'align-center': {
        label: 'Align center',
      },
      'align-right': {
        label: 'Align right',
      },

      'align-top': {
        label: 'Align top',
      },
      'align-middle': {
        label: 'Align middle',
      },
      'align-bottom': {
        label: 'Align bottom',
      },

      'increase-indent': {
        label: 'Increase indent',
      },
      'decrease-indent': {
        label: 'Decrease indent',
      },
      'wrap-text': {
        label: 'Wrap text',
      },

      'toggle-integer-grouping': {
        label: 'Toggle grouping',
      },
      'increase-decimal-precision': {
        label: 'Increase precision',
      },
      'decrease-decimal-precision': {
        label: 'Decrease precision',
      },

      'merge-cells': {
        label: 'Merge cells',
      },
      'unmerge-cells': {
        label: 'Unmerge cells',
      },

      'lock-cells': {
        label: 'Lock cells for editing',
      },
      'unlock-cells': {
        label: 'Unlock cells for editing',
      },

      bold: {
        label: 'Toggle bold text',
      },
      italic: {
        label: 'Toggle italic text',
      },
      underline: {
        label: 'Toggle underline',
      },
      strikethrough: {
        label: 'Toggle striketrhough',
      },

      'insert-row': {
        label: 'Insert row',
      },
      'insert-column': {
        label: 'Insert column',
      },
      'delete-row': {
        label: 'Delete row',
      },
      'delete-column': {
        label: 'Delete column',
      },

      'text-color': {
        label: 'Text color',
      },
      'background-color': {
        label: 'Background color',
      },
      'border-color': {
        label: 'Border color',
      },

      'border-top': {
        title: 'Top border',
      },
      'border-bottom': {
        title: 'Bottom border',
      },
      'border-double-bottom': {
        title: 'Double bottom border',
      },
      'border-left': {
        title: 'Left border',
      },
      'border-right': {
        title: 'Right border',
      },
      'border-all': {
        title: 'All borders',
      },
      'border-none': {
        title: 'Remove borders',
      },
      'border-outside': {
        title: 'Outside borders',
      },

      sparkline: 'Sparkline',
      'sparkline-column': 'Sparkline column',
      'sparkline-line': 'Sparkline line',

      insert: {
        'bar-chart': 'Bar chart',
        'donut-chart': 'Donut chart',
        'column-chart': 'Column chart',
        'line-chart': 'Line chart',
        'scatter-plot': 'Scatter plot',
        'area-chart': 'Area chart',
        image: 'Image',

        comment: 'Comment',
        table: 'Table',
      },

      forecast: 'Trend Forecasting',
    },

    'open-menu': 'Open menu',

    'more-commands-button': {
      label: 'More commands...',
    },

    combobox: {
      'font-size': {
        label: 'Font size',
      },
      'number-format': {
        label: 'Number format',
      },
    },

    label: {
      'spreadsheet-cells': 'Spreadsheet cells',
    },

    message: {
      'changes-stored-in-browser': 'Changes are kept in browser storage until you save or revert them.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'RiskAMP documentation',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Back',
        forward: 'Forward',
      },
    },
    label: {
      'close-sidebar': 'Close sidebar',
    },

    simulation_settings: {
      'random-sampling': {
        'section-header': 'Random sampling',
        'explanatory-text': 'The samping method will be saved with this spreadsheet.\nThe value you select here will also be used as the default for new spreadsheets.',
      },

      'random-seed': {
        'section-header': 'Random seed',
        'explanatory-text': 'The random seed will be saved with this spreadsheet.\nEnter a number to use a fixed seed, or enter 0 to use a random seed in every simulation.',

        'enter-seed-value': 'Enter seed',
        'seed-value': 'Seed value',
        'reset-seed-value': 'Reset seed',
        'time-based-seed': 'Use a time-based seed',
      },

      title: 'Simulation settings',
      'latin-hypercube-sampling': 'Latin hypercube sampling (LHS)',
      'standard-random-sampling': 'Standard random sampling',

      'fixed-random-seed': 'Fixed seed',
      'seed-value-placeholder-text': 'Seed value',
    },

    'notes-panel': {
      title: 'Notes',
      'open-notes-with-spreadsheet': 'Open notes with spreadsheet',
    },
    'fit-data-panel': {
      title: 'Fit data',
    },
  },

  'color-picker': {
    choose_color: 'Choose color',
    use_selected_color: 'Use selected color',
    theme_colors: 'Theme colors',
    other_colors: 'Other colors',
    no_color: 'No color',
    new_color: 'New color',
    default_text_color: 'Default text color',
    default_border_color: 'Default border color',
    no_fill: 'No fill',

    theme: {
      background: 'Background',
      text: 'Text',
      accent: 'Accent',
      lighter: 'Lighter',
      darker: 'Darker',
    },
  },

  'names-panel': {
    title: 'Defined Names',
    header: {
      name: 'Name',
      'name-scope': 'Scope',
      value: 'Value',
    },
    'name-scope': {
      sheet: 'Sheet',
      workbook: 'Book',
    },
    label: {
      'delete-name': 'Delete name',
      'define-name': 'Define name',
      'edit-name': 'Edit name',
    },
    'name-type': {
      reference: 'Reference',
      expression: 'Expression',
    },
  },

  'search-panel': {
    title: 'Search cells',
    'search-text': {
      placeholder: 'Search text',
    },
    'search-in': {
      text: 'Search in',
    },
    'search-type': {
      'cell-values': 'Values',
      'cell-formulas': 'Formulas',
      wildcards: 'Wildcards',
    },
    'search-scope': {
      'current-sheet': 'Current sheet',
      'all-sheets': 'All sheets',
    },
    'search-results': {
      header: {
        address: 'Address',
        value: 'Value',
        formula: 'Formula',
      },
      information: {
        'enter-text': 'Enter text to search',
        result: 'result',
        results: 'results',
      },
    },
  },
  'forecast-dialog': {
    title: 'Trend Forecasting',
    parameters: {
      dates: {
        title: 'Dates',
      },
      values: {
        title: 'Values',
      },
      periods: 'Forecast periods',
      seasonality: 'Seasonality',

      'fill-empty': 'Fill',
      'aggregate-multiple': 'Aggregate',
      'project-forward-periods': 'Periods',
      'chart-type': {
        label: 'Chart type',
      },
      'chart-type-line-chart': 'Line',
      'chart-type-column-chart': 'Column',
    },
    options: {
      'model-type': 'Model',
      'forecast-type': 'Forecast type',
    },
    'model-type': {
      'excel-compatible-forecast': 'Excel compatible',
      'static-forecast': 'Static',
      'stochastic-forecast': 'Stochastic',
    },
    settings: 'Settings',
    'create-forecast-sheet': 'Create forecast sheet',
    seasonality: {
      'auto-detect': 'Detect automatically',
    },
    'fill-options': {
      interpolate: 'Interpolate',
      zeros: 'Zeros',
    },
    'aggregate-options': {
      average: 'Average',
      median: 'Median',
      min: 'Min',
      max: 'Max',
      sum: 'Sum',
      count: 'Count',
    },

    'chart-labels': {
      values: 'Values',
      forecast: 'Forecast',
    },
  },

  'forecast-sheet-timeline-header': 'Timeline',
  'forecast-sheet-values-header': 'Values',
  'forecast-sheet-forecast-header': 'Forecast',
  'forecast-sheet-sample-header': 'Sample',
  'forecast-sheet-statistics-header': 'Stats',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Mean',
    },
    'p80-range': {
      header: 'P80 Range',
    },
  },

  'sparkline-dialog': {
    title: 'Insert sparkline',
    parameters: {
      target: {
        title: 'Target cell',
        'overwrite-warning': 'Data in the target range will be overwritten',
        'merge-warning': 'The selected cells will be merged for the sparkline',
      },
      source: {
        title: 'Source data range',
      },
    },
    info: 'Use cell foreground and background colors to style the sparkline',

    'sparkline-type': 'Sparkline type',
    'sparkline-type-line-chart': 'Line',
    'sparkline-type-column-chart': 'Column',
  },

  'quick-view-dialog': {
    title: 'Quick view',
    'select-cell': 'Select cell',
    'tab-histogram': 'Histogram',
    'tab-box-plot': 'Box plot',
    'show-statistics': 'Statistics',
    'histogram-bin-algorithm-long': 'Bin algorithm',
    'histogram-bin-algorithm-short': 'Bins',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Whisker type',
    'box-plot-whisker-type-short': 'Whiskers',
    'box-plot-whisker-type-minmax': 'Min/max',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'There is no simulation data for the selected cell. Run a simulation using the button below to collect data for this cell.\n\nSimulation data will be collected automatically when a cell is referenced by a statistics function (like SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1st Quartile',
      third_quartile: '3rd Quartile',
      median: 'Median',
      'interquartile-range': 'IQR',
      mean: 'Mean',
      variance: 'Variance',
      'standard-deviation': 'StDev',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Lock the quick view selection',
        'click-to-unlock': 'Unlock the quick view selection',
        'return-to-selection': 'Return to selected cell',
        'selection-locked': 'Selection locked',
      },
    },
  },

  'dialog-close-label': 'Close',
  'dialog-close-title': 'Close dialog',
  'dialog-help-title': 'Help',

  'standard-buttons': {
    close: {
      label: 'Close',
      title: 'Close dialog',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Back',
    },
    yes: {
      title: 'Yes',
    },
    no: {
      title: 'No',
    },
    accept: {
      title: 'Accept',
    },
    cancel: {
      title: 'Cancel',
    },
  },

  'confirm-dialog': {
    title: 'Are you sure?',
    'alert-title': 'Alert',
    confirm: 'Confirm',
    cancel: 'Cancel',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Monte Carlo Simulation',
  'run-simulation': {
    'number-of-trials': 'Number of trials',
    'screen-updates': 'Show screen updates',
    starting: 'Starting...',
    'percent-complete': 'complete',
  },
  'run-simulation-start-label': 'Start',
  'run-simulation-start-title': 'Start simulation',
  'run-simulation-cancel-label': 'Stop',
  'run-simulation-cancel-title': 'Stop simulation',

  'load-error': {
    'loading-document-failed': 'The requested file could not be loaded',
  },

  'save-as-dialog': {
    'default-title': 'Save As',
    'rename-title': 'Rename document',
    'duplicate-title': 'Duplicate document',
    folder: 'Folder',
    name: 'Name',
    access: 'Access',
    public: 'Public',
    private: 'Private',
    save: 'Save',
    overwrite: 'Overwrite',
    'folder-placeholder': 'Optional — e.g. finance/reports',
    'name-placeholder': 'Document name',
    'preview-label': 'Will be saved as',
    'copy-link': 'Copy link',
    'copy-link-copied': 'Link copied',
    collision: 'A document already exists at this path.',
    'collision-blocked': 'A document already exists at this path. Choose a different name.',
    empty: 'Enter a name',
    saved: 'Saved “{name}”',
    'save-failed': 'Couldn’t save “{name}”.',
    retry: 'Retry',
    'overwrite-confirm-title': 'Overwrite document?',
    'overwrite-confirm-message': 'A document already exists at “{name}”. Overwriting replaces its contents. Are you sure?',

    'path-exists-title': 'Document exists',
    'path-exists-message': 'A document with that path already exists. Delete that document first if you want to reuse the path.',

  },

  toast: {
    'region-label': 'Notifications',
    dismiss: 'Dismiss',
  },

  'las-vegas-simulation-panel': {
    title: 'Las Vegas simulation',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Accept',
        description: 'Accept is a cell that returns TRUE or FALSE to accept or reject a trial. Required.',
      },
      complete: {
        title: 'Complete',
        description: 'Complete is a cell that returns TRUE to end the simulation, or a number of accepted trials. Required.',
      },
      fail: {
        title: 'Fail',
        description: 'Fail is a cell that returns TRUE to exit the simulation, or a maximum total number of trials. Optional.',
      },
    },
    'more-information-link': {
      title: 'More information',
    },
    'running-simulation': 'Running simulation...',
    'options-overview': 'Enter options for a Las Vegas simulation.',
  },

  'insert-function': {
    button: {
      title: 'Insert function...',
    },
    'insert-function': 'Insert function',
    'search-for-function': 'Search for function...',
    'function-result': 'Result',
  },

  'function-dialog': {
    'select-function': {
      title: 'Select function',
    },
  },

  'arguments-dialog': {
    'function-result': 'Result',
    volatile: 'volatile',
    'function-help-title': 'Help on this function',
  },

  'number-format': {
    general: 'General',
    number: 'Number',
    integer: 'Integer',
    percent: 'Percent',
    fraction: 'Fraction',
    accounting: 'Accounting',
    currency: 'Currency',
    scientific: 'Scientific',

    timestamp: 'Timestamp',
    'long-date': 'Long date',
    'short-date': 'Short date',
  },

  'llm-chat': {
    panel: {
      title: 'AI Assistant',
    },
    'settings-tab': {
      title: 'Settings',
    },
    'chat-tab': {
      title: 'Chat',
    },
    buttons: {
      'send-message': 'Send',

      'clear-conversation': 'Clear conversation',
      save: 'Save to desktop',
      resend: 'Resend last message',
      restart: 'Restart from first message',
    },

    label: {
      'api-key': 'API key',
      model: 'Model',
      'choose-a-model': 'Chose a model',
      'select-a-model': 'Select a model',
      header: {
        important: 'Important',
      },
      disclaimer: 'The AI interface runs in bring-your-own-key mode. To use it, you must provide an API key for a supported provider/model.\nWe never see your API key. It stays in your browser and only gets sent to the official provider when you send a chat message.\nYou will be charged by your model provider for tokens or under your subscription plan.',
    },
  },

  'developer-panel': {
    title: 'Developer info',
  },

  'fit-data-panel': {
    'select-range': 'Select range',
    'candidate-distributions': {
      label: 'Candidate distributions',
      description: 'Candidates are sorted by closest fit to the theoretical distribution',
    },
    'log-nomal-graph': {
      description: 'The log-normal graph is plotted using log scale',
    },
    statistics: {
      error: 'Error',
      mean_square_error: 'Mean square error',
      aggregate_error: 'Aggregate error',
      max_error: 'Max error',
      mean_error: 'Mean error',
    },

    label: {
      'click-to-lock': 'Lock the fit data selection',
      'click-to-unlock': 'Unlock the fit data selection',
    },

    'distribution-parameters': 'Distribution parameters',
    'spreadsheet-function': 'Spreadsheet function',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Copy to clipboard',
      error: 'Copy error',
      copied: 'Copied',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'No matching commands',
    'start-typing': 'Start typing to find a command',
    'run-highlighted-command': 'Press Enter to run the highlighted command',
    'command-palette': {
      label: 'Command palette',
    },
  },

  'documents-page': {
    title: 'Documents',

    //
    // documents page (the redesigned one -- the documents-table.* keys above
    // belong to the old page). two conventions in this block:
    //
    // {braces} are placeholders for values the page splices in. keep the name
    // spelled as it is, and put it wherever the translated sentence needs it --
    // it doesn't have to stay in the same place as the english.
    //
    // keys ending .one and .other are the singular and plural of the count in
    // them. english only needs the two; a language needing more forms needs a
    // change in the code that picks between them, not just here.
    //
    scope: {
      all: 'All documents',
      starred: 'Starred',
      recent: 'Recent',
      private: 'Private',
    },

    rail: {
      label: 'Document filters',
      folders: 'Folders',
      'no-folders': 'No folders',
    },

    search: {
      placeholder: 'Search documents',
      label: 'Search documents',
      clear: {
        label: 'Clear search',
      },
    },
    filter: {
      label: 'Filter',
    },

    action: {
      'new-document': 'New document',
      open: 'Open',
      duplicate: 'Duplicate',
      rename: 'Rename…',
      'delete': 'Delete',
      cancel: 'Cancel',
      'make-public': 'Make public',
      'make-private': 'Make private',
      'version-history': 'Version history',
    },

    access: {
      public: 'Public',
      private: 'Private',
    },

    selection: {
      count: '{count} selected',
      'make-public': {
        label: 'Make selected documents public',
      },
      'make-private': {
        label: 'Make selected documents private',
      },
      'delete': {
        label: 'Delete selected documents',
      },
    },

    table: {
      label: 'Documents',
      'select-all': {
        label: 'Select all documents',
      },
    },
    column: {
      starred: 'Starred',
      name: 'Name',
      folder: 'Folder',
      access: 'Access',
      version: 'Version',
      modified: 'Modified',
      actions: 'Actions',
    },

    row: {
      select: {
        label: 'Select {name}',
      },
      star: {
        label: 'Star {name}',
      },
      unstar: {
        label: 'Unstar {name}',
      },
      menu: {
        label: 'Actions for {name}',
      },
      unnamed: {
        title: 'This document has no name yet',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Delete document, are you sure?',
      confirm_delete_documents: 'Delete documents, are you sure?',
    },

    error: {
      title: 'Couldn’t load your documents',
      detail: 'Loading failed because of an error. Please try again later.',
      retry: 'Try again',
    },

    messages: {
      rename_failed: 'Rename failed. Please try again later.',
      rename_succeeded: 'Document renamed',

      delete_failed: 'Rename failed. Please try again later.',
      one_document_deleted: 'Document deleted',
      multiple_documents_deleted: 'Documents deleted',

      update_failed: 'Update failed. Please try again later.',

      duplicate_succeeded: 'Document created',
      duplicate_failed: 'Duplicate failed. Please try again later.',

    },

    empty: {
      title: 'No documents yet',
      detail: 'Spreadsheets you create or import will show up here, along with their version history.',
    },

    'no-match': {
      title: 'No documents match “{query}”',
      detail: 'Search covers every folder. Try a shorter term.',
      action: 'Clear search',
    },

    'empty-filter': {
      title: 'Nothing here',
      detail: 'No documents match this filter.',
      'detail-folder': 'No documents in {folder}.',
      action: 'Show all documents',
    },

    footer: {
      count: {
        one: '{count} document',
        other: '{count} documents',
      },
      filtered: '{count} of {total} documents',
      'searching-all': 'searching all folders',
    },

    panel: {
      label: 'Document details',
      open: {
        // tooltip on the linked title, which opens the current version
        title: 'Open document',
      },
      close: {
        label: 'Close details',
      },
      'copy-link': {
        label: 'Copy link',
        copied: {
          label: 'Link copied',
          title: 'Copied',
        },
      },
      'unnamed-hint': 'No name yet — this is the address. Renaming sets one.',
      star: {
        label: 'Star this document',
      },
      unstar: {
        label: 'Unstar this document',
      },
      field: {
        access: 'Access',
        starred: 'Starred',
        created: 'Created',
        modified: 'Modified',
        version: 'Version',
      },
    },

    history: {
      title: 'Older versions',
      loading: 'Loading version history',
      error: 'Couldn’t load version history.',
      retry: 'Try again',
      menu: {
        label: 'Actions for version {version}',
      },
      open: {
        text: 'Open this version',
        /* the version tag is a link, and 'v3' on its own is thin as a link name --
        this is its accessible name, not visible text */
        label: 'Open version {version}',
      },
      duplicate: 'Duplicate as new document',
      restore: 'Restore',
      none: 'No older versions yet. They appear here as you save.',
      kept: {
        one: 'Keeping one older version.',
        other: 'Keeping the last {count} older versions.',
      },
    },

    time: {
      'just-now': 'just now',
      minutes: {
        one: '{count} minute ago',
        other: '{count} minutes ago',
      },
      hours: {
        one: '{count} hour ago',
        other: '{count} hours ago',
      },
      days: {
        one: '{count} day ago',
        other: '{count} days ago',
      },
      today: 'today, {time}',
      yesterday: 'yesterday, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Document',
    },
    'updated-date': {
      label: 'Updated',
    },
    'created-date': {
      label: 'Created',
    },
    access: {
      label: 'Access',
      'type-private': 'Private',
      'type-public': 'Public',
    },
    'filter-documents': {
      label: 'Filter documents',
    },

    controls: {
      'delete-selected': 'Delete selected',
      'make-public': 'Make public',
      'make-private': 'Make private',
    },
  },

  'account-page': {
    title: 'Account',
  },

  'sign-in': {
    page: {
      title: 'Sign in',
    },
    form: {
      username: {
        placeholder: 'Username or email',
      },
      password: {
        placeholder: 'Password',
      },
      'sign-in-button': {
        label: 'Sign in',
      },
      'remember-me': 'Remember me on this device',
      instructions: 'Enter your username and password to sign in',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Forgot password',
      },
      'create-account': {
        text: 'Create account',
      },
      'sign-in': {
        text: 'Sign in',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Forgot password',
    },
    form: {
      instructions: 'Enter your email address to reset your password',
      email: {
        placeholder: 'Email address',
      },
      'reset-password-button': {
        label: 'Reset password',
      },
    },
  },

  'create-account': {
    page: {
      title: 'Create account',
    },
  },
  'update-password': {
    page: {
      title: 'Update password',
    },
  },

  'theme-toggle': {
    'light-theme': 'Light theme',
    'dark-theme': 'Dark theme',
    'system-theme': 'System theme',
  },

  // adding command palette commands labels/alt text
  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Use dark theme',
        alt: 'color scheme',
      },

      'light-theme': {
        label: 'Use light theme',
        alt: 'color scheme',
      },

      'system-theme': {
        label: 'Use system theme',
        alt: 'color scheme light dark',
      },
    },

    'remove-hyperlink': {
      label: 'Remove hyperlink',
      alt: 'delete clear link',
    },

    'insert-hyperlink': {
      label: 'Insert hyperlink',
      alt: 'add set link',

      // command palette parameter prompts and choice labels
      parameter: {
        url: {
          label: 'Enter link address (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Add or edit cell comment',
      alt: 'note comment',

      parameter: {
        comment: {
          label: 'Enter a comment. Press Ctrl + Enter to save.',
          'label-mac': 'Enter a comment. Press Cmd + Enter to save.',
        },
      },
    },

    'remove-comment': {
      label: 'Remove cell comment',
      alt: 'note',
    },

    'reset-background-color': {
      label: 'Reset background color in selection',
      alt: 'clear fill',
    },

    'set-background-color': {
      label: 'Set background color for selection',
      alt: 'fill',
    },

    'reset-text-color': {
      label: 'Reset text color in selection',
      alt: 'clear foreground',
    },

    'set-text-color': {
      label: 'Set text color for selection',
      alt: 'foreground',
    },

    'reset-border-color': {
      label: 'Reset border color in selection',
      alt: 'clear',
    },

    'set-border-color': {
      label: 'Set border color for selection',
    },

    'borders-clear': {
      label: 'Borders: clear borders',
    },
    'border-top': {
      label: 'Borders: set top border on selection',
    },
    'border-bottom': {
      label: 'Borders: set bottom border on selection',
    },
    'border-double-bottom': {
      label: 'Borders: set double bottom border on selection',
    },
    'border-left': {
      label: 'Borders: set left border on selection',
    },
    'border-right': {
      label: 'Borders: set right border on selection',
    },

    'border-outside': {
      label: 'Borders: set outside border on selection',
      alt: 'outer',
    },

    'border-all': {
      label: 'Borders: set all borders on selection',
    },

    'reset-font-scale': {
      label: 'Reset font scale',
      alt: 'text font size',
    },

    'font-scale-increase': {
      label: 'Font scale: increase 10%',
      alt: 'text font size',
    },

    'font-scale-decrease': {
      label: 'Font scale: decrease 10%',
      alt: 'text font size',
    },

    'insert-donut-chart': {
      label: 'Insert donut chart',
      alt: 'chart graph',
    },

    'insert-column-chart': {
      label: 'Insert column chart',
      alt: 'chart graph',
    },

    'insert-bar-chart': {
      label: 'Insert bar chart',
      alt: 'chart graph',
    },

    'insert-line-chart': {
      label: 'Insert line chart',
      alt: 'chart graph',
    },

    'insert-scatter-plot': {
      label: 'Insert scatter plot',
      alt: 'chart graph',
    },

    'insert-box-plot': {
      label: 'Insert box plot',
      alt: 'chart graph whiskers',
    },

    'insert-image': {
      label: 'Insert image',
    },

    'cf-gradient-red-green': {
      label: 'Conditional format gradient: red-green',
    },
    'cf-gradient-green-red': {
      label: 'Conditional format gradient: green-red',
    },
    'cf-unique-values': {
      label: 'Conditional format: unique values',

      parameter: {
        color: {
          label: 'Select color for unique values',
        },
      },
    },

    'cf-data-bars': {
      label: 'Conditional format: data bars',
      alt: 'databar',

      parameter: {
        color: {
          label: 'Select color for data bars',
        },
        'hide-values': {
          label: 'Hide values?',
          choice: {
            'true': 'Yes, hide values',
            'false': 'No, show values',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Conditional format: duplicate values',

      parameter: {
        color: {
          label: 'Select color for duplicate values',
        },
      },
    },

    'cf-clear': {
      label: 'Clear conditional formatting from selection',
      alt: 'remove',
    },

    'fit-column-widths': {
      label: 'Fit selected column widths (auto-size)',
    },

    'fit-data': {
      label: 'Fit data',
      alt: 'fit',
    },

    'named-ranges': {
      label: 'Named ranges and expressions',
      alt: 'name manager define name delete name clear',
    },

    'set-tab-color': {
      label: 'Set tab color',
    },

    'reset-tab-color': {
      label: 'Reset tab color',
      alt: 'clear remove',
    },

    'fit-row-heights': {
      label: 'Fit selected row heights (auto-size)',
    },

    'correlation-matrix': {
      label: 'Check correlation matrix',
    },

    'hide-sheet': {
      label: 'Hide sheet',
      alt: 'visible',
    },

    'unhide-all-sheets': {
      label: 'Unhide all sheets',
      alt: 'visible',
    },

    'unhide-columns': {
      label: 'Unhide sheet columns',
    },
    'unhide-rows': {
      label: 'Unhide sheet rows',
    },
    'hide-rows': {
      label: 'Hide selected rows',
    },
    'hide-columns': {
      label: 'Hide selected columns',
    },

    'las-vegas-simulation': {
      label: 'Las Vegas simulation...',
    },
    'simulation-settings': {
      label: 'Simulation settings...',
    },
    'language-settings': {
      label: 'Language settings...',
    },

    'load-desktop-file': {
      label: 'Load desktop file...',
      alt: 'excel csv import',
    },

    'save-xlsx': {
      label: 'Save as XLSX',
      alt: 'download excel',
    },

    'save-csv': {
      label: 'Save current sheet as CSV',
      alt: 'download export',
    },

    'save-to-cloud': {
      label: 'Save to cloud',
    },

    'load-document': {
      label: 'Load document...',
      alt: 'open',
    },

    'download-json': {
      label: 'Download to desktop (JSON)',
      alt: 'save',
    },

    'insert-function': {
      label: 'Insert function...',
    },
    find: {
      label: 'Find in values/formulas...',
    },
    'insert-distribution': {
      label: 'Insert random distribution...',
    },
    'run-simulation': {
      label: 'Run simulation...',
    },
    'quick-view': {
      label: 'Quick view...',
    },
    'new-model': {
      label: 'New model',
    },
    'revert-file': {
      label: 'Revert file',
    },
    recalculate: {
      label: 'Recalculate',
    },
    undo: {
      label: 'Undo',
    },
    'delete-columns': {
      label: 'Delete selected columns',
    },
    'delete-rows': {
      label: 'Delete selected rows',
    },
    'insert-column': {
      label: 'Insert column',
    },
    'insert-row': {
      label: 'Insert row',
    },
    'set-view-scale': {
      label: 'Set view scale (zoom)',

      parameter: {
        scale: {
          label: 'Enter the view scale',
        },
      },
    },
    'reset-view-scale': {
      label: 'Reset view scale (zoom)',
    },

    'rename-tab': {
      label: 'Rename tab',
      alt: 'sheet page',

      parameter: {
        name: {
          label: 'Enter a name for this tab',
        },
      },
    },

    'add-tab': {
      label: 'Add tab',
      alt: 'sheet page',

      parameter: {
        name: {
          label: 'Enter a name for the new tab',
        },
      },
    },

    'delete-tab': {
      label: 'Delete tab',
      alt: 'sheet page',
    },

    'increase-indent': {
      label: 'Increase indent',
      alt: 'more',
    },

    'decrease-indent': {
      label: 'Decrease indent',
      alt: 'less',
    },

    'number-format-increase-precision': {
      label: 'Number format: increase precision',
      alt: 'more decimal places',
    },

    'number-format-decrease-precision': {
      label: 'Number format: decrease precision',
      alt: 'less fewer decimal places',
    },

    'number-format': {
      label: 'Number format',
      alt: 'custom number format',

      parameter: {
        format: {
          label: 'Enter number format or a symbolic name',
        },
      },
    },

    'merge-cells': {
      label: 'Merge selected cells',
    },
    'unmerge-cells': {
      label: 'Unmerge selected cells',
    },
    'lock-cells': {
      label: 'Lock selected cells',
    },
    'unlock-cells': {
      label: 'Unlock selected cells',
    },

    'valign-top': {
      label: 'Format selection: vertical align top',
    },
    'valign-bottom': {
      label: 'Format selection: vertical align bottom',
    },
    'valign-middle': {
      label: 'Format selection: vertical align middle',
    },

    'align-left': {
      label: 'Format selection: left justify text',
      alt: 'horizontal align',
    },

    'align-right': {
      label: 'Format selection: right justify text',
      alt: 'horizontal align',
    },

    'align-center': {
      label: 'Format selection: center text',
      alt: 'horizontal align justify',
    },

    'toggle-word-wrap': {
      label: 'Format selection: toggle word wrap',
    },

    'toggle-gridlines': {
      label: 'Toggle gridlines in active sheet',
    },
    'show-gridlines': {
      label: 'Show gridlines in active sheet',
    },
    'hide-gridlines': {
      label: 'Hide gridlines in active sheet',
    },

    'toggle-bold': {
      label: 'Format selection: toggle bold',
    },
    'toggle-italic': {
      label: 'Format selection: toggle italic',
    },
    'toggle-underline': {
      label: 'Format selection: toggle underline',
    },
    'toggle-strikethrough': {
      label: 'Format selection: toggle strikethrough',
    },

    'reset-text-formatting': {
      label: 'Format selection: reset text formatting',
      alt: 'clear',
    },
  },

  //
  // sign-in page (the redesigned one -- the sign-in.* and auth.link.* keys
  // above belong to the old page. 'sign-in.page.title' is still live: it's the
  // toolbar's title, which isn't the same string as the heading on the page).
  //
  'sign-in-page': {
    heading: 'Sign in',
    subtitle: 'Enter your username and password to sign in.',

    username: {
      label: 'Username or email',
      required: 'Enter your username or email.',
    },

    password: {
      label: 'Password',
      required: 'Enter your password.',
      show: {
        label: 'Show password',
      },
      hide: {
        label: 'Hide password',
      },
      'caps-lock': 'Caps Lock is on.',
    },

    remember: {
      label: 'Remember me on this device',
    },

    submit: {
      label: 'Sign in',
      pending: 'Signing in…',
    },

    error: {
      rejected: 'Incorrect username or password.',
      unreachable: 'Can’t reach the server. Check your connection and try again.',
      incomplete: 'Sign-in didn’t complete. Try again.',
    },

    link: {
      'forgot-password': 'Forgot password',
      'create-account': 'Create account',
    },
  },

  //
  // shared form rules -- the messages the validators in
  // ~/backstage/account-validation.ts return.
  //
  // the one block no single page owns, and the exception to the
  // one-block-per-page rule: these are returned by shared functions, so pointing
  // them at any one page's block would mean the other pages render strings from
  // it -- and shortening a message for that page would silently change them all.
  // this block goes when the last backstage form does.
  //
  // a page's *own* verdicts stay in its own block: 'is already taken' is
  // create-account's, because only its mock can say it.
  //
  'backstage-form': {
    email: {
      required: 'Enter your email address.',
      invalid: 'That doesn’t look like an email address.',
    },

    username: {
      required: 'Choose a username.',
      'too-short': 'Usernames are at least {min} characters.',
      'too-long': 'Usernames are at most {max} characters.',
      invalid: 'Use lowercase letters, numbers, hyphens and underscores, starting with a letter.',
    },

    password: {
      required: 'Choose a password.',
      'too-short': 'Passwords are at least {min} characters.',
    },
  },

  //
  // create account page (the redesigned one). 'create-account.page.title'
  // above is still live -- it's the toolbar's title, the same arrangement
  // sign-in has.
  //
  // this page collects an email address and a username and nothing else: the
  // password is chosen later, from the link the confirmation mail carries.
  //
  'create-account-page': {
    heading: 'Create account',

    // the subtitle is the *explanation*, not a restatement of the two labels:
    // asking for a username as well as an email address is the unusual thing
    // about this page, and the reason is that the username isn't only a login --
    // it's the first segment of every document address the account owns. the
    // shape that describes is drawn live under the username field.
    subtitle: 'We ask for both because your documents are stored under your username, which makes it part of every document’s address.',

    // {link} is the terms of service link, spliced in so a translation can put it
    // where its own grammar needs it
    terms: {
      text: 'Please review our {link}.',
      link: 'terms of service',
    },

    email: {
      label: 'Email address',
      taken: 'There’s already an account with that email address.',
    },

    username: {
      label: 'Username',
      taken: '@{username} is already taken.',
      reserved: '@{username} isn’t available.',
    },

    // the live preview under the username field -- an address, drawn in
    // monospace, so it takes the username as a value rather than as words
    handle: {
      example: '@{username}/example',
      placeholder: 'username',
    },

    after: 'We’ll email you a link to confirm your address. Follow it to choose a password and finish setting up your account.',

    submit: {
      label: 'Create account',
      pending: 'Creating account…',
    },

    error: {
      unreachable: 'Can’t reach the server. Check your connection and try again.',
      rejected: 'That account couldn’t be created. Check your details and try again.',
    },

    done: {
      heading: 'Check your email',
      body: 'We sent a link to {email}. Open it to confirm your address and choose a password.',
      spam: 'Nothing there? Give it a minute, then check your spam folder.',
      restart: 'Use a different address',
    },

    link: {
      'forgot-password': 'Forgot password',
      'sign-in': 'Sign in',
    },
  },

  //
  // forgot password page (the redesigned one -- the forgot-password.form.* keys
  // above belong to the page in archive/. 'forgot-password.page.title' is still
  // live: it's the toolbar's title).
  //
  // the confirmation is worded CONDITIONALLY on purpose. whether an address has
  // an account is not something this page may disclose, so it says the same
  // thing either way -- and "we've sent you a link" would be a lie half the
  // time. don't "fix" this into the direct form.
  //
  'forgot-password-page': {
    heading: 'Forgot password',
    subtitle: 'Enter your email address and we’ll send you a link to choose a new password.',

    email: {
      label: 'Email address',
    },

    submit: {
      label: 'Send the link',
      pending: 'Sending…',
    },

    error: {
      unreachable: 'Can’t reach the server. Check your connection and try again.',
    },

    done: {
      heading: 'Check your email',
      body: 'If there’s an account for {email}, we’ve sent it a link. Open it to choose a new password.',
      spam: 'Nothing there? Give it a minute, then check your spam folder.',
      restart: 'Use a different address',
    },

    link: {
      'sign-in': 'Sign in',
      'create-account': 'Create account',
    },
  },

  //
  // update password page -- where the link from the recovery email lands, and
  // where a new account chooses its first password. 'update-password.page.title'
  // below is the toolbar's title, named the old way like all the others.
  //
  // the first field takes a username OR an email: the recovery request is keyed
  // by email and the reset is keyed by username, so one link has to satisfy both.
  //
  'update-password-page': {
    heading: 'Choose a new password',
    subtitle: 'Your email address and token come from the link we sent you.',

    identifier: {
      label: 'Username or email',
      required: 'Enter your username or email.',
    },

    token: {
      label: 'Token',
      required: 'Enter the token from the link we sent you.',
      invalid: 'That token isn’t valid. Check the link, or ask for a new one.',
      expired: 'That link has expired. Ask for a new one.',
      used: 'That link has already been used. Ask for a new one.',
    },

    password: {
      label: 'New password',
      show: {
        label: 'Show password',
      },
      hide: {
        label: 'Hide password',
      },
      'caps-lock': 'Caps Lock is on.',

      // the server's verdict, and one the client can't predict -- it has no list of
      // common passwords and isn't shipping one. this is what proves the meter
      // advises rather than decides: a password it rates Good can still be refused.
      common: 'That password is too easy to guess. Choose another.',
    },

    // the meter's visible label. it isn't decoration: unlabelled, the bar reads as
    // a divider rather than as a measurement of anything
    strength: {
      title: 'Password strength',

      // the meter's four words. it advises and never blocks -- anything at or above
      // the minimum length can be submitted, whatever this says
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
    },

    submit: {
      label: 'Update password',
      pending: 'Updating…',
    },

    error: {
      unreachable: 'Can’t reach the server. Check your connection and try again.',
      rejected: 'That password couldn’t be updated. Check your details and try again.',
    },

    done: {
      heading: 'Password updated',
      body: 'You can now sign in with your new password.',
      'sign-in': 'Sign in',
    },

    link: {
      'sign-in': 'Sign in',
      'forgot-password': 'Send a new link',
    },
  },

  ///
  'status-pill': {
    messages: {
      'unsaved-changes': 'Unsaved changes',
    },
  },
};
