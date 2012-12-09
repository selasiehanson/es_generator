Ext.define("<%= namespace %>.store.<%= storeName %>",{
	extend :'Ext.data.Store',
	//autoLoad : true,
	model :'<%= namespace %>.model.<%= entityName %>',
	requires : '<%= namespace %>.model.<%= entityName %>'
})