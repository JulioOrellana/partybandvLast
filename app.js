'use strict'
/**
 * Module dependencies.
 */

const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , db = require('./config');

const app = express();
const userController = require('./controllers/usuarioController')
const barraController = require('./controllers/barraController')

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use( function(req, res, next){
    app.locals.pretty = true
    next()
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req,res) {
  res.render("default");
});

app.get('/fluid', function(req,res) { res.render("layouts/fluid")});
app.get('/hero', function(req,res) { res.render("layouts/hero")});
app.get('/barra', function(req,res) {

  barraController.getAllDrinks()
                                .then(
                                      drinks =>{
                                          res.render('layouts/barra',{data:drinks})
                                        });

  //res.render('layouts/barra',{data:[{"nombre":"Juan"},{"nombre":"Juanita"},{"nombre":"Lucho"}]});
});
app.get('/narrow', function(req,res) { res.render("layouts/marketing-narrow")});
app.get('/signin', function(req,res) { res.render("layouts/signin")});
app.get('/starter', function(req,res) { res.render("layouts/starter-template")});
app.get('/sticky', function(req,res) { res.render("layouts/sticky-footer")});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
