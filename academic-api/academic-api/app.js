const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors');
// Importación de rutas
const indexRouter = require('./routes/index');
const estudianteRouter = require('./routes/estudianteRoute')
const coordinadorRouter = require('./routes/coordinadorRoute')

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Llamado a rutas
app.use('/index', indexRouter);
app.use('/api/estudiante', estudianteRouter);
app.use('/api/coordinador', coordinadorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send('');
});

module.exports = app;
