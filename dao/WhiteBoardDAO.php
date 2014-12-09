<?php
require_once 'dao/DAO.php';
class WhiteBoardDAO extends DAO {

	public function selectByUser($user_id) {
		$sql = "SELECT * FROM `boards`
				WHERE `user_id` = :user_id
				ORDER BY `creation_date` DESC";
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

	public function selectBoardItems($board_id) {
		$sql = "SELECT * FROM `items`
				WHERE `board_id` = :board_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':board_id', $board_id);
		$stmt->execute();
		return  $stmt->fetchAll(PDO::FETCH_ASSOC);
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
			$errors['name'] = "Please fill in an name";
		}else if (strlen($data['name']) > 17){
			$errors['name'] = "Please fill in an name with maximum 30 characters";
		}
		
		return $errors;
		}




	public function selectByIdItem($id) {
		$sql = "SELECT * FROM `items` 
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function update($data){

		$errors = $this->getValidationErrors2($data);
		if (empty($errors)) {
			$sql = "UPDATE `items` SET `x` = :x, `y` = :y WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':x', $data['x']);
			$stmt->bindValue(':y', $data['y']);
			$stmt->bindValue(':id', $data['id']);
			if($stmt->execute()) {
				$selectId=$this->pdo->lastInsertId();
				return $this->selectByIdItem($selectId);
			}
		}
		return false;
	}

	public function getValidationErrors2($data) {
		$errors = array();
		if(!isset($data['id'])) {
			$errors['id'] = "Please fill in an id";
		}
		if(!isset($data['x'])) {
			$errors['x'] = "Please fill in an x";
		}
		if(!isset($data['y'])) {
			$errors['y'] = "Please fill in an y";
		}
		
		return $errors;

	}

	//delete board

	// public function deleteEvent($id){

 //        $sql = "DELETE FROM `rsvp_events`
 //                WHERE id = :id";
 //        $stmt = $this->pdo->prepare($sql);
 //        $stmt->bindValue(':id', $id);
 //        if($stmt->execute()){
 //            return true;
 //        }
 //        return false;

 //    }

}