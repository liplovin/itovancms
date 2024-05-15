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

if ($method == "GET") {
    // Check if post ID is provided
    if (!isset($_GET['postId'])) {
        echo json_encode(array("error" => "Post ID is missing"));
        http_response_code(400);
        exit;
    }

    $postId = $_GET['postId'];

    // Fetch the thumbnail file name from the database
    $sql = "SELECT thumbnail FROM posts WHERE id = :postId";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':postId', $postId);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $thumbnail = $row['thumbnail'];

    // Delete the post data from the database
    $deleteSql = "DELETE FROM posts WHERE id = :postId";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bindParam(':postId', $postId);

    // Execute the SQL statement to delete the post
    try {
        if ($deleteStmt->execute()) {
            if ($deleteStmt->rowCount() > 0) {
                // Delete the thumbnail file from the server
                $target_dir = "../../frontend/src/images/";
                $thumbnailPath = $target_dir . $thumbnail;
                if (file_exists($thumbnailPath)) {
                    unlink($thumbnailPath);
                }
                echo json_encode(array("message" => "Post deleted successfully"));
            } else {
                echo json_encode(array("error" => "No post found with the provided ID"));
            }
        } else {
            echo json_encode(array("error" => "Failed to execute SQL statement"));
        }
    } catch (PDOException $e) {
        echo json_encode(array("error" => "Database error: " . $e->getMessage()));
    }
}
?>
