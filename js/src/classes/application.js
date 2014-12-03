module.exports = (function(){
	var Item = require('./item');
	
	function application(whiteboard) {

		this.whiteboard = whiteboard;
		
		var items = this.whiteboard.querySelectorAll(".item");
		for(var i = 0; i< items.length; i++){
			this.createPostit(items[i]);
		}	
	};
	
	application.prototype.createPostit = function(data) {
		var itemke = new Item(data);
		bean.on(itemke, "change", this.itemkeChangeHandler.bind(this));
	}

	application.prototype.itemkeChangeHandler = function(item) {
		console.log(item.el.classList[2]);
		console.log(item.el.style.left);
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
			//data: "id=" + item.el.classList[2] + "&x=" + item.el.style.left + "&y=" + item.el.style.top + "&action=" + "Update Position",
			data: {item: data},
			success:function(response){ 
				console.log(response);
		   	}
		}); 

	};
		
	return application;
})();

