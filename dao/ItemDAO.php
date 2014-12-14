<?php
require_once 'dao/DAO.php';
class ItemDAO extends DAO {

	public function selectById($id) {
		$sql = "SELECT * FROM `items` 
				WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function insert($data){	
		$errors = $this->getValidationErrors($data);
		if (empty($errors)) {
			$sql = "INSERT INTO `items` (`x`, `y`, `board_id`,`origin`,`content`)
					VALUES (:x, :y, :board_id, :origin, :content)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':x', $data['x']);
			$stmt->bindValue(':y', $data['y']);
			$stmt->bindValue(':board_id', $data['board_id']);
			$stmt->bindValue(':content', $data['content']);
			$stmt->bindValue(':origin', $data['origin']);
			
			if($stmt->execute()) {
				$lastInsertId=$this->pdo->lastInsertId();
				return $this->selectById($lastInsertId);
			}	
		}
		return false;
	}

	public function getValidationErrors($data) {

		$errors = array();

		if(empty($data['x'])) {
			$errors['x'] = "Please fill in an x";
		}
		if(empty($data['y'])) {
			$errors['y'] = "Please fill in a y";
		}
		if(empty($data['board_id'])) {
			$errors['board_id'] = "Please fill in a board_id";
		}
		if(empty($data['origin'])) {
			$errors['origin'] = "Please fill in a origin";
		}
		
		return $errors;
	}
	public function delete_itemsEvent($id){

        $sql = "DELETE FROM items
				WHERE board_id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        if($stmt->execute()){
            return true;
        }
        return false;

    }
    public function delete_item($id){

        $sql = "DELETE FROM items
				WHERE id = :id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id', $id);
        if($stmt->execute()){
            return true;
        }
        return false;

    }

}