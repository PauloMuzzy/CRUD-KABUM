<?php

include('conexao.php');

header('Content-Type: application/json');

if ($_POST["acao"] == "logar") {

    $arrayLoginSenha = $_POST['dados'];

    $usuarioLogin = $arrayLoginSenha[0];
    $usuarioSenha = $arrayLoginSenha[1];

    $query = $pdo->prepare('SELECT nome ,email ,senha ,typeuser ,attcreat ,attread ,attupdate ,attdelet FROM usuarios WHERE login= ?');
    $query->bindParam(1, $usuarioLogin);
    $query->execute();

    $result = $query->fetch(PDO::FETCH_ASSOC);

    $resultNome = $result['nome'];
    $resultTypeUser = $result['typeuser'];
    $resultAttCreat = $result['attcreat'];
    $resultAttRead = $result['attread'];
    $resultAttUpdate = $result['attupdate'];
    $resultAttDelet = $result['attdelet'];


    if (password_verify($usuarioSenha,  $result['senha'])) {

        $senhaVerificada = array(
            "statusLogado" => "1",
            "nome" => "$resultNome",
            "typeUser" => "$resultTypeUser",
            "attCreat" => "$resultAttCreat",
            "attRead" => "$resultAttRead",
            "attUpdate" => "$resultAttUpdate",
            "attDelet" => "$resultAttDelet"
        );

        echo json_encode($senhaVerificada);
    } else {
        $senhaVerificada = array(
            "resultado" => "0"
        );
        echo json_encode($senhaVerificada);
    }
}
