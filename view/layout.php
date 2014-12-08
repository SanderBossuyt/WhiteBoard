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

        <nav>

            <header class="header">

                <h2>Navigatie</h2>

            </header>

            <ul>
                <li><a href="index.php?page=detail">Boards</a></li>
                <li><a href="index.php?page=expl">How to use sketch</a></li>
                <li><a href="index.php?page=detail">Settings</a></li>
            </ul>
        
            <div id="userinfo">
                <p class="signed">Signed in as <span><?php echo $_SESSION['user']['username'];?></span></p>
                 <?php
                     echo "<img src=\"uploads/";
                     echo $_SESSION['user']['picture'];
                     echo "_th.";
                     echo $_SESSION['user']['extension'];
                     echo "\"/>";
                ?>
                <p><a id="logout" href="index.php?page=logout" class="navbar-link">Logout</a></p>
            </div>

        </nav>

<?php } ?>
<div class="dummy"></div>
    
</header>    


<?php echo $content; ?>
<script src="js/bean.min.js"></script>
<script src="js/jquery.min.js"></script>
<script src="js/script.dist.js"></script>
</body>
</html>