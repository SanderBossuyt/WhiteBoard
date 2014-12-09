(function(){
	
	var Application = require('./classes/Application');
	var FormReg = require('./classes/FormValidationRegister');
	var FormImage = require('./classes/FormImageValidation');
	var Detail = require('./classes/DetailPage');

	function init() {

		var getPagePartOne = document.URL.split("?page=")[1];
		var getPagePartTwo = getPagePartOne.split("&")[0];

		new Detail();

		if (getPagePartTwo === "register") {	
			new FormReg();
			new FormImage();
		}
		
		if (getPagePartTwo === "drawing") {
			new Application(document.querySelector('.whiteboard'));
		}

		//--------------------------------------------------input board name maximum 19 characters
		$('.name').on("blur keyup", checkTwoCharacters);

		//--------------------------------------------------ajax new board toevoegen
		$('#newBoard').submit(function(event) {

			event.preventDefault();

			var data = {

    			boardname : $(' .name ').val(),
    			action : "Add New Board"

			};


			$.ajax({
				type:"POST",
				url:"index.php?page=detail", 
				//data: "boardname=" + $('.name').val() + "&action=" + "Add New Board",
				data: {newBoardAdd: data},
				success:function(response){ 

					var splittingPartOne = response.split("</h1>")[1];
					var splittingPartTwo = splittingPartOne.split("</form")[0];
		    		$(".alles").html(splittingPartTwo);

		    		

		    	},
		    	complete: function() {
        			new Detail();
    			}
			});

			
		});


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
					
		    		$(".whiteboard").html(splittingPartTwo);

		    		new Application(document.querySelector('.whiteboard'));

		    	}
			});

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


	init();
})();