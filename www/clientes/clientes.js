$(function () {

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
                    if (res.TYPE_USER == "MASTER") {
                        $("#btnFormUpdateUsuario").show()
                    }
                }
            })
        } else {
            window.location.href = "../index.html"
        }
    }
    verificaLocalstorage()

})