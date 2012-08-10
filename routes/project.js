var fs = require('fs');
var path = require('path');
//var projectFolder = path.resolve("", "./projects/"); 
var projectFolder = "./projects/" ;
var _projectExt = require("../lib/ExtJs_helpers/extjs_project_type");
var filewalker = require('filewalker');

var predefinedFiles = [
	{
		file : "config.js",
		definition : " { namespace : 'App' , applicationName : 'Sample App'}"
	},
	{
		file : "build.js",
		definition : "{ newFiles : [], builtFiles : [], excludedFiles : []}"
	}
]


exports.createProject = function (req, res) {
	var title =  req.body.title.trim();
	var type = req.body.projectType.trim();
	var _res = {};
	var message = "";
	success = false;
	var folder =  "";

	folder = projectFolder + "/"+ title ;
	fs.exists(folder,function (exist){
	 	if(exist){
	 		//todo: redefine the rule here so that we can have more than one project type in a 
	 		//in a project
	 		message = "A project with the same name already exists";
	 		res.send({success : success, message : message, data : []});
	 		return;
	 	}
	 	else {
	 		fs.mkdirSync(folder, '0777');
	 		var inputPath = folder + "/input";
	 		fs.mkdirSync(inputPath, "0777");
	 		fs.mkdirSync(folder + "/output","0777");
			
			predefinedFiles.forEach(function (item){
				fs.writeFile(inputPath+"/" + item["file"] , item["definition"]);
			})	 		

			switch(type) {
				case "extjs" :
					var outDir = folder + "/output/Extjs";
	 				fs.mkdirSync(outDir,"0777");
					_projectExt.createStructure(outDir,function(){
						message = "Project Created successfully."
						_res = { success :true, message :message, data :[{
							projectName : title
						}]}	;
						res.send(_res);	
					});
					
				break;
				default :
					message = "A definition for the project type " + type + " does not exist"; 
				 	_res = {success: success, message : message, data : []};
				 	res.send(_res);
				break;
				
			}
		}	
	});
}

function getFolderContents(folder,callback){
	var output = {};
	var folders =  fs.readdirSync(folder);
	folders.forEach(function (_folder){
		var files = fs.readdirSync(folder + "/" + _folder);
		output[_folder] = files;
	});

	if(callback){
		callback(output);
	}
}

//look through the project folder and return the project that mathches the name that was sent
exports.getProject = function (req, res){
	
	var name = req.query.name;
	if(name){
		//todo: get project with this name
		var folder = projectFolder +"/"+ name.trim();
		fetchProject(folder, function (output){
			message  =  name + " loaded successfully." ; 
			success = true;
			var data = {
				projectName : name,
				folders : output
			}
			res.send({success : success, message : message , data : [data]});
		});	
	}else {
		// get all projects
		fs.readdir(projectFolder,function (err,projects){
			var output = [];
			projects.forEach(function (folder){
				output.push({title : folder});
			})
			res.send(output);
		});
	}
}

exports.updateProject = function (req, res){

}


exports.createFile =  function  (req, res){
	var fileName =  req.body.name.trim();
	var _path =  req.body.path.trim();
	var content = req.body.content.trim();
	var project = req.body.project.trim();
	var mode = req.body.mode.trim();
	var message = "";
	success = false;

	var file =  projectFolder + _path ;
	
	fs.exists(file,function (exist){
	 	if(exist && mode==='new'){
	 		message = "A file with the same name already exists";
	 		res.send({success : success, message : message, data : []});
	 	}
	 	else {
			fs.writeFile(file,content,function (err){
				
				if(!err){
					message = "file successfully created";
					success =  true;
					
					var d = projectFolder + project;
					getFolderContents(d, function (output){
						var data = {
							projectName : project,
							folders : output
						}
						res.send({success : success, message : message , data : [data]});
					});

				}else {
					console.log(err);
				}
			});
	 	}
	});
} 

exports.getFile = function (req, res){
	var file = req.query.path;
	
	if(file){
		var path =projectFolder + file;
		fs.readFile(path, 'utf8', function(err, data){
			if(err)
				res.send({success : false, message : "there was an error", error : err.toString()});
			else
				res.send({success : true, message : 'File -> ' + file + ' sent.' , data:[data]});		
		});
	}else {
		res.send();
	}
}

var fetchProject =  function (projectName, callback) {
	
  	var projectDirectories = [];
  	var projectFiles = [];
  	filewalker(projectName)
    .on('dir', function(dir, s, k) {
      projectDirectories.push(dir)
    })
    .on('file', function(file, s, stats) {
       projectDirectories.push(file)
    })
    .on('error', function(err) {
      console.error(err);
    })
    .on('done', function() {
       	var  out = _projectExt.processContent(projectDirectories);
      	out  =  _projectExt.recurseObject(out);
       	if(callback)
       		callback(out)
    })
  	.walk();
}

exports.test2 = function (req,res) {
	var out;
	var arr = [
		{"input":{}},
		{"output":{}},
		{"output":{}},
		{"output":{}},
		{"output":{"Extjs":{"app":{"controller":{}}}}},
		{"output":{"Extjs":{"app":{"model":{}}}}},
		{"output":{"Extjs":{"app":{"store":{}}}}},
		{"output":{"Extjs":{"app":{"view":{}}}}}
	]

	out  =  _projectExt.recurseObject(arr);
	res.send(out)
}

function processFiles( files){
 var out = [] 
 for(var i=0; i < files.length; i++){
    var x =  files[i].split("/");
    var fileName = x[x.length -1]
    var obj = {}
    console.log(fileName)
  }
}