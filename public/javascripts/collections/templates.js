define(['jquery','underscore','backbone',
	'models/template'],
	function ($,_,Backbone,Template){
		var ProjectCollection  = Backbone.Collection.extend({
			url : 'templates',
			model : Template
		});

		return ProjectCollection;
	})