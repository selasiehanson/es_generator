define(['jquery','underscore','backbone',
	'text!../../templates/file.html',
	"models/file",'../modules/mediator'], 
	function ($,_,Backbone,textTemplate, File, mediator){
		var FileItem = Backbone.View.extend({
			tagName : 'li',
			template : _.template(textTemplate),
			events : {
				"click .file" : "fileClicked"
			},
			initialize : function () {

			},
			render : function (){
				//console.log(this.model)
				$(this.el).html(this.template({ file : this.model}));
				//$(this.el).addClass("file closed");
				return $(this.el);
			},
			fileClicked : function (){
				alert("")
				var f  = new File(this.model);
				var attr = f.attributes;
				
				$(".cust-tree").find(".active").removeClass("active");
				this.$el.addClass("active");

				$.get('/file',attr,function(res){
					
					attr = _.extend(attr,{content : res.data[0]})
					mediator.publish("fileRecieved",attr);
				});
			}
		});
		return FileItem;
	})