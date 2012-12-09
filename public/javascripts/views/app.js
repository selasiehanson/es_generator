define(["jquery",'underscore','backbone',
		'views/filemenu',
		'views/notifier',
		'views/solution_pane',
		'views/template_pane',
		'views/createProject',
		'views/openProject',
		'../modules/mediator','modules'], 
	function ($,_,Backbone,FileMenuView,Notifier,SolutionPane,TemplatePane,ProjectView,OpenProjectView,mediator){
		
		// var AppView = function (){};
		var AppView = Backbone.View.extend({
			el: $("#project_menu"),
			events: {
		    	  	
		    },
		    fileMenu : null,
		    codeView : null,
		    solutionPane : null,
		    openProjectView : null,
			initialize : function (){
				
				this.fileMenu = new FileMenuView;
				this.notifier =  new Notifier;
				this.openProjectView = new OpenProjectView;
				this.createProjectView =  new ProjectView;
				this.solutionPane =  new SolutionPane;
				this.templatePane = new TemplatePane;
				mediator.publish("app_init",this);
			}
		});
	
		return AppView;
	});