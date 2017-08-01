const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const http = require('http');
const fs = require('fs');


const activityApi = require('./routes/activity-api');
const userAuth = require('./routes/user-auth');

const User = require('./models/user-model')
const Activity = require('./models/activity-model');

// database connection
require('./config/database');

var app = express();

try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(config);

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// app.use('/', userAuth);
// app.use('/api',  passport.authenticate('jwt', {session: false}), activityApi);
app.use('/api',activityApi)
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
