'use strict'

const express = require('express');
const router = express.Router();
const db = require('../config');
const userController = require('../controllers/usuarioController');
const barraController = require('../controllers/barraController');

router.get('/',function(req,res,next){
  barraController.getAllDrinks()
  .then(drinks =>{ res.render('layouts/barra', { data: drinks, debug: true }) });
});

module.exports = router;
