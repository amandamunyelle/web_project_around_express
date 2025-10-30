module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  const message = status === 500 ? "Erro do servidor" : err.message;
  res.status(status).send({ message });
};
