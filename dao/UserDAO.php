<?php
require_once 'dao/DAO.php';
class UserDAO extends DAO {

	public function selectById($id) {
		$sql = "SELECT * FROM `users` 
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByEmail($email) {
		$sql = "SELECT * FROM `users` WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':email', $email);
		$stmt->execute();
		return  $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data){
		
		$errors = $this->getValidationErrors($data);
		if (empty($errors)) {
			$sql = "INSERT INTO `users` (`email`, `password`, `name`, `lastname`, `picture`, `extension`, `username`)
				VALUES (:email, :password, :name, :lastname, :picture, :extension, :username)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':email', $data['email']);
			$stmt->bindValue(':password', $data['password']);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':lastname', $data['lastname']);
			$stmt->bindValue(':picture', $data['picture']);
			$stmt->bindValue(':extension', $data['extension']);
			$stmt->bindValue(':username', $data['username']);
			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}	
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['email'])) {
			$errors['email'] = "Please fill in an email";
		}
		if(empty($data['password'])) {
			$errors['password'] = "Please fill in a password";
		}
		
		return $errors;
		}




}

