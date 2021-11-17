<?php

include('conexao.php');

if ($_POST["acao"] == "inserir") {

    $myArray = $_POST['dados'];

    $nome = $myArray[0];
    $email = $myArray[1];
    $login = $myArray[2];
    $senha = $myArray[3];

    $hashsenha = password_hash($senha, PASSWORD_DEFAULT);

    $typeuser = "0";
    $attcreat = "1";
    $attread = "0";
    $attupdate = "0";
    $attdelet = "0";

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    echo "Connected successfully";

    $sql = "INSERT INTO usuarios (nome, email, login, senha, typeuser, attcreat, attread, attupdate, attdelet) 
    VALUES ('$nome', '$email', '$login', '$hashsenha', '$typeuser', '$attcreat', '$attread', '$attupdate', '$attdelet')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}
