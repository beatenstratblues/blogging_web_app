const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  // this does a soft authentication check first to see if user even has a cookie or not
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };