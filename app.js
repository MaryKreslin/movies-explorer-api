const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const process = require('process');
const { errors } = require('celebrate');
const helmet = require('helmet');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limit } = require('./middlewares/rateLimiter');
const routes = require('./routes/index');
const { PORT_NUMBER, MONGO_DB_ADRESS } = require('./utils/constants');

const { PORT = PORT_NUMBER, DB_ADDRESS, NODE_ENV } = process.env;
const app = express();

/* const allowedCors = [
  'http://localhost:3000',
  'https://api.movies.kreslin.nomoredomains.monster',
  'http://api.movies.kreslin.nomoredomains.monster',
  'https://movies.kreslin.nomoredomains.monster',
  'http://movies.kreslin.nomoredomains.monster'
];

const options = {
  option: [
    'http://localhost:3000',
    'http://movie.explorer.subb.front.nomoredomains.rocks',
    'https://movie.explorer.subb.front.nomoredomains.rocks',
  ],
  origin: [
    'http://localhost:3000',
    'https://api.movies.kreslin.nomoredomains.monster',
    'http://api.movies.kreslin.nomoredomains.monster',
    'https://movies.kreslin.nomoredomains.monster',
    'http://movies.kreslin.nomoredomains.monster'
  ],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
/*
function useCors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
}
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on('uncaughtException', (err) => {
  console.log(err);
});
mongoose.connect(
  ((NODE_ENV !== 'production') ? MONGO_DB_ADRESS : DB_ADDRESS),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));
app.use(cors({
  option: [
    'http://localhost:3000',
    'https://api.movies.kreslin.nomoredomains.monster',
    'http://api.movies.kreslin.nomoredomains.monster',
    'https://movies.kreslin.nomoredomains.monster',
    'http://movies.kreslin.nomoredomains.monster',
  ],
  origin: [
    'http://localhost:3000',
    'https://api.movies.kreslin.nomoredomains.monster',
    'http://api.movies.kreslin.nomoredomains.monster',
    'https://movies.kreslin.nomoredomains.monster',
    'http://movies.kreslin.nomoredomains.monster',
  ],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
}));
app.use(requestLogger);

app.use(limit);

// app.use('*', cors(options));
app.use(helmet());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error while starting server');
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
