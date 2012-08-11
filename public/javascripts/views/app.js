define(["jquery",'underscore','backbone',
		'views/filemenu',
		'views/solution_pane',
		'views/template_pane',
		'views/openProject',
		'../modules/mediator','modules'], 
	function ($,_,Backbone,FileMenuView,SolutionPane,TemplatePane,OpenProjectView,mediator){
		
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
				this.openProjectView = new OpenProjectView;
				this.solutionPane =  new SolutionPane;
				this.templatePane = new TemplatePane;
				mediator.publish("app_init",this);

				$('.tooltip-demo.well').tooltip({
			      selector: "a[rel=tooltip]"
			    })
			}
		});
	
		return AppView;
	});