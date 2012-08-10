Ext.define('<%= namespace %>.model.<%= entityName %>',{
	extend : 'Ext.data.Model',
	fields :[<%= fields %>],
	proxy : {
		type :'ajax',
		api : {
			read: '/Invoice/Get<%= entityName %>s',
			create : '/Invoice/Create<%= entityName %>',
			update: '/Invoice/Update<%= entityName %>',
			destroy : '/Invoice/Delete<%= entityName %>'
		},
		reader : {
			type : 'json',
			root : 'data',
			successProperty : 'success'
		}
	}
});