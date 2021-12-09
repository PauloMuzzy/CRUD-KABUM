<?php

include('conexao.php');

header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];

// ------------------- LOGAR
if ($_GET['acao'] == "logar") {

    $login = $_GET['login'];
    $senha = $_GET['senha'];

    try {
        $query = $pdo->prepare('SELECT nome ,hash_senha ,usuario_tipo FROM usuarios WHERE LOGIN= ?');
        $query->bindParam(1, $login);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        $result_nome = $result['nome'];
        $result_usuario_tipo = $result['usuario_tipo'];

        if (password_verify($senha,  $result['hash_senha'])) {

            $login_verificado = array(
                "status_logado" => "1",
                "nome" => "$result_nome",
                "usuario_tipo" => "$result_usuario_tipo"
            );
            echo json_encode($login_verificado);
        } else {
            $login_verificado = array(
                "resultado" => "0"
            );
            echo json_encode($login_verificado);
        }
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// ------------------- FAZ LOGIN COM LOCALSTORAGE
if ($_GET['acao'] == "loginLocalstorage") {

    $login = $_GET['login'];


    try {
        $query = $pdo->prepare('SELECT nome, usuario_tipo FROM usuarios WHERE login= ?');
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
        $query = $pdo->prepare('SELECT id_usuario,nome,login,usuario_tipo,acesso_criar,acesso_ler,acesso_editar,acesso_deletar,ativo FROM usuarios WHERE usuario_tipo=0 AND ativo =1');

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
        $query = $pdo->prepare('SELECT login,acesso_criar,acesso_ler,acesso_editar,acesso_deletar FROM usuarios WHERE id_usuario=?');
        $query->bindParam(1, $id);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// ------------------- CADASTRA NOVO USUARIO
if ($_POST['acao'] == 'cadastrarUsuario') {

    $nome = ($_POST['nome']);
    $login = ($_POST['login']);
    $senha = ($_POST['senha']);

    echo $senha, "\n";

    $hash_senha = password_hash($senha, PASSWORD_DEFAULT);

    echo $hash_senha, "\n";

    $usuario_tipo = 0;
    $acesso_criar = 1;
    $acesso_ler = 0;
    $acesso_editar = 0;
    $acesso_deletar = 0;
    $ativo = 1;

    try {
        $query = $pdo->prepare('INSERT INTO usuarios (nome,login,hash_senha,usuario_tipo,acesso_criar,acesso_ler,acesso_editar,acesso_deletar,ativo) 
        VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )');

        $query->bindParam(1, $nome);
        $query->bindParam(2, $login);
        $query->bindParam(3, $hash_senha);
        $query->bindParam(4, $usuario_tipo);
        $query->bindParam(5, $acesso_criar);
        $query->bindParam(6, $acesso_ler);
        $query->bindParam(7, $acesso_editar);
        $query->bindParam(8, $acesso_deletar);
        $query->bindParam(9, $ativo);

        $query->execute();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// if ($method === 'PUT') {
//     parse_str(file_get_contents('php://input'), $_PUT);

//     $action = ($_PUT['action']);

//     if ($action == "update") {
//         $create = ($_PUT['create']);
//         $read = ($_PUT['read']);
//         $update = ($_PUT['update']);
//         $delete = ($_PUT['delete']);
//         $id = ($_PUT['id']);

//         try {
//             $query = $pdo->prepare('UPDATE USUARIOS SET ACESSO_CREATE=?,ACESSO_READ=?,ACESSO_UPDATE=?,ACESSO_DELETE=? WHERE ID=?');

//             $query->bindParam(1, $_PUT['create'], PDO::PARAM_STR);
//             $query->bindParam(2, $_PUT['read'], PDO::PARAM_STR);
//             $query->bindParam(3, $_PUT['update'], PDO::PARAM_STR);
//             $query->bindParam(4, $_PUT['delete'], PDO::PARAM_STR);
//             $query->bindParam(5, $id, PDO::PARAM_INT);

//             $query->execute();

//             echo json_encode("1");
//         } catch (PDOException $e) {
//             echo 'Error: ' . $e->getMessage();
//         }
//     } else if ($action == "softDelete") {

//         $ativo = ($_PUT['ativo']);
//         $id = ($_PUT['id']);

//         try {
//             $query = $pdo->prepare('UPDATE USUARIOS SET ATIVO=? WHERE ID=?');

//             $query->bindParam(1, $ativo, PDO::PARAM_STR);
//             $query->bindParam(2, $id, PDO::PARAM_STR);

//             $query->execute();

//             echo json_encode($id);
//         } catch (PDOException $e) {
//             echo 'Error: ' . $e->getMessage();
//         }
//     }
// }
