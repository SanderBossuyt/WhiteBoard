<?php
require_once 'dao/DAO.php';
class InviteDao extends DAO {

	public function selectById($id) {
		$sql = "SELECT * FROM `invites` 
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function selectByName($id) {
		$sql = "SELECT id FROM `invites`
				WHERE `user_idreceiver` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function insert($data){	
		$errors = $this->getValidationErrors($data);
		if (empty($errors)) {
			$sql = "INSERT INTO `invites` (`user_idsender`, `board_id`,`user_idreceiver`)
					VALUES (:user_idsender, :board_id, :user_idreceiver)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':user_idsender', $data['user_idsender']);
			$stmt->bindValue(':board_id', $data['board_id']);
			$stmt->bindValue(':user_idreceiver', $data['user_idreceiver']);
			
			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}	
		}
		return false;
	}

	public function getValidationErrors($data) {

		$errors = array();
		if(empty($data['user_idsender'])) {
			$errors['user_idsender'] = "Please fill in a user_idsender";
		}
		if(empty($data['board_id'])) {
			$errors['board_id'] = "Please fill in a board_id";
		}
		if(empty($data['user_idreceiver'])) {
			$errors['user_idreceiver'] = "Please fill in a user_idreceiver";
		}
		
		return $errors;
		}

}