
module.exports = (function(){

	var NewBoard = require('./NewBoard.js');
	var Detail = require('./DetailPage.js');
	
	function Invite() {

		

		$('#newInvite').submit(function(event) {

			event.preventDefault();

			var data = {

    			invite : $(' .invite ').val(),
    			action : "Invite"

			};


			if($(' .invite ').val() !== "" ){

				$.ajax({
					type:"POST",
					url:"index.php?page=detail&id=" + document.URL.split("id=")[1],
					data: {newInviteAdd: data},
					success:function(response){ 

							
							if (response.message) {
								$('<p>', {
									class: response.status,
	                			text: response.message
	            				}).appendTo($('.javascriptmessage'));
			    				
			    				
			    				setTimeout(function () {
	      							$('.infomessageJS').remove();
	      							$('.errormessageJS').remove();
	    						}, 2000);

							}else{
								var splitOne = (document.URL.split("id=")[1]);

		

								$.get( "index.php?page=detail", { action: "loadInvites", id: splitOne } )
									.done(function( data ) {

										$("#users").empty();

								 		$("#users").html($( data ).find('#users').contents());
									

								});

								$('<p>', {
									class: 'infomessageJS',
	                				text: "invite succesfully"
	            					}).appendTo($('.javascriptmessage'));
			    					
			    					
			    					setTimeout(function () {
	      								$('.infomessageJS').remove();
	      								
	    							}, 2000);
		
								window.history.pushState("","","index.php?page=detail&id=" + splitOne);

							}

			    	},
			    	complete: function() {
			    		new Detail();
			    		new NewBoard();
	        		
	    			}
				});
			}


			
		});
	}


	return Invite;
})();