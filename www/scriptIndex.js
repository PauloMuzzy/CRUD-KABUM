$(document).ready(function () {

    $('.alertaSenhaIncorreta').hide()
    $('.alertaSenhaCorreta').hide()
    $('.alertaSenhasDiferentes').hide()
    $('.cardCadastrese').hide()
    $('.logado').hide()

    $("#btnCadastrese").click(function () {
        $('.cardLogar').hide(120)
        $('.cardCadastrese').show(120)
    });

    $("#btnVoltar").click(function () {
        $('.cardCadastrese').hide(120)
        $('.cardLogar').show(120)
    });

    // ------------------------------------- OK -----------------------------
    // SUBMIT LOGAR
    $(".formLogar").on("submit", function (e) {
        e.preventDefault()
        const loginLogar = document.getElementById("loginLogar").value
        const senhaLogar = document.getElementById("senhaLogar").value

        let arraySendPostLogar = new Array(loginLogar, senhaLogar)

        $.ajax({
            method: "POST",
            url: "/api/logar.php",
            data: { dados: arraySendPostLogar, acao: "logar" },
            success: function (res) {
                console.log(res)
                /*
                
                                const resultadoRes = res.resultado
                                const loginRes = res.login
                                const nomeRes = res.nome
                
                                $('.alertaSenhaIncorreta').hide()
                                $('.alertaSenhaCorreta').hide()
                
                                if (resultadoRes == "1") {
                                    localStorage.setItem("logado", resultadoRes)
                                    localStorage.setItem("login", loginRes)
                                    $('.alertaSenhaCorreta').show(150)
                                    $('.logado').show()
                                    const saudacao = "Olá, " + nomeRes + "."
                                    $(".nomeLogado").html(saudacao);
                
                                } else {
                                    $('.alertaSenhaIncorreta').show(150)
                                }
                 */
            }
        })
    })

    //EVENTO SAIR
    $("#btnLoadoSair").click(function () {
        localStorage.clear();
        $('Form')[0].reset();
        $('.alertaSenhaIncorreta').hide()
        $('.alertaSenhaCorreta').hide()
        $('.alertaSenhasDiferentes').hide()
        $('.cardCadastrese').hide()
        $('.logado').hide()
    });

    // ------------------------------------- OK -----------------------------
    // SUBMIT CADASTRE-SE
    $(".formCadastrese").on("submit", function (e) {
        e.preventDefault()
        console.log("oi")
        var nomeCadastrese = document.getElementById("nomeCadastrese").value
        var emailCadastrese = document.getElementById("emailCadastrese").value
        var loginCadastrese = document.getElementById("loginCadastrese").value
        var senhaCadastrese = document.getElementById("senhaCadastrese").value
        var confirmaSenhaCadastrese = document.getElementById("confimarSenhaCadastrese").value

        if (senhaCadastrese == confirmaSenhaCadastrese) {
            var arraySendPostCadastrese = new Array()
            arraySendPostCadastrese[0] = nomeCadastrese;
            arraySendPostCadastrese[1] = emailCadastrese;
            arraySendPostCadastrese[2] = loginCadastrese;
            arraySendPostCadastrese[3] = senhaCadastrese;

            $.ajax({
                method: "POST",
                url: "/api/cadastrarUser.php",
                data: { dados: arraySendPostCadastrese, acao: "inserir" },
                success: function (res) {
                    console.log(res)
                }
            })
        } else {
            $('.alertaSenhasDiferentes').show()
        }
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
})