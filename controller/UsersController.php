<?php
require_once WWW_ROOT . 'controller' . DS . 'Controller.php';
require_once WWW_ROOT . 'dao' . DS . 'UserDAO.php';

require_once WWW_ROOT .'phpass/Phpass.php';

class UsersController extends Controller {
private $userDAO;

	function __construct() {
		$this->userDAO = new UserDAO();
	}


	public function register() {

		$errors = array();
		if(!empty($_POST)) {

			$size = array();

			if(empty($_POST['regemail'])) {
				$errors['regemail'] = 'Vul aub uw mailadres in';
			} else {
				$existing = $this->userDAO->selectByEmail($_POST['regemail']);
				$this->set('existing',$existing);
				if(!empty($existing)) {
					$errors['regemail'] = 'het mailadres is reeds in gebruik';
				}
			}

			if(empty($_POST['regpassword'])) {
				$errors['regpassword'] = 'Vul aub uw wachtwoord in';
			}

			if(empty($_POST['regname'])) {
				$errors['regname'] = 'Vul aub uw voornaam in';
			}

			if(empty($_POST['reglastname'])) {
				$errors['reglastname'] = 'Vul aub uw naam in';
			}

			if($_POST['confirm_password'] != $_POST['regpassword']) {
				$errors['confirm_password'] = 'De wachtwoorden komen niet overeen';
			}

			if(empty($errors)) {
				$hasher = new \Phpass\Hash;
				$passwordHash = $hasher->hashPassword($_POST['regpassword']);
				
				$user = array(
						"email"=>$_POST["regemail"],
						"password"=>$passwordHash,
						"name"=>$_POST['regname'],
						"lastname"=>$_POST['reglastname']
					);

				$insertedUser = $this->userDAO->insert($user);
				$this->set('insertedUser', $insertedUser);
				if(!empty($insertedUser)) {
					$_SESSION['info'] = 'U bent geregistreerd';	
				} else {
					$_SESSION['error'] = 'Registratie niet gelukt';
				}
			} else {
				$_SESSION['error'] = 'Volledig het formulier aub';
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
					unset($_SESSION['videos']);
					$_SESSION['info'] = 'logged in';
					 header('Location: index.php');
				} else {
					$_SESSION['error'] = 'onbekend mailadres / wachtwoord';
				}
			} else {
				$_SESSION['error'] = 'onbekend mailadres / wachtwoord';
			}
		} else {
				$_SESSION['error'] = 'onbekend mailadres / wachtwoord';
			}
		}
		$this->set('errors',$errors);
	}


	public function logout() {
		unset($_SESSION['user']);
	}

}