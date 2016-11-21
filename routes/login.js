'use strict'

const express = require('express')
const router = express.Router()
const db = require('../config')
const barraController = require('../controllers/loginController')

router.get('/',function(req,res,next)
{
  res.render("layouts/signin")
})


module.exports = router;