const mongoose = require("mongoose");

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?%#[\]@!$&'()*+,;=]+#?$/i;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O campo 'name' é obrigatório"],
    minlength: [2, "O nome deve ter no mínimo 2 caracteres"],
    maxlength: [30, "O nome deve ter no máximo 30 caracteres"],
  },
  about: {
    type: String,
    required: [true, "O campo 'about' é obrigatório"],
    minlength: [2, "O campo 'about' deve ter no mínimo 2 caracteres"],
    maxlength: [30, "O campo 'about' deve ter no máximo 30 caracteres"],
  },
  avatar: {
    type: String,
    required: [true, "O campo 'avatar' é obrigatório"],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "Avatar deve ser uma URL válida",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
