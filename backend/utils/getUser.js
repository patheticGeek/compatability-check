const jwt = require("jsonwebtoken");

const getUser = (req) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  if (!token) throw new Error("Not authorized");

  const data = jwt.verify(token, process.env.JWT_SECRET);
  if (data && data.expireAt && data.expireAt < Date.now()) {
    throw new Error("Token has expired");
  }

  return data;
};

module.exports = getUser;
