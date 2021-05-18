'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  console.log('req.headers.authorization)',req.headers.authorization)
  try {

    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    console.log('token',validUser.token)

    next();

  } catch (e) {
    console.log(e)
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}