<?php
include "./partials/connection.php";
try {
    $SQL_ID = "SELECT MAX(id) FROM `task`;";
    $state = $conn ->query($SQL_ID);
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        $id = $row["MAX(id)"];
    }
    $completed = ($_POST['completed'] == 'true')?1:0;
    $id += 1;
    
    $SQL = "INSERT INTO `task` (`id`, `title`, `completed`, `idUser`) VALUES ( {$id}, '{$_POST['title']}', {$completed}, {$_POST['idUser']});";
    echo $SQL;
    $conn ->query($SQL);
    echo "created task";

} catch (PDOException $e) {
    die($e->getMessage());
}
?>