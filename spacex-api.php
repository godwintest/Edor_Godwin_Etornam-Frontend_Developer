<?php
// ... CORS headers ...

// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// SpaceX API endpoint for rockets
$spacexApiUrl = 'https://api.spacexdata.com/v4/crew';

// Fetch data from SpaceX API
$response = file_get_contents($spacexApiUrl);

// Check if the request was successful
if ($response === FALSE) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Failed to fetch data from SpaceX API']);
} else {
    // Set response headers for JSON
    header('Content-Type: application/json');
    echo $response;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    exit;
}

