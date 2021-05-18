"use strict"

process.env.SECRET = "toes";

const supergoose = require('@code-fellows/supergoose');
const server = require('.././src/server').app;
const mockRequest = supergoose(server);

