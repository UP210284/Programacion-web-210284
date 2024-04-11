<?php
include "./partials/connection.php";
try {
    $SQL = "SELECT t.id, title, firstname, lastname, completed, idUser FROM `task` t INNER JOIN `user` u ON t.idUser = u.id WHERE t.id = {$_POST['id']};";
    $state = $conn ->query($SQL);
    $json = [];

    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
            "id" => $row['id'],
            "title" => $row['title'],
            "fullname" => $row['firstname']." ".$row['lastname'],
            "completed" => $row['completed'],
            "idUser" => $row['idUser']
            ]);
    }

    echo json_encode($json);

} catch (PDOException $e) {
    die($e->getMessage());
}
?>