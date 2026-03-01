const { verify } = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const adminValidate = (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnauthorizedError("admin not logged in");
  }

  let validAdmin;
  try {
    validAdmin = verify(token, process.env.ADMIN_SECRET);
  } catch (error) {
    throw new UnauthorizedError(
      "you do not have permission to access this route",
    );
  }

  if (!validAdmin) {
    throw new UnauthorizedError(
      "you do not have permission to access this route",
    );
  }
  req.admin = validAdmin;
  next();
};

module.exports = adminValidate;
