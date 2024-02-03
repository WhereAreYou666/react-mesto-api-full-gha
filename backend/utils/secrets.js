const { NODE_ENV, SECRET_SIGNING_KEY } = require('./constants');

module.exports.getSecret = () => (NODE_ENV === 'production' ? SECRET_SIGNING_KEY : 'dev-secret');
