const jwt = require("jsonwebtoken");
const dbc = require("../config/db");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`);

    const userId = decodedToken.userId;
    req.userId = userId;
    let db = dbc.getDB();
    const sql = `SELECT user_id FROM users WHERE user_id = ${userId}`;
    db.query(sql, (err) => {
      if (err) res.status(500).json(err);
      else {
        next();
      }
    });
  } else {
    res.clearCookie();
    res.status(401).json({ message: "Unauthorized" });
  }
};
