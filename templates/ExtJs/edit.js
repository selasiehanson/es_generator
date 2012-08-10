Ext.define("<%= namespace %>.view.<%= name %>Edit",{
	extend : "Ext.window.Window",
	alias : 'widget.<%= alias %>edit',
	title : 'New <%= name %>',
	width  : 400,
	height : 400,

	layout: 'fit',
    autoShow: true,
	initComponent : function (){
		this.items = [
			{
				xtype : 'form',
				layout : 'anchor',
				border : 0,
	    		fieldDefaults: {
			        labelAlign: 'top',
			        labelWidth: 100,
			        //labelStyle: 'font-weight:bold'
			    },
			    bodyPadding: 10,
			    defaults: {
			        anchor: '100%',
			        margins: '0 10 10 0',
			    },
				items : [ <%= items %> ]
			}
		];

		this.buttons = [
            {
                text: 'Save',
                action: 'save<%= name.toLowerCase() %>'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments); 
    }
});