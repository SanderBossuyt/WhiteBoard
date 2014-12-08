module.exports = (function(){

	
	function formValidationRegister() {
		
		var regnameInput = document.querySelector("input[name=regname]");
		var reglastnameInput = document.querySelector("input[name=reglastname]");
		var regusernameInput = document.querySelector("input[name=regusername]");
		var regemailInput = document.querySelector("input[name=regemail]");
		var regpasswordInput = document.querySelector("input[name=regpassword]");
		var regconfirmInput = document.querySelector("input[name=confirm_password]");
		
		var contactform = document.getElementById("Registratie_form");
		
		regnameInput.addEventListener("blur", this.validateThis);
		reglastnameInput.addEventListener("blur", this.validateThis);
		regusernameInput.addEventListener("blur", this.validateThis);
		regemailInput.addEventListener("blur", this.validateThis);
		regpasswordInput.addEventListener("blur", this.validateThis);
		regconfirmInput.addEventListener("blur", this.validateThis);


		contactform.addEventListener('submit',function(e){
		
			var allValid = true;
		
			allValid &= this.validateNotEmpty(regnameInput);
			allValid &= this.validateNotEmpty(reglastnameInput);
			allValid &= this.validateNotEmpty(regusernameInput);
			allValid &= this.validateNotEmpty(regemailInput);
			allValid &= this.validateNotEmpty(regpasswordInput);
			allValid &= this.validateNotEmpty(regconfirmInput);
		
			if (!allValid) {
				e.preventDefault();
			}

		});
			
	}


	formValidationRegister.prototype.validateThis = function(e) {
		validateNotEmpty(this);
	};

	function validateNotEmpty(input) {
		var errorHolder = input.parentNode.querySelector(".error[data-for='"+ input.getAttribute("name") +"']");
		if(input.value.length > 0){
			errorHolder.classList.add("hidden");
			return true;
		}
		errorHolder.classList.remove("hidden");
		return false;
	}



	return formValidationRegister;
})();