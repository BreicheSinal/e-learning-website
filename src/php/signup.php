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