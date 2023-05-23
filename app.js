const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const { errors } = require('celebrate');
const helmet = require('helmet');
const NotFoundErr = require('./errors/notFoundErr');
const handleErrors = require('./middlewares/handleErrors');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { MONGO_DB_ADDRESS, PORT_NUMBER } = require('./utils/constants');

const { PORT = PORT_NUMBER } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

process.on('uncaughtException', (err) => {
  console.log(err);
});
mongoose.connect(
  MONGO_DB_ADDRESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log(err));

app.use(requestLogger);

app.use(helmet());

app.use(routes);

app.use('*', auth, (req, res, next) => {
  const err = new NotFoundErr('Страница не найдена');
  next(err);
});

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
