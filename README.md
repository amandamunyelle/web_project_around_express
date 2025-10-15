# Tripleten web_project_around_express

Servidor back-end do projeto **EUA Afora**, desenvolvido no curso da **TripleTen**.  
Cria uma API com **Node.js** e **Express** para servir dados de usuários e cartões.

---

## Tecnologias

- Node.js
- Express.js
- Nodemon
- ESLint (Airbnb Style Guide)
- EditorConfig
- Módulos nativos: `fs`, `path`

---

## Estrutura

web_project_around_express/
├── data/
│ ├── users.json
│ └── cards.json
├── routes/
│ ├── users.js
│ └── cards.js
├── .editorconfig
├── .eslintrc
├── .gitignore
├── app.js
├── package.json
└── README.md

---

## Como executar

```bash
npm install
npm run dev

Servidor disponível em: http://localhost:3000

##  Conceitos

Estrutura modular com rotas e dados separados

Uso de fs e path para leitura de arquivos JSON

Tratamento de erros 404 personalizados

Configuração de linter e formatação automática

---

Autor: Amanda Munyelle
Curso: TripleTen — Projeto 15
Ano: 2025
```
