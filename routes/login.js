'use strict'

const express = require('express')
const router = express.Router()
const db = require('../config')
const loginController = require('../controllers/loginController')

router.get('/locatario',function(req,res,next)
{
  res.render("layouts/signin-locatario")
})

router.get('/consumidor',function(req,res,next)
{
  res.render("layouts/signin-consumidor")
})

router.post('/access',function(req,res,next){

  let user = req.body.user
  let pass = req.body.password

  console.log('Desde router /access: '+user+', '+pass)

  loginController.getUser(user,pass)
    .then(
      user=>{
        req.session.active = true
        req.session.user = user
        res.redirect('/locatario')
      })
    .catch(err=>{
        console.log('usuario no encontrado')
    })

})

module.exports = router