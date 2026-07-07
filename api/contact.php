<?php

require_once("../config/db.php");

// Only POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid Request");
}

// Get Form Data
$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

// Validation
if (
    empty($name) ||
    empty($email) ||
    empty($phone) ||
    empty($subject) ||
    empty($message)
) {
    exit("Please fill all required fields.");
}

// Validate Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// Prepare Query
$sql = "INSERT INTO contact_messages
(name, email, phone, subject, message)
VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    exit("Database Error");
}

$stmt->bind_param(
    "sssss",
    $name,
    $email,
    $phone,
    $subject,
    $message
);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "Database Error";
}

$stmt->close();
$conn->close();

?>