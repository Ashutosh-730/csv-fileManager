const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const JWT_Secret = "iamnotbrillientbutiamuniqueiamasoftwareengineer";

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in. :: 1" });
  }
  const token = authorization.replace("Bearer ", "");
  await jwt.verify(token, JWT_Secret, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in. :: 2" });
    }
    const { _id } = payload;
    User.find({ _id }).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
