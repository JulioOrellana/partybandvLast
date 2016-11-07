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
