<?php

include 'connection.php';
require "vendor/autoload.php";

use Firebase\JWT\JWT;

 $data = json_decode(file_get_contents("php://input"), true);

 $secretKey = "#HALA_MADRID";

 $email = $data["email"] ?? null;
 $password = $data["password"] ?? null;

 if( $email == null || $password == null){
    echo json_encode([
        "message" => "Credentials are required!"
    ]);
 }

 $query = $connection->prepare("SELECT * FROM users WHERE email = ?");

 $query->bind_param('s', $email);

 $query->execute();

 $result = $query->get_result();

 if($result->num_rows != 0){
    $user = $result->fetch_assoc();

    $passCheck = password_verify($password, $user["password"]);

    if($passCheck){
        $payload = [
            "user_id" => $user["id"]
        ];

        $jwt = JWT::encode($payload, $secretKey, "HS256");

        echo json_encode([
            "message" => "successful",
            "access_token" => $jwt,
            "user" => $user
        ]);

    }else{
        http_response_code(400);
        echo json_encode([
            "message" => "Invalid credentials",
        ]);
    }
 }