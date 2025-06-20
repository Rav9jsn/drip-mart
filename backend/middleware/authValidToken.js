const jwt = require("jsonwebtoken");
const { envData } = require("../config");
const keyValue = envData.key;

const ensurAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ message: "Unauthorized, please Login" });
  }

  try {
    const decode = jwt.verify(auth, keyValue);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized, please Login" });
  }
};

module.exports = ensurAuthentication;
