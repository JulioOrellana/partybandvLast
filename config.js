'use strict'
let express = require('express')
let promise = require('bluebird');
let options = {
    // Initialization Options
    promiseLib: promise
};
let pgp = require('pg-promise')(options);
let connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'pb',
    user: 'postgres',
    password: ''
};
let db = pgp(connectionString);

module.exports = db;
