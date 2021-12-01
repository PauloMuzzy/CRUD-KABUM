<?php

include('conexao.php');

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

// ------------------- LOGAR
if ($_GET['acao'] == "logar") {

    $login = $_GET['login'];
    $senha = $_GET['senha'];

    try {
        $query = $pdo->prepare('SELECT NOME ,HASH_SENHA ,TYPE_USER FROM USUARIOS WHERE LOGIN= ?');
        $query->bindParam(1, $login);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        $resultNome = $result['NOME'];
        $resultType_User = $result['TYPE_USER'];

        if (password_verify($senha,  $result['HASH_SENHA'])) {

            $loginVerificado = array(
                "statusLogado" => "1",
                "nome" => "$resultNome",
                "typeUser" => "$resultType_User"
            );

            echo json_encode($loginVerificado);
        } else {
            $loginVerificado = array(
                "resultado" => "0"
            );
            echo json_encode($loginVerificado);
        }
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// ------------------- FAZ LOGIN COM LOCALSTORAGE
if ($_GET['acao'] == "loginLocalstorage") {

    $login = $_GET['login'];

    try {
        $query = $pdo->prepare('SELECT NOME, TYPE_USER FROM USUARIOS WHERE LOGIN= ?');
        $query->bindParam(1, $login);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// // ------------------- LISTA DE USUÁRIOS
if ($_GET['acao'] == "listaUsuarios") {

    try {
        $query = $pdo->prepare('SELECT ID,NOME,LOGIN,TYPE_USER,ACESSO_CREATE,ACESSO_READ,ACESSO_UPDATE,ACESSO_DELETE,ATIVO FROM USUARIOS WHERE TYPE_USER ="PADRAO"');

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// ------------------- BUSCA USUARIO PARA FAZER UPDATE
if ($_GET['acao'] == "updateUsuario") {

    $id = $_GET['id'];

    try {
        $query = $pdo->prepare('SELECT LOGIN,ACESSO_CREATE,ACESSO_READ,ACESSO_UPDATE,ACESSO_DELETE FROM USUARIOS WHERE ID=?');
        $query->bindParam(1, $id);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// ------------------- CADASTRA NOVO USUARIO
if ($_POST) {

    $nome = ($_POST['nome']);
    $login = ($_POST['login']);
    $senha = ($_POST['senha']);
    $email = ($_POST['email']);

    $hashsenha = password_hash($senha, PASSWORD_DEFAULT);

    $type_user = "PADRAO";
    $acesso_create = "HABILITADO";
    $acesso_read = "DESABILITADO";
    $acesso_update = "DESABILITADO";
    $acesso_delete = "DESABILITADO";
    $ativo = "1";

    try {
        $query = $pdo->prepare('INSERT INTO USUARIOS (NOME,LOGIN,HASH_SENHA,EMAIL,TYPE_USER,ACESSO_CREATE,ACESSO_READ,ACESSO_UPDATE,ACESSO_DELETE,ATIVO) 
        VALUES (? ,? ,? ,? ,? ,? ,? ,? , ?, ?)');

        $query->bindParam(1, $nome);
        $query->bindParam(2, $login);
        $query->bindParam(3, $hashsenha);
        $query->bindParam(4, $email);
        $query->bindParam(5, $type_user);
        $query->bindParam(6, $acesso_create);
        $query->bindParam(7, $acesso_read);
        $query->bindParam(8, $acesso_update);
        $query->bindParam(9, $acesso_delete);
        $query->bindParam(10, $ativo);

        $query->execute();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

if ($method === 'PUT') {
    parse_str(file_get_contents('php://input'), $_PUT);

    $acesso = ($_PUT['acesso']);
    $valor = ($_PUT['valor']);
    $id = ($_PUT['id']);

    try {
        if ($acesso == "ACESSO_CREATE") {
            $query = $pdo->prepare('UPDATE USUARIOS SET ACESSO_CREATE=? WHERE ID=?');
        } else if ($acesso == "ACESSO_READ") {
            $query = $pdo->prepare('UPDATE USUARIOS SET ACESSO_READ=? WHERE ID=?');
        } else if ($acesso == "ACESSO_UPDATE") {
            $query = $pdo->prepare('UPDATE USUARIOS SET ACESSO_UPDATE=? WHERE ID=?');
        } else if ($acesso == "ACESSO_DELETE")
            $query = $pdo->prepare('UPDATE USUARIOS SET ACESSO_DELETE=? WHERE ID=?');

        $query->bindParam(1, $valor, PDO::PARAM_STR);
        $query->bindParam(2, $id, PDO::PARAM_STR);

        $query->execute();

        echo json_encode($valor);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}
