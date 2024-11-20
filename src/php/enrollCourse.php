<?php

include 'connection.php';
require "vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

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
    // decoding jwt token
    $key = new Key($secretKey, "HS256");
    $payload = JWT::decode($jwt, $key);

    // getting user id/role 
    $userId = $payload->user_id;
    
    $data = json_decode(file_get_contents("php://input"), true);
    $course_id = $data['course_id'];

    $query = $connection->prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)");
    $query->bind_param("ii", $userId, $course_id);

    if ($query->execute()) {
        echo json_encode([
            'message' => 'Enrolled in course successfully'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'message' => 'Failed to enroll in course'
        ]);
    }

} catch (\Throwable $e) {
    http_response_code(401);
    echo json_encode([
        "message" => "Unauthorized", 
        "error" => $e->getMessage()
    ]);

}