
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var cons    = require('consolidate');

var app = express();

var projectdb = require('./projectdb').ProjectDB;
var db        = new projectdb('localhost', 27017);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('html', cons.swig);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/project/:name?', routes.project);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port %d on mode %s",
      app.get('port'), app.settings.env);
});
