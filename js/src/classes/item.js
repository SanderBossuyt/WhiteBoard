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
		

		if ((event.y - this.offsetY) <= 100) {
			console.log("bamanamm");
			this.el.style.top = 100 + "px";
		};

		if ((event.x - this.offsetX) <= 280) {
			console.log("bamanamm");
			this.el.style.left = 330 + "px";
		};

		if ((event.x - this.offsetX) >= $(window).width()-240) {
			console.log("bamanamm");
			this.el.style.left = $(window).width()-220 + "px";
		};

		if ((event.y - this.offsetY) >= $(window).height()-240) {
			console.log("bamanamm");
			this.el.style.top = $(window).height()-220 + "px";
		};

	};
	


	item.prototype.mouseupHandler = function(event){
		this.el.style.border = "0px";
	
		bean.fire(this, "change", this);

		window.removeEventListener('mousemove', this._mousemoveHandler);
		window.removeEventListener('mouseup', this._mouseupHandler);
	};

	return item;
})();