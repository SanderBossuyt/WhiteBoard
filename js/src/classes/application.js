module.exports = (function(){
	var Item = require('./item');
	
	function application(whiteboard) {

		//$('#newBoard').submit(this.changeHandler.bind(this));


		this.whiteboard = whiteboard
		
		

		var items = this.whiteboard.querySelectorAll(".item");
		for(var i = 0; i< items.length; i++){
			this.createPostit(items[i]);
		}
		
	}
	
	application.prototype.createPostit = function(data) {
		var itemke = new Item(data);
	}
		
		
			
	

	application.prototype.changeHandler = function(e){
		
 	}


	return application;
})();
