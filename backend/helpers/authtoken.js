const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const authenticateToken = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  const token = headerAuth && headerAuth.split(" ")[1];

  if (token == null) return res.status(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .json({
          status: false,
          message: "Something went wrong!",
          error: err,
        })
        .status(403);
    let userName = user;
    let flag = false;

    User.findOne({ where: { userName } }).then((data) => {
      if (data) {
        flag = true;
      } else {
        res.status(404).send("Failed To Fetch Data");
      }

      // We are handling the next() and Error handling
      if (flag == true) {
        req.user = user;
        next();
      } else {
        res.status(404).json("User does not exist");
      }
    });
  });
};

module.exports = { authenticateToken };
