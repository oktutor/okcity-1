<?php

require_once("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid Request");
}

// Get Form Data
$full_name = trim($_POST["fullname"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$password = $_POST["password"] ?? "";
$confirm_password = $_POST["confirm_password"] ?? "";

// Validation
if (
    empty($full_name) ||
    empty($email) ||
    empty($phone) ||
    empty($password) ||
    empty($confirm_password)
) {
    exit("Please fill all fields.");
}

// Email Validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// Phone Validation
if (!preg_match('/^[0-9]{10}$/', $phone)) {
    exit("Enter a valid 10-digit mobile number.");
}

// Password Length
if (strlen($password) < 6) {
    exit("Password must be at least 6 characters.");
}

// Confirm Password
if ($password !== $confirm_password) {
    exit("Passwords do not match.");
}

// Check Existing Email
$sql = "SELECT id FROM users WHERE email=? OR phone=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $phone);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    exit("Email or Mobile Number already exists.");
}

$stmt->close();

// Hash Password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert User
$sql = "INSERT INTO users
(full_name,email,phone,password)
VALUES (?,?,?,?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ssss",
    $full_name,
    $email,
    $phone,
    $hashed_password
);

if ($stmt->execute()) {

    echo "success";

} else {

    echo "Registration Failed.";

}

$stmt->close();

$conn->close();

?>