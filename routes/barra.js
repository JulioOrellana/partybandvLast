'use strict'

const express = require('express')
const router = express.Router()
const db = require('../config')
const userController = require('../controllers/usuarioController')
const barraController = require('../controllers/barraController')

module.exports = (io) => {
  router.get('/',function(req,res,next)
  {
    barraController.getAllDrinks()
    .then(drinks =>{ res.render('layouts/barra', { data: drinks, debug: true }) })
  })

  router.get('/getSingleDrink/:id', function(req,res,next)
  {
    barraController.getSingleDrinkValue(id)
    .then(drink =>{ })
  })

  router.get('/getUser/:numpulsera', function(req,res,next)
  {
    barraController.getSingleUser(req.params.numpulsera)
                  .then(data=>{
                    res.status(200)
                        .json({data:data})
                  })
  })

  router.post('/agregarCompra', function (req,res,next)
  {
    let compra = req.body
    let numpulsera = compra[compra.length-1]
    let suma = compra[compra.length-2]
    let codc = compra[compra.length-3]
    
    compra.splice(compra.length-3,3)
    console.log('en el barra.js route')
    barraController.userPayment(codc,compra,suma,numpulsera)
            .then(data =>{
              console.log('en success de la route barra.js')
              io.emit('compraAceptada', data)
              res.status(200)
                .json({data:true})
            })
            .catch(err=>{
              console.log('en error de la route barra.js')
              
              res.status(200)
                .json({data:false})
            })

  })

  return router
}
