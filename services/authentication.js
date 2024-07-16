const JWT = require("jsonwebtoken");

const secret = "$uper123OmegaHomelander";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret); //validate krne pr payload return ho jaata hai
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};