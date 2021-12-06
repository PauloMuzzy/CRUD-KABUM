$(function () {

    $("#formUpdateUser").hide()

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
                var btnActionUpdate = document.createElement("button")
                var btnActionDelete = document.createElement("button")
                btnActionUpdate.setAttribute("data-id", row.ID)
                btnActionDelete.setAttribute("data-id", row.ID)
                btnActionUpdate.setAttribute("class", "btn-green btnUpdateUser")
                btnActionDelete.setAttribute("class", "btn-red btnDeleteUser")
                btnActionUpdate.textContent = "UPDATE"
                btnActionDelete.textContent = "DELETE"
                actionsCell.appendChild(btnActionUpdate)
                actionsCell.appendChild(btnActionDelete)
                newRow.appendChild(actionsCell)
            });

            $(".btnUpdateUser").click(function () {

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
                                $("#createUpdateUsuario").attr("class", "btn-green")
                            } else {
                                $("#createUpdateUsuario").attr("class", "btn-red")
                            }

                            const readUpdateUsuario = res.ACESSO_READ
                            $("#readUpdateUsuario").val(readUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#readUpdateUsuario").attr("class", "btn-green")
                            } else {
                                $("#readUpdateUsuario").attr("class", "btn-red")
                            }

                            const updateUpdateUsuario = res.ACESSO_UPDATE
                            $("#updateUpdateUsuario").val(updateUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#updateUpdateUsuario").attr("class", "btn-green")
                            } else {
                                $("#updateUpdateUsuario").attr("class", "btn-red")
                            }

                            const deleteUpdateUsuario = res.ACESSO_DELETE
                            $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                            if (deleteUpdateUsuario == "HABILITADO") {
                                $("#deleteUpdateUsuario").attr("class", "btn-green")
                            } else {
                                $("#deleteUpdateUsuario").attr("class", "btn-red")
                            }
                        }

                        insereDadosInputUpdateUsuario()

                        $("#formUpdateUser").show()
                        $("#tabelaUsuarios").hide()

                        let valueBtnCreateUpdate = document.querySelector("#createUpdateUsuario").value
                        let valueBtnReadUpdate = document.querySelector("#readUpdateUsuario").value
                        let valueBtnUpdateUpdate = document.querySelector("#updateUpdateUsuario").value
                        let valueBtnDeleteUpdate = document.querySelector("#deleteUpdateUsuario").value

                        // CREATE USUARIO
                        $("#createUpdateUsuario").click(() => {
                            if (valueBtnCreateUpdate == "HABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn-lightRed")
                                $("#createUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnCreateUpdate == "DESABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn-lightGreen")
                                $("#createUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // READ USUARIO
                        $("#readUpdateUsuario").click(() => {
                            if (valueBtnReadUpdate == "HABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn-lightRed")
                                $("#readUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnReadUpdate == "DESABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn-lightGreen")
                                $("#readUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })
                        // UPDATE USUARIO
                        $("#updateUpdateUsuario").click(() => {
                            if (valueBtnUpdateUpdate == "HABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn-lightRed")
                                $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnUpdateUpdate == "DESABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn-lightGreen")
                                $("#updateUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // DELETE USUARIO
                        $("#deleteUpdateUsuario").click(() => {
                            if (valueBtnDeleteUpdate == "HABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn-lightRed")
                                $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnDeleteUpdate == "DESABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn-lightGreen")
                                $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        let valueInputCreate = document.getElementById("createUpdateUsuario").value
                        let valueInputRead = document.getElementById("readUpdateUsuario").value
                        let valueInputUpdate = document.getElementById("updateUpdateUsuario").value
                        let valueInputDelete = document.getElementById("deleteUpdateUsuario").value

                        if (valueInputCreate == "HABILITADO") {
                            valueInputCreate = "DESABILITADO"
                        } else {
                            valueInputCreate = "HABILITADO"
                        }

                        if (valueInputRead == "HABILITADO") {
                            valueInputRead = "DESABILITADO"
                        } else {
                            valueInputRead = "HABILITADO"
                        }

                        if (valueInputUpdate == "HABILITADO") {
                            valueInputUpdate = "DESABILITADO"
                        } else {
                            valueInputUpdate = "HABILITADO"
                        }

                        if (valueInputDelete == "HABILITADO") {
                            valueInputDelete = "DESABILITADO"
                        } else {
                            valueInputDelete = "HABILITADO"
                        }

                        const objUpdateUsuario = {
                            create: valueInputCreate,
                            read: valueInputRead,
                            update: valueInputUpdate,
                            delete: valueInputDelete,
                            id: idBtnUpdate
                        }

                        $("#updateUsuario").click(function () {
                            $.ajax({
                                type: "PUT",
                                url: "/api/usuarios.php",
                                data: objUpdateUsuario,
                                success: () => {
                                    location.reload()
                                }
                            })
                        })
                    }
                })
            })
        }
    })

})