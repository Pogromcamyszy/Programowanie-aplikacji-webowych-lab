<?php
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

include 'secret.php'; 

// Get JWT from Authorization header
$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["error" => "Authorization header missing"]);
    exit;
}

$authHeader = $headers['Authorization'];
if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid Authorization header format"]);
    exit;
}

$jwt = $matches[1];

try {
    // Decode and verify JWT
    $decoded = JWT::decode($jwt, new Key($jwtSecretKey, 'HS256'));

    // Success – token is valid
    http_response_code(200);
    echo json_encode([
        "message" => "Token is valid",
        "nickname" => $decoded->data->nickname,
        "user_id" => $decoded->data->user_id,
    ]);
} catch (Exception $e) {
    // Invalid token
    http_response_code(401);
    echo json_encode(["error" => "Token is invalid: " . $e->getMessage()]);
}
