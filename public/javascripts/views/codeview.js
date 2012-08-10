define(['jquery','underscore','backbone','codemirror',
	'../modules/mediator','beautify'], 
	function ($,_,Backbone,CodeMirror,mediator,beautify){
		var CodeView = Backbone.View.extend({
			el : $("#templateTA"),
			editor  : null,
			file : '',
			initialize : function () {
				
				var config  = {
			 		theme: 'default',
		        	lineNumbers: true
			 	};
			 	this.editor = CodeMirror.fromTextArea(this.el, config);
			 	this.editor.focus();
		    	this.editor.setSelection({ line: 0, ch: 0 }, { line: 0, ch: 23 });
		    	//this.editor.setValue("var a = 'Hello World'")
				
				var self = this;
				mediator.subscribe("fileRecieved", function (data){
					self.file = data;
					self.displayCode();
				});

				mediator.subscribe("initSaveFile", function (){
					self.saveFile();
				});

				mediator.subscribe("initRunFile", function(){
					self.runFile();
				});
			},
			displayCode : function (){
				var clean_code = beautify(this.file.content);
				this.editor.setValue(clean_code);
				mediator.publish("fileOpenedInView",this.file);

			},
			saveFile : function (){
				//todo: enable CTRL + S for file saving
				var currentCode = this.editor.getValue();
				mediator.publish("pushFileToSave", currentCode);
			},
			runFile : function () {
				var currentCode =  this.editor.getValue();
				mediator.publish("pushFileToRun", currentCode);
			}
		});

		return CodeView;
});