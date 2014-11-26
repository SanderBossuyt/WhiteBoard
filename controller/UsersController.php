<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

require_once WWW_ROOT .'phpass/Phpass.php';
require_once WWW_ROOT . 'php-image-resize' . DS . 'ImageResize.php';

class UsersController extends Controller {
private $userDAO;

	function __construct() {
		$this->userDAO = new UserDAO();
	}


	public function register() {

		$errors = array();
		if(!empty($_POST)) {

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
	
				if(empty($errors['image'])){
					$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $_FILES["image"]["name"]);
					$pieces = explode($name.'.', $_FILES["image"]["name"])[1];
					
					$imageresize = new Eventviva\ImageResize($_FILES['image']['tmp_name']);
					$imageresize->save(WWW_ROOT . 'uploads' . DS . $name.".".$pieces);
					$imageresize->resizeToHeight(60);
					$imageresize->save(WWW_ROOT . 'uploads' . DS . $name."_th.".$pieces);
	
					$imageresize400 = new Eventviva\ImageResize($_FILES['image']['tmp_name']);
					$imageresize400->save(WWW_ROOT . 'uploads' . DS . $name.".".$pieces);
					$imageresize400->resizeToHeight(400);
					$imageresize400->save(WWW_ROOT . 'uploads' . DS . $name.".".$pieces);
				}
			}

			if(empty($_POST['regemail'])) {
				$errors['regemail'] = 'Please enter your email';
			} else {
				$existing = $this->userDAO->selectByEmail($_POST['regemail']);
				$this->set('existing',$existing);
				if(!empty($existing)) {
					$errors['regemail'] = 'Email address is already in use';
				}
			}

			if(empty($_POST['regpassword'])) {
				$errors['regpassword'] = 'Please enter a password';
			}

			if(empty($_POST['regname'])) {
				$errors['regname'] = 'Please enter a name';
			}

			if(empty($_POST['reglastname'])) {
				$errors['reglastname'] = 'Please enter a last name';
			}

			if(empty($_POST['regusername'])) {
				$errors['regusername'] = 'Please enter a username';
			}

			if($_POST['confirm_password'] != $_POST['regpassword']) {
				$errors['confirm_password'] = 'Passwords do not match';
			}

			if(empty($errors)) {
				$hasher = new \Phpass\Hash;
				$passwordHash = $hasher->hashPassword($_POST['regpassword']);
				
				$user = array(
						"email"=>$_POST["regemail"],
						"password"=>$passwordHash,
						"name"=>$_POST['regname'],
						"lastname"=>$_POST['reglastname'],
						"picture"=>$name,
						"extension"=>$pieces,
						"username"=>$_POST["regusername"],
					);

				$insertedUser = $this->userDAO->insert($user);
				$this->set('insertedUser', $insertedUser);
				if(!empty($insertedUser)) {
					$_SESSION['info'] = 'Registration successful';
					header('Location: index.php');
					exit();
				} else {
					$_SESSION['error'] = 'Registration failed';
				}
			} else {
				$_SESSION['error'] = 'Volledig het formulier';
				$this->set('errors', $errors);
			}	
		}
	}

public function login() {
	$errors = array();
	if(!empty($_POST)) {
		if(empty($_POST['email'])) {
			$errors['email'] = 'Please enter your email';
		}

		if(empty($_POST['password'])) {
			$errors['password'] = 'Please enter your password';
		}

		if(empty($errors)) {
			$existing = $this->userDAO->selectByEmail($_POST['email']);
			$this->set('existing',$existing);
			
			if(!empty($existing)) {
				$hasher = new \Phpass\Hash;
				
				if ($hasher->checkPassword($_POST['password'], $existing['password'])) {
					 $_SESSION['user'] = $existing;
					 $_SESSION['info'] = 'logged in';
					 header('Location: index.php?page=detail');
					 exit();
				} else {
					$_SESSION['error'] = 'onbekende username / wachtwoord';
				}
			} else {
				$_SESSION['error'] = 'onbekende username / wachtwoord';
			}
		} else {
				$_SESSION['error'] = 'onbekende username / wachtwoord';
			}
		}
		$this->set('errors',$errors);
	}


	public function logout() {
		unset($_SESSION['user']);
	}

}