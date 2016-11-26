'use strict'

const express = require('express')
const db = require('../config')


exports.getData = function getData(user,pass)
{
    console.log('Desde loginController: '+user+', '+pass)
    //return db.one('select * from locatario where email=$1 and contrasena=$2',[user,pass])


    return db.task(t=>{
        return t.batch([
            t.one('select * from locatario where email=$1 and contrasena=$2',[user,pass]),
            t.many(`select p.codp, p.nombre as nombreproducto, p.categoria, p.valor, p.descripcion, p.stock, pr.nombre as nombreproveedor, pr.telefono 
                    from producto p, proveedor pr where p.codprov = pr.codp order by 1`),
            t.many('select * from consumidor')
        ])
    })
}