!function e(t,i,n){function s(a,r){if(!i[a]){if(!t[a]){var l="function"==typeof require&&require;if(!r&&l)return l(a,!0);if(o)return o(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var u=i[a]={exports:{}};t[a][0].call(u.exports,function(e){var i=t[a][1][e];return s(i?i:e)},u,u.exports,e,t,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)s(n[a]);return s}({1:[function(e){!function(){function t(){var e=document.URL.split("?page=")[1],t=e.split("&")[0];new o,new a,"register"===t&&(new n,new s),"drawing"===t&&new i(document.querySelector(".whiteboard")),$("#formuploadpostit").submit(function(e){e.preventDefault();var t={postit:$(" .postitje ").val(),action:"upload postit"};$.ajax({type:"POST",url:"index.php?page=drawing&id="+document.URL.split("id=")[1],data:{newPostit:t},success:function(e){var t=e.split("<br />")[1],n=t.split("<script")[0];console.log(n),$(".whiteboard").html(n),new i(document.querySelector(".whiteboard"))}})}),$("#formuploadimage").submit(function(e){e.preventDefault(),$.ajax({url:"index.php?page=drawing&id="+document.URL.split("id=")[1],type:"POST",data:new FormData(this),contentType:!1,cache:!1,processData:!1,success:function(e){console.log(e);var t=e.split("<br />")[1],n=t.split("<script")[0];$(".whiteboard").html(n),new i(document.querySelector(".whiteboard"))}})}),$("#formuploadvideo").submit(function(e){e.preventDefault(),$.ajax({url:"index.php?page=drawing&id="+document.URL.split("id=")[1],type:"POST",data:new FormData(this),contentType:!1,cache:!1,processData:!1,success:function(e){console.log(e);var t=e.split("<br />")[1],n=t.split("<script")[0];$(".whiteboard").html(n),new i(document.querySelector(".whiteboard"))}})})}var i=e("./classes/Application.js"),n=e("./classes/FormValidationRegister.js"),s=e("./classes/FormImageValidation.js"),o=e("./classes/DetailPage.js"),a=e("./classes/NewBoard.js");t()}()},{"./classes/Application.js":2,"./classes/DetailPage.js":3,"./classes/FormImageValidation.js":4,"./classes/FormValidationRegister.js":5,"./classes/NewBoard.js":8}],2:[function(e,t){t.exports=function(){function t(e){this.whiteboard=e;for(var t=this.whiteboard.querySelectorAll(".item"),i=0;i<t.length;i++)this.createPostit(t[i])}var i=e("./Item");return t.prototype.createPostit=function(e){var t=new i(e);bean.on(t,"change",this.itemkeChangeHandler.bind(this)),bean.on(t,"delete",this.itemkeDeleteHandler.bind(this))},t.prototype.itemkeChangeHandler=function(e){var t=document.URL.split("id=")[1],i={id:e.el.classList[2],x:e.el.style.left,y:e.el.style.top,action:"Update Position"};$.ajax({type:"POST",url:"index.php?page=drawing&id="+t,data:{item:i},success:function(){}})},t.prototype.itemkeDeleteHandler=function(e){console.log("delete item");var i=document.URL.split("id=")[1],n={id:e.el.classList[2],action:"delete item"};console.log(n),$.ajax({type:"POST",url:"index.php?page=drawing&id="+i,data:{deleteItem:n},success:function(e){var i=e.split("<br />")[1],n=i.split("<script")[0];$(".whiteboard").html(n),console.log(e.querySelector(".whiteboard")),new t(document.querySelector(".whiteboard"))}})},t}()},{"./Item":7}],3:[function(e,t){t.exports=function(){function t(){n=document.querySelectorAll("li");for(var e=2;e<n.length;e++)n[e].classList.remove("selected"),n[e].addEventListener("click",this.clickHandler.bind(n[e]))}var i=e("./Invite"),n=document.querySelectorAll("li");return t.prototype.clickHandler=function(e){$(this).hasClass("selected")||e.preventDefault();for(var t=2;t<n.length;t++)n[t].classList.remove("selected");var s=this.innerHTML.split("id=")[1].split('">')[0];this.classList.add("selected"),$("#users h3").text($(this).text()),$.get("index.php?page=detail",{action:"loadInvites",id:s}).done(function(e){$("#users").empty(),$("#users").html($(e).find("#users").contents()),new i}),window.history.pushState("","","index.php?page=detail&id="+s)},t}()},{"./Invite":6}],4:[function(e,t){t.exports=function(){function e(){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var e=document.querySelector("input[name=image]");t(e)}}function t(e){new i(e)}function i(e){this.el=e,this.fileInput=e,this.el.addEventListener("change",this.changeHandler.bind(this))}return i.prototype.changeHandler=function(){0===this.fileInput.files[0].type.indexOf("image")&&(this.fileReader=new FileReader,this.fileReader.onload=this.onFileReaderLoad.bind(this),this.fileReader.readAsDataURL(this.fileInput.files[0]))},i.prototype.onFileReaderLoad=function(){this.img=document.createElement("img"),this.img.onload=this.onloadHandler.bind(this),this.img.setAttribute("src",this.fileReader.result)},i.prototype.onloadHandler=function(){var e=this.fileInput.parentNode.querySelector(".error");this.img.width!=this.img.height?e.classList.remove("hidden"):e.classList.add("hidden")},e}()},{}],5:[function(e,t){t.exports=function(){function e(){var e=document.querySelector("input[name=regname]"),t=document.querySelector("input[name=reglastname]"),i=document.querySelector("input[name=regusername]"),n=document.querySelector("input[name=regemail]"),s=document.querySelector("input[name=regpassword]"),o=document.querySelector("input[name=confirm_password]"),a=document.getElementById("Registratie_form");e.addEventListener("blur",this.validateThis),t.addEventListener("blur",this.validateThis),i.addEventListener("blur",this.validateThis),n.addEventListener("blur",this.validateThis),s.addEventListener("blur",this.validateThis),o.addEventListener("blur",this.validateThis),a.addEventListener("submit",function(a){var r=!0;r&=this.validateNotEmpty(e),r&=this.validateNotEmpty(t),r&=this.validateNotEmpty(i),r&=this.validateNotEmpty(n),r&=this.validateNotEmpty(s),r&=this.validateNotEmpty(o),r||a.preventDefault()})}function t(e){var t=e.parentNode.querySelector(".error[data-for='"+e.getAttribute("name")+"']");return e.value.length>0?(t.classList.add("hidden"),!0):(t.classList.remove("hidden"),!1)}return e.prototype.validateThis=function(){t(this)},e}()},{}],6:[function(e,t){t.exports=function(){function t(){$("#newInvite").submit(function(e){e.preventDefault();var t={invite:$(" .invite ").val(),action:"Invite"};""!==$(" .invite ").val()&&$.ajax({type:"POST",url:"index.php?page=detail&id="+document.URL.split("id=")[1],data:{newInviteAdd:t},success:function(e){if(e.message)$("<p>",{"class":e.status,text:e.message}).appendTo($(".javascriptmessage")),setTimeout(function(){$(".infomessageJS").remove(),$(".errormessageJS").remove()},2e3);else{var t=document.URL.split("id=")[1];$.get("index.php?page=detail",{action:"loadInvites",id:t}).done(function(e){$("#users").empty(),$("#users").html($(e).find("#users").contents())}),$("<p>",{"class":"infomessageJS",text:"invite succesfully"}).appendTo($(".javascriptmessage")),setTimeout(function(){$(".infomessageJS").remove()},2e3),window.history.pushState("","","index.php?page=detail&id="+t)}},complete:function(){new n,new i}})})}var i=e("./NewBoard.js"),n=e("./DetailPage.js");return t}()},{"./DetailPage.js":3,"./NewBoard.js":8}],7:[function(e,t){t.exports=function(){function e(e){this.teller=0,this.el=e,this.el.addEventListener("mousedown",this.mousedownHandler.bind(this));var t=document.querySelector(".deleteitem");t.addEventListener("click",this.clickHandler.bind(this))}return e.prototype.clickHandler=function(){event.preventDefault(),console.log("clickHandler"),bean.fire(this,"delete",this)},e.prototype.mousedownHandler=function(e){e.preventDefault(),max=0,$(".item").each(function(){var e=$(this),t=parseInt(e.css("z-index"),10);max=Math.max(max,t)}),this.el.style.zIndex=max+1,this.offsetX=e.offsetX,this.offsetY=e.offsetY,this._mousemoveHandler=this.mousemoveHandler.bind(this),this._mouseupHandler=this.mouseupHandler.bind(this),window.addEventListener("mousemove",this._mousemoveHandler),window.addEventListener("mouseup",this._mouseupHandler)},e.prototype.mousemoveHandler=function(e){this.el.style.border="4px solid #3ab3da",this.el.style.left=e.x-this.offsetX+"px",this.el.style.top=e.y-this.offsetY+"px",e.y-this.offsetY<=100&&(this.el.style.top="100px"),e.x-this.offsetX<=280&&(this.el.style.left="300px"),e.x-this.offsetX>=$(window).width()-240&&(this.el.style.left=$(window).width()-220+"px"),e.y-this.offsetY>=$(window).height()-240&&(this.el.style.top=$(window).height()-220+"px")},e.prototype.mouseupHandler=function(){this.el.style.border="0px",bean.fire(this,"change",this),window.removeEventListener("mousemove",this._mousemoveHandler),window.removeEventListener("mouseup",this._mouseupHandler)},e}()},{}],8:[function(e,t){t.exports=function(){function t(){var n=e("./DetailPage");$(".name").on("blur keyup",i),$("#newBoard").submit(function(e){e.preventDefault();var i={boardname:$(" .name ").val(),action:"Add New Board"};""!==$(" .name ").val()&&$.ajax({type:"POST",url:"index.php?page=detail",data:{newBoardAdd:i},success:function(e){var t=e.split("</h1>")[1],i=t.split("</form")[0];$(".alles").html(i)},complete:function(){$("<p>",{"class":"infomessageJS",text:"your board is added"}).appendTo($(".javascriptmessage")),setTimeout(function(){$(".infomessageJS").remove()},2e3),console.log("new detail"),new n,new t}})})}function i(){var e=$(this);e.val().length>19?s(e,$("#errorboard"),"please fill in a maximum of 19 characters"):n(e,$("#errorboard"))}function n(e,t){t.addClass("hidden")}function s(e,t,i){t.removeClass("hidden"),t.text(i)}e("./DetailPage");return t}()},{"./DetailPage":3}]},{},[1]);