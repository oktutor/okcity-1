<?php

// ================================
// OK Varanasi Database Connection
// ================================

// Database Host
$host = "localhost";

// Database Name
$dbname = "u196976884_login_system";

// Database Username
$username = "u196976884_shubham_admin";

// Database Password
$password = "";

// Create Connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
    die("Connection Failed : " . $conn->connect_error);
}

// UTF-8 Support
$conn->set_charset("utf8mb4");

?>