const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const cardsPath = path.join(__dirname, "../data/cards.json");

// GET todos os cards
router.get("/", (req, res) => {
  fs.readFile(cardsPath, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Erro ao ler o arquivo de cards" });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = router;
