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

	}


	init();
})();