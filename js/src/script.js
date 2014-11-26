(function(){
	
	var application = require('./classes/application');
	var formReg = require('./classes/formValidationRegister');
	var formImage = require('./classes/formImageValidation');
	function init() {

		new formReg();
		new formImage();
		
	}

	init();
})();