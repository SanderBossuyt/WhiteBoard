!function e(t,i,n){function o(s,a){if(!i[s]){if(!t[s]){var d="function"==typeof require&&require;if(!a&&d)return d(s,!0);if(r)return r(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[s]={exports:{}};t[s][0].call(u.exports,function(e){var i=t[s][1][e];return o(i?i:e)},u,u.exports,e,t,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(e){!function(){function t(){var e=document.URL.split("?page=")[1],t=e.split("&")[0];"register"===t&&(new n,new o),"drawing"===t&&new i(document.querySelector(".whiteboard")),$("#newBoard").submit(function(e){e.preventDefault(),$.ajax({type:"POST",url:"index.php?page=detail",data:"boardname="+$(".name").val()+"&action=Add New Board",success:function(e){var t=e.split("</h1>")[1],i=t.split("</form")[0];$(".alles").html(i)}})})}var i=e("./classes/application"),n=e("./classes/formValidationRegister"),o=e("./classes/formImageValidation");t()}()},{"./classes/application":2,"./classes/formImageValidation":3,"./classes/formValidationRegister":4}],2:[function(e,t){t.exports=function(){function t(e){this.whiteboard=e;for(var t=this.whiteboard.querySelectorAll(".item"),i=0;i<t.length;i++)this.createPostit(t[i])}var i=e("./item");return t.prototype.createPostit=function(e){new i(e)},t}()},{"./item":5}],3:[function(e,t){t.exports=function(){function e(){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var e=document.querySelector("input[name=image]");t(e)}}function t(e){new i(e)}function i(e){this.el=e,this.fileInput=e,this.el.addEventListener("change",this.changeHandler.bind(this))}return i.prototype.changeHandler=function(){0===this.fileInput.files[0].type.indexOf("image")&&(this.fileReader=new FileReader,this.fileReader.onload=this.onFileReaderLoad.bind(this),this.fileReader.readAsDataURL(this.fileInput.files[0]))},i.prototype.onFileReaderLoad=function(){this.img=document.createElement("img"),this.img.onload=this.onloadHandler.bind(this),this.img.setAttribute("src",this.fileReader.result)},i.prototype.onloadHandler=function(){var e=this.fileInput.parentNode.querySelector(".error");this.img.width!=this.img.height?e.classList.remove("hidden"):e.classList.add("hidden")},e}()},{}],4:[function(e,t){t.exports=function(){function e(){var e=document.querySelector("input[name=regname]"),t=document.querySelector("input[name=reglastname]"),i=document.querySelector("input[name=regusername]"),n=document.querySelector("input[name=regemail]"),o=document.querySelector("input[name=regpassword]"),r=document.querySelector("input[name=confirm_password]"),s=document.getElementById("Registratie_form");e.addEventListener("blur",this.validateThis),t.addEventListener("blur",this.validateThis),i.addEventListener("blur",this.validateThis),n.addEventListener("blur",this.validateThis),o.addEventListener("blur",this.validateThis),r.addEventListener("blur",this.validateThis),s.addEventListener("submit",function(s){var a=!0;a&=this.validateNotEmpty(e),a&=this.validateNotEmpty(t),a&=this.validateNotEmpty(i),a&=this.validateNotEmpty(n),a&=this.validateNotEmpty(o),a&=this.validateNotEmpty(r),a||s.preventDefault()})}function t(e){var t=e.parentNode.querySelector(".error[data-for='"+e.getAttribute("name")+"']");return e.value.length>0?(t.classList.add("hidden"),!0):(t.classList.remove("hidden"),!1)}return e.prototype.validateThis=function(){t(this)},e}()},{}],5:[function(e,t){t.exports=function(){function e(e){this.teller=0,this.el=e,this.el.addEventListener("mousedown",this.mousedownHandler.bind(this))}return e.prototype.mousedownHandler=function(e){e.preventDefault(),this.el.style.zIndex=++this.teller,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this._mousemoveHandler=this.mousemoveHandler.bind(this),this._mouseupHandler=this.mouseupHandler.bind(this),window.addEventListener("mousemove",this._mousemoveHandler),window.addEventListener("mouseup",this._mouseupHandler)},e.prototype.mousemoveHandler=function(e){this.el.style.border="4px solid #3ab3da",this.el.style.left=e.x-this.offsetX+"px",this.el.style.top=e.y-this.offsetY+"px"},e.prototype.mouseupHandler=function(e){this.el.style.border="0px";var t=document.URL.split("id=")[1];$.ajax({type:"POST",url:"index.php?page=drawing&id="+t,data:"id="+this.el.classList[2]+"&x="+(e.x-this.offsetX)+"&y="+(e.y-this.offsetY)+"&action=Update Position",success:function(){}}),window.removeEventListener("mousemove",this._mousemoveHandler),window.removeEventListener("mouseup",this._mouseupHandler)},e}()},{}]},{},[1]);