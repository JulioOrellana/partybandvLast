'use strict'

const express = require('express')
const router = express.Router()
const db = require('../config')
const barraController = require('../controllers/loginController')

router.get('/',function(req,res,next)
{
    console.log('Es valida la session?: '+req.session.active)
    if(req.session.active)
    {
        res.render('layouts/interfazGestion',{user : req.session.user})
    }
    else
    {
        console.log('no es valido')
        res.render("layouts/signin-locatario")
    }
})

router.get('/salir', function(req,res,next){
  
    if(req.session.active)
    { 
       req.session.active = false
       res.redirect('/locatario')
    }
    else
    { 
       req.session.active = false
       res.redirect('/locatario')
    }

})

module.exports = router