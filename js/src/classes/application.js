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

		//delete
		 //bean.on(itemke, "change", this.itemkeChangeHandler.bind(this));

	};

	Application.prototype.itemkeChangeHandler = function(item) {

		var splitting = document.URL.split("id=")[1];
		
		var data = {

    		id : item.el.classList[2],
    		x : item.el.style.left,
    		y : item.el.style.top,
    		action : "Update Position"

		};


		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: {item: data},
			success:function(response){ 
				//niks
		   	}
		}); 

	};
		
	return Application;
})();

