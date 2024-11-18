<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "elearning_platform";

$connection = new mysqli($host, $user, $pass, $dbname);

if($connection->connect_error){
    die("CONNECTION FAILED!");
}