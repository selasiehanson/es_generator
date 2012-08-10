define(['jquery','underscore','backbone',
	'text!../../templates/solution_pane.html',
	'views/folderview',
	'../modules/mediator'
	], 
	function ($,_, Backbone,textTemplate,FolderItem,mediator){
		var SolutionPane = Backbone.View.extend({
			el : $("#solution_pane"),
			
			template: _.template(textTemplate),
			initialize : function (){
				var self =  this;
				mediator.subscribe("projectOpeningFinished", function (data){
					self.display(data);
				});
			},

			render : function (){
				this.$el.empty();
				
				$(this.el).html(this.template({projectName : this.model.projectName}));
				var dirs =  this.model.dirs;
				_.each(dirs, function (item){
					this.$("#folders").append(item);
				});
				
			},

			display : function (data){
				this.model = data;
				//console.log(this.model);
				this.render();
			}
		});

		return SolutionPane;

});