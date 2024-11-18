<?php

include 'connection.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$role_id = $data->role_id; 