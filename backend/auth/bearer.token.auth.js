const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.slice(7);
      verify(token, process.env.SIGN_KEY, (error, decoded) => {
        if (error) {
          res.json({
            success: false,
            message: "Invalid token",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: "Invalid token",
      });
    }
  },
};
