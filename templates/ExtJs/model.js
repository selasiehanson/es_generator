Ext.define('<%= namespace %>.model.<%= entityName %>',{
	extend : 'Ext.data.Model',
	fields :[<%= fields %>],
	proxy : {
		type :'ajax',
		api : {
			read: '/<%= storeName %>/Get<%= entityName %>s',
			create : '/<%= storeName %>/Create<%= entityName %>',
			update: '/<%= storeName %>/Update<%= entityName %>',
			destroy : '/<%= storeName %>/Delete<%= entityName %>'
		},
		reader : {
			type : 'json',
			root : 'data',
			successProperty : 'success'
		}
	}
});