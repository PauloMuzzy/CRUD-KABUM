$(function () {

    $("#alertLoginSuccess").hide()
    $("#alertLoginFail").hide()
    $("#statusLogin").hide()
    $("#formRegisterUser").hide()
    $("#linkCrudUsers").hide()

    const statusLogged = () => {
        $("#statusLogin").show()
    }

    $("#btnShowFormLogin").click(function () {
        $("#formLogin").show()
        $("#formRegisterUser").hide()
    })

    $("#btnFormRegisterUser").click(function () {
        $("#formRegisterUser").show()
        $("#formLogin").hide()

    })

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
                        $("#linkCrudUsers").show()
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
    //CADASTRAR USUARIO
    $("#formCadastraUsuario").on("submit", function (e) {
        e.preventDefault()

        const nomeCadastraUsuario = document.getElementById("nomeCadastraUsuario").value
        const loginCadastraUsuario = document.getElementById("loginCadastraUsuario").value
        const senhaCadastraUsuario = document.getElementById("senhaCadastraUsuario").value
        const emailCadastraUsuario = document.getElementById("emailCadastraUsuario").value
        const objCadastraUsuarios = { nome: nomeCadastraUsuario, login: loginCadastraUsuario, senha: senhaCadastraUsuario, email: emailCadastraUsuario }

        $.ajax({
            method: "POST",
            url: "/api/usuarios.php",
            data: objCadastraUsuarios,
            success: function (res) {
            }
        })
    })

    $("#btnExitLogin").click(function () {
        const logOff = () => {
            localStorage.clear()
            location.reload()
        }
        logOff()
    })
})

