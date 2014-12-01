<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<meta name="author" content="Sander Bossuyt  + Gilles Van Den Ven">
    <meta name="description" content="whiteboard">
    <meta name="keywords" content="devine cpIII">
    <link href="css/screen.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="fonts/bebas/stylesheet.css"/>
    <script type="text/javascript" src="scripts/modernizr.custom.92176.js"></script>
	<title>Whiteboard - Scrum</title>

</head>
<body>

<header>


      
<?php
    if (!empty($_SESSION['user'])) {
    ?>
        <p class="signed">Signed in as <?php echo $_SESSION['user']['username'];?> - <a href="index.php?page=logout" class="navbar-link">Logout</a></p>
         <?php
         echo "<img src=\"uploads/";
         echo $_SESSION['user']['picture'];
         echo "_th.";
         echo $_SESSION['user']['extension'];
         echo "\"/>";
    }
?>
</header>    
<?php if(!empty($_SESSION['info'])): ?><div class="info box"><?php echo $_SESSION['info'];?></div><?php endif; ?>
<?php if(!empty($_SESSION['error'])): ?><div class="error box"><?php echo $_SESSION['error'];?></div><?php endif; ?>

<?php echo $content; ?>
<script src="js/jquery.min.js"></script>
<script src="js/script.dist.js"></script>
</body>
</html>