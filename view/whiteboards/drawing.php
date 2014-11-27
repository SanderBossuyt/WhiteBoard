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

					
							
				}
			}
		?>


</div>
