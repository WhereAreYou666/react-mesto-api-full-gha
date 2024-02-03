const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { getSecret } = require('../utils/secrets');

const extractBearerToken = function extractBearerToken(header) {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Неправильные почта или пароль');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, getSecret());
  } catch (err) {
    return next(new AuthorizationError('Неправильные почта или пароль'));
  }

  req.user = payload;

  return next();
};
