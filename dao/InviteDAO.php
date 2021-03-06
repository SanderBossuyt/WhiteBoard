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

	public function selectAllInvitesByBoardId($board_id) {
		$sql = "SELECT invites.*, users.name as names , users.username as usernames
				FROM invites
				INNER JOIN users
				ON users.id = user_idreceiver
				WHERE board_id = :board_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':board_id', $board_id);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectByName($receiver_id,$board_id) {
		$sql = "SELECT *
				FROM invites
				WHERE user_idreceiver = :receiver_id
				AND board_id= :board_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':receiver_id', $receiver_id);
		$stmt->bindValue(':board_id', $board_id);
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

	public function delete_invitesEvent($id){

        $sql = "DELETE FROM invites
				WHERE board_id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        if($stmt->execute()){
            return true;
        }
        return false;

    }

}