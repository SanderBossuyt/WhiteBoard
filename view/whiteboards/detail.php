<div id="home">

	<div id="my_boards">
		<h1>My boards</h1>

		<div class="alles">

			<div class="boards">
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
							<p>awwwww, seems like you have no boards yet...</p>
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
			    <p class="error<?php if(empty($errors['boardname'])) echo ' hidden';?>" data-for="boardname">Please enter your awesome boards name</p>
			</form>
		</div>
	</div>

	<div id="board_users">
		
		<h1>Board users</h1>
		
		<div id="users">

			
			
		</div>

	</div>
</div>
<div id="achtergrond_home"></div>