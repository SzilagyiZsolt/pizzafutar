<?php
$putdata = fopen('php://input', "r");
$raw_data= "";
while($chunk = fread($putdata, 1024)){
    $raw_data.= $chunk;
}
fclose($putdata);
$adatJson = json_decode($raw_data);
$fazon=$adatJson->fazon;
$fnev=$adatJson->fnev;
$ftel =$adatJson->ftel;
require_once './databaseconnect.php';
$sql = "UPDATE futar SET fnev=?, ftel=? WHERE fazon=?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ssi", $fnev, $ftel, $fazon);  
if ($stmt->execute()) {
    http_response_code(201);
    echo 'Sikeresen módosítva';
} else {
    http_response_code(404);
    echo 'Nem sikerült módosítani';
}