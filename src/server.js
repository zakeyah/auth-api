'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/500');
const notFound =  require('./middleware/404');
const router = require('./auth/router');
const v1Routes = require('./api/routs/v1');
const v2Routes = require('./api/routs/v2');
const logger= require('./api/middleware/logger');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(logger);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(router);


app.get('/',(req,res)=>{
  res.send('hiiii');
});

function start (port){
  app.listen(port,()=>console.log(`listen to port  ${port}`));
}

app.use('*',notFound);
app.use(errorHandler);

module.exports={
  app,
  start
};
