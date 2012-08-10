define(['backbone'],function (Backbone){
	var Project = Backbone.Model.extend({
		url : 'project',
		validate : function (attrs){
			if(!attrs.title){
				error = "A title is required";
				console.log(error);
				return error;
			}

			if(!attrs.projectType){
				error = "A project Type is needed";
				console.log(error);
				return error;
			}
				
		}
	});

	return Project;
});