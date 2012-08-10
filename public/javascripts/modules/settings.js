define([],function (){
	var settings =  {
		
		currentProject : '',
		solutionOpened : false,
		currentFile : {},
		path : '',
		resolvePaths : function(_path){
			return this.path + "/"+ _path;
		},
		helpers : {
			fixFilePaths : function (project, folder,file){
				return project + "/" + folder + "/" + file;
			}
		}

	};

	return settings;
})