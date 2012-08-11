define(['jquery','underscore','backbone',
	'../modules/mediator'],
	function($,_,Backbone,mediator){

		var Notifier =  Backbone.View.extend({
			
			initialize : function (){
				mediator.subscribe("notify",this.showNotification)
			},
			clear : function (){
				// remove all the classes and the content
				
			},
			showNotification : function (data){
				console.log(data)
				var status = data["status"] || "info";
				var classes = ["alert"];
				switch (status){
					case "error":
						classes.push("alert-error")
					break;
					case "success":
						classes.push("alert-success")
					break;
					case "warn":
						classes.push("alert-warn")
					break;
					default:
						classes.push("alert-info")
					break;
				};
				var cssClasses  = classes.join(" ");
				console.log(cssClasses)
				var el  = $("#notification")
				el.removeClass().html("")
				el.addClass(cssClasses).html(data["message"]);

			}
		});

		return Notifier;

});