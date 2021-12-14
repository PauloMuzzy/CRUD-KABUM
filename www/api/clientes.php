<?php

include("conexao.php");

header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($_POST["acao"] == "cadastraCliente") {

    $nome =  $_POST["nome"];
    $cpf = $_POST["cpf"];
    $rg =  $_POST["rg"];
    $email = $_POST["email"];
    $tel1 = $_POST["tel1"];
    $tel2 = $_POST["tel2"];
    $dataNasc = $_POST["dataNasc"];
    $idUsuario = $_POST["idUsuario"];

    try {
        $query = $pdo->prepare("INSERT INTO clientes (nome,cpf,rg,email,telefone1,telefone2,data_nasc,id_usuario,ativo) 
            VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )");

        $query->bindParam(1, $nome);
        $query->bindParam(2, $cpf);
        $query->bindParam(3, $rg);
        $query->bindParam(4, $email);
        $query->bindParam(5, $tel1);
        $query->bindParam(6, $tel2);
        $query->bindParam(7, $dataNasc);
        $query->bindParam(8, $idUsuario);
        $query->bindParam(9, $ativo);

        $query->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

if ($_POST["acao"] == "logUpdateCliente") {

    $campo = $_POST["campo"];
    $valor_antigo = $_POST["valorAntigo"];
    $valor_atual = $_POST["valorAtual"];
    $id_usuario = $_POST["idUsuario"];

    try {
        $query = $pdo->prepare("INSERT INTO log_clientes (campo,valor_antigo,valor_atual,id_usuario) 
            VALUES (? ,? ,? ,? )");

        $query->bindParam(1, $campo);
        $query->bindParam(2, $valor_antigo);
        $query->bindParam(3, $valor_atual);
        $query->bindParam(4, $id_usuario);

        $query->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}


// ################################### GET ################################### 

if ($_GET["acao"] == "listarClientes") {

    try {
        $query = $pdo->prepare("SELECT id_cliente,nome,cpf,rg,email,telefone1,telefone2,data_nasc,id_usuario,ativo FROM clientes WHERE ativo =1");

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

if ($_GET["acao"] == "listarUpdateCliente") {

    $id = $_GET["id"];

    try {
        $query = $pdo->prepare("SELECT id_cliente,nome,cpf,rg,email,telefone1,telefone2,data_nasc,id_usuario,ativo FROM clientes WHERE ativo =1 AND id_cliente =?");

        $query->bindParam(1, $id);

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

if ($_GET["acao"] == "listarUpdateClienteLog") {

    $id = $_GET["id"];

    try {
        $query = $pdo->prepare("SELECT nome,cpf,rg,email,telefone1,telefone2,data_nasc FROM clientes WHERE id_cliente =?");

        $query->bindParam(1, $id);

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);

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

        echo json_encode($_PUT);
    }

    if ($_PUT["acao"] == "deletarCliente") {

        $id_cliente = $_PUT["idCliente"];

        try {
            $query = $pdo->prepare("UPDATE clientes SET ativo=0 WHERE id_cliente=?");

            $query->bindParam(1, $id_cliente);


            $query->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
