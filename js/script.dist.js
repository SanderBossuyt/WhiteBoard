(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	
	var Application = require('./classes/Application.js');
	var FormReg = require('./classes/FormValidationRegister.js');
	var FormImage = require('./classes/FormImageValidation.js');
	var Detail = require('./classes/DetailPage.js');
	var NewBoard = require('./classes/NewBoard.js');

	function init() {

		var getPagePartOne = document.URL.split("?page=")[1];
		var getPagePartTwo = getPagePartOne.split("&")[0];

		new Detail();
		new NewBoard();

		if (getPagePartTwo === "register") {	
			new FormReg();
			new FormImage();
		}
		
		if (getPagePartTwo === "drawing") {
			new Application(document.querySelector('.whiteboard'));
		}


		//--------------------------------------------------postit op scherm krijgen met ajax
		$('#formuploadpostit').submit(function(event) {

			event.preventDefault();

			var data = {

    			postit : $(' .postitje ').val(),
    			action : "upload postit"

			};

			$.ajax({
				type:"POST",
				url:"index.php?page=drawing&id=" + document.URL.split("id=")[1], 
				//data: "postit=" + $('.postitje').val() + "&action=" + "upload postit",
				data: {newPostit: data},
				success:function(response){ 
					
					var splittingPartOne = response.split("<br />")[1];
					var splittingPartTwo = splittingPartOne.split("<script")[0];
					console.log(splittingPartTwo);
		    		$(".whiteboard").html(splittingPartTwo);


		    		new Application(document.querySelector('.whiteboard'));

		    	}
			});

		});



		$('#formuploadimage').submit(function(event) {

			event.preventDefault();

			$.ajax({
				url: "index.php?page=drawing&id=" + document.URL.split("id=")[1], // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(data)   // A function to be called if request succeeds
				{
				console.log(data);
				var splittingPartOne = data.split("<br />")[1];
					var splittingPartTwo = splittingPartOne.split("<script")[0];
					
		    		$(".whiteboard").html(splittingPartTwo);

		    		new Application(document.querySelector('.whiteboard'));
				}
				});

		});

		$('#formuploadvideo').submit(function(event) {

			event.preventDefault();

			$.ajax({
				url: "index.php?page=drawing&id=" + document.URL.split("id=")[1], // Url to which the request is send
				type: "POST",             // Type of request to be send, called as method
				data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false,       // The content type used when sending data to the server.
				cache: false,             // To unable request pages to be cached
				processData:false,        // To send DOMDocument or non processed data file it is set to false
				success: function(data)   // A function to be called if request succeeds
				{
				console.log(data);
				var splittingPartOne = data.split("<br />")[1];
					var splittingPartTwo = splittingPartOne.split("<script")[0];
					
		    		$(".whiteboard").html(splittingPartTwo);

		    		new Application(document.querySelector('.whiteboard'));
				}
				});

		});


	}





	


	init();
})();
},{"./classes/Application.js":2,"./classes/DetailPage.js":3,"./classes/FormImageValidation.js":4,"./classes/FormValidationRegister.js":5,"./classes/NewBoard.js":8}],2:[function(require,module,exports){
module.exports = (function(){

	var Item = require('./Item');
	
	function Application(whiteboard) {

		this.whiteboard = whiteboard;
		
		var items = this.whiteboard.querySelectorAll(".item");

		for(var i = 0; i< items.length; i++){

			this.createPostit(items[i]);

		}	

		
	}
	
	Application.prototype.createPostit = function(data) {

		var itemke = new Item(data);
		bean.on(itemke, "change", this.itemkeChangeHandler.bind(this));

		//bean.on van de bean.fire in item.js
		bean.on(itemke, "delete", this.itemkeDeleteHandler.bind(this));

	};

	Application.prototype.itemkeChangeHandler = function(item) {

		var splitting = document.URL.split("id=")[1];
		
		var move = {

    		id : item.el.classList[2],
    		x : item.el.style.left,
    		y : item.el.style.top,
    		action : "Update Position"

		};

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: {item: move},
			success:function(response){ 
				//niks
		   	}
		}); 

	};


	//ajax voor delete van item
	Application.prototype.itemkeDeleteHandler = function(item){


		console.log("delete item");

		var splitting = document.URL.split("id=")[1];
		
		var data = {

    		id : item.el.classList[2],
    		action : "delete item"

		};

		console.log(data);

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: {deleteItem: data},
			success:function(response){ 
				
				var splittingPartOne = response.split("<br />")[1];
				
				var splittingPartTwo = splittingPartOne.split("<script")[0];

		    	$(".whiteboard").html(splittingPartTwo);

		    	new Application(document.querySelector(".whiteboard"));

		   	}
		});

	};
		
	return Application;
})();


},{"./Item":7}],3:[function(require,module,exports){
module.exports = (function(){
var Invite = require('./Invite');
	var lis = document.querySelectorAll('li');
	
	function DetailPage() {

		lis = document.querySelectorAll('li');
		
		for(var i = 2; i< lis.length; i++){
			
			lis[i].classList.remove("selected");
			lis[i].addEventListener('click', this.clickHandler.bind(lis[i]));

		}
		
	}

	DetailPage.prototype.clickHandler = function(event){

		if (!$( this ).hasClass( "selected" )) {

			event.preventDefault();

		}
		
		for(var i = 2; i< lis.length; i++){
		
			lis[i].classList.remove("selected");
			
		}

		var splitOne = (this.innerHTML.split("id=")[1]).split('">')[0];

		this.classList.add("selected");

		$('#users h3').text($(this).text());

		$.get( "index.php?page=detail", { action: "loadInvites", id: splitOne } )
  			.done(function( data ) {

  				$("#users").empty();

		 		$("#users").html($( data ).find('#users').contents());

    		new Invite();
    		
  		});

		
		window.history.pushState("","","index.php?page=detail&id=" + splitOne);
		
		
	};	

	return DetailPage;
})();
},{"./Invite":6}],4:[function(require,module,exports){
module.exports = (function(){

	function FormImageValidation() {
		
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

	return FormImageValidation;
})();
},{}],5:[function(require,module,exports){
module.exports = (function(){

	function FormValidationRegister() {
		
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


	FormValidationRegister.prototype.validateThis = function(e) {

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



	return FormValidationRegister;
})();
},{}],6:[function(require,module,exports){

module.exports = (function(){

	var NewBoard = require('./NewBoard.js');
	var Detail = require('./DetailPage.js');
	
	function Invite() {

		

		$('#newInvite').submit(function(event) {

			event.preventDefault();

			var data = {

    			invite : $(' .invite ').val(),
    			action : "Invite"

			};


			if($(' .invite ').val() !== "" ){

				$.ajax({
					type:"POST",
					url:"index.php?page=detail&id=" + document.URL.split("id=")[1],
					data: {newInviteAdd: data},
					success:function(response){ 

							
							if (response.message) {
								$('<p>', {
									class: response.status,
	                			text: response.message
	            				}).appendTo($('.javascriptmessage'));
			    				
			    				
			    				setTimeout(function () {
	      							$('.infomessageJS').remove();
	      							$('.errormessageJS').remove();
	    						}, 2000);

							}else{
								var splitOne = (document.URL.split("id=")[1]);

		

								$.get( "index.php?page=detail", { action: "loadInvites", id: splitOne } )
									.done(function( data ) {

										$("#users").empty();

								 		$("#users").html($( data ).find('#users').contents());
									

								});

								$('<p>', {
									class: 'infomessageJS',
	                				text: "invite succesfully"
	            					}).appendTo($('.javascriptmessage'));
			    					
			    					
			    					setTimeout(function () {
	      								$('.infomessageJS').remove();
	      								
	    							}, 2000);
		
								window.history.pushState("","","index.php?page=detail&id=" + splitOne);

							}

			    	},
			    	complete: function() {
			    		new Detail();
			    		new NewBoard();
	        		
	    			}
				});
			}


			
		});
	}


	return Invite;
})();
},{"./DetailPage.js":3,"./NewBoard.js":8}],7:[function(require,module,exports){
module.exports = (function(){
	
	function Item(el) {

		this.teller  = 0;
		this.el = el;
		this.el.addEventListener('mousedown', this.mousedownHandler.bind(this));
		

		
		var deleteItem = document.querySelector(".deleteitem");

		deleteItem.addEventListener('click', this.clickHandler.bind(this));
	}

	Item.prototype.clickHandler = function(first_argument) {
		
		event.preventDefault();

		console.log("clickHandler");

		bean.fire(this,"delete", this);

	};
	
	Item.prototype.mousedownHandler = function(event){

		event.preventDefault();

		max = 0;
		$('.item').each(function(){

			var el = $(this);
			var z = parseInt( el.css( "z-index" ), 10 );
			max = Math.max( max, z );
			
		});

		this.el.style.zIndex = max + 1;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		this._mousemoveHandler = this.mousemoveHandler.bind(this);
		this._mouseupHandler = this.mouseupHandler.bind(this);

		window.addEventListener('mousemove', this._mousemoveHandler );
		window.addEventListener('mouseup', this._mouseupHandler );

	};

	Item.prototype.mousemoveHandler = function(event){

		this.el.style.border = "4px solid #3ab3da";
		this.el.style.left = (event.x - this.offsetX) + "px";
		this.el.style.top = (event.y - this.offsetY) + "px";
		

		if ((event.y - this.offsetY) <= 100) {
			
			this.el.style.top = 100 + "px";
		}

		if ((event.x - this.offsetX) <= 280) {
			
			this.el.style.left = 300 + "px";
		}

		if ((event.x - this.offsetX) >= $(window).width()-240) {
			
			this.el.style.left = $(window).width()-220 + "px";
		}

		if ((event.y - this.offsetY) >= $(window).height()-240) {
			
			this.el.style.top = $(window).height()-220 + "px";
		}

	};
	


	Item.prototype.mouseupHandler = function(event){

		this.el.style.border = "0px";

		bean.fire(this, "change", this);

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return Item;
})();
},{}],8:[function(require,module,exports){
module.exports = (function(){

	var Detail = require('./DetailPage');
	
	function NewBoard() {

		var Detail = require('./DetailPage');

		//--------------------------------------------------input board name maximum 19 characters
		$('.name').on("blur keyup", checkTwoCharacters);

		//--------------------------------------------------ajax new board toevoegen
		$('#newBoard').submit(function(event) {

			event.preventDefault();

			var data = {

    			boardname : $(' .name ').val(),
    			action : "Add New Board"

			};

			if($(' .name ').val() !== "" ){

				$.ajax({
					type:"POST",
					url:"index.php?page=detail", 
					data: {newBoardAdd: data},
					success:function(response){ 

						var splittingPartOne = response.split("</h1>")[1];
						var splittingPartTwo = splittingPartOne.split("</form")[0];
			    		$(".alles").html(splittingPartTwo);

			    		

			    	},
			    	complete: function() {
			    		
			    		$('<p>', {
	                	class: 'infomessageJS',
	                	text: "your board is added"
	            		}).appendTo($('.javascriptmessage'));
			    		
			    		
			    		setTimeout(function () {
	      					$('.infomessageJS').remove();
	    				}, 2000);
	    				console.log("new detail");
	        			new Detail();
	        			new NewBoard();
	    			}
				});
			}
		});	
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


	return NewBoard;
})();
},{"./DetailPage":3}]},{},[1]);
