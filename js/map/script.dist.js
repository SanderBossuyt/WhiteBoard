!function e(t,i,n){function o(a,r){if(!i[a]){if(!t[a]){var l="function"==typeof require&&require;if(!r&&l)return l(a,!0);if(s)return s(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=i[a]={exports:{}};t[a][0].call(u.exports,function(e){var i=t[a][1][e];return o(i?i:e)},u,u.exports,e,t,i,n)}return i[a].exports}for(var s="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(e){!function(){function t(){var e=document.URL.split("?page=")[1],t=e.split("&")[0];new l,"register"===t&&(new a,new r),"drawing"===t&&new s(document.querySelector(".whiteboard")),$(".name").on("blur keyup",i),$("#newBoard").submit(function(e){e.preventDefault(),$.ajax({type:"POST",url:"index.php?page=detail",data:"boardname="+$(".name").val()+"&action=Add New Board",success:function(e){var t=e.split("</h1>")[1],i=t.split("</form")[0];$(".alles").html(i)}})}),$("#formuploadpostit").submit(function(e){e.preventDefault(),$.ajax({type:"POST",url:"index.php?page=drawing&id="+document.URL.split("id=")[1],data:"postit="+$(".postitje").val()+"&action=upload postit",success:function(e){var t=e.split("<br />")[1],i=t.split("<script")[0];$(".whiteboard").html(i),new s(document.querySelector(".whiteboard"))}})})}function i(){var e=$(this);e.val().length>19?o(e,$("#errorboard"),"please fill in a maximum of 19 characters"):n(e,$("#errorboard"))}function n(e,t){t.addClass("hidden")}function o(e,t,i){t.removeClass("hidden"),t.text(i)}var s=e("./classes/application"),a=e("./classes/formValidationRegister"),r=e("./classes/formImageValidation"),l=e("./classes/detailPage");t()}()},{"./classes/application":2,"./classes/detailPage":3,"./classes/formImageValidation":4,"./classes/formValidationRegister":5}],2:[function(e,t){t.exports=function(){function t(e){this.whiteboard=e;for(var t=this.whiteboard.querySelectorAll(".item"),i=0;i<t.length;i++)this.createPostit(t[i])}var i=e("./item");return t.prototype.createPostit=function(e){new i(e)},t}()},{"./item":6}],3:[function(e,t){t.exports=function(){function e(){var e=document.querySelectorAll("li");console.log(e);for(var t=0;t<e.length;t++)e[t],e[t].addEventListener("click",this.clickHandler.bind(e[t]))}return e.prototype.clickHandler=function(e){e.preventDefault(),this.classList.add("selected"),console.log(this)},e}()},{}],4:[function(e,t){t.exports=function(){function e(){if(console.log("bam"),window.File&&window.FileReader&&window.FileList&&window.Blob){var e=document.querySelector("input[name=image]");t(e)}}function t(e){new i(e)}function i(e){this.el=e,this.fileInput=e,this.el.addEventListener("change",this.changeHandler.bind(this))}return i.prototype.changeHandler=function(){0===this.fileInput.files[0].type.indexOf("image")&&(this.fileReader=new FileReader,this.fileReader.onload=this.onFileReaderLoad.bind(this),this.fileReader.readAsDataURL(this.fileInput.files[0]))},i.prototype.onFileReaderLoad=function(){this.img=document.createElement("img"),this.img.onload=this.onloadHandler.bind(this),this.img.setAttribute("src",this.fileReader.result)},i.prototype.onloadHandler=function(){var e=this.fileInput.parentNode.querySelector(".error");this.img.width!=this.img.height?e.classList.remove("hidden"):e.classList.add("hidden")},e}()},{}],5:[function(e,t){t.exports=function(){function e(){var e=document.querySelector("input[name=regname]"),t=document.querySelector("input[name=reglastname]"),i=document.querySelector("input[name=regusername]"),n=document.querySelector("input[name=regemail]"),o=document.querySelector("input[name=regpassword]"),s=document.querySelector("input[name=confirm_password]"),a=document.getElementById("Registratie_form");e.addEventListener("blur",this.validateThis),t.addEventListener("blur",this.validateThis),i.addEventListener("blur",this.validateThis),n.addEventListener("blur",this.validateThis),o.addEventListener("blur",this.validateThis),s.addEventListener("blur",this.validateThis),a.addEventListener("submit",function(a){var r=!0;r&=this.validateNotEmpty(e),r&=this.validateNotEmpty(t),r&=this.validateNotEmpty(i),r&=this.validateNotEmpty(n),r&=this.validateNotEmpty(o),r&=this.validateNotEmpty(s),r||a.preventDefault()})}function t(e){var t=e.parentNode.querySelector(".error[data-for='"+e.getAttribute("name")+"']");return e.value.length>0?(t.classList.add("hidden"),!0):(t.classList.remove("hidden"),!1)}return e.prototype.validateThis=function(){t(this)},e}()},{}],6:[function(e,t){t.exports=function(){function e(e){this.teller=0,this.el=e,this.el.addEventListener("mousedown",this.mousedownHandler.bind(this))}return e.prototype.mousedownHandler=function(e){e.preventDefault(),this.el.style.zIndex=++this.teller,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this._mousemoveHandler=this.mousemoveHandler.bind(this),this._mouseupHandler=this.mouseupHandler.bind(this),window.addEventListener("mousemove",this._mousemoveHandler),window.addEventListener("mouseup",this._mouseupHandler)},e.prototype.mousemoveHandler=function(e){this.el.style.border="4px solid #3ab3da",this.el.style.left=e.x-this.offsetX+"px",this.el.style.top=e.y-this.offsetY+"px",e.y-this.offsetY<=100&&(console.log("bamanamm"),this.el.style.top="100px"),e.x-this.offsetX<=280&&(console.log("bamanamm"),this.el.style.left="300px"),e.x-this.offsetX>=$(window).width()-240&&(console.log("bamanamm"),this.el.style.left=$(window).width()-220+"px"),e.y-this.offsetY>=$(window).height()-240&&(console.log("bamanamm"),this.el.style.top=$(window).height()-220+"px")},e.prototype.mouseupHandler=function(e){this.el.style.border="0px";var t=document.URL.split("id=")[1];$.ajax({type:"POST",url:"index.php?page=drawing&id="+t,data:"id="+this.el.classList[2]+"&x="+(e.x-this.offsetX)+"&y="+(e.y-this.offsetY)+"&action=Update Position",success:function(){}}),window.removeEventListener("mousemove",this._mousemoveHandler),window.removeEventListener("mouseup",this._mouseupHandler)},e}()},{}]},{},[1]);