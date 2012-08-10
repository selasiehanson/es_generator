/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var fs = require("fs");
var projectRoute = require('./routes/project')
var app = module.exports = express.createServer();
var eeps = require("./lib/ExtJs_helpers/extjs_project_type");
var path  =  require("path");

var filewalker = require('filewalker');
var files = []
var directories = []

// var fs = require('fs');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

// walk("./projects", function(err, results) {
//   if (err) throw err;
//   console.log(results);
// });
//Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// disable layout
app.set("view options", {layout: false});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//make a custom html template
app.register('.html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
});

//Routes
app.get('/', routes.index);
app.get('/template', routes.getTemplate);
app.post('/script', routes.saveScript);
app.get('/templates', routes.getTemplates);

app.get("/test",projectRoute.tester);
app.get("/test2",projectRoute.test2)
//Project
app.post('/project', projectRoute.createProject);
app.get('/project/:name?', projectRoute.getProject);
app.post('/project', projectRoute.updateProject);
//app.post('/createProject', routes.createProject);

app.post('/file',projectRoute.createFile);
app.get('/file',projectRoute.getFile);

// someStart();

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);