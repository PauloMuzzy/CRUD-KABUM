$(document).ready(function () {

    //Troca Div ENTRAR/CADASTRAR
    $("#formCadastrese").hide();
    $("#trocaDiv1").click(function () {
        $("#formCadastrese").show(150);
        $("#formLogin").hide(150);
    });

    $("#trocaDiv2").click(function () {
        $("#formLogin").show(150);
        $("#formCadastrese").hide(150);
    });

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

    //Submit Login
    $("#formLogin").on("submit", function (e) {
        //e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData)
        localStorage.setItem("login", document.querySelector("#loginLogin").value);
        localStorage.setItem("senha", document.querySelector("#loginSenha").value);
    });


    /*
    $("#formCadastrese").on("submit", function () {
        preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

    });
    */

    //let testeLS = document.querySelector("#loginLogin").value = localStorage.getItem("loginLogin");

    /*
    if (logado == 1) {
        console.log("deu");
        $(".loginCliente").show();

    } else {
        $(".loginCliente").hide();
    }

    */

    const pegarLogin = localStorage.getItem("login");
    const pegarSenha = localStorage.getItem("senha");

    console.log(pegarLogin);
    console.log(pegarSenha);

    if (pegarLogin == "paulo muzzy" && pegarSenha == "123123") {
        console.log("login ok");

    } else {
        console.log("DESLOGADO");
    }

});