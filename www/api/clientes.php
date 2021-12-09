<?php

include('conexao.php');

// header('Content-Type: application/json');

if ($_POST) {

    $enderecoNumero = $_POST['enderecoNumero'];
    $cpf = intval($_POST['cpf']);
    $rua = $_POST['rua'];
    $numero = intval($_POST['numero']);
    $bairro = $_POST['bairro'];
    $cep = intval($_POST['cep']);
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $principal = intval($_POST['principal']);
    $ativo = intval($_POST['ativo']);

    try {
        $query = $pdo->prepare('INSERT INTO enderecos (cpf_cliente,rua,numero,bairro,cep,cidade,estado,principal,ativo) 
        VALUES (? ,? ,? ,? ,? ,? ,? ,? ,? )');

        $query->bindParam(1, $cpf);
        $query->bindParam(2, $rua);
        $query->bindParam(3, $numero);
        $query->bindParam(4, $bairro);
        $query->bindParam(5, $cep);
        $query->bindParam(6, $cidade);
        $query->bindParam(7, $estado);
        $query->bindParam(8, $principal);
        $query->bindParam(9, $ativo);

        $query->execute();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }

    // echo gettype($cpf), "\n";
    // echo gettype($rua), "\n";
    // echo gettype($numero), "\n";
    // echo gettype($bairro), "\n";
    // echo gettype($cep), "\n";
    // echo gettype($cidade), "\n";
    // echo gettype($estado), "\n";
    // echo gettype($principal), "\n";
    // echo gettype($ativo), "\n";

    // integer cpf
    // string rua
    // integer numero
    // string bairro
    // integer cep
    // string cidade
    // string estado
    // integer princ
    // integer ativo
}
