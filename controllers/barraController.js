'use strict'

const express = require("express");
const db = require('../config');

exports.getAllDrinks = function getAllDrinks()
{
  /*return db.query({
                    name: 'getAllUsers',
                    text: 'select * from producto', // a query or a QueryFile object (see PreparedStatement)
                    values: [],
                    rowMode: 'array'
                  })
                    .then(data=>{
                    return data;
                    })
                    .catch(reason=>{
                    return reason;
                  });*/

    return   db.many('select * from	producto order by 1')
                  .then(function(data) {
                    return data;
                  })
                  .catch(function(err) {
                      console.log("Error al intentar recuperar datos.");
                  });
}

exports.getSingleDrinkValue = function getSingleDrinkValue(id){
  return db.one('select valor from producto where codp=$1',id)
    .catch(err=>{
      console.log('Error al recuperar el valor del producto');
    });
}

exports.getSingleUser = (numpulsera) =>
   db.one('select * from consumidor c, pulsera p, saldo s where c.codc=p.codp and p.codp = s.cods and numero=$1;',numpulsera)
    .catch(err => {
      return "Sin resultados para pulsera número: "+numpulsera+".";
    })

exports.userPayment = function userPayment(c,p,m,pul){
  console.log('en barraController')

  return db.tx(t=>
                  t.batch([
                          p.map(p=>
                                      t.none(
                                             `insert into orden (producto,cantidad,token,monto,fecha,codproducto,codconsumidor)
                                              values ($1,$2,$3,$4,now(),$5,$6)`,[p.nombre,p.cantidad,p.token,p.valor,p.codigo,c])),
                          p.map(p=>
                                      t.one(
                                            `select * from producto where codp=$1`,p.codigo)
                                            .then(producto =>{
                                              return t.none(`update producto set stock=$1 where codp=$2`,[producto.stock-p.cantidad,p.codigo])
                                                      })
                                            .catch(rr=>{console.log('En error de saldo: '+m+', '+err); return false})
                          ),                                      
                          t.one(`select * from pulsera where numero=$1`,pul)
                              .then(cpulsera =>{
                                console.log('En cpulsera: '+cpulsera.codp)
                                return t.one(`select * from saldo where codpulsera=$1`,cpulsera.codp)
                              }).catch(err=>{console.log('En error de cpulsera: '+pul+', '+err); return false})
                              .then(saldo =>{
                                console.log('En saldo: '+saldo.saldo+', '+saldo.codpulsera)
                                return t.none(`update saldo set saldo=$1 where codpulsera=$2`,[(saldo.saldo-m),saldo.codpulsera])
                              }).catch(err=>{console.log('En error de saldo: '+m+', '+err); return false})                  
                          ]))
          .then(data=> {
              // SUCCESS
              // data = array of null-s
              console.log('en success de la transacción')
              return true
          })
          .catch(error=> {
              // ERROR
              console.log('en error de la transacción')
              return false
          })




  /* return db.tx(t=>{  
                return t.batch([
                  p.map( l => 
                    l.none(`insert into orden (producto,cantidad,token,monto,fecha,codproducto,codconsumidor)
                            values ($1,$2,$3,$4,now(),$5,$6)`,[p.nombre,p.cantidad,p.token,p.valor,p.codigo,c])
                  )
                  
                  t.one(`select codp from pulsera where pulsera=$1`,pul)
                    .then(cpulsera =>{
                      t.one(`select saldo,codp from saldo where codpulsera=$1`,cpulsera.codp)
                    })
                    .then(saldo =>{
                      t.none(`update saldo set saldo=$1 where codp=$2`,[saldo.saldo,saldo.codp-m])
                    })
                ])
          })
            .then(data =>{
              console.log(data)
            })
            .catch()
            */
              
}