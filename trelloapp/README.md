# Trello App - Local Project

Uma aplicação Trello simples para testar com Cypress.

## Como rodar

1. **Instale as dependências:**
```bash
npm install
```

2. **Inicie o servidor:**
```bash
npm start
```

O servidor vai rodar em `http://localhost:3000`

## Funcionalidades

- ✅ Página inicial com lista de boards
- ✅ Criar novo board
- ✅ Visualizar board específico (muda URL para `/board/1`, `/board/2`, etc)
- ✅ Colunas Kanban (To Do, In Progress, Done)

## Como testar com Cypress

1. A partir da raiz do cypress-basics
2. Rode `npx cypress open`
3. Selecione spec.cy.js para ver os testes

## Estrutura

```
trelloapp/
├── app.js              # Servidor Express
├── package.json        # Dependências
├── public/
│   ├── index.html      # Página inicial
│   ├── board.html      # Página do board
│   ├── style.css       # Estilos
│   ├── script.js       # JavaScript da página inicial
│   └── board.js        # JavaScript da página do board
└── README.md           # Este arquivo
```
