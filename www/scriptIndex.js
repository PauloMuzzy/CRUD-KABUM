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
                    if (res.TYPE_USER == "MASTER") {
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

                    $.ajax({
                        method: "GET",
                        url: urlIdBtnUpdate,
                        success: (res) => {

                            const insereDadosInputUpdateUsuario = () => {

                                const idUpdateUsuario = idBtnUpdate
                                $("#idUpdateUsuario").val(idUpdateUsuario);

                                const loginUpdateUsuario = res.LOGIN
                                $("#loginUpdateUsuario").val(loginUpdateUsuario);

                                const createUpdateUsuario = res.ACESSO_CREATE
                                $("#createUpdateUsuario").val(createUpdateUsuario);
                                if (createUpdateUsuario == "HABILITADO") {
                                    $("#createUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#createUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const readUpdateUsuario = res.ACESSO_READ
                                $("#readUpdateUsuario").val(readUpdateUsuario);
                                if (readUpdateUsuario == "HABILITADO") {
                                    $("#readUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#readUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const updateUpdateUsuario = res.ACESSO_UPDATE
                                $("#updateUpdateUsuario").val(updateUpdateUsuario);
                                if (readUpdateUsuario == "HABILITADO") {
                                    $("#updateUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#updateUpdateUsuario").attr("class", "btn btn-cinza")
                                }

                                const deleteUpdateUsuario = res.ACESSO_DELETE
                                $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                                if (deleteUpdateUsuario == "HABILITADO") {
                                    $("#deleteUpdateUsuario").attr("class", "btn btn-verde")
                                } else {
                                    $("#deleteUpdateUsuario").attr("class", "btn btn-cinza")
                                }
                            }

                            insereDadosInputUpdateUsuario()
                            mostrarFormUpdateUsuario()

                            const hideElementosUpdate = () => {
                                $("#confirmaCreateUpdateUsuario").hide()
                                $("#cancelaCreateUpdateUsuario").hide()
                                $("#confirmaReadUpdateUsuario").hide()
                                $("#cancelaReadUpdateUsuario").hide()
                                $("#confirmaUpdateUpdateUsuario").hide()
                                $("#cancelaUpdateUpdateUsuario").hide()
                                $("#confirmaDeleteUpdateUsuario").hide()
                                $("#cancelaDeleteUpdateUsuario").hide()
                                $(".alertaUpdateUsuario").hide()
                            }
                            hideElementosUpdate()

                            // UPDATE CREATE USUARIO
                            $("#createUpdateUsuario").click(() => {
                                hideElementosUpdate()
                                $("#confirmaCreateUpdateUsuario").show(150)
                                $("#cancelaCreateUpdateUsuario").show(150)


                                let valueBtnCreateUpdate = document.querySelector("#createUpdateUsuario").value

                                if (valueBtnCreateUpdate == "HABILITADO") {
                                    $("#createUpdateUsuario").removeClass()
                                    $("#createUpdateUsuario").toggleClass("btn btn-cinza-claro")
                                    $("#createUpdateUsuario").attr("value", "DESABILITADO")
                                } else if (valueBtnCreateUpdate == "DESABILITADO") {
                                    $("#createUpdateUsuario").removeClass()
                                    $("#createUpdateUsuario").toggleClass("btn btn-verde-claro")
                                    $("#createUpdateUsuario").attr("value", "HABILITADO")
                                }

                                $("#confirmaCreateUpdateUsuario").click(() => {

                                    if (valueBtnCreateUpdate == "HABILITADO") {
                                        valueBtnCreateUpdate = "DESABILITADO"
                                    } else {
                                        valueBtnCreateUpdate = "HABILITADO"
                                    }

                                    const objCreateUpdateUsuario = { id: idBtnUpdate, acesso: "ACESSO_CREATE", valor: valueBtnCreateUpdate }

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/api/usuarios.php',
                                        data: objCreateUpdateUsuario,
                                        success: function (res) {
                                            const resValue = res
                                            if (resValue == "DESABILITADO") {
                                                $("#createUpdateUsuario").removeClass()
                                                $("#createUpdateUsuario").toggleClass("btn btn-cinza")
                                                $("#createUpdateUsuario").attr("value", "DESABILITADO")
                                            } else if (resValue == "HABILITADO") {
                                                $("#createUpdateUsuario").removeClass()
                                                $("#createUpdateUsuario").toggleClass("btn btn-verde")
                                                $("#createUpdateUsuario").attr("value", "HABILITADO")
                                            }
                                            $("#alertaUpdateUsuarioCreate").show(150)
                                            $("#confirmaCreateUpdateUsuario").hide()
                                            $("#cancelaCreateUpdateUsuario").hide()
                                        }
                                    })
                                })

                                $("#cancelaCreateUpdateUsuario").click(() => {
                                    if (valueBtnCreateUpdate == "DESABILITADO") {
                                        $("#createUpdateUsuario").removeClass()
                                        $("#createUpdateUsuario").toggleClass("btn btn-cinza")
                                        $("#createUpdateUsuario").attr("value", "DESABILITADO")
                                    } else if (valueBtnCreateUpdate == "HABILITADO") {
                                        $("#createUpdateUsuario").removeClass()
                                        $("#createUpdateUsuario").toggleClass("btn btn-verde")
                                        $("#createUpdateUsuario").attr("value", "HABILITADO")
                                    }
                                    hideElementosUpdate()
                                })
                            })

                            // UPDATE READ USUARIO
                            $("#readUpdateUsuario").click(() => {
                                hideElementosUpdate()
                                $("#confirmaReadUpdateUsuario").show(150)
                                $("#cancelaReadUpdateUsuario").show(150)


                                let valueBtnReadUpdate = document.querySelector("#readUpdateUsuario").value

                                if (valueBtnReadUpdate == "HABILITADO") {
                                    $("#readUpdateUsuario").removeClass()
                                    $("#readUpdateUsuario").toggleClass("btn btn-cinza-claro")
                                    $("#readUpdateUsuario").attr("value", "DESABILITADO")
                                } else if (valueBtnReadUpdate == "DESABILITADO") {
                                    $("#readUpdateUsuario").removeClass()
                                    $("#readUpdateUsuario").toggleClass("btn btn-verde-claro")
                                    $("#readUpdateUsuario").attr("value", "HABILITADO")
                                }

                                $("#confirmaReadUpdateUsuario").click(() => {

                                    if (valueBtnReadUpdate == "HABILITADO") {
                                        valueBtnReadUpdate = "DESABILITADO"
                                    } else {
                                        valueBtnReadUpdate = "HABILITADO"
                                    }

                                    const objReadUpdateUsuario = { id: idBtnUpdate, acesso: "ACESSO_CREATE", valor: valueBtnReadUpdate }

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/api/usuarios.php',
                                        data: objReadUpdateUsuario,
                                        success: function (res) {
                                            const resValue = res
                                            if (resValue == "DESABILITADO") {
                                                $("#readUpdateUsuario").removeClass()
                                                $("#readUpdateUsuario").toggleClass("btn btn-cinza")
                                                $("#readUpdateUsuario").attr("value", "DESABILITADO")
                                            } else if (resValue == "HABILITADO") {
                                                $("#readUpdateUsuario").removeClass()
                                                $("#readUpdateUsuario").toggleClass("btn btn-verde")
                                                $("#readUpdateUsuario").attr("value", "HABILITADO")
                                            }
                                            $("#alertaUpdateUsuarioRead").show(150)
                                            $("#confirmaReadUpdateUsuario").hide()
                                            $("#cancelaReadUpdateUsuario").hide()
                                        }
                                    })
                                })

                                $("#cancelaReadUpdateUsuario").click(() => {
                                    if (valueBtnReadUpdate == "DESABILITADO") {
                                        $("#readUpdateUsuario").removeClass()
                                        $("#readUpdateUsuario").toggleClass("btn btn-cinza")
                                        $("#readUpdateUsuario").attr("value", "DESABILITADO")
                                    } else if (valueBtnReadUpdate == "HABILITADO") {
                                        $("#readUpdateUsuario").removeClass()
                                        $("#readUpdateUsuario").toggleClass("btn btn-verde")
                                        $("#readUpdateUsuario").attr("value", "HABILITADO")
                                    }
                                    hideElementosUpdate()
                                })
                                // next

                            })

                            // UPDATE UPDATE USUARIO
                            $("#updateUpdateUsuario").click(() => {
                                hideElementosUpdate()
                                $("#confirmaUpdateUpdateUsuario").show(150)
                                $("#cancelaUpdateUpdateUsuario").show(150)

                                let valueBtnUpdateUpdate = document.querySelector("#updateUpdateUsuario").value

                                if (valueBtnUpdateUpdate == "HABILITADO") {
                                    $("#updateUpdateUsuario").removeClass()
                                    $("#updateUpdateUsuario").toggleClass("btn btn-cinza-claro")
                                    $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                                } else if (valueBtnUpdateUpdate == "DESABILITADO") {
                                    $("#updateUpdateUsuario").removeClass()
                                    $("#updateUpdateUsuario").toggleClass("btn btn-verde-claro")
                                    $("#updateUpdateUsuario").attr("value", "HABILITADO")
                                }

                                $("#confirmaUpdateUpdateUsuario").click(() => {

                                    if (valueBtnUpdateUpdate == "HABILITADO") {
                                        valueBtnUpdateUpdate = "DESABILITADO"
                                    } else {
                                        valueBtnUpdateUpdate = "HABILITADO"
                                    }

                                    const objUpdateUpdateUsuario = { id: idBtnUpdate, acesso: "ACESSO_CREATE", valor: valueBtnUpdateUpdate }

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/api/usuarios.php',
                                        data: objUpdateUpdateUsuario,
                                        success: function (res) {
                                            const resValue = res
                                            if (resValue == "DESABILITADO") {
                                                $("#updateUpdateUsuario").removeClass()
                                                $("#updateUpdateUsuario").toggleClass("btn btn-cinza")
                                                $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                                            } else if (resValue == "HABILITADO") {
                                                $("#updateUpdateUsuario").removeClass()
                                                $("#updateUpdateUsuario").toggleClass("btn btn-verde")
                                                $("#updateUpdateUsuario").attr("value", "HABILITADO")
                                            }
                                            $("#alertaUpdateUsuarioUpdate").show(150)
                                            $("#confirmaUpdateUpdateUsuario").hide()
                                            $("#cancelaUpdateUpdateUsuario").hide()
                                        }
                                    })
                                })

                                $("#cancelaUpdateUpdateUsuario").click(() => {
                                    if (valueBtnUpdateUpdate == "DESABILITADO") {
                                        $("#updateUpdateUsuario").removeClass()
                                        $("#updateUpdateUsuario").toggleClass("btn btn-cinza")
                                        $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                                    } else if (valueBtnUpdateUpdate == "HABILITADO") {
                                        $("#updateUpdateUsuario").removeClass()
                                        $("#updateUpdateUsuario").toggleClass("btn btn-verde")
                                        $("#updateUpdateUsuario").attr("value", "HABILITADO")
                                    }
                                    hideElementosUpdate()
                                })
                            })

                            // UPDATE DELETE USUARIO
                            $("#deleteUpdateUsuario").click(() => {
                                hideElementosUpdate()
                                $("#confirmaDeleteUpdateUsuario").show(150)
                                $("#cancelaDeleteUpdateUsuario").show(150)

                                let valueBtnDeleteUpdate = document.querySelector("#deleteUpdateUsuario").value

                                if (valueBtnDeleteUpdate == "HABILITADO") {
                                    $("#deleteUpdateUsuario").removeClass()
                                    $("#deleteUpdateUsuario").toggleClass("btn btn-cinza-claro")
                                    $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                                } else if (valueBtnDeleteUpdate == "DESABILITADO") {
                                    $("#deleteUpdateUsuario").removeClass()
                                    $("#deleteUpdateUsuario").toggleClass("btn btn-verde-claro")
                                    $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                                }

                                $("#confirmaDeleteUpdateUsuario").click(() => {

                                    if (valueBtnDeleteUpdate == "HABILITADO") {
                                        valueBtnDeleteUpdate = "DESABILITADO"
                                    } else {
                                        valueBtnDeleteUpdate = "HABILITADO"
                                    }

                                    const objDeleteUpdateUsuario = { id: idBtnUpdate, acesso: "ACESSO_CREATE", valor: valueBtnDeleteUpdate }

                                    $.ajax({
                                        type: 'PUT',
                                        url: '/api/usuarios.php',
                                        data: objDeleteUpdateUsuario,
                                        success: function (res) {
                                            const resValue = res
                                            if (resValue == "DESABILITADO") {
                                                $("#deleteUpdateUsuario").removeClass()
                                                $("#deleteUpdateUsuario").toggleClass("btn btn-cinza")
                                                $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                                            } else if (resValue == "HABILITADO") {
                                                $("#deleteUpdateUsuario").removeClass()
                                                $("#deleteUpdateUsuario").toggleClass("btn btn-verde")
                                                $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                                            }
                                            $("#alertaUpdateUsuarioDelete").show(150)
                                            $("#confirmaDeleteUpdateUsuario").hide()
                                            $("#cancelaDeleteUpdateUsuario").hide()
                                        }
                                    })
                                })

                                $("#cancelaDeleteUpdateUsuario").click(() => {
                                    if (valueBtnDeleteUpdate == "DESABILITADO") {
                                        $("#deleteUpdateUsuario").removeClass()
                                        $("#deleteUpdateUsuario").toggleClass("btn btn-cinza")
                                        $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                                    } else if (valueBtnUpdateUpdate == "HABILITADO") {
                                        $("#deleteUpdateUsuario").removeClass()
                                        $("#deleteUpdateUsuario").toggleClass("btn btn-verde")
                                        $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                                    }
                                    hideElementosUpdate()
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
