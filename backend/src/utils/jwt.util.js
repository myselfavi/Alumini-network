const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  generateToken,
  verifyToken,
};