const User = require("../models/user");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID de usuário inválido";
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos ao criar usuário";
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos ao atualizar perfil";
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Avatar inválido";
      }
      next(err);
    });
};
