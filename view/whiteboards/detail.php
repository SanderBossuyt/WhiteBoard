<h1>homepagina van <?php echo $_SESSION["user"]["name"]?> <?php echo $_SESSION["user"]["lastname"]?></h1>

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
				<p>your boards are empty</p>
				<?php
			}
		?>
	</ul>
</div>


<form method="post" action="index.php?page=detail" class="form-inline">
    <div class="form-group">
		<div class="input text">
            <label>
                <span>name of the new board:</span>
                <input type="text" name="boardname" value="<?php if(!empty($_POST['boardname'])) echo $_POST['boardname'];?>" />
                <p class="error<?php if(empty($errors['boardname'])) echo ' hidden';?>" data-for="boardname">Please enter your new boards name</p>
            </label>
        </div>
    </div>
    <input type="submit" name="action" value="Add New Board" class="btn btn-default" />
</form>