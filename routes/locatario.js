'use strict'

const express = require('express')
const router = express.Router()
const db = require('../config')
const loginController = require('../controllers/loginController')
const locatarioController = require('../controllers/locatarioController')

router.get('/',function(req,res,next)
{
    console.log('Es valida la session?: '+req.session.active)
    if(req.session.active)
    {        
        locatarioController.getAllData()
            .then(data =>{
                res.render('layouts/interfazGestion',{
                                                user : req.session.user,
                                                productos : data[0],
                                                consumidores: data[1]
                                        })
            })        
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