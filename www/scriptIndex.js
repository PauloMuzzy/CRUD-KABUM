$(function () {

    $("#alertLoginSuccess").hide()
    $("#alertLoginFail").hide()
    $("#statusLogin").hide()
    $("#linkCrudUsers").hide()
    $("#btnShowUsuersIfMaster").hide()

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
            $.ajax({
                method: "GET",
                url: urlLoginLocalstorage,
                success: function (res) {
                    const salutation = "Olá, " + res.NOME + "."
                    $("#salutation").html(salutation)
                    if (res.TYPE_USER == "MASTER") {
                        $("#btnShowUsuersIfMaster").show()
                        statusLogged()
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

        console.log(urlLogar)

        $.ajax({
            method: "GET",
            url: urlLogar,
            success: function (res) {
                console.log(res)

                const statusLogadoRes = res.statusLogado

                if (statusLogadoRes == "1") {
                    localStorage.setItem("logado", "1")
                    localStorage.setItem("login", loginLogar)
                    localStorage.setItem("TypeUser", res.typeUser)
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

