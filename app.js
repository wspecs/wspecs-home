// Main file file of the application
// Make use of other library to start the application


// Exernal node module
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./data/handler');
var livereload = require('livereload');

// Application variables
// @port: where the application is running
// @apth: sub_url for where the application migth run
// @base: full http path for the application.
var port = 7272;
var path = ''; // '/sub_url'
var base = 'http://localhost'  + ':' + port + path + '/';
if (process.argv[2] && process.argv[2] === 'prod'){
	base = 'http://servone.wspecs.com' + path + '/';
}

// Set the public path fo the application
app.use(path, express.static(__dirname + '/www'));
app.use(path, express.static(__dirname + '/static'));
// Set the view path for ejs render
app.set('views',  __dirname + '/www/views');

// Initialize body parser for POST methods
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the application by using a RESTful api
require('./lib/REST')(app, path, port, db, {
	base : base,
  title : "Wspecs | Home",
  description : "Description Goes Here",
  image : base + 'img/preview.jpg',
  serv: "http://servone.wspecs.com/wapp/app"
});

// Allow live reload in server
// Be sure to install the extension for your web-browser
// Use during development
var reloadServer = livereload.createServer();
reloadServer.config.exts.push("ejs");
reloadServer.watch(__dirname + '/www'); 
