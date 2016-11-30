'use strict'
/**
 * Module dependencies.
 */

const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , db = require('./config')
  , bodyParser = require('body-parser')
  , socketio = require('socket.io')
  , session = require('express-session');



const app = express();
const server = http.createServer(app)
const io = socketio(server)


// CONTROLADORES

const userController = require('./controllers/usuarioController')
const barraController = require('./controllers/barraController')



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options',{
  'layouts':false
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret:'1234',cookie:{}}))

app.get('/', function(req,res) {
  res.render("default");
});

// ROUTES

const barraRoute = require('./routes/barra')(io)
const loginRoute = require('./routes/login')
const locatarioRoute = require('./routes/locatario')

app.use('/barra',barraRoute)
app.use('/login',loginRoute)
app.use('/locatario',locatarioRoute)

app.get('/fluid', function(req,res) { res.render("layouts/fluid")});
app.get('/hero', function(req,res) { res.render("layouts/hero")});
app.get('/narrow', function(req,res) { res.render("layouts/marketing-narrow")});
app.get('/signin', function(req,res) { res.render("layouts/signin")});
app.get('/starter', function(req,res) { res.render("layouts/starter-template")});
app.get('/sticky', function(req,res) { res.render("layouts/sticky-footer")});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
