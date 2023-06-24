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
const semilleroRouter = require('./routes/semilleroRoute')
const proyectoRouter = require('./routes/proyectoRoute')

const app = express();
app.use(cors());
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Llamado a rutas
app.use('/index', indexRouter);
app.use('/api/estudiante', estudianteRouter);
app.use('/api/coordinador', coordinadorRouter);
app.use('/api/semillero', semilleroRouter);
app.use('/api/proyecto', proyectoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send('');
});

module.exports = app;
