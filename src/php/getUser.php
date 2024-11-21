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

        }else if ($user['role'] === 'Admin') {
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

             // fetching instructors
             $instructorsQuery = "
             SELECT u.id, u.username, u.email 
             FROM users u
             JOIN roles r ON u.role_id = r.id
             WHERE r.name = 'Instructor'
            ";

            $instructorsResult = $connection->query($instructorsQuery);
            $instructors = [];
            while ($instructor = $instructorsResult->fetch_assoc()) {
                $instructors[] = $instructor;
            }

             // fetching courses
             $coursesQuery = "
             SELECT c.id, c.title, u.username AS instructor 
             FROM courses c
             JOIN users u ON c.instructor_id = u.id
             ";

            $coursesResult = $connection->query($coursesQuery);
            $allCourses = [];
            while ($course = $coursesResult->fetch_assoc()) {
                $allCourses[] = $course;
            }

            // adding admin data
            $user['students'] = $students;
            $user['instructors'] = $instructors;
            $user['courses'] = $allCourses;

        }else if ($user['role'] === 'Instructor') {
             // fetching courses by instructor
            $coursesQuery = "
            SELECT c.id, c.title 
            FROM courses c
            WHERE c.instructor_id = ?
            ";

            $getCourses = $connection->prepare($coursesQuery);
            $getCourses->bind_param("i", $userId);
            $getCourses->execute();
            $coursesResult = $getCourses->get_result();

            $instructorCourses = [];
            while ($course = $coursesResult->fetch_assoc()) {
            $instructorCourses[] = $course;
            }

            // fetching assignments by instructor
            $assignmentsQuery = "
            SELECT a.id, a.title, a.due_date
            FROM assignments a
            WHERE a.instructor_id = ?
            ";

            $getAssignments = $connection->prepare($assignmentsQuery);
            $getAssignments->bind_param("i", $userId);
            $getAssignments->execute();
            $assignmentsResult = $getAssignments->get_result();

            $instructorAssignments = [];
            while ($assignment = $assignmentsResult->fetch_assoc()) {
            $instructorAssignments[] = $assignment;
            }

             // adding instructor data
            $user['instructor_courses'] = $instructorCourses;
            $user['instructor_assignments'] = $instructorAssignments;
            
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
        "message" => "Unauthorized user",
    ]);
}