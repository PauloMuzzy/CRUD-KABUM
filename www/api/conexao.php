<?php

$username = "root";
$password = "root";

$pdo = new PDO('mysql:host=db;dbname=Logon', $username, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
