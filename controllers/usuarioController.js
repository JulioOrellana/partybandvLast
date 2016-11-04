'use strict'

const express = require("express");
const db = require('../config');

exports.getAllUsers = function getAllUsers()
{
  return db.query({
                    name: 'getAllUsers',
                    text: 'select * from pulsera', // a query or a QueryFile object (see PreparedStatement)
                    values: [],
                    rowMode: 'array'
                  })
                    .then(data=>{
                    return data;
                    })
                    .catch(reason=>{
                    return reason;
                    });
}

exports.getSingleUser = function getSingleUser(id)
{
  db.one('select * from	clientepulsera where codcp = $1', id)
      .then(function(data) {
        return data;
      })
      .catch(function(err) {
          console.log("Error al intentar recuperar datos para el usuario pulsera número " + id + ", función callSingleUser");
      });
}
