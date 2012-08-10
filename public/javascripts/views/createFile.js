define(['jquery','underscore','backbone',
	"text!../../templates/new_file.html",
	'../modules/mediator'],
	function ($,_,Backbone,textTemplate,mediator){
		var FileView =  Backbone.View.extend({
			el : 'body',
			form : '#newFileForm',
			events : {
				'click #btn_file_create' : 'createFile'
			},
			template : _.template(textTemplate),
			initialize : function (){
				this.filePath = this.options.path;
				this.type = this.options.type;
				str = "";
				switch (this.type){
					case 'model':
						str = "Create Model";
					break;
					case 'template':
						str = "Create Template";
					break;
				}
				var html =  this.template({title : str});
				$(this.form).remove();
				window.el = this.$el;
				this.$el.append(html);
				this.form  = $(this.form);
				this.input = this.form.find('#fileName');
				this.render();
			},
			render : function (){
				this.form.modal();
			},
			createFile : function (){
				mediator.publish("createFile",this);
			}
		});

		return FileView;
	});