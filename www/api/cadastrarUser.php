<?php

include('conexao.php');

print("deu bom");

if ($_POST["acao"] == "inserir") {

    $myArray = $_POST['dados'];

    print("deu bom2");

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

    try {
        $stmt = $pdo->prepare('INSERT INTO usuarios (nome ,email ,login ,senha ,typeuser ,attcreat ,attread ,attupdate ,attdelet) 
        VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )');
        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $email);
        $stmt->bindParam(3, $login);
        $stmt->bindParam(4, $hashsenha);
        $stmt->bindParam(5, $typeuser);
        $stmt->bindParam(6, $attcreat);
        $stmt->bindParam(7, $attread);
        $stmt->bindParam(8, $attupdate);
        $stmt->bindParam(9, $attdelet);

        $stmt->execute();

        echo $stmt->rowCount();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}
