<?php

session_start();

// Remove all session variables
$_SESSION = [];

// Destroy session
session_destroy();

// Redirect to Login Page
header("Location: ../login.html");
exit();

?>