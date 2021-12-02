$(function () {

    // ------------------------------------- OK -----------------------------
    //VERIFICAR LOCALSTORAGE
    const verificaLocalstorage = () => {

        const logadoLocalstorage = localStorage.getItem("logado")

        if (logadoLocalstorage == "1") {

            const loginLocalstorage = localStorage.getItem("login")
            const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage
            $.ajax({
                method: "GET",
                url: urlLoginLocalstorage,
                success: function (res) {
                    const saudacao = "Olá, " + res.NOME + "."
                    $(".saudacao").html(saudacao)
                    mostrarLogado()
                    if (res.TYPE_USER == "MASTER") {
                        $("#btnFormUpdateUsuario").show()
                    }
                }
            })
        }
    }
    verificaLocalstorage()


    // ------------------------------------- OK -----------------------------
    //LOGAR    
    $(".formLogar").on("submit", (e) => {
        e.preventDefault()
        const loginLogar = document.getElementById("loginLogar").value
        const senhaLogar = document.getElementById("senhaLogar").value

        const urlLogar = "/api/usuarios.php?acao=logar&login=" + loginLogar + "&senha=" + senhaLogar

        $.ajax({
            method: "GET",
            url: urlLogar,
            success: function (res) {

                const statusLogadoRes = res.statusLogado

                if (statusLogadoRes == "1") {
                    localStorage.setItem("logado", "1")
                    localStorage.setItem("login", loginLogar)
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


})
