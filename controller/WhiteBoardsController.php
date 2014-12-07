<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'WhiteBoardDAO.php';
require_once WWW_ROOT . 'dao' . DS . 'ItemDAO.php';
require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

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


			}else if($_POST["action"] == 'upload image'){

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

					//size shizzel
					if(empty($errors['image'])){
						$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $_FILES["image"]["name"]);
						$pieces = explode($name.'.', $_FILES["image"]["name"])[1];
						
						$imageresize = new Eventviva\ImageResize($_FILES['image']['tmp_name']);
						$imageresize->save(WWW_ROOT . 'uploads' . DS . 'board' . DS . 'images' . DS . $name.".".$pieces);
						$imageresize->resizeToHeight(60);
						$imageresize->save(WWW_ROOT . 'uploads' . DS . 'board' . DS . 'images' . DS . $name."_th.".$pieces);
		
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
							"x"=>400,
							"y"=>200
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

				$size = array();
	
				if(!empty($_FILES['video'])){
					if(!empty($_FILES['video']['error'])){
						$errors['video'] = "the video could not be uploaded";
					}
		
					if(empty($errors['video'])){
						$size = getimagesize($_FILES['video']['tmp_name']);
						if(empty($size)){
							$errors['video'] = "please upload an video";
						}
					}
		
					if(empty($errors['video'])){
						if($size[0] != $size[1]){
							$errors['video'] = "video should be square";
						}
					}

					//size shizzel
					if(empty($errors['video'])){
						
						$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $_FILES["video"]["name"]);
						$pieces = explode($name.'.', $_FILES["video"]["name"])[1];
						
					}	
				}

				if(empty($errors)) {

					$content=$name.".".$pieces;
					
					$video = array(
							"content"=>$content,
							"origin"=>"video",
							"board_id"=>$board['id'],
							"x"=>400,
							"y"=>200
						);

					$insertedimage = $this->itemDAO->insert($video);
					
					if(!empty($insertedimage)) {
						$_SESSION['info'] = 'your video is added';
						//header('Location: index.php?page=drawing&amp;id' + $board['id']);
						//exit();
					
					} else {
						$_SESSION['error'] = 'video add failed';
					}
				} 

				$this->set('errors', $errors);

			}
	}
	
	$items = $this->whiteboardDAO->selectBoardItems($board['id']);
	$this->set('items', $items);
}

}











