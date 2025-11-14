<?php
$dir = "assets/galeria/";

// Lê todos os arquivos da pasta
$arquivos = array_diff(scandir($dir), ['.', '..']);

$lista = [];

// Filtra somente imagens
foreach ($arquivos as $file) {
    if (preg_match('/\.(jpg|jpeg|png|gif|webp)$/i', $file)) {
        $lista[] = $dir . $file;
    }
}

// Retorna JSON
header("Content-Type: application/json");
echo json_encode($lista);
