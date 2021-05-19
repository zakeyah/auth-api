'use strict';

module.exports=(req,res)=>{
  res.status(404).json({
    error : 404,
    msg: 'NOT FOUND',
    path : req.baseUrl     
  });
}