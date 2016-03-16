// Restful API for the applicaiton 
// Handle all GET and POST request

module.exports = function(app, path, port, db, config){
  // Default page
  app.get(path + '/', function(req, res){
    res.render('wapp.ejs', config);
  });

  app.get(path + '/dev', function(req, res){
    res.render('dev.ejs', config);
  });


  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at %s', config.base);
    console.log('Port:', port);
    console.log('Host:', host);
  });
};
