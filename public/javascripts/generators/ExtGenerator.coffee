define ["jquery", "underscore","modules/helper",'modules/mediator'], ($,_,helper,mediator) ->
	ExtGen = {}
	
	ExtGen.init = (code, configuration) ->
		@outCode = 
			model : ""
			store : ""
			editView : ""
			gridView : ""
			controller : ""

		window.config =  configuration
		if not configuration?
			mediator.publish("app_notify","A configuration file does not exist. Please make sure one exists")
			return

		somevar = (
			try
			  config =  Ext.decode(configuration)  
			catch error
				error 
			)
		
		if not typeof somevar is "object"
			mediator.publish("app_notify",somevar) 

		somevar = (
			try
				raw = Ext.decode (code)	
				
			catch error
				error
			)

		if not typeof somevar is "object"
			mediator.publish("app_notify",somevar) 
		
		
		editViewFields = []
		gridViewFields = []
		modelFields = []
		_fields = []

		result = @verify(raw)
		if not result.success
			mediator.publish("app_notify",result.message)
			return false
		

		result  = @verify(config, "config")
		if not result.success
			mediator.publish("app_notify",result.message)	
			return false

		###
		check out type for specific types such as lookups
		###
		if raw.type
			switch raw.type
			  when "lookup"
			  	raw.fields = ["name", "description"] 

		###
		generate appropriate field and label names
		###
		if raw.fields?
			window.names = names = helper.fixNames(raw.fields)
			_fields = _.map names, (n)->
				"'" + n.field + "'"

			modelFields = _fields
			
			###
			generate form items
			###
			for name of names
				item = 
					xtype : 'textfield'
					fieldLabel : names[name]["label"]
					name : names[name]["field"]
				editViewFields.push Ext.encode(item)

				item = 
					header : names[name]["label"] 
					dataIndex : names[name]["field"] 
					flex :1
				gridViewFields.push Ext.encode (item)
		###
		generate all the fields for the models including references
		###
		
		if raw.has?
			references = helper.fixNames(raw.has)
			for ref of references
				modelFields.push("'" + references[ref]["field"] + "'")

				_name = references[ref]["field"] + "Id"
				modelFields.push("'" + _name + "'")
				
				_label = references[ref]["label"]
				item = 
					xtype : 'combo'
					fieldLabel : _label
					name : _name
					store : raw.entity + 's'
					displayField: 'name'
					valueField: 'id'
					allowBlank : false
				editViewFields.push Ext.encode(item)

				item = 
					header : _label 
					dataIndex : references[ref]["field"]
					flex :1	
				gridViewFields.push Ext.encode (item)

		if config.namespace?
			namespace = config.namespace
		if raw.fields?
			output =
				model :
					namespace : namespace
					entityName : raw.entity
					fields : modelFields
				store :
					namespace : namespace
					storeName : raw.entity + 's'
					entityName : raw.entity
				editView :
					namespace : namespace
					viewName : raw.entity
					alias : raw.entity.toLowerCase()
					name : raw.entity
					items : editViewFields
				gridView :
					namespace : namespace
					name : raw.entity
					storeName : raw.entity + 's'
					alias : raw.entity.toLowerCase(),
					items : gridViewFields
					iconsPath : 'somepath'
				controller :
					namespace : namespace
					name : raw.entity
					entityName : raw.entity
					storeName : raw.entity + 's'
			@mvcs = output
		return true
	ExtGen.verify = (raw, type) ->
		result = 
			message : "",
			success : true
		switch type
			when "config" 
			 	if raw?
			 		if not raw.namespace?
			 			result = 
			 				message : "Invalid configuration file. No namespace found. Please provide one"
			 				success : false
			 				
			 		else if not raw.applicationName?
			 			result =
			 				message : "Invalid configuration file. No Application Name found. Please provide one"
			 				success : false
			 	else 
			 		result = 
			 			message : "Not a valid configuration file"
			 			success : false
			else
				
				if raw?
					if not raw.entity?
						result  = 
							message :	"All model files should have an entity element"
							success : false
				else
					result = 
						message :"Not a valid model file"
						success : false
		result
	ExtGen.process = () ->

		@createModel()
		@createStore()
		@createEditView()
		@createGridView()
		@createController()
		return @
	ExtGen.createModel = () ->
		data =  @mvcs.model
		@getTemplate(
			file : 'model.js'
			folder : 'ExtJs'
		, data,"model")
		return
	ExtGen.createStore = () ->
		data =  @mvcs.store
		@getTemplate(
			file : 'store.js'
			folder : 'ExtJs'
		, data,"store")
		return

	ExtGen.createEditView = () ->
		data =  @mvcs.editView
		@getTemplate(
			file : 'edit.js'
			folder : 'ExtJs'
		, data,"editView")
		return

	ExtGen.createGridView = () ->
		data =  @mvcs.gridView
		@getTemplate(
			file : 'grid.js'
			folder : 'ExtJs'
		, data,"gridView")
		return

	ExtGen.createController = () ->
		data = @mvcs.controller
		@getTemplate(
			file : 'controller.js'
			folder : 'ExtJs'
		, data,"controller")
		return

	ExtGen.templateTize = (src,data,type) ->
		func = _.template(src)
		out = func(data)
			
		switch type
			when "model" then @outCode.model = out
			when "store" then @outCode.store =  out
			when "editView" then @outCode.editView = out
			when "gridView" then @outCode.gridView = out
			when "controller"  then @outCode.controller = out

		console.log @outCode
		# console.log out

	ExtGen.getTemplate = (info, input,type) ->
		
		$.get '/template', info, (res)=>
			@templateTize(res["data"],input,type)
			return
		return
	ExtGen.saveCode = () ->
		console.log @outCode

	return ExtGen;
