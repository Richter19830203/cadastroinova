# Changelog

Todas as mudanças notáveis deste sistema são documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/)
(MAJOR.MINOR.PATCH).

## [1.7.0] - 2026-08-27

- Nova conta de administrador própria, separada do usuário INOVA — reconhecimento de admin agora é por cargo, não mais pelo nome fixo
- Selo "🛡️ administrador" no chip de usuário logado, que também ficou mais compacto e parou de sobrepor o conteúdo da tela
- Resumo financeiro (Valor total/Ticket médio) liberado pra qualquer conta admin, em vez de uma lista fixa de nomes
- RG, Telefone e E-mail dos Responsáveis cadastrados ficam ocultos por padrão, com um botão de visualizar por linha pra revelar
- Gráfico "Orçamentos por mês" ganhou animação em cascata, destaque no hover e clique pra abrir a lista de orçamentos já filtrada por aquele mês; os outros 5 gráficos também animam a entrada, e o Funil de Status também é clicável
- Formulário de Novo Orçamento e Lançamento de Despesas reorganizados em 4 colunas por linha, mais consistentes
- Corrigida a acentuação em vários campos do Orçamento (orçamento, responsável, elaboração, negociação, ocorrência, observações) e o cabeçalho "Ações" em todas as tabelas do sistema

## [1.6.0] - 2026-08-25

- Notas gerais da Proposta Comercial agora são selecionáveis por orçamento: desmontagem de móveis, fornecimento de embalagem e mão de obra de carga/descarga, cada uma com opções de texto pronto
- Nova coluna "Status" no Cadastro de Responsáveis (só pro admin): mostra quem está 🟢 online agora, 🕓 visto há X minutos/horas ou ⚪ offline

## [1.5.0] - 2026-08-14

- Sino de alertas 🔔 (só pro admin): avisa sobre pedidos de redefinição de senha pendentes e quando sai uma nova versão do sistema — clique pra ver o que mudou
- Importados 171 orçamentos históricos (Nº 3181 a 3529) para a base de dados

## [1.4.0] - 2026-08-12

- Logo real da INOVA na sidebar, espaçamento do topo ajustado e aviso visível na busca de cidade do Cálculo de Rotas
- Sidebar recolhível no celular: menu vira uma gaveta com botão próprio em telas estreitas
- "Esqueci minha senha" agora avisa o administrador por e-mail (via Resend) em vez de só mostrar um aviso fixo
- Corrigido: ajustar o período de um gráfico individual depois de usar "Aplicar em todos os gráficos" não tinha efeito

## [1.3.0] - 2026-08-11

- Menu lateral fixo (sidebar) substitui a barra de abas horizontais no topo
- Nova aba "Cálculo de Rotas": busca de cidade, mapa (OpenStreetMap/Leaflet) e botão para copiar a distância calculada direto pro formulário de Orçamento
- Removidos os campos CEP Origem/CEP Destino do formulário de Orçamento (cálculo de distância passou a ser feito pela aba Cálculo de Rotas)
- Logo da INOVA deixou de aparecer no topo de todas as abas, mantido só na Proposta Comercial
- Corrigido: chip "Logado como", botão "Sobre o Sistema" e badge de versão não aparecem mais na impressão da proposta comercial

## [1.0.0] - 2026-08-07

Primeira versão formalmente versionada. Resumo das capacidades já
existentes no sistema até esta data:

- Login por e-mail/senha com recuperação de acesso
- Cadastro de orçamentos com numeração sequencial reservável (Nº ORÇ)
- Cálculo automático de distância (CEP a CEP) e valor por produto
- Aba Gráficos com 6 relatórios e exportação em PDF
- Importação de orçamentos históricos e proteção de valores sensíveis por login
