<?php

include 'connection.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$role_id = $data->role_id; 

// validating data fields sent from frontend
if (!$username || !$email || !$password || !$role_id) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'PROVIDE ALL FIELDS MATE!']);
    exit();
}

// checking if user is already signed up
$query = $connection->prepare("SELECT * FROM users WHERE email = ?");

$query->bind_param("s", $email);

$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        'status' => 'error', 
        'message' => 'EMAIL ALREADY EXISTS!'
    ]);
    exit();
}

// inserting user in db
$insertionQuery = $connection->prepare("INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)");

$insertionQuery ->bind_param("sssi", $username, $email, $password, $role_id);

if ($insertionQuery->execute()) {
    echo json_encode([
        'status' => 'success', 
        'message' => 'USER REGISTERED SUCCESSFULLY!'
    ]);
} else {
    echo json_encode([
        'status' => 'error', 
        'message' => 'FAILED REGISTERED!'
    ]);
}