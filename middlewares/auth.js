module.exports = (req, res, next) => {
  req.user = { _id: "6903d599ea30c3a546b82ed6" };
  next();
};
