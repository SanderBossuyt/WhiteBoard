(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	
	var application = require('./classes/application');
	var formReg = require('./classes/formValidationRegister');
	var formImage = require('./classes/formImageValidation');

	function init() {

		var splitting = document.URL.split("?page=")[1];
		var splitting2 = splitting.split("&")[0];
		
		if (splitting2 === "register") {
			
		new formReg();
		new formImage();
		};
		
		if (splitting2 === "drawing") {

			new application(document.querySelector('.whiteboard'));
		};

		$('#newBoard').submit(function(event) {

			event.preventDefault();

			//ajax call naar php vernieuwen persoonlijke boards lijst
			//don't copy this public code mothef*ckers, SHAME ON YOU GITHUBBERS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

				$.ajax({
					type:"POST",
					url:"index.php?page=detail", 
					data: "boardname=" + $('.name').val() + "&action=" + "Add New Board",
					success:function(response){ 

						var tata = response.split("</h1>")[1];
						var tatata = tata.split("</form")[0];
		    			$(".alles").html(tatata);

		    		}
				}); 
		});

	}


	init();
})();
},{"./classes/application":2,"./classes/formImageValidation":3,"./classes/formValidationRegister":4}],2:[function(require,module,exports){
module.exports = (function(){
	var Item = require('./item');
	
	function application(whiteboard) {

		this.whiteboard = whiteboard;
		
		var items = this.whiteboard.querySelectorAll(".item");
		for(var i = 0; i< items.length; i++){
			this.createPostit(items[i]);
		}	
	}
	
	application.prototype.createPostit = function(data) {
		var itemke = new Item(data);
	}
		
	return application;
})();


},{"./item":5}],3:[function(require,module,exports){
module.exports = (function(){

	
	function formImageValidation() {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var imageInput = document.querySelector("input[name=image]");
			initImageInput(imageInput);
		}
	}

	function initImageInput(el){
		var input = new ImageInput(el);
	}
	
	function ImageInput(el){
		this.el = el;
		this.fileInput = el;
		this.el.addEventListener('change', this.changeHandler.bind(this));
	}

	ImageInput.prototype.changeHandler = function(event){
		if(this.fileInput.files[0].type.indexOf('image') === 0){
			this.fileReader = new FileReader();
			this.fileReader.onload = this.onFileReaderLoad.bind(this);
			this.fileReader.readAsDataURL(this.fileInput.files[0]);
		}
	}
	
	ImageInput.prototype.onFileReaderLoad = function(event){
		this.img = document.createElement("img");
		this.img.onload = this.onloadHandler.bind(this);
		this.img.setAttribute('src', this.fileReader.result);
	}
	
	ImageInput.prototype.onloadHandler = function(event){
		var errorElement = this.fileInput.parentNode.querySelector(".error");

		if(this.img.width != this.img.height){
			errorElement.classList.remove("hidden");
		}else{
			errorElement.classList.add("hidden");
		}
	}



	return formImageValidation;
})();
},{}],4:[function(require,module,exports){
module.exports = (function(){

	
	function formValidationRegister() {
		
		var regnameInput = document.querySelector("input[name=regname]");
		var reglastnameInput = document.querySelector("input[name=reglastname]");
		var regusernameInput = document.querySelector("input[name=regusername]");
		var regemailInput = document.querySelector("input[name=regemail]");
		var regpasswordInput = document.querySelector("input[name=regpassword]");
		var regconfirmInput = document.querySelector("input[name=confirm_password]");
		
		var contactform = document.getElementById("formregister");
		
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
	};



	return formValidationRegister;
})();
},{}],5:[function(require,module,exports){
module.exports = (function(){
	
	function item(el) {
		this.teller  = 0;
		this.el = el;
		this.el.addEventListener('mousedown', this.mousedownHandler.bind(this));

	}
	
	item.prototype.mousedownHandler = function(event){
		event.preventDefault();
		this.el.style.zIndex = ++this.teller;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		this._mousemoveHandler = this.mousemoveHandler.bind(this);
		this._mouseupHandler = this.mouseupHandler.bind(this);

		window.addEventListener('mousemove', this._mousemoveHandler );
		window.addEventListener('mouseup', this._mouseupHandler );
	};

	item.prototype.mousemoveHandler = function(event){
		this.el.style.border = "4px solid #3ab3da";
		this.el.style.left = (event.x - this.offsetX) + "px";
		this.el.style.top = (event.y - this.offsetY) + "px";
	};
	
	item.prototype.mouseupHandler = function(event){
		this.el.style.border = "0px";
		var splitting = document.URL.split("id=")[1];

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: "id=" + this.el.classList[2] + "&x=" + (event.x - this.offsetX) + "&y=" + (event.y - this.offsetY) + "&action=" + "Update Position",
			success:function(response){ 
		   	}
		}); 

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return item;
})();
},{}]},{},[1]);
