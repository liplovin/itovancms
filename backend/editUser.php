<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php'; // Include your database connection script
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    // Assuming you receive user data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Ensure that the required fields are present
    if (!isset($data['id']) || !isset($data['firstName']) || !isset($data['lastName']) || !isset($data['role'])) {
        echo json_encode(array("error" => "Missing required fields"));
        http_response_code(400);
        exit;
    }

    // Extract user ID from the data
    $userId = $data['id'];

    // Extract other fields to be updated
    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $isAdmin = $data['role']; // Assuming 'role' is now 'isAdmin'

    // Prepare and execute SQL statement to update user data
    $stmt = $conn->prepare("UPDATE users SET firstName = :firstName, lastName = :lastName, is_admin = :isAdmin WHERE id = :id");
    $stmt->bindParam(':firstName', $firstName);
    $stmt->bindParam(':lastName', $lastName);
    $stmt->bindParam(':isAdmin', $isAdmin);
    $stmt->bindParam(':id', $userId);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "User data updated successfully"));
    } else {
        echo json_encode(array("error" => "Failed to update user data"));
        http_response_code(500);
    }
}
?>
