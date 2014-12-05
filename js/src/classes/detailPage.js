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

			this.classList.add("selected");

			$('#users h3').text($(this).text());
			
	};	

	return detailPage;
})();