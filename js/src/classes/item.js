module.exports = (function(){
	
	function item(el) {
		this.teller  = 0;
		this.el = el;
		this.el.addEventListener('mousedown', this.mousedownHandler.bind(this));
	
	}
	
	item.prototype.mousedownHandler = function(event){
		event.preventDefault();
		this.el.style.zIndex = ++this.teller;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		this._mousemoveHandler = this.mousemoveHandler.bind(this);
		this._mouseupHandler = this.mouseupHandler.bind(this);

		window.addEventListener('mousemove', this._mousemoveHandler );
		window.addEventListener('mouseup', this._mouseupHandler );
	};

	item.prototype.mousemoveHandler = function(event){
		this.el.style.border = "4px solid #3ab3da";
		this.el.style.left = (event.x - this.offsetX) + "px";
		this.el.style.top = (event.y - this.offsetY) + "px";
	};
	
	item.prototype.mouseupHandler = function(event){
		this.el.style.border = "0px";
		var splitting = document.URL.split("id=")[1];

		$.ajax({ 
			type:"POST",
			url:"index.php?page=drawing&id="+ splitting, 
			data: "id=" + this.el.classList[2] + "&x=" + (event.x - this.offsetX) + "&y=" + (event.y - this.offsetY) + "&action=" + "Update Position",
			success:function(response){ 
				//console.log(response);
		   	}
		}); 

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return item;
})();