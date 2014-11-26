module.exports = (function(){

	
	function formImageValidation() {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var imageInput = document.querySelector("input[name=image]");
			initImageInput(imageInput);

		}
	}

	function initImageInput(el){
		var input = new ImageInput(el);
	}
	
	function ImageInput(el){
		this.el = el;
		this.fileInput = el;
		this.el.addEventListener('change', this.changeHandler.bind(this));
	}

	ImageInput.prototype.changeHandler = function(event){
		if(this.fileInput.files[0].type.indexOf('image') === 0){
			this.fileReader = new FileReader();
			this.fileReader.onload = this.onFileReaderLoad.bind(this);
			this.fileReader.readAsDataURL(this.fileInput.files[0]);
		}
	}
	
	ImageInput.prototype.onFileReaderLoad = function(event){
		this.img = document.createElement("img");
		this.img.onload = this.onloadHandler.bind(this);
		this.img.setAttribute('src', this.fileReader.result);
	}
	
	ImageInput.prototype.onloadHandler = function(event){
		var errorElement = this.fileInput.parentNode.querySelector(".error");

		if(this.img.width != this.img.height){
			errorElement.classList.remove("hidden");
		}else{
			errorElement.classList.add("hidden");
		}
	}



	return formImageValidation;
})();