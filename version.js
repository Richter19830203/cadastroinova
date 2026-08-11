// Fonte unica de verdade da versao do sistema.
// Atualizar este arquivo a cada mudanca: versao, build, dataBuild e o
// array historico (mesmo conteudo do CHANGELOG.md, em formato de dados).
window.INOVA_VERSAO = {
  versao: "1.3.0",
  build: "11/08/2026-1",
  dataBuild: "2026-08-11",
  desenvolvedor: "Felipe Richter Brólio",
  empresa: "INOVA Transportes e Mudanças",
  frontend: "Netlify",
  backend: "Node.js / Express",
  banco: "Neon PostgreSQL",
  historico: [
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
