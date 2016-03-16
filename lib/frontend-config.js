(function() {
  module.exports = function(app, express, bodyParser, path) {
    // Set the public path fo the application
    app.use(path, express.static(__dirname + '/../www', { maxAge: 31557600000 }));
    app.use(path, express.static(__dirname + '/../static', { maxAge: 31557600000 }));
    app.use(function(req, res, next) {
      res.setHeader('Date', new Date().toString());
      next();
    });
    // Set the view path for ejs render
    app.set('views',  __dirname + '/../www/views');

    // Initialize body parser for POST methods
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  };
})();

