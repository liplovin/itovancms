<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Include your database connection file
require_once 'DbConnect.php';

// Create a new instance of DbConnect to establish a database connection
$objDb = new DbConnect;
$conn = $objDb->connect();

// Define an array to store the fetched featured posts
$featuredPosts = [];

// Prepare and execute the SQL query to fetch featured posts with category_id 0 and is_featured 1
$stmt = $conn->prepare("SELECT * FROM posts WHERE category_id = 0 AND is_featured = 1");
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Iterate through the fetched results and add them to the featuredPosts array
foreach ($result as $row) {
    $featuredPosts[] = [
        'id' => $row['id'],
        'title' => $row['title'],
        'body' => $row['body'],
        'thumbnail' => $row['thumbnail'],
        'category' => $row['category'],
        'date' => $row['created_at']
    ];
}

// Encode the featuredPosts array as JSON and output it
echo json_encode($featuredPosts);
?>
