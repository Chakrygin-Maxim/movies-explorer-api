require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { limiter } = require('./middlewares/limiter');
const error = require('./middlewares/error');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DATABASE_URL } = require('./config');

const app = express();

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);
app.use(routes);

app.use(errorLogger);

// централизованная обработка ошибок
app.use(error);

// подключаемся к серверу mongo
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
