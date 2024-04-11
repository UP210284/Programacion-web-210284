<?php
include "./partials/connection.php";
try {
    $SQL = "SELECT t.id, title, firstname, completed, idUser FROM `task` t INNER JOIN `user` u ON t.idUser = u.id;";
    $state = $conn ->query($SQL);
    $json = [];

    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        array_push($json, [
            "id" => $row['id'],
            "title" => $row['title'],
            "firstname" => $row['firstname'],
            "completed" => $row['completed'],
            "idUser" => $row['idUser']
            ]);
    }

    echo json_encode($json);

} catch (PDOException $e) {
    die($e->getMessage());
}
?>