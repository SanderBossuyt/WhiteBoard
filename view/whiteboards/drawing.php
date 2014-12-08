<div class="leftbalk">

    <p><span> Board : </span><?php echo $board['name'] ?></p>
    <p><span> aangemaakt op : </span><?php echo $board['creation_date'] ?></p>
	
	<form action="index.php?page=drawing&amp;id=<?php echo $_GET['id']; ?>" method="post" class="form-horizontal" id="formuploadpostit" enctype="multipart/form-data">
            
            <label>Postit:</label> 

            <div class="input text">
                <label>
                    <input type="text" class="postitje" name="postit" value="<?php if(!empty($_POST['postit'])) echo $_POST['postit'];?>" placeholder="postit content" />
                    <p class="error<?php if(empty($errors['postit'])) echo ' hidden';?>" data-for="postit">Please enter your postits content</p>
                </label>
            </div>
                    
            <div class="form-group">
                <div><input type="submit" name="action" value="upload postit" class="uploadpostit"></div>
            </div>
        
    </form>


    <div class="dummy"></div>


      <form action="index.php?page=drawing&amp;id=<?php echo $_GET['id']; ?>" method="post" id="formuploadimage" enctype="multipart/form-data">
                <div class="form-group<?php if(!empty($errors['image'])) echo ' has-error'; ?>">
                    <label for="addImageImage">Image:</label> <br/>    
                    
                    <input type="file" name="image" id="addImageImage" class="form-control" value="<?php if(!empty($_POST['image'])) echo $_POST['image'];?>" />
                    </br>
                    <span class="error hidden"><?php
                        if(empty($errors['image'])) echo 'Please select a square image';
                        else echo $errors['image'];
                    ?>
                    </span>      
                </div>
                
                <input type="submit" name="action" value="upload image" class="uploadimage">
     </form>


    <div class="dummy"></div>


	<form action="index.php?page=drawing&amp;id=<?php echo $_GET['id']; ?>" method="post" class="form-horizontal" id="formuploadvideo" enctype="multipart/form-data">
            
            <div class="input-text">
                
                <label for="addimage">Upload Video:</label>        
                    <input type="file" name="video" id="addvideo" value="<?php if(!empty($_POST['video'])) echo $_POST['video'];?>" />
                    <span class="error"<?php if(empty($error['video'])) echo 'style="display: none;"';?>><?php
                    if(empty($error['video'])) echo 'gelieve een video te selecteren';
                    else echo $error['video'];
                    ?></span> 
                
            </div>
                    
            
                <div><input type="submit" name="action" value="upload video" class="uploadvideo"></div>
            
        
    </form>

    <div class="dummy"></div>

    <div id="back_button"><a href="index.php?page=detail">Go back</a></div>

</div>


<br />

<div class="whiteboard">

		<?php
    		if (!empty($items)) {
				foreach($items as $item) {
					if ($item['origin'] == "postit") {

						echo "<div class=\"item postit {$item['id']}\" style=\"left:{$item['x']}px; top:{$item['y']}px\">";
							echo "<p>";
							echo "{$item['content']}";
							echo "</p>";
						echo "</div>";

					}else if ($item['origin'] == "image"){

						echo "<div class=\"item picture {$item['id']}\" style=\"left:{$item['x']}px; top:{$item['y']}px\">";
						
                                echo "<img draggable=\"true\" width=\"200\" height=\"200\" src=\"uploads/board/images/";
                                    echo $item['content'];
                                    
                                echo "\"/>";
						echo "</div>";

					}else if($item['origin'] == "video"){

						echo "<div class=\"item video {$item['id']}\" style=\"left:{$item['x']}px; top:{$item['y']}px\">";
						echo "<video width=\"320\" height=\"240\" controls>";
  						echo "<source src=\"uploads/board/videos/{$item['content']}\" type=\"video/mp4\">";
						echo "</video>";
						echo "</div>";
						
					}
							
				}
			}
		?>


</div>
<div id="achtergrond_whiteboard"></div>
