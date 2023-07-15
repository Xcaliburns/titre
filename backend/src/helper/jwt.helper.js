const jwt = require("jsonwebtoken");


const encodeJWT = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};

//Sert pour authoriser l'utilisateur sur certaines routes
const decodeJWT = (token) => {
  return jwt.decode(token, process.env.TOKEN_SECRET);
};

module.exports = { encodeJWT, decodeJWT };