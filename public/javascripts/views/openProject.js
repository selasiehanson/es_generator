define(['jquery','underscore','Backbone',
	'text!../../templates/open_project.html',
	'collections/projects',
	'../modules/mediator'],
	function($,_,Backbone, textTemplate,Projects,mediator){

		var OpenProjectView  = Backbone.View.extend({
			el : 'body',
			form : "#open_project_form",
			template : _.template(textTemplate),
			events : {
				'click #btn_project_open' : 'openProject'
			},
			initialize : function (){
				var self =  this;
				var projects =  new Projects();
				projects.fetch({
					success : function (){
						$(self.form).remove(); //test at this again
						var data  = projects.toJSON();
						var html  = self.template({data : data});
						self.$el.append(html);
						self.form = $(self.form);
						self.input = self.form.find("#projectName");
					}
				});
				
				mediator.subscribe("initOpenProject", function(context){
					self.render();
				});

				mediator.subscribe("projectOpeningFinished",function (){
					self.form.modal('hide');
				});
			},
			render : function () {
				this.form.modal('show');
			},
			hide : function (context){
				
			},
			openProject : function (){
				var projectName = this.input.val()
				mediator.publish("openProject",projectName, true);
			}



		});

		return OpenProjectView;
});