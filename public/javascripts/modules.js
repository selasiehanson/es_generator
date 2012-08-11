define(['modules/facade','views/createFile',
	'views/fileview',
	'views/folderview',
	'views/createProject',
	'views/openProject',
	"views/solution_pane",
	'views/codeview',
	"models/file",
	'modules/mediator',
	'modules/settings',
	'modules/helper',
	'generators/ExtGenerator'], 
	function (facade,FileView,FileItem,FolderItem,ProjectView,OpenProjectView,SolutionPane, CodeView,File,mediator,settings,helper,_gen){
		//this.openProjectView = new OpenProjectView;
		var self = this;

		facade.subscribe("app_init", function (context){
			var info = {message : "Appplication started successfully", status : 'success'}
			mediator.publish("app_notify",info);
		});

		facade.subscribe("app_init", function (context){
			context.codeView = new CodeView;
		});

		facade.subscribe("initCreateFile", function (context, obj){
			console.log("Create File called");
			var fileView =  new FileView({
					path: 'input',
					type : 'model'
			});
		});

		facade.subscribe("initNewProject",function (context){
			var projectView =  new ProjectView;
		})
		

		// facade.subscribe("initOpenProject", function(context){
		// 	//var openProjectView =  new OpenProjectView;
		// 	//self.openProjectView.show();
		// });

		facade.subscribe("openProject", function (projectName){
			$.ajax({
				url : 'project',
				data : {
					name : projectName
				},
				dataType : 'json',
				type : 'get',
				success : function (res){
					mediator.publish("projectOpening", res.data[0]);
					var info = {message : data["message"], status : "success" };
					mediator.publish("app_notify", info);
				}
			});
		});


		facade.subscribe("projectOpening", function (data){
			//resolve paths here
			var info = {message : "Attempting to open project" };
			mediator.publish("app_notify", info);
			settings.solutionOpened = true;
			settings.path = settings.currentProject = data.projectName;
			var out = {
				projectName : settings.currentProject,
				folders : {}
			};
			
			var html;
			var model;
			var content = [];
			var _counter = 0;
			var result = processDirs(content,data.folders,_counter);
			window.result = result;
			window.content = content
			window.datax = data
			// path : settings.currentProject + "/" + folderName + "/" + file
	
			out["dirs"] = content;
			mediator.publish("projectOpeningFinished", out);
		});

		facade.subscribe("projectOpeningFinished",function(data){
			console.log("project opening finished")
			var message = data["projectName"] +" Opened successfully."
			var info = {message : message, status : "success" };
			mediator.publish("app_notify", info);
		})

		var processDirs = function(out,objectMap,counter,path) {
			var _out  = "";
			var _path = path  || "";
		    var prop, x;
		    for (prop in objectMap) {
		        if (!_.isArray(objectMap[prop])) {
		        	var parent;
		        	counter++;
		        	var newPath  = _path +"/" +prop ;
		        	var items = processDirs(out,objectMap[prop],counter,newPath);
		        	counter--;
			        
			        if(!items)
			        	items = [];
			        if(!_.isArray(items))
			        	items = [items];

			        var folder = {folder : prop, items : items}
			        var fd = new FolderItem({model : folder});
			        var res = fd.render();
			        _out += res.$el.html()
			    
			    } else {
		          	_out = [];
		        	for (x in objectMap[prop]) {
		        		var fileName = objectMap[prop][x];
		        		var filePath  = settings.currentProject + "/" + _path + "/" + fileName;
		            	var file = {name : fileName, path : filePath};
		            	var f = new FileItem({model : file});
		            	_out.push(f.render()); 
		          	}
		        }
		        if(counter ===0){
			    	out.push(_out)
			    	_out = "";
			    }
		    }

	      	return _out;
	    };

		facade.subscribe("createFile",function (context){
			//make sure project has been opened first
			//settings.solutionOpened
			fileName = context.input.val();
			var path = settings.resolvePaths(context.filePath) +'/' +fileName + ".js";
			
			//var_path = setting.fixFilePaths(settings.currentProject + path + )
			var file = new File({
				project : settings.currentProject,
				path : path ,
				name : fileName
			});
			
			file.save({},{
				success : function (model , res){
					mediator.publish("fileCreated",res); 
					mediator.publish("openProject", res.data[0]["projectName"]);
					context.form.modal('hide');
				}
			});
		});

		facade.subscribe("fileCreated",function (data){
			console.log("file details obtained");
		});


		facade.subscribe("fileRecieved", function (file){
			settings.currentFile =  file;
		});

		facade.subscribe("fileOpenedInView", function (file){
			settings.currentFile = file;
		});

		facade.subscribe("initFileSave", function (){

		});

		facade.subscribe("pushFileToSave", function (code){
			
			if(settings.solutionOpened ){
				if(!_.isEmpty(settings.currentFile)){
					var currentFile =  settings.currentFile
					currentFile.content = code;

					var file = new File({
						project : settings.currentProject,
						path :currentFile.path,
						name : currentFile.name,
						content : currentFile.content,
						mode : 'update'
					});
					
					file.save({}, {
						success: function (response){
							console.log(response);
						}
					});
				} else {
					var info = {message : "No file Opened", status : "error"}
					mediator.publish("app_notify",info);
				}
				
			}else {
				var info = {message : "There is no solution currently opened", status : "error" }
				mediator.publish("app_notify",info);
			}
		});


		facade.subscribe('pushFileToRun', function (code){
			//todo
			//get the config file
			var attr = {
				path : settings.currentProject + "/input/config.js" 
			}

			$.get('/file',attr,function(res){
				console.log(res)
				if (!res.success){
					var info = {message : "File not found" , status : "error"}
					mediator.publish("app_notify",info);
				}else {
					var configuration = res["data"][0];
					if( _gen.init(code,configuration)){
						_gen.process();
						_gen.saveCode();			
					}
				}
			});
			
		});

		facade.subscribe("app_notify", function (packet){
			mediator.publish("notify",packet);
		});
});