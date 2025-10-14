const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const usersPath = path.join(__dirname, "../data/users.json");

// GET todos os usuários
router.get("/", (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler o arquivo de usuários" });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

// GET usuário por ID
router.get("/:id", (req, res) => {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler o arquivo de usuários" });
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((item) => item._id === req.params.id);

    if (!user) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
      return;
    }

    res.send(user);
  });
});

module.exports = router;
