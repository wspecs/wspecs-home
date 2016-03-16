var SERVER_PORT = 7777;
var APP_HOST = "http://servone.wspecs.com:" + SERVER_PORT;
var LIVE_HOST1 = "http://servone.wspecs.com";
var LIVE_HOST2 = "";
var REMOVE_SERVER = "http://servone.wspecs.com/admin/";
var DESTINATION = "www";
var PUBLIC = "public";
var SOURCE = "src";
var NODE = "node";
var LIB = "lib";
var TEST = "test";
var DEV = {
  css: 'style.min.css',
  js: 'app.min.js',
  template: 'dev.ejs'
};
var PROD = {
  css: 'wapp.min.css',
  js: 'wapp.min.js',
  template: 'wapp.ejs'
};

module.exports = {
  SERVER_PORT : SERVER_PORT,
  APP_HOST : APP_HOST,
  LIVE_HOST : [LIVE_HOST1, APP_HOST, LIVE_HOST2],
  REMOVE_SERVER : REMOVE_SERVER,
  DESTINATION : DESTINATION,
  SOURCE : SOURCE,
  NODE : NODE,
  PUBLIC : PUBLIC,
  LIB : LIB,
  TEST : TEST,
  DEV: DEV,
  PROD: PROD
};
