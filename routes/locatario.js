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


router.get('/obtenerTodo',function(req,res,next)
{
    locatarioController.getAllData()
            .then(data =>{
                res.status(200)
                    .json({
                            productos : data[0],
                            consumidores: data[1]
                          })
            }) 
})

router.get('/obtenerProveedores',function(req,res,next)
{
    locatarioController.getAllProveedores()
            .then(data =>{
                res.status(200)
                    .json({
                            proveedores : data
                          })
            }) 
})

router.get('/obtenerTodoVentas/:month/:year',function(req,res,next){

    let month = req.params.month
    let year = req.params.year
    console.log(month+" "+year)
    locatarioController.getAllSales(month,year)
        .then(data=>{
            res.status(200)
                .json({
                    data : data
                })
        })
        .catch(err=>{
            console.log('error en obtenerTodoVentas Router!!')
        })
})

module.exports = router