<?php

include("conexao.php");

header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($_POST["acao"] == "cadastraEndereco") {

    $cpf_cliente = $_POST["cpf"];
    $rua = $_POST["rua"];
    $numero = $_POST["numero"];
    $bairro = $_POST["bairro"];
    $cep = $_POST["cep"];
    $cidade = $_POST["cidade"];
    $estado = $_POST["estado"];
    $enderecoOrdem = $_POST["enderecoOrdem"];

    if ($enderecoOrdem == "1") {
        $enderecoPrincipal = "1";
    } else if ($enderecoOrdem != "1") {
        $enderecoPrincipal = "0";
    }

    $ativo = 1;
    $id_usuario = $_POST["idUsuario"];

    try {
        $query = $pdo->prepare("INSERT INTO enderecos (cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal,ativo,id_usuario) 
            VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? )");

        $query->bindParam(1, $cpf_cliente);
        $query->bindParam(2, $rua);
        $query->bindParam(3, $numero);
        $query->bindParam(4, $bairro);
        $query->bindParam(5, $cep);
        $query->bindParam(6, $cidade);
        $query->bindParam(7, $estado);
        $query->bindParam(8, $enderecoPrincipal);
        $query->bindParam(9, $ativo);
        $query->bindParam(10, $id_usuario);

        $query->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    echo json_encode($_POST);
}

// ################################### GET ################################### 

if ($_GET["acao"] == "listarEnderecos") {

    try {
        $query = $pdo->prepare("SELECT id_endereco,cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal,ativo,id_usuario FROM enderecos WHERE ativo =1");

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}


if ($_GET["acao"] == "listarEnderecosUpdate") {

    $id = $_GET["id"];

    try {
        $query = $pdo->prepare("SELECT id_endereco,cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal FROM enderecos WHERE id_endereco=?");

        $query->bindParam(1, $id);

        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}



// ################################### PUT ################################### 


if ($method === "PUT") {

    parse_str(file_get_contents("php://input"), $_PUT);

    if ($_PUT["acao"] == "updateEndereco") {

        $id_endereco = $_PUT['idEndereco'];
        $rua = $_PUT['rua'];
        $numero = $_PUT['numero'];
        $bairro = $_PUT['bairro'];
        $cep =  $_PUT['cep'];
        $cidade = $_PUT['cidade'];
        $estado = $_PUT['estado'];

        try {
            $query = $pdo->prepare("UPDATE enderecos SET rua=?,numero=?,bairro=?,cep=?,cidade=?,estado=? WHERE id_endereco=?");

            $query->bindParam(1, $rua);
            $query->bindParam(2, $numero);
            $query->bindParam(3, $bairro);
            $query->bindParam(4, $cep);
            $query->bindParam(5, $cidade);
            $query->bindParam(6, $estado);
            $query->bindParam(7, $id_endereco);

            $query->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    if ($_PUT["acao"] == "enderecoDelete") {

        $id_endereco = $_PUT['id'];

        try {
            $query = $pdo->prepare("UPDATE enderecos SET ativo=0 WHERE id_endereco=?");

            $query->bindParam(1, $id_endereco);

            $query->execute();

            echo json_encode("deu bom!");
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    if ($_PUT["acao"] == "enderecoDelete") {

        $id_endereco = $_PUT['id'];

        try {
            $query = $pdo->prepare("UPDATE enderecos SET ativo=0 WHERE id_endereco=?");

            $query->bindParam(1, $id_endereco);

            $query->execute();

            echo json_encode("deu bom!");
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
