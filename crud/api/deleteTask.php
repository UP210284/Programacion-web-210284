<?php
include "./partials/connection.php";
try {
    $SQL = "DELETE FROM task WHERE id = {$_POST['id']};";
    $state = $conn ->query($SQL);
    echo "deleted task";

} catch (PDOException $e) {
    die($e->getMessage());
}
?>