define(['jquery','underscore','backbone',
	'text!../../templates/template_pane.html',
	'views/folderview',
	'../modules/mediator'
	], 
	function ($,_, Backbone,textTemplate,FolderItem,mediator){
		var TemplatePane = Backbone.View.extend({
			el : $("#templates_pane"),
			
			template: _.template(textTemplate),
			initialize : function () {
				this.render();
			},

			render : function () {
				this.$el.empty();
				$(this.el).html(this.template);
			}
		});

		return TemplatePane;

});