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

