const mongoose = require("mongoose");

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?%#[\]@!$&'()*+,;=]+#?$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "O campo 'name' é obrigatório"],
    minlength: [2, "O nome deve ter no mínimo 2 caracteres"],
    maxlength: [30, "O nome deve ter no máximo 30 caracteres"],
  },
  link: {
    type: String,
    required: [true, "O campo 'link' é obrigatório"],
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "Link deve ser uma URL válida",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "O campo 'owner' é obrigatório"],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
