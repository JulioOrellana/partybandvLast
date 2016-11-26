'use strict'

const express = require('express')
const db = require('../config')


exports.getUser = function getUser(user,pass)
{
    console.log('Desde loginController: '+user+', '+pass)
    return db.one('select * from locatario where email=$1 and contrasena=$2',[user,pass])
}