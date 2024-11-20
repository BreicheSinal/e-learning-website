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
    // decoding jwt token
    $key = new Key($secretKey, "HS256");
    $payload = JWT::decode($jwt, $key);

    // getting user id/role 
    $userId = $payload->user_id;
    $roleId = $payload->role_id;
    
    // checking if student
    if ($roleId != 1) { 
        http_response_code(403);
        echo json_encode([
            'message' => 'You are not authorized to perform this action'
        ]);
        exit;
}

} catch (\Throwable $e) {
    http_response_code(401);
    echo json_encode([
        "message" => "Unauthorized", 
        "error" => $e->getMessage()
    ]);

}