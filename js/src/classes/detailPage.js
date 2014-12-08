module.exports = (function(){
var lis = document.querySelectorAll('li');
	
	
	function detailPage() {
		console.log("detailPage");
		for(var i = 3; i< lis.length; i++){
			
			lis[i].classList.remove("selected");
			
			lis[i].addEventListener('click', this.clickHandler.bind(lis[i]));
		}

	};

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