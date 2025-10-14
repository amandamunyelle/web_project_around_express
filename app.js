const express = require("express");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

// Middleware para analisar JSON
app.use(express.json());

// Rotas principais
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Middleware catch-all para rotas inexistentes (404)
app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
