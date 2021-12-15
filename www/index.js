$(function () {

    $("#divLogado").hide()
    $("#alertaSucessoLogin").hide()
    $("#alertaErroLogin").hide()
    $("#linkClientes").hide()
    $("#linkUsuarios").hide()

    // ------------------------------------- OK -----------------------------
    //VERIFICAR LOCALSTORAGE

    const setUsuario = function () {

        const loginUsuario = localStorage.getItem("login")
        const urlSetUsuario = "/api/usuarios.php?acao=setUsuario&login=" + loginUsuario

        $.ajax({
            method: "GET",
            url: urlSetUsuario,
            success: function (res) {
                const nome = res.nome
                const acessoCriar = res.acesso_criar
                const acessoLer = res.acesso_ler
                const acessoEditar = res.acesso_editar
                const acessoDeletar = res.acesso_deletar
                const tipoUsuario = res.tipo_usuario
                const idUsuario = res.id_usuario
                localStorage.setItem("idUsuario", idUsuario)

                if (loginUsuario == undefined) {
                    $("#divLogado").hide()
                } else {
                    const saudacao = "Ola, " + nome + "."
                    $("#saudacaoUsuario").html(saudacao);
                    $("#divLogado").show()
                }

                if (tipoUsuario == "MASTER") {
                    $("#linkClientes").show()
                    $("#linkUsuarios").show()
                } else if (tipoUsuario == "PADRAO") {
                    $("#linkClientes").show()
                }
            }
        })
    }
    setUsuario()

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

                if (res.status_logado == "1") {
                    alert("USUÁRIO LOGADO")
                    localStorage.setItem("login", loginLogar)
                } else {
                    alert("OPS! SENHA OU USUÁRIO INVALIDOS!")
                }
                location.reload()
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

