<?php
include 'connection.php';

$query = $connection->prepare("SELECT id, title FROM courses");

$query->execute();

$result = $query->get_result();

$courses = [];

while ($row = $result->fetch_assoc()) {
    $courses[] = $row;
}

echo json_encode([
    'courses' => $courses
]);
