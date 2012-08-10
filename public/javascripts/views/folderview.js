define(['jquery','underscore','backbone',
	'text!../../templates/folder.html',
	'views/fileview'], 
	function ($,_,Backbone,textTemplate,FileItem){

		var FolderItem = Backbone.View.extend({
			closed : true,
			tagName : 'li',
			template : _.template(textTemplate),
			events : {
				'click .folder' : 'folderClicked',
				"click .icon" : "folderClicked"
			},
			initialize : function () {

			},
			render : function () {
				var html = this.template({folder : this.model.folder});
				$(this.el).html(html);
				var self = this;
				_.each(this.model.items, function (item){
					self.$("#files").append(item);
				});
				return this;
			},
			folderClicked : function (){
				window.ff = this;
				this.toggle();
			},
			toggle : function (){
				this.closed = !this.closed;
				if(this.closed){
					this.$(".icon").removeClass("icon-folder-close").addClass("icon-folder-open");
					this.$("#files").show();
				}else {
					this.$(".icon").removeClass("icon-folder-open").addClass("icon-folder-close");
					this.$("#files").hide();
				}
			}

		});
		return FolderItem;
	})