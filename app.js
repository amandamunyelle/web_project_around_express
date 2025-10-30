const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const errorHandler = require("./middlewares/errors");

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

// Conexão com o banco de dados
mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✔ MongoDB conectado — aroundb"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

//  Middleware temporário
app.use((req, res, next) => {
  req.user = {
    _id: "6903d599ea30c3a546b82ed6",
  };
  next();
});

// Rotas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Rota para 404
app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

// Middleware central de erros
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
