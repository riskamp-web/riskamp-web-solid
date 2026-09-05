
/** generated Fri Sep 05 2026 by Claude Opus 4.8 <noreply@anthropic.com> */

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
    title: 'Paramètres de langue...',
  },

  'select-language-dialog': {
    'title': 'Sélectionner la langue',
  },

  about: {
    tagline: 'Analyse de risque Monte Carlo pour le web.',
    build: 'Build {commit}',
    copyright: '© {year} Structured Data LLC. Tous droits réservés.',
    website: 'riskamp.com',
    report: 'Signaler un problème',
    'report-subject': 'RiskAMP web — signalement de problème',
    'report-body': '(décrivez le problème ici)\n\n\n---\nRiskAMP : {version}\nTREB : {treb}\nBuild : {commit}\nNavigateur : {ua}\nLangue : {lang}\nURL : {url}',
  },

  toolbar: {
    menus: {
      file: 'Fichier',
      help: 'Aide',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Données et analyse',
      tools: 'Outils',
      account: 'Compte',
    },

    'menu-commands': {
      documents: 'Documents',
      'account-page': 'Page du compte',
      'sign-out': 'Se déconnecter',
    },

    tabs: {
      home: 'Accueil',
      layout: 'Mise en page',
      format: 'Format',
      insert: 'Insertion',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Données et analyse',
    },

    menu: {
      'about-riskamp': 'À propos de RiskAMP web',
      'function-documentation': 'Documentation des fonctions RiskAMP',
      walkthrough: 'Modèle de démonstration',
    },

    button: {
      'toggle-fullscreen': 'Plein écran',

      'new-spreadsheet': 'Nouvelle feuille de calcul',
      'import-file': 'Importer un fichier',
      'open-file': 'Ouvrir un fichier',
      'save-file': 'Enregistrer le fichier',
      'save-file-as': 'Enregistrer sous...',
      'revert-file': 'Rétablir le fichier',
      'save-to-desktop': 'Enregistrer sur le bureau',
      'export-xlsx': 'Exporter en XLSX',
      'export-csv': 'Exporter en CSV',

      'sign-in': 'Se connecter',
      'create-account': 'Créer un compte',

      'search-cells': {
        label: 'Rechercher des cellules',
      },
      'defined-names': {
        label: 'Noms définis',
      },
      'fit-data': {
        label: 'Ajuster les données',
      },
      notes: {
        label: 'Notes',
      },

      'monte-carlo-simulation': {
        label: 'Simulation Monte Carlo',
      },
      'run-simulation': {
        label: 'Lancer la simulation',
      },
      'run-simulation-again': {
        label: 'Relancer la simulation',
      },
      'las-vegas-simulation': {
        label: 'Simulation Las Vegas',
      },
      'simulation-settings': {
        label: 'Paramètres de simulation',
      },
      'quick-view': {
        label: 'Aperçu rapide',
      },
      'quick-view-correlation': {
        label: 'Corrélation de l’aperçu rapide',
      },
      recalculate: {
        label: 'Recalculer',
      },

      'align-left': {
        label: 'Aligner à gauche',
      },
      'align-center': {
        label: 'Centrer',
      },
      'align-right': {
        label: 'Aligner à droite',
      },

      'align-top': {
        label: 'Aligner en haut',
      },
      'align-middle': {
        label: 'Centrer verticalement',
      },
      'align-bottom': {
        label: 'Aligner en bas',
      },

      'increase-indent': {
        label: 'Augmenter le retrait',
      },
      'decrease-indent': {
        label: 'Diminuer le retrait',
      },
      'wrap-text': {
        label: 'Renvoyer à la ligne',
      },

      'toggle-integer-grouping': {
        label: 'Séparateur de milliers',
      },
      'increase-decimal-precision': {
        label: 'Ajouter une décimale',
      },
      'decrease-decimal-precision': {
        label: 'Supprimer une décimale',
      },

      'merge-cells': {
        label: 'Fusionner les cellules',
      },
      'unmerge-cells': {
        label: 'Annuler la fusion des cellules',
      },

      'lock-cells': {
        label: 'Verrouiller les cellules pour modification',
      },
      'unlock-cells': {
        label: 'Déverrouiller les cellules pour modification',
      },

      bold: {
        label: 'Activer/désactiver le gras',
      },
      italic: {
        label: 'Activer/désactiver l’italique',
      },
      underline: {
        label: 'Activer/désactiver le soulignement',
      },
      strikethrough: {
        label: 'Activer/désactiver le barré',
      },

      'insert-row': {
        label: 'Insérer une ligne',
      },
      'insert-column': {
        label: 'Insérer une colonne',
      },
      'delete-row': {
        label: 'Supprimer la ligne',
      },
      'delete-column': {
        label: 'Supprimer la colonne',
      },

      'text-color': {
        label: 'Couleur du texte',
      },
      'background-color': {
        label: 'Couleur de fond',
      },
      'border-color': {
        label: 'Couleur de bordure',
      },

      'border-top': {
        title: 'Bordure supérieure',
      },
      'border-bottom': {
        title: 'Bordure inférieure',
      },
      'border-double-bottom': {
        title: 'Double bordure inférieure',
      },
      'border-left': {
        title: 'Bordure gauche',
      },
      'border-right': {
        title: 'Bordure droite',
      },
      'border-all': {
        title: 'Toutes les bordures',
      },
      'border-none': {
        title: 'Supprimer les bordures',
      },
      'border-outside': {
        title: 'Bordures extérieures',
      },

      'correlation-matrix': {
        title: 'Matrice de corrélation',
      },

      sparkline: 'Graphique sparkline',
      'sparkline-column': 'Sparkline en colonnes',
      'sparkline-line': 'Sparkline en courbes',

      insert: {
        'bar-chart': 'Graphique à barres',
        'donut-chart': 'Graphique en anneau',
        'column-chart': 'Graphique en colonnes',
        'line-chart': 'Graphique en courbes',
        'scatter-plot': 'Nuage de points',
        'area-chart': 'Graphique en aires',
        image: 'Image',

        comment: 'Commentaire',
        table: 'Tableau',
      },

      forecast: 'Prévision de tendance',
    },

    'open-menu': 'Ouvrir le menu',

    'more-commands-button': {
      label: 'Plus de commandes...',
    },

    combobox: {
      'font-size': {
        label: 'Taille de police',
      },
      'number-format': {
        label: 'Format de nombre',
      },
    },

    label: {
      'spreadsheet-cells': 'Cellules de la feuille de calcul',
    },

    message: {
      'changes-stored-in-browser': 'Les modifications sont conservées dans le stockage du navigateur jusqu’à ce que vous les enregistriez ou les annuliez.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'Documentation RiskAMP',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Précédent',
        forward: 'Suivant',
      },
    },
    label: {
      'close-sidebar': 'Fermer la barre latérale',
    },

    simulation_settings: {
      'random-sampling': {
        'section-header': 'Échantillonnage aléatoire',
        'explanatory-text': 'La méthode d’échantillonnage sera enregistrée avec cette feuille de calcul.\nLa valeur que vous sélectionnez ici servira également de valeur par défaut pour les nouvelles feuilles de calcul.',
      },

      'random-seed': {
        'section-header': 'Graine aléatoire',
        'explanatory-text': 'La graine aléatoire sera enregistrée avec cette feuille de calcul.\nSaisissez un nombre pour utiliser une graine fixe, ou saisissez 0 pour utiliser une graine aléatoire à chaque simulation.',

        'enter-seed-value': 'Saisir la graine',
        'seed-value': 'Valeur de la graine',
        'reset-seed-value': 'Réinitialiser la graine',
        'time-based-seed': 'Utiliser une graine basée sur l’heure',
      },

      title: 'Paramètres de simulation',
      'latin-hypercube-sampling': 'Échantillonnage par hypercube latin (LHS)',
      'standard-random-sampling': 'Échantillonnage aléatoire standard',

      'fixed-random-seed': 'Graine fixe',
      'seed-value-placeholder-text': 'Valeur de la graine',
    },

    'notes-panel': {
      title: 'Notes',
      'open-notes-with-spreadsheet': 'Ouvrir les notes avec la feuille de calcul',
      edit_markdown: 'Modifier le markdown',
      view_formatted: 'Afficher la mise en forme',
    },
    'fit-data-panel': {
      title: 'Ajuster les données',
    },
  },

  'color-picker': {
    choose_color: 'Choisir une couleur',
    use_selected_color: 'Utiliser la couleur sélectionnée',
    theme_colors: 'Couleurs du thème',
    other_colors: 'Autres couleurs',
    no_color: 'Aucune couleur',
    new_color: 'Nouvelle couleur',
    default_text_color: 'Couleur de texte par défaut',
    default_border_color: 'Couleur de bordure par défaut',
    no_fill: 'Aucun remplissage',

    theme: {
      background: 'Arrière-plan',
      text: 'Texte',
      accent: 'Accentuation',
      lighter: 'Plus clair',
      darker: 'Plus foncé',
    },
  },

  'names-panel': {
    title: 'Noms définis',
    header: {
      name: 'Nom',
      'name-scope': 'Portée',
      value: 'Valeur',
    },
    'name-scope': {
      sheet: 'Feuille',
      workbook: 'Classeur',
    },
    label: {
      'delete-name': 'Supprimer le nom',
      'define-name': 'Définir un nom',
      'edit-name': 'Modifier le nom',
    },
    'name-type': {
      reference: 'Référence',
      expression: 'Expression',
    },
  },

  'search-panel': {
    title: 'Rechercher des cellules',
    'search-text': {
      placeholder: 'Rechercher du texte',
    },
    'search-in': {
      text: 'Rechercher dans',
    },
    'search-type': {
      'cell-values': 'Valeurs',
      'cell-formulas': 'Formules',
      wildcards: 'Caractères génériques',
    },
    'search-scope': {
      'current-sheet': 'Feuille actuelle',
      'all-sheets': 'Toutes les feuilles',
    },
    'search-results': {
      header: {
        address: 'Adresse',
        value: 'Valeur',
        formula: 'Formule',
      },
      information: {
        'enter-text': 'Saisissez du texte à rechercher',
        result: 'résultat',
        results: 'résultats',
      },
    },
  },
  'forecast-dialog': {
    title: 'Prévision de tendance',
    parameters: {
      dates: {
        title: 'Dates',
      },
      values: {
        title: 'Valeurs',
      },
      periods: 'Périodes de prévision',
      seasonality: 'Saisonnalité',

      'fill-empty': 'Remplir',
      'aggregate-multiple': 'Agréger',
      'project-forward-periods': 'Périodes',
      'chart-type': {
        label: 'Type de graphique',
      },
      'chart-type-line-chart': 'Courbes',
      'chart-type-column-chart': 'Colonnes',
    },
    options: {
      'model-type': 'Modèle',
      'forecast-type': 'Type de prévision',
    },
    'model-type': {
      'excel-compatible-forecast': 'Compatible Excel',
      'static-forecast': 'Statique',
      'stochastic-forecast': 'Stochastique',
    },
    settings: 'Paramètres',
    'create-forecast-sheet': 'Créer une feuille de prévision',
    seasonality: {
      'auto-detect': 'Détecter automatiquement',
    },
    'fill-options': {
      interpolate: 'Interpoler',
      zeros: 'Zéros',
    },
    'aggregate-options': {
      average: 'Moyenne',
      median: 'Médiane',
      min: 'Min',
      max: 'Max',
      sum: 'Somme',
      count: 'Nombre',
    },

    'chart-labels': {
      values: 'Valeurs',
      forecast: 'Prévision',
    },
  },

  'forecast-sheet-timeline-header': 'Chronologie',
  'forecast-sheet-values-header': 'Valeurs',
  'forecast-sheet-forecast-header': 'Prévision',
  'forecast-sheet-sample-header': 'Échantillon',
  'forecast-sheet-statistics-header': 'Stats',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Moyenne',
    },
    'p80-range': {
      header: 'Plage P80',
    },
  },

  'sparkline-dialog': {
    title: 'Insérer un graphique sparkline',
    parameters: {
      target: {
        title: 'Cellule cible',
        'overwrite-warning': 'Les données de la plage cible seront écrasées',
        'merge-warning': 'Les cellules sélectionnées seront fusionnées pour le sparkline',
      },
      source: {
        title: 'Plage de données source',
      },
    },
    info: 'Utilisez les couleurs de texte et de fond de la cellule pour styliser le sparkline',

    'sparkline-type': 'Type de sparkline',
    'sparkline-type-line-chart': 'Courbes',
    'sparkline-type-column-chart': 'Colonnes',
  },

  'quick-view-dialog': {
    title: 'Aperçu rapide',
    'select-cell': 'Sélectionner une cellule',
    'tab-histogram': 'Histogramme',
    'tab-box-plot': 'Boîte à moustaches',
    'show-statistics': 'Statistiques',
    'histogram-bin-algorithm-long': 'Algorithme d’intervalles',
    'histogram-bin-algorithm-short': 'Intervalles',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Type de moustaches',
    'box-plot-whisker-type-short': 'Moustaches',
    'box-plot-whisker-type-minmax': 'Min/max',
    'box-plot-whisker-type-interquartile-range': 'EIQ',
    'no-data': 'Il n’y a aucune donnée de simulation pour la cellule sélectionnée. Lancez une simulation à l’aide du bouton ci-dessous pour collecter des données pour cette cellule.\n\nLes données de simulation seront collectées automatiquement lorsqu’une cellule est référencée par une fonction statistique (comme SimulationMean).',

    'stats-label': {
      min: 'Min',
      max: 'Max',
      first_quartile: '1er quartile',
      third_quartile: '3e quartile',
      median: 'Médiane',
      'interquartile-range': 'EIQ',
      mean: 'Moyenne',
      variance: 'Variance',
      'standard-deviation': 'ÉcT',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Verrouiller la sélection de l’aperçu rapide',
        'click-to-unlock': 'Déverrouiller la sélection de l’aperçu rapide',
        'return-to-selection': 'Revenir à la cellule sélectionnée',
        'selection-locked': 'Sélection verrouillée',
      },
    },
  },

  'dialog-close-label': 'Fermer',
  'dialog-close-title': 'Fermer la boîte de dialogue',
  'dialog-help-title': 'Aide',

  'standard-buttons': {
    close: {
      label: 'Fermer',
      title: 'Fermer la boîte de dialogue',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Précédent',
    },
    yes: {
      title: 'Oui',
    },
    no: {
      title: 'Non',
    },
    accept: {
      title: 'Accepter',
    },
    cancel: {
      title: 'Annuler',
    },
  },

  'confirm-dialog': {
    title: 'Êtes-vous sûr ?',
    'alert-title': 'Alerte',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Simulation Monte Carlo',
  'run-simulation': {
    'number-of-trials': 'Nombre d’essais',
    'screen-updates': 'Afficher les mises à jour de l’écran',
    starting: 'Démarrage...',
    'percent-complete': 'terminé',
  },
  'run-simulation-start-label': 'Démarrer',
  'run-simulation-start-title': 'Démarrer la simulation',
  'run-simulation-cancel-label': 'Arrêter',
  'run-simulation-cancel-title': 'Arrêter la simulation',

  'load-error': {
    'loading-document-failed': 'Le fichier demandé n’a pas pu être chargé',
  },

  'save-as-dialog': {
    'default-title': 'Enregistrer sous',
    'rename-title': 'Renommer le document',
    'duplicate-title': 'Dupliquer le document',
    folder: 'Dossier',
    name: 'Nom',
    access: 'Accès',
    public: 'Public',
    private: 'Privé',
    save: 'Enregistrer',
    overwrite: 'Écraser',
    'folder-placeholder': 'Facultatif — p. ex. finance/rapports',
    'name-placeholder': 'Nom du document',
    'preview-label': 'Sera enregistré sous',
    'copy-link': 'Copier le lien',
    'copy-link-copied': 'Lien copié',
    collision: 'Un document existe déjà à cet emplacement.',
    'collision-blocked': 'Un document existe déjà à cet emplacement. Choisissez un nom différent.',
    empty: 'Saisissez un nom',
    saved: 'Enregistré « {name} »',
    'save-failed': 'Impossible d’enregistrer « {name} ».',
    retry: 'Réessayer',
    'overwrite-confirm-title': 'Écraser le document ?',
    'overwrite-confirm-message': 'Un document existe déjà à « {name} ». L’écraser remplace son contenu. Êtes-vous sûr ?',

    'path-exists-title': 'Le document existe',
    'path-exists-message': 'Un document ayant ce chemin existe déjà. Supprimez d’abord ce document si vous souhaitez réutiliser le chemin.',

  },

  toast: {
    'region-label': 'Notifications',
    dismiss: 'Ignorer',
  },

  'las-vegas-simulation-panel': {
    title: 'Simulation Las Vegas',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Accepter',
        description: 'Accepter est une cellule qui renvoie TRUE ou FALSE pour accepter ou rejeter un essai. Obligatoire.',
      },
      complete: {
        title: 'Terminer',
        description: 'Terminer est une cellule qui renvoie TRUE pour terminer la simulation, ou un nombre d’essais acceptés. Obligatoire.',
      },
      fail: {
        title: 'Échouer',
        description: 'Échouer est une cellule qui renvoie TRUE pour quitter la simulation, ou un nombre total maximal d’essais. Facultatif.',
      },
    },
    'more-information-link': {
      title: 'Plus d’informations',
    },
    'running-simulation': 'Simulation en cours...',
    'options-overview': 'Saisissez les options pour une simulation Las Vegas.',
  },

  'insert-function': {
    button: {
      title: 'Insérer une fonction...',
    },
    'insert-function': 'Insérer une fonction',
    'search-for-function': 'Rechercher une fonction...',
    'function-result': 'Résultat',
  },

  'function-dialog': {
    'select-function': {
      title: 'Sélectionner une fonction',
    },
  },

  'arguments-dialog': {
    'function-result': 'Résultat',
    volatile: 'volatile',
    'function-help-title': 'Aide sur cette fonction',
  },

  'number-format': {
    general: 'Standard',
    number: 'Nombre',
    integer: 'Entier',
    percent: 'Pourcentage',
    fraction: 'Fraction',
    accounting: 'Comptabilité',
    currency: 'Monétaire',
    scientific: 'Scientifique',

    timestamp: 'Horodatage',
    'long-date': 'Date longue',
    'short-date': 'Date courte',
  },

  'llm-chat': {
    panel: {
      title: 'Assistant IA',
    },
    'settings-tab': {
      title: 'Paramètres',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Changer de modèle ?',
      message: 'Ce modèle utilise un fournisseur différent, la conversation actuelle sera donc effacée. Continuer ?',
      confirm: 'Changer de modèle',
    },
    buttons: {
      'send-message': 'Envoyer',

      'clear-conversation': 'Effacer la conversation',
      save: 'Enregistrer sur le bureau',
      resend: 'Renvoyer le dernier message',
      restart: 'Reprendre depuis le premier message',
    },

    label: {
      'api-key': 'Clé d’API',
      'api-key-placeholder': 'Collez votre clé d’API',
      'reveal-api-key': 'Afficher la clé d’API',
      'hide-api-key': 'Masquer la clé d’API',
      model: 'Modèle',
      'choose-a-model': 'Choisissez un modèle',
      'select-a-model': 'Sélectionnez un modèle',
      header: {
        important: 'Important',
      },
      disclaimer: 'L’interface IA fonctionne en mode « apportez votre propre clé ». Pour l’utiliser, vous devez fournir une clé d’API pour un fournisseur ou un modèle pris en charge.\nNous ne voyons jamais votre clé d’API. Elle reste dans votre navigateur et n’est envoyée au fournisseur officiel que lorsque vous envoyez un message de chat.\nVotre fournisseur de modèle vous facturera les tokens ou selon votre formule d’abonnement.',

      provider_link: 'Page web du fournisseur',
      model_information_link: 'Informations sur le modèle',
      screenshots_disabled: 'Remarque : ce modèle ne prend pas en charge les captures d’écran.',

    },

    activity: {
      thinking: 'Réflexion…',
      working: 'Traitement…',
      running: 'Exécution de {tool}…',
    },

    error: {
      unknown: 'erreur inconnue',
      'unknown-type': 'type inconnu',
    },
  },

  'developer-panel': {
    title: 'Informations pour développeurs',
  },

  'fit-data-panel': {
    'select-range': 'Sélectionner une plage',
    'candidate-distributions': {
      label: 'Distributions candidates',
      description: 'Les candidates sont triées de la plus proche à la plus éloignée de la distribution théorique',
    },
    'log-nomal-graph': {
      description: 'Le graphique log-normal est tracé à l’échelle logarithmique',
    },
    statistics: {
      error: 'Erreur',
      mean_square_error: 'Erreur quadratique moyenne',
      aggregate_error: 'Erreur agrégée',
      max_error: 'Erreur maximale',
      mean_error: 'Erreur moyenne',
    },

    label: {
      'click-to-lock': 'Verrouiller la sélection d’ajustement des données',
      'click-to-unlock': 'Déverrouiller la sélection d’ajustement des données',
    },

    'distribution-parameters': 'Paramètres de la distribution',
    'spreadsheet-function': 'Fonction de feuille de calcul',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Copier dans le presse-papiers',
      error: 'Erreur de copie',
      copied: 'Copié',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Aucune commande correspondante',
    'start-typing': 'Commencez à taper pour trouver une commande',
    'run-highlighted-command': 'Appuyez sur Entrée pour exécuter la commande en surbrillance',
    'command-palette': {
      label: 'Palette de commandes',
    },
  },

  'documents-page': {
    title: 'Documents',

    scope: {
      all: 'Tous les documents',
      starred: 'Favoris',
      recent: 'Récents',
      private: 'Privés',
    },

    rail: {
      label: 'Filtres de documents',
      folders: 'Dossiers',
      'no-folders': 'Aucun dossier',
    },

    search: {
      placeholder: 'Rechercher des documents',
      label: 'Rechercher des documents',
      clear: {
        label: 'Effacer la recherche',
      },
    },
    filter: {
      label: 'Filtrer',
    },

    action: {
      'new-document': 'Nouveau document',
      open: 'Ouvrir',
      duplicate: 'Dupliquer',
      rename: 'Renommer…',
      'delete': 'Supprimer',
      cancel: 'Annuler',
      'make-public': 'Rendre public',
      'make-private': 'Rendre privé',
      'version-history': 'Historique des versions',
    },

    access: {
      public: 'Public',
      private: 'Privé',
    },

    selection: {
      count: '{count} sélectionné(s)',
      'make-public': {
        label: 'Rendre publics les documents sélectionnés',
      },
      'make-private': {
        label: 'Rendre privés les documents sélectionnés',
      },
      'delete': {
        label: 'Supprimer les documents sélectionnés',
      },
    },

    table: {
      label: 'Documents',
      'select-all': {
        label: 'Sélectionner tous les documents',
      },
    },
    column: {
      starred: 'Favori',
      name: 'Nom',
      folder: 'Dossier',
      access: 'Accès',
      version: 'Version',
      modified: 'Modifié',
      actions: 'Actions',
    },

    row: {
      select: {
        label: 'Sélectionner {name}',
      },
      star: {
        label: 'Ajouter {name} aux favoris',
      },
      unstar: {
        label: 'Retirer {name} des favoris',
      },
      menu: {
        label: 'Actions pour {name}',
      },
      unnamed: {
        title: 'Ce document n’a pas encore de nom',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Supprimer le document, êtes-vous sûr ?',
      confirm_delete_documents: 'Supprimer les documents, êtes-vous sûr ?',
    },

    error: {
      title: 'Impossible de charger vos documents',
      detail: 'Le chargement a échoué en raison d’une erreur. Réessayez plus tard.',
      retry: 'Réessayer',
    },

    messages: {
      rename_failed: 'Échec du renommage. Réessayez plus tard.',
      rename_succeeded: 'Document renommé',

      delete_failed: 'Échec de la suppression. Réessayez plus tard.',
      one_document_deleted: 'Document supprimé',
      multiple_documents_deleted: 'Documents supprimés',

      update_failed: 'Échec de la mise à jour. Réessayez plus tard.',

      duplicate_succeeded: 'Document créé',
      duplicate_failed: 'Échec de la duplication. Réessayez plus tard.',

      restore_succeeded: 'Document restauré',
      restore_failed: 'Échec de la restauration. Réessayez plus tard.',

    },

    empty: {
      title: 'Aucun document pour l’instant',
      detail: 'Les feuilles de calcul que vous créez ou importez apparaîtront ici, avec leur historique des versions.',
    },

    'no-match': {
      title: 'Aucun document ne correspond à « {query} »',
      detail: 'La recherche couvre tous les dossiers. Essayez un terme plus court.',
      action: 'Effacer la recherche',
    },

    'empty-filter': {
      title: 'Rien ici',
      detail: 'Aucun document ne correspond à ce filtre.',
      'detail-folder': 'Aucun document dans {folder}.',
      action: 'Afficher tous les documents',
    },

    footer: {
      count: {
        one: '{count} document',
        other: '{count} documents',
      },
      filtered: '{count} sur {total} documents',
      'searching-all': 'recherche dans tous les dossiers',
    },

    panel: {
      label: 'Détails du document',
      open: {
        title: 'Ouvrir le document',
      },
      close: {
        label: 'Fermer les détails',
      },
      'copy-link': {
        label: 'Copier le lien',
        copied: {
          label: 'Lien copié',
          title: 'Copié',
        },
      },
      'unnamed-hint': 'Pas encore de nom — ceci est l’adresse. Le renommage en attribue un.',
      star: {
        label: 'Ajouter ce document aux favoris',
      },
      unstar: {
        label: 'Retirer ce document des favoris',
      },
      field: {
        access: 'Accès',
        starred: 'Favori',
        created: 'Créé',
        modified: 'Modifié',
        version: 'Version',
      },
    },

    history: {
      title: 'Versions antérieures',
      loading: 'Chargement de l’historique des versions',
      error: 'Impossible de charger l’historique des versions.',
      retry: 'Réessayer',
      menu: {
        label: 'Actions pour la version {version}',
      },
      open: {
        text: 'Ouvrir cette version',
        label: 'Ouvrir la version {version}',
      },
      duplicate: 'Dupliquer en tant que nouveau document',
      restore: 'Restaurer',
      none: 'Aucune version antérieure pour l’instant. Elles apparaissent ici au fur et à mesure que vous enregistrez.',
      kept: {
        one: 'Une version antérieure est conservée.',
        other: 'Les {count} dernières versions antérieures sont conservées.',
      },
    },

    time: {
      'just-now': 'à l’instant',
      minutes: {
        one: 'il y a {count} minute',
        other: 'il y a {count} minutes',
      },
      hours: {
        one: 'il y a {count} heure',
        other: 'il y a {count} heures',
      },
      days: {
        one: 'il y a {count} jour',
        other: 'il y a {count} jours',
      },
      today: 'aujourd’hui, {time}',
      yesterday: 'hier, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Document',
    },
    'updated-date': {
      label: 'Modifié',
    },
    'created-date': {
      label: 'Créé',
    },
    access: {
      label: 'Accès',
      'type-private': 'Privé',
      'type-public': 'Public',
    },
    'filter-documents': {
      label: 'Filtrer les documents',
    },

    controls: {
      'delete-selected': 'Supprimer la sélection',
      'make-public': 'Rendre public',
      'make-private': 'Rendre privé',
    },
  },

  'account-page': {
    title: 'Compte',
  },

  'sign-in': {
    page: {
      title: 'Se connecter',
    },
    form: {
      username: {
        placeholder: 'Nom d’utilisateur ou e-mail',
      },
      password: {
        placeholder: 'Mot de passe',
      },
      'sign-in-button': {
        label: 'Se connecter',
      },
      'remember-me': 'Se souvenir de moi sur cet appareil',
      instructions: 'Saisissez votre nom d’utilisateur et votre mot de passe pour vous connecter',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Mot de passe oublié',
      },
      'create-account': {
        text: 'Créer un compte',
      },
      'sign-in': {
        text: 'Se connecter',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Mot de passe oublié',
    },
    form: {
      instructions: 'Saisissez votre adresse e-mail pour réinitialiser votre mot de passe',
      email: {
        placeholder: 'Adresse e-mail',
      },
      'reset-password-button': {
        label: 'Réinitialiser le mot de passe',
      },
    },
  },

  'privacy-policy': {
    page: {
      title: 'Politique de confidentialité',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Conditions d’utilisation',
    },
  },

  'create-account': {
    page: {
      title: 'Créer un compte',
    },
  },
  'create-password': {
    page: {
      title: 'Créer un mot de passe',
    },
  },
  'update-password': {
    page: {
      title: 'Mettre à jour le mot de passe',
    },
  },

  'theme-toggle': {
    'light-theme': 'Thème clair',
    'dark-theme': 'Thème sombre',
    'system-theme': 'Thème système',
  },

  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Utiliser le thème sombre',
        alt: 'jeu de couleurs',
      },

      'light-theme': {
        label: 'Utiliser le thème clair',
        alt: 'jeu de couleurs',
      },

      'system-theme': {
        label: 'Utiliser le thème système',
        alt: 'jeu de couleurs clair sombre',
      },
    },

    'remove-hyperlink': {
      label: 'Supprimer le lien hypertexte',
      alt: 'supprimer effacer lien',
    },

    'insert-hyperlink': {
      label: 'Insérer un lien hypertexte',
      alt: 'ajouter définir lien',

      parameter: {
        url: {
          label: 'Saisissez l’adresse du lien (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Ajouter ou modifier un commentaire de cellule',
      alt: 'note commentaire',

      parameter: {
        comment: {
          label: 'Saisissez un commentaire. Appuyez sur Ctrl + Entrée pour enregistrer.',
          'label-mac': 'Saisissez un commentaire. Appuyez sur Cmd + Entrée pour enregistrer.',
        },
      },
    },

    'remove-comment': {
      label: 'Supprimer le commentaire de cellule',
      alt: 'note',
    },

    'reset-background-color': {
      label: 'Réinitialiser la couleur de fond de la sélection',
      alt: 'effacer remplissage',
    },

    'set-background-color': {
      label: 'Définir la couleur de fond de la sélection',
      alt: 'remplissage',
    },

    'reset-text-color': {
      label: 'Réinitialiser la couleur du texte de la sélection',
      alt: 'effacer premier plan',
    },

    'set-text-color': {
      label: 'Définir la couleur du texte de la sélection',
      alt: 'premier plan',
    },

    'reset-border-color': {
      label: 'Réinitialiser la couleur de bordure de la sélection',
      alt: 'effacer',
    },

    'set-border-color': {
      label: 'Définir la couleur de bordure de la sélection',
    },

    'borders-clear': {
      label: 'Bordures : effacer les bordures',
    },
    'border-top': {
      label: 'Bordures : appliquer la bordure supérieure à la sélection',
    },
    'border-bottom': {
      label: 'Bordures : appliquer la bordure inférieure à la sélection',
    },
    'border-double-bottom': {
      label: 'Bordures : appliquer la double bordure inférieure à la sélection',
    },
    'border-left': {
      label: 'Bordures : appliquer la bordure gauche à la sélection',
    },
    'border-right': {
      label: 'Bordures : appliquer la bordure droite à la sélection',
    },

    'border-outside': {
      label: 'Bordures : appliquer la bordure extérieure à la sélection',
      alt: 'externe',
    },

    'border-all': {
      label: 'Bordures : appliquer toutes les bordures à la sélection',
    },

    'reset-font-scale': {
      label: 'Réinitialiser l’échelle de police',
      alt: 'texte taille de police',
    },

    'font-scale-increase': {
      label: 'Échelle de police : augmenter de 10 %',
      alt: 'texte taille de police',
    },

    'font-scale-decrease': {
      label: 'Échelle de police : diminuer de 10 %',
      alt: 'texte taille de police',
    },

    'insert-donut-chart': {
      label: 'Insérer un graphique en anneau',
      alt: 'graphique diagramme',
    },

    'insert-column-chart': {
      label: 'Insérer un graphique en colonnes',
      alt: 'graphique diagramme',
    },

    'insert-bar-chart': {
      label: 'Insérer un graphique à barres',
      alt: 'graphique diagramme',
    },

    'insert-line-chart': {
      label: 'Insérer un graphique en courbes',
      alt: 'graphique diagramme',
    },

    'insert-scatter-plot': {
      label: 'Insérer un nuage de points',
      alt: 'graphique diagramme',
    },

    'insert-box-plot': {
      label: 'Insérer une boîte à moustaches',
      alt: 'graphique diagramme moustaches',
    },

    'insert-image': {
      label: 'Insérer une image',
    },

    'cf-gradient-red-green': {
      label: 'Mise en forme conditionnelle dégradé : rouge-vert',
    },
    'cf-gradient-green-red': {
      label: 'Mise en forme conditionnelle dégradé : vert-rouge',
    },
    'cf-unique-values': {
      label: 'Mise en forme conditionnelle : valeurs uniques',

      parameter: {
        color: {
          label: 'Sélectionnez la couleur des valeurs uniques',
        },
      },
    },

    'cf-data-bars': {
      label: 'Mise en forme conditionnelle : barres de données',
      alt: 'barre de données',

      parameter: {
        color: {
          label: 'Sélectionnez la couleur des barres de données',
        },
        'hide-values': {
          label: 'Masquer les valeurs ?',
          choice: {
            'true': 'Oui, masquer les valeurs',
            'false': 'Non, afficher les valeurs',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Mise en forme conditionnelle : valeurs en double',

      parameter: {
        color: {
          label: 'Sélectionnez la couleur des valeurs en double',
        },
      },
    },

    'cf-clear': {
      label: 'Effacer la mise en forme conditionnelle de la sélection',
      alt: 'supprimer',
    },

    'fit-column-widths': {
      label: 'Ajuster la largeur des colonnes sélectionnées (ajustement automatique)',
    },

    'fit-data': {
      label: 'Ajuster les données',
      alt: 'ajuster',
    },

    'named-ranges': {
      label: 'Plages et expressions nommées',
      alt: 'gestionnaire de noms définir un nom supprimer un nom effacer',
    },

    'set-tab-color': {
      label: 'Définir la couleur de l’onglet',
    },

    'reset-tab-color': {
      label: 'Réinitialiser la couleur de l’onglet',
      alt: 'effacer supprimer',
    },

    'fit-row-heights': {
      label: 'Ajuster la hauteur des lignes sélectionnées (ajustement automatique)',
    },

    'correlation-matrix': {
      label: 'Vérifier la matrice de corrélation',
    },

    'hide-sheet': {
      label: 'Masquer la feuille',
      alt: 'visible',
    },

    'unhide-all-sheets': {
      label: 'Afficher toutes les feuilles',
      alt: 'visible',
    },

    'unhide-columns': {
      label: 'Afficher les colonnes masquées de la feuille',
    },
    'unhide-rows': {
      label: 'Afficher les lignes masquées de la feuille',
    },
    'hide-rows': {
      label: 'Masquer les lignes sélectionnées',
    },
    'hide-columns': {
      label: 'Masquer les colonnes sélectionnées',
    },

    'las-vegas-simulation': {
      label: 'Simulation Las Vegas...',
    },
    'simulation-settings': {
      label: 'Paramètres de simulation...',
    },
    'language-settings': {
      label: 'Paramètres de langue...',
    },

    'load-desktop-file': {
      label: 'Charger un fichier du bureau...',
      alt: 'excel csv importer',
    },

    'save-xlsx': {
      label: 'Enregistrer en XLSX',
      alt: 'télécharger excel',
    },

    'save-csv': {
      label: 'Enregistrer la feuille actuelle en CSV',
      alt: 'télécharger exporter',
    },

    'save-to-cloud': {
      label: 'Enregistrer dans le cloud',
    },

    'load-document': {
      label: 'Charger un document...',
      alt: 'ouvrir',
    },

    'download-json': {
      label: 'Télécharger sur le bureau (JSON)',
      alt: 'enregistrer',
    },

    'insert-function': {
      label: 'Insérer une fonction...',
    },
    find: {
      label: 'Rechercher dans les valeurs/formules...',
    },
    'insert-distribution': {
      label: 'Insérer une distribution aléatoire...',
    },
    'run-simulation': {
      label: 'Lancer la simulation...',
    },
    'quick-view': {
      label: 'Aperçu rapide...',
    },
    'new-model': {
      label: 'Nouveau modèle',
    },
    'revert-file': {
      label: 'Rétablir le fichier',
    },
    recalculate: {
      label: 'Recalculer',
    },
    undo: {
      label: 'Annuler',
    },
    'delete-columns': {
      label: 'Supprimer les colonnes sélectionnées',
    },
    'delete-rows': {
      label: 'Supprimer les lignes sélectionnées',
    },
    'insert-column': {
      label: 'Insérer une colonne',
    },
    'insert-row': {
      label: 'Insérer une ligne',
    },
    'set-view-scale': {
      label: 'Définir l’échelle d’affichage (zoom)',

      parameter: {
        scale: {
          label: 'Saisissez l’échelle d’affichage',
        },
      },
    },
    'reset-view-scale': {
      label: 'Réinitialiser l’échelle d’affichage (zoom)',
    },

    'rename-tab': {
      label: 'Renommer l’onglet',
      alt: 'feuille page',

      parameter: {
        name: {
          label: 'Saisissez un nom pour cet onglet',
        },
      },
    },

    'add-tab': {
      label: 'Ajouter un onglet',
      alt: 'feuille page',

      parameter: {
        name: {
          label: 'Saisissez un nom pour le nouvel onglet',
        },
      },
    },

    'delete-tab': {
      label: 'Supprimer l’onglet',
      alt: 'feuille page',
    },

    'increase-indent': {
      label: 'Augmenter le retrait',
      alt: 'plus',
    },

    'decrease-indent': {
      label: 'Diminuer le retrait',
      alt: 'moins',
    },

    'number-format-increase-precision': {
      label: 'Format de nombre : ajouter une décimale',
      alt: 'plus de décimales',
    },

    'number-format-decrease-precision': {
      label: 'Format de nombre : supprimer une décimale',
      alt: 'moins de décimales',
    },

    'number-format': {
      label: 'Format de nombre',
      alt: 'format de nombre personnalisé',

      parameter: {
        format: {
          label: 'Saisissez un format de nombre ou un nom symbolique',
        },
      },
    },

    'merge-cells': {
      label: 'Fusionner les cellules sélectionnées',
    },
    'unmerge-cells': {
      label: 'Annuler la fusion des cellules sélectionnées',
    },
    'lock-cells': {
      label: 'Verrouiller les cellules sélectionnées',
    },
    'unlock-cells': {
      label: 'Déverrouiller les cellules sélectionnées',
    },

    'valign-top': {
      label: 'Mise en forme de la sélection : aligner verticalement en haut',
    },
    'valign-bottom': {
      label: 'Mise en forme de la sélection : aligner verticalement en bas',
    },
    'valign-middle': {
      label: 'Mise en forme de la sélection : centrer verticalement',
    },

    'align-left': {
      label: 'Mise en forme de la sélection : aligner le texte à gauche',
      alt: 'alignement horizontal',
    },

    'align-right': {
      label: 'Mise en forme de la sélection : aligner le texte à droite',
      alt: 'alignement horizontal',
    },

    'align-center': {
      label: 'Mise en forme de la sélection : centrer le texte',
      alt: 'alignement horizontal justifier',
    },

    'toggle-word-wrap': {
      label: 'Mise en forme de la sélection : activer/désactiver le renvoi à la ligne',
    },

    'toggle-gridlines': {
      label: 'Activer/désactiver le quadrillage dans la feuille active',
    },
    'show-gridlines': {
      label: 'Afficher le quadrillage dans la feuille active',
    },
    'hide-gridlines': {
      label: 'Masquer le quadrillage dans la feuille active',
    },

    'toggle-bold': {
      label: 'Mise en forme de la sélection : activer/désactiver le gras',
    },
    'toggle-italic': {
      label: 'Mise en forme de la sélection : activer/désactiver l’italique',
    },
    'toggle-underline': {
      label: 'Mise en forme de la sélection : activer/désactiver le soulignement',
    },
    'toggle-strikethrough': {
      label: 'Mise en forme de la sélection : activer/désactiver le barré',
    },

    'reset-text-formatting': {
      label: 'Mise en forme de la sélection : réinitialiser la mise en forme du texte',
      alt: 'effacer',
    },
  },

  'correlation-matrix': {
    'title': 'Matrice de corrélation',
    'accept-changes': 'Accepter les modifications',
    'close-dialog': 'Fermer',

    'invalid-shape': 'Veuillez sélectionner une matrice carrée d’au moins 2x2 cellules.',
    'invalid-data': 'La matrice de corrélation doit avoir une diagonale unitaire.\nChaque cellule de la diagonale doit être égale à {unit}.',
    'asymmetric': 'La matrice de corrélation doit être symétrique, ou vous pouvez omettre la partie triangulaire supérieure ou inférieure.',

    'solution-text': `La matrice de corrélation n’est pas définie positive. Nous avons trouvé une solution en apportant de légers ajustements aux valeurs. L’erreur agrégée est de {error}.`,
    'positive-definite': `La matrice de corrélation est définie positive.`,

  },

  'sign-in-page': {
    heading: 'Se connecter',
    subtitle: 'Saisissez votre nom d’utilisateur et votre mot de passe pour vous connecter.',

    username: {
      label: 'Nom d’utilisateur ou e-mail',
      required: 'Saisissez votre nom d’utilisateur ou votre e-mail.',
    },

    password: {
      label: 'Mot de passe',
      required: 'Saisissez votre mot de passe.',
      show: {
        label: 'Afficher le mot de passe',
      },
      hide: {
        label: 'Masquer le mot de passe',
      },
      'caps-lock': 'Le verrouillage des majuscules est activé.',
    },

    remember: {
      label: 'Se souvenir de moi sur cet appareil',
    },

    submit: {
      label: 'Se connecter',
      pending: 'Connexion…',
    },

    error: {
      rejected: 'Nom d’utilisateur ou mot de passe incorrect.',
      unreachable: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
      incomplete: 'La connexion ne s’est pas terminée. Réessayez.',
    },

    link: {
      'forgot-password': 'Mot de passe oublié',
      'create-account': 'Créer un compte',
    },
  },

  'backstage-form': {
    email: {
      required: 'Saisissez votre adresse e-mail.',
      invalid: 'Cela ne ressemble pas à une adresse e-mail.',
    },

    username: {
      required: 'Choisissez un nom d’utilisateur.',
      'too-short': 'Les noms d’utilisateur comportent au moins {min} caractères.',
      'too-long': 'Les noms d’utilisateur comportent au maximum {max} caractères.',
      invalid: 'Utilisez des lettres, des chiffres, des traits d’union et des traits de soulignement, en commençant par une lettre.',
    },

    password: {
      required: 'Choisissez un mot de passe.',
      'too-short': 'Les mots de passe comportent au moins {min} caractères.',
    },
  },

  'create-account-page': {
    heading: 'Créer un compte',

    subtitle: 'Nous demandons une adresse e-mail et un nom d’utilisateur car les documents sont stockés sous votre nom d’utilisateur.',

    terms: {
      text: 'Veuillez consulter nos {link}.',
      link: 'conditions de service',
    },

    email: {
      label: 'Adresse e-mail',
      taken: 'Il existe déjà un compte avec cette adresse e-mail.',
    },

    username: {
      label: 'Nom d’utilisateur',
      taken: '@{username} est déjà pris.',
      reserved: '@{username} n’est pas disponible.',
      checking: 'Vérification de la disponibilité…',
      available: '@{username} est disponible.',
    },

    handle: {
      example: '@{username}/exemple',
      placeholder: 'utilisateur',
    },

    after: 'Nous vous enverrons par e-mail un lien pour confirmer votre adresse et créer un mot de passe.',

    submit: {
      label: 'Créer un compte',
      pending: 'Création du compte…',
    },

    error: {
      unreachable: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
      rejected: 'Ce compte n’a pas pu être créé. Vérifiez vos informations et réessayez.',
    },

    done: {
      heading: 'Consultez votre messagerie',
      body: 'Nous avons envoyé un lien à {email}. Ouvrez-le pour confirmer votre adresse et choisir un mot de passe.',
      spam: 'Rien reçu ? Patientez une minute, puis vérifiez votre dossier de spam.',
      restart: 'Utiliser une adresse différente',
    },

    link: {
      'forgot-password': 'Mot de passe oublié',
      'sign-in': 'Se connecter',
    },
  },

  'forgot-password-page': {
    heading: 'Mot de passe oublié',
    subtitle: 'Saisissez votre adresse e-mail et nous vous enverrons un lien pour choisir un nouveau mot de passe.',

    email: {
      label: 'Adresse e-mail',
    },

    submit: {
      label: 'Envoyer le lien',
      pending: 'Envoi…',
    },

    error: {
      unreachable: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
    },

    done: {
      heading: 'Consultez votre messagerie',
      body: 'S’il existe un compte pour {email}, nous lui avons envoyé un lien. Ouvrez-le pour choisir un nouveau mot de passe.',
      spam: 'Rien reçu ? Patientez une minute, puis vérifiez votre dossier de spam.',
      restart: 'Utiliser une adresse différente',
    },

    link: {
      'sign-in': 'Se connecter',
      'create-account': 'Créer un compte',
    },
  },

  'create-password-page': {
    heading: 'Créer un mot de passe',
  },

  'update-password-page': {
    heading: 'Choisir un nouveau mot de passe',
    subtitle: 'Saisissez le jeton du lien que nous vous avons envoyé.',

    identifier: {
      label: 'Nom d’utilisateur ou e-mail',
      required: 'Saisissez votre nom d’utilisateur ou votre e-mail.',
    },

    token: {
      label: 'Jeton',
      required: 'Saisissez le jeton du lien que nous vous avons envoyé.',
      invalid: 'Ce jeton n’est pas valide. Vérifiez le lien ou demandez-en un nouveau.',
      expired: 'Ce lien a expiré. Demandez-en un nouveau.',
      used: 'Ce lien a déjà été utilisé. Demandez-en un nouveau.',
    },

    password: {
      label: 'Nouveau mot de passe',
      show: {
        label: 'Afficher le mot de passe',
      },
      hide: {
        label: 'Masquer le mot de passe',
      },
      'caps-lock': 'Le verrouillage des majuscules est activé.',

      common: 'Ce mot de passe est trop facile à deviner. Choisissez-en un autre.',
    },

    strength: {
      title: 'Robustesse du mot de passe',

      weak: 'Faible',
      fair: 'Moyen',
      good: 'Bon',
      strong: 'Fort',
    },

    submit: {
      label: 'Mettre à jour le mot de passe',
      pending: 'Mise à jour…',
    },

    error: {
      unreachable: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.',
      rejected: 'Ce mot de passe n’a pas pu être mis à jour. Vérifiez vos informations et réessayez.',
    },

    done: {
      heading: 'Mot de passe mis à jour',
      body: 'Votre nouveau mot de passe a été enregistré.',
      'continue': 'Continuer vers l’application',
    },

    link: {
      'sign-in': 'Se connecter',
      'forgot-password': 'Envoyer un nouveau lien',
    },
  },

  'new-document': {
    'discard-changes-message': 'Vous avez des modifications non enregistrées. Êtes-vous sûr ?',
    'discard-changes-confirm': 'Nouveau document',
  },

  'status-pill': {
    messages: {
      'unsaved-changes': 'Modifications non enregistrées',
    },
  },

} satisfies DeepPartial<I18N>;
