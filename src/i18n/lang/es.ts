
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
    title: 'Prueba',
  },
  'update-language': {
    title: 'Configuración de idioma...',
  },

  'select-language-dialog': {
    'title': 'Seleccionar idioma',
  },

  about: {
    tagline: 'Análisis de riesgo Monte Carlo para la web.',
    build: 'Compilación {commit}',
    copyright: '© {year} Structured Data LLC. Todos los derechos reservados.',
    website: 'riskamp.com',
    report: 'Informar de un problema',
    'report-subject': 'RiskAMP web — informe de problema',
    'report-body': '(describe el problema aquí)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nBuild: {commit}\nNavegador: {ua}\nIdioma: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Archivo',
      help: 'Ayuda',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Datos y análisis',
      tools: 'Herramientas',
      account: 'Cuenta',
    },

    'menu-commands': {
      documents: 'Documentos',
      'account-page': 'Página de cuenta',
      'sign-out': 'Cerrar sesión',
    },

    tabs: {
      home: 'Inicio',
      layout: 'Diseño',
      format: 'Formato',
      insert: 'Insertar',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Datos y análisis',
    },

    menu: {
      'about-riskamp': 'Acerca de RiskAMP web',
      'function-documentation': 'Documentación de funciones de RiskAMP',
      walkthrough: 'Modelo de demostración',
    },

    button: {
      'toggle-fullscreen': 'Pantalla completa',

      'new-spreadsheet': 'Nueva hoja de cálculo',
      'import-file': 'Importar archivo',
      'open-file': 'Abrir archivo',
      'save-file': 'Guardar archivo',
      'save-file-as': 'Guardar como...',
      'revert-file': 'Revertir archivo',
      'save-to-desktop': 'Guardar en el escritorio',
      'export-xlsx': 'Exportar XLSX',
      'export-csv': 'Exportar CSV',

      'sign-in': 'Iniciar sesión',
      'create-account': 'Crear cuenta',

      'search-cells': {
        label: 'Buscar celdas',
      },
      'defined-names': {
        label: 'Nombres definidos',
      },
      'fit-data': {
        label: 'Ajustar datos',
      },
      notes: {
        label: 'Notas',
      },

      'monte-carlo-simulation': {
        label: 'Simulación Monte Carlo',
      },
      'run-simulation': {
        label: 'Ejecutar simulación',
      },
      'run-simulation-again': {
        label: 'Ejecutar simulación de nuevo',
      },
      'las-vegas-simulation': {
        label: 'Simulación Las Vegas',
      },
      'simulation-settings': {
        label: 'Configuración de la simulación',
      },
      'quick-view': {
        label: 'Vista rápida',
      },
      'quick-view-correlation': {
        label: 'Correlación de vista rápida',
      },
      recalculate: {
        label: 'Recalcular',
      },

      'align-left': {
        label: 'Alinear a la izquierda',
      },
      'align-center': {
        label: 'Centrar',
      },
      'align-right': {
        label: 'Alinear a la derecha',
      },

      'align-top': {
        label: 'Alinear arriba',
      },
      'align-middle': {
        label: 'Alinear al medio',
      },
      'align-bottom': {
        label: 'Alinear abajo',
      },

      'increase-indent': {
        label: 'Aumentar sangría',
      },
      'decrease-indent': {
        label: 'Disminuir sangría',
      },
      'wrap-text': {
        label: 'Ajustar texto',
      },

      'toggle-integer-grouping': {
        label: 'Separador de miles',
      },
      'increase-decimal-precision': {
        label: 'Aumentar decimales',
      },
      'decrease-decimal-precision': {
        label: 'Disminuir decimales',
      },

      'merge-cells': {
        label: 'Combinar celdas',
      },
      'unmerge-cells': {
        label: 'Separar celdas',
      },

      'lock-cells': {
        label: 'Bloquear celdas para edición',
      },
      'unlock-cells': {
        label: 'Desbloquear celdas para edición',
      },

      bold: {
        label: 'Alternar negrita',
      },
      italic: {
        label: 'Alternar cursiva',
      },
      underline: {
        label: 'Alternar subrayado',
      },
      strikethrough: {
        label: 'Alternar tachado',
      },

      'insert-row': {
        label: 'Insertar fila',
      },
      'insert-column': {
        label: 'Insertar columna',
      },
      'delete-row': {
        label: 'Eliminar fila',
      },
      'delete-column': {
        label: 'Eliminar columna',
      },

      'text-color': {
        label: 'Color de texto',
      },
      'background-color': {
        label: 'Color de fondo',
      },
      'border-color': {
        label: 'Color de borde',
      },

      'border-top': {
        title: 'Borde superior',
      },
      'border-bottom': {
        title: 'Borde inferior',
      },
      'border-double-bottom': {
        title: 'Borde inferior doble',
      },
      'border-left': {
        title: 'Borde izquierdo',
      },
      'border-right': {
        title: 'Borde derecho',
      },
      'border-all': {
        title: 'Todos los bordes',
      },
      'border-none': {
        title: 'Quitar bordes',
      },
      'border-outside': {
        title: 'Bordes exteriores',
      },

      'correlation-matrix': {
        title: 'Matriz de correlación',
      },

      sparkline: 'Minigráfico',
      'sparkline-column': 'Minigráfico de columnas',
      'sparkline-line': 'Minigráfico de líneas',

      insert: {
        'bar-chart': 'Gráfico de barras',
        'donut-chart': 'Gráfico de anillos',
        'column-chart': 'Gráfico de columnas',
        'line-chart': 'Gráfico de líneas',
        'scatter-plot': 'Gráfico de dispersión',
        'area-chart': 'Gráfico de áreas',
        image: 'Imagen',

        comment: 'Comentario',
        table: 'Tabla',
      },

      forecast: 'Previsión de tendencias',
    },

    'open-menu': 'Abrir menú',

    'more-commands-button': {
      label: 'Más comandos...',
    },

    combobox: {
      'font-size': {
        label: 'Tamaño de fuente',
      },
      'number-format': {
        label: 'Formato de número',
      },
    },

    label: {
      'spreadsheet-cells': 'Celdas de la hoja de cálculo',
    },

    message: {
      'changes-stored-in-browser': 'Los cambios se conservan en el almacenamiento del navegador hasta que los guardes o los reviertas.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'Documentación de RiskAMP',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Atrás',
        forward: 'Adelante',
      },
    },
    label: {
      'close-sidebar': 'Cerrar barra lateral',
    },

    simulation_settings: {
      'random-sampling': {
        'section-header': 'Muestreo aleatorio',
        'explanatory-text': 'El método de muestreo se guardará con esta hoja de cálculo.\nEl valor que selecciones aquí también se usará como predeterminado para las nuevas hojas de cálculo.',
      },

      'random-seed': {
        'section-header': 'Semilla aleatoria',
        'explanatory-text': 'La semilla aleatoria se guardará con esta hoja de cálculo.\nIntroduce un número para usar una semilla fija, o introduce 0 para usar una semilla aleatoria en cada simulación.',

        'enter-seed-value': 'Introducir semilla',
        'seed-value': 'Valor de la semilla',
        'reset-seed-value': 'Restablecer semilla',
        'time-based-seed': 'Usar una semilla basada en el tiempo',
      },

      title: 'Configuración de la simulación',
      'latin-hypercube-sampling': 'Muestreo por hipercubo latino (LHS)',
      'standard-random-sampling': 'Muestreo aleatorio estándar',

      'fixed-random-seed': 'Semilla fija',
      'seed-value-placeholder-text': 'Valor de la semilla',
    },

    'notes-panel': {
      title: 'Notas',
      'open-notes-with-spreadsheet': 'Abrir las notas con la hoja de cálculo',
      edit_markdown: 'Editar markdown',
      view_formatted: 'Ver con formato',
    },
    'fit-data-panel': {
      title: 'Ajustar datos',
    },
  },

  'color-picker': {
    choose_color: 'Elegir color',
    use_selected_color: 'Usar el color seleccionado',
    theme_colors: 'Colores del tema',
    other_colors: 'Otros colores',
    no_color: 'Sin color',
    new_color: 'Nuevo color',
    default_text_color: 'Color de texto predeterminado',
    default_border_color: 'Color de borde predeterminado',
    no_fill: 'Sin relleno',

    theme: {
      background: 'Fondo',
      text: 'Texto',
      accent: 'Énfasis',
      lighter: 'Más claro',
      darker: 'Más oscuro',
    },
  },

  'names-panel': {
    title: 'Nombres definidos',
    header: {
      name: 'Nombre',
      'name-scope': 'Ámbito',
      value: 'Valor',
    },
    'name-scope': {
      sheet: 'Hoja',
      workbook: 'Libro',
    },
    label: {
      'delete-name': 'Eliminar nombre',
      'define-name': 'Definir nombre',
      'edit-name': 'Editar nombre',
    },
    'name-type': {
      reference: 'Referencia',
      expression: 'Expresión',
    },
  },

  'search-panel': {
    title: 'Buscar celdas',
    'search-text': {
      placeholder: 'Buscar texto',
    },
    'search-in': {
      text: 'Buscar en',
    },
    'search-type': {
      'cell-values': 'Valores',
      'cell-formulas': 'Fórmulas',
      wildcards: 'Comodines',
    },
    'search-scope': {
      'current-sheet': 'Hoja actual',
      'all-sheets': 'Todas las hojas',
    },
    'search-results': {
      header: {
        address: 'Dirección',
        value: 'Valor',
        formula: 'Fórmula',
      },
      information: {
        'enter-text': 'Introduce texto para buscar',
        result: 'resultado',
        results: 'resultados',
      },
    },
  },
  'forecast-dialog': {
    title: 'Previsión de tendencias',
    parameters: {
      dates: {
        title: 'Fechas',
      },
      values: {
        title: 'Valores',
      },
      periods: 'Períodos de previsión',
      seasonality: 'Estacionalidad',

      'fill-empty': 'Rellenar',
      'aggregate-multiple': 'Agregar',
      'project-forward-periods': 'Períodos',
      'chart-type': {
        label: 'Tipo de gráfico',
      },
      'chart-type-line-chart': 'Líneas',
      'chart-type-column-chart': 'Columnas',
    },
    options: {
      'model-type': 'Modelo',
      'forecast-type': 'Tipo de previsión',
    },
    'model-type': {
      'excel-compatible-forecast': 'Compatible con Excel',
      'static-forecast': 'Estática',
      'stochastic-forecast': 'Estocástica',
    },
    settings: 'Configuración',
    'create-forecast-sheet': 'Crear hoja de previsión',
    seasonality: {
      'auto-detect': 'Detectar automáticamente',
    },
    'fill-options': {
      interpolate: 'Interpolar',
      zeros: 'Ceros',
    },
    'aggregate-options': {
      average: 'Promedio',
      median: 'Mediana',
      min: 'Mín',
      max: 'Máx',
      sum: 'Suma',
      count: 'Recuento',
    },

    'chart-labels': {
      values: 'Valores',
      forecast: 'Previsión',
    },
  },

  'forecast-sheet-timeline-header': 'Cronología',
  'forecast-sheet-values-header': 'Valores',
  'forecast-sheet-forecast-header': 'Previsión',
  'forecast-sheet-sample-header': 'Muestra',
  'forecast-sheet-statistics-header': 'Estadísticas',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Media',
    },
    'p80-range': {
      header: 'Rango P80',
    },
  },

  'sparkline-dialog': {
    title: 'Insertar minigráfico',
    parameters: {
      target: {
        title: 'Celda de destino',
        'overwrite-warning': 'Los datos del rango de destino se sobrescribirán',
        'merge-warning': 'Las celdas seleccionadas se combinarán para el minigráfico',
      },
      source: {
        title: 'Rango de datos de origen',
      },
    },
    info: 'Usa los colores de primer plano y de fondo de la celda para dar estilo al minigráfico',

    'sparkline-type': 'Tipo de minigráfico',
    'sparkline-type-line-chart': 'Líneas',
    'sparkline-type-column-chart': 'Columnas',
  },

  'quick-view-dialog': {
    title: 'Vista rápida',
    'select-cell': 'Seleccionar celda',
    'tab-histogram': 'Histograma',
    'tab-box-plot': 'Diagrama de caja',
    'show-statistics': 'Estadísticas',
    'histogram-bin-algorithm-long': 'Algoritmo de intervalos',
    'histogram-bin-algorithm-short': 'Intervalos',
    'bin-algorithm-automatic': 'Auto',
    'box-plot-whisker-type-long': 'Tipo de bigote',
    'box-plot-whisker-type-short': 'Bigotes',
    'box-plot-whisker-type-minmax': 'Mín/máx',
    'box-plot-whisker-type-interquartile-range': 'RIC',
    'no-data': 'No hay datos de simulación para la celda seleccionada. Ejecuta una simulación con el botón de abajo para recopilar datos de esta celda.\n\nLos datos de simulación se recopilarán automáticamente cuando una función estadística (como SimulationMean) haga referencia a una celda.',

    'stats-label': {
      min: 'Mín',
      max: 'Máx',
      first_quartile: '1.er cuartil',
      third_quartile: '3.er cuartil',
      median: 'Mediana',
      'interquartile-range': 'RIC',
      mean: 'Media',
      variance: 'Varianza',
      'standard-deviation': 'DesvEst',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Bloquear la selección de la vista rápida',
        'click-to-unlock': 'Desbloquear la selección de la vista rápida',
        'return-to-selection': 'Volver a la celda seleccionada',
        'selection-locked': 'Selección bloqueada',
      },
    },
  },

  'dialog-close-label': 'Cerrar',
  'dialog-close-title': 'Cerrar diálogo',
  'dialog-help-title': 'Ayuda',

  'standard-buttons': {
    close: {
      label: 'Cerrar',
      title: 'Cerrar diálogo',
    },
    ok: {
      title: 'Aceptar',
    },
    back: {
      title: 'Atrás',
    },
    yes: {
      title: 'Sí',
    },
    no: {
      title: 'No',
    },
    accept: {
      title: 'Aceptar',
    },
    cancel: {
      title: 'Cancelar',
    },
  },

  'confirm-dialog': {
    title: '¿Estás seguro?',
    'alert-title': 'Aviso',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    ok: 'Aceptar',
  },

  'run-simulation-dialog-title': 'Simulación Monte Carlo',
  'run-simulation': {
    'number-of-trials': 'Número de pruebas',
    'screen-updates': 'Mostrar actualizaciones en pantalla',
    starting: 'Iniciando...',
    'percent-complete': 'completado',
  },
  'run-simulation-start-label': 'Iniciar',
  'run-simulation-start-title': 'Iniciar simulación',
  'run-simulation-cancel-label': 'Detener',
  'run-simulation-cancel-title': 'Detener simulación',

  'load-error': {
    'loading-document-failed': 'No se pudo cargar el archivo solicitado',
  },

  'save-as-dialog': {
    'default-title': 'Guardar como',
    'rename-title': 'Cambiar nombre del documento',
    'duplicate-title': 'Duplicar documento',
    folder: 'Carpeta',
    name: 'Nombre',
    access: 'Acceso',
    public: 'Público',
    private: 'Privado',
    save: 'Guardar',
    overwrite: 'Sobrescribir',
    'folder-placeholder': 'Opcional: p. ej. finanzas/informes',
    'name-placeholder': 'Nombre del documento',
    'preview-label': 'Se guardará como',
    'copy-link': 'Copiar enlace',
    'copy-link-copied': 'Enlace copiado',
    collision: 'Ya existe un documento en esta ruta.',
    'collision-blocked': 'Ya existe un documento en esta ruta. Elige un nombre diferente.',
    empty: 'Introduce un nombre',
    saved: 'Se guardó «{name}»',
    'save-failed': 'No se pudo guardar «{name}».',
    retry: 'Reintentar',
    'overwrite-confirm-title': '¿Sobrescribir el documento?',
    'overwrite-confirm-message': 'Ya existe un documento en «{name}». Sobrescribirlo reemplaza su contenido. ¿Seguro que quieres continuar?',

    'path-exists-title': 'El documento ya existe',
    'path-exists-message': 'Ya existe un documento con esa ruta. Elimina ese documento primero si quieres reutilizar la ruta.',

  },

  toast: {
    'region-label': 'Notificaciones',
    dismiss: 'Descartar',
  },

  'las-vegas-simulation-panel': {
    title: 'Simulación Las Vegas',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Aceptar',
        description: 'Aceptar es una celda que devuelve TRUE o FALSE para aceptar o rechazar una prueba. Obligatorio.',
      },
      complete: {
        title: 'Completar',
        description: 'Completar es una celda que devuelve TRUE para finalizar la simulación, o un número de pruebas aceptadas. Obligatorio.',
      },
      fail: {
        title: 'Fallar',
        description: 'Fallar es una celda que devuelve TRUE para salir de la simulación, o un número máximo total de pruebas. Opcional.',
      },
    },
    'more-information-link': {
      title: 'Más información',
    },
    'running-simulation': 'Ejecutando la simulación...',
    'options-overview': 'Introduce las opciones para una simulación Las Vegas.',
  },

  'insert-function': {
    button: {
      title: 'Insertar función...',
    },
    'insert-function': 'Insertar función',
    'search-for-function': 'Buscar una función...',
    'function-result': 'Resultado',
  },

  'function-dialog': {
    'select-function': {
      title: 'Seleccionar función',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultado',
    volatile: 'volátil',
    'function-help-title': 'Ayuda sobre esta función',
  },

  'number-format': {
    general: 'General',
    number: 'Número',
    integer: 'Entero',
    percent: 'Porcentaje',
    fraction: 'Fracción',
    accounting: 'Contabilidad',
    currency: 'Moneda',
    scientific: 'Científico',

    timestamp: 'Marca de tiempo',
    'long-date': 'Fecha larga',
    'short-date': 'Fecha corta',
  },

  'llm-chat': {
    panel: {
      title: 'Asistente de IA',
    },
    'settings-tab': {
      title: 'Configuración',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: '¿Cambiar de modelo?',
      message: 'Este modelo usa un proveedor diferente, por lo que se borrará la conversación actual. ¿Continuar?',
      confirm: 'Cambiar de modelo',
    },
    buttons: {
      'send-message': 'Enviar',

      'clear-conversation': 'Borrar conversación',
      save: 'Guardar en el escritorio',
      resend: 'Reenviar el último mensaje',
      restart: 'Reiniciar desde el primer mensaje',
    },

    label: {
      'api-key': 'Clave de API',
      'api-key-placeholder': 'Pega tu clave de API',
      'reveal-api-key': 'Mostrar la clave de API',
      'hide-api-key': 'Ocultar la clave de API',
      model: 'Modelo',
      'choose-a-model': 'Elige un modelo',
      'select-a-model': 'Selecciona un modelo',
      header: {
        important: 'Importante',
      },
      disclaimer: 'La interfaz de IA funciona en modo «trae tu propia clave». Para usarla, debes proporcionar una clave de API de un proveedor o modelo compatible.\nNunca vemos tu clave de API. Permanece en tu navegador y solo se envía al proveedor oficial cuando envías un mensaje de chat.\nTu proveedor de modelos te cobrará por los tokens o según tu plan de suscripción.',

      provider_link: 'Página web del proveedor',
      model_information_link: 'Información del modelo',
      screenshots_disabled: 'Nota: este modelo no admite capturas de pantalla.',

    },

    activity: {
      thinking: 'Pensando…',
      working: 'Trabajando…',
      running: 'Ejecutando {tool}…',
    },

    error: {
      unknown: 'error desconocido',
      'unknown-type': 'tipo desconocido',
    },
  },

  'developer-panel': {
    title: 'Información para desarrolladores',
  },

  'fit-data-panel': {
    'select-range': 'Seleccionar rango',
    'candidate-distributions': {
      label: 'Distribuciones candidatas',
      description: 'Las candidatas se ordenan según su mayor cercanía a la distribución teórica',
    },
    'log-nomal-graph': {
      description: 'El gráfico log-normal se traza con escala logarítmica',
    },
    statistics: {
      error: 'Error',
      mean_square_error: 'Error cuadrático medio',
      aggregate_error: 'Error agregado',
      max_error: 'Error máximo',
      mean_error: 'Error medio',
    },

    label: {
      'click-to-lock': 'Bloquear la selección de ajuste de datos',
      'click-to-unlock': 'Desbloquear la selección de ajuste de datos',
    },

    'distribution-parameters': 'Parámetros de la distribución',
    'spreadsheet-function': 'Función de hoja de cálculo',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Copiar al portapapeles',
      error: 'Error al copiar',
      copied: 'Copiado',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'No hay comandos coincidentes',
    'start-typing': 'Empieza a escribir para encontrar un comando',
    'run-highlighted-command': 'Pulsa Intro para ejecutar el comando resaltado',
    'command-palette': {
      label: 'Paleta de comandos',
    },
  },

  'documents-page': {
    title: 'Documentos',

    scope: {
      all: 'Todos los documentos',
      starred: 'Destacados',
      recent: 'Recientes',
      private: 'Privados',
    },

    rail: {
      label: 'Filtros de documentos',
      folders: 'Carpetas',
      'no-folders': 'Sin carpetas',
    },

    search: {
      placeholder: 'Buscar documentos',
      label: 'Buscar documentos',
      clear: {
        label: 'Borrar búsqueda',
      },
    },
    filter: {
      label: 'Filtrar',
    },

    action: {
      'new-document': 'Nuevo documento',
      open: 'Abrir',
      duplicate: 'Duplicar',
      rename: 'Cambiar nombre…',
      'delete': 'Eliminar',
      cancel: 'Cancelar',
      'make-public': 'Hacer público',
      'make-private': 'Hacer privado',
      'version-history': 'Historial de versiones',
    },

    access: {
      public: 'Público',
      private: 'Privado',
    },

    selection: {
      count: '{count} seleccionados',
      'make-public': {
        label: 'Hacer públicos los documentos seleccionados',
      },
      'make-private': {
        label: 'Hacer privados los documentos seleccionados',
      },
      'delete': {
        label: 'Eliminar los documentos seleccionados',
      },
    },

    table: {
      label: 'Documentos',
      'select-all': {
        label: 'Seleccionar todos los documentos',
      },
    },
    column: {
      starred: 'Destacado',
      name: 'Nombre',
      folder: 'Carpeta',
      access: 'Acceso',
      version: 'Versión',
      modified: 'Modificado',
      actions: 'Acciones',
    },

    row: {
      select: {
        label: 'Seleccionar {name}',
      },
      star: {
        label: 'Destacar {name}',
      },
      unstar: {
        label: 'Quitar {name} de destacados',
      },
      menu: {
        label: 'Acciones para {name}',
      },
      unnamed: {
        title: 'Este documento aún no tiene nombre',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Eliminar el documento, ¿seguro?',
      confirm_delete_documents: 'Eliminar los documentos, ¿seguro?',
    },

    error: {
      title: 'No se pudieron cargar tus documentos',
      detail: 'La carga falló debido a un error. Inténtalo de nuevo más tarde.',
      retry: 'Reintentar',
    },

    messages: {
      rename_failed: 'No se pudo cambiar el nombre. Inténtalo de nuevo más tarde.',
      rename_succeeded: 'Documento renombrado',

      delete_failed: 'No se pudo eliminar. Inténtalo de nuevo más tarde.',
      one_document_deleted: 'Documento eliminado',
      multiple_documents_deleted: 'Documentos eliminados',

      update_failed: 'No se pudo actualizar. Inténtalo de nuevo más tarde.',

      duplicate_succeeded: 'Documento creado',
      duplicate_failed: 'No se pudo duplicar. Inténtalo de nuevo más tarde.',

      restore_succeeded: 'Documento restaurado',
      restore_failed: 'No se pudo restaurar. Inténtalo de nuevo más tarde.',

    },

    empty: {
      title: 'Aún no hay documentos',
      detail: 'Las hojas de cálculo que crees o importes aparecerán aquí, junto con su historial de versiones.',
    },

    'no-match': {
      title: 'Ningún documento coincide con «{query}»',
      detail: 'La búsqueda abarca todas las carpetas. Prueba con un término más corto.',
      action: 'Borrar búsqueda',
    },

    'empty-filter': {
      title: 'No hay nada aquí',
      detail: 'Ningún documento coincide con este filtro.',
      'detail-folder': 'No hay documentos en {folder}.',
      action: 'Mostrar todos los documentos',
    },

    footer: {
      count: {
        one: '{count} documento',
        other: '{count} documentos',
      },
      filtered: '{count} de {total} documentos',
      'searching-all': 'buscando en todas las carpetas',
    },

    panel: {
      label: 'Detalles del documento',
      open: {
        title: 'Abrir documento',
      },
      close: {
        label: 'Cerrar detalles',
      },
      'copy-link': {
        label: 'Copiar enlace',
        copied: {
          label: 'Enlace copiado',
          title: 'Copiado',
        },
      },
      'unnamed-hint': 'Aún sin nombre: esta es la dirección. Al cambiar el nombre se asigna uno.',
      star: {
        label: 'Destacar este documento',
      },
      unstar: {
        label: 'Quitar este documento de destacados',
      },
      field: {
        access: 'Acceso',
        starred: 'Destacado',
        created: 'Creado',
        modified: 'Modificado',
        version: 'Versión',
      },
    },

    history: {
      title: 'Versiones anteriores',
      loading: 'Cargando el historial de versiones',
      error: 'No se pudo cargar el historial de versiones.',
      retry: 'Reintentar',
      menu: {
        label: 'Acciones para la versión {version}',
      },
      open: {
        text: 'Abrir esta versión',
        label: 'Abrir la versión {version}',
      },
      duplicate: 'Duplicar como nuevo documento',
      restore: 'Restaurar',
      none: 'Aún no hay versiones anteriores. Aparecerán aquí a medida que guardes.',
      kept: {
        one: 'Se conserva una versión anterior.',
        other: 'Se conservan las últimas {count} versiones anteriores.',
      },
    },

    time: {
      'just-now': 'ahora mismo',
      minutes: {
        one: 'hace {count} minuto',
        other: 'hace {count} minutos',
      },
      hours: {
        one: 'hace {count} hora',
        other: 'hace {count} horas',
      },
      days: {
        one: 'hace {count} día',
        other: 'hace {count} días',
      },
      today: 'hoy, {time}',
      yesterday: 'ayer, {time}',
    },
  },
  'documents-table': {
    document: {
      label: 'Documento',
    },
    'updated-date': {
      label: 'Actualizado',
    },
    'created-date': {
      label: 'Creado',
    },
    access: {
      label: 'Acceso',
      'type-private': 'Privado',
      'type-public': 'Público',
    },
    'filter-documents': {
      label: 'Filtrar documentos',
    },

    controls: {
      'delete-selected': 'Eliminar seleccionados',
      'make-public': 'Hacer público',
      'make-private': 'Hacer privado',
    },
  },

  'account-page': {
    title: 'Cuenta',
  },

  'sign-in': {
    page: {
      title: 'Iniciar sesión',
    },
    form: {
      username: {
        placeholder: 'Nombre de usuario o correo electrónico',
      },
      password: {
        placeholder: 'Contraseña',
      },
      'sign-in-button': {
        label: 'Iniciar sesión',
      },
      'remember-me': 'Recordarme en este dispositivo',
      instructions: 'Introduce tu nombre de usuario y contraseña para iniciar sesión',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Olvidé mi contraseña',
      },
      'create-account': {
        text: 'Crear cuenta',
      },
      'sign-in': {
        text: 'Iniciar sesión',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Olvidé mi contraseña',
    },
    form: {
      instructions: 'Introduce tu dirección de correo electrónico para restablecer tu contraseña',
      email: {
        placeholder: 'Dirección de correo electrónico',
      },
      'reset-password-button': {
        label: 'Restablecer contraseña',
      },
    },
  },

  'privacy-policy': {
    page: {
      title: 'Política de privacidad',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Condiciones de uso',
    },
  },

  'create-account': {
    page: {
      title: 'Crear cuenta',
    },
  },
  'create-password': {
    page: {
      title: 'Crear contraseña',
    },
  },
  'update-password': {
    page: {
      title: 'Actualizar contraseña',
    },
  },

  'theme-toggle': {
    'light-theme': 'Tema claro',
    'dark-theme': 'Tema oscuro',
    'system-theme': 'Tema del sistema',
  },

  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Usar el tema oscuro',
        alt: 'combinación de colores',
      },

      'light-theme': {
        label: 'Usar el tema claro',
        alt: 'combinación de colores',
      },

      'system-theme': {
        label: 'Usar el tema del sistema',
        alt: 'combinación de colores claro oscuro',
      },
    },

    'remove-hyperlink': {
      label: 'Quitar hipervínculo',
      alt: 'eliminar borrar enlace',
    },

    'insert-hyperlink': {
      label: 'Insertar hipervínculo',
      alt: 'añadir establecer enlace',

      parameter: {
        url: {
          label: 'Introduce la dirección del enlace (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Añadir o editar comentario de celda',
      alt: 'nota comentario',

      parameter: {
        comment: {
          label: 'Introduce un comentario. Pulsa Ctrl + Intro para guardar.',
          'label-mac': 'Introduce un comentario. Pulsa Cmd + Intro para guardar.',
        },
      },
    },

    'remove-comment': {
      label: 'Quitar comentario de celda',
      alt: 'nota',
    },

    'reset-background-color': {
      label: 'Restablecer el color de fondo en la selección',
      alt: 'borrar relleno',
    },

    'set-background-color': {
      label: 'Establecer el color de fondo de la selección',
      alt: 'relleno',
    },

    'reset-text-color': {
      label: 'Restablecer el color de texto en la selección',
      alt: 'borrar primer plano',
    },

    'set-text-color': {
      label: 'Establecer el color de texto de la selección',
      alt: 'primer plano',
    },

    'reset-border-color': {
      label: 'Restablecer el color de borde en la selección',
      alt: 'borrar',
    },

    'set-border-color': {
      label: 'Establecer el color de borde de la selección',
    },

    'borders-clear': {
      label: 'Bordes: quitar bordes',
    },
    'border-top': {
      label: 'Bordes: aplicar el borde superior a la selección',
    },
    'border-bottom': {
      label: 'Bordes: aplicar el borde inferior a la selección',
    },
    'border-double-bottom': {
      label: 'Bordes: aplicar el borde inferior doble a la selección',
    },
    'border-left': {
      label: 'Bordes: aplicar el borde izquierdo a la selección',
    },
    'border-right': {
      label: 'Bordes: aplicar el borde derecho a la selección',
    },

    'border-outside': {
      label: 'Bordes: aplicar el borde exterior a la selección',
      alt: 'externo',
    },

    'border-all': {
      label: 'Bordes: aplicar todos los bordes a la selección',
    },

    'reset-font-scale': {
      label: 'Restablecer la escala de fuente',
      alt: 'texto tamaño de fuente',
    },

    'font-scale-increase': {
      label: 'Escala de fuente: aumentar 10 %',
      alt: 'texto tamaño de fuente',
    },

    'font-scale-decrease': {
      label: 'Escala de fuente: disminuir 10 %',
      alt: 'texto tamaño de fuente',
    },

    'insert-donut-chart': {
      label: 'Insertar gráfico de anillos',
      alt: 'gráfico diagrama',
    },

    'insert-column-chart': {
      label: 'Insertar gráfico de columnas',
      alt: 'gráfico diagrama',
    },

    'insert-bar-chart': {
      label: 'Insertar gráfico de barras',
      alt: 'gráfico diagrama',
    },

    'insert-line-chart': {
      label: 'Insertar gráfico de líneas',
      alt: 'gráfico diagrama',
    },

    'insert-scatter-plot': {
      label: 'Insertar gráfico de dispersión',
      alt: 'gráfico diagrama',
    },

    'insert-box-plot': {
      label: 'Insertar diagrama de caja',
      alt: 'gráfico diagrama bigotes',
    },

    'insert-image': {
      label: 'Insertar imagen',
    },

    'cf-gradient-red-green': {
      label: 'Formato condicional degradado: rojo-verde',
    },
    'cf-gradient-green-red': {
      label: 'Formato condicional degradado: verde-rojo',
    },
    'cf-unique-values': {
      label: 'Formato condicional: valores únicos',

      parameter: {
        color: {
          label: 'Selecciona el color para los valores únicos',
        },
      },
    },

    'cf-data-bars': {
      label: 'Formato condicional: barras de datos',
      alt: 'barra de datos',

      parameter: {
        color: {
          label: 'Selecciona el color para las barras de datos',
        },
        'hide-values': {
          label: '¿Ocultar los valores?',
          choice: {
            'true': 'Sí, ocultar los valores',
            'false': 'No, mostrar los valores',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Formato condicional: valores duplicados',

      parameter: {
        color: {
          label: 'Selecciona el color para los valores duplicados',
        },
      },
    },

    'cf-clear': {
      label: 'Borrar el formato condicional de la selección',
      alt: 'quitar',
    },

    'fit-column-widths': {
      label: 'Ajustar el ancho de las columnas seleccionadas (autoajuste)',
    },

    'fit-data': {
      label: 'Ajustar datos',
      alt: 'ajustar',
    },

    'named-ranges': {
      label: 'Rangos y expresiones con nombre',
      alt: 'administrador de nombres definir nombre eliminar nombre borrar',
    },

    'set-tab-color': {
      label: 'Establecer el color de la pestaña',
    },

    'reset-tab-color': {
      label: 'Restablecer el color de la pestaña',
      alt: 'borrar quitar',
    },

    'fit-row-heights': {
      label: 'Ajustar la altura de las filas seleccionadas (autoajuste)',
    },

    'correlation-matrix': {
      label: 'Comprobar la matriz de correlación',
    },

    'hide-sheet': {
      label: 'Ocultar hoja',
      alt: 'visible',
    },

    'unhide-all-sheets': {
      label: 'Mostrar todas las hojas',
      alt: 'visible',
    },

    'unhide-columns': {
      label: 'Mostrar las columnas ocultas de la hoja',
    },
    'unhide-rows': {
      label: 'Mostrar las filas ocultas de la hoja',
    },
    'hide-rows': {
      label: 'Ocultar las filas seleccionadas',
    },
    'hide-columns': {
      label: 'Ocultar las columnas seleccionadas',
    },

    'las-vegas-simulation': {
      label: 'Simulación Las Vegas...',
    },
    'simulation-settings': {
      label: 'Configuración de la simulación...',
    },
    'language-settings': {
      label: 'Configuración de idioma...',
    },

    'load-desktop-file': {
      label: 'Cargar archivo del escritorio...',
      alt: 'excel csv importar',
    },

    'save-xlsx': {
      label: 'Guardar como XLSX',
      alt: 'descargar excel',
    },

    'save-csv': {
      label: 'Guardar la hoja actual como CSV',
      alt: 'descargar exportar',
    },

    'save-to-cloud': {
      label: 'Guardar en la nube',
    },

    'load-document': {
      label: 'Cargar documento...',
      alt: 'abrir',
    },

    'download-json': {
      label: 'Descargar al escritorio (JSON)',
      alt: 'guardar',
    },

    'insert-function': {
      label: 'Insertar función...',
    },
    find: {
      label: 'Buscar en valores/fórmulas...',
    },
    'insert-distribution': {
      label: 'Insertar distribución aleatoria...',
    },
    'run-simulation': {
      label: 'Ejecutar simulación...',
    },
    'quick-view': {
      label: 'Vista rápida...',
    },
    'new-model': {
      label: 'Nuevo modelo',
    },
    'revert-file': {
      label: 'Revertir archivo',
    },
    recalculate: {
      label: 'Recalcular',
    },
    undo: {
      label: 'Deshacer',
    },
    'delete-columns': {
      label: 'Eliminar las columnas seleccionadas',
    },
    'delete-rows': {
      label: 'Eliminar las filas seleccionadas',
    },
    'insert-column': {
      label: 'Insertar columna',
    },
    'insert-row': {
      label: 'Insertar fila',
    },
    'set-view-scale': {
      label: 'Establecer la escala de visualización (zoom)',

      parameter: {
        scale: {
          label: 'Introduce la escala de visualización',
        },
      },
    },
    'reset-view-scale': {
      label: 'Restablecer la escala de visualización (zoom)',
    },

    'rename-tab': {
      label: 'Cambiar el nombre de la pestaña',
      alt: 'hoja página',

      parameter: {
        name: {
          label: 'Introduce un nombre para esta pestaña',
        },
      },
    },

    'add-tab': {
      label: 'Añadir pestaña',
      alt: 'hoja página',

      parameter: {
        name: {
          label: 'Introduce un nombre para la nueva pestaña',
        },
      },
    },

    'delete-tab': {
      label: 'Eliminar pestaña',
      alt: 'hoja página',
    },

    'increase-indent': {
      label: 'Aumentar sangría',
      alt: 'más',
    },

    'decrease-indent': {
      label: 'Disminuir sangría',
      alt: 'menos',
    },

    'number-format-increase-precision': {
      label: 'Formato de número: aumentar decimales',
      alt: 'más decimales',
    },

    'number-format-decrease-precision': {
      label: 'Formato de número: disminuir decimales',
      alt: 'menos decimales',
    },

    'number-format': {
      label: 'Formato de número',
      alt: 'formato de número personalizado',

      parameter: {
        format: {
          label: 'Introduce un formato de número o un nombre simbólico',
        },
      },
    },

    'merge-cells': {
      label: 'Combinar las celdas seleccionadas',
    },
    'unmerge-cells': {
      label: 'Separar las celdas seleccionadas',
    },
    'lock-cells': {
      label: 'Bloquear las celdas seleccionadas',
    },
    'unlock-cells': {
      label: 'Desbloquear las celdas seleccionadas',
    },

    'valign-top': {
      label: 'Formato de la selección: alinear verticalmente arriba',
    },
    'valign-bottom': {
      label: 'Formato de la selección: alinear verticalmente abajo',
    },
    'valign-middle': {
      label: 'Formato de la selección: alinear verticalmente al medio',
    },

    'align-left': {
      label: 'Formato de la selección: alinear el texto a la izquierda',
      alt: 'alineación horizontal',
    },

    'align-right': {
      label: 'Formato de la selección: alinear el texto a la derecha',
      alt: 'alineación horizontal',
    },

    'align-center': {
      label: 'Formato de la selección: centrar el texto',
      alt: 'alineación horizontal justificar',
    },

    'toggle-word-wrap': {
      label: 'Formato de la selección: alternar el ajuste de texto',
    },

    'toggle-gridlines': {
      label: 'Alternar las líneas de cuadrícula en la hoja activa',
    },
    'show-gridlines': {
      label: 'Mostrar las líneas de cuadrícula en la hoja activa',
    },
    'hide-gridlines': {
      label: 'Ocultar las líneas de cuadrícula en la hoja activa',
    },

    'toggle-bold': {
      label: 'Formato de la selección: alternar negrita',
    },
    'toggle-italic': {
      label: 'Formato de la selección: alternar cursiva',
    },
    'toggle-underline': {
      label: 'Formato de la selección: alternar subrayado',
    },
    'toggle-strikethrough': {
      label: 'Formato de la selección: alternar tachado',
    },

    'reset-text-formatting': {
      label: 'Formato de la selección: restablecer el formato de texto',
      alt: 'borrar',
    },
  },

  'correlation-matrix': {
    'title': 'Matriz de correlación',
    'accept-changes': 'Aceptar los cambios',
    'close-dialog': 'Cerrar',

    'invalid-shape': 'Selecciona una matriz cuadrada de al menos 2x2 celdas.',
    'invalid-data': 'La matriz de correlación debe tener una diagonal unitaria.\nCada celda de la diagonal debe evaluarse como {unit}.',
    'asymmetric': 'La matriz de correlación debe ser simétrica, o puedes omitir la triangular superior o inferior.',

    'solution-text': `La matriz de correlación no es definida positiva. Encontramos una solución realizando pequeños ajustes en los valores. El error agregado es {error}.`,
    'positive-definite': `La matriz de correlación es definida positiva.`,

  },

  'sign-in-page': {
    heading: 'Iniciar sesión',
    subtitle: 'Introduce tu nombre de usuario y contraseña para iniciar sesión.',

    username: {
      label: 'Nombre de usuario o correo electrónico',
      required: 'Introduce tu nombre de usuario o correo electrónico.',
    },

    password: {
      label: 'Contraseña',
      required: 'Introduce tu contraseña.',
      show: {
        label: 'Mostrar la contraseña',
      },
      hide: {
        label: 'Ocultar la contraseña',
      },
      'caps-lock': 'El bloqueo de mayúsculas está activado.',
    },

    remember: {
      label: 'Recordarme en este dispositivo',
    },

    submit: {
      label: 'Iniciar sesión',
      pending: 'Iniciando sesión…',
    },

    error: {
      rejected: 'Nombre de usuario o contraseña incorrectos.',
      unreachable: 'No se puede conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
      incomplete: 'El inicio de sesión no se completó. Inténtalo de nuevo.',
    },

    link: {
      'forgot-password': 'Olvidé mi contraseña',
      'create-account': 'Crear cuenta',
    },
  },

  'backstage-form': {
    email: {
      required: 'Introduce tu dirección de correo electrónico.',
      invalid: 'Esto no parece una dirección de correo electrónico.',
    },

    username: {
      required: 'Elige un nombre de usuario.',
      'too-short': 'Los nombres de usuario tienen al menos {min} caracteres.',
      'too-long': 'Los nombres de usuario tienen como máximo {max} caracteres.',
      invalid: 'Usa letras, números, guiones y guiones bajos, empezando por una letra.',
    },

    password: {
      required: 'Elige una contraseña.',
      'too-short': 'Las contraseñas tienen al menos {min} caracteres.',
    },
  },

  'create-account-page': {
    heading: 'Crear cuenta',

    subtitle: 'Te pedimos una dirección de correo electrónico y un nombre de usuario porque los documentos se almacenan con tu nombre de usuario.',

    terms: {
      text: 'Revisa nuestras {link}.',
      link: 'condiciones del servicio',
    },

    email: {
      label: 'Dirección de correo electrónico',
      taken: 'Ya existe una cuenta con esa dirección de correo electrónico.',
    },

    username: {
      label: 'Nombre de usuario',
      taken: '@{username} ya está en uso.',
      reserved: '@{username} no está disponible.',
      checking: 'Comprobando disponibilidad…',
      available: '@{username} está disponible.',
    },

    handle: {
      example: '@{username}/ejemplo',
      placeholder: 'usuario',
    },

    after: 'Te enviaremos por correo electrónico un enlace para confirmar tu dirección y crear una contraseña.',

    submit: {
      label: 'Crear cuenta',
      pending: 'Creando la cuenta…',
    },

    error: {
      unreachable: 'No se puede conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
      rejected: 'No se pudo crear esa cuenta. Comprueba tus datos e inténtalo de nuevo.',
    },

    done: {
      heading: 'Revisa tu correo electrónico',
      body: 'Enviamos un enlace a {email}. Ábrelo para confirmar tu dirección y elegir una contraseña.',
      spam: '¿No hay nada ahí? Espera un minuto y luego revisa tu carpeta de spam.',
      restart: 'Usar una dirección diferente',
    },

    link: {
      'forgot-password': 'Olvidé mi contraseña',
      'sign-in': 'Iniciar sesión',
    },
  },

  'forgot-password-page': {
    heading: 'Olvidé mi contraseña',
    subtitle: 'Introduce tu dirección de correo electrónico y te enviaremos un enlace para elegir una nueva contraseña.',

    email: {
      label: 'Dirección de correo electrónico',
    },

    submit: {
      label: 'Enviar el enlace',
      pending: 'Enviando…',
    },

    error: {
      unreachable: 'No se puede conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
    },

    done: {
      heading: 'Revisa tu correo electrónico',
      body: 'Si existe una cuenta para {email}, le hemos enviado un enlace. Ábrelo para elegir una nueva contraseña.',
      spam: '¿No hay nada ahí? Espera un minuto y luego revisa tu carpeta de spam.',
      restart: 'Usar una dirección diferente',
    },

    link: {
      'sign-in': 'Iniciar sesión',
      'create-account': 'Crear cuenta',
    },
  },

  'create-password-page': {
    heading: 'Crear una contraseña',
  },

  'update-password-page': {
    heading: 'Elige una nueva contraseña',
    subtitle: 'Introduce el token del enlace que te enviamos.',

    identifier: {
      label: 'Nombre de usuario o correo electrónico',
      required: 'Introduce tu nombre de usuario o correo electrónico.',
    },

    token: {
      label: 'Token',
      required: 'Introduce el token del enlace que te enviamos.',
      invalid: 'Ese token no es válido. Comprueba el enlace o solicita uno nuevo.',
      expired: 'Ese enlace ha caducado. Solicita uno nuevo.',
      used: 'Ese enlace ya se ha usado. Solicita uno nuevo.',
    },

    password: {
      label: 'Nueva contraseña',
      show: {
        label: 'Mostrar la contraseña',
      },
      hide: {
        label: 'Ocultar la contraseña',
      },
      'caps-lock': 'El bloqueo de mayúsculas está activado.',

      common: 'Esa contraseña es demasiado fácil de adivinar. Elige otra.',
    },

    strength: {
      title: 'Seguridad de la contraseña',

      weak: 'Débil',
      fair: 'Aceptable',
      good: 'Buena',
      strong: 'Fuerte',
    },

    submit: {
      label: 'Actualizar contraseña',
      pending: 'Actualizando…',
    },

    error: {
      unreachable: 'No se puede conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.',
      rejected: 'No se pudo actualizar esa contraseña. Comprueba tus datos e inténtalo de nuevo.',
    },

    done: {
      heading: 'Contraseña actualizada',
      body: 'Tu nueva contraseña se ha guardado.',
      'continue': 'Continuar a la aplicación',
    },

    link: {
      'sign-in': 'Iniciar sesión',
      'forgot-password': 'Enviar un nuevo enlace',
    },
  },

  'new-document': {
    'discard-changes-message': 'Tienes cambios sin guardar. ¿Seguro que quieres continuar?',
    'discard-changes-confirm': 'Nuevo documento',
  },

  'status-pill': {
    messages: {
      'unsaved-changes': 'Cambios sin guardar',
    },
  },

} satisfies DeepPartial<I18N>;
