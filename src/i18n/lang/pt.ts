
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
    title: 'Teste',
  },

  'update-language': {
    title: 'Configurações de idioma...',
  },

  'select-language-dialog': {
    'title': 'Configurações de idioma',
    'select-language': 'Selecionar idioma',
    'system-setting': 'Configuração do sistema',
    'decimal-separator': 'Separador decimal',
    'decimal-separator-dot': 'Ponto',
    'decimal-separator-comma': 'Vírgula',
  },

  about: {
    tagline: 'Análise de risco Monte Carlo para a web.',
    build: 'Compilação {commit}',
    copyright: '© {year} Structured Data LLC. Todos os direitos reservados.',
    website: 'riskamp.com',
    'old-website-version': 'Procurando a versão antiga do RiskAMP web? Use {link}',
    report: 'Relatar um problema',
    'report-subject': 'RiskAMP web — relato de problema',
    'report-body': '(descreva o problema aqui)\n\n\n---\nRiskAMP: {version}\nTREB: {treb}\nCompilação: {commit}\nNavegador: {ua}\nIdioma: {lang}\nURL: {url}',
  },

  toolbar: {
    menus: {
      file: 'Arquivo',
      help: 'Ajuda',
      'monte-carlo': 'Monte Carlo',
      'data-and-analysis': 'Dados e análise',
      tools: 'Ferramentas',
      account: 'Conta',
    },

    'menu-commands': {
      documents: 'Documentos',
      'account-page': 'Página da conta',
      'sign-out': 'Sair',
    },

    tabs: {
      home: 'Início',
      layout: 'Layout',
      format: 'Formatar',
      insert: 'Inserir',
      mc: 'Monte Carlo',
      'data-and-analysis': 'Dados e análise',
    },

    menu: {
      'about-riskamp': 'Sobre o RiskAMP web',
      'function-documentation': 'Documentação das funções do RiskAMP',
      walkthrough: 'Modelo de tutorial',
    },

    button: {
      'toggle-fullscreen': 'Alternar tela cheia',

      'new-spreadsheet': 'Nova planilha',
      'import-file': 'Importar arquivo',
      'open-file': 'Abrir arquivo',
      'save-file': 'Salvar arquivo',
      'save-file-as': 'Salvar como...',
      'revert-file': 'Reverter arquivo',
      'save-to-desktop': 'Salvar no computador',
      'export-xlsx': 'Exportar XLSX',
      'export-csv': 'Exportar CSV',

      'sign-in': 'Entrar',
      'create-account': 'Criar conta',

      'search-cells': {
        label: 'Pesquisar células',
      },
      'defined-names': {
        label: 'Nomes definidos',
      },
      'fit-data': {
        label: 'Ajustar dados',
      },
      notes: {
        label: 'Notas',
      },

      'monte-carlo-simulation': {
        label: 'Simulação de Monte Carlo',
      },
      'run-simulation': {
        label: 'Executar simulação',
      },
      'run-simulation-again': {
        label: 'Executar simulação novamente',
      },
      'las-vegas-simulation': {
        label: 'Simulação de Las Vegas',
      },
      'simulation-settings': {
        label: 'Configurações de simulação',
      },
      'quick-view': {
        label: 'Visualização rápida',
      },
      'quick-view-correlation': {
        label: 'Correlação da visualização rápida',
      },
      recalculate: {
        label: 'Recalcular',
      },

      'align-left': {
        label: 'Alinhar à esquerda',
      },
      'align-center': {
        label: 'Centralizar',
      },
      'align-right': {
        label: 'Alinhar à direita',
      },

      'align-top': {
        label: 'Alinhar na parte superior',
      },
      'align-middle': {
        label: 'Alinhar no meio',
      },
      'align-bottom': {
        label: 'Alinhar na parte inferior',
      },

      'increase-indent': {
        label: 'Aumentar recuo',
      },
      'decrease-indent': {
        label: 'Diminuir recuo',
      },
      'wrap-text': {
        label: 'Quebrar texto',
      },

      'toggle-integer-grouping': {
        label: 'Alternar agrupamento',
      },
      'increase-decimal-precision': {
        label: 'Aumentar precisão',
      },
      'decrease-decimal-precision': {
        label: 'Diminuir precisão',
      },

      'merge-cells': {
        label: 'Mesclar células',
      },
      'unmerge-cells': {
        label: 'Desmesclar células',
      },

      'lock-cells': {
        label: 'Bloquear células para edição',
      },
      'unlock-cells': {
        label: 'Desbloquear células para edição',
      },

      bold: {
        label: 'Alternar texto em negrito',
      },
      italic: {
        label: 'Alternar texto em itálico',
      },
      underline: {
        label: 'Alternar sublinhado',
      },
      strikethrough: {
        label: 'Alternar tachado',
      },

      'insert-row': {
        label: 'Inserir linha',
      },
      'insert-column': {
        label: 'Inserir coluna',
      },
      'delete-row': {
        label: 'Excluir linha',
      },
      'delete-column': {
        label: 'Excluir coluna',
      },

      'text-color': {
        label: 'Cor do texto',
      },
      'background-color': {
        label: 'Cor de fundo',
      },
      'border-color': {
        label: 'Cor da borda',
      },

      'border-top': {
        title: 'Borda superior',
      },
      'border-bottom': {
        title: 'Borda inferior',
      },
      'border-double-bottom': {
        title: 'Borda inferior dupla',
      },
      'border-left': {
        title: 'Borda esquerda',
      },
      'border-right': {
        title: 'Borda direita',
      },
      'border-all': {
        title: 'Todas as bordas',
      },
      'border-none': {
        title: 'Remover bordas',
      },
      'border-outside': {
        title: 'Bordas externas',
      },

      'correlation-matrix': {
        title: 'Matriz de correlação',
      },

      sparkline: 'Minigráfico',
      'sparkline-column': 'Minigráfico de colunas',
      'sparkline-line': 'Minigráfico de linhas',

      insert: {
        'bar-chart': 'Gráfico de barras',
        'donut-chart': 'Gráfico de rosca',
        'column-chart': 'Gráfico de colunas',
        'line-chart': 'Gráfico de linhas',
        'scatter-plot': 'Gráfico de dispersão',
        'area-chart': 'Gráfico de área',
        image: 'Imagem',

        comment: 'Comentário',
        table: 'Tabela',
      },

      forecast: 'Previsão de tendência',
    },

    'open-menu': 'Abrir menu',

    'more-commands-button': {
      label: 'Mais comandos...',
    },

    combobox: {
      'font-size': {
        label: 'Tamanho da fonte',
      },
      'number-format': {
        label: 'Formato de número',
      },
    },

    label: {
      'spreadsheet-cells': 'Células da planilha',
    },

    message: {
      'changes-stored-in-browser': 'As alterações são mantidas no armazenamento do navegador até que você as salve ou reverta.',
    },
  },

  'toolbar-button': {
    'riskamp-documentation': {
      label: 'Documentação do RiskAMP',
    },
  },

  sidebar: {
    navigation: {
      label: {
        back: 'Voltar',
        forward: 'Avançar',
      },
    },
    label: {
      'close-sidebar': 'Fechar barra lateral',
    },

    simulation_settings: {
      'parallel-calculation': {
        'section-header': 'Cálculo paralelo',
        'max-workers': 'Número de workers (máximo)',
        'explanatory-text': 'Usar mais workers em paralelo melhora o desempenho da simulação em modelos complexos. Na maioria dos casos, recomendamos 4 ou 8 workers.',
      },

      'random-sampling': {
        'section-header': 'Amostragem aleatória',
        'explanatory-text': 'O método de amostragem será salvo com esta planilha.\nO valor selecionado aqui também será usado como padrão para novas planilhas.',
      },

      'random-seed': {
        'section-header': 'Semente aleatória',
        'explanatory-text': 'A semente aleatória será salva com esta planilha.\nDigite um número para usar uma semente fixa, ou digite 0 para usar uma semente aleatória em cada simulação.',

        'enter-seed-value': 'Digite a semente',
        'seed-value': 'Valor da semente',
        'reset-seed-value': 'Redefinir semente',
        'time-based-seed': 'Usar uma semente baseada no tempo',
      },

      title: 'Configurações de simulação',
      'latin-hypercube-sampling': 'Amostragem por hipercubo latino (LHS)',
      'standard-random-sampling': 'Amostragem aleatória padrão',

      'fixed-random-seed': 'Semente fixa',
      'seed-value-placeholder-text': 'Valor da semente',
    },

    'notes-panel': {
      title: 'Notas',
      'open-notes-with-spreadsheet': 'Abrir notas com a planilha',
      edit_markdown: 'Editar markdown',
      view_formatted: 'Ver formatado',
    },
    'fit-data-panel': {
      title: 'Ajustar dados',
    },
  },

  'color-picker': {
    choose_color: 'Escolher cor',
    use_selected_color: 'Usar a cor selecionada',
    theme_colors: 'Cores do tema',
    other_colors: 'Outras cores',
    no_color: 'Sem cor',
    new_color: 'Nova cor',
    default_text_color: 'Cor de texto padrão',
    default_border_color: 'Cor de borda padrão',
    no_fill: 'Sem preenchimento',

    theme: {
      background: 'Fundo',
      text: 'Texto',
      accent: 'Destaque',
      lighter: 'Mais claro',
      darker: 'Mais escuro',
    },
  },

  'names-panel': {
    title: 'Nomes definidos',
    header: {
      name: 'Nome',
      'name-scope': 'Escopo',
      value: 'Valor',
    },
    'name-scope': {
      sheet: 'Planilha',
      workbook: 'Pasta de trabalho',
    },
    label: {
      'delete-name': 'Excluir nome',
      'define-name': 'Definir nome',
      'edit-name': 'Editar nome',
    },
    'name-type': {
      reference: 'Referência',
      expression: 'Expressão',
    },
  },

  'search-panel': {
    title: 'Pesquisar células',
    'search-text': {
      placeholder: 'Texto da pesquisa',
    },
    'search-in': {
      text: 'Pesquisar em',
    },
    'search-type': {
      'cell-values': 'Valores',
      'cell-formulas': 'Fórmulas',
      wildcards: 'Curingas',
    },
    'search-scope': {
      'current-sheet': 'Planilha atual',
      'all-sheets': 'Todas as planilhas',
    },
    'search-results': {
      header: {
        address: 'Endereço',
        value: 'Valor',
        formula: 'Fórmula',
      },
      information: {
        'enter-text': 'Digite o texto a pesquisar',
        result: 'resultado',
        results: 'resultados',
      },
    },
  },
  'forecast-dialog': {
    title: 'Previsão de tendência',
    parameters: {
      dates: {
        title: 'Datas',
      },
      values: {
        title: 'Valores',
      },
      periods: 'Períodos da previsão',
      seasonality: 'Sazonalidade',

      'fill-empty': 'Preencher',
      'aggregate-multiple': 'Agregar',
      'project-forward-periods': 'Períodos',
      'chart-type': {
        label: 'Tipo de gráfico',
      },
      'chart-type-line-chart': 'Linhas',
      'chart-type-column-chart': 'Colunas',
    },
    options: {
      'model-type': 'Modelo',
      'forecast-type': 'Tipo de previsão',
    },
    'model-type': {
      'excel-compatible-forecast': 'Compatível com Excel',
      'static-forecast': 'Estática',
      'stochastic-forecast': 'Estocástica',
    },
    settings: 'Configurações',
    'create-forecast-sheet': 'Criar planilha de previsão',
    seasonality: {
      'auto-detect': 'Detectar automaticamente',
    },
    'fill-options': {
      interpolate: 'Interpolar',
      zeros: 'Zeros',
    },
    'aggregate-options': {
      average: 'Média',
      median: 'Mediana',
      min: 'Mín.',
      max: 'Máx.',
      sum: 'Soma',
      count: 'Contagem',
    },

    'chart-labels': {
      values: 'Valores',
      forecast: 'Previsão',
    },
  },

  'forecast-sheet-timeline-header': 'Linha do tempo',
  'forecast-sheet-values-header': 'Valores',
  'forecast-sheet-forecast-header': 'Previsão',
  'forecast-sheet-sample-header': 'Amostra',
  'forecast-sheet-statistics-header': 'Estatísticas',

  'forecast-sheet-statistics': {
    mean: {
      header: 'Média',
    },
    'p80-range': {
      header: 'Intervalo P80',
    },
  },

  'sparkline-dialog': {
    title: 'Inserir minigráfico',
    parameters: {
      target: {
        title: 'Célula de destino',
        'overwrite-warning': 'Os dados no intervalo de destino serão sobrescritos',
        'merge-warning': 'As células selecionadas serão mescladas para o minigráfico',
      },
      source: {
        title: 'Intervalo de dados de origem',
      },
    },
    info: 'Use as cores de primeiro plano e de fundo da célula para estilizar o minigráfico',

    'sparkline-type': 'Tipo de minigráfico',
    'sparkline-type-line-chart': 'Linhas',
    'sparkline-type-column-chart': 'Colunas',
  },

  'quick-view-dialog': {
    title: 'Visualização rápida',
    'select-cell': 'Selecionar célula',
    'tab-histogram': 'Histograma',
    'tab-box-plot': 'Boxplot',
    'show-statistics': 'Estatísticas',
    'histogram-bin-algorithm-long': 'Algoritmo de bins',
    'histogram-bin-algorithm-short': 'Bins',
    'bin-algorithm-automatic': 'Automático',
    'box-plot-whisker-type-long': 'Tipo de limite (whisker)',
    'box-plot-whisker-type-short': 'Limites',
    'box-plot-whisker-type-minmax': 'Mín./máx.',
    'box-plot-whisker-type-interquartile-range': 'IQR',
    'no-data': 'Não há dados de simulação para a célula selecionada. Execute uma simulação usando o botão abaixo para coletar dados para esta célula.\n\nOs dados de simulação serão coletados automaticamente quando uma célula for referenciada por uma função de estatística (como SimulationMean).',

    'stats-label': {
      min: 'Mín.',
      max: 'Máx.',
      first_quartile: '1º quartil',
      third_quartile: '3º quartil',
      median: 'Mediana',
      'interquartile-range': 'IQR',
      mean: 'Média',
      variance: 'Variância',
      'standard-deviation': 'Desv. padrão',
      'number-of-samples': 'n',
    },
  },

  'quick-view': {
    panel: {
      label: {
        'click-to-lock': 'Bloquear a seleção da visualização rápida',
        'click-to-unlock': 'Desbloquear a seleção da visualização rápida',
        'return-to-selection': 'Voltar à célula selecionada',
        'selection-locked': 'Seleção bloqueada',
      },
    },
  },

  'dialog-close-label': 'Fechar',
  'dialog-close-title': 'Fechar caixa de diálogo',
  'dialog-help-title': 'Ajuda',

  'standard-buttons': {
    close: {
      label: 'Fechar',
      title: 'Fechar caixa de diálogo',
    },
    apply: {
      title: 'Aplicar',
    },
    ok: {
      title: 'OK',
    },
    back: {
      title: 'Voltar',
    },
    yes: {
      title: 'Sim',
    },
    no: {
      title: 'Não',
    },
    accept: {
      title: 'Aceitar',
    },
    cancel: {
      title: 'Cancelar',
    },
  },

  'confirm-dialog': {
    title: 'Tem certeza?',
    'alert-title': 'Alerta',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    ok: 'OK',
  },

  'run-simulation-dialog-title': 'Simulação de Monte Carlo',
  'run-simulation': {
    'number-of-trials': 'Número de execuções',
    'screen-updates': 'Mostrar atualizações da tela',
    starting: 'Iniciando...',
    'percent-complete': 'concluído',
  },
  'run-simulation-start-label': 'Iniciar',
  'run-simulation-start-title': 'Iniciar simulação',
  'run-simulation-cancel-label': 'Parar',
  'run-simulation-cancel-title': 'Parar simulação',

  'load-error': {
    'loading-document-failed': 'O arquivo solicitado não pôde ser carregado',
  },

  'save-as-dialog': {
    'default-title': 'Salvar como',
    'rename-title': 'Renomear documento',
    'duplicate-title': 'Duplicar documento',
    folder: 'Pasta',
    name: 'Nome',
    access: 'Acesso',
    public: 'Público',
    private: 'Privado',
    save: 'Salvar',
    overwrite: 'Sobrescrever',
    'folder-placeholder': 'Opcional — ex.: financeiro/relatórios',
    'name-placeholder': 'Nome do documento',
    'preview-label': 'Será salvo como',
    'copy-link': 'Copiar link',
    'copy-link-copied': 'Link copiado',
    collision: 'Já existe um documento neste caminho.',
    'collision-blocked': 'Já existe um documento neste caminho. Escolha outro nome.',
    empty: 'Digite um nome',
    saved: 'Salvo “{name}”',
    'save-failed': 'Não foi possível salvar “{name}”.',
    retry: 'Tentar novamente',
    'overwrite-confirm-title': 'Sobrescrever documento?',
    'overwrite-confirm-message': 'Já existe um documento em “{name}”. Sobrescrever substitui o conteúdo. Tem certeza?',

    'path-exists-title': 'Documento existente',
    'path-exists-message': 'Já existe um documento com esse caminho. Exclua esse documento primeiro se quiser reutilizar o caminho.',

  },

  toast: {
    'region-label': 'Notificações',
    dismiss: 'Dispensar',
  },

  'las-vegas-simulation-panel': {
    title: 'Simulação de Las Vegas',
  },
  'las-vegas-simulation': {
    inputs: {
      accept: {
        title: 'Aceitar',
        description: 'Aceitar é uma célula que retorna TRUE ou FALSE para aceitar ou rejeitar uma execução. Obrigatório.',
      },
      complete: {
        title: 'Concluir',
        description: 'Concluir é uma célula que retorna TRUE para encerrar a simulação, ou um número de execuções aceitas. Obrigatório.',
      },
      fail: {
        title: 'Falhar',
        description: 'Falhar é uma célula que retorna TRUE para sair da simulação, ou um número total máximo de execuções. Opcional.',
      },
    },
    'more-information-link': {
      title: 'Mais informações',
    },
    'running-simulation': 'Executando simulação...',
    'options-overview': 'Insira as opções para uma simulação de Las Vegas.',
  },

  'insert-function': {
    button: {
      title: 'Inserir função...',
    },
    'insert-function': 'Inserir função',
    'search-for-function': 'Pesquisar função...',
    'function-result': 'Resultado',
  },

  'function-dialog': {
    'select-function': {
      title: 'Selecionar função',
    },
  },

  'arguments-dialog': {
    'function-result': 'Resultado',
    volatile: 'volátil',
    'function-help-title': 'Ajuda sobre esta função',
  },

  'number-format': {
    general: 'Geral',
    number: 'Número',
    integer: 'Número inteiro',
    percent: 'Porcentagem',
    fraction: 'Fração',
    accounting: 'Contábil',
    currency: 'Moeda',
    scientific: 'Científico',

    timestamp: 'Data e hora',
    'long-date': 'Data longa',
    'short-date': 'Data curta',
  },

  'llm-chat': {
    panel: {
      title: 'Assistente de IA',
    },
    'settings-tab': {
      title: 'Configurações',
    },
    'chat-tab': {
      title: 'Chat',
    },
    'change-model': {
      title: 'Alterar modelo?',
      message: 'Este modelo usa um provedor diferente, então a conversa atual será apagada. Continuar?',
      confirm: 'Alterar modelo',
    },
    buttons: {
      'send-message': 'Enviar',

      'clear-conversation': 'Limpar conversa',
      save: 'Salvar no computador',
      resend: 'Reenviar a última mensagem',
      restart: 'Reiniciar a partir da primeira mensagem',
    },

    label: {
      'api-key': 'Chave de API',
      'api-key-placeholder': 'Cole sua chave de API',
      'reveal-api-key': 'Mostrar chave de API',
      'hide-api-key': 'Ocultar chave de API',
      model: 'Modelo',
      'choose-a-model': 'Escolha um modelo',
      'select-a-model': 'Selecione um modelo',
      header: {
        important: 'Importante',
      },
      disclaimer: 'A interface de IA funciona no modo traga sua própria chave. Para usá-la, você deve fornecer uma chave de API de um provedor/modelo compatível.\nNunca vemos sua chave de API. Ela permanece no seu navegador e só é enviada ao provedor oficial quando você envia uma mensagem de chat.\nVocê será cobrado pelo seu provedor de modelo por tokens ou conforme seu plano de assinatura.',

      provider_link: 'Página do provedor',
      model_information_link: 'Informações do modelo',
      screenshots_disabled: 'Observação: este modelo não oferece suporte a capturas de tela.',

    },

    activity: {
      thinking: 'Pensando…',
      working: 'Trabalhando…',
      running: 'Executando {tool}…',
    },

    error: {
      unknown: 'erro desconhecido',
      'unknown-type': 'tipo desconhecido',
    },
  },

  'developer-panel': {
    title: 'Informações para desenvolvedores',
  },

  'fit-data-panel': {
    'select-range': 'Selecionar intervalo',
    'candidate-distributions': {
      label: 'Distribuições candidatas',
      description: 'As candidatas são ordenadas pelo ajuste mais próximo à distribuição teórica',
    },
    'log-normal-graph': {
      description: 'O gráfico log-normal é traçado em escala logarítmica',
    },
    statistics: {
      error: 'Erro',
      mean_square_error: 'Erro quadrático médio',
      aggregate_error: 'Erro agregado',
      max_error: 'Erro máximo',
      mean_error: 'Erro médio',
    },

    label: {
      'click-to-lock': 'Bloquear a seleção de ajuste de dados',
      'click-to-unlock': 'Desbloquear a seleção de ajuste de dados',
    },

    'distribution-parameters': 'Parâmetros da distribuição',
    'spreadsheet-function': 'Função de planilha',
  },

  'ui-interaction': {
    'copy-to-clipboard': {
      label: 'Copiar para a área de transferência',
      error: 'Erro ao copiar',
      copied: 'Copiado',
    },
  },

  'command-palette-ui': {
    'no-matching-commands': 'Nenhum comando correspondente',
    'start-typing': 'Comece a digitar para encontrar um comando',
    'run-highlighted-command': 'Pressione Enter para executar o comando destacado',
    'command-palette': {
      label: 'Paleta de comandos',
    },
  },

  'documents-page': {
    title: 'Documentos',

    scope: {
      all: 'Todos os documentos',
      starred: 'Favoritos',
      recent: 'Recentes',
      private: 'Privados',
    },

    rail: {
      label: 'Filtros de documentos',
      folders: 'Pastas',
      'no-folders': 'Nenhuma pasta',
    },

    search: {
      placeholder: 'Pesquisar documentos',
      label: 'Pesquisar documentos',
      clear: {
        label: 'Limpar pesquisa',
      },
    },
    filter: {
      label: 'Filtrar',
    },

    action: {
      'new-document': 'Novo documento',
      open: 'Abrir',
      duplicate: 'Duplicar',
      rename: 'Renomear…',
      'delete': 'Excluir',
      cancel: 'Cancelar',
      'make-public': 'Tornar público',
      'make-private': 'Tornar privado',
      'version-history': 'Histórico de versões',
    },

    access: {
      public: 'Público',
      private: 'Privado',
    },

    selection: {
      count: {
        one: '{count} selecionado',
        other: '{count} selecionados',
      },
      'make-public': {
        label: 'Tornar os documentos selecionados públicos',
      },
      'make-private': {
        label: 'Tornar os documentos selecionados privados',
      },
      'delete': {
        label: 'Excluir os documentos selecionados',
      },
    },

    table: {
      label: 'Documentos',
      'select-all': {
        label: 'Selecionar todos os documentos',
      },
    },
    column: {
      starred: 'Favorito',
      name: 'Nome',
      folder: 'Pasta',
      access: 'Acesso',
      version: 'Versão',
      modified: 'Modificado',
      actions: 'Ações',
    },

    row: {
      select: {
        label: 'Selecionar {name}',
      },
      star: {
        label: 'Favoritar {name}',
      },
      unstar: {
        label: 'Remover {name} dos favoritos',
      },
      menu: {
        label: 'Ações para {name}',
      },
      unnamed: {
        title: 'Este documento ainda não tem nome',
      },
    },

    version: {
      short: 'v{version}',
    },

    confirm: {
      confirm_delete_document: 'Excluir documento, tem certeza?',
      confirm_delete_documents: 'Excluir documentos, tem certeza?',
    },

    error: {
      title: 'Não foi possível carregar seus documentos',
      detail: 'O carregamento falhou devido a um erro. Tente novamente mais tarde.',
      retry: 'Tentar novamente',
    },

    messages: {
      rename_failed: 'Falha ao renomear. Tente novamente mais tarde.',
      rename_succeeded: 'Documento renomeado',

      delete_failed: 'Falha ao excluir. Tente novamente mais tarde.',
      one_document_deleted: 'Documento excluído',
      multiple_documents_deleted: 'Documentos excluídos',

      update_failed: 'Falha ao atualizar. Tente novamente mais tarde.',

      duplicate_succeeded: 'Documento criado',
      duplicate_failed: 'Falha ao duplicar. Tente novamente mais tarde.',

      restore_succeeded: 'Documento restaurado',
      restore_failed: 'Falha ao restaurar. Tente novamente mais tarde.',

    },

    empty: {
      title: 'Nenhum documento ainda',
      detail: 'As planilhas que você criar ou importar aparecerão aqui, junto com o histórico de versões.',
    },

    'no-match': {
      title: 'Nenhum documento corresponde a “{query}”',
      detail: 'A pesquisa abrange todas as pastas. Tente um termo mais curto.',
      action: 'Limpar pesquisa',
    },

    'empty-filter': {
      title: 'Nada aqui',
      detail: 'Nenhum documento corresponde a este filtro.',
      'detail-folder': 'Nenhum documento em {folder}.',
      action: 'Mostrar todos os documentos',
    },

    footer: {
      count: {
        one: '{count} documento',
        other: '{count} documentos',
      },
      filtered: '{count} de {total} documentos',
      'searching-all': 'pesquisando em todas as pastas',
    },

    panel: {
      label: 'Detalhes do documento',
      open: {
        title: 'Abrir documento',
      },
      close: {
        label: 'Fechar detalhes',
      },
      'copy-link': {
        label: 'Copiar link',
        copied: {
          label: 'Link copiado',
          title: 'Copiado',
        },
      },
      'unnamed-hint': 'Ainda sem nome — este é o endereço. Renomear define um nome.',
      star: {
        label: 'Favoritar este documento',
      },
      unstar: {
        label: 'Remover este documento dos favoritos',
      },
      field: {
        access: 'Acesso',
        starred: 'Favorito',
        created: 'Criado',
        modified: 'Modificado',
        version: 'Versão',
      },
    },

    history: {
      title: 'Versões anteriores',
      loading: 'Carregando histórico de versões',
      error: 'Não foi possível carregar o histórico de versões.',
      retry: 'Tentar novamente',
      menu: {
        label: 'Ações para a versão {version}',
      },
      open: {
        text: 'Abrir esta versão',
        label: 'Abrir a versão {version}',
      },
      duplicate: 'Duplicar como novo documento',
      restore: 'Restaurar',
      none: 'Nenhuma versão anterior ainda. Elas aparecem aqui conforme você salva.',
      kept: {
        one: 'Mantendo uma versão anterior.',
        other: 'Mantendo as últimas {count} versões anteriores.',
      },
    },

    time: {
      'just-now': 'agora mesmo',
      minutes: {
        one: '{count} minuto atrás',
        other: '{count} minutos atrás',
      },
      hours: {
        one: '{count} hora atrás',
        other: '{count} horas atrás',
      },
      days: {
        one: '{count} dia atrás',
        other: '{count} dias atrás',
      },
      today: 'hoje, {time}',
      yesterday: 'ontem, {time}',
    },
  },

  'documents-table': {
    document: {
      label: 'Documento',
    },
    'updated-date': {
      label: 'Atualizado',
    },
    'created-date': {
      label: 'Criado',
    },
    access: {
      label: 'Acesso',
      'type-private': 'Privado',
      'type-public': 'Público',
    },
    'filter-documents': {
      label: 'Filtrar documentos',
    },

    controls: {
      'delete-selected': 'Excluir selecionados',
      'make-public': 'Tornar público',
      'make-private': 'Tornar privado',
    },
  },

  'account-page': {
    title: 'Conta',
  },

  'sign-in': {
    page: {
      title: 'Entrar',
    },
    form: {
      username: {
        placeholder: 'Nome de usuário ou e-mail',
      },
      password: {
        placeholder: 'Senha',
      },
      'sign-in-button': {
        label: 'Entrar',
      },
      'remember-me': 'Lembrar de mim neste dispositivo',
      instructions: 'Digite seu nome de usuário e sua senha para entrar',
    },
  },

  auth: {
    link: {
      'forgot-password': {
        text: 'Esqueci minha senha',
      },
      'create-account': {
        text: 'Criar conta',
      },
      'sign-in': {
        text: 'Entrar',
      },
    },
  },

  'forgot-password': {
    page: {
      title: 'Esqueci minha senha',
    },
    form: {
      instructions: 'Digite seu endereço de e-mail para redefinir sua senha',
      email: {
        placeholder: 'Endereço de e-mail',
      },
      'reset-password-button': {
        label: 'Redefinir senha',
      },
    },
  },

  'privacy-policy': {
    page: {
      title: 'Política de privacidade',
    },
  },

  'terms-of-use': {
    page: {
      title: 'Termos de uso',
    },
  },

  'create-account': {
    page: {
      title: 'Criar conta',
    },
  },
  'create-password': {
    page: {
      title: 'Criar senha',
    },
  },
  'update-password': {
    page: {
      title: 'Atualizar senha',
    },
  },

  'theme-toggle': {
    'light-theme': 'Tema claro',
    'dark-theme': 'Tema escuro',
    'system-theme': 'Tema do sistema',
  },

  'command-palette': {
    theme: {
      'dark-theme': {
        label: 'Usar tema escuro',
        alt: 'esquema de cores',
      },

      'light-theme': {
        label: 'Usar tema claro',
        alt: 'esquema de cores',
      },

      'system-theme': {
        label: 'Usar tema do sistema',
        alt: 'esquema de cores claro escuro',
      },
    },

    'remove-hyperlink': {
      label: 'Remover hiperlink',
      alt: 'excluir limpar link',
    },

    'insert-hyperlink': {
      label: 'Inserir hiperlink',
      alt: 'adicionar definir link',

      parameter: {
        url: {
          label: 'Digite o endereço do link (URL)',
        },
      },
    },

    'add-edit-comment': {
      label: 'Adicionar ou editar comentário da célula',
      alt: 'nota comentário',

      parameter: {
        comment: {
          label: 'Digite um comentário. Pressione Ctrl + Enter para salvar.',
          'label-mac': 'Digite um comentário. Pressione Cmd + Enter para salvar.',
        },
      },
    },

    'remove-comment': {
      label: 'Remover comentário da célula',
      alt: 'nota',
    },

    'reset-background-color': {
      label: 'Redefinir a cor de fundo na seleção',
      alt: 'limpar preenchimento',
    },

    'set-background-color': {
      label: 'Definir a cor de fundo da seleção',
      alt: 'preenchimento',
    },

    'reset-text-color': {
      label: 'Redefinir a cor do texto na seleção',
      alt: 'limpar primeiro plano',
    },

    'set-text-color': {
      label: 'Definir a cor do texto da seleção',
      alt: 'primeiro plano',
    },

    'reset-border-color': {
      label: 'Redefinir a cor da borda na seleção',
      alt: 'limpar',
    },

    'set-border-color': {
      label: 'Definir a cor da borda da seleção',
    },

    'borders-clear': {
      label: 'Bordas: limpar bordas',
    },
    'border-top': {
      label: 'Bordas: definir borda superior na seleção',
    },
    'border-bottom': {
      label: 'Bordas: definir borda inferior na seleção',
    },
    'border-double-bottom': {
      label: 'Bordas: definir borda inferior dupla na seleção',
    },
    'border-left': {
      label: 'Bordas: definir borda esquerda na seleção',
    },
    'border-right': {
      label: 'Bordas: definir borda direita na seleção',
    },

    'border-outside': {
      label: 'Bordas: definir borda externa na seleção',
      alt: 'externa',
    },

    'border-all': {
      label: 'Bordas: definir todas as bordas na seleção',
    },

    'reset-font-scale': {
      label: 'Redefinir a escala da fonte',
      alt: 'tamanho da fonte do texto',
    },

    'font-scale-increase': {
      label: 'Escala da fonte: aumentar 10%',
      alt: 'tamanho da fonte do texto',
    },

    'font-scale-decrease': {
      label: 'Escala da fonte: diminuir 10%',
      alt: 'tamanho da fonte do texto',
    },

    'insert-donut-chart': {
      label: 'Inserir gráfico de rosca',
      alt: 'gráfico',
    },

    'insert-column-chart': {
      label: 'Inserir gráfico de colunas',
      alt: 'gráfico',
    },

    'insert-bar-chart': {
      label: 'Inserir gráfico de barras',
      alt: 'gráfico',
    },

    'insert-line-chart': {
      label: 'Inserir gráfico de linhas',
      alt: 'gráfico',
    },

    'insert-scatter-plot': {
      label: 'Inserir gráfico de dispersão',
      alt: 'gráfico',
    },

    'insert-box-plot': {
      label: 'Inserir boxplot',
      alt: 'gráfico limites',
    },

    'insert-image': {
      label: 'Inserir imagem',
    },

    'cf-gradient-red-green': {
      label: 'Formatação condicional gradiente: vermelho-verde',
    },
    'cf-gradient-green-red': {
      label: 'Formatação condicional gradiente: verde-vermelho',
    },
    'cf-unique-values': {
      label: 'Formatação condicional: valores exclusivos',

      parameter: {
        color: {
          label: 'Selecione a cor para valores exclusivos',
        },
      },
    },

    'cf-data-bars': {
      label: 'Formatação condicional: barras de dados',
      alt: 'barra de dados',

      parameter: {
        color: {
          label: 'Selecione a cor para as barras de dados',
        },
        'hide-values': {
          label: 'Ocultar valores?',
          choice: {
            'true': 'Sim, ocultar valores',
            'false': 'Não, mostrar valores',
          },
        },
      },
    },

    'cf-duplicate-values': {
      label: 'Formatação condicional: valores duplicados',

      parameter: {
        color: {
          label: 'Selecione a cor para valores duplicados',
        },
      },
    },

    'cf-clear': {
      label: 'Limpar a formatação condicional da seleção',
      alt: 'remover',
    },

    'fit-column-widths': {
      label: 'Ajustar a largura das colunas selecionadas (tamanho automático)',
    },

    'fit-data': {
      label: 'Ajustar dados',
      alt: 'ajustar',
    },

    'named-ranges': {
      label: 'Intervalos nomeados e expressões',
      alt: 'gerenciador de nomes definir nome excluir nome limpar',
    },

    'set-tab-color': {
      label: 'Definir a cor da aba',
    },

    'reset-tab-color': {
      label: 'Redefinir a cor da aba',
      alt: 'limpar remover',
    },

    'fit-row-heights': {
      label: 'Ajustar a altura das linhas selecionadas (tamanho automático)',
    },

    'correlation-matrix': {
      label: 'Verificar a matriz de correlação',
    },

    'hide-sheet': {
      label: 'Ocultar planilha',
      alt: 'visível',
    },

    'unhide-all-sheets': {
      label: 'Mostrar todas as planilhas',
      alt: 'visível',
    },

    'unhide-columns': {
      label: 'Mostrar colunas da planilha',
    },
    'unhide-rows': {
      label: 'Mostrar linhas da planilha',
    },
    'hide-rows': {
      label: 'Ocultar linhas selecionadas',
    },
    'hide-columns': {
      label: 'Ocultar colunas selecionadas',
    },

    'las-vegas-simulation': {
      label: 'Simulação de Las Vegas...',
    },
    'simulation-settings': {
      label: 'Configurações de simulação...',
    },
    'language-settings': {
      label: 'Configurações de idioma...',
    },

    'load-desktop-file': {
      label: 'Carregar arquivo do computador...',
      alt: 'excel csv importar',
    },

    'save-xlsx': {
      label: 'Salvar como XLSX',
      alt: 'baixar excel',
    },

    'save-csv': {
      label: 'Salvar a planilha atual como CSV',
      alt: 'baixar exportar',
    },

    'save-to-cloud': {
      label: 'Salvar na nuvem',
    },

    'load-document': {
      label: 'Carregar documento...',
      alt: 'abrir',
    },

    'download-json': {
      label: 'Baixar para o computador (JSON)',
      alt: 'salvar',
    },

    'insert-function': {
      label: 'Inserir função...',
    },
    find: {
      label: 'Localizar em valores/fórmulas...',
    },
    'insert-distribution': {
      label: 'Inserir distribuição aleatória...',
    },
    'run-simulation': {
      label: 'Executar simulação...',
    },
    'quick-view': {
      label: 'Visualização rápida...',
    },
    'new-model': {
      label: 'Novo modelo',
    },
    'revert-file': {
      label: 'Reverter arquivo',
    },
    recalculate: {
      label: 'Recalcular',
    },
    undo: {
      label: 'Desfazer',
    },
    'delete-columns': {
      label: 'Excluir colunas selecionadas',
    },
    'delete-rows': {
      label: 'Excluir linhas selecionadas',
    },
    'insert-column': {
      label: 'Inserir coluna',
    },
    'insert-row': {
      label: 'Inserir linha',
    },
    'set-view-scale': {
      label: 'Definir escala de visualização (zoom)',

      parameter: {
        scale: {
          label: 'Digite a escala de visualização',
        },
      },
    },
    'reset-view-scale': {
      label: 'Redefinir escala de visualização (zoom)',
    },

    'rename-tab': {
      label: 'Renomear aba',
      alt: 'planilha página',

      parameter: {
        name: {
          label: 'Digite um nome para esta aba',
        },
      },
    },

    'add-tab': {
      label: 'Adicionar aba',
      alt: 'planilha página',

      parameter: {
        name: {
          label: 'Digite um nome para a nova aba',
        },
      },
    },

    'delete-tab': {
      label: 'Excluir aba',
      alt: 'planilha página',
    },

    'increase-indent': {
      label: 'Aumentar recuo',
      alt: 'mais',
    },

    'decrease-indent': {
      label: 'Diminuir recuo',
      alt: 'menos',
    },

    'number-format-increase-precision': {
      label: 'Formato de número: aumentar precisão',
      alt: 'mais casas decimais',
    },

    'number-format-decrease-precision': {
      label: 'Formato de número: diminuir precisão',
      alt: 'menos menos casas decimais',
    },

    'number-format': {
      label: 'Formato de número',
      alt: 'formato de número personalizado',

      parameter: {
        format: {
          label: 'Digite o formato de número ou um nome simbólico',
        },
      },
    },

    'merge-cells': {
      label: 'Mesclar células selecionadas',
    },
    'unmerge-cells': {
      label: 'Desmesclar células selecionadas',
    },
    'lock-cells': {
      label: 'Bloquear células selecionadas',
    },
    'unlock-cells': {
      label: 'Desbloquear células selecionadas',
    },

    'valign-top': {
      label: 'Formatar seleção: alinhar na parte superior',
    },
    'valign-bottom': {
      label: 'Formatar seleção: alinhar na parte inferior',
    },
    'valign-middle': {
      label: 'Formatar seleção: alinhar no meio',
    },

    'align-left': {
      label: 'Formatar seleção: justificar o texto à esquerda',
      alt: 'alinhamento horizontal',
    },

    'align-right': {
      label: 'Formatar seleção: justificar o texto à direita',
      alt: 'alinhamento horizontal',
    },

    'align-center': {
      label: 'Formatar seleção: centralizar o texto',
      alt: 'alinhamento horizontal justificar',
    },

    'toggle-word-wrap': {
      label: 'Formatar seleção: alternar quebra de texto',
    },

    'toggle-gridlines': {
      label: 'Alternar linhas de grade na planilha ativa',
    },
    'show-gridlines': {
      label: 'Mostrar linhas de grade na planilha ativa',
    },
    'hide-gridlines': {
      label: 'Ocultar linhas de grade na planilha ativa',
    },

    'toggle-bold': {
      label: 'Formatar seleção: alternar negrito',
    },
    'toggle-italic': {
      label: 'Formatar seleção: alternar itálico',
    },
    'toggle-underline': {
      label: 'Formatar seleção: alternar sublinhado',
    },
    'toggle-strikethrough': {
      label: 'Formatar seleção: alternar tachado',
    },

    'reset-text-formatting': {
      label: 'Formatar seleção: redefinir a formatação do texto',
      alt: 'limpar',
    },
  },

  'comment-dialog': {
    'remove-comment-button': {
      label: 'Remover comentário',
    },
    'save-button': {
      label: 'Salvar',
    }
  },

  'correlation-matrix': {
    'title': 'Matriz de correlação',
    'accept-changes': 'Aceitar alterações',
    'close-dialog': 'Fechar',

    'invalid-shape': 'Selecione uma matriz quadrada de pelo menos 2x2 células.',
    'invalid-data': 'A matriz de correlação deve ter diagonal unitária.\nCada célula da diagonal deve resultar em {unit}.',
    'asymmetric': 'A matriz de correlação deve ser simétrica, ou você pode omitir a triangular superior ou inferior.',

    'solution-text': 'A matriz de correlação não é positiva definida. Encontramos uma solução fazendo pequenos ajustes nos valores. O erro agregado é {error}.',
    'positive-definite': 'A matriz de correlação é positiva definida.',

  },

  'sign-in-page': {
    heading: 'Entrar',
    subtitle: 'Digite seu nome de usuário e sua senha para entrar.',

    username: {
      label: 'Nome de usuário ou e-mail',
      required: 'Digite seu nome de usuário ou e-mail.',
    },

    password: {
      label: 'Senha',
      required: 'Digite sua senha.',
      show: {
        label: 'Mostrar senha',
      },
      hide: {
        label: 'Ocultar senha',
      },
      'caps-lock': 'Caps Lock está ativado.',
    },

    remember: {
      label: 'Lembrar de mim neste dispositivo',
    },

    submit: {
      label: 'Entrar',
      pending: 'Entrando…',
    },

    error: {
      rejected: 'Nome de usuário ou senha incorretos.',
      unreachable: 'Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.',
      incomplete: 'Não foi possível concluir a autenticação. Tente novamente.',
    },

    link: {
      'forgot-password': 'Esqueci minha senha',
      'create-account': 'Criar conta',
    },
  },

  'backstage-form': {
    email: {
      required: 'Digite seu endereço de e-mail.',
      invalid: 'Isso não parece um endereço de e-mail.',
    },

    username: {
      required: 'Escolha um nome de usuário.',
      'too-short': 'Os nomes de usuário têm pelo menos {min} caracteres.',
      'too-long': 'Os nomes de usuário têm no máximo {max} caracteres.',
      invalid: 'Use letras, números, hífens e sublinhados, começando com uma letra.',
    },

    password: {
      required: 'Escolha uma senha.',
      'too-short': 'As senhas têm pelo menos {min} caracteres.',
    },
  },

  'create-account-page': {
    heading: 'Criar conta',

    subtitle: 'Pedimos um endereço de e-mail e um nome de usuário porque os documentos são armazenados sob seu nome de usuário.',

    terms: {
      text: 'Leia nossos {link}.',
      link: 'termos de serviço',
    },

    email: {
      label: 'Endereço de e-mail',
      taken: 'Já existe uma conta com esse endereço de e-mail.',
    },

    username: {
      label: 'Nome de usuário',
      taken: '@{username} já está em uso.',
      reserved: '@{username} não está disponível.',
      checking: 'Verificando disponibilidade…',
      available: '@{username} está disponível.',
    },

    handle: {
      example: '@{username}/exemplo',
      placeholder: 'nome de usuário',
    },

    after: 'Enviaremos a você um link por e-mail para confirmar seu endereço e criar uma senha.',

    submit: {
      label: 'Criar conta',
      pending: 'Criando conta…',
    },

    error: {
      unreachable: 'Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.',
      rejected: 'Não foi possível criar essa conta. Verifique seus dados e tente novamente.',
    },

    done: {
      heading: 'Verifique seu e-mail',
      body: 'Enviamos um link para {email}. Abra-o para confirmar seu endereço e escolher uma senha.',
      spam: 'Nada por lá? Aguarde um minuto e verifique sua pasta de spam.',
      restart: 'Usar um endereço diferente',
    },

    link: {
      'forgot-password': 'Esqueci minha senha',
      'sign-in': 'Entrar',
    },
  },

  'forgot-password-page': {
    heading: 'Esqueci minha senha',
    subtitle: 'Digite seu endereço de e-mail e enviaremos um link para você escolher uma nova senha.',

    email: {
      label: 'Endereço de e-mail',
    },

    submit: {
      label: 'Enviar o link',
      pending: 'Enviando…',
    },

    error: {
      unreachable: 'Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.',
    },

    done: {
      heading: 'Verifique seu e-mail',
      body: 'Se houver uma conta para {email}, enviamos um link para ela. Abra-o para escolher uma nova senha.',
      spam: 'Nada por lá? Aguarde um minuto e verifique sua pasta de spam.',
      restart: 'Usar um endereço diferente',
    },

    link: {
      'sign-in': 'Entrar',
      'create-account': 'Criar conta',
    },
  },

  'create-password-page': {
    heading: 'Criar uma senha',
  },

  'update-password-page': {
    heading: 'Escolha uma nova senha',
    subtitle: 'Digite o token do link que enviamos a você.',

    identifier: {
      label: 'Nome de usuário ou e-mail',
      required: 'Digite seu nome de usuário ou e-mail.',
    },

    token: {
      label: 'Token',
      required: 'Digite o token do link que enviamos a você.',
      invalid: 'Esse token não é válido. Verifique o link ou solicite um novo.',
      expired: 'Esse link expirou. Solicite um novo.',
      used: 'Esse link já foi usado. Solicite um novo.',
    },

    password: {
      label: 'Nova senha',
      show: {
        label: 'Mostrar senha',
      },
      hide: {
        label: 'Ocultar senha',
      },
      'caps-lock': 'Caps Lock está ativado.',

      common: 'Essa senha é fácil de adivinhar. Escolha outra.',
    },

    strength: {
      title: 'Força da senha',

      weak: 'Fraca',
      fair: 'Razoável',
      good: 'Boa',
      strong: 'Forte',
    },

    submit: {
      label: 'Atualizar senha',
      pending: 'Atualizando…',
    },

    error: {
      unreachable: 'Não foi possível acessar o servidor. Verifique sua conexão e tente novamente.',
      rejected: 'Não foi possível atualizar essa senha. Verifique seus dados e tente novamente.',
    },

    done: {
      heading: 'Senha atualizada',
      body: 'Sua nova senha foi salva.',
      'continue': 'Continuar para o aplicativo',
    },

    link: {
      'sign-in': 'Entrar',
      'forgot-password': 'Enviar um novo link',
    },
  },

  'new-document': {
    'discard-changes-message': 'Você tem alterações não salvas. Tem certeza?',
    'discard-changes-confirm': 'Novo documento',
  },

  'status-pill': {
    messages: {
      'unsaved-changes': 'Alterações não salvas',
    },
  },

} satisfies DeepPartial<I18N>;
