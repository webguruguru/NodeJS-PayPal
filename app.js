
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = module.exports = express.createServer();

try {
  var configJSON = fs.readFileSync(__dirname + "/config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}
routes.init(config);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session({key: 'some-key',
    secret: 'some-We1rD sEEEEEcret!'}));
  app.use(app.router);
  //app.use(express.static(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

