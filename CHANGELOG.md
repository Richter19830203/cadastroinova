# Changelog

Todas as mudanças notáveis deste sistema são documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/)
(MAJOR.MINOR.PATCH).

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
