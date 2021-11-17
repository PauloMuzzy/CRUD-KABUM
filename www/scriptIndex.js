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

    });

    // Submit CADASTRE-SE

    $(".formCadastrese").on("submit", function () {
        var nomeCadastrese = document.getElementById("nomeCadastrese").value
        var emailCadastrese = document.getElementById("emailCadastrese").value
        var loginCadastrese = document.getElementById("loginCadastrese").value
        var senhaCadastrese = document.getElementById("senhaCadastrese").value
        var confirmaSenhaCadastrese = document.getElementById("confimarSenhaCadastrese").value

        console.log(nomeCadastrese)
        console.log(emailCadastrese)
        console.log(loginCadastrese)
        console.log(senhaCadastrese)
        console.log(confirmaSenhaCadastrese)

        var arraySendPostCadastrese = new Array()
        arraySendPostCadastrese[0] = nomeCadastrese;
        arraySendPostCadastrese[1] = emailCadastrese;
        arraySendPostCadastrese[2] = loginCadastrese;
        arraySendPostCadastrese[3] = senhaCadastrese;
        arraySendPostCadastrese[4] = confirmaSenhaCadastrese;

        console.log(arraySendPostCadastrese)

        $.ajax({
            method: "POST",
            url: "/api/cadastrarUser.php",
            data: { dados: arraySendPostCadastrese, acao: "inserir" },
            success: function (res) {
                console.log(res)
            }
        })

    });






    /*$(".formCadastrese").on("submit", function (e) {
        e.preventDefault();
        var fData = $('.formCadastrese').serialize();
        console.log(fData)
        
         e.preventDefault();
         const formData = new FormData(e.target);
         const formProps = Object.fromEntries(formData)       
        

    $.ajax({
            method: "POST",
            url: "/api/cadastrarUser.php",
            data: fData,
            success: function () {
                console.log("oi")
            }
        })
     */

})


/*
//Troca Div ENTRAR/CADASTRAR
$("#formCadastrese").hide()
$("#trocaDiv1").click(function () {
$("#formCadastrese").show(150)
$("#formLogin").hide(150)
})

$("#trocaDiv2").click(function () {
$("#formLogin").show(150);
$("#formCadastrese").hide(150)
})

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
