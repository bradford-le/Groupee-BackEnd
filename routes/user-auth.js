const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwt');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A T T E M P T   T O   S A V E   T H E   U S E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      else {
        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
});
//────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── II ──────────
//   :::::: A U T H E N T I C A T E   U S E R   A N D   A S S I G N   J S O N   W E B   T O K E N : 
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({'username': username}, (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'The username or password is incorrect' });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json({ message: 'The username or password is incorrect' });
      }
      else {
        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        // console.log("token",token);
        res.status(200).json({ token, user });
      }
    });
  });
});

router.get('/ping', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json('Pong');
});

module.exports = router;
