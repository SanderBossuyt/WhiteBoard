module.exports = (function(){
	
	function Item(el) {

		this.teller  = 0;
		this.el = el;
		this.el.addEventListener('mousedown', this.mousedownHandler.bind(this));
		

		
		var deleteItem = document.querySelector(".deleteitem");

		deleteItem.addEventListener('click', this.clickHandler.bind(this));
	}

	Item.prototype.clickHandler = function(first_argument) {
		
		event.preventDefault();

		console.log("clickHandler");

		bean.fire(this,"delete", this);

	};
	
	Item.prototype.mousedownHandler = function(event){

		event.preventDefault();

		max = 0;
		$('.item').each(function(){

			var el = $(this);
			var z = parseInt( el.css( "z-index" ), 10 );
			max = Math.max( max, z );
			
		});

		this.el.style.zIndex = max + 1;
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;

		this._mousemoveHandler = this.mousemoveHandler.bind(this);
		this._mouseupHandler = this.mouseupHandler.bind(this);

		window.addEventListener('mousemove', this._mousemoveHandler );
		window.addEventListener('mouseup', this._mouseupHandler );

	};

	Item.prototype.mousemoveHandler = function(event){

		this.el.style.border = "4px solid #3ab3da";
		this.el.style.left = (event.x - this.offsetX) + "px";
		this.el.style.top = (event.y - this.offsetY) + "px";
		

		if ((event.y - this.offsetY) <= 100) {
			
			this.el.style.top = 100 + "px";
		}

		if ((event.x - this.offsetX) <= 280) {
			
			this.el.style.left = 300 + "px";
		}

		if ((event.x - this.offsetX) >= $(window).width()-240) {
			
			this.el.style.left = $(window).width()-220 + "px";
		}

		if ((event.y - this.offsetY) >= $(window).height()-240) {
			
			this.el.style.top = $(window).height()-220 + "px";
		}

	};
	


	Item.prototype.mouseupHandler = function(event){

		this.el.style.border = "0px";

		bean.fire(this, "change", this);

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return Item;
})();