'use strict';

// const base64 = require('base-64');
const User = require('../models/users.js');
const base64 = require('base-64');
module.exports = async (req, res, next) => {

  console.log('req.headers.authorization----->',req.headers.authorization)
  if (!req.headers.authorization) { return _authError(); }
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');
  console.log('user----->',user)
  console.log('pass----->',pass)


  try {
    req.user = await User.authenticateBasic(user, pass);
    next();
  } catch (e) {
    console.log(e)
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

};

