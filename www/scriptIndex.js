$(function () {

    //ESTADO DEFAULT DIVS
    $(".formLogar").show()
    $(".formCadastraUsuario").hide()
    $(".formUpdateUsuario").hide()
    $(".usuarioLogado").hide()
    $(".tabelaUsuarios").hide()
    $(".alerta").hide()
    $("#btnTabelaUsuarios").hide()
    $("#btnFormUpdateUsuario").hide()

    //FUNÇÃO MOSTRA SOMENTE O FORM DE LOGAR     
    const mostrarFormLogar = () => {
        $(".formLogar").show()
        $(".formCadastraUsuario").hide()
        $(".formUpdateUsuario").hide()
        $(".tabelaUsuarios").hide()
    }

    //FUNÇÃO MOSTRA SOMENTE O FORM DE CADASTRE-SE
    const mostrarFormCadastraUsuario = () => {
        $(".formLogar").hide()
        $(".formCadastraUsuario").show()
        $(".formUpdateUsuario").hide()
        $(".tabelaUsuarios").hide()
    }

    $("#btnCadastraUsuario").click(() => {
        mostrarFormCadastraUsuario()
    })

    //FUNÇÃO MOSTRA SOMENTE O FORM DE UPDATE
    const mostrarFormUpdateUsuario = () => {
        $(".formLogar").hide()
        $(".formCadastraUsuario").hide()
        $(".formUpdateUsuario").show()
        $(".tabelaUsuarios").hide()
    }

    //FUNÇÃO MOSTRAR TABELA USUÁRIOS
    const mostrarTabelaUsuarios = () => {
        $(".formLogar").hide()
        $(".formCadastraUsuario").hide()
        $(".formUpdateUsuario").hide()
        $(".tabelaUsuarios").show()
    }

    //FUNÇÃO MOSTRAR LOGADO
    const mostrarLogado = () => {
        $(".usuarioLogado").show()
    }

    //MOSTRAR CADASTRE-SE
    $("#btnCadastraUsuario").click(() => {
        mostrarFormCadastraUsuario()
    })

    $("#btnFormUpdateUsuario").click(() => {
        mostrarFormUpdateUsuario()
    })

    //VOLTAR
    $(".btnIndexVoltar").click(() => {
        location.reload()
    })

    $("#btnLogadoSair").click(() => {
        localStorage.clear()
        location.reload()
    })

    // ------------------------------------- OK -----------------------------
    //MOSTRAR LOGIN
    $("#btnFormLogar").click(() => {
        mostrarFormLogar()
    })

    //SUBMIT LOGAR    
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
    //VERIFICA LOCALSTORAGE
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
                    if (res.TYPE_USER == "1") {
                        $("#btnTabelaUsuarios").show()
                        $("#btnFormUpdateUsuario").show()
                    }
                }
            })
        }
    }
    verificaLocalstorage()

    // ------------------------------------- OK -----------------------------
    //SUBMIT CADASTRA USUARIO
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

    // ------------------------------------- OK -----------------------------
    //BUSCA USUARIOS
    $("#btnTabelaUsuarios").click(() => {

        mostrarTabelaUsuarios()

        $("#tbody tr").remove()

        $.ajax({
            method: "GET",
            url: "/api/usuarios.php?acao=listaUsuarios",
            success: (res) => {

                console.log(res)

                res.forEach(function (row) {

                    var tableBody = document.getElementById("tbody");
                    var newRow = document.createElement("tr");
                    tableBody.appendChild(newRow);

                    Object.values(row).forEach(value => {
                        var newCell = document.createElement("td");
                        newCell.textContent = value;
                        newRow.appendChild(newCell);
                    })
                    var actionsCell = document.createElement("td");
                    var btnActionUpdate = document.createElement("button")
                    var btnActionDelete = document.createElement("button")
                    btnActionUpdate.setAttribute("data-id", row.ID)
                    btnActionDelete.setAttribute("data-id", row.ID)
                    btnActionUpdate.setAttribute("class", "btn btn-verde btnTabelaUpdate")
                    btnActionDelete.setAttribute("class", "btn btn-vermelho btnTabelaDelete")
                    btnActionUpdate.textContent = "UPDATE"
                    btnActionDelete.textContent = "DELETE"
                    actionsCell.appendChild(btnActionUpdate)
                    actionsCell.appendChild(btnActionDelete)
                    newRow.appendChild(actionsCell)
                });

                $(".btnTabelaUpdate").click(function () {

                    const idBtnUpdate = $(this).attr('data-id')
                    const urlIdBtnUpdate = "/api/usuarios.php?acao=updateUsuario&id=" + idBtnUpdate
                    console.log(urlIdBtnUpdate)

                    $.ajax({
                        method: "GET",
                        url: urlIdBtnUpdate,
                        success: (res) => {
                            console.log(res)

                            const insereDadosInputUpdateUsuario = () => {

                                const idUpdateUsuario = idBtnUpdate
                                $("#idUpdateUsuario").val(idUpdateUsuario);

                                const loginUpdateUsuario = res.LOGIN
                                $("#loginUpdateUsuario").val(loginUpdateUsuario);

                                const createUpdateUsuario = res.ACESSO_CREATE
                                $("#createUpdateUsuario").val(createUpdateUsuario);
                                if (createUpdateUsuario == "1") {
                                    $("#createUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#createUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const readUpdateUsuario = res.ACESSO_READ
                                $("#readUpdateUsuario").val(readUpdateUsuario);
                                if (readUpdateUsuario == "1") {
                                    $("#readUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#readUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const updateUpdateUsuario = res.ACESSO_UPDATE
                                $("#updateUpdateUsuario").val(updateUpdateUsuario);
                                if (readUpdateUsuario == "1") {
                                    $("#updateUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#updateUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const deleteUpdateUsuario = res.ACESSO_DELETE
                                $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                                if (deleteUpdateUsuario == "1") {
                                    $("#deleteUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#deleteUpdateUsuario").attr("class", "btn btn-cinza")
                                }
                            }

                            insereDadosInputUpdateUsuario()
                            mostrarFormUpdateUsuario()

                            $("#createUpdateUsuario").click(() => {

                                const idCreatUpdateUsuarios = document.querySelector("#createUpdateUsuario");
                                let valorCreatUpdateUsuarios = idCreatUpdateUsuarios.value;

                                if (valorCreatUpdateUsuarios == "1") {
                                    valorCreatUpdateUsuarios = "0"
                                } else {
                                    valorCreatUpdateUsuarios = "1"
                                }

                                const objValorCreatUpdateUsuarios = { acao: "update", id: idBtnUpdate, acesso: "ACESSO_CREATE", valor: valorCreatUpdateUsuarios }

                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/usuarios.php',
                                    data: objValorCreatUpdateUsuarios,
                                    success: function (res) {
                                        console.log(typeof (res))
                                        console.log(res)
                                    }
                                })
                            })
                        }
                    })
                })
                mostrarTabelaUsuarios()
            }
        })
    })
})
