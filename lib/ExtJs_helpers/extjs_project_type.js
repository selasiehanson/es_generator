var fs =  require("fs");
var walk = require("walk");
var util = require('util');
var extjs_project_type  = {}

var eeps = extjs_project_type;
eeps.ds = {
	app : "/app"
}

eeps.ds["model"] = eeps.ds.app+"/model"
eeps.ds["store"] = eeps.ds.app+"/store"
eeps.ds["view"] = eeps.ds.app+"/view"
eeps.ds["controller"] = eeps.ds.app+"/controller"


//Todo Add the app.js file to the structure
eeps.createStructure =  function (outDir,callback) {
	for(var i in eeps.ds)	{
		fs.mkdirSync(outDir + eeps.ds[i]);
	}
	if(callback)
		callback();			
}

eeps.getContent =  function (directory, callback){
	var output = {};
	var files =  fs.readdirSync(directory+"/" +"input");
	output["input"]=  files;
	var content = fs.readdirSync(directory+"/" +"output/Extjs");
	output["output"] = content;
}

eeps.traverse =  function (startingPath){
	var content = fs.readdirSync(startingPath);
	
	content.forEach(function (n){
		var stats = fs.statSync(startingPath + "/" + n);
	});
	//check if path is file or directory
  	////if read contents of of the path
  	/////for each or the contents do the same thing again until u r done 
  	////output should be a tree
}

eeps.processContent =  function (content){
	var output = []
	var out = [];
	
	content.forEach(function (file){
		var x = file.split("/");
		var key = x[0];
		var _out = {};
		_out[key] = {}
		eeps.processIntoObjects(x,0,_out[key]);
		out.push(_out);
	});
	return out;

}

/**str =  string array
***pos  =  starting position
*** out = output object
***/
eeps.processIntoObjects =  function (str,pos,out){
  	var temp ;
  	var re = /\.js*$/;
  	var newPos =  pos + 1
  	if (str[pos] && str[newPos]) {
	    if(!re.test(str[newPos])){
	     	out[str[newPos]] = {}
	     	eeps.processIntoObjects(str,newPos,out[str[newPos]]);
	    }else {
	    	eeps.processIntoObjects(str,newPos,out);
	    }
	   
	}else {
		if (re.test(str[pos])){
			if(!out["files"]){
	  			out["files"] = []
	  		}
	  		out["files"].push(str[pos]);
	   }else{
	   	temp =  {}
	   	temp[str[pos]] = {}
	   	out = temp
	   }
	}
  	
}

eeps.recurseObject =  function (arr){
	var out = {};	
	arr.forEach(function (item){
		eeps.processTree(out,item)
	});
	return out;
}

eeps.processTree = function (out,obj){
	if (!util.isArray(obj)){
		for (var i in obj){
			if(out[i]=== undefined){
				out[i] = obj[i];
			}else {
				//keep traversing the obj
				var temp = out[i];
				eeps.processTree(out[i],obj[i]);		
			}
		}
	} else { 
		out.push(obj[0])
	}	
	
	return out;
}

//todo: move this method to helpers instead
eeps.getKeys =  function (obj){
	var arr = []
	for (var i in obj){
		arr.push (i)
	}
	return arr;
}


module.exports = extjs_project_type;