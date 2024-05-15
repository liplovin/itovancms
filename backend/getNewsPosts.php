<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$latestFeaturedPost = [];

$stmt = $conn->prepare("SELECT * FROM posts WHERE category_id = 0 AND is_featured = 1 ORDER BY created_at DESC LIMIT 1");
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result) {
    // Assuming 'thumbnail' column stores image filenames
    // Adjust the image URL to reflect the correct path
    $thumbnailUrl = 'http://localhost/PROJECT/frontend/src/images/' . $result['thumbnail'];
    
    $latestFeaturedPost = [
        'id' => $result['id'],
        'title' => $result['title'],
        'body' => $result['body'],
        'thumbnail' => $thumbnailUrl,
        'date' => $result['created_at']
    ];
}

echo json_encode($latestFeaturedPost);
?>
