<?php

session_start();
require_once("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid Request");
}

$email = trim($_POST["email"] ?? "");
$password = $_POST["password"] ?? "";

// Validation
if (empty($email) || empty($password)) {
    exit("Please enter email and password.");
}

// Find User
$sql = "SELECT id, full_name, email, password, role
        FROM users
        WHERE email = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    exit("Database Error");
}

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows == 0) {
    exit("Invalid Email or Password.");
}

$user = $result->fetch_assoc();

// Verify Password
if (!password_verify($password, $user["password"])) {
    exit("Invalid Email or Password.");
}

// Update Last Login
$update = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
$update->bind_param("i", $user["id"]);
$update->execute();
$update->close();

// Session
$_SESSION["user_id"] = $user["id"];
$_SESSION["full_name"] = $user["full_name"];
$_SESSION["email"] = $user["email"];
$_SESSION["role"] = $user["role"];

echo "success";

$stmt->close();
$conn->close();

?>