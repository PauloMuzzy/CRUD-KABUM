<?php

include("conexao.php");

header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ################################### 

if ($_POST) {

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
    } else if ($_POST["acao"] == "cadastraEndereco") {

        $cpf_cliente = $_POST["cpf"];
        $rua = $_POST["rua"];
        $numero = $_POST["numero"];
        $bairro = $_POST["bairro"];
        $cep = $_POST["cep"];
        $cidade = $_POST["cidade"];
        $estado = $_POST["estado"];
        $enderecoOrdem = $_POST["enderecoOrdem"];
        if ($enderecoOrdem == 1) {
            $enderecoOrdem = 1;
        } else {
            $enderecoOrdem = 0;
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
            $query->bindParam(8, $enderecoOrdem);
            $query->bindParam(9, $ativo);
            $query->bindParam(10, $id_usuario);

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

    if ($_POST["acao"] == "logDeleteCliente") {

        $campo = $_POST["campo"];


        try {
            $query = $pdo->prepare("INSERT INTO log_clientes (campo,valor_antigo,valor_atual,id_usuario) 
            VALUES (? ,? ,? ,? )");

            $query->bindParam(1, $campo);
            $query->bindParam(2, $valor_antigo);

            $query->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}

// ################################### GET ################################### 

if ($_GET) {
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


    if ($_GET["acao"] == "buscarUsuarioDelete") {

        $id = $_GET["id"];

        try {
            $query = $pdo->prepare("SELECT id_usuario FROM clientes WHERE id_cliente =?");

            $query->bindParam(1, $id);

            $query->execute();

            $result = $query->fetch(PDO::FETCH_ASSOC);

            echo json_encode($result);
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}

// ################################### PUT ################################### 

if ($method === "PUT") {

    parse_str(file_get_contents("php://input"), $_PUT);

    if ($_PUT["acao"] == "updateCliente") {

        $idCliente = $_PUT["idCliente"];
        $nome = $_PUT["nome"];
        $cpf = $_PUT["cpf"];
        $rg = $_PUT["rg"];
        $email = $_PUT["email"];
        $telefone1 = $_PUT["telefone1"];
        $telefone2 = $_PUT["telefone2"];
        $dataNasc = $_PUT["dataNasc"];

        try {
            $query = $pdo->prepare("UPDATE clientes SET nome=?,cpf=?,rg=?,email=?,telefone1=?,telefone2=?,data_nasc=? WHERE id_cliente=?");

            $query->bindParam(1, $nome);
            $query->bindParam(2, $cpf);
            $query->bindParam(3, $rg);
            $query->bindParam(4, $email);
            $query->bindParam(5, $telefone1);
            $query->bindParam(6, $telefone2);
            $query->bindParam(7, $dataNasc);
            $query->bindParam(8, $idCliente);

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
