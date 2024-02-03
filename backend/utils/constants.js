const ERROR_INPUT = 400;
const ERROR_NOTFOUND = 404;
const ERROR_SERVER = 500;
const REGULAR_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const { NODE_ENV } = process.env;
const { SECRET_SIGNING_KEY } = process.env;

module.exports = {
  ERROR_INPUT,
  ERROR_NOTFOUND,
  ERROR_SERVER,
  REGULAR_URL,
  NODE_ENV,
  SECRET_SIGNING_KEY,
};
