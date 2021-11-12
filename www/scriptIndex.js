$(document).ready(function () {

    function verificaLogin() {
        var pegarLogin = localStorage.getItem("login")
        var pegarSenha = localStorage.getItem("senha")

        $("#loginCliente").hide();
        // validação sem back-end
        if (pegarLogin == "paulo muzzy" && pegarSenha == "123123") {
            // console.log("LOGADO")
            var chaveLogado = "1"
            localStorage.setItem("estaLogado", chaveLogado)
            let saudacao = "Olá, " + pegarLogin
            $("div.nomeCliente").html(saudacao)
            $("#loginCliente").show()

        } else {
            // console.log("DESLOGADO");
            var chaveLogado = "0"
            localStorage.setItem("estaLogado", chaveLogado)
            $("#loginCliente").hide()
        }
    }

    $(".erroLogin").hide()
    verificaLogin()

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


    //Submit Login (ENTRAR)

    $("#formLogin").on("submit", function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const formProps = Object.fromEntries(formData)
        localStorage.setItem("login", document.querySelector("#loginLogin").value)
        localStorage.setItem("senha", document.querySelector("#loginSenha").value)
        verificaLogin()

        var pegaChaveEstaLogado = localStorage.getItem("estaLogado");
        if (pegaChaveEstaLogado == "0") {
            $(".erroLogin").show()
        }
    })

    // DESLOGAR CRUD
    $("#btSairLogin").on("click", function () {
        localStorage.clear()
        verificaLogin();
    })

    //Submit Cadastr-se
    $("#formCadastrese").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData)
        console.log(formProps)
    })

})

