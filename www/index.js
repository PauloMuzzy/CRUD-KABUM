$(function () {

    $("#divLogado").hide()
    $("#alertaSucessoLogin").hide()
    $("#alertaErroLogin").hide()
    $("#linkClientes").hide()
    $("#linkUsuarios").hide()

    // ------------------------------------- OK -----------------------------
    //VERIFICAR LOCALSTORAGE
    const verificaLogin = () => {

        const logadoLocalstorage = localStorage.getItem("logado")

        if (logadoLocalstorage == "1") {

            const loginLocalstorage = localStorage.getItem("login")
            const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage

            $.ajax({
                method: "GET",
                url: urlLoginLocalstorage,
                success: function (res) {

                    const saudacao = "Olá, " + res.nome + "."
                    $("#saudacaoUsuario").html(saudacao)
                    $("#divLogado").show()
                    idUsuario = res.id_usuario
                    tipoUsuario = res.tipo_usuario

                    if (tipoUsuario == "MASTER") {
                        $("#linkClientes").show()
                        $("#linkUsuarios").show()
                    } else if (tipoUsuario == "PADRAO") {
                        $("#linkClientes").show()
                    }
                }
            })
        }
    }
    verificaLogin()

    // ------------------------------------- OK -----------------------------
    //LOGAR    
    $("#botaoEntrar").click(function (e) {
        e.preventDefault()
        const loginLogar = document.getElementById("loginLogar").value
        const senhaLogar = document.getElementById("senhaLogar").value

        const objLogar = {
            acao: "logar",
            login: loginLogar,
            senha: senhaLogar
        }

        $.ajax({
            method: "POST",
            url: "/api/usuarios.php",
            data: objLogar,
            success: function (res) {
                localStorage.setItem("logado", "1")
                localStorage.setItem("login", loginLogar)
                localStorage.setItem("tipoUsuario", res.tipo_usuario)
                $("#alertaSucessoLogin").show()
                setTimeout(location.reload(), 150000)
            }
        })
    })

    // ------------------------------------- OK -----------------------------

    $("#botaoSairLogado").click(function () {
        const sairLogado = function () {
            localStorage.clear()
            location.reload()
        }
        sairLogado()
    })
})

