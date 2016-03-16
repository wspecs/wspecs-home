(function () {
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var db = require('./data/handler');
  var livereload = require('livereload');

  var port = 7302;
  var url = {
    dev: 'http://servone.wspecs.com',
    prod: 'http://wspecs.com'
  };
  var api = {
    dev: "http://servone.wspecs.com:7128/wapp/app",
    prod: "https://servone.wspecs.com/wapp/app"
  };


  if (!process.argv[2] || process.argv[2] !== 'prod') {
    port += 1;
  }

  var path = ''; // '/sub_url'
  var base = url.dev  + ':' + port + path + '/';
  var servUrl = api.dev;
  if (process.argv[2] && process.argv[2] === 'prod'){
    base = url.prod + path + '/';
    servUrl = api.prod;
    require('./lib/reload')('wspecs-home', base);
  }

  require('./lib/frontend-config')(app, express, bodyParser, path);
  require('./lib/REST')(app, path, port, db, {
    base : base,
    title : "Wspecs | Home",
    description : "Wspecs home page",
    image : base + 'img/preview.jpg',
    servUrl: servUrl
  });

  // Allow live reload in server
  // Be sure to install the extension for your web-browser
  // Use during development

  if (process.argv[2] && process.argv[2] !== "dev") {
    var reloadServer = livereload.createServer();
    reloadServer.config.exts.push("ejs");
    reloadServer.watch(__dirname + '/www'); 
  }
})();
