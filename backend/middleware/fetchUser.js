const jwt = require("jsonwebtoken");
const jwt_Secrate = "Dipu's_Tech@123";

const fetchUser = (req, res, next) => {
  const token = req.headers["auth-token"];

  if (!token) {
    res.status(401).json({ error: "Provide a valid Token" });
  }

  try {
    const data = jwt.verify(token, jwt_Secrate);

    req.user = data.user;

    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
