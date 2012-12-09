define(['jquery','underscore','backbone',
	'text!../../templates/create_project.html',
	'models/project',
	"views/solution_pane","../modules/mediator"], 
	function ($,_,Backbone,textTemplate, Project,SolutionPane,mediator){

	var ProjectView = Backbone.View.extend({
		el : "body" ,
		form : "#myModal",
		template : _.template(textTemplate),
		events : {
			'click #btn_project_create' : 'createProject'
		},
		initialize : function (){
			this.$el.append(this.template());
			this.opened = false;
			this.input = $("#projectName");
			this.projectType = $("#projectType");
			var self =  this;
			self.form = $(self.form);
			
			mediator.subscribe("initNewProject", function(){
				self.render();
			})

			mediator.subscribe("projectOpeningFinished",function (){
				console.log("project opening finished")
				//if(self.opened){
					self.form.modal('hide');	
					//self.opened = false;
				//}
			})
		},
		render : function (){
			this.form.modal("show");
		},
		closeView : function () {
			
		},
		createProject : function (){
			var self = this;
			var input = this.input;
			var data = {
				title : input.val(),
				projectType : this.projectType.val()
			}
			var project = new Project(data);
			if(project.isValid()){
				project.save({},{
					success : function (model, res){
						if(res.success){
							input.val("");
							mediator.publish("openProject",res.data[0]["projectName"])
							self.opened = true;
						}else {
							var info = {message : res.message, status : "error"}
							mediator.publish("app_notify", info);
						}
					}
				});		
			}else {
				//send notification here
			}
		}
	}); 

	return ProjectView; 
});