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

exports.getAllProveedores = function getAllProveedores()
{
    return db.many('select * from proveedor')
}

exports.getAllSales = function getAllSales(month,year)
{
    return db.task(t=>{
        return t.batch([
            //Entrega las ventas totales del mes especificado
            t.one(` select
                        SUM(monto) as suma
                    from orden
                    where EXTRACT(MONTH from fecha) = $1 AND EXTRACT(YEAR from fecha)=$2;`,[month,year]),
            //Entrega el número de clientes totales
            t.one(` select
                    sum(n1.cuenta)
                    from
                    (
                        select count(cantidad) as cuenta
                        from orden
                        where EXTRACT(MONTH from fecha) = $1 AND EXTRACT(YEAR from fecha) = $2
                        group by token
                    ) n1;`,[month,year]),
            //Entrega los productos más vendidos de mayor a menor
            t.any(` select 
                        producto,
                        sum(cantidad) as cantidad
                    from orden
                    where EXTRACT(MONTH from fecha) = $1 AND EXTRACT(YEAR from fecha) = $2
                    group by producto
                    order by 2 DESC;`,[month,year])
        ]).catch(err=>{
            console.log('error en locatarioController en db.task!: '+err)
            return 0
        })
    })
}