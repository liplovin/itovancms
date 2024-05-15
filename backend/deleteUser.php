<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "DELETE") {
    $userId = $_GET['id'];

    // Prepare and execute SQL statement to delete user
    $stmt = $conn->prepare("DELETE FROM users WHERE id = :id");
    $stmt->bindParam(':id', $userId);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "User deleted successfully"));
    } else {
        echo json_encode(array("error" => "Failed to delete user"));
        http_response_code(500);
    }
}
?>
