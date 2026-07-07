<?php

require_once("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid Request");
}

$email = trim($_POST["email"] ?? "");

if (empty($email)) {
    exit("Please enter your email.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit("Invalid email address.");
}

// Check User
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    exit("No account found with this email.");
}

$user = $result->fetch_assoc();

// Generate Reset Token
$token = bin2hex(random_bytes(32));
$expiry = date("Y-m-d H:i:s", strtotime("+1 hour"));

// Save Token
$update = $conn->prepare("
UPDATE users
SET reset_token = ?, reset_expiry = ?
WHERE id = ?
");

$update->bind_param(
    "ssi",
    $token,
    $expiry,
    $user["id"]
);

if ($update->execute()) {

    // Future:
    // Send Reset Link by Email

    echo "Password reset link is ready. Email sending will be added next.";

} else {

    echo "Something went wrong.";

}

$update->close();
$stmt->close();
$conn->close();

?>