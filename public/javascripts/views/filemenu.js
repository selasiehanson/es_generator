define(['jquery','underscore','backbone',
	'../modules/mediator'],
	function($,_,Backbone,mediator){

	var FileMenuView = Backbone.View.extend({
		el : $('#fileMenu'),
		events : {
			'click #new_project' : 'newProject',
			'click #open_project' : 'openProject',
			'click #new_model' : 'newModel',
			'click #new_template' : 'newTemplate',
			'click #t_save_file' : 'saveFile',
			'click #t_run_file' : 'runFile',
			'click #t_build_project' : "buildProject",
			//'click #options' :'saveProject'
		},
		initialize : function (){
			//console.log(this);
			$("#t_save_file").click(this.saveFile);
			$("#t_run_file").click(this.runFile);

			$('.mytooltip').tooltip({
				placement : 'bottom'
			});
		},
		render : function () {

		},
		newProject : function (){
			mediator.publish("initNewProject");
		},
		openProject : function (){
			console.log("opening new project");
			mediator.publish('initOpenProject');
		},
		newModel : function (){
			mediator.publish("initCreateFile",this,{path: 'input',type : 'model'});
		},
		newTemplate : function () {
			mediator.publish("initCreateFile",this,{path: 'templates',type : 'template'});
		},
		runFile : function(){
			console.log("running file");
			mediator.publish("initRunFile");
		},
		saveFile : function () {
			console.log("saving file");
			mediator.publish("initSaveFile");
		},
		buildProject : function (){
			console.log("building project")
		},
		saveProject : function (){
			console.log("saving project")
		}
	});

	return FileMenuView;
});