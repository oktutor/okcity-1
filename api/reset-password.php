<?php

require_once("../config/db.php");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    exit("Invalid Request");
}

$token = trim($_POST["token"] ?? "");
$password = $_POST["password"] ?? "";
$confirm = $_POST["confirm_password"] ?? "";

if (
    empty($token) ||
    empty($password) ||
    empty($confirm)
) {
    exit("Please fill all fields.");
}

if ($password !== $confirm) {
    exit("Passwords do not match.");
}

if (strlen($password) < 6) {
    exit("Password must be at least 6 characters.");
}

// Find Token

$stmt = $conn->prepare("
SELECT id
FROM users
WHERE
reset_token=?
AND
reset_expiry > NOW()
");

$stmt->bind_param("s",$token);

$stmt->execute();

$result = $stmt->get_result();

if($result->num_rows==0){

exit("Invalid or Expired Token.");

}

$user=$result->fetch_assoc();

$newPassword=password_hash(
$password,
PASSWORD_DEFAULT
);

// Update Password

$update=$conn->prepare("

UPDATE users

SET

password=?,

reset_token=NULL,

reset_expiry=NULL

WHERE id=?

");

$update->bind_param(

"si",

$newPassword,

$user["id"]

);

if($update->execute()){

echo "success";

}else{

echo "Something went wrong.";

}

$update->close();

$stmt->close();

$conn->close();

?>