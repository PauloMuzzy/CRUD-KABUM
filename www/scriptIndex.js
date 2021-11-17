$(document).ready(function () {

    // Submit LOGAR
    $(".formLogar").on("submit", function () {
        var loginLogar = document.getElementById("loginLogar").value
        var senhaLogar = document.getElementById("senhaLogar").value

        console.log(loginLogar)
        console.log(senhaLogar)

        var arraySendPostLogar = new Array()
        arraySendPostLogar[0] = loginLogar;
        arraySendPostLogar[1] = senhaLogar;

        console.log(arraySendPostLogar)

        $.ajax({
            method: "POST",
            url: "/api/logar.php",
            data: { dados: arraySendPostLogar, acao: "inserir" },
            success: function (res) {
                console.log(res)
            }
        })

    })

    // Submit CADASTRE-SE
    $(".formCadastrese").on("submit", function () {
        var nomeCadastrese = document.getElementById("nomeCadastrese").value
        var emailCadastrese = document.getElementById("emailCadastrese").value
        var loginCadastrese = document.getElementById("loginCadastrese").value
        var senhaCadastrese = document.getElementById("senhaCadastrese").value
        // var confirmaSenhaCadastrese = document.getElementById("confimarSenhaCadastrese").value

        var arraySendPostCadastrese = new Array()
        arraySendPostCadastrese[0] = nomeCadastrese;
        arraySendPostCadastrese[1] = emailCadastrese;
        arraySendPostCadastrese[2] = loginCadastrese;
        arraySendPostCadastrese[3] = senhaCadastrese;
        //arraySendPostCadastrese[4] = confirmaSenhaCadastrese;


        $.ajax({
            method: "POST",
            url: "/api/cadastrarUser.php",
            data: { dados: arraySendPostCadastrese, acao: "inserir" },
            success: function (res) {
                console.log(res)
            }
        })

    })

})

/*
//Mascaras
$('#cpf').mask('999.999.999-99');

//Mascara RG
var mascaraRg = {
'translation': {
    A: {
        pattern: /[A-Za-z0-9]/
    }
}
};
$('#rg').mask('99.999.999-A' || '99.999.999-99', mascaraRg);
$('#telefone1').mask('(99)99999-9999');
$('#telefone2').mask('(99)99999-9999');
*/
