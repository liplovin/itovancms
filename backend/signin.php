<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['username']) || empty($data['password'])) {
        echo json_encode(array("error" => "Username and Password are required"));
        http_response_code(400);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $data['username']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($data['password'], $user['password'])) {
            echo json_encode(array(
                "success" => true,
                "message" => "Sign-in successful",
                "is_admin" => $user['is_admin']
            ));
            http_response_code(200);
        } else {
            echo json_encode(array("error" => "Incorrect password"));
            http_response_code(401);
        }
    } else {
        echo json_encode(array("error" => "Username not found"));
        http_response_code(401);
    }
}
?>
