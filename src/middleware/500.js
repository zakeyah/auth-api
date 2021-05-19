'use strict';

module.exports=(err,req,res,next)=>{
  res.status(500).json({
    error : err,
    msg: `server error => ${err.message} .`,
    path : req.path     
  });
};