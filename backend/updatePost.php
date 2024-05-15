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
    // Check if all required fields are present
    if (!isset($_POST['postId']) || !isset($_POST['title']) || !isset($_POST['body'])) {
        echo json_encode(array("error" => "Missing required fields"));
        http_response_code(400);
        exit;
    }

    // Retrieve data from the POST request
    $postId = $_POST['postId'];
    $title = $_POST['title'];
    $body = $_POST['body'];

    // Handle file upload
    $thumbnail = '';
    if (!empty($_FILES['thumbnail']['name'])) {
        $target_dir = "../../frontend/src/images/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true); // Create the directory if it doesn't exist
        }
        $thumbnail = basename($_FILES["thumbnail"]["name"]);
        $target_file = $target_dir . $thumbnail;
        if (!move_uploaded_file($_FILES["thumbnail"]["tmp_name"], $target_file)) {
            echo json_encode(array("error" => "Failed to upload file"));
            http_response_code(500);
            exit;
        }
    }

    // Prepare SQL statement to update the post
    $sql = "UPDATE posts SET title = :title, body = :body";
    if (!empty($thumbnail)) {
        $sql .= ", thumbnail = :thumbnail";
    }
    $sql .= " WHERE id = :postId";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':body', $body);
    if (!empty($thumbnail)) {
        $stmt->bindParam(':thumbnail', $thumbnail);
    }
    $stmt->bindParam(':postId', $postId);

    // Execute the SQL statement
    try {
        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                echo json_encode(array("message" => "Post updated successfully"));
            } else {
                echo json_encode(array("error" => "No rows affected"));
            }
        } else {
            echo json_encode(array("error" => "Failed to execute SQL statement"));
        }
    } catch (PDOException $e) {
        echo json_encode(array("error" => "Database error: " . $e->getMessage()));
    }
}
?>
