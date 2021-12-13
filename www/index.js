$(function () {

    $("#alertLoginSuccess").hide()
    $("#alertLoginFail").hide()
    $("#statusLogin").hide()
    $("#linkCrudUsers").hide()
    $("#btnShowUsers").hide()
    $("#btnShowCustomers").hide()

    const statusLogged = () => {
        $("#statusLogin").show()
    }

    // ------------------------------------- OK -----------------------------
    //VERIFICAR LOCALSTORAGE
    const verificaLogin = () => {

        const logadoLocalstorage = localStorage.getItem("logado")

        if (logadoLocalstorage == "1") {

            const loginLocalstorage = localStorage.getItem("login")

            const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage

            statusLogged()

            $.ajax({
                method: "GET",
                url: urlLoginLocalstorage,
                success: function (res) {

                    idUsuario = res.id_usuario

                    const salutation = "Olá, " + res.nome + "."
                    $("#salutation").html(salutation)
                    $("#btnShowCustomers").show()

                    if (res.usuario_tipo == "MASTER") {
                        $("#btnShowUsers").show()

                    }
                }
            })
        }
    }
    verificaLogin()

    // ------------------------------------- OK -----------------------------
    //LOGAR    
    $("#formLogin").click((e) => {
        e.preventDefault()
        const loginLogar = document.getElementById("loginLogar").value
        const senhaLogar = document.getElementById("senhaLogar").value
        const urlLogar = "/api/usuarios.php?acao=logar&login=" + loginLogar + "&senha=" + senhaLogar

        $.ajax({
            method: "GET",
            url: urlLogar,
            success: function (res) {

                const statusLogadoRes = res.status_logado

                if (statusLogadoRes == "1") {
                    localStorage.setItem("logado", "1")
                    localStorage.setItem("login", loginLogar)
                    localStorage.setItem("usuario_tipo", res.usuario_tipo)
                    location.reload()

                } else {
                    $(".alerta").show(200)
                    $("#btnAlertaSenha").click(() => {
                        $(".formLogar").clear()
                    })
                }
            }
        })
    })

    // ------------------------------------- OK -----------------------------

    $("#btnExitLogin").click(function () {
        const logOff = () => {
            localStorage.clear()
            location.reload()
        }
        logOff()
    })
})

