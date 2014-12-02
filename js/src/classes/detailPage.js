module.exports = (function(){

	
	
	function detailPage() {

		
		var lis = document.querySelectorAll('li');
		console.log(lis);
		for(var i = 0; i< lis.length; i++){
			if (lis[i]) {
				//delete all selected classes
			};
			lis[i].addEventListener('click', this.clickHandler.bind(lis[i]));
		}

		

		
	};

	detailPage.prototype.clickHandler = function(event){

			event.preventDefault();
			lis
			this.classList.add("selected");
			console.log(this);
		
	};	

	return detailPage;
})();