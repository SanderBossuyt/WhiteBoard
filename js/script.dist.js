(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	
	var application = require('./classes/application');
	var formReg = require('./classes/formValidationRegister');
	var formImage = require('./classes/formImageValidation');
	var detail = require('./classes/detailPage');

	function init() {

		var splitting = document.URL.split("?page=")[1];
		var splitting2 = splitting.split("&")[0];

		new detail();

		if (splitting2 === "register") {
			
			new formReg();
			new formImage();

		}
		
		if (splitting2 === "drawing") {

			new application(document.querySelector('.whiteboard'));
		}


		$('.name').on("blur keyup", checkTwoCharacters);


		$('#newBoard').submit(function(event) {

			event.preventDefault();

				$.ajax({
					type:"POST",
					url:"index.php?page=detail", 
					data: "boardname=" + $('.name').val() + "&action=" + "Add New Board",
					success:function(response){ 

						var tata = response.split("</h1>")[1];
						var tatata = tata.split("</form")[0];
		    			$(".alles").html(tatata);

		    			new detail();

		    		}
				}); 
		});


		//postit op schermkrijgen met ajax
		$('#formuploadpostit').submit(function(event) {


			event.preventDefault();
				$.ajax({
					type:"POST",
					url:"index.php?page=drawing&id=" + document.URL.split("id=")[1], 
					data: "postit=" + $('.postitje').val() + "&action=" + "upload postit",
					success:function(response){ 
						
						var tata = response.split("<br />")[1];
						var tatata = tata.split("<script")[0];
						
		    			$(".whiteboard").html(tatata);
		    			new application(document.querySelector('.whiteboard'));

		    		}
				}); 
		});

		//image op schermkrijgen met ajax
		$('#formuploadimage').submit(function(event) {

			event.preventDefault();
				$.ajax({
					type:"POST",
					url:"index.php?page=drawing&id=" + document.URL.split("id=")[1], 
					data: "image=" + $('#addImageImage').val() + "&action=" + "upload image",
					success:function(response){ 

						var imagesplit = response.split("<br />")[1];
						var imagespliter = imagesplit.split("<script")[0];
						
		    			$(".whiteboard").html(imagespliter);
		    			new application(document.querySelector('.whiteboard'));

		    		}
				}); 
		});

		//video op schermkrijgen met ajax
		
		// $('#formuploadvideo').submit(function(event) {


		// 	event.preventDefault();
		// 		$.ajax({
		// 			type:"POST",
		// 			url:"index.php?page=drawing&id=" + document.URL.split("id=")[1], 
		// 			data: "video=" + $('#addvideo').val() + "&action=" + "upload video",
		// 			success:function(response){ 
						
		// 				var tata = response.split("<br />")[1];
		// 				var tatata = tata.split("<script")[0];
						
		//     			$(".whiteboard").html(tatata);
		//     			new application(document.querySelector('.whiteboard'));

		//     		}
		// 		}); 
		// });

	}


	function checkTwoCharacters(e) {

		var $el = $(this);

		if ($el.val().length > 19) {
			showInvalid($el, $('#errorboard'), "please fill in a maximum of 19 characters");
		}else{
			showValid($el, $('#errorboard'));
		}
	}
	
	function showValid($el, $error){
		$error.addClass("hidden");
	}
	
	function showInvalid($el, $error, message){
		$error.removeClass("hidden");
		$error.text(message);
	}


	init();
})();
},{"./classes/application":2,"./classes/detailPage":3,"./classes/formImageValidation":4,"./classes/formValidationRegister":5}],2:[function(require,module,exports){
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
		bean.on(itemke, "change", this.itemkeChangeHandler.bind(this));
	};

	application.prototype.itemkeChangeHandler = function(item) {
		console.log(item.el.classList[2]);
		console.log(item.el.style.left);
		var splitting = document.URL.split("id=")[1];
		
		var data = {
    		id : item.el.classList[2],
    		x : item.el.style.left,
    		y : item.el.style.top,
    		action : "Update Position"
		};


		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			//data: "id=" + item.el.classList[2] + "&x=" + item.el.style.left + "&y=" + item.el.style.top + "&action=" + "Update Position",
			data: {item: data},
			success:function(response){ 
				console.log(response);
		   	}
		}); 

	};
		
	return application;
})();


},{"./item":6}],3:[function(require,module,exports){
module.exports = (function(){
var lis = document.querySelectorAll('li');
	
	
	function detailPage() {
		console.log("detailPage");
		for(var i = 3; i< lis.length; i++){
			
			lis[i].classList.remove("selected");
			
			lis[i].addEventListener('click', this.clickHandler.bind(lis[i]));
		}

	}

	detailPage.prototype.clickHandler = function(event){

			if (!$( this ).hasClass( "selected" )) {
				event.preventDefault();
			}
			

			for(var i = 3; i< lis.length; i++){
			
				lis[i].classList.remove("selected");
			}

			var splitOne = (this.innerHTML.split("id=")[1]).split('">')[0];

			this.classList.add("selected");

			$('#users h3').text($(this).text());

			$.get( "index.php?page=detail&id=" + splitOne, function( data ) {
  			console.log( $( data ).find('#users') );

  					
						
		    			$("#users").parent().html($( data ).find('#users'));
			});
			
				window.history.pushState("","","index.php?page=detail&id=" + splitOne);
			
			
	};	

	return detailPage;
})();
},{}],4:[function(require,module,exports){
module.exports = (function(){

	
	function formImageValidation() {
		console.log("bam");
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
	};
	
	ImageInput.prototype.onFileReaderLoad = function(event){
		this.img = document.createElement("img");
		this.img.onload = this.onloadHandler.bind(this);
		this.img.setAttribute('src', this.fileReader.result);
	};
	
	ImageInput.prototype.onloadHandler = function(event){
		var errorElement = this.fileInput.parentNode.querySelector(".error");

		if(this.img.width != this.img.height){
			errorElement.classList.remove("hidden");
		}else{
			errorElement.classList.add("hidden");
		}
	};



	return formImageValidation;
})();
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
		

		if ((event.y - this.offsetY) <= 100) {
			console.log("bamanamm");
			this.el.style.top = 100 + "px";
		}

		if ((event.x - this.offsetX) <= 280) {
			console.log("bamanamm");
			this.el.style.left = 300 + "px";
		}

		if ((event.x - this.offsetX) >= $(window).width()-240) {
			console.log("bamanamm");
			this.el.style.left = $(window).width()-220 + "px";
		}

		if ((event.y - this.offsetY) >= $(window).height()-240) {
			console.log("bamanamm");
			this.el.style.top = $(window).height()-220 + "px";
		}

	};
	


	item.prototype.mouseupHandler = function(event){
		this.el.style.border = "0px";
	
		bean.fire(this, "change", this);

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return item;
})();
},{}]},{},[1]);
