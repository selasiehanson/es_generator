var fs =  require('fs');


exports.index = function(req, res){
  res.render('index.html', { title: 'Express' })
};

exports.saveScript = function(req, res){
	// todo : check for extension
	var name = req.body.name + '.js';
	var content = req.body.content;
	fs.writeFile("generated/"+ name, content, function (err) {
		if (err) throw err;

		console.log('It\'s saved!');
		res.send({success : true, message : 'file created successfully' , data:[]});		
	});
}

function getFiles(dir){
	fs.readdir(dir, function (err, files){
		console.log("File for " + dir);
		console.log(files);
	});
}

exports.getTemplate  = function (req,res){

	var file = req.query.file;
	var folder = req.query.folder;

	if(file && folder){
		fs.readFile("templates/"+ folder+"/"+ file, 'utf8', function(err, data){
			if(err)
				console.log(err);
			res.send({success : true, message : 'File -> ' + file + ' sent.' , data:data});		
		});
	}
	//res.send({success : true, message : 'no filename was given' , data:''});
}

exports.getTemplates =  function (req,res){
	var output = {};
	templatesFolder = "templates/"
	var folders = fs.readdirSync(templatesFolder);
	folders.forEach(function (folder){
		files = fs.readdirSync(templatesFolder + folder);
		output[folder] = files;
	});

	res.send({
		templates : output
	});
}

