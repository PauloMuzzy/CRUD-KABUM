<?php

include('conexao.php');

header('Content-Type: application/json');

if ($_POST) {

    if ($_POST['acao'] == 'cadastraCliente') {

        $nome =  $_POST['nome'];
        $cpf = intval($_POST['cpf']);
        $rg =  $_POST['rg'];
        $email = $_POST['email'];
        $tel1 = intval($_POST['tel1']);
        $tel2 = intval($_POST['tel2']);
        $dataNasc = $_POST['dataNasc'];
        $idUsuario = intval($_POST['idUsuario']);
        $ativo = 1;

        try {
            $query = $pdo->prepare('INSERT INTO clientes (nome,cpf,rg,email,telefone1,telefone2,data_nasc,id_usuario,ativo) 
            VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )');

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
            echo 'Error: ' . $e->getMessage();
        }
    } else if ($_POST['acao'] == 'cadastraEnderecos') {

        $cpf_cliente = intval($_POST['cpf']);
        $rua = $_POST['rua'];
        $numero = $_POST['numero'];
        $bairro = $_POST['bairro'];
        $cep = intval($_POST['cep']);
        $cidade = $_POST['cidade'];
        $estado = $_POST['estado'];
        $principal = intval($_POST['principal']);
        if ($principal == 1) {
            $principal = 1;
        } else {
            $principal = 0;
        }
        $ativo = intval($_POST['ativo']);
        $id_usuario = intval($_POST['idUsuario']);

        try {
            $query = $pdo->prepare('INSERT INTO enderecos (cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal,ativo,id_usuario) 
            VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? ,? )');

            $query->bindParam(1, $cpf_cliente);
            $query->bindParam(2, $rua);
            $query->bindParam(3, $numero);
            $query->bindParam(4, $bairro);
            $query->bindParam(5, $cep);
            $query->bindParam(6, $cidade);
            $query->bindParam(7, $estado);
            $query->bindParam(8, $principal);
            $query->bindParam(9, $ativo);
            $query->bindParam(10, $id_usuario);

            $query->execute();
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
}

if ($_GET) {
    if ($_GET['acao'] == 'listarClientes') {

        try {
            $query = $pdo->prepare('SELECT id_cliente,nome,cpf,rg,email,telefone1,telefone2,data_nasc,id_usuario,ativo FROM clientes WHERE ativo =1');

            $query->execute();

            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($result);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }

    if ($_GET['acao'] == 'listarEnderecos') {

        try {
            $query = $pdo->prepare('SELECT id_endereco,cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal,ativo,id_usuario FROM enderecos WHERE ativo =1');

            $query->execute();

            $result = $query->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($result);
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }
}
