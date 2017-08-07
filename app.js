const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const http = require('http');
const paypal = require('paypal-rest-sdk');

const activityApi = require('./routes/activity-api');
const userAuth = require('./routes/user-auth');
const paypalApi = require('./routes/paypal-api');
const index = require('./routes/index');

const User = require('./models/user-model')
const Activity = require('./models/activity-model');

// database connection
require('./config/database');
require('./config/paypal');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','jade');

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use('/', userAuth);
// app.use('/api',  passport.authenticate('jwt', {session: false}), activityApi);
app.use('/',index);
app.use('/api',activityApi)
app.use('/api/',paypalApi);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;