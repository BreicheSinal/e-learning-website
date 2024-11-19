<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$host = "localhost";
$user = "root";
$pass = "";
$dbname = "elearning_platform";

$connection = new mysqli($host, $user, $pass, $dbname);

if($connection->connect_error){
    die("CONNECTION FAILED!");
}