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

		//bean.on van de bean.fire in item.js
		bean.on(itemke, "delete", this.itemkeDeleteHandler.bind(this));

	};

	Application.prototype.itemkeChangeHandler = function(item) {

		var splitting = document.URL.split("id=")[1];
		
		var move = {

    		id : item.el.classList[2],
    		x : item.el.style.left,
    		y : item.el.style.top,
    		action : "Update Position"

		};

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: {item: move},
			success:function(response){ 
				//niks
		   	}
		}); 

	};


	//ajax voor delete van item
	Application.prototype.itemkeDeleteHandler = function(item){


		console.log("delete item");

		var splitting = document.URL.split("id=")[1];
		
		var data = {

    		id : item.el.classList[2],
    		action : "delete item"

		};

		console.log(data);

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: {deleteItem: data},
			success:function(response){ 
				console.log(response);
				var splittingPartOne = response.split("<br />")[1];
				
				var splittingPartTwo = splittingPartOne.split("<script")[0];

		    	$(".whiteboard").html(splittingPartTwo);

		    	//new Application(splittingPartTwo);

		   	}
		});

	};
		
	return Application;
})();

