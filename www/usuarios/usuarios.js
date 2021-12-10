$(function () {

    $("#tableUsers").hide()
    $("#formUpdateUsers").hide()
    $("#confirmUpdateUsers").hide()
    $("#confirmDeleteUsers").hide()
    $("#alertSuccessUpdateUser").hide()
    $("#alertFailUpdateUser").hide()
    $("#alertSuccessDeleteUser").hide()
    $("#alertFailDeleteUser").hide()

    $("#btnShowFormRegisterUsers").click(function () {
        $("#formRegisterUsers").show()
        $("#tableUsers").hide()
        $("#formUpdateUsers").hide()
    })

    $("#btnShowTableUsers").click(function () {
        $("#formRegisterUsers").hide()
        $("#tableUsers").show()
        $("#formUpdateUsers").hide()
        $('td:nth-child(10)').hide();
    })

    $("#btnShowFormUpdateDeleteUsers").click(function () {
        $("#formRegisterUsers").hide()
        $("#tableUsers").show()
        $("#formUpdateUsers").show()
        $('td:nth-child(10)').show();
    })

    $("#btnUpdateUser").click(function () {
        $("#confirmUpdateUsers").show()
    })

    $("#btnDeleteUser").click(function () {
        $("#confirmDeleteUsers").show()
    })

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
                    idUsuario = res.id_usuario

                    const salutation = "Olá, " + res.nome + "."
                    $("#salutation").html(salutation)
                    $("#btnShowCustomers").show()

                    if (res.usuario_tipo == "MASTER") {
                        $("#btnShowUsers").show()
                    }
                }
            })
        } else {
            window.location.href = "../index.html"
        }
    }
    verificaLogin()

    // ------------------------------------- OK -----------------------------
    //CADASTRAR USUARIO
    $(".formCadastraUsuario").on("submit", function (e) {
        e.preventDefault()

        const nomeCadastraUsuario = document.getElementById("nomeCadastraUsuario").value
        const loginCadastraUsuario = document.getElementById("loginCadastraUsuario").value
        const senhaCadastraUsuario = document.getElementById("senhaCadastraUsuario").value
        const objCadastraUsuarios = {
            acao: "cadastrarUsuario",
            nome: nomeCadastraUsuario,
            login: loginCadastraUsuario,
            senha: senhaCadastraUsuario,
        }

        $.ajax({
            method: "POST",
            url: "/api/usuarios.php",
            data: objCadastraUsuarios,
            success: function (res) {
                location.reload()
            }
        })
    })

    //BUSCA USUARIOS
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
                var btnActionUpdateDelete = document.createElement("button")
                btnActionUpdateDelete.setAttribute("data-id", row.id_usuario)
                btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateDeleteUser")
                btnActionUpdateDelete.textContent = "UPDATE/DELETE"
                actionsCell.appendChild(btnActionUpdateDelete)
                newRow.appendChild(actionsCell)
            });


            $(".btnUpdateDeleteUser").click(function () {

                const idBtnUpdateDelete = $(this).attr('data-id')
                const urlIdBtnUpdate = "/api/usuarios.php?acao=updateUsuario&id=" + idBtnUpdateDelete

                $.ajax({
                    method: "GET",
                    url: urlIdBtnUpdate,
                    success: (res) => {

                        const insereDadosInputUpdateUsuario = () => {

                            const idUpdateUsuario = idBtnUpdateDelete
                            $("#idUpdateUsuario").val(idUpdateUsuario);

                            const loginUpdateUsuario = res.login
                            $("#loginUpdateUsuario").val(loginUpdateUsuario);

                            const createUpdateUsuario = res.acesso_criar
                            $("#createUpdateUsuario").val(createUpdateUsuario);
                            if (createUpdateUsuario == "HABILITADO") {
                                $("#createUpdateUsuario").attr("class", "btn-lightGreen")
                            } else {
                                $("#createUpdateUsuario").attr("class", "btn-lightRed")
                            }

                            const readUpdateUsuario = res.acesso_ler
                            $("#readUpdateUsuario").val(readUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#readUpdateUsuario").attr("class", "btn-lightGreen")
                            } else {
                                $("#readUpdateUsuario").attr("class", "btn-lightRed")
                            }

                            const updateUpdateUsuario = res.acesso_editar
                            $("#updateUpdateUsuario").val(updateUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#updateUpdateUsuario").attr("class", "btn-lightGreen")
                            } else {
                                $("#updateUpdateUsuario").attr("class", "btn-lightRed")
                            }

                            const deleteUpdateUsuario = res.acesso_deletar
                            $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                            if (deleteUpdateUsuario == "HABILITADO") {
                                $("#deleteUpdateUsuario").attr("class", "btn-lightGreen")
                            } else {
                                $("#deleteUpdateUsuario").attr("class", "btn-lightRed")
                            }
                        }

                        insereDadosInputUpdateUsuario()

                        let valueBtnCreateUpdate = document.querySelector("#createUpdateUsuario").value
                        let valueBtnReadUpdate = document.querySelector("#readUpdateUsuario").value
                        let valueBtnUpdateUpdate = document.querySelector("#updateUpdateUsuario").value
                        let valueBtnDeleteUpdate = document.querySelector("#deleteUpdateUsuario").value

                        // CREATE USUARIO
                        $("#createUpdateUsuario").click(() => {
                            if (valueBtnCreateUpdate == "HABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn-red")
                                $("#createUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnCreateUpdate == "DESABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn-green")
                                $("#createUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // READ USUARIO
                        $("#readUpdateUsuario").click(() => {
                            if (valueBtnReadUpdate == "HABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn-red")
                                $("#readUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnReadUpdate == "DESABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn-green")
                                $("#readUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })
                        // UPDATE USUARIO
                        $("#updateUpdateUsuario").click(() => {
                            if (valueBtnUpdateUpdate == "HABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn-red")
                                $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnUpdateUpdate == "DESABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn-green")
                                $("#updateUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // DELETE USUARIO
                        $("#deleteUpdateUsuario").click(() => {
                            if (valueBtnDeleteUpdate == "HABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn-red")
                                $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnDeleteUpdate == "DESABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn-green")
                                $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        $("#btnConfirmUpdateUser").click(function (e) {
                            e.preventDefault()
                            let valueInputCreate = document.getElementById("createUpdateUsuario").value
                            let valueInputRead = document.getElementById("readUpdateUsuario").value
                            let valueInputUpdate = document.getElementById("updateUpdateUsuario").value
                            let valueInputDelete = document.getElementById("deleteUpdateUsuario").value

                            const objUpdateUsuario = {
                                action: "update",
                                create: valueInputCreate,
                                read: valueInputRead,
                                update: valueInputUpdate,
                                delete: valueInputDelete,
                                id: idBtnUpdateDelete
                            }

                            $.ajax({
                                type: "PUT",
                                url: "/api/usuarios.php",
                                data: objUpdateUsuario,
                                success: () => {
                                    $("#alertSuccessUpdateUser").show(150)
                                    setTimeout(function () { location.reload(); }, 2000);
                                }
                            })
                        })

                        $("#btnConfirmDeleteUser").click(function (e) {
                            e.preventDefault()
                            const objsoftDeleteUsuario = {
                                action: "softDelete",
                                ativo: "0",
                                id: idBtnUpdateDelete
                            }

                            $.ajax({
                                type: "PUT",
                                url: "/api/usuarios.php",
                                data: objsoftDeleteUsuario,
                                success: () => {
                                    $("#alertSuccessDeleteUser").show(150)
                                    setTimeout(function () { location.reload(); }, 2000);
                                },
                                fail: () => {

                                }
                            })
                        })
                    }
                })
            })
        }
    })

    $("#btnBackToTableUser").click(() => {
        location.reload()
    })
})

