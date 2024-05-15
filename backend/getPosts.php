<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

require_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$posts = [];

// Fetch all posts where category_id is 0 and is_featured is either 0 or 1
$stmt = $conn->prepare("SELECT * FROM posts WHERE category_id = 0 AND is_featured IN (0, 1)");
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fetch the latest featured post
$stmtLatestFeatured = $conn->prepare("SELECT * FROM posts WHERE category_id = 0 AND is_featured = 1 ORDER BY created_at DESC LIMIT 1");
$stmtLatestFeatured->execute();
$latestFeaturedPost = $stmtLatestFeatured->fetch(PDO::FETCH_ASSOC);

// Exclude the latest featured post from the main array of posts
if ($latestFeaturedPost) {
    $latestFeaturedPostId = $latestFeaturedPost['id'];
    // Filter out the latest featured post from the posts array
    $posts = array_filter($result, function ($post) use ($latestFeaturedPostId) {
        return $post['id'] != $latestFeaturedPostId;
    });
} else {
    // If there is no latest featured post, include all posts
    $posts = $result;
}

echo json_encode($posts);
?>
