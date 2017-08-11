const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwtOptions = require('./jwt');
const JwtStrategy = passportJwt.Strategy;

const User = require('../models/user-model');

let strategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // console.log('payload received',payload);
  User.findById(payload.id, (err, user) => {
    // console.log('passportStrategy user:', user);
    if (err) {    
      return done(err, false);
    }
    user ? done(null, user) : done(null, false);
  });
});

passport.use(strategy);

module.exports = passport;
