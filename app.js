const express = require('express');
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

app.use(requestLogger);

app.use(limit);

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
