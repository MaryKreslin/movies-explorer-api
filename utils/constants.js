const URL_REGEX = /http[s]?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9():%_+.~#?&//=]*)/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{3,30}$/;

const MONGO_DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT_NUMBER = 3000;
const DEV_JWT_KEY = 'super-secret-key';

const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const BAD_URL_MESSAGE = 'Не является URL адресом';
const NOT_FOUND_MESSAGE = 'Нет фильма с таким id';
const VALIDATION_ERROR__MESSAGE = 'Ошибка валидации';
const FORBIDDEN_DELETE_MESSAGE = 'Нет доступа к удалению фильма';
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const UNAUTORIZED_ERROR_MESSAGE = 'Необходима авторизация';
const CONFLICT_ERROR_MESSAGE = 'Пользователь уже существует!';

const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';

module.exports = {
  URL_REGEX,
  PASSWORD_REGEX,
  PORT_NUMBER,
  MONGO_DB_ADRESS,
  DEV_JWT_KEY,
  INTERNAL_SERVER_ERROR_MESSAGE,
  BAD_URL_MESSAGE,
  NOT_FOUND_MESSAGE,
  VALIDATION_ERROR__MESSAGE,
  FORBIDDEN_DELETE_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  UNAUTORIZED_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
};
