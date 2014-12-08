<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteBoardDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ItemDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'InviteDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

class WhiteBoardsController extends Controller {
private $whiteboardDAO;
private $itemDAO;
private $inviteDAO;
private $userDAO;

function __construct() {
	$this->whiteboardDAO = new WhiteBoardDAO();
	$this->itemDAO = new ItemDAO();
	$this->inviteDAO = new InviteDAO();
	$this->userDAO = new UserDAO();
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
			}else if($_POST["action"] == 'Invite'){

				if(empty($_POST['invite'])) {
					$errors['invite'] = 'Please enter an invite';
				}else{

					$idByName = $this->userDAO->selectByName($_POST["invite"]);

					


					

					if($idByName == false){

						$errors['invite'] = 'Please enter an valid name';

					}else{
						$nameControle = $this->inviteDAO->selectByName($idByName["id"]);
						if (count($nameControle) >= 1) {
						$errors['invite'] = 'Please enter an valid name';

						}
					}
				}

				
				

				if(empty($errors)) {
					
					$invite = array(
							"user_idsender"=>$_SESSION["user"]["id"],
							"board_id"=>$_GET["id"],
							"user_idreceiver"=>$idByName["id"]
						);

					$insertedinvite = $this->inviteDAO->insert($invite);
					
					if(!empty($insertedinvite)) {
						$_SESSION['info'] = 'your invite is added';
						header('Location: index.php?page=detail');
						exit();
					
					} else {
						$_SESSION['error'] = 'invite add failed';
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

		if (!empty($_POST["item"]["action"])) {

			if ($_POST["item"]["action"] == 'Update Position') {

				if(empty($_POST["item"]['x'])) {
					$errors["item"]['x'] = 'Please enter a x';
				}

				if(empty($_POST["item"]['y'])) {
					$errors["item"]['y'] = 'Please enter a y';
				}

				if(empty($_POST["item"]['id'])) {
					$errors["item"]['id'] = 'Please enter an id';
				}


				if(empty($errors)) {
					
					$pos = array(
							"x"=>$_POST["item"]['x'],
							"y"=>$_POST["item"]['y'],
							"id"=>$_POST["item"]['id']
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
	
			}
		}
			 if($_POST["action"] == 'upload postit'){
			
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

			//image/video shizzel
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











