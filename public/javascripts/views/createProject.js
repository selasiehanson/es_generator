define(['jquery','underscore','backbone','models/project',
	"views/solution_pane","../modules/mediator"], 
	function ($,_,Backbone,Project,SolutionPane,mediator){

	var ProjectView = Backbone.View.extend({
		el : "#myModal" ,

		events : {
			'click #btn_project_create' : 'createProject'
		},
		initialize : function (){
			this.opened = false;
			this.render();
			this.input = $("#projectName");
			this.projectType = $("#projectType");
			var self =  this;
			mediator.subscribe("projectOpeningFinished",function (){
				console.log("project opening finished")
				if(self.opened){
					$(self.el).modal('hide');	
					self.opened = false;
				}
			})
		},
		render : function (){
			$(this.el).modal();
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
							mediator.publish("app_notify", res.message);
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