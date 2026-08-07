// Fonte unica de verdade da versao do sistema.
// Atualizar este arquivo a cada mudanca: versao, build, dataBuild e o
// array historico (mesmo conteudo do CHANGELOG.md, em formato de dados).
window.INOVA_VERSAO = {
  versao: "1.0.0",
  build: "20260807-1",
  dataBuild: "2026-08-07",
  desenvolvedor: "Felipe Richter Brólio",
  empresa: "INOVA Transportes e Mudanças",
  frontend: "Netlify",
  backend: "Node.js / Express",
  banco: "Neon PostgreSQL",
  historico: [
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
