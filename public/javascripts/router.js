define([
	'jquery','underscore','backbone',
	"models/file",
	'modules/mediator'
	],function ($,_,Backbone,File,mediator){
	var Navigator = Backbone.Router.extend ({
		routes : {
			"file/*path" : "getFile",
			// "*actions" : "somefunc"
		},
		initialize :function (){
			Backbone.history.start();
			console.log("router started")
			return this;
		},
		getFile : function (path){
			//todo: move this functionality to the modules
			var x = path.split("/");
			var fileName = _.last(x);
			var attr = {name : fileName, path : path}
			var f  = new File(attr);
			attr = f.attributes;

			$.get('/file',attr,function(res){
				attr = _.extend(attr,
					{content : res.data[0]
				})
				console.log(attr)
				mediator.publish("fileRecieved",attr);
			});
		}
	});
	return Navigator;
});