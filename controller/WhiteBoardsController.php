<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteBoardDAO.php';


class WhiteBoardsController extends Controller {
private $whiteboardDAO;

function __construct() {
	$this->whiteboardDAO = new WhiteBoardDAO();
}

	public function index() {
		if (!empty($_SESSION["user"])) {
			header('Location: index.php?page=detail');
		}
	}
	
	
	public function detail() {

		$errors = array();


		if (empty($_SESSION["user"])) {
			header('Location: index.php?page=index');
		}

		



		if (!empty($_POST)) {
			if ($_POST["action"] == 'Add New Board') {

				if(empty($_POST['boardname'])) {
					$errors['boardname'] = 'Please enter a name';
				}

				if(empty($errors)) {
				
				$board = array(
						"name"=>$_POST["boardname"],
						"user_id"=>$_SESSION["user"]["id"]
					);

				$insertedBoard = $this->whiteboardDAO->insert($board);
				$this->set('insertedBoard', $insertedBoard);
				if(!empty($insertedBoard)) {
					$_SESSION['info'] = 'your board is added';
					header('Location: index.php?page=detail');
					exit();
				} else {
					$_SESSION['error'] = 'board add failed';
				}
			} 

				$this->set('errors', $errors);
			}
		}

		$boards = $this->whiteboardDAO->selectByUser($_SESSION["user"]['id']);
		$this->set('boards', $boards);

	}
	
	public function expl() {
		
		
	
	}

	public function drawing() {
	$board = $this->whiteboardDAO->selectBoard($_GET["id"]);
		$this->set('board', $board);
	
	}

}














