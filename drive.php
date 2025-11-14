<?php
$apiKey = "AIAXKfVSOjOMFdujqDbbo";
$folderId = "1Cx8vZ29oxquPEshvqvHGcQH-R9i-hDC5";

$url = "https://www.googleapis.com/drive/v3/files?q='" . $folderId .
       "'+in+parents+and+mimeType+contains+'image/'&key=" . $apiKey .
       "&fields=files(id,name)";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

header("Content-Type: application/json");
echo $result;
