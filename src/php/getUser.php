<?php

include 'connection.php';
require "vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "#HALA_MADRID";

// fetching headers
$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Authorization header missing']);
    exit;
}

$jwt = $headers["Authorization"];

try {
    $key = new Key($secretKey, "HS256");

    // decoding jwt to get payload
    $payload = JWT::decode($jwt, $key);

    $userId = $payload->user_id;
    
    $query = "
        SELECT u.id, u.username, u.email, r.name AS role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.id = ?
    ";

    $getUser = $connection->prepare($query);

    $getUser->bind_param("i", $userId);

    $getUser->execute();

    $result = $getUser->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        echo json_encode([
            'message' => 'User data fetched successfully',
            'user' => $user,
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'User not found']);
    }

}catch (\Throwable $e) {
    http_response_code(401);
    echo json_encode([
        "message" => "Unauthorized",
    ]);
}