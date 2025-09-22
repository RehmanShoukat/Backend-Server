const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; 
  console.log("authHeader:", authHeader);

  const token = authHeader?.split(" ")[1];
  console.log("token:", token);

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Unauthorized or user doesn't have access" });
    }

    req.uid = decoded.uid;
    req.role = decoded.role;
    next();
  });
};

module.exports = { verifyToken };
