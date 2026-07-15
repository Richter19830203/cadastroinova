# INOVA Transportes e Mudancas - Registro de Orcamentos

Aplicacao web para cadastro, acompanhamento e atualizacao de orcamentos
de transporte/mudanca, com cadastro de clientes, motoristas, veiculos e
lancamentos financeiros.

## Estrutura

- `index.html`, `style.css`, `app.js` - frontend estatico.
- `server.js` - API Express (Postgres/Neon), reutilizada tanto para
  rodar localmente (`node server.js`) quanto empacotada como Netlify
  Function em `netlify/functions/api.js`.
- `netlify.toml` - configuracao de build e do redirect `/api/*` para a
  function.

## Rodando localmente

```
npm install
npm start
```

Requer um arquivo `.env` (nao versionado) com `DATABASE_URL_POOL` (ou
`DATABASE_URL`) apontando para o banco Postgres/Neon, e opcionalmente
`AUTH_SECRET`.

## Deploy

Publicado via Netlify a partir deste repositorio. As variaveis de
ambiente (`DATABASE_URL_POOL`, `AUTH_SECRET`) devem ser cadastradas no
painel do Netlify (Site settings -> Environment variables), ja que o
`.env` local nao e versionado.
