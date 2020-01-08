var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');
var helmet = require('helmet');

// Load in environment variables
require('dotenv').config();

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var categoriesRouter = require('./routes/categories');

var app = express();

// Set up Mongoose Connection, set the DB url in the process
var mongoDB = process.env.MONGODB_URI;
// Option for useFindandModify is for findOneAndUpdate, as seen here: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Compress routes
app.use(compression());

// Use helmet to prevent common vulnerabilities
app.use(helmet());

app.use('/', indexRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
