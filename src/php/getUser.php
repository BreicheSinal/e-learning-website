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

        // checking id user role to get data upon it
        if ($user['role'] === 'Student') {
            // getting enrolled courses
            $coursesQuery = "
                SELECT c.id, c.title 
                FROM enrollments e
                JOIN courses c ON e.course_id = c.id
                WHERE e.user_id = ?
            ";

            $getCourses = $connection->prepare($coursesQuery);
            $getCourses->bind_param("i", $userId);
            $getCourses->execute();
            $coursesResult = $getCourses->get_result();

            $enrolledCourses = [];
            while ($course = $coursesResult->fetch_assoc()) {
                $enrolledCourses[] = $course;
            }

            // adding enrolled courses
            $user['enrolled_courses'] = $enrolledCourses;
        }else if ($user['role'] === 'admin') {
            // fethcing students
            $studentsQuery = "
                SELECT u.id, u.username, u.email 
                FROM users u
                JOIN roles r ON u.role_id = r.id
                WHERE r.name = 'Student'
            ";

            $studentsResult = $connection->query($studentsQuery);
            $students = [];
            while ($student = $studentsResult->fetch_assoc()) {
                $students[] = $student;
            }

        }
        echo json_encode([
            'message' => 'User data fetched successfully',
            'user' => $user,
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'User not found']);
    }

} catch (\Throwable $e) {
    http_response_code(401);
    echo json_encode([
        "message" => "Unauthorized",
    ]);
}