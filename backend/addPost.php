<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "POST") {
    // Check if all required fields are provided
    $required_fields = array('title', 'body', 'is_featured');
    foreach ($required_fields as $field) {
        if (!isset($_POST[$field])) {
            echo json_encode(array("error" => "Missing required field: $field"));
            http_response_code(400);
            exit;
        }
    }

    // Set default category_id if not provided
    $category_id = isset($_POST['category']) ? $_POST['category'] : 0;

    // Extract other fields
    $title = $_POST['title'];
    $body = $_POST['body'];
    $is_featured = $_POST['is_featured'];

    // Handle thumbnail upload
    $thumbnail = ''; // Initialize thumbnail variable
    if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] === UPLOAD_ERR_OK) {
        $thumbnail_name = $_FILES['thumbnail']['name'];
        $thumbnail_tmp_name = $_FILES['thumbnail']['tmp_name'];
        $thumbnail_extension = pathinfo($thumbnail_name, PATHINFO_EXTENSION);
        $allowed_extensions = array('jpg', 'jpeg', 'png');

        // Check if the file extension is allowed
        if (in_array($thumbnail_extension, $allowed_extensions)) {
            $upload_dir = '../frontend/src/images/';
            $thumbnail = $upload_dir . uniqid('', true) . '.' . $thumbnail_extension;

            // Move the uploaded file to the destination folder
            if (!move_uploaded_file($thumbnail_tmp_name, $thumbnail)) {
                echo json_encode(array("error" => "Failed to upload thumbnail"));
                http_response_code(500);
                exit;
            }
        } else {
            echo json_encode(array("error" => "Invalid file format for thumbnail"));
            http_response_code(400);
            exit;
        }
    }

    // Prepare and execute SQL statement to add post data
    $stmt = $conn->prepare("INSERT INTO posts (title, body, thumbnail, category_id, is_featured) VALUES (:title, :body, :thumbnail, :category_id, :is_featured)");
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':body', $body);
    $stmt->bindParam(':thumbnail', $thumbnail);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':is_featured', $is_featured);

    if ($stmt->execute()) {
        echo json_encode(array("message" => "Post added successfully"));    
    } else {
        echo json_encode(array("error" => "Failed to add post"));
        http_response_code(500);
    }
}
?>