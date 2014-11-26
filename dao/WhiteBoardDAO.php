<?php
require_once 'dao/DAO.php';
class WhiteBoardDAO extends DAO {

	public function selectByUser($user_id) {
		$sql = "SELECT * FROM `boards`
				WHERE `user_id` = :user_id
				ORDER BY `creation_date`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':user_id', $user_id);
		$stmt->execute();
		return  $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectBoard($board_id) {
		$sql = "SELECT * FROM `boards`
				WHERE `id` = :board_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':board_id', $board_id);
		$stmt->execute();
		return  $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectById($id) {
		$sql = "SELECT * FROM `boards` 
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data){	
		$errors = $this->getValidationErrors($data);
		if (empty($errors)) {
			$sql = "INSERT INTO `boards` (`user_id`, `name`)
				VALUES (:user_id, :name)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':user_id', $data['user_id']);
			$stmt->bindValue(':name', $data['name']);
			
			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}	
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['user_id'])) {
			$errors['user_id'] = "Please fill in an user_id";
		}
		if(empty($data['name'])) {
			$errors['name'] = "Please fill in a name";
		}
		
		return $errors;
		}

}