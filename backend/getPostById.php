<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'DbConnect.php'; // Include your database connection script
$objDb = new DbConnect;
$conn = $objDb->connect();

// Check if the ID parameter is provided in the URL
if(isset($_GET['id'])) {
    $postId = $_GET['id'];

    // Prepare and execute SQL statement to fetch post data by ID
    $stmt = $conn->prepare("SELECT * FROM posts WHERE id = :id");
    $stmt->bindParam(':id', $postId);
    $stmt->execute();

    // Check if a post with the specified ID exists
    if ($stmt->rowCount() > 0) {
        $post = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($post); // Return the post data as JSON
    } else {
        echo json_encode(array("error" => "Post not found"));
    }
} else {
    echo json_encode(array("error" => "Post ID not provided"));
}
?>
