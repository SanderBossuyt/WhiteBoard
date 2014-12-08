<?php
session_start();

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$routes = array(
    'home' => array(
    	'controller' => 'WhiteBoards',
    	'action' => 'index'
	),
    'detail' => array(
    	'controller' => 'WhiteBoards',
    	'action' => 'detail'
	),
    'drawing' => array(
        'controller' => 'WhiteBoards',
        'action' => 'drawing'
    ),
    'register' => array(
        'controller' => 'Users',
        'action' => 'register'
    ),
    'login' => array(
        'controller' => 'Users',
        'action' => 'login'
    ),
    'logout' => array(
        'controller' => 'Users',
        'action' => 'logout'
    ),
    'expl' => array(
        'controller' => 'WhiteBoards',
        'action' => 'expl'
    ),
    'sketch_expl' => array(
        'controller' => 'WhiteBoards',
        'action' => 'sketch_expl'
    ) 
);

if(empty($_GET['page'])) {
    $_GET['page'] = 'home';
}
if(empty($routes[$_GET['page']])) {
    header('Location: index.php');
    exit();
}

$route = $routes[$_GET['page']];
$controllerName = $route['controller'] . 'Controller';

require_once WWW_ROOT . 'controller' . DS . $controllerName . ".php";

$controllerObj = new $controllerName();
$controllerObj->route = $route;
$controllerObj->filter();
$controllerObj->render();