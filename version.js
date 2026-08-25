// Fonte unica de verdade da versao do sistema.
// Atualizar este arquivo a cada mudanca: versao, build, dataBuild e o
// array historico (mesmo conteudo do CHANGELOG.md, em formato de dados).
window.INOVA_VERSAO = {
  versao: "1.6.0",
  build: "25/08/2026-1",
  dataBuild: "2026-08-25",
  desenvolvedor: "Felipe Richter Brólio",
  empresa: "INOVA Transportes e Mudanças",
  frontend: "Netlify",
  backend: "Node.js / Express",
  banco: "Neon PostgreSQL",
  historico: [
    {
      versao: "1.6.0",
      data: "2026-08-25",
      mudancas: [
        "Notas gerais da Proposta Comercial agora são selecionáveis por orçamento: desmontagem de móveis, fornecimento de embalagem e mão de obra de carga/descarga, cada uma com opções de texto pronto",
        "Nova coluna \"Status\" no Cadastro de Responsáveis (só pro admin): mostra quem está 🟢 online agora, 🕓 visto há X minutos/horas ou ⚪ offline"
      ]
    },
    {
      versao: "1.5.0",
      data: "2026-08-14",
      mudancas: [
        "Sino de alertas 🔔 (só pro admin): avisa sobre pedidos de redefinição de senha pendentes e quando sai uma nova versão do sistema — clique pra ver o que mudou",
        "Importados 171 orçamentos históricos (Nº 3181 a 3529) para a base de dados"
      ]
    },
    {
      versao: "1.4.0",
      data: "2026-08-12",
      mudancas: [
        "Logo real da INOVA na sidebar, espaçamento do topo ajustado e aviso visível na busca de cidade do Cálculo de Rotas",
        "Sidebar recolhível no celular: menu vira uma gaveta com botão próprio em telas estreitas",
        "\"Esqueci minha senha\" agora avisa o administrador por e-mail (via Resend) em vez de só mostrar um aviso fixo",
        "Corrigido: ajustar o período de um gráfico individual depois de usar \"Aplicar em todos os gráficos\" não tinha efeito"
      ]
    },
    {
      versao: "1.3.0",
      data: "2026-08-11",
      mudancas: [
        "Menu lateral fixo (sidebar) substitui a barra de abas horizontais no topo",
        "Nova aba Cálculo de Rotas: busca de cidade, mapa (OpenStreetMap/Leaflet) e botão para copiar a distância pro Orçamento",
        "Removidos os campos CEP Origem/CEP Destino do formulário de Orçamento",
        "Logo da INOVA mantido só na Proposta Comercial (não aparece mais no topo de todas as abas)",
        "Corrigido: chip de usuário, Sobre o Sistema e versão não aparecem mais na impressão da proposta"
      ]
    },
    {
      versao: "1.0.0",
      data: "2026-08-07",
      mudancas: [
        "Login por e-mail/senha com recuperação de acesso",
        "Cadastro de orçamentos com numeração sequencial reservável (Nº ORÇ)",
        "Cálculo automático de distância (CEP a CEP) e valor por produto",
        "Aba Gráficos com 6 relatórios e exportação em PDF",
        "Importação de orçamentos históricos e proteção de valores sensíveis por login"
      ]
    }
  ]
};
