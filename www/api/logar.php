<?php

include('conexao.php');

header('Content-Type: application/json');

if ($_POST["acao"] == "logar") {

    $arrayLoginSenha = $_POST['dados'];

    $usuarioLogin = $arrayLoginSenha[0];
    $usuarioSenha = $arrayLoginSenha[1];

    /*   
    $stmt = $pdo->query('SELECT senha FROM usuarios WHERE login = $usuarioLogin ');
    while ($linha = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "Nome: {$linha['nome']} - Usuário: {$linha['usuario']}<br />";
    */

    $resultSenhaLogar = "SELECT senha FROM usuarios WHERE login = '$usuarioLogin'";
    $resultadoSenhaLogar = mysqli_query($conn, $resultSenhaLogar);

    while ($rows_usuarios = mysqli_fetch_array($resultadoSenhaLogar)) {
        $usuarioSenhaHash = $rows_usuarios['senha'];
    }

    $resultNomeLogar = "SELECT nome FROM usuarios WHERE login = '$usuarioLogin'";
    $resultadoNomeLogar = mysqli_query($conn, $resultNomeLogar);

    while ($rows_usuarios = mysqli_fetch_array($resultadoNomeLogar)) {
        $usuarioNome = $rows_usuarios['nome'];
    }
}

if (password_verify($usuarioSenha, $usuarioSenhaHash)) {

    $senhaVerificada = array(
        "resultado" => "1",
        "login" => "$usuarioLogin",
        "nome" => "$usuarioNome"
    );

    echo json_encode($senhaVerificada);
} else {
    $senhaVerificada = array(
        "resultado" => "0"
    );
    echo json_encode($senhaVerificada);
}
