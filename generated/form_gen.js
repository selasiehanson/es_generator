//pass {items :[], url : '', title :''}
(function (){ 		
	
	var items = [ 	
		  { name : 'First Name' , fieldLabel : 'First Name' },   { name : 'Last Name' , fieldLabel : 'Last Name' },   { name : 'Age' , fieldLabel : 'Age' }, 	
	]; 

	var panel = Ext.create('Ext.form.Panel', {
	    title: 'Sample Form',
	    bodyPadding: 5,
	    width: 350,

	    // The form will submit an AJAX request to this URL when submitted
	    url: ''somefile.php''	,

	    // Fields will be arranged vertically, stretched to full width
	    layout: 'anchor',
	    defaults: {
	        anchor: '100%'
	    },

	    // The fields
	    defaultType: 'textfield',
	    items: items,

	    // Reset and Submit buttons
	    buttons: [{
	        text: 'Reset',
	        handler: function() {
	            this.up('form').getForm().reset();
	        }
	    }, {
	        text: 'Submit',
	        formBind: true, //only enabled once the form is valid
	        disabled: true,
	        handler: function() {
	            var form = this.up('form').getForm();
	            if (form.isValid()) {
	                form.submit({
	                    success: function(form, action) {
	                       Ext.Msg.alert('Success', action.result.msg);
	                    },
	                    failure: function(form, action) {
	                        Ext.Msg.alert('Failed', action.result.msg);
	                    }
	                });
	            }
	        }
	    }]
	});	

	return panel;								
})();



