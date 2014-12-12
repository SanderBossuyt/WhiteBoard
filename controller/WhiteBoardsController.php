<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteBoardDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ItemDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'InviteDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';
require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

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

		if(!empty($_GET['id'])) {

			$board = $this->whiteboardDAO->selectBoard($_GET['id']);
        		
    		if(empty($board)) {
        		$this->redirect("index.php");
    		}

        }
        
		
		$this->set('inviteBoards', $this->whiteboardDAO->selectByInvite($_SESSION['user']['id']));

		$errors = array();

		if (empty($_SESSION["user"])) {
			header('Location: index.php?page=index');
		}

		$boards = $this->whiteboardDAO->selectByUser($_SESSION["user"]['id']);
		
		//================HIER===========niet meer nodig zie hieronder 5 lijnen verder

		//$invite_users = $this->inviteDAO->selectAllInvitesByBoardId($_GET['id']);
		//$this->set('invite_users', $invite_users);

		if (!empty($_GET["action"])) {
			if ($_GET["action"] == "loadInvites") {
				$invite_users = $this->inviteDAO->selectAllInvitesByBoardId($_GET['id']);
				$this->set('invite_users', $invite_users);
			}
		}

		if (!empty($_POST)) {

			if (!empty($_POST["newBoardAdd"]["action"])) {
	
				if ($_POST["newBoardAdd"]["action"] == 'Add New Board') {
	
					if(empty($_POST["newBoardAdd"]['boardname'])) {
						$errors["newBoardAdd"]['boardname'] = 'Please enter a name';
					}
	
					if(empty($errors)) {
					
						$board = array(
								"name"=>$_POST["newBoardAdd"]["boardname"],
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

			

			if($_POST["action"] == 'Invite'){

				if(empty($_POST['invite'])) {
					$errors['invite'] = 'Please enter an invite';
				}else{
					$idByName = $this->userDAO->selectByName($_POST["invite"]);

					if($idByName == false){
						$errors['invite'] = 'Please enter an valid name';
					}else{
						$nameControle = $this->inviteDAO->selectByName($idByName["id"],$_GET["id"]);
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

	public function sketch_expl() {
		//nothing to do in php with this page ;)
	}

	public function drawing() {

		if(empty($_GET['id'])) {
            $this->redirect("index.php");
        }
        $board = $this->whiteboardDAO->selectBoard($_GET['id']);
        if(empty($board)) {
            $this->redirect("index.php");
        }

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
			}else if (!empty($_POST["newPostit"]["action"])) {

				if($_POST["newPostit"]["action"] == 'upload postit'){
				
					if(empty($_POST["newPostit"]['postit'])) {
						$errors["newPostit"]['postit'] = 'Please enter a name';
					}

					if(empty($errors)) {
						
						$postit = array(
							"content"=>$_POST["newPostit"]["postit"],
							"origin"=>"postit",
							"board_id"=>$board['id'],
							"x"=>400,
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

				}
			}else if(!empty($_POST["action"])){

				if($_POST["action"] == 'upload image'){
	
					$size = array();
			
						if(!empty($_FILES['image'])){
							if(!empty($_FILES['image']['error'])){
								$errors['image'] = "the image could not be uploaded";
							}
				
							if(empty($errors['image'])){
								$size = getimagesize($_FILES['image']['tmp_name']);
								if(empty($size)){
									$errors['image'] = "please upload an image";
								}
							}
				
							if(empty($errors['image'])){
								if($size[0] != $size[1]){
									$errors['image'] = "image should be square";
								}
							}
	
							//size
							if(empty($errors['image'])){
	
								$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $_FILES["image"]["name"]);
								$pieces = explode($name.'.', $_FILES["image"]["name"])[1];
								
								$imageresize400 = new Eventviva\ImageResize($_FILES['image']['tmp_name']);
								$imageresize400->save(WWW_ROOT . 'uploads' . DS . 'board' . DS . 'images' . DS . $name.".".$pieces);
								$imageresize400->resizeToHeight(400);
								$imageresize400->save(WWW_ROOT . 'uploads' . DS . 'board' . DS . 'images' . DS . $name.".".$pieces);
							}	
						}
	
						if(empty($errors)) {
	
							$content=$name.".".$pieces;
							
							$image = array(
									"content"=>$content,
									"origin"=>"image",
									"board_id"=>$board['id'],
									"x"=>500,
									"y"=>300
								);
	
							$insertedimage = $this->itemDAO->insert($image);
							
							if(!empty($insertedimage)) {
								$_SESSION['info'] = 'your image is added';
								//header('Location: index.php?page=drawing&amp;id' + $board['id']);
								//exit();
							
							} else {
								$_SESSION['error'] = 'image add failed';
							}
						} 
	
						$this->set('errors', $errors);
	
				}else if($_POST["action"] == 'upload video'){
	
					if(!empty($_FILES["video"])){
	
						if(!empty($_FILES['video']['error'])){
							$errors['video'] = "the video could not be uploaded";
						}
	
	
						if(empty($errors['video'])){
	
							$type = ($_FILES["video"]["type"]);
		    	        	$path = ($_FILES["video"]["tmp_name"]);
		    	        	$size = filesize($path);
	
		    	        	if($size <=100000000 && $type == "video/mp4"){
	
		    	                $filename = $_FILES["video"]["name"];
		    	                $newPath = WWW_ROOT . 'uploads' . DS . 'board' . DS . 'videos' . DS . $filename;
	
		    	                move_uploaded_file($path,$newPath);
	
		    	                $video = array(
									"content"=>$filename,
									"origin"=>"video",
									"board_id"=>$board['id'],
									"x"=>400,
									"y"=>200
								);
								$insertedvideo = $this->itemDAO->insert($video);
		    	        	}
						}
					}
	
		    	    if(empty($errors)) {
							
						if(!empty($insertedvideo)) {
	
							$_SESSION['info'] = 'your video is added';
						
						} else {
	
							$_SESSION['error'] = 'video add failed';
	
						}
					}
	
					$this->set('errors', $errors);
	
				}else if($_POST["action"] == 'delete board'){

					$this->whiteboardDAO->delete_boardEvent($_GET["id"]);
					$this->inviteDAO->delete_invitesEvent($_GET["id"]);
					$this->itemDAO->delete_itemsEvent($_GET["id"]);
            		$this->redirect("index.php?page=index");
            		
				}
			}
		}
		
		$items = $this->whiteboardDAO->selectBoardItems($board['id']);
		$this->set('items', $items);
	}

}






