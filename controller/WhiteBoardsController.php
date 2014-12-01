<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteBoardDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ItemDAO.php';

class WhiteBoardsController extends Controller {
private $whiteboardDAO;
private $itemDAO;

function __construct() {
	$this->whiteboardDAO = new WhiteBoardDAO();
	$this->itemDAO = new ItemDAO();
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

		$boards = $this->whiteboardDAO->selectByUser($_SESSION["user"]['id']);
			

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

		$this->set('boards', $boards);

	}
	
	public function expl() {
		//nothing to do in php with this page ;)
	}

	public function drawing() {


	$board = $this->whiteboardDAO->selectBoard($_GET["id"]);
	$this->set('board', $board);



	if (!empty($_POST)) {
		$errors = array();

			if ($_POST["action"] == 'Update Position') {

				if(empty($_POST['x'])) {
					$errors['x'] = 'Please enter a x';
				}

				if(empty($_POST['y'])) {
					$errors['y'] = 'Please enter a y';
				}

				if(empty($_POST['id'])) {
					$errors['id'] = 'Please enter an id';
				}


				if(empty($errors)) {
					
					$pos = array(
							"x"=>$_POST['x'],
							"y"=>$_POST['y'],
							"id"=>$_POST['id']
						);
	
					$insertPos = $this->whiteboardDAO->update($pos);
					
					if(!empty($insertPos)) {
						$_SESSION['info'] = 'your board is added';
						header('Location: index.php?page=detail');
						exit();
					} else {
						$_SESSION['error'] = 'board add failed';
					}
				}else{
					$this->set('errors', $errors);
				}
	
			}else if($_POST["action"] == 'upload postit'){
			
				if(empty($_POST['postit'])) {
					$errors['postit'] = 'Please enter a name';
				}

				if(empty($errors)) {
					
					$postit = array(
							"content"=>$_POST["postit"],
							"origin"=>"postit",
							"board_id"=>$board['id'],
							"x"=>200,
							"y"=>200
						);

					$insertedpostit = $this->itemDAO->insert($postit);
					
					if(!empty($insertedpostit)) {
						$_SESSION['info'] = 'your postit is added';
						//header('Location: index.php?page=drawing&amp;id' + $board['id']);
						//exit();
					
					} else {
						$_SESSION['error'] = 'postit add failed';
					}
				} 

				$this->set('errors', $errors);


			}else if($_POST["action"] == 'upload image'){

				var_dump("update image");

			}else if($_POST["action"] == 'upload video'){

				var_dump("update vid");

			}
	}
	
	$items = $this->whiteboardDAO->selectBoardItems($board['id']);
	$this->set('items', $items);
}

}











