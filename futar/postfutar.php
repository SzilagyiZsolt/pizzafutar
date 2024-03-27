<?php
$fazon =$_POST["fazon"];
$fnev=$_POST["fnev"];	
$ftel =$_POST["ftel"];
require_once './databaseconnect.php';
$sql = "INSERT INTO futar (fazon, fnev, ftel) VALUES (?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("iss", $fazon,$fnev, $ftel);  
if ($stmt->execute()) {
    http_response_code(201);
    $message=array("message" =>'Sikeresen hozzáadva');
    return json_encode($message);
} else {
    http_response_code(404);
    $message=array("message" =>'Nem sikerült hozzáadni');
    return json_encode($message);
}