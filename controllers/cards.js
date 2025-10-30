const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos ao criar cartão";
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      return Card.findByIdAndRemove(cardId).then(() =>
        res.send({ message: "Cartão excluído", card })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de cartão inválido";
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de cartão inválido";
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Cartão não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de cartão inválido";
      }
      next(err);
    });
};
