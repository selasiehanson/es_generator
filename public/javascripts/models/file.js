define(['backbone'],function (Backbone){
	var File = Backbone.Model.extend({
		url : 'file',
		defaults: {
			content : '',
			mode : 'new'
		},
		validate : function (attrs){
			if(!attrs.name){
				error = "A name is required";
				console.log(error);
				return error;
			}

			if(!attrs.path){
				error = "A path is required";
				console.log(error);
				return error;
			}
				
		}
	});

	return File;
});