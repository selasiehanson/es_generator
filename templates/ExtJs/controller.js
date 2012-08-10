Ext.define("<%= namespace %>.controller.<%= entityName %>",{

	extend: 'Ext.app.Controller',

	views : [
		'<%= name.toLowerCase() %>.List',
		'<%= name.toLowerCase() %>.Edit', 
         
	],
	stores : [
		"<%= storeName %>"
	],
    refs : [
        {ref : '<%= name.toLowerCase() %>List', selector : '<%= name.toLowerCase() %>list'}
    ],
	models :[
		"<%= entityName %>"
	],
    init: function() {
        this.control({
            '<%= name.toLowerCase() %>list button[action=adduser]' : {
                click : this.addUser
            },
            '<%= name.toLowerCase() %>' : {
                itemdblclick : this.edit<%= name %>
            },
            '<%= name.toLowerCase() %>list actioncolumn' : {
                click : this.onAction
            },
            '<%= name.toLowerCase() %>list button[action=refresh<%= name.toLowerCase() %>list]' :{
                click : this.refresh<%= entityName %>s
            },	
            '<%= name.toLowerCase() %>edit button[action=save<%= name.toLowerCase() %>]' :{
                click : this.saveUser
            },
            '<%= name.toLowerCase() %>update button[action=update<%= name.toLowerCase() %>]' :{
                click : this.save<%= entityName %>
            }
        });
    },

    onAction : function (grid,cell,row,col,e){
        var self = this;
        var m = e.getTarget().className.match(/\bact-(\w+)\b/)
        if(m){
            window.g = grid;
            var rec = grid.getStore().getAt(row);
            switch(m[1]){
                case 'edit<%= name.toLowerCase() %>':
                    //todo : load up grid and populate with record
                    self.loadRecord(rec);
                break;
                case 'delete<%= name.toLowerCase() %>':
                    
                break;
            }
        }
    },

    addUser : function () {
        var view = Ext.widget('<%= name.toLowerCase() %>edit');
    },
    editUser : function (grid , record){
        this.loadRecord(record);
    },

    loadRecord : function (record){
        var view = Ext.widget('<%= name.toLowerCase() %>edit');
        view.down('form').loadRecord(record);
        view.setTitle("Edit <%= entityName %>");
    },
    refreshUsers : function () {
        this.get<%= entityName %>List().getStore().load();
    },
    saveUser : function (button) {
        var self  = this;
        var panel  = window.panel = button.up('panel');
        var win = button.up("window");
        var form =  panel.down('form').getForm();
        var rec =  form.getRecord();
        window.rec = rec;
        var values =  form.getValues();
        var message ;
        if(rec){//update

            rec.set(values);
            window.rec = rec;
            message = 'Updating record, please wait...';
           
        }else {
            message = 'Saving record, please wait...'
            rec =  Ext.create("QI.model.<%= entityName %>",values);
        }

        
        Ext.MessageBox.show({
           msg: message,
           progressText: 'Saving...',
           width:300,
           wait:true,
           waitConfig: {interval:200},
           icon:'ext-mb-download', //custom class in msg-box.html
           //animateTarget: 'mb7'
        });
        
        if(form.isValid()){
            rec.save({
                success : function (x, response ){
                    var res = Ext.decode(response.response.responseText);
                    win.close();
                    Ext.MessageBox.hide();
                    Ext.Msg.alert("Success",res.message);
                    self.get<%= storeName %>Store().load();
                }
            });
        }else{
            Ext.MessageBox.hide();
            Ext.Msg.alert("Error","Errors were ecountered. Please fix before continuing");
        }
    },
    updateUser : function (button){
    	this.saveUser(button);   	
        
    }
});