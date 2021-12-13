<?php

include("conexao.php");

header("Content-Type: application/json");
$method = $_SERVER["REQUEST_METHOD"];

// ################################### POST ###################################

// ---------------------------------- LOGAR ----------------------------------
if ($_POST["acao"] == "logar") {

    $login = $_POST["login"];
    $senha = $_POST["senha"];

    try {
        $query = $pdo->prepare("SELECT nome,hash_senha,tipo_usuario FROM usuarios WHERE LOGIN= ?");
        $query->bindParam(1, $login);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        $result_nome = $result["nome"];
        $result_tipo_usuario = $result["tipo_usuario"];
        $result_hash_senha = $result["hash_senha"];

        if (password_verify($senha,  $result_hash_senha)) {

            $login_verificado = array(
                "status_logado" => "1",
                "nome" => "$result_nome",
                "tipo_usuario" => "$result_tipo_usuario"
            );
        } else {
            $login_verificado = array(
                "resultado" => "0"
            );
        }

        echo json_encode($login_verificado);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

// ------------------- CADASTRA NOVO USUARIO
if ($_POST["acao"] == "cadastrarUsuario") {

    $nome = $_POST["nome"];
    $login = $_POST["login"];
    $senha = $_POST["senha"];
    $hash_senha = password_hash($senha, PASSWORD_DEFAULT);
    $tipo_usuario = "PADRAO";
    $acesso_criar = "HABILITADO";
    $acesso_ler = "DESABILITADO";
    $acesso_editar = "DESABILITADO";
    $acesso_deletar = "DESABILITADO";
    $ativo = 1;

    try {
        $query = $pdo->prepare("INSERT INTO usuarios (nome,login,hash_senha,tipo_usuario,acesso_criar,acesso_ler,acesso_editar,acesso_deletar,ativo) 
        VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )");

        $query->bindParam(1, $nome);
        $query->bindParam(2, $login);
        $query->bindParam(3, $hash_senha);
        $query->bindParam(4, $tipo_usuario);
        $query->bindParam(5, $acesso_criar);
        $query->bindParam(6, $acesso_ler);
        $query->bindParam(7, $acesso_editar);
        $query->bindParam(8, $acesso_deletar);
        $query->bindParam(9, $ativo);

        $query->execute();
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

// ################################### GET ################################### 

// ------------------------ FAZ LOGIN COM LOCALSTORAGE -----------------------
if ($_GET["acao"] == "loginLocalstorage") {

    $login = $_GET["login"];

    try {
        $query = $pdo->prepare("SELECT id_usuario,nome,tipo_usuario FROM usuarios WHERE login= ?");
        $query->bindParam(1, $login);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

// // ------------------------- LISTA DE USUÁRIOS UPDATE----------------------------
if ($_GET["acao"] == "listaUsuariosUpdate") {

    try {
        $query = $pdo->prepare('SELECT id_usuario,nome,login,tipo_usuario,acesso_criar,acesso_ler,acesso_editar,acesso_deletar,ativo FROM usuarios WHERE tipo_usuario="PADRAO" AND ativo =1');

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

// // ------------------------- LISTA DE USUÁRIOS UPDATE----------------------------
if ($_GET["acao"] == "listaUsuariosDelete") {

    try {
        $query = $pdo->prepare('SELECT id_usuario,nome,login,tipo_usuario,ativo FROM usuarios WHERE tipo_usuario="PADRAO" AND ativo =1');

        $query->execute();

        $result = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}


// ------------------- BUSCA USUARIO PARA FAZER UPDATE -----------------------
if ($_GET["acao"] == "updateUsuario") {

    $id = $_GET["id"];

    try {
        $query = $pdo->prepare("SELECT login,acesso_criar,acesso_ler,acesso_editar,acesso_deletar FROM usuarios WHERE id_usuario=?");
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

    $action = ($_PUT["action"]);

    if ($action == "update") {
        $create = $_PUT["create"];
        $read = $_PUT["read"];
        $update = $_PUT["update"];
        $delete = $_PUT["delete"];
        $id = $_PUT["id"];

        try {
            $query = $pdo->prepare("UPDATE usuarios SET acesso_criar=?,acesso_ler=?,acesso_editar=?,acesso_deletar=? WHERE id_usuario=?");

            $query->bindParam(1, $create);
            $query->bindParam(2, $read);
            $query->bindParam(3, $update);
            $query->bindParam(4, $delete);
            $query->bindParam(5, $id);

            $query->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else if ($action == "softDelete") {

        $ativo = ($_PUT["ativo"]);
        $id = intval($_PUT["id"]);

        try {
            $query = $pdo->prepare("UPDATE usuarios SET ativo=? WHERE id_usuario=?");

            $query->bindParam(1, $ativo);
            $query->bindParam(2, $id);

            $query->execute();
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }
}
