<?php

include "connection.php";

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (isset($data['user_id']) && is_numeric($data['user_id'])) {
    $userId = (int) $data['user_id'];
    $query = $connection->prepare("DELETE FROM users WHERE id = ?");
    $query->bind_param("i", $userId);
    $query->execute();

    if ($query->affected_rows > 0) {
        echo json_encode(["message" => "User banned successfully"]);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input data"]);
}