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