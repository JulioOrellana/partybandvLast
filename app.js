'use strict'
/**
 * Module dependencies.
 */

const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , barraRoute = require('./routes/barra')
  , http = require('http')
  , path = require('path')
  , db = require('./config')
  , bodyParser = require('body-parser');



const app = express();

// CONTROLADORES

const userController = require('./controllers/usuarioController')
const barraController = require('./controllers/barraController')



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.render("default");
});

// ROUTES

app.use('/barra',barraRoute);


app.get('/fluid', function(req,res) { res.render("layouts/fluid")});
app.get('/hero', function(req,res) { res.render("layouts/hero")});
app.get('/narrow', function(req,res) { res.render("layouts/marketing-narrow")});
app.get('/signin', function(req,res) { res.render("layouts/signin")});
app.get('/starter', function(req,res) { res.render("layouts/starter-template")});
app.get('/sticky', function(req,res) { res.render("layouts/sticky-footer")});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
