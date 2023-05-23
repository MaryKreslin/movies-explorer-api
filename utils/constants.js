const URL_REGEX = /http[s]?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_+.~#?&//=]*)/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{3,30}$/;

const MONGO_DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT_NUMBER = 3000;

module.exports = {
  URL_REGEX,
  PASSWORD_REGEX,
  MONGO_DB_ADDRESS,
  PORT_NUMBER,
};
