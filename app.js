    const STORAGE_KEY = "inova_orcamentos_transportadora";
    const CLIENT_STORAGE_KEY = "inova_clientes_transportadora";
    const RESPONSAVEL_STORAGE_KEY = "inova_responsaveis_transportadora";
    const MOTORISTA_STORAGE_KEY = "inova_motoristas_transportadora";
    const VEICULO_STORAGE_KEY = "inova_veiculos_transportadora";
    const CATEGORIA_DESPESA_STORAGE_KEY = "inova_categorias_despesas_transportadora";
    const FORMA_PAGAMENTO_STORAGE_KEY = "inova_formas_pagamento_transportadora";
    const CENTRO_CUSTO_STORAGE_KEY = "inova_centros_custo_transportadora";
    const DESPESA_STORAGE_KEY = "inova_despesas_transportadora";
    const TIPO_SERVICO_STORAGE_KEY = "inova_tipos_servico_transportadora";
    const API_BASE_URL = (() => {
      const normalizar = (url) => String(url || "").trim().replace(/\/+$/, "");

      const apiQuery = new URLSearchParams(window.location.search).get("api");
      if (apiQuery) {
        const base = normalizar(apiQuery);
        if (base) {
          localStorage.setItem("inova_api_base_url", base);
          return base.endsWith("/api") ? base : `${base}/api`;
        }
      }

      const apiSalva = normalizar(localStorage.getItem("inova_api_base_url"));
      if (apiSalva) {
        return apiSalva.endsWith("/api") ? apiSalva : `${apiSalva}/api`;
      }

      const localHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      if (localHost) {
        return "http://localhost:3001/api";
      }

      // Em hospedagem publica, assume API no mesmo dominio em /api.
      return `${window.location.origin}/api`;
    })();
    const AUTH_TOKEN_KEY = "inova_auth_token";
    const AUTH_USER_KEY = "inova_usuario_logado";
    const LOGIN_MODO_LOCAL_KEY = "inova_login_modo_local";
    const MODO_LOCAL_ARQUIVO = window.location.protocol === "file:";

    const tabOrcamentos = document.getElementById("tab-orcamentos");
    const tabCadastro = document.getElementById("tab-cadastro");
    const tabFinanceiro = document.getElementById("tab-financeiro");
    const painelOrcamentos = document.getElementById("painel-orcamentos");
    const painelCadastro = document.getElementById("painel-cadastro");
    const painelFinanceiro = document.getElementById("painel-financeiro");
    const cadastroTipoSeletor = document.getElementById("cadastroTipoSeletor");
    const cadastroConteudoClientes = document.getElementById("cadastro-conteudo-clientes");
    const cadastroConteudoResponsaveis = document.getElementById("cadastro-conteudo-responsaveis");
    const cadastroConteudoMotoristas = document.getElementById("cadastro-conteudo-motoristas");
    const cadastroConteudoVeiculos = document.getElementById("cadastro-conteudo-veiculos");
    const cadastroConteudoTiposServico = document.getElementById("cadastro-conteudo-tipos-servico");
    const loginOverlay = document.getElementById("login-overlay");
    const loginForm = document.getElementById("login-form");
    const loginResponsavel = document.getElementById("loginResponsavel");
    const loginSenha = document.getElementById("loginSenha");
    const loginMessage = document.getElementById("login-message");
    const loginFecharButton = document.getElementById("login-fechar");

    const form = document.getElementById("orcamento-form");
    const tbody = document.getElementById("orcamentos-body");
    const message = document.getElementById("mensagem");
    const totalEl = document.getElementById("total-orcamentos");
    const totalValorEl = document.getElementById("valor-total");
    const ticketMedioEl = document.getElementById("ticket-medio");
    const clearButton = document.getElementById("limpar-formulario");
    const exportButton = document.getElementById("exportar-json");
    const listaClientesOrcamento = document.getElementById("lista-clientes-orcamento");
    const visualizarPropostaButton = document.getElementById("visualizar-proposta");
    const imprimirPropostaButton = document.getElementById("imprimir-proposta");
    const ocultarPropostaButton = document.getElementById("ocultar-proposta");
    const blocoProposta = document.getElementById("bloco-proposta");
    const produtosListaEl = document.getElementById("produtos-lista");
    const adicionarProdutoButton = document.getElementById("adicionar-produto");

    const clienteForm = document.getElementById("cliente-form");
    const clienteMessage = document.getElementById("mensagem-cliente");
    const clientesTbody = document.getElementById("clientes-body");
    const clearClienteButton = document.getElementById("limpar-cliente-formulario");
    const filtroClienteCadastro = document.getElementById("filtro-cliente-cadastro");

    const responsavelForm = document.getElementById("responsavel-form");
    const responsavelMessage = document.getElementById("mensagem-responsavel");
    const responsaveisTbody = document.getElementById("responsaveis-body");
    const clearResponsavelButton = document.getElementById("limpar-responsavel-formulario");

    const motoristaForm = document.getElementById("motorista-form");
    const motoristaMessage = document.getElementById("mensagem-motorista");
    const motoristasTbody = document.getElementById("motoristas-body");
    const clearMotoristaButton = document.getElementById("limpar-motorista-formulario");

    const veiculoForm = document.getElementById("veiculo-form");
    const veiculoMessage = document.getElementById("mensagem-veiculo");
    const veiculosTbody = document.getElementById("veiculos-body");
    const clearVeiculoButton = document.getElementById("limpar-veiculo-formulario");

    const tipoServicoForm = document.getElementById("tipo-servico-form");
    const tipoServicoMessage = document.getElementById("mensagem-tipo-servico");
    const tiposServicoTbody = document.getElementById("tipos-servico-body");
    const clearTipoServicoButton = document.getElementById("limpar-tipo-servico-formulario");
    const filtroTipoServico = document.getElementById("filtro-tipo-servico");
    const pesquisarTipoServicoButton = document.getElementById("pesquisar-tipo-servico");
    
    const filtroCliente = document.getElementById("filtro-cliente");
    const filtroStatusOrcamento = document.getElementById("filtro-status-orcamento");
    const filtroStatusEntrega = document.getElementById("filtro-status-entrega");
    const filtroDataInicio = document.getElementById("filtro-data-inicio");
    const filtroDataFim = document.getElementById("filtro-data-fim");
    const aplicarFiltrosButton = document.getElementById("aplicar-filtros");
    const limparFiltrosButton = document.getElementById("limpar-filtros");

    const financeiroModuloSeletor = document.getElementById("financeiroModuloSeletor");
    const financeiroConteudoLancamento = document.getElementById("financeiro-conteudo-lancamento");
    const financeiroConteudoCategorias = document.getElementById("financeiro-conteudo-categorias");
    const financeiroConteudoFormas = document.getElementById("financeiro-conteudo-formas");
    const financeiroConteudoCentros = document.getElementById("financeiro-conteudo-centros");

    const despesaForm = document.getElementById("despesa-form");
    const despesaMessage = document.getElementById("mensagem-despesa");
    const clearDespesaButton = document.getElementById("limpar-despesa-formulario");

    const categoriaDespesaForm = document.getElementById("categoria-despesa-form");
    const categoriaMessage = document.getElementById("mensagem-categoria");
    const categoriasDespesasTbody = document.getElementById("categorias-despesas-body");
    const clearCategoriaButton = document.getElementById("limpar-categoria-formulario");

    const formaPagamentoForm = document.getElementById("forma-pagamento-form");
    const formaMessage = document.getElementById("mensagem-forma");
    const formasPagamentoTbody = document.getElementById("formas-pagamento-body");
    const clearFormaButton = document.getElementById("limpar-forma-formulario");

    const centroCustoForm = document.getElementById("centro-custo-form");
    const centroMessage = document.getElementById("mensagem-centro");
    const centrosCustoTbody = document.getElementById("centros-custo-body");
    const clearCentroButton = document.getElementById("limpar-centro-formulario");

    let orcamentosCache = [];
    let clientesCache = [];
    let responsaveisCache = [];
    let motoristasCache = [];
    let veiculosCache = [];
    let categoriasDespesasCache = [];
    let formasPagamentoCache = [];
    let centrosCustoCache = [];
    let despesasCache = [];
    let tiposServicoCache = [];
    let opcoesLookupCache = {};
    let apiDisponivel = false;
    let usuarioLogado = null;
    let authToken = sessionStorage.getItem(AUTH_TOKEN_KEY) || "";
    let numeroOrcamentoReservado = null;
    const numerosLocaisReservados = new Set();
    const orcNumeroValorEl = document.getElementById("orc-numero-valor");

    const RESPONSAVEIS_PADRAO = [
      { id: 1, nome: "PEDRO", rg: "", telefone: "" },
      { id: 2, nome: "ANDERSON", rg: "", telefone: "" },
      { id: 3, nome: "MARIA", rg: "", telefone: "" },
      { id: 4, nome: "BIANCA", rg: "", telefone: "" },
      { id: 5, nome: "GIOVANNA", rg: "", telefone: "" },
      { id: 6, nome: "FABIOLA", rg: "", telefone: "" },
      { id: 7, nome: "ALLANA", rg: "", telefone: "" },
      { id: 8, nome: "ALLAN", rg: "", telefone: "" },
      { id: 9, nome: "INOVA", rg: "", telefone: "" }
    ];

    const CREDENCIAIS_FALLBACK_LOCAL = {
      PEDRO: "PEDRO@123",
      ANDERSON: "ANDERSON@123",
      MARIA: "MARIA@123",
      BIANCA: "BIANCA@123",
      GIOVANNA: "GIOVANNA@123",
      FABIOLA: "FABIOLA@123",
      ALLANA: "ALLANA@123",
      ALLAN: "ALLAN@123",
      INOVA: "INOVA@ADM123"
    };

    const TIPOS_SERVICO_PADRAO = [
      { id: 1, codigo: "001", descricao: "Mudança Residencial", categoria: "Mudanças", abrangencia: "Municipal", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 2, codigo: "002", descricao: "Mudança Comercial", categoria: "Mudanças", abrangencia: "Municipal", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 3, codigo: "003", descricao: "Transporte de Veículos", categoria: "Transportes", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 4, codigo: "004", descricao: "Transporte de Motocicletas", categoria: "Transportes", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 5, codigo: "005", descricao: "Transporte de Móveis", categoria: "Transportes", abrangencia: "Municipal", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 6, codigo: "006", descricao: "Carga Fracionada", categoria: "Transportes", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 7, codigo: "007", descricao: "Carga Fechada", categoria: "Transportes", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 8, codigo: "008", descricao: "Objetos de Valor", categoria: "Especial", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 9, codigo: "009", descricao: "Obras de Arte", categoria: "Especial", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 10, codigo: "010", descricao: "Guarda-Móveis", categoria: "Armazenagem", abrangencia: "Municipal", necessitaSeguro: false, status: "Ativo", observacoes: "" },
      { id: 11, codigo: "011", descricao: "Mudança Interestadual", categoria: "Mudanças", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 12, codigo: "012", descricao: "Mudança Intermunicipal", categoria: "Mudanças", abrangencia: "Intermunicipal", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 13, codigo: "013", descricao: "Mudança Local", categoria: "Mudanças", abrangencia: "Municipal", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 14, codigo: "014", descricao: "Frete Dedicado", categoria: "Logística", abrangencia: "Interestadual", necessitaSeguro: true, status: "Ativo", observacoes: "" },
      { id: 15, codigo: "015", descricao: "Coleta e Entrega", categoria: "Logística", abrangencia: "Municipal", necessitaSeguro: false, status: "Ativo", observacoes: "" }
    ];

    const OPCOES_LOOKUP_PADRAO = {
      tipo_veiculo: [
        { codigo: "001", descricao: "Moto", ordem: 1 },
        { codigo: "002", descricao: "Utilitario Pequeno", ordem: 2 },
        { codigo: "003", descricao: "Fiorino", ordem: 3 },
        { codigo: "004", descricao: "Van", ordem: 4 },
        { codigo: "005", descricao: "VUC (Veiculo Urbano de Carga)", ordem: 5 },
        { codigo: "006", descricao: "3/4", ordem: 6 },
        { codigo: "007", descricao: "Toco", ordem: 7 },
        { codigo: "008", descricao: "Truck", ordem: 8 },
        { codigo: "009", descricao: "Carreta Simples", ordem: 9 },
        { codigo: "010", descricao: "Carreta LS", ordem: 10 },
        { codigo: "011", descricao: "Bitrem", ordem: 11 },
        { codigo: "012", descricao: "Rodotrem", ordem: 12 },
        { codigo: "013", descricao: "Bau", ordem: 13 },
        { codigo: "014", descricao: "Bau Refrigerado", ordem: 14 },
        { codigo: "015", descricao: "Sider", ordem: 15 },
        { codigo: "016", descricao: "Graneleiro", ordem: 16 },
        { codigo: "017", descricao: "Tanque", ordem: 17 },
        { codigo: "018", descricao: "Plataforma", ordem: 18 },
        { codigo: "019", descricao: "Prancha", ordem: 19 },
        { codigo: "020", descricao: "Munck", ordem: 20 },
        { codigo: "021", descricao: "Cegonha", ordem: 21 },
        { codigo: "022", descricao: "Container 20 pes", ordem: 22 },
        { codigo: "023", descricao: "Container 40 pes", ordem: 23 }
      ],
      tipo_carga: [
        { codigo: "Carga Geral", descricao: "Carga Geral", ordem: 1 },
        { codigo: "Carga Fracionada", descricao: "Carga Fracionada", ordem: 2 },
        { codigo: "Carga Completa (FTL)", descricao: "Carga Completa (FTL)", ordem: 3 },
        { codigo: "Carga Refrigerada", descricao: "Carga Refrigerada", ordem: 4 },
        { codigo: "Carga Perigosa", descricao: "Carga Perigosa", ordem: 5 },
        { codigo: "Moveis", descricao: "Moveis", ordem: 6 },
        { codigo: "Eletrodomesticos", descricao: "Eletrodomesticos", ordem: 7 },
        { codigo: "Eletronicos", descricao: "Eletronicos", ordem: 8 },
        { codigo: "Veiculos", descricao: "Veiculos", ordem: 9 },
        { codigo: "Documentos", descricao: "Documentos", ordem: 10 },
        { codigo: "Animais Vivos", descricao: "Animais Vivos", ordem: 11 },
        { codigo: "Obras de Arte", descricao: "Obras de Arte", ordem: 12 },
        { codigo: "Alimenticios", descricao: "Alimenticios", ordem: 13 },
        { codigo: "Texteis", descricao: "Texteis", ordem: 14 },
        { codigo: "Outros", descricao: "Outros", ordem: 15 }
      ],
      status_orcamento: [
        { codigo: "Solicitado", descricao: "Solicitado", ordem: 1 },
        { codigo: "Em Elaboracao", descricao: "Em Elaboração", ordem: 2 },
        { codigo: "Enviado", descricao: "Enviado", ordem: 3 },
        { codigo: "Em Negociacao", descricao: "Em Negociação", ordem: 4 },
        { codigo: "Aguardando Retorno", descricao: "Aguardando Retorno", ordem: 5 },
        { codigo: "Aprovado", descricao: "Aprovado", ordem: 6 },
        { codigo: "Contratado", descricao: "Contratado", ordem: 7 },
        { codigo: "Reprovado", descricao: "Reprovado", ordem: 8 },
        { codigo: "Cancelado", descricao: "Cancelado", ordem: 9 }
      ],
      status_entrega: [
        { codigo: "Aguardando", descricao: "Aguardando", ordem: 1 },
        { codigo: "Pedido Recebido", descricao: "Pedido Recebido", ordem: 2 },
        { codigo: "Programado", descricao: "Programado", ordem: 3 },
        { codigo: "Coletado", descricao: "Coletado", ordem: 4 },
        { codigo: "Em Rota", descricao: "Em Rota", ordem: 5 },
        { codigo: "Em Transporte", descricao: "Em Transporte", ordem: 6 },
        { codigo: "Entregue", descricao: "Entregue", ordem: 7 },
        { codigo: "Reagendado", descricao: "Reagendado", ordem: 8 },
        { codigo: "Ocorrencia", descricao: "Ocorrencia", ordem: 9 },
        { codigo: "Cancelado", descricao: "Cancelado", ordem: 10 }
      ],
      categoria_servico: [
        { codigo: "Mudanças", descricao: "Mudanças", ordem: 1 },
        { codigo: "Transportes", descricao: "Transportes", ordem: 2 },
        { codigo: "Armazenagem", descricao: "Armazenagem", ordem: 3 },
        { codigo: "Logística", descricao: "Logística", ordem: 4 },
        { codigo: "Especial", descricao: "Especial", ordem: 5 }
      ],
      abrangencia_servico: [
        { codigo: "Municipal", descricao: "Municipal", ordem: 1 },
        { codigo: "Intermunicipal", descricao: "Intermunicipal", ordem: 2 },
        { codigo: "Interestadual", descricao: "Interestadual", ordem: 3 },
        { codigo: "Internacional", descricao: "Internacional", ordem: 4 }
      ],
      nome_categoria_despesa: [
        { codigo: "Agua", descricao: "Agua", ordem: 1 },
        { codigo: "Alimentacao", descricao: "Alimentacao", ordem: 2 },
        { codigo: "Aluguel", descricao: "Aluguel", ordem: 3 },
        { codigo: "Borracharia", descricao: "Borracharia", ordem: 4 },
        { codigo: "Combustivel", descricao: "Combustivel", ordem: 5 },
        { codigo: "Contabilidade", descricao: "Contabilidade", ordem: 6 },
        { codigo: "Energia", descricao: "Energia", ordem: 7 },
        { codigo: "Estacionamento", descricao: "Estacionamento", ordem: 8 },
        { codigo: "Hospedagem", descricao: "Hospedagem", ordem: 9 },
        { codigo: "Impostos", descricao: "Impostos", ordem: 10 },
        { codigo: "Internet", descricao: "Internet", ordem: 11 },
        { codigo: "IPVA", descricao: "IPVA", ordem: 12 },
        { codigo: "Lavagem", descricao: "Lavagem", ordem: 13 },
        { codigo: "Licenciamento", descricao: "Licenciamento", ordem: 14 },
        { codigo: "Manutencao", descricao: "Manutencao", ordem: 15 },
        { codigo: "Marketing", descricao: "Marketing", ordem: 16 },
        { codigo: "Material de Escritorio", descricao: "Material de Escritorio", ordem: 17 },
        { codigo: "Pedagio", descricao: "Pedagio", ordem: 18 },
        { codigo: "Pneus", descricao: "Pneus", ordem: 19 },
        { codigo: "Salario", descricao: "Salario", ordem: 20 },
        { codigo: "Seguro", descricao: "Seguro", ordem: 21 },
        { codigo: "Sistema", descricao: "Sistema", ordem: 22 },
        { codigo: "Telefone", descricao: "Telefone", ordem: 23 },
        { codigo: "Vale Alimentacao", descricao: "Vale Alimentacao", ordem: 24 },
        { codigo: "Vale Refeicao", descricao: "Vale Refeicao", ordem: 25 },
        { codigo: "Outros", descricao: "Outros", ordem: 26 }
      ],
      nome_forma_pagamento: [
        { codigo: "Boleto Bancario", descricao: "Boleto Bancario", ordem: 1 },
        { codigo: "Cartao de Credito", descricao: "Cartao de Credito", ordem: 2 },
        { codigo: "Cartao de Debito", descricao: "Cartao de Debito", ordem: 3 },
        { codigo: "Dinheiro", descricao: "Dinheiro", ordem: 4 },
        { codigo: "DOC", descricao: "DOC", ordem: 5 },
        { codigo: "PIX", descricao: "PIX", ordem: 6 },
        { codigo: "TED", descricao: "TED", ordem: 7 },
        { codigo: "Transferencia Bancaria", descricao: "Transferencia Bancaria", ordem: 8 },
        { codigo: "Outros", descricao: "Outros", ordem: 9 }
      ],
      nome_centro_custo: [
        { codigo: "Administrativo", descricao: "Administrativo", ordem: 1 },
        { codigo: "Comercial", descricao: "Comercial", ordem: 2 },
        { codigo: "Diretoria", descricao: "Diretoria", ordem: 3 },
        { codigo: "Financeiro", descricao: "Financeiro", ordem: 4 },
        { codigo: "Frota", descricao: "Frota", ordem: 5 },
        { codigo: "Logistica", descricao: "Logistica", ordem: 6 },
        { codigo: "Operacional", descricao: "Operacional", ordem: 7 },
        { codigo: "Recursos Humanos", descricao: "Recursos Humanos", ordem: 8 },
        { codigo: "Tecnologia", descricao: "Tecnologia", ordem: 9 }
      ]
    };

    let filtrosAtivos = {
      cliente: "",
      statusOrcamento: "",
      statusEntrega: "",
      dataInicio: null,
      dataFim: null
    };

    let filtroClienteCadastroAtivo = "";
    let filtroTipoServicoAtivo = "";

    const MODULOS_CADASTRO = ["clientes", "responsaveis", "motoristas", "veiculos", "tipos-servico"];

    function alternarAba(aba) {
      const mostrarOrcamentos = aba === "orcamentos";
      const mostrarCadastro = aba === "cadastro";
      const mostrarFinanceiro = aba === "financeiro";
      painelOrcamentos.classList.toggle("active", mostrarOrcamentos);
      painelCadastro.classList.toggle("active", mostrarCadastro);
      painelFinanceiro.classList.toggle("active", mostrarFinanceiro);
      tabOrcamentos.classList.toggle("active", mostrarOrcamentos);
      tabCadastro.classList.toggle("active", mostrarCadastro);
      tabFinanceiro.classList.toggle("active", mostrarFinanceiro);
      tabOrcamentos.setAttribute("aria-selected", String(mostrarOrcamentos));
      tabCadastro.setAttribute("aria-selected", String(mostrarCadastro));
      tabFinanceiro.setAttribute("aria-selected", String(mostrarFinanceiro));
    }

    function alternarModuloFinanceiro(modulo) {
      const atual = ["lancamento-despesas", "categorias-despesas", "formas-pagamento", "centros-custo"].includes(modulo)
        ? modulo
        : "lancamento-despesas";
      financeiroModuloSeletor.value = atual;
      const blocos = [
        { el: financeiroConteudoLancamento, chave: "lancamento-despesas", display: "grid" },
        { el: financeiroConteudoCategorias, chave: "categorias-despesas", display: "block" },
        { el: financeiroConteudoFormas, chave: "formas-pagamento", display: "block" },
        { el: financeiroConteudoCentros, chave: "centros-custo", display: "block" }
      ];

      blocos.forEach(({ el, chave, display }) => {
        const visivel = chave === atual;
        el.hidden = !visivel;
        el.style.display = visivel ? display : "none";
      });
    }

    function alternarModuloCadastro(tipoSelecionado) {
      const tipo = MODULOS_CADASTRO.includes(tipoSelecionado) ? tipoSelecionado : "responsaveis";

      alternarAba("cadastro");
      cadastroTipoSeletor.value = tipo;

      cadastroConteudoClientes.hidden = tipo !== "clientes";
      cadastroConteudoResponsaveis.hidden = tipo !== "responsaveis";
      cadastroConteudoMotoristas.hidden = tipo !== "motoristas";
      cadastroConteudoVeiculos.hidden = tipo !== "veiculos";
      cadastroConteudoTiposServico.hidden = tipo !== "tipos-servico";
    }

    function mostrarLoginMensagem(texto, tipo = "error") {
      loginMessage.textContent = texto;
      loginMessage.style.color = tipo === "error" ? "#b42318" : "#1f6fa8";
    }

    function bloquearInterface() {
      document.body.classList.add("app-locked");
      loginOverlay.hidden = false;
      loginOverlay.style.display = "flex";
      loginSenha.value = "";
      loginSenha.focus();
    }

    function liberarInterface() {
      document.body.classList.remove("app-locked");
      loginOverlay.hidden = true;
      loginOverlay.style.display = "none";
    }

    function concluirLogin(nomeUsuario, token) {
      authToken = token;
      usuarioLogado = nomeUsuario;
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
      sessionStorage.setItem(AUTH_USER_KEY, nomeUsuario);
      sessionStorage.removeItem(LOGIN_MODO_LOCAL_KEY);
      mostrarLoginMensagem("Acesso liberado.", "ok");
      liberarInterface();
      alternarAba("orcamentos");
      carregarDadosIniciais().then(() => {
        renderizarTabela();
        renderizarClientes();
        renderizarResponsaveis();
        renderizarMotoristas();
        renderizarVeiculos();
        renderizarCategoriasDespesas();
        renderizarFormasPagamento();
        renderizarCentrosCusto();
        renderizarTiposServico();
        atualizarSelectTipoServicoOrcamento();
        popularTodosDropdownsLookup();
        reservarNovoNumeroOrcamento();
      }).catch(() => {
        ativarModoLocal(nomeUsuario, "API indisponivel. Acesso local liberado.");
      });
    }

    function validarCredencialLocal(responsavel, senha) {
      const senhaEsperada = CREDENCIAIS_FALLBACK_LOCAL[responsavel];
      if (!senhaEsperada) {
        return false;
      }
      return senha === senhaEsperada;
    }

    function ativarModoLocal(nomeUsuario, mensagem) {
      authToken = "";
      apiDisponivel = false;
      usuarioLogado = nomeUsuario;

      sessionStorage.removeItem(AUTH_TOKEN_KEY);
      sessionStorage.setItem(AUTH_USER_KEY, nomeUsuario);
      sessionStorage.setItem(LOGIN_MODO_LOCAL_KEY, "1");

      carregarDadosLocais();
      carregarResponsaveisIniciais();
      prepararNovoResponsavel();
      atualizarSelectResponsaveis();
      atualizarSelectLoginResponsaveis();
      atualizarSelectsFinanceiro();
      atualizarSelectTipoServicoOrcamento();
      renderizarTabela();
      renderizarClientes();
      renderizarResponsaveis();
      renderizarMotoristas();
      renderizarVeiculos();
      renderizarCategoriasDespesas();
      renderizarFormasPagamento();
      renderizarCentrosCusto();
      renderizarTiposServico();

      mostrarLoginMensagem(mensagem || "API indisponivel. Acesso local liberado.", "ok");
      liberarInterface();
      alternarAba("orcamentos");
      reservarNovoNumeroOrcamento();
    }

    function carregarDadosLocais() {
      try {
        orcamentosCache = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      } catch (_error) {
        orcamentosCache = [];
      }

      try {
        clientesCache = JSON.parse(localStorage.getItem(CLIENT_STORAGE_KEY) || "[]");
      } catch (_error) {
        clientesCache = [];
      }

      try {
        const responsaveisSalvos = JSON.parse(localStorage.getItem(RESPONSAVEL_STORAGE_KEY) || "[]");
        responsaveisCache = Array.isArray(responsaveisSalvos) ? responsaveisSalvos : [];
      } catch (_error) {
        responsaveisCache = [];
      }

      apiDisponivel = false;
    }

    function autenticarUsuario() {
      const responsavel = loginResponsavel.value.trim().toUpperCase();
      const senha = loginSenha.value.trim();

      if (!responsavel || !senha) {
        mostrarLoginMensagem("Selecione o responsavel e informe a senha.");
        return Promise.resolve(false);
      }

      return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username: responsavel, password: senha }),
        skipAuth: true
      })
        .then((response) => {
          concluirLogin(response.user.username, response.token);
          return true;
        })
        .catch((error) => {
          const textoErro = String(error && error.message ? error.message : "");
          const ehErro401 = textoErro.includes("401") || textoErro.toLowerCase().includes("invalidos");

          if (ehErro401) {
            mostrarLoginMensagem("Responsavel ou senha invalidos.");
            return false;
          }

          if (validarCredencialLocal(responsavel, senha)) {
            ativarModoLocal(responsavel, "API indisponivel. Entrando em modo local.");
            return true;
          }

          mostrarLoginMensagem("API indisponivel e credencial local invalida.");
          return false;
        });
    }

    function mostrarMensagemCliente(texto, tipo = "ok") {
      clienteMessage.textContent = texto;
      clienteMessage.className = `message ${tipo}`;
    }

    function mostrarMensagemResponsavel(texto, tipo = "ok") {
      responsavelMessage.textContent = texto;
      responsavelMessage.className = `message ${tipo}`;
    }

    function limparMensagemCliente() {
      clienteMessage.textContent = "";
      clienteMessage.className = "message";
    }

    function limparMensagemResponsavel() {
      responsavelMessage.textContent = "";
      responsavelMessage.className = "message";
    }

    function mostrarMensagemMotorista(texto, tipo = "ok") {
      motoristaMessage.textContent = texto;
      motoristaMessage.className = `message ${tipo}`;
    }

    function limparMensagemMotorista() {
      motoristaMessage.textContent = "";
      motoristaMessage.className = "message";
    }

    function mostrarMensagemVeiculo(texto, tipo = "ok") {
      veiculoMessage.textContent = texto;
      veiculoMessage.className = `message ${tipo}`;
    }

    function limparMensagemVeiculo() {
      veiculoMessage.textContent = "";
      veiculoMessage.className = "message";
    }

    function mostrarMensagemDespesa(texto, tipo = "ok") {
      despesaMessage.textContent = texto;
      despesaMessage.className = `message ${tipo}`;
    }

    function limparMensagemDespesa() {
      despesaMessage.textContent = "";
      despesaMessage.className = "message";
    }

    function mostrarMensagemCategoria(texto, tipo = "ok") {
      categoriaMessage.textContent = texto;
      categoriaMessage.className = `message ${tipo}`;
    }

    function limparMensagemCategoria() {
      categoriaMessage.textContent = "";
      categoriaMessage.className = "message";
    }

    function mostrarMensagemForma(texto, tipo = "ok") {
      formaMessage.textContent = texto;
      formaMessage.className = `message ${tipo}`;
    }

    function limparMensagemForma() {
      formaMessage.textContent = "";
      formaMessage.className = "message";
    }

    function mostrarMensagemCentro(texto, tipo = "ok") {
      centroMessage.textContent = texto;
      centroMessage.className = `message ${tipo}`;
    }

    function limparMensagemCentro() {
      centroMessage.textContent = "";
      centroMessage.className = "message";
    }

    function mostrarMensagemTipoServico(texto, tipo = "ok") {
      tipoServicoMessage.textContent = texto;
      tipoServicoMessage.className = `message ${tipo}`;
    }

    function limparMensagemTipoServico() {
      tipoServicoMessage.textContent = "";
      tipoServicoMessage.className = "message";
    }

    function proximoCodigo(lista) {
      if (!Array.isArray(lista) || lista.length === 0) {
        return 1;
      }
      return Math.max(...lista.map((item) => Number(item.codigo) || 0)) + 1;
    }

    function proximoCodigoDespesa() {
      if (!Array.isArray(despesasCache) || despesasCache.length === 0) {
        return "DESP-00001";
      }
      const max = Math.max(
        ...despesasCache.map((item) => {
          const numero = String(item.codigo || "").replace(/\D/g, "");
          return Number(numero) || 0;
        })
      ) + 1;
      return `DESP-${String(max).padStart(5, "0")}`;
    }

    function gerarCodigo() {
      const agora = new Date();
      const y = agora.getFullYear().toString().slice(-2);
      const m = String(agora.getMonth() + 1).padStart(2, "0");
      const d = String(agora.getDate()).padStart(2, "0");
      const rand = Math.floor(Math.random() * 900 + 100);
      return `ORC-${y}${m}${d}-${rand}`;
    }

    function formatarCodigoPorNumero(numero) {
      return `ORC-${String(numero).padStart(6, "0")}`;
    }

    function atualizarBadgeNumeroOrcamento(textoForcado) {
      if (!orcNumeroValorEl) {
        return;
      }
      if (textoForcado) {
        orcNumeroValorEl.textContent = textoForcado;
        return;
      }
      orcNumeroValorEl.textContent = numeroOrcamentoReservado ? numeroOrcamentoReservado.codigo : "—";
    }

    function calcularProximoNumeroLocal() {
      const usados = new Set();
      (Array.isArray(orcamentosCache) ? orcamentosCache : []).forEach((item) => {
        const numero = Number(item && item.numero);
        if (Number.isFinite(numero) && numero > 0) {
          usados.add(numero);
        }
      });
      numerosLocaisReservados.forEach((numero) => usados.add(numero));
      let candidato = 1;
      while (usados.has(candidato)) {
        candidato += 1;
      }
      return candidato;
    }

    async function reservarNovoNumeroOrcamento() {
      if (apiDisponivel && authToken) {
        try {
          const resultado = await apiRequest("/orcamentos/numero/reservar", { method: "POST" });
          numeroOrcamentoReservado = { numero: resultado.numero, codigo: resultado.codigo };
          atualizarBadgeNumeroOrcamento();
          return;
        } catch (_error) {
          // Segue para a reserva local abaixo caso a API falhe.
        }
      }

      const numero = calcularProximoNumeroLocal();
      numerosLocaisReservados.add(numero);
      numeroOrcamentoReservado = { numero, codigo: formatarCodigoPorNumero(numero) };
      atualizarBadgeNumeroOrcamento();
    }

    function liberarNumeroOrcamentoAtual(opcoes = {}) {
      if (!numeroOrcamentoReservado) {
        return;
      }
      const { numero } = numeroOrcamentoReservado;
      numeroOrcamentoReservado = null;

      if (apiDisponivel) {
        const url = `${API_BASE_URL}/orcamentos/numero/${numero}/liberar`;
        if (opcoes.beacon && navigator.sendBeacon) {
          navigator.sendBeacon(url);
        } else {
          fetch(url, { method: "POST" }).catch(() => {});
        }
      } else {
        numerosLocaisReservados.delete(numero);
      }
    }

    function formatarMoeda(valor) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(Number(valor || 0));
    }

    function somenteDigitos(texto) {
      return String(texto || "").replace(/\D/g, "");
    }

    function somenteLetrasEspacos(texto) {
      return String(texto || "").replace(/[^A-Za-zÀ-ÿ\s]/g, "").replace(/\s{2,}/g, " ").trimStart();
    }

    function formatarTelefoneBR(texto) {
      const digitos = somenteDigitos(texto).slice(0, 11);
      if (!digitos) return "";
      if (digitos.length <= 2) return `(${digitos}`;
      if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
      if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
      return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
    }

    function formatarCepBR(texto) {
      const digitos = somenteDigitos(texto).slice(0, 8);
      if (digitos.length <= 5) return digitos;
      return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
    }

    function mascaraTelefoneOuEmail(valor) {
      const texto = String(valor || "").trim();
      if (!texto) return "";
      if (/[a-zA-Z@]/.test(texto)) return texto;
      return formatarTelefoneBR(texto);
    }

    function extrairUF(localTexto) {
      const texto = (localTexto || "").trim();
      const partes = texto.split("/");
      if (partes.length < 2) {
        return "-";
      }
      const uf = partes[partes.length - 1].trim().toUpperCase();
      return uf.length <= 2 ? uf : "-";
    }

    function formatarDataIso(isoString) {
      if (!isoString) {
        return "-";
      }
      const data = new Date(isoString);
      if (Number.isNaN(data.getTime())) {
        return "-";
      }
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

    function normalizarItensProduto(item = {}) {
      let itensOrigem = item.itensProduto;
      if (typeof itensOrigem === "string") {
        try {
          const parsed = JSON.parse(itensOrigem);
          itensOrigem = Array.isArray(parsed) ? parsed : [];
        } catch (_error) {
          itensOrigem = [];
        }
      }

      if (Array.isArray(itensOrigem)) {
        const itens = itensOrigem
          .map((produto) => ({
            quantidade: String(produto && produto.quantidade != null ? produto.quantidade : "").trim(),
            descricao: String(produto && produto.descricao != null ? produto.descricao : "").trim()
          }))
          .filter((produto) => produto.quantidade || produto.descricao);
        if (itens.length > 0) {
          return itens;
        }
      }

      const quantidadeLegada = String(item.quantidade != null ? item.quantidade : "").trim();
      const descricaoLegada = String(item.descricao != null ? item.descricao : "").trim();
      if (quantidadeLegada || descricaoLegada) {
        return [{ quantidade: quantidadeLegada, descricao: descricaoLegada }];
      }

      return [];
    }

    function criarLinhaProduto(item = { quantidade: "", descricao: "" }) {
      const linha = document.createElement("div");
      linha.className = "produto-item";
      linha.innerHTML = `
        <div class="produto-campo">
          <label>Qtde</label>
          <input type="number" class="produto-quantidade" min="1" step="1" placeholder="Ex.: 10" value="${String(item.quantidade || "").replace(/"/g, "&quot;")}">
        </div>
        <div class="produto-campo">
          <label>Descricao do Produto</label>
          <input type="text" class="produto-descricao" maxlength="200" placeholder="Ex.: Caixa de documentos" value="${String(item.descricao || "").replace(/"/g, "&quot;")}">
        </div>
        <button type="button" class="btn-secondary produto-remover">Remover</button>
      `;
      return linha;
    }

    function renderizarItensProdutoFormulario(itens) {
      produtosListaEl.innerHTML = "";
      const lista = Array.isArray(itens) && itens.length > 0 ? itens : [{ quantidade: "", descricao: "" }];
      lista.forEach((item) => {
        produtosListaEl.appendChild(criarLinhaProduto(item));
      });
      atualizarBotoesRemoverProduto();
    }

    function atualizarBotoesRemoverProduto() {
      const linhas = Array.from(produtosListaEl.querySelectorAll(".produto-item"));
      const desabilitar = linhas.length <= 1;
      linhas.forEach((linha) => {
        const botao = linha.querySelector(".produto-remover");
        if (botao) {
          botao.disabled = desabilitar;
        }
      });
    }

    function coletarItensProdutoFormulario() {
      const linhas = Array.from(produtosListaEl.querySelectorAll(".produto-item"));
      return linhas
        .map((linha) => {
          const quantidadeEl = linha.querySelector(".produto-quantidade");
          const descricaoEl = linha.querySelector(".produto-descricao");
          const quantidade = String(quantidadeEl && quantidadeEl.value != null ? quantidadeEl.value : "").trim();
          const descricao = String(descricaoEl && descricaoEl.value != null ? descricaoEl.value : "").trim();
          return { quantidade, descricao };
        })
        .filter((produto) => produto.quantidade || produto.descricao);
    }

    function resetarItensProdutoFormulario() {
      renderizarItensProdutoFormulario([{ quantidade: "", descricao: "" }]);
    }

    function converterDataBRparaISO(dataBR) {
      if (!dataBR || dataBR.length !== 10) return null;
      const [dia, mes, ano] = dataBR.split("/");
      return `${ano}-${mes}-${dia}`;
    }

    function obterDataISO(inputDate) {
      if (!inputDate) return null;
      const data = new Date(inputDate + "T00:00:00");
      return data.toISOString();
    }

    async function apiRequest(path, options = {}) {
      const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
      };

      if (!options.skipAuth && authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(body || `Erro HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return null;
      }

      return response.json();
    }

    async function carregarDadosIniciais() {
      if (!authToken) {
        throw new Error("Sem autenticacao");
      }

      try {
        await apiRequest("/auth/me");
        const [orcamentos, clientes, responsaveis, motoristas, veiculos, categorias, formas, centros, despesas, tiposServico] = await Promise.all([
          apiRequest("/orcamentos"),
          apiRequest("/clientes"),
          apiRequest("/responsaveis"),
          carregarMotoristasIniciais(),
          carregarVeiculosIniciais(),
          carregarCategoriasDespesasIniciais(),
          carregarFormasPagamentoIniciais(),
          carregarCentrosCustoIniciais(),
          carregarDespesasIniciais(),
          carregarTiposServicoIniciais(),
          carregarOpcoesLookupIniciais()
        ]);

        orcamentosCache = Array.isArray(orcamentos) ? orcamentos : orcamentosCache;
        clientesCache = Array.isArray(clientes) ? clientes : clientesCache;
        if (Array.isArray(responsaveis) && responsaveis.length > 0) {
          responsaveisCache = responsaveis;
          localStorage.setItem(RESPONSAVEL_STORAGE_KEY, JSON.stringify(responsaveisCache));
        }
        motoristasCache = Array.isArray(motoristas) ? motoristas : motoristasCache;
        veiculosCache = Array.isArray(veiculos) ? veiculos : veiculosCache;
        categoriasDespesasCache = Array.isArray(categorias) ? categorias : categoriasDespesasCache;
        formasPagamentoCache = Array.isArray(formas) ? formas : formasPagamentoCache;
        centrosCustoCache = Array.isArray(centros) ? centros : centrosCustoCache;
        despesasCache = Array.isArray(despesas) ? despesas : despesasCache;
        if (Array.isArray(tiposServico) && tiposServico.length > 0) {
          tiposServicoCache = tiposServico;
          localStorage.setItem(TIPO_SERVICO_STORAGE_KEY, JSON.stringify(tiposServicoCache));
        }

        if (Array.isArray(orcamentos) && orcamentos.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(orcamentosCache));
        }
        if (Array.isArray(clientes) && clientes.length > 0) {
          localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clientesCache));
        }
        if (Array.isArray(motoristas) && motoristas.length > 0) {
          localStorage.setItem(MOTORISTA_STORAGE_KEY, JSON.stringify(motoristasCache));
        }
        if (Array.isArray(veiculos) && veiculos.length > 0) {
          localStorage.setItem(VEICULO_STORAGE_KEY, JSON.stringify(veiculosCache));
        }
        if (Array.isArray(categorias) && categorias.length > 0) {
          localStorage.setItem(CATEGORIA_DESPESA_STORAGE_KEY, JSON.stringify(categoriasDespesasCache));
        }
        if (Array.isArray(formas) && formas.length > 0) {
          localStorage.setItem(FORMA_PAGAMENTO_STORAGE_KEY, JSON.stringify(formasPagamentoCache));
        }
        if (Array.isArray(centros) && centros.length > 0) {
          localStorage.setItem(CENTRO_CUSTO_STORAGE_KEY, JSON.stringify(centrosCustoCache));
        }
        if (Array.isArray(despesas) && despesas.length > 0) {
          localStorage.setItem(DESPESA_STORAGE_KEY, JSON.stringify(despesasCache));
        }
        apiDisponivel = true;
      } catch (_error) {
        apiDisponivel = false;
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(AUTH_USER_KEY);
        authToken = "";
        usuarioLogado = null;
        bloquearInterface();
        throw _error;
      }
    }

    function filtrarOrcamentos(orcamentos) {
      return orcamentos.filter((orcamento) => {
        // Filtro cliente
        if (filtrosAtivos.cliente) {
          if (!orcamento.cliente.toLowerCase().includes(filtrosAtivos.cliente.toLowerCase())) {
            return false;
          }
        }

        // Filtro status do orcamento
        if (filtrosAtivos.statusOrcamento) {
          if (orcamento.statusOrcamento !== filtrosAtivos.statusOrcamento) {
            return false;
          }
        }

        // Filtro status da entrega
        if (filtrosAtivos.statusEntrega) {
          if (orcamento.statusEntrega !== filtrosAtivos.statusEntrega) {
            return false;
          }
        }

        // Filtro data início
        if (filtrosAtivos.dataInicio) {
          const dataCriacao = new Date(orcamento.criadoEm).getTime();
          const dataInicio = new Date(filtrosAtivos.dataInicio).getTime();
          if (dataCriacao < dataInicio) {
            return false;
          }
        }

        // Filtro data fim
        if (filtrosAtivos.dataFim) {
          const dataCriacao = new Date(orcamento.criadoEm).getTime();
          const dataFim = new Date(filtrosAtivos.dataFim);
          dataFim.setHours(23, 59, 59, 999);
          if (dataCriacao > dataFim.getTime()) {
            return false;
          }
        }

        return true;
      });
    }

    function obterOrcamentos() {
      return Array.isArray(orcamentosCache) ? [...orcamentosCache] : [];
    }

    async function salvarOrcamentos(lista) {
      await apiRequest("/orcamentos/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      orcamentosCache = [...lista];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orcamentosCache));
    }

    function obterClientes() {
      return Array.isArray(clientesCache) ? [...clientesCache] : [];
    }

    function obterResponsaveis() {
      return Array.isArray(responsaveisCache) ? [...responsaveisCache] : [];
    }

    function obterMotoristas() {
      return Array.isArray(motoristasCache) ? [...motoristasCache] : [];
    }

    function obterVeiculos() {
      return Array.isArray(veiculosCache) ? [...veiculosCache] : [];
    }

    function obterCategoriasDespesas() {
      return Array.isArray(categoriasDespesasCache) ? [...categoriasDespesasCache] : [];
    }

    function obterFormasPagamento() {
      return Array.isArray(formasPagamentoCache) ? [...formasPagamentoCache] : [];
    }

    function obterCentrosCusto() {
      return Array.isArray(centrosCustoCache) ? [...centrosCustoCache] : [];
    }

    function obterDespesas() {
      return Array.isArray(despesasCache) ? [...despesasCache] : [];
    }

    function obterTiposServico() {
      return Array.isArray(tiposServicoCache) ? [...tiposServicoCache] : [];
    }

    async function salvarClientes(lista) {
      await apiRequest("/clientes/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      clientesCache = [...lista];
      localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clientesCache));
    }

    async function salvarResponsaveis(lista) {
      if (!apiDisponivel) {
        throw new Error("O cadastro de responsavel com senha exige a API ativa para criar o login.");
      }

      await apiRequest("/responsaveis/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      responsaveisCache = lista.map(({ senha, nomeAnterior, ...item }) => ({ ...item }));
      localStorage.setItem(RESPONSAVEL_STORAGE_KEY, JSON.stringify(responsaveisCache));
    }

    function carregarResponsaveisIniciais() {
      try {
        const dados = JSON.parse(localStorage.getItem(RESPONSAVEL_STORAGE_KEY) || "[]");
        if (Array.isArray(dados) && dados.length > 0) {
          responsaveisCache = dados
            .map((item) => ({
              id: Number(item.id),
              nome: String(item.nome || "").trim().toUpperCase(),
              rg: String(item.rg || "").trim(),
              telefone: String(item.telefone || "").trim()
            }))
            .filter((item) => Number.isFinite(item.id) && item.id > 0 && item.nome);

          if (responsaveisCache.length > 0) {
            return;
          }
        }
      } catch (_error) {
        responsaveisCache = [];
      }

      responsaveisCache = RESPONSAVEIS_PADRAO.map((item) => ({ ...item }));
      localStorage.setItem(RESPONSAVEL_STORAGE_KEY, JSON.stringify(responsaveisCache));
    }

    async function carregarMotoristasIniciais() {
      const dados = await apiRequest("/motoristas");
      motoristasCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(MOTORISTA_STORAGE_KEY, JSON.stringify(motoristasCache));
      return motoristasCache;
    }

    async function carregarVeiculosIniciais() {
      const dados = await apiRequest("/veiculos");
      veiculosCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(VEICULO_STORAGE_KEY, JSON.stringify(veiculosCache));
      return veiculosCache;
    }

    async function salvarMotoristas(lista) {
      await apiRequest("/motoristas/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      motoristasCache = [...lista];
      localStorage.setItem(MOTORISTA_STORAGE_KEY, JSON.stringify(motoristasCache));
    }

    async function salvarVeiculos(lista) {
      await apiRequest("/veiculos/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      veiculosCache = [...lista];
      localStorage.setItem(VEICULO_STORAGE_KEY, JSON.stringify(veiculosCache));
    }

    async function carregarCategoriasDespesasIniciais() {
      const dados = await apiRequest("/categorias-despesas");
      categoriasDespesasCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(CATEGORIA_DESPESA_STORAGE_KEY, JSON.stringify(categoriasDespesasCache));
      return categoriasDespesasCache;
    }

    async function carregarFormasPagamentoIniciais() {
      const dados = await apiRequest("/formas-pagamento");
      formasPagamentoCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(FORMA_PAGAMENTO_STORAGE_KEY, JSON.stringify(formasPagamentoCache));
      return formasPagamentoCache;
    }

    async function carregarCentrosCustoIniciais() {
      const dados = await apiRequest("/centros-custo");
      centrosCustoCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(CENTRO_CUSTO_STORAGE_KEY, JSON.stringify(centrosCustoCache));
      return centrosCustoCache;
    }

    async function carregarDespesasIniciais() {
      const dados = await apiRequest("/despesas");
      despesasCache = Array.isArray(dados) ? dados : [];
      localStorage.setItem(DESPESA_STORAGE_KEY, JSON.stringify(despesasCache));
      return despesasCache;
    }

    async function carregarTiposServicoIniciais() {
      const dados = await apiRequest("/tipos-servico");
      tiposServicoCache = Array.isArray(dados) && dados.length > 0 ? dados : TIPOS_SERVICO_PADRAO.map((item) => ({ ...item }));
      localStorage.setItem(TIPO_SERVICO_STORAGE_KEY, JSON.stringify(tiposServicoCache));
      return tiposServicoCache;
    }

    async function salvarCategoriasDespesas(lista) {
      await apiRequest("/categorias-despesas/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      categoriasDespesasCache = [...lista];
      localStorage.setItem(CATEGORIA_DESPESA_STORAGE_KEY, JSON.stringify(categoriasDespesasCache));
      atualizarSelectsFinanceiro();
    }

    async function salvarFormasPagamento(lista) {
      await apiRequest("/formas-pagamento/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      formasPagamentoCache = [...lista];
      localStorage.setItem(FORMA_PAGAMENTO_STORAGE_KEY, JSON.stringify(formasPagamentoCache));
      atualizarSelectsFinanceiro();
    }

    async function salvarCentrosCusto(lista) {
      await apiRequest("/centros-custo/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      centrosCustoCache = [...lista];
      localStorage.setItem(CENTRO_CUSTO_STORAGE_KEY, JSON.stringify(centrosCustoCache));
      atualizarSelectsFinanceiro();
    }

    async function salvarDespesas(lista) {
      await apiRequest("/despesas/bulk", {
        method: "PUT",
        body: JSON.stringify({ items: lista })
      });

      despesasCache = [...lista];
      localStorage.setItem(DESPESA_STORAGE_KEY, JSON.stringify(despesasCache));
    }

    function atualizarSelectsFinanceiro() {
      const categoriasAtivas = categoriasDespesasCache.filter((item) => item.status === "Ativo");
      const formasAtivas = formasPagamentoCache.filter((item) => item.status === "Ativo");
      const centrosAtivos = centrosCustoCache.filter((item) => item.status === "Ativo");

      despesaForm.despesaCategoria.innerHTML = `<option value="">Selecione</option>${categoriasAtivas.map((item) => `<option value="${item.nome}">${item.nome}</option>`).join("")}`;
      despesaForm.despesaFormaPagamento.innerHTML = `<option value="">Selecione</option>${formasAtivas.map((item) => `<option value="${item.nome}">${item.nome}</option>`).join("")}`;
      despesaForm.despesaCentroCusto.innerHTML = `<option value="">Selecione</option>${centrosAtivos.map((item) => `<option value="${item.nome}">${item.nome}</option>`).join("")}`;

      despesaForm.despesaCliente.innerHTML = `<option value="">Selecione</option>${obterClientes().map((item) => `<option value="${item.nome}">${item.nome}</option>`).join("")}`;
      despesaForm.despesaOrcamento.innerHTML = `<option value="">Selecione</option>${obterOrcamentos().map((item) => `<option value="${item.codigo}">${item.codigo}</option>`).join("")}`;
      despesaForm.despesaVeiculo.innerHTML = `<option value="">Selecione</option>${obterVeiculos().map((item) => `<option value="${item.placa}">${item.placa}</option>`).join("")}`;
      despesaForm.despesaMotorista.innerHTML = `<option value="">Selecione</option>${obterMotoristas().map((item) => `<option value="${item.nome}">${item.nome}</option>`).join("")}`;
      despesaForm.despesaResponsavel.innerHTML = `<option value="">Selecione</option>${obterResponsaveis()
        .sort((a, b) => String(a.nome || "").localeCompare(String(b.nome || ""), "pt-BR"))
        .map((item) => `<option value="${item.nome}">${item.nome}</option>`)
        .join("")}`;
    }

    function renderizarCategoriasDespesas() {
      if (categoriasDespesasCache.length === 0) {
        categoriasDespesasTbody.innerHTML = "<tr><td colspan='5'>Nenhuma categoria cadastrada.</td></tr>";
        return;
      }
      categoriasDespesasTbody.innerHTML = categoriasDespesasCache
        .sort((a, b) => Number(a.codigo) - Number(b.codigo))
        .map((item) => `
          <tr>
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.tipo}</td>
            <td>${item.status}</td>
            <td><div class="table-actions"><button type="button" class="btn-secondary" data-edit-categoria="${item.codigo}">Editar</button><button type="button" class="btn-secondary" data-delete-categoria="${item.codigo}">Excluir</button></div></td>
          </tr>
        `)
        .join("");
    }

    function renderizarFormasPagamento() {
      if (formasPagamentoCache.length === 0) {
        formasPagamentoTbody.innerHTML = "<tr><td colspan='4'>Nenhuma forma cadastrada.</td></tr>";
        return;
      }
      formasPagamentoTbody.innerHTML = formasPagamentoCache
        .sort((a, b) => Number(a.codigo) - Number(b.codigo))
        .map((item) => `
          <tr>
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.status}</td>
            <td><div class="table-actions"><button type="button" class="btn-secondary" data-edit-forma="${item.codigo}">Editar</button><button type="button" class="btn-secondary" data-delete-forma="${item.codigo}">Excluir</button></div></td>
          </tr>
        `)
        .join("");
    }

    function renderizarCentrosCusto() {
      if (centrosCustoCache.length === 0) {
        centrosCustoTbody.innerHTML = "<tr><td colspan='4'>Nenhum centro de custo cadastrado.</td></tr>";
        return;
      }
      centrosCustoTbody.innerHTML = centrosCustoCache
        .sort((a, b) => Number(a.codigo) - Number(b.codigo))
        .map((item) => `
          <tr>
            <td>${item.codigo}</td>
            <td>${item.nome}</td>
            <td>${item.status}</td>
            <td><div class="table-actions"><button type="button" class="btn-secondary" data-edit-centro="${item.codigo}">Editar</button><button type="button" class="btn-secondary" data-delete-centro="${item.codigo}">Excluir</button></div></td>
          </tr>
        `)
        .join("");
    }

    function atualizarSelectMotoristaVeiculo() {
      const atual = veiculoForm.veiculoMotoristaResponsavel.value;
      const opcoes = obterMotoristas()
        .sort((a, b) => String(a.nome || "").localeCompare(String(b.nome || ""), "pt-BR"))
        .map((item) => `<option value="${item.nome}">${item.nome}</option>`)
        .join("");
      veiculoForm.veiculoMotoristaResponsavel.innerHTML = `<option value="">Selecione</option>${opcoes}`;

      if (atual && obterMotoristas().some((item) => item.nome === atual)) {
        veiculoForm.veiculoMotoristaResponsavel.value = atual;
      }
    }

    function proximoIdResponsavel() {
      const lista = obterResponsaveis();
      if (lista.length === 0) return 1;
      return Math.max(...lista.map((item) => Number(item.id) || 0)) + 1;
    }

    function atualizarSelectResponsaveis() {
      const atual = form.responsavel.value;
      const opcoes = obterResponsaveis()
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
        .map((item) => `<option value="${item.nome}">${item.nome}</option>`)
        .join("");

      form.responsavel.innerHTML = `<option value="">Selecione</option>${opcoes}`;

      if (atual && obterResponsaveis().some((item) => item.nome === atual)) {
        form.responsavel.value = atual;
      } else {
        form.responsavel.value = "";
      }
    }

    function atualizarSelectLoginResponsaveis() {
      const atual = loginResponsavel.value;
      const opcoes = obterResponsaveis()
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
        .map((item) => {
          const nome = String(item.nome || "").trim().toUpperCase();
          const label = nome === "INOVA" ? "INOVA (ADMIN)" : nome;
          return `<option value="${nome}">${label}</option>`;
        })
        .join("");

      loginResponsavel.innerHTML = `<option value="">Selecione</option>${opcoes}`;

      if (atual && obterResponsaveis().some((item) => item.nome === atual)) {
        loginResponsavel.value = atual;
      } else {
        loginResponsavel.value = "";
      }
    }

    function atualizarSelectTipoServicoOrcamento() {
      const atual = form.tipoServico.value;
      const ativos = obterTiposServico()
        .filter((item) => String(item.status || "").toLowerCase() === "ativo")
        .sort((a, b) => String(a.descricao || "").localeCompare(String(b.descricao || ""), "pt-BR"));

      const opcoes = ativos
        .map((item) => `<option value="${item.id}">${item.descricao}</option>`)
        .join("");

      form.tipoServico.innerHTML = `<option value="">Selecione</option>${opcoes}`;

      if (atual && ativos.some((item) => String(item.id) === String(atual))) {
        form.tipoServico.value = atual;
      } else {
        form.tipoServico.value = "";
      }
    }

    function prepararNovoTipoServico() {
      tipoServicoForm.tipoServicoId.value = "";
      tipoServicoForm.tipoServicoCodigo.value = "";
      tipoServicoForm.tipoServicoDescricao.value = "";
      tipoServicoForm.tipoServicoCategoria.value = "";
      tipoServicoForm.tipoServicoAbrangencia.value = "";
      tipoServicoForm.tipoServicoSeguro.value = "";
      tipoServicoForm.tipoServicoStatus.value = "Ativo";
      tipoServicoForm.tipoServicoObservacoes.value = "";
    }

    function preencherFormularioTipoServico(item) {
      tipoServicoForm.tipoServicoId.value = String(item.id || "");
      tipoServicoForm.tipoServicoCodigo.value = String(item.codigo || "");
      tipoServicoForm.tipoServicoDescricao.value = String(item.descricao || "");
      tipoServicoForm.tipoServicoCategoria.value = String(item.categoria || "");
      tipoServicoForm.tipoServicoAbrangencia.value = String(item.abrangencia || "");
      tipoServicoForm.tipoServicoSeguro.value = item.necessitaSeguro ? "Sim" : "Não";
      tipoServicoForm.tipoServicoStatus.value = String(item.status || "Ativo");
      tipoServicoForm.tipoServicoObservacoes.value = String(item.observacoes || "");
      tipoServicoForm.tipoServicoCodigo.focus();
    }

    function coletarDadosTipoServicoFormulario() {
      const codigo = tipoServicoForm.tipoServicoCodigo.value.trim();
      const descricao = tipoServicoForm.tipoServicoDescricao.value.trim();
      const categoria = tipoServicoForm.tipoServicoCategoria.value;
      const abrangencia = tipoServicoForm.tipoServicoAbrangencia.value;
      const necessitaSeguroTexto = tipoServicoForm.tipoServicoSeguro.value;
      const status = tipoServicoForm.tipoServicoStatus.value;
      const observacoes = tipoServicoForm.tipoServicoObservacoes.value.trim();

      if (!codigo || !descricao || !categoria || !abrangencia || !necessitaSeguroTexto || !status) {
        return null;
      }

      return {
        codigo,
        descricao,
        categoria,
        abrangencia,
        necessitaSeguro: necessitaSeguroTexto === "Sim",
        status,
        observacoes
      };
    }

    async function criarTipoServico(dados) {
      return apiRequest("/tipos-servico", {
        method: "POST",
        body: JSON.stringify(dados)
      });
    }

    async function atualizarTipoServico(id, dados) {
      return apiRequest(`/tipos-servico/${id}`, {
        method: "PUT",
        body: JSON.stringify(dados)
      });
    }

    async function excluirTipoServico(id) {
      return apiRequest(`/tipos-servico/${id}`, {
        method: "DELETE"
      });
    }

    function renderizarTiposServico() {
      const termo = filtroTipoServicoAtivo.trim().toLowerCase();
      const lista = obterTiposServico().filter((item) => {
        if (!termo) {
          return true;
        }
        return String(item.codigo || "").toLowerCase().includes(termo)
          || String(item.descricao || "").toLowerCase().includes(termo);
      });

      if (lista.length === 0) {
        tiposServicoTbody.innerHTML = "<tr><td colspan='8'>Nenhum tipo de serviço cadastrado.</td></tr>";
        atualizarSelectTipoServicoOrcamento();
        return;
      }

      tiposServicoTbody.innerHTML = lista
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map((item) => `
          <tr>
            <td>${item.id}</td>
            <td>${item.codigo}</td>
            <td>${item.descricao}</td>
            <td>${item.categoria}</td>
            <td>${item.abrangencia}</td>
            <td>${item.necessitaSeguro ? "Sim" : "Não"}</td>
            <td>${item.status}</td>
            <td>
              <div class="table-actions">
                <button type="button" class="btn-secondary" data-edit-tipo-servico="${item.id}">Editar</button>
                <button type="button" class="btn-secondary" data-delete-tipo-servico="${item.id}">Excluir</button>
              </div>
            </td>
          </tr>
        `)
        .join("");

      atualizarSelectTipoServicoOrcamento();
    }

    async function carregarOpcoesLookupIniciais() {
      const tipos = [
        "tipo_veiculo", "tipo_carga", "status_orcamento", "status_entrega",
        "categoria_servico", "abrangencia_servico",
        "nome_categoria_despesa", "nome_forma_pagamento", "nome_centro_custo"
      ];
      const resultado = {};
      await Promise.all(
        tipos.map(async (tipo) => {
          try {
            const dados = await apiRequest(`/opcoes/${tipo}`);
            resultado[tipo] = Array.isArray(dados) && dados.length > 0 ? dados : (OPCOES_LOOKUP_PADRAO[tipo] || []);
          } catch (_e) {
            resultado[tipo] = OPCOES_LOOKUP_PADRAO[tipo] || [];
          }
        })
      );
      opcoesLookupCache = resultado;
      return resultado;
    }

    function _popularSelect(selectEl, opcoes, valorAtual, incluirSelecione) {
      if (!selectEl || !Array.isArray(opcoes) || opcoes.length === 0) {
        return;
      }
      const prefix = incluirSelecione ? '<option value="">Selecione</option>' : '';
      selectEl.innerHTML = prefix + opcoes
        .map((op) => `<option value="${op.codigo}"${op.codigo === valorAtual ? " selected" : ""}>${op.descricao}</option>`)
        .join("");
      if (valorAtual) {
        selectEl.value = valorAtual;
      }
    }

    function popularTodosDropdownsLookup() {
      const op = opcoesLookupCache;

      // Tipo de Veiculo — formulario orcamento
      if (op.tipo_veiculo && form.tipoVeiculo) {
        _popularSelect(form.tipoVeiculo, op.tipo_veiculo, form.tipoVeiculo.value, true);
      }

      // Tipo de Carga — formulario orcamento
      if (op.tipo_carga && form.tipoCarga) {
        _popularSelect(form.tipoCarga, op.tipo_carga, form.tipoCarga.value, true);
      }

      // Status Orcamento — formulario orcamento
      if (op.status_orcamento && form.statusOrcamento) {
        const atual = form.statusOrcamento.value;
        form.statusOrcamento.innerHTML = op.status_orcamento
          .map((o) => `<option value="${o.codigo}"${o.codigo === atual ? " selected" : ""}>${o.descricao}</option>`)
          .join("");
        if (atual) form.statusOrcamento.value = atual;
      }

      // Status Entrega — formulario orcamento
      if (op.status_entrega && form.statusEntrega) {
        const atual = form.statusEntrega.value || "Pedido Recebido";
        form.statusEntrega.innerHTML = op.status_entrega
          .map((o) => `<option value="${o.codigo}"${o.codigo === atual ? " selected" : ""}>${o.descricao}</option>`)
          .join("");
        form.statusEntrega.value = atual;
      }

      // Filtro status orcamento
      const filtroOrcEl = document.getElementById("filtro-status-orcamento");
      if (filtroOrcEl && op.status_orcamento) {
        const atual = filtroOrcEl.value;
        filtroOrcEl.innerHTML = '<option value="">Todos</option>' + op.status_orcamento
          .map((o) => `<option value="${o.codigo}"${o.codigo === atual ? " selected" : ""}>${o.descricao}</option>`)
          .join("");
        if (atual) filtroOrcEl.value = atual;
      }

      // Filtro status entrega
      const filtroEntEl = document.getElementById("filtro-status-entrega");
      if (filtroEntEl && op.status_entrega) {
        const atual = filtroEntEl.value;
        filtroEntEl.innerHTML = '<option value="">Todos</option>' + op.status_entrega
          .map((o) => `<option value="${o.codigo}"${o.codigo === atual ? " selected" : ""}>${o.descricao}</option>`)
          .join("");
        if (atual) filtroEntEl.value = atual;
      }

      // Tipo de Veiculo — cadastro de veiculo
      if (op.tipo_veiculo && veiculoForm.veiculoTipo) {
        _popularSelect(veiculoForm.veiculoTipo, op.tipo_veiculo, veiculoForm.veiculoTipo.value, true);
      }

      // Categoria servico — cadastro tipos servico
      const catServEl = tipoServicoForm && tipoServicoForm.tipoServicoCategoria;
      if (catServEl && op.categoria_servico) {
        _popularSelect(catServEl, op.categoria_servico, catServEl.value, true);
      }

      // Abrangencia servico — cadastro tipos servico
      const abrServEl = tipoServicoForm && tipoServicoForm.tipoServicoAbrangencia;
      if (abrServEl && op.abrangencia_servico) {
        _popularSelect(abrServEl, op.abrangencia_servico, abrServEl.value, true);
      }

      // Nome categoria despesa
      const catNomeEl = categoriaDespesaForm && categoriaDespesaForm.categoriaNome;
      if (catNomeEl && op.nome_categoria_despesa) {
        _popularSelect(catNomeEl, op.nome_categoria_despesa, catNomeEl.value, true);
      }

      // Nome forma pagamento
      const formaNomeEl = formaPagamentoForm && formaPagamentoForm.formaNome;
      if (formaNomeEl && op.nome_forma_pagamento) {
        _popularSelect(formaNomeEl, op.nome_forma_pagamento, formaNomeEl.value, true);
      }

      // Nome centro custo
      const centroNomeEl = centroCustoForm && centroCustoForm.centroNome;
      if (centroNomeEl && op.nome_centro_custo) {
        _popularSelect(centroNomeEl, op.nome_centro_custo, centroNomeEl.value, true);
      }
    }

    function atualizarListaClientesOrcamento() {
      const clientes = obterClientes();
      const opcoes = clientes
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
        .map((cliente) => `<option value="${cliente.nome}"></option>`)
        .join("");
      listaClientesOrcamento.innerHTML = opcoes;
    }

    function preencherContatoPorCliente(nomeCliente) {
      const nome = (nomeCliente || "").trim().toLowerCase();
      if (!nome) {
        return;
      }

      const clienteEncontrado = obterClientes().find(
        (cliente) => (cliente.nome || "").trim().toLowerCase() === nome
      );

      if (clienteEncontrado && !form.contato.value.trim()) {
        form.contato.value = mascaraTelefoneOuEmail(clienteEncontrado.telefone || "");
      }

      if (clienteEncontrado && !form.aC.value.trim()) {
        form.aC.value = clienteEncontrado.nome || "";
      }
    }

    function renderizarClientes() {
      const termoBusca = filtroClienteCadastroAtivo.trim().toLowerCase();
      const clientes = obterClientes().filter((cliente) => {
        if (!termoBusca) {
          return true;
        }

        return String(cliente.nome || "").toLowerCase().includes(termoBusca);
      });
      clientesTbody.innerHTML = "";
      atualizarListaClientesOrcamento();

      if (clientes.length === 0) {
        clientesTbody.innerHTML = `<tr><td colspan='8'>${termoBusca ? "Nenhum cliente encontrado para a busca informada." : "Nenhum cliente cadastrado."}</td></tr>`;
        atualizarSelectsFinanceiro();
        return;
      }

      const html = clientes
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
        .map((cliente) => `
          <tr>
            <td data-label="Nome">${cliente.nome}</td>
            <td data-label="RG">${cliente.rg}</td>
            <td data-label="Telefone">${cliente.telefone}</td>
            <td data-label="Endereco">${cliente.endereco}</td>
            <td data-label="Estado">${cliente.estado}</td>
            <td data-label="Bairro">${cliente.bairro}</td>
            <td data-label="CEP">${cliente.cep}</td>
            <td data-label="Acoes">
              <div class="table-actions">
                <button type="button" class="btn-secondary" data-edit-cliente="${cliente.id}">Editar</button>
                <button type="button" class="btn-secondary" data-delete-cliente="${cliente.id}">Excluir</button>
              </div>
            </td>
          </tr>
        `)
        .join("");

      clientesTbody.innerHTML = html;
      atualizarSelectsFinanceiro();
    }

    function preencherFormularioCliente(item) {
      clienteForm.codigoEdicaoCliente.value = item.id;
      clienteForm.clienteNome.value = item.nome || "";
      clienteForm.clienteRg.value = item.rg || "";
      clienteForm.clienteTelefone.value = item.telefone || "";
      clienteForm.clienteEndereco.value = item.endereco || "";
      clienteForm.clienteEstado.value = item.estado || "";
      clienteForm.clienteBairro.value = item.bairro || "";
      clienteForm.clienteCep.value = item.cep || "";
      clienteForm.clienteNome.focus();
    }

    function renderizarResponsaveis() {
      const lista = obterResponsaveis();
      responsaveisTbody.innerHTML = "";

      if (lista.length === 0) {
        responsaveisTbody.innerHTML = "<tr><td colspan='5'>Nenhum responsavel cadastrado.</td></tr>";
        atualizarSelectResponsaveis();
        atualizarSelectLoginResponsaveis();
        atualizarSelectsFinanceiro();
        return;
      }

      const html = lista
        .sort((a, b) => a.id - b.id)
        .map((item) => `
          <tr>
            <td data-label="ID" class="mono">${item.id}</td>
            <td data-label="Nome">${item.nome}</td>
            <td data-label="RG">${item.rg || "-"}</td>
            <td data-label="Telefone">${item.telefone || "-"}</td>
            <td data-label="Acoes">
              <div class="table-actions">
                <button type="button" class="btn-secondary" data-edit-responsavel="${item.id}">Editar</button>
                <button type="button" class="btn-secondary" data-delete-responsavel="${item.id}">Excluir</button>
              </div>
            </td>
          </tr>
        `)
        .join("");

      responsaveisTbody.innerHTML = html;
      atualizarSelectResponsaveis();
      atualizarSelectLoginResponsaveis();
      atualizarSelectsFinanceiro();
    }

    function renderizarMotoristas() {
      const lista = obterMotoristas();
      motoristasTbody.innerHTML = "";

      if (lista.length === 0) {
        motoristasTbody.innerHTML = "<tr><td colspan='5'>Nenhum motorista cadastrado.</td></tr>";
        atualizarSelectMotoristaVeiculo();
        atualizarSelectsFinanceiro();
        return;
      }

      motoristasTbody.innerHTML = lista
        .sort((a, b) => String(a.nome || "").localeCompare(String(b.nome || ""), "pt-BR"))
        .map((item) => `
          <tr>
            <td data-label="Nome">${item.nome}</td>
            <td data-label="CPF">${item.cpf}</td>
            <td data-label="CNH">${item.cnh}</td>
            <td data-label="Telefone">${item.telefone}</td>
            <td data-label="Acoes">
              <div class="table-actions">
                <button type="button" class="btn-secondary" data-edit-motorista="${item.id}">Editar</button>
                <button type="button" class="btn-secondary" data-delete-motorista="${item.id}">Excluir</button>
              </div>
            </td>
          </tr>
        `)
        .join("");

      atualizarSelectMotoristaVeiculo();
      atualizarSelectsFinanceiro();
    }

    function renderizarVeiculos() {
      const lista = obterVeiculos();
      veiculosTbody.innerHTML = "";

      if (lista.length === 0) {
        veiculosTbody.innerHTML = "<tr><td colspan='5'>Nenhum veiculo cadastrado.</td></tr>";
        atualizarSelectsFinanceiro();
        return;
      }

      veiculosTbody.innerHTML = lista
        .sort((a, b) => String(a.placa || "").localeCompare(String(b.placa || ""), "pt-BR"))
        .map((item) => `
          <tr>
            <td data-label="Placa">${item.placa}</td>
            <td data-label="Modelo">${item.modelo}</td>
            <td data-label="Tipo">${item.tipo}</td>
            <td data-label="Motorista">${item.motoristaResponsavel || "-"}</td>
            <td data-label="Acoes">
              <div class="table-actions">
                <button type="button" class="btn-secondary" data-edit-veiculo="${item.id}">Editar</button>
                <button type="button" class="btn-secondary" data-delete-veiculo="${item.id}">Excluir</button>
              </div>
            </td>
          </tr>
        `)
        .join("");
      atualizarSelectsFinanceiro();
    }

    function coletarDadosMotoristaFormulario() {
      const nome = motoristaForm.motoristaNome.value.trim();
      const cpf = motoristaForm.motoristaCpf.value.trim();
      const rg = motoristaForm.motoristaRg.value.trim();
      const cnh = motoristaForm.motoristaCnh.value.trim();
      const categoriaCnh = motoristaForm.motoristaCategoriaCnh.value.trim().toUpperCase();
      const validadeCnh = motoristaForm.motoristaValidadeCnh.value;
      const telefone = motoristaForm.motoristaTelefone.value.trim();
      const email = motoristaForm.motoristaEmail.value.trim();
      const endereco = motoristaForm.motoristaEndereco.value.trim();
      const cidade = motoristaForm.motoristaCidade.value.trim();
      const estado = motoristaForm.motoristaEstado.value.trim().toUpperCase();

      if (!nome || !cpf || !rg || !cnh || !categoriaCnh || !validadeCnh || !telefone || !email || !endereco || !cidade || !estado) {
        return null;
      }

      return { nome, cpf, rg, cnh, categoriaCnh, validadeCnh, telefone, email, endereco, cidade, estado };
    }

    function coletarDadosVeiculoFormulario() {
      const placa = veiculoForm.veiculoPlaca.value.trim().toUpperCase();
      const modelo = veiculoForm.veiculoModelo.value.trim();
      const marca = veiculoForm.veiculoMarca.value.trim();
      const ano = Number(veiculoForm.veiculoAno.value);
      const tipo = veiculoForm.veiculoTipo.value.trim();
      const capacidade = veiculoForm.veiculoCapacidade.value.trim();
      const motoristaResponsavel = veiculoForm.veiculoMotoristaResponsavel.value.trim();
      const observacoes = veiculoForm.veiculoObservacoes.value.trim();

      if (!placa || !modelo || !marca || !Number.isFinite(ano) || !tipo || !capacidade || !motoristaResponsavel) {
        return null;
      }

      return { placa, modelo, marca, ano, tipo, capacidade, motoristaResponsavel, observacoes };
    }

    function preencherFormularioResponsavel(item) {
      responsavelForm.codigoEdicaoResponsavel.value = String(item.id);
      responsavelForm.responsavelId.value = String(item.id);
      responsavelForm.responsavelNome.value = item.nome || "";
      responsavelForm.responsavelRg.value = item.rg || "";
      responsavelForm.responsavelTelefone.value = item.telefone || "";
      responsavelForm.responsavelSenha.value = "";
      responsavelForm.responsavelNome.focus();
    }

    function coletarDadosResponsavelFormulario() {
      const nome = responsavelForm.responsavelNome.value.trim().toUpperCase();
      const rg = responsavelForm.responsavelRg.value.trim();
      const telefone = responsavelForm.responsavelTelefone.value.trim();
      const senha = responsavelForm.responsavelSenha.value.trim();
      const editando = Boolean(responsavelForm.codigoEdicaoResponsavel.value);

      if (!nome || !rg || !telefone) {
        return null;
      }

      if (!editando && !senha) {
        return { invalido: "Informe uma senha para o novo responsavel." };
      }

      if (senha && senha.length < 6) {
        return { invalido: "A senha deve ter pelo menos 6 caracteres." };
      }

      return { nome, rg, telefone, senha };
    }

    function prepararNovoResponsavel() {
      responsavelForm.codigoEdicaoResponsavel.value = "";
      responsavelForm.responsavelId.value = String(proximoIdResponsavel());
      responsavelForm.responsavelSenha.value = "";
    }

    function preencherFormularioMotorista(item) {
      motoristaForm.codigoEdicaoMotorista.value = item.id;
      motoristaForm.motoristaNome.value = item.nome || "";
      motoristaForm.motoristaCpf.value = item.cpf || "";
      motoristaForm.motoristaRg.value = item.rg || "";
      motoristaForm.motoristaCnh.value = item.cnh || "";
      motoristaForm.motoristaCategoriaCnh.value = item.categoriaCnh || "";
      motoristaForm.motoristaValidadeCnh.value = item.validadeCnh || "";
      motoristaForm.motoristaTelefone.value = item.telefone || "";
      motoristaForm.motoristaEmail.value = item.email || "";
      motoristaForm.motoristaEndereco.value = item.endereco || "";
      motoristaForm.motoristaCidade.value = item.cidade || "";
      motoristaForm.motoristaEstado.value = item.estado || "";
      motoristaForm.motoristaNome.focus();
    }

    function preencherFormularioVeiculo(item) {
      veiculoForm.codigoEdicaoVeiculo.value = item.id;
      veiculoForm.veiculoPlaca.value = item.placa || "";
      veiculoForm.veiculoModelo.value = item.modelo || "";
      veiculoForm.veiculoMarca.value = item.marca || "";
      veiculoForm.veiculoAno.value = item.ano || "";
      veiculoForm.veiculoTipo.value = item.tipo || "";
      veiculoForm.veiculoCapacidade.value = item.capacidade || "";
      atualizarSelectMotoristaVeiculo();
      veiculoForm.veiculoMotoristaResponsavel.value = item.motoristaResponsavel || "";
      veiculoForm.veiculoObservacoes.value = item.observacoes || "";
      veiculoForm.veiculoPlaca.focus();
    }

    function criarCampoOcultoEdicaoResponsavel() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoResponsavel";
      hidden.value = "";
      responsavelForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoMotorista() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoMotorista";
      hidden.value = "";
      motoristaForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoVeiculo() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoVeiculo";
      hidden.value = "";
      veiculoForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoCategoria() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoCategoria";
      hidden.value = "";
      categoriaDespesaForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoForma() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoForma";
      hidden.value = "";
      formaPagamentoForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoCentro() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoCentro";
      hidden.value = "";
      centroCustoForm.appendChild(hidden);
    }

    function criarCampoOcultoEdicaoDespesa() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoDespesa";
      hidden.value = "";
      despesaForm.appendChild(hidden);
    }

    function prepararNovaCategoria() {
      categoriaDespesaForm.codigoEdicaoCategoria.value = "";
      categoriaDespesaForm.categoriaCodigo.value = String(proximoCodigo(categoriasDespesasCache));
    }

    function prepararNovaForma() {
      formaPagamentoForm.codigoEdicaoForma.value = "";
      formaPagamentoForm.formaCodigo.value = String(proximoCodigo(formasPagamentoCache));
    }

    function prepararNovoCentro() {
      centroCustoForm.codigoEdicaoCentro.value = "";
      centroCustoForm.centroCodigo.value = String(proximoCodigo(centrosCustoCache));
    }

    function prepararNovaDespesa() {
      despesaForm.codigoEdicaoDespesa.value = "";
      despesaForm.despesaCodigo.value = proximoCodigoDespesa();
    }

    function coletarDadosCategoriaFormulario() {
      const nome = categoriaDespesaForm.categoriaNome.value.trim();
      const tipo = categoriaDespesaForm.categoriaTipo.value.trim();
      const status = categoriaDespesaForm.categoriaStatus.value.trim();
      if (!nome || !tipo || !status) {
        return null;
      }
      return { nome, tipo, status };
    }

    function coletarDadosFormaFormulario() {
      const nome = formaPagamentoForm.formaNome.value.trim();
      const status = formaPagamentoForm.formaStatus.value.trim();
      if (!nome || !status) {
        return null;
      }
      return { nome, status };
    }

    function coletarDadosCentroFormulario() {
      const nome = centroCustoForm.centroNome.value.trim();
      const status = centroCustoForm.centroStatus.value.trim();
      if (!nome || !status) {
        return null;
      }
      return { nome, status };
    }

    function coletarDadosDespesaFormulario() {
      const dataDespesa = despesaForm.despesaData.value;
      const competencia = despesaForm.despesaCompetencia.value;
      const tipoDespesa = despesaForm.despesaTipo.value;
      const categoria = despesaForm.despesaCategoria.value;
      const centroCusto = despesaForm.despesaCentroCusto.value;
      const descricao = despesaForm.despesaDescricao.value.trim();
      const valor = Number(despesaForm.despesaValor.value);
      const formaPagamento = despesaForm.despesaFormaPagamento.value;
      const situacao = despesaForm.despesaSituacao.value;
      if (!dataDespesa || !competencia || !tipoDespesa || !categoria || !centroCusto || !descricao || !Number.isFinite(valor) || valor <= 0 || !formaPagamento || !situacao) {
        return null;
      }

      return {
        dataDespesa,
        competencia,
        tipoDespesa,
        categoria,
        centroCusto,
        fornecedor: despesaForm.despesaFornecedor.value.trim(),
        descricao,
        valor,
        formaPagamento,
        situacao,
        cliente: despesaForm.despesaCliente.value,
        orcamento: despesaForm.despesaOrcamento.value,
        veiculo: despesaForm.despesaVeiculo.value,
        motorista: despesaForm.despesaMotorista.value,
        responsavel: despesaForm.despesaResponsavel.value,
        anexoNome: despesaForm.despesaAnexo.files && despesaForm.despesaAnexo.files[0] ? despesaForm.despesaAnexo.files[0].name : "",
        observacoes: despesaForm.despesaObservacoes.value.trim()
      };
    }

    function preencherFormularioCategoria(item) {
      categoriaDespesaForm.codigoEdicaoCategoria.value = String(item.codigo);
      categoriaDespesaForm.categoriaCodigo.value = String(item.codigo);
      categoriaDespesaForm.categoriaNome.value = item.nome;
      categoriaDespesaForm.categoriaTipo.value = item.tipo;
      categoriaDespesaForm.categoriaStatus.value = item.status;
    }

    function preencherFormularioForma(item) {
      formaPagamentoForm.codigoEdicaoForma.value = String(item.codigo);
      formaPagamentoForm.formaCodigo.value = String(item.codigo);
      formaPagamentoForm.formaNome.value = item.nome;
      formaPagamentoForm.formaStatus.value = item.status;
    }

    function preencherFormularioCentro(item) {
      centroCustoForm.codigoEdicaoCentro.value = String(item.codigo);
      centroCustoForm.centroCodigo.value = String(item.codigo);
      centroCustoForm.centroNome.value = item.nome;
      centroCustoForm.centroStatus.value = item.status;
    }

    function coletarDadosClienteFormulario() {
      const nome = somenteLetrasEspacos(clienteForm.clienteNome.value).trim();
      const rg = clienteForm.clienteRg.value.trim();
      const telefone = somenteDigitos(clienteForm.clienteTelefone.value).slice(0, 11);
      const endereco = clienteForm.clienteEndereco.value.trim();
      const estado = clienteForm.clienteEstado.value.trim().toUpperCase();
      const bairro = clienteForm.clienteBairro.value.trim();
      const cep = somenteDigitos(clienteForm.clienteCep.value).slice(0, 8);

      if (!nome || !rg || !telefone || !endereco || !estado || !bairro || !cep) {
        return null;
      }

      if (/\d/.test(nome)) {
        return null;
      }

      return { nome, rg, telefone, endereco, estado, bairro, cep };
    }

    function criarCampoOcultoEdicaoCliente() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicaoCliente";
      hidden.value = "";
      clienteForm.appendChild(hidden);
    }

    function classeStatusOrcamento(status) {
      if (["Solicitado", "Enviado", "Aguardando Retorno"].includes(status)) return "status-neutro";
      if (["Em Elaboracao", "Em Negociacao"].includes(status)) return "status-andamento";
      if (["Aprovado", "Contratado"].includes(status)) return "status-sucesso";
      if (["Reprovado", "Cancelado"].includes(status)) return "status-erro";
      return "status-neutro";
    }

    function classeStatusEntrega(status) {
      if (["Pedido Recebido", "Programado", "Reagendado"].includes(status)) return "status-neutro";
      if (["Coletado", "Em Transporte", "Em Rota"].includes(status)) return "status-andamento";
      if (["Entregue"].includes(status)) return "status-sucesso";
      if (["Ocorrencia", "Cancelado"].includes(status)) return "status-alerta";
      return "status-neutro";
    }

    function mostrarMensagem(texto, tipo = "ok") {
      message.textContent = texto;
      message.className = `message ${tipo}`;
    }

    function limparMensagem() {
      message.textContent = "";
      message.className = "message";
    }

    function preencherPropostaComDados(dados) {
      const codigo = form.codigoEdicao.value || gerarCodigo();
      const hoje = formatarDataIso(new Date().toISOString());

      document.getElementById("prop-codigo").textContent = codigo;
      document.getElementById("prop-cliente").textContent = dados.cliente || "Cliente nao informado";
      document.getElementById("prop-ac").textContent = dados.aC || "Nao informado";
      document.getElementById("prop-contato").textContent = dados.contato || "-";
      document.getElementById("prop-data").textContent = hoje;
      const itensProduto = normalizarItensProduto(dados);
      const produtosPropostaEl = document.getElementById("prop-produtos-lista");
      if (itensProduto.length === 0) {
        produtosPropostaEl.innerHTML = "<tr><td colspan='2'>Nenhum produto informado.</td></tr>";
      } else {
        produtosPropostaEl.innerHTML = itensProduto
          .map((item) => `<tr><td>${item.quantidade || "-"}</td><td>${item.descricao || "-"}</td></tr>`)
          .join("");
      }
      
      const tipoVeiculo = dados.tipoVeiculo;
      const tipoServicoDescricao = dados.tipoServicoDescricao || "-";
      const mapVeiculos = {
        "001": "Moto",
        "002": "Utilitario Pequeno",
        "003": "Fiorino",
        "004": "Van",
        "005": "VUC (Veiculo Urbano de Carga)",
        "006": "3/4",
        "007": "Toco",
        "008": "Truck",
        "009": "Carreta Simples",
        "010": "Carreta LS",
        "011": "Bitrem",
        "012": "Rodotrem",
        "013": "Bau",
        "014": "Bau Refrigerado",
        "015": "Sider",
        "016": "Graneleiro",
        "017": "Tanque",
        "018": "Plataforma",
        "019": "Prancha",
        "020": "Munck",
        "021": "Cegonha",
        "022": "Container 20 pes",
        "023": "Container 40 pes"
      };
      document.getElementById("prop-tipo-veiculo").textContent = mapVeiculos[tipoVeiculo] || tipoVeiculo || "-";
      document.getElementById("prop-tipo-servico").textContent = tipoServicoDescricao;
      
      document.getElementById("prop-origem").textContent = dados.origem || "-";
      document.getElementById("prop-origem-uf").textContent = dados.origemUF || extrairUF(dados.origem);
      document.getElementById("prop-destino").textContent = dados.destino || "-";
      document.getElementById("prop-destino-uf").textContent = dados.destinoUF || extrairUF(dados.destino);
      document.getElementById("prop-valor").textContent = formatarMoeda(dados.valor || 0);
      document.getElementById("prop-responsavel").textContent = dados.responsavel || "-";
      document.getElementById("prop-status-orc").textContent = dados.statusOrcamento || "-";
      document.getElementById("prop-status-ent").textContent = dados.statusEntrega || "-";
    }

    function abrirProposta() {
      const itensProdutoFormulario = coletarItensProdutoFormulario();
      const primeiroItem = itensProdutoFormulario[0] || { quantidade: "", descricao: "" };
      const dados = coletarDadosFormulario() || {
        cliente: form.cliente.value.trim(),
        aC: form.aC.value.trim(),
        contato: form.contato.value.trim(),
        origem: form.origem.value.trim(),
        origemUF: form.origemUF.value.trim().toUpperCase(),
        destino: form.destino.value.trim(),
        destinoUF: form.destinoUF.value.trim().toUpperCase(),
        quantidade: primeiroItem.quantidade,
        descricao: primeiroItem.descricao,
        itensProduto: itensProdutoFormulario,
        tipoVeiculo: form.tipoVeiculo.value,
        tipoServicoId: form.tipoServico.value,
        tipoServicoDescricao: form.tipoServico.options[form.tipoServico.selectedIndex]
          ? form.tipoServico.options[form.tipoServico.selectedIndex].text
          : "",
        valor: Number(form.valor.value || 0),
        responsavel: form.responsavel.value.trim(),
        statusOrcamento: form.statusOrcamento.value,
        statusEntrega: form.statusEntrega.value
      };

      preencherPropostaComDados(dados);
      blocoProposta.classList.add("active");
      blocoProposta.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderizarTabela() {
      const orcamentos = obterOrcamentos();
      const orcamentosFiltrados = filtrarOrcamentos(orcamentos);
      tbody.innerHTML = "";

      if (orcamentosFiltrados.length === 0) {
        tbody.innerHTML = "<tr><td colspan='10'>Nenhum orcamento encontrado com os filtros aplicados.</td></tr>";
      } else {
        const html = orcamentosFiltrados
          .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
          .map((orcamento) => {
            const origemCompleta = `${orcamento.origem || "-"}/${(orcamento.origemUF || extrairUF(orcamento.origem)) || "-"}`;
            const destinoCompleta = `${orcamento.destino || "-"}/${(orcamento.destinoUF || extrairUF(orcamento.destino)) || "-"}`;
            const rota = `${origemCompleta} -> ${destinoCompleta}`;
            const statusOrcamentoClass = classeStatusOrcamento(orcamento.statusOrcamento);
            const statusEntregaClass = classeStatusEntrega(orcamento.statusEntrega);
            const data = formatarDataIso(orcamento.criadoEm);

            return `
              <tr>
                <td data-label="Codigo" class="mono">${orcamento.codigo}</td>
                <td data-label="Data">${data}</td>
                <td data-label="Cliente">${orcamento.cliente}</td>
                <td data-label="Rota">${rota}</td>
                <td data-label="Tipo">${orcamento.tipoCarga || "-"}</td>
                <td data-label="Valor" class="mono">${formatarMoeda(orcamento.valor)}</td>
                <td data-label="Status Orcamento"><span class="status ${statusOrcamentoClass}">${orcamento.statusOrcamento || "-"}</span></td>
                <td data-label="Status Entrega"><span class="status ${statusEntregaClass}">${orcamento.statusEntrega || "-"}</span></td>
                <td data-label="Responsavel">${orcamento.responsavel || "-"}</td>
                <td data-label="Acoes">
                  <div class="table-actions">
                    <button type="button" class="btn-secondary" data-edit="${orcamento.codigo}">Editar</button>
                    <button type="button" class="btn-secondary" data-delete="${orcamento.codigo}">Excluir</button>
                  </div>
                </td>
              </tr>
            `;
          })
          .join("");

        tbody.innerHTML = html;
      }

      atualizarMetricas(orcamentos);
      atualizarSelectsFinanceiro();
    }

    function atualizarMetricas(orcamentos) {
      const total = orcamentos.length;
      const soma = orcamentos.reduce((acc, item) => acc + Number(item.valor || 0), 0);
      const media = total > 0 ? soma / total : 0;

      totalEl.textContent = String(total);
      totalValorEl.textContent = formatarMoeda(soma);
      ticketMedioEl.textContent = formatarMoeda(media);
    }

    function preencherFormulario(item) {
      const itensProduto = normalizarItensProduto(item);
      form.codigoEdicao.value = item.codigo;
      form.cliente.value = item.cliente || "";
      form.aC.value = item.aC || "";
      form.contato.value = item.contato || "";
      form.origem.value = item.origem || "";
      form.origemUF.value = (item.origemUF || extrairUF(item.origem) || "").toUpperCase();
      form.destino.value = item.destino || "";
      form.destinoUF.value = (item.destinoUF || extrairUF(item.destino) || "").toUpperCase();
      renderizarItensProdutoFormulario(itensProduto);
      form.tipoVeiculo.value = item.tipoVeiculo || "";
      form.tipoServico.value = item.tipoServicoId != null ? String(item.tipoServicoId) : "";
      form.tipoCarga.value = item.tipoCarga || "";
      form.peso.value = item.peso || "";
      form.volume.value = item.volume || "";
      form.prazo.value = item.prazo || "";
      form.valor.value = item.valor || "";
      form.validade.value = item.validade || "";
      form.statusOrcamento.value = item.statusOrcamento || "Solicitado";
      form.statusEntrega.value = item.statusEntrega || "Pedido Recebido";
      form.responsavel.value = item.responsavel || "";
      form.observacoes.value = item.observacoes || "";
      atualizarBadgeNumeroOrcamento(item.numero ? formatarCodigoPorNumero(item.numero) : item.codigo);
      form.cliente.focus();
    }

    function coletarDadosFormulario() {
      const cliente = form.cliente.value.trim();
      const aC = form.aC.value.trim();
      const origem = form.origem.value.trim();
      const origemUF = form.origemUF.value.trim().toUpperCase();
      const destino = form.destino.value.trim();
      const destinoUF = form.destinoUF.value.trim().toUpperCase();
      const valor = Number(form.valor.value);
      const tipoServicoId = form.tipoServico.value;
      const tipoServicoDescricao = form.tipoServico.options[form.tipoServico.selectedIndex]
        ? form.tipoServico.options[form.tipoServico.selectedIndex].text
        : "";
      const itensProduto = coletarItensProdutoFormulario();
      const possuiItemIncompleto = itensProduto.some((item) => !item.quantidade || !item.descricao);
      const primeiroItem = itensProduto[0] || { quantidade: "", descricao: "" };

      if (!cliente || !origem || !origemUF || !destino || !destinoUF || !tipoServicoId || !Number.isFinite(valor) || valor <= 0 || itensProduto.length === 0 || possuiItemIncompleto) {
        return null;
      }

      return {
        cliente,
        aC,
        contato: form.contato.value.trim(),
        origem,
        origemUF,
        destino,
        destinoUF,
        quantidade: primeiroItem.quantidade,
        descricao: primeiroItem.descricao,
        itensProduto,
        tipoVeiculo: form.tipoVeiculo.value,
        tipoServicoId: Number(tipoServicoId),
        tipoServicoDescricao,
        tipoCarga: form.tipoCarga.value,
        peso: form.peso.value,
        volume: form.volume.value,
        prazo: form.prazo.value,
        valor,
        validade: form.validade.value,
        statusOrcamento: form.statusOrcamento.value,
        statusEntrega: form.statusEntrega.value,
        responsavel: form.responsavel.value.trim(),
        observacoes: form.observacoes.value.trim()
      };
    }

    function criarCampoOcultoEdicao() {
      const hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = "codigoEdicao";
      hidden.value = "";
      form.appendChild(hidden);
    }

    tabOrcamentos.addEventListener("click", () => alternarAba("orcamentos"));
    tabCadastro.addEventListener("click", () => {
      alternarModuloCadastro(cadastroTipoSeletor.value);
    });
    tabFinanceiro.addEventListener("click", () => {
      alternarAba("financeiro");
      alternarModuloFinanceiro(financeiroModuloSeletor.value);
    });

    cadastroTipoSeletor.addEventListener("change", () => {
      alternarModuloCadastro(cadastroTipoSeletor.value);
    });

    financeiroModuloSeletor.addEventListener("change", () => {
      alternarModuloFinanceiro(financeiroModuloSeletor.value);
    });

    adicionarProdutoButton.addEventListener("click", () => {
      produtosListaEl.appendChild(criarLinhaProduto({ quantidade: "", descricao: "" }));
      atualizarBotoesRemoverProduto();
    });

    produtosListaEl.addEventListener("click", (event) => {
      const alvo = event.target;
      if (!(alvo instanceof HTMLButtonElement)) {
        return;
      }
      if (!alvo.classList.contains("produto-remover")) {
        return;
      }
      const linha = alvo.closest(".produto-item");
      if (!linha) {
        return;
      }
      if (produtosListaEl.querySelectorAll(".produto-item").length <= 1) {
        return;
      }
      linha.remove();
      atualizarBotoesRemoverProduto();
    });

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await autenticarUsuario();
    });

    loginFecharButton.addEventListener("click", () => {
      mostrarLoginMensagem("Acesso bloqueado ate realizar login.");
    });

    form.contato.addEventListener("input", () => {
      form.contato.value = mascaraTelefoneOuEmail(form.contato.value);
    });

    clienteForm.clienteNome.addEventListener("input", () => {
      clienteForm.clienteNome.value = somenteLetrasEspacos(clienteForm.clienteNome.value);
    });

    clienteForm.clienteTelefone.addEventListener("input", () => {
      clienteForm.clienteTelefone.value = somenteDigitos(clienteForm.clienteTelefone.value).slice(0, 11);
    });

    responsavelForm.responsavelTelefone.addEventListener("input", () => {
      responsavelForm.responsavelTelefone.value = formatarTelefoneBR(responsavelForm.responsavelTelefone.value);
    });

    clienteForm.clienteCep.addEventListener("input", () => {
      clienteForm.clienteCep.value = somenteDigitos(clienteForm.clienteCep.value).slice(0, 8);
    });

    filtroClienteCadastro.addEventListener("input", () => {
      filtroClienteCadastroAtivo = filtroClienteCadastro.value;
      renderizarClientes();
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagem();

      const dados = coletarDadosFormulario();
      if (!dados) {
        mostrarMensagem("Preencha os campos obrigatorios e informe um valor valido.", "error");
        return;
      }

      const lista = obterOrcamentos();
      const codigoEdicao = form.codigoEdicao.value;

      if (codigoEdicao) {
        const indice = lista.findIndex((item) => item.codigo === codigoEdicao);
        if (indice >= 0) {
          lista[indice] = {
            ...lista[indice],
            ...dados,
            atualizadoEm: new Date().toISOString()
          };
          mostrarMensagem("Orçamento atualizado com sucesso.");
        }
      } else {
        const reserva = numeroOrcamentoReservado || { numero: null, codigo: gerarCodigo() };
        lista.push({
          codigo: reserva.codigo,
          numero: reserva.numero,
          criadoEm: new Date().toISOString(),
          ...dados
        });
        mostrarMensagem("Orçamento salvo com sucesso.");
      }

      try {
        await salvarOrcamentos(lista);
        if (!codigoEdicao) {
          liberarNumeroOrcamentoAtual();
          await reservarNovoNumeroOrcamento();
        }
      } catch (_error) {
        mostrarMensagem("Falha ao salvar no Neon.", "error");
      }
      form.reset();
      resetarItensProdutoFormulario();
      form.codigoEdicao.value = "";
      form.statusOrcamento.value = "Solicitado";
      form.statusEntrega.value = "Pedido Recebido";
      renderizarTabela();
    });

    form.cliente.addEventListener("change", () => {
      preencherContatoPorCliente(form.cliente.value);
    });

    form.cliente.addEventListener("blur", () => {
      preencherContatoPorCliente(form.cliente.value);
    });

    tbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const codigoEditar = botao.getAttribute("data-edit");
      const codigoExcluir = botao.getAttribute("data-delete");
      const lista = obterOrcamentos();

      if (codigoEditar) {
        const item = lista.find((orcamento) => orcamento.codigo === codigoEditar);
        if (!item) {
          mostrarMensagem("Orçamento não encontrado para edição.", "error");
          return;
        }
        preencherFormulario(item);
        mostrarMensagem(`Editando o orçamento ${item.codigo}.`);
        return;
      }

      if (codigoExcluir) {
        const restante = lista.filter((orcamento) => orcamento.codigo !== codigoExcluir);
        if (restante.length === lista.length) {
          mostrarMensagem("Orçamento não encontrado para exclusão.", "error");
          return;
        }
        try {
          await salvarOrcamentos(restante);
        } catch (_error) {
          mostrarMensagem("Falha ao excluir no Neon. Alteração mantida localmente.", "error");
        }
        renderizarTabela();
        mostrarMensagem("Orçamento excluído com sucesso.");
      }
    });

    clearButton.addEventListener("click", async () => {
      const estavaEditando = Boolean(form.codigoEdicao.value);
      form.reset();
      resetarItensProdutoFormulario();
      form.codigoEdicao.value = "";
      form.statusOrcamento.value = "Solicitado";
      form.statusEntrega.value = "Pedido Recebido";
      limparMensagem();

      if (estavaEditando) {
        atualizarBadgeNumeroOrcamento();
      } else {
        liberarNumeroOrcamentoAtual();
        await reservarNovoNumeroOrcamento();
      }
    });

    clienteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemCliente();

      const dados = coletarDadosClienteFormulario();
      if (!dados) {
        mostrarMensagemCliente("Preencha todos os campos obrigatórios do cliente.", "error");
        return;
      }

      const lista = obterClientes();
      const codigoEdicao = clienteForm.codigoEdicaoCliente.value;

      if (codigoEdicao) {
        const indice = lista.findIndex((item) => item.id === codigoEdicao);
        if (indice >= 0) {
          lista[indice] = {
            ...lista[indice],
            ...dados,
            atualizadoEm: new Date().toISOString()
          };
          mostrarMensagemCliente("Cliente atualizado com sucesso!!!!");
        }
      } else {
        lista.push({
          id: crypto.randomUUID(),
          criadoEm: new Date().toISOString(),
          ...dados
        });
        mostrarMensagemCliente("Cliente cadastrado com sucesso!!!!");
      }

      try {
        await salvarClientes(lista);
      } catch (_error) {
        mostrarMensagemCliente("Falha ao salvar no Neon. Dados ficaram salvos localmente.", "error");
      }
      clienteForm.reset();
      clienteForm.codigoEdicaoCliente.value = "";
      renderizarClientes();
    });

    clientesTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const idEditar = botao.getAttribute("data-edit-cliente");
      const idExcluir = botao.getAttribute("data-delete-cliente");
      const lista = obterClientes();

      if (idEditar) {
        const item = lista.find((cliente) => cliente.id === idEditar);
        if (!item) {
          mostrarMensagemCliente("Cliente não encontrado para edição.", "error");
          return;
        }
        preencherFormularioCliente(item);
        mostrarMensagemCliente(`Editando cliente ${item.nome}.`);
        return;
      }

      if (idExcluir) {
        const restante = lista.filter((cliente) => cliente.id !== idExcluir);
        if (restante.length === lista.length) {
          mostrarMensagemCliente("Cliente não encontrado para exclusão.", "error");
          return;
        }
        try {
          await salvarClientes(restante);
        } catch (_error) {
          mostrarMensagemCliente("Falha ao excluir no Neon. Alteração mantida localmente.", "error");
        }
        renderizarClientes();
        mostrarMensagemCliente("Cliente excluído com sucesso.");
      }
    });

    clearClienteButton.addEventListener("click", () => {
      clienteForm.reset();
      clienteForm.codigoEdicaoCliente.value = "";
      limparMensagemCliente();
    });

    responsavelForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemResponsavel();

      const dados = coletarDadosResponsavelFormulario();
      if (!dados) {
        mostrarMensagemResponsavel("Preencha todos os campos obrigatórios do responsável.", "error");
        return;
      }

      if (dados.invalido) {
        mostrarMensagemResponsavel(dados.invalido, "error");
        return;
      }

      const lista = obterResponsaveis();
      const codigoEdicao = responsavelForm.codigoEdicaoResponsavel.value;

      if (codigoEdicao) {
        const idEdicao = Number(codigoEdicao);
        const indice = lista.findIndex((item) => Number(item.id) === idEdicao);
        if (indice >= 0) {
          const nomeAnterior = lista[indice].nome;
          lista[indice] = {
            ...lista[indice],
            ...dados,
            nomeAnterior,
            atualizadoEm: new Date().toISOString()
          };
          mostrarMensagemResponsavel(dados.senha ? "Responsável e senha atualizados com sucesso." : "Responsável atualizado com sucesso.");
        }
      } else {
        const novoId = proximoIdResponsavel();
        lista.push({
          id: novoId,
          criadoEm: new Date().toISOString(),
          ...dados
        });
        mostrarMensagemResponsavel("Responsável cadastrado com senha de acesso.");
      }

      try {
        await salvarResponsaveis(lista);
      } catch (error) {
        mostrarMensagemResponsavel(error && error.message ? error.message : "Falha ao salvar o responsável no Neon.", "error");
        return;
      }
      responsavelForm.reset();
      prepararNovoResponsavel();
      renderizarResponsaveis();
    });

    responsaveisTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const idEditar = Number(botao.getAttribute("data-edit-responsavel") || 0);
      const idExcluir = Number(botao.getAttribute("data-delete-responsavel") || 0);
      const lista = obterResponsaveis();

      if (idEditar) {
        const item = lista.find((responsavel) => Number(responsavel.id) === idEditar);
        if (!item) {
          mostrarMensagemResponsavel("Responsável não encontrado para edição.", "error");
          return;
        }
        preencherFormularioResponsavel(item);
        mostrarMensagemResponsavel(`Editando responsável ID ${item.id}.`);
        return;
      }

      if (idExcluir) {
        const restante = lista.filter((responsavel) => Number(responsavel.id) !== idExcluir);
        if (restante.length === lista.length) {
          mostrarMensagemResponsavel("Responsável não encontrado para exclusão.", "error");
          return;
        }

        try {
          await salvarResponsaveis(restante);
        } catch (error) {
          mostrarMensagemResponsavel(error && error.message ? error.message : "Falha ao excluir no Neon.", "error");
          return;
        }
        responsavelForm.reset();
        prepararNovoResponsavel();
        renderizarResponsaveis();
        mostrarMensagemResponsavel("Responsável excluído com sucesso.");
      }
    });

    clearResponsavelButton.addEventListener("click", () => {
      responsavelForm.reset();
      prepararNovoResponsavel();
      limparMensagemResponsavel();
    });

    tipoServicoForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemTipoServico();

      const dados = coletarDadosTipoServicoFormulario();
      if (!dados) {
        mostrarMensagemTipoServico("Preencha todos os campos obrigatórios do tipo de serviço.", "error");
        return;
      }

      const idEdicao = Number(tipoServicoForm.tipoServicoId.value || 0);

      try {
        if (idEdicao) {
          await atualizarTipoServico(idEdicao, dados);
          mostrarMensagemTipoServico("Tipo de serviço atualizado com sucesso.");
        } else {
          await criarTipoServico(dados);
          mostrarMensagemTipoServico("Tipo de serviço cadastrado com sucesso.");
        }

        await carregarTiposServicoIniciais();
        prepararNovoTipoServico();
        renderizarTiposServico();
      } catch (error) {
        mostrarMensagemTipoServico(error && error.message ? error.message : "Falha ao salvar tipo de serviço no Neon.", "error");
      }
    });

    tiposServicoTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const idEditar = Number(botao.getAttribute("data-edit-tipo-servico") || 0);
      const idExcluir = Number(botao.getAttribute("data-delete-tipo-servico") || 0);

      if (idEditar) {
        const item = obterTiposServico().find((tipoServico) => Number(tipoServico.id) === idEditar);
        if (!item) {
          mostrarMensagemTipoServico("Tipo de serviço não encontrado para edição.", "error");
          return;
        }
        preencherFormularioTipoServico(item);
        mostrarMensagemTipoServico(`Editando tipo de serviço ID ${item.id}.`);
        return;
      }

      if (idExcluir) {
        try {
          await excluirTipoServico(idExcluir);
          await carregarTiposServicoIniciais();
          prepararNovoTipoServico();
          renderizarTiposServico();
          mostrarMensagemTipoServico("Tipo de serviço excluído com sucesso.");
        } catch (error) {
          mostrarMensagemTipoServico(error && error.message ? error.message : "Falha ao excluir tipo de serviço no Neon.", "error");
        }
      }
    });

    clearTipoServicoButton.addEventListener("click", () => {
      prepararNovoTipoServico();
      limparMensagemTipoServico();
    });

    pesquisarTipoServicoButton.addEventListener("click", () => {
      filtroTipoServicoAtivo = filtroTipoServico.value;
      renderizarTiposServico();
    });

    filtroTipoServico.addEventListener("input", () => {
      filtroTipoServicoAtivo = filtroTipoServico.value;
      renderizarTiposServico();
    });

    motoristaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemMotorista();

      const dados = coletarDadosMotoristaFormulario();
      if (!dados) {
        mostrarMensagemMotorista("Preencha todos os campos obrigatórios do motorista.", "error");
        return;
      }

      const lista = obterMotoristas();
      const codigoEdicao = motoristaForm.codigoEdicaoMotorista.value;

      if (codigoEdicao) {
        const indice = lista.findIndex((item) => item.id === codigoEdicao);
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemMotorista("Motorista atualizado com sucesso.");
        }
      } else {
        lista.push({ id: crypto.randomUUID(), ...dados });
        mostrarMensagemMotorista("Motorista cadastrado com sucesso.");
      }

      try {
        await salvarMotoristas(lista);
        motoristaForm.reset();
        motoristaForm.codigoEdicaoMotorista.value = "";
        renderizarMotoristas();
        renderizarVeiculos();
      } catch (error) {
        mostrarMensagemMotorista(error && error.message ? error.message : "Falha ao salvar o motorista no Neon.", "error");
      }
    });

    motoristasTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const idEditar = botao.getAttribute("data-edit-motorista");
      const idExcluir = botao.getAttribute("data-delete-motorista");
      const lista = obterMotoristas();

      if (idEditar) {
        const item = lista.find((motorista) => motorista.id === idEditar);
        if (!item) {
          mostrarMensagemMotorista("Motorista não encontrado para edição.", "error");
          return;
        }
        preencherFormularioMotorista(item);
        mostrarMensagemMotorista(`Editando motorista ${item.nome}.`);
        return;
      }

      if (idExcluir) {
        const restante = lista.filter((motorista) => motorista.id !== idExcluir);
        try {
          await salvarMotoristas(restante);

          const veiculosAtualizados = obterVeiculos().map((veiculo) => {
            const motoristaExiste = restante.some((motorista) => motorista.nome === veiculo.motoristaResponsavel);
            return motoristaExiste ? veiculo : { ...veiculo, motoristaResponsavel: "" };
          });
          await salvarVeiculos(veiculosAtualizados);

          motoristaForm.reset();
          motoristaForm.codigoEdicaoMotorista.value = "";
          renderizarMotoristas();
          renderizarVeiculos();
          mostrarMensagemMotorista("Motorista excluído com sucesso.");
        } catch (error) {
          mostrarMensagemMotorista(error && error.message ? error.message : "Falha ao excluir o motorista no Neon.", "error");
        }
      }
    });

    clearMotoristaButton.addEventListener("click", () => {
      motoristaForm.reset();
      motoristaForm.codigoEdicaoMotorista.value = "";
      limparMensagemMotorista();
    });

    veiculoForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemVeiculo();

      const dados = coletarDadosVeiculoFormulario();
      if (!dados) {
        mostrarMensagemVeiculo("Preencha os campos obrigatórios do veículo.", "error");
        return;
      }

      const lista = obterVeiculos();
      const codigoEdicao = veiculoForm.codigoEdicaoVeiculo.value;

      if (codigoEdicao) {
        const indice = lista.findIndex((item) => item.id === codigoEdicao);
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemVeiculo("Veículo atualizado com sucesso.");
        }
      } else {
        lista.push({ id: crypto.randomUUID(), ...dados });
        mostrarMensagemVeiculo("Veículo cadastrado com sucesso.");
      }

      try {
        await salvarVeiculos(lista);
        veiculoForm.reset();
        veiculoForm.codigoEdicaoVeiculo.value = "";
        renderizarVeiculos();
      } catch (error) {
        mostrarMensagemVeiculo(error && error.message ? error.message : "Falha ao salvar o veículo no Neon.", "error");
      }
    });

    veiculosTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }

      const idEditar = botao.getAttribute("data-edit-veiculo");
      const idExcluir = botao.getAttribute("data-delete-veiculo");
      const lista = obterVeiculos();

      if (idEditar) {
        const item = lista.find((veiculo) => veiculo.id === idEditar);
        if (!item) {
          mostrarMensagemVeiculo("Veículo não encontrado para edição.", "error");
          return;
        }
        preencherFormularioVeiculo(item);
        mostrarMensagemVeiculo(`Editando veículo ${item.placa}.`);
        return;
      }

      if (idExcluir) {
        const restante = lista.filter((veiculo) => veiculo.id !== idExcluir);
        try {
          await salvarVeiculos(restante);
          veiculoForm.reset();
          veiculoForm.codigoEdicaoVeiculo.value = "";
          renderizarVeiculos();
          mostrarMensagemVeiculo("Veículo excluído com sucesso.");
        } catch (error) {
          mostrarMensagemVeiculo(error && error.message ? error.message : "Falha ao excluir o veículo no Neon.", "error");
        }
      }
    });

    clearVeiculoButton.addEventListener("click", () => {
      veiculoForm.reset();
      veiculoForm.codigoEdicaoVeiculo.value = "";
      limparMensagemVeiculo();
    });

    categoriaDespesaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemCategoria();
      const dados = coletarDadosCategoriaFormulario();
      if (!dados) {
        mostrarMensagemCategoria("Preencha os campos obrigatórios da categoria.", "error");
        return;
      }

      const lista = [...categoriasDespesasCache];
      const codigoEdicao = categoriaDespesaForm.codigoEdicaoCategoria.value;
      if (codigoEdicao) {
        const indice = lista.findIndex((item) => Number(item.codigo) === Number(codigoEdicao));
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemCategoria("Categoria atualizada com sucesso.");
        }
      } else {
        lista.push({ codigo: proximoCodigo(lista), ...dados });
        mostrarMensagemCategoria("Categoria cadastrada com sucesso.");
      }

      try {
        await salvarCategoriasDespesas(lista);
        renderizarCategoriasDespesas();
        categoriaDespesaForm.reset();
        prepararNovaCategoria();
      } catch (error) {
        mostrarMensagemCategoria(error && error.message ? error.message : "Falha ao salvar a categoria no Neon.", "error");
      }
    });

    categoriasDespesasTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }
      const codEditar = botao.getAttribute("data-edit-categoria");
      const codExcluir = botao.getAttribute("data-delete-categoria");
      if (codEditar) {
        const item = categoriasDespesasCache.find((it) => Number(it.codigo) === Number(codEditar));
        if (item) {
          preencherFormularioCategoria(item);
          mostrarMensagemCategoria(`Editando categoria ${item.nome}.`);
        }
        return;
      }
      if (codExcluir) {
        try {
          await salvarCategoriasDespesas(categoriasDespesasCache.filter((it) => Number(it.codigo) !== Number(codExcluir)));
          renderizarCategoriasDespesas();
          categoriaDespesaForm.reset();
          prepararNovaCategoria();
          mostrarMensagemCategoria("Categoria excluída com sucesso.");
        } catch (error) {
          mostrarMensagemCategoria(error && error.message ? error.message : "Falha ao excluir a categoria no Neon.", "error");
        }
      }
    });

    clearCategoriaButton.addEventListener("click", () => {
      categoriaDespesaForm.reset();
      prepararNovaCategoria();
      limparMensagemCategoria();
    });

    formaPagamentoForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemForma();
      const dados = coletarDadosFormaFormulario();
      if (!dados) {
        mostrarMensagemForma("Preencha os campos obrigatórios da forma de pagamento.", "error");
        return;
      }

      const lista = [...formasPagamentoCache];
      const codigoEdicao = formaPagamentoForm.codigoEdicaoForma.value;
      if (codigoEdicao) {
        const indice = lista.findIndex((item) => Number(item.codigo) === Number(codigoEdicao));
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemForma("Forma de pagamento atualizada com sucesso.");
        }
      } else {
        lista.push({ codigo: proximoCodigo(lista), ...dados });
        mostrarMensagemForma("Forma de pagamento cadastrada com sucesso.");
      }

      try {
        await salvarFormasPagamento(lista);
        renderizarFormasPagamento();
        formaPagamentoForm.reset();
        prepararNovaForma();
      } catch (error) {
        mostrarMensagemForma(error && error.message ? error.message : "Falha ao salvar a forma de pagamento no Neon.", "error");
      }
    });

    formasPagamentoTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }
      const codEditar = botao.getAttribute("data-edit-forma");
      const codExcluir = botao.getAttribute("data-delete-forma");
      if (codEditar) {
        const item = formasPagamentoCache.find((it) => Number(it.codigo) === Number(codEditar));
        if (item) {
          preencherFormularioForma(item);
          mostrarMensagemForma(`Editando forma ${item.nome}.`);
        }
        return;
      }
      if (codExcluir) {
        try {
          await salvarFormasPagamento(formasPagamentoCache.filter((it) => Number(it.codigo) !== Number(codExcluir)));
          renderizarFormasPagamento();
          formaPagamentoForm.reset();
          prepararNovaForma();
          mostrarMensagemForma("Forma de pagamento excluída com sucesso.");
        } catch (error) {
          mostrarMensagemForma(error && error.message ? error.message : "Falha ao excluir a forma de pagamento no Neon.", "error");
        }
      }
    });

    clearFormaButton.addEventListener("click", () => {
      formaPagamentoForm.reset();
      prepararNovaForma();
      limparMensagemForma();
    });

    centroCustoForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemCentro();
      const dados = coletarDadosCentroFormulario();
      if (!dados) {
        mostrarMensagemCentro("Preencha os campos obrigatórios do centro de custo.", "error");
        return;
      }

      const lista = [...centrosCustoCache];
      const codigoEdicao = centroCustoForm.codigoEdicaoCentro.value;
      if (codigoEdicao) {
        const indice = lista.findIndex((item) => Number(item.codigo) === Number(codigoEdicao));
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemCentro("Centro de custo atualizado com sucesso.");
        }
      } else {
        lista.push({ codigo: proximoCodigo(lista), ...dados });
        mostrarMensagemCentro("Centro de custo cadastrado com sucesso.");
      }

      try {
        await salvarCentrosCusto(lista);
        renderizarCentrosCusto();
        centroCustoForm.reset();
        prepararNovoCentro();
      } catch (error) {
        mostrarMensagemCentro(error && error.message ? error.message : "Falha ao salvar o centro de custo no Neon.", "error");
      }
    });

    centrosCustoTbody.addEventListener("click", async (event) => {
      const botao = event.target;
      if (!(botao instanceof HTMLButtonElement)) {
        return;
      }
      const codEditar = botao.getAttribute("data-edit-centro");
      const codExcluir = botao.getAttribute("data-delete-centro");
      if (codEditar) {
        const item = centrosCustoCache.find((it) => Number(it.codigo) === Number(codEditar));
        if (item) {
          preencherFormularioCentro(item);
          mostrarMensagemCentro(`Editando centro ${item.nome}.`);
        }
        return;
      }
      if (codExcluir) {
        try {
          await salvarCentrosCusto(centrosCustoCache.filter((it) => Number(it.codigo) !== Number(codExcluir)));
          renderizarCentrosCusto();
          centroCustoForm.reset();
          prepararNovoCentro();
          mostrarMensagemCentro("Centro de custo excluído com sucesso.");
        } catch (error) {
          mostrarMensagemCentro(error && error.message ? error.message : "Falha ao excluir o centro de custo no Neon.", "error");
        }
      }
    });

    clearCentroButton.addEventListener("click", () => {
      centroCustoForm.reset();
      prepararNovoCentro();
      limparMensagemCentro();
    });

    despesaForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      limparMensagemDespesa();
      const dados = coletarDadosDespesaFormulario();
      if (!dados) {
        mostrarMensagemDespesa("Preencha os campos obrigatórios da despesa.", "error");
        return;
      }

      const lista = [...despesasCache];
      const codigoEdicao = despesaForm.codigoEdicaoDespesa.value;
      if (codigoEdicao) {
        const indice = lista.findIndex((item) => item.codigo === codigoEdicao);
        if (indice >= 0) {
          lista[indice] = { ...lista[indice], ...dados };
          mostrarMensagemDespesa("Despesa atualizada com sucesso.");
        }
      } else {
        lista.push({ codigo: despesaForm.despesaCodigo.value || proximoCodigoDespesa(), ...dados });
        mostrarMensagemDespesa("Despesa cadastrada com sucesso.");
      }
      try {
        await salvarDespesas(lista);
        despesaForm.reset();
        prepararNovaDespesa();
        atualizarSelectsFinanceiro();
      } catch (error) {
        mostrarMensagemDespesa(error && error.message ? error.message : "Falha ao salvar a despesa no Neon.", "error");
      }
    });

    clearDespesaButton.addEventListener("click", () => {
      despesaForm.reset();
      prepararNovaDespesa();
      limparMensagemDespesa();
    });

    visualizarPropostaButton.addEventListener("click", () => {
      abrirProposta();
    });

    imprimirPropostaButton.addEventListener("click", () => {
      window.print();
    });

    ocultarPropostaButton.addEventListener("click", () => {
      blocoProposta.classList.remove("active");
    });

    exportButton.addEventListener("click", () => {
      const lista = obterOrcamentos();
      if (lista.length === 0) {
        mostrarMensagem("Não há orçamentos para exportar.", "error");
        return;
      }

      const blob = new Blob([JSON.stringify(lista, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orcamentos-inova-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      mostrarMensagem("Arquivo JSON exportado com sucesso.");
    });

    aplicarFiltrosButton.addEventListener("click", () => {
      filtrosAtivos.cliente = filtroCliente.value.trim();
      filtrosAtivos.statusOrcamento = filtroStatusOrcamento.value;
      filtrosAtivos.statusEntrega = filtroStatusEntrega.value;
      filtrosAtivos.dataInicio = filtroDataInicio.value ? obterDataISO(filtroDataInicio.value) : null;
      filtrosAtivos.dataFim = filtroDataFim.value ? obterDataISO(filtroDataFim.value) : null;

      if (filtrosAtivos.cliente || filtrosAtivos.statusOrcamento || filtrosAtivos.statusEntrega || filtrosAtivos.dataInicio || filtrosAtivos.dataFim) {
        mostrarMensagem("Filtros aplicados com sucesso.");
      }
      renderizarTabela();
    });

    limparFiltrosButton.addEventListener("click", () => {
      filtroCliente.value = "";
      filtroStatusOrcamento.value = "";
      filtroStatusEntrega.value = "";
      filtroDataInicio.value = "";
      filtroDataFim.value = "";
      
      filtrosAtivos = {
        cliente: "",
        statusOrcamento: "",
        statusEntrega: "",
        dataInicio: null,
        dataFim: null
      };

      limparMensagem();
      renderizarTabela();
    });

    // Aplicar filtros ao pressionar Enter nos campos de entrada
    filtroCliente.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        aplicarFiltrosButton.click();
      }
    });

    async function initApp() {
      criarCampoOcultoEdicao();
      criarCampoOcultoEdicaoCliente();
      criarCampoOcultoEdicaoResponsavel();
      criarCampoOcultoEdicaoMotorista();
      criarCampoOcultoEdicaoVeiculo();
      criarCampoOcultoEdicaoCategoria();
      criarCampoOcultoEdicaoForma();
      criarCampoOcultoEdicaoCentro();
      criarCampoOcultoEdicaoDespesa();
      resetarItensProdutoFormulario();
      carregarResponsaveisIniciais();
      prepararNovoResponsavel();
      prepararNovoTipoServico();
      prepararNovaCategoria();
      prepararNovaForma();
      prepararNovoCentro();
      prepararNovaDespesa();
      renderizarResponsaveis();
      renderizarMotoristas();
      renderizarVeiculos();
      renderizarTiposServico();
      renderizarCategoriasDespesas();
      renderizarFormasPagamento();
      renderizarCentrosCusto();
      atualizarSelectsFinanceiro();
      atualizarSelectTipoServicoOrcamento();
      alternarModuloCadastro(cadastroTipoSeletor.value || "responsaveis");
      alternarModuloFinanceiro(financeiroModuloSeletor.value || "lancamento-despesas");
      const sessao = sessionStorage.getItem(AUTH_USER_KEY);
      const modoLocalAtivo = sessionStorage.getItem(LOGIN_MODO_LOCAL_KEY) === "1";
      if (sessao) {
        usuarioLogado = sessao;
      }

      if (!usuarioLogado) {
        bloquearInterface();
        return;
      }

      if (!authToken || modoLocalAtivo) {
        ativarModoLocal(usuarioLogado, "Modo local ativo.");
        return;
      }

      try {
        await carregarDadosIniciais();
        renderizarTabela();
        renderizarClientes();
        renderizarResponsaveis();
        renderizarMotoristas();
        renderizarVeiculos();
        renderizarTiposServico();
        atualizarSelectTipoServicoOrcamento();
        popularTodosDropdownsLookup();
        liberarInterface();
        alternarAba("orcamentos");
        reservarNovoNumeroOrcamento();
      } catch (_error) {
        ativarModoLocal(usuarioLogado || "INOVA", "API indisponivel. Modo local ativado.");
      }
    }

    window.addEventListener("pagehide", () => {
      liberarNumeroOrcamentoAtual({ beacon: true });
    });

    initApp();
