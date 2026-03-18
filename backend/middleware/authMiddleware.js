const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    // Expecting: "Bearer <token>"
    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // VERY IMPORTANT
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ msg: "Access denied" });
  }
  next();
};

module.exports = { authMiddleware, authorizeRole };