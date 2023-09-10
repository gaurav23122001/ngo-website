const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const AdminModel = require("../../Models/AdminModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Please Log in" });
  }
  const token = authorization.replace("Token ", "");
  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const { id } = payload;
    const user = await AdminModel.findById(id);

    req.user = user;
    next();
  });
};
