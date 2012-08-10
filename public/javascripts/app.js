// require(["text!../html/somescript.html"],function (html){
// 	console.log(html);
// });


require.config({
  paths: {
    jquery : "jquery",
	'ext-core' : 'ext-core',
	underscore : 'underscore',
	codemirror : 'lib/codemirror',
	beautify : 'beautify',
	javascript :'mode/javascript/javascript',
	script : 'script',
	backbone : 'backbone',
	'bootstrap-transition' : 'assets/js/bootstrap-transition',
	'bootstrap-alert' : 'assets/js/bootstrap-alert',
	'bootstrap-modal' : 'assets/js/bootstrap-modal',
	'bootstrap-dropdown' : 'assets/js/bootstrap-dropdown',
	'bootstrap-scrollspy' : 'assets/js/bootstrap-scrollspy',
	'bootstrap-tab' : 'assets/js/bootstrap-tab',
	'bootstrap-tooltip' : 'assets/js/bootstrap-tooltip',
	'bootstrap-popover' : 'assets/js/bootstrap-popover',
	'bootstrap-button' : 'assets/js/bootstrap-button',
	'bootstrap-collapse' : 'assets/js/bootstrap-collapse',
	'bootstrap-carousel' : 'assets/js/bootstrap-carousel',
	'bootstrap-typeahead' : 'assets/js/bootstrap-typeahead',
  },
  baseUrl : 'javascripts'

});

require([
	
	'jquery',
	'ext-core',
	'underscore',
	'codemirror',
	'beautify',
	'javascript',
	'script',
	'backbone',
	'bootstrap-transition' ,
	'bootstrap-alert',
	'bootstrap-modal',
	'bootstrap-dropdown',
	'bootstrap-scrollspy',
	'bootstrap-tab',
	'bootstrap-tooltip',
	'bootstrap-popover',
	'bootstrap-button',
	'bootstrap-collapse',
	'bootstrap-carousel',
	'bootstrap-typeahead'], 
	function (){
		$(function (){
			require(["views/app","router"], function (AppView,Router){
				var appview  = new AppView;
				var router = new Router;
			});	
		});
});