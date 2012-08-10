define(['jquery','underscore','backbone',
	'models/project'],
	function ($,_,Backbone,Project){
		var ProjectCollection  = Backbone.Collection.extend({
			url : 'project',
			model : Project
		});

		return ProjectCollection;
	})