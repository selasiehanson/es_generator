Ext.define("<%= namespace %>.view.lookups.<%= name %>List",{
	extend : 'Ext.grid.Panel',
	alias : 'widget.<%= alias %>list',
	title : '<%= name %>s',
	store : '<%= storeName %>',
	dockedItems: [
	    {
	            xtype: 'toolbar',
	            items: [
	            	{
                        text: 'Refresh',
                        iconCls: 'icon-refresh',
                        action : 'refresh<%= name.toLowerCase() %>list'
                    },
	            	{
		                text: 'Add <%= name %>',
		                iconCls: 'icon-add',
		                action : 'add<%= name.toLowerCase() %>'
		            }
	            ]
	    },
	    {
	        xtype: 'pagingtoolbar',
	        store: "<%= storeName %>",   // same store GridPanel is using
	        dock: 'bottom',
	        displayInfo: true
	    }
    ],
	initComponent : function (){
		this.columns = [
			{ xtype: 'rownumberer'},
			<%= items %>,
			{
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items : [
                    {
                        icon: '/<%= iconsPath %>/cog_edit.png',
                          // Use a URL in the icon config
                        tooltip: 'Edit Currency',
                        iconCls : 'act-editcurrency',
                        margin : '7 7 7 7 '
                    },{
                        icon: '/<%= iconsPath %>/delete.png',
                        tooltip : 'Delete <%= name %>',
                        iconCls : 'act-delete<%= name.toLowerCase() %>'
                    }
                ]
            }
		];

		this.callParent(arguments);
		this.store.load();
	}
});