'use strict'

const express = require("express");
const router = express.Router();
const db = require('../config');
const userController = require('../controllers/usuarioController');

router.get('/',function(req,res,next){
  /*db.many('select * from clientepulsera')
      .then(function(data) {
              res.render('login',{
                data: data
              });
      })
      .catch(function(err) {
        console.log("entró en RECHAZADO");
        console.log(err);
      })*/
   let data = userController.data();
   console.log(data);
   res.render('login',{
     data: data
   });
});

module.exports = router;
