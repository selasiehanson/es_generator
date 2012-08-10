define ["jquery","underscore"], ($,_)->
	helpers = {}
	helpers.fixName = (name) ->
		ins = name.split(" ")
		field = ""
		label = ""
		for x in ins
			firstLetter = ""
			if _i is 0
	  			field += x.toLowerCase()
	  			continue
	  		else
	    		firstLetter += x.charAt(0).toUpperCase()
	    		field += firstLetter + x.substring(1)
			field = $.trim(field)

		for y in ins
		 	
		 	firstLetter = y.charAt(0).toUpperCase()
		 	label  += firstLetter + y.substring(1) + " "
		 	
		
		out = 
		 	label : $.trim(label)
		 	field : field
		return out

	helpers.fixNames = (fields) ->
		output = []
		for aField in fields
			output.push(@fixName(aField))

		return output
	# helpers.processDirs = (objectMap,html,model) ->
	# 	for prop of objectMap
 #     		if !_.isArray objectMap[prop] 
 #       			console.log(">>> open" + prop)
 #       			helpers.processDirs(objectMap[prop])
 #       			console.log("<<< close" + prop)
 #     		else 
 #     			for x of objectMap[prop]
	# 	          console.log("+++" + objectMap[prop][x])
	# 	return 
		        
	return helpers
