// Restful API for the applicaiton 
// Handle all GET and POST request

module.exports = function(app, path, port, db, config){
	// Default page
	app.get(path + '/', function(req, res){
		var values = config;
    require('request').get(config.serv, function(err, response){
      if (!err) {
        values.home = JSON.parse(response.body);
        res.render('index.ejs', values);
      }
    });
	});

	var server = app.listen(port, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Example app listening at %s', config.base);
		console.log('Port:', port);
		console.log('Host:', host);
	});
};
