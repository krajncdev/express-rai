require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var questionsRouter = require('./routes/questionRoutes');

var app = express();

var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@raiferi.oc08xgm.mongodb.net/?retryWrites=true&w=majority&appName=RaiFeri`;
mongoose.connect(mongoDB);
mongoose.promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// session setup
var session = require('express-session');
app.use(
  session({
    secret: 'my secret',
    resave: true,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
