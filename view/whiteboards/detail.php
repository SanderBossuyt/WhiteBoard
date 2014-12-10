<div id="home">

	<div id="my_boards">
		<h1>My boards</h1>
		<div class="alles">
			<div class="boards">
			<div class="javascriptmessage"></div>
				<ul>
					<?php
			    		if (!empty($boards)) {
							foreach($boards as $board) {

									echo "<li>";
										echo "<a  href=\"index.php?page=drawing&amp;id={$board['id']}\">";
											echo "{$board['name']}";
										echo "</a>";
									echo "</li>";
							}
						}else{
							?>
							<p>
								awwwww, seems like you have no selfmade boards yet...
							</p>
						<?php
						}
						?>
				</ul>
				<ul>
					<hr />
						<h4>invite boards</h4>
						
						<?php
			    		if (!empty($inviteBoards)) {
							foreach($inviteBoards as $inviteBoard) {

									echo "<li>";
										echo "<a  href=\"index.php?page=drawing&id={$inviteBoard['id']}\">";
											echo "{$inviteBoard['name']}";
										echo "</a>";
									echo "</li>";
							}
						}else{
							?>
							<p>
								awwwww, seems like you have no invite boards yet...
							</p>
						<?php
						}
						?>
				</ul>
			</div>

			<br />

			<form method="post" id="newBoard" action="index.php?page=detail" class="form-inline">

			    <div class="form-group">
					<div class="input text">
			            <label>
			                <span>name your awesome board:</span>
			                <input type="text" class="name" name="boardname" value="<?php if(!empty($_POST['boardname'])) echo $_POST['boardname'];?>" />
			            </label>
			        </div>
			    </div>
			    <input id="add_board" type="submit" name="action" value="Add New Board" class="btn btn-default" />
			    <div class="dummy"></div>
			    <p id="errorboard" class="error<?php if(empty($errors['boardname'])) echo ' hidden';?>" data-for="boardname">Please enter your awesome boards name</p>

			</form>
		</div>
	</div>

	<div id="board_users">
		<h1>Board users</h1>
		<div id="users">
			<h3></h3>

			<?php
			if(!empty($_GET ["id"])){ 

		    	if (!empty($invite_users)) {
					foreach($invite_users as $invite_user) {
						
						echo "<li>";
							echo "<p>";
								echo "{$invite_user['names']}";
							echo "</p>";
						echo "</li>";

					}
				}else{
				?>
					<p>
						awwwww, seems like you have no invites yet...
					</p>
				<?php
				}
				?>	

				<form method="post" id="newInvite" action="index.php?page=detail&amp;id=<?php echo $_GET['id'];?>" class="form-inline">

				    <div class="form-group">
						<div class="input text">
				            <label>
				                <span>name your awesome invite:</span>
				                <input type="text" class="invite" name="invite" value="<?php if(!empty($_POST['invite'])) echo $_POST['invite'];?>"/>
				            </label>
				        </div>
				    </div>
				    <input id="add_invite" type="submit" name="action" value="Invite" class="btn btn-default" />
				    <div class="dummy"></div>
				    <p id="errorInvite" class="error<?php if(empty($errors['invite'])) echo ' hidden';?>" data-for="invite">Please enter your awesome invites name</p>

				</form>
			<?php
			}
			?>
			
		</div>
	</div>
</div>

<div id="achtergrond_home"></div>