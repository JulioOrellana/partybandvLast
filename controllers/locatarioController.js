'use strict'

const express = require("express");
const db = require('../config');

exports.getAllData = function getAllData()
{
    return db.task(t=>{
        return t.batch([
            t.many(`select p.codp, p.nombre as nombreproducto, p.categoria, p.valor, p.descripcion, p.stock, pr.nombre as nombreproveedor, pr.telefono 
                    from producto p, proveedor pr where p.codprov = pr.codp order by 1`),
            t.many('select * from consumidor')
        ])
    })
}