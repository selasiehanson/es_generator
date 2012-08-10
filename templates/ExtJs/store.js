Ext.define("<%= namespace %>.store.<%= storeName %>",{
	extend :'Ext.data.Store',
	//autoLoad : true,
	model :'QI.model.<%= entityName %>',
	requires : 'QI.model.<%= entityName %>'
})