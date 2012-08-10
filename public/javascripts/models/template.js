define(['backbone'],function (Backbone){
	var Template = Backbone.Model.extend({
		url : 'template',
		validate : function (attrs){
			if(!attrs.title){
				error = "A title is required";
				console.log(error);
				return error;
			}
				
		}
	});

	return Template;
});