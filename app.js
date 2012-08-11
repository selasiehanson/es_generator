/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var projectRoute = require('./routes/project');
var app = module.exports = express.createServer();



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

//Project
app.post('/project', projectRoute.createProject);
app.get('/project/:name?', projectRoute.getProject);
app.post('/project', projectRoute.updateProject);
//app.post('/createProject', routes.createProject);

app.post('/file',projectRoute.createFile);
app.get('/file',projectRoute.getFile);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);