<?php

include "connection.php";

$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['user_id'];