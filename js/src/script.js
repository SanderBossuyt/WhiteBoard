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