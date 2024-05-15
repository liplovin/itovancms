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

if ($method == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    $missingInputs = [];
    if (empty($data['firstName'])) {
        $missingInputs[] = "First Name";
    }
    if (empty($data['lastName'])) {
        $missingInputs[] = "Last Name";
    }
    if (empty($data['username'])) {
        $missingInputs[] = "Username";
    }
    if (empty($data['email'])) {
        $missingInputs[] = "Email";
    }
    if (empty($data['password'])) {
        $missingInputs[] = "Password";
    }
    if (empty($data['confirmPassword'])) {
        $missingInputs[] = "Confirm Password";
    }

    if (!empty($missingInputs)) {
        echo json_encode(array("error" => "Missing input(s): " . implode(', ', $missingInputs)));
        http_response_code(400);
        exit;
    }

    if ($data['password'] !== $data['confirmPassword']) {
        echo json_encode(array("error" => "Passwords do not match"));
        http_response_code(400);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username OR email = :email");
    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result['username'] == $data['username']) {
            echo json_encode(array("error" => "Username already exists"));
        } else {
            echo json_encode(array("error" => "Email already exists"));
        }
        http_response_code(400);
        exit;
    }

    $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (firstName, lastName, username, email, password, is_admin) VALUES (:firstName, :lastName, :username, :email, :password, 0)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':firstName', $data['firstName']);
    $stmt->bindParam(':lastName', $data['lastName']);
    $stmt->bindParam(':username', $data['username']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':password', $passwordHash);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "User created successfully"));
        http_response_code(201);
    } else {
        echo json_encode(array("message" => "Failed to create user"));
        http_response_code(500);
    }
}
?>
