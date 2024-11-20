<?php

include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$title = $data['title'];
$instructorId = $data['instructor_id'];

if ($title && $instructorId) {
    $query = $connection->prepare("INSERT INTO courses (title, instructor_id) VALUES (?, ?)");

    $query->bind_param("si", $title, $instructorId);
    
    $query->execute();

    if ($query->affected_rows > 0) {
        echo json_encode([
            "message" => "Course created successfully"
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "message" => "Failed to create course"
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        "message" => "Invalid input data"
    ]);
}