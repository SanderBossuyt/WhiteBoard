<a href="index.php?page=detail">go back</a>
<div class="whiteboard">
	<p> Board : <?php echo $board['name'] ?></p>
	<p> aangemaakt op : <?php echo $board['creation_date'] ?></p>

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
