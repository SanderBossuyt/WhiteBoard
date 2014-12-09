module.exports = (function(){

var lis = document.querySelectorAll('li');
	
	function DetailPage() {

		lis = document.querySelectorAll('li');
		
		for(var i = 3; i< lis.length; i++){
			
			lis[i].classList.remove("selected");
			lis[i].addEventListener('click', this.clickHandler.bind(lis[i]));

		}

	}

	DetailPage.prototype.clickHandler = function(event){

		if (!$( this ).hasClass( "selected" )) {

			event.preventDefault();

		}
		
		for(var i = 3; i< lis.length; i++){
		
			lis[i].classList.remove("selected");
			
		}

		var splitOne = (this.innerHTML.split("id=")[1]).split('">')[0];

		this.classList.add("selected");

		$('#users h3').text($(this).text());

		//get voor board_id door te geven naar de invite button
		/*$.get( "index.php?page=detail&id=" + splitOne, function( data ) {
  		
  			$("#users").empty();

		 	$("#users").html($( data ).find('#users').contents());

		});*/


		$.get( "index.php?page=detail", { action: "loadInvites", id: splitOne } )
  			.done(function( data ) {

  				$("#users").empty();

		 		$("#users").html($( data ).find('#users').contents());
    		
  		});

		
		window.history.pushState("","","index.php?page=detail&id=" + splitOne);
			
	};	

	return DetailPage;
})();