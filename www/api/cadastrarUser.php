<?php
if ($_POST["acao"] == "inserir") {

    include("conexao.php");

    try {
        $pdo = new PDO('mysql:host=localhost;dbname=meuBancoDeDados', $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare('INSERT INTO Users (nome) VALUES(:nome)');
        $stmt->execute(array(
            ':nome' => 'Ricardo Arrigoni'
        ));

        echo $stmt->rowCount();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
    var_dump($_POST["dados"]);
} else {
    echo "qlqr coisa";
};
