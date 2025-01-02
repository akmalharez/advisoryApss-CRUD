// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
      const user = jwt.verify(token, "mysecretkey"); // Replace with env variable for real apps
      if (user.role_type !== role) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};
