define(["../modules/mediator"], function (mediator){
	
	var facade = facade || {};

	facade.subscribe =  function (channel, callback) {
		mediator.subscribe(channel, callback);
	}

	facade.publish =  function (channel){
		mediator.publish(channel);
	}

	return facade;

});