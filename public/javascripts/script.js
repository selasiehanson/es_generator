define(["jquery",'underscore',"beautify"], function ($,_,beautify){
	(function (){
	var data = {name : 'hanson'};
	var d = [
				{name :'First Name'},
				{name : 'Last Name'},
				{name :'Age'}
	];

	var st2 = 	"<% _.each(items, function( n ) { %>  { name : '<%= n.name %>' , fieldLabel : '<%=n.name %>' }, <% }); %>";
	var func = _.template(st2);
	var result = func({items : d });

	// console.log(result);
	 
	// $.get('/template',
	// 	{
	// 		file:'create_form.js',
	// 		folder : 'ExtJs'
	// 	}, 
	// 	function (res){ 
	// 		var str = res.data ;
	// 		//console.log(str);
	// 		//str = js_beautify(str)
	// 		// var buildForm = _.template(str);
	// 		// var output = window.output = buildForm({
	// 		// 	title : 'Sample Form',
	// 		// 	items : result, 
	// 		// 	url : "'somefile.php'" 
	// 		// });
	// 		// output = beautify(output);
	// 		// console.log(output);
	// 	}
	// );

	// window.doMagic = function(data){
	// 	$.get('/template',
	// 		data, 
	// 			function (res){ 
	// 				var str = res.data ;
	// 				var fields = ["'name'", "'age'"];
	// 				var buildForm = _.template(str);
					
	// 				var iconsPath ="some folder name";
	// 				var model = {
	// 						entityName : "User",
	// 						fields : fields
	// 				}
	// 				var store = {
	// 					storeName : "Users",
	// 					entityName : "User"
	// 				}

	// 				var editView = {
	// 					viewName : "User",
	// 					alias : 'user',
	// 					name : 'User',
	// 					items : []
	// 				}

	// 				var gridView = {
	// 					name : 'User',
	// 					storeName : 'Users',
	// 					alias : 'user',
	// 					iconsPath : iconsPath
	// 				}
	// 				var output = window.output = buildForm(gridView);
	// 				output = beautify(output);
	// 				console.log(output);
	// 			}
	// 	);
	// }
  
})();
})