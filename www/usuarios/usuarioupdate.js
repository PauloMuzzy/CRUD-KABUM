$(function () {
    //BUSCA USUARIOS
    $("#tbody tr").remove()

    $.ajax({
        method: "GET",
        url: "/api/usuarios.php?acao=listaUsuariosUpdate",
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
                var botaoActionUpdateDelete = document.createElement("button")
                botaoActionUpdateDelete.setAttribute("data-id", row.id_usuario)
                botaoActionUpdateDelete.setAttribute("class", "botaoLaranja botaoUpdateDeleteUser")
                botaoActionUpdateDelete.textContent = "SELECIONAR"
                actionsCell.appendChild(botaoActionUpdateDelete)
                newRow.appendChild(actionsCell)
            });


            $(".botaoUpdateDeleteUser").click(function () {

                const idbotaoUpdateDelete = $(this).attr("data-id")
                const urlIdbotaoUpdate = "/api/usuarios.php?acao=updateUsuario&id=" + idbotaoUpdateDelete

                $.ajax({
                    method: "GET",
                    url: urlIdbotaoUpdate,
                    success: (res) => {

                        console.log(res)

                        const inseVermelhoadosInputUpdateUsuario = () => {

                            const idUpdateUsuario = idbotaoUpdateDelete
                            $("#idUpdateUsuario").val(idUpdateUsuario);

                            const loginUpdateUsuario = res.login
                            $("#loginUpdateUsuario").val(loginUpdateUsuario);

                            const createUpdateUsuario = res.acesso_criar
                            $("#createUpdateUsuario").val(createUpdateUsuario);
                            if (createUpdateUsuario == "HABILITADO") {
                                $("#createUpdateUsuario").attr("class", "botaoVerdeClaro")
                            } else {
                                $("#createUpdateUsuario").attr("class", "botaoVermelhoClaro")
                            }

                            const readUpdateUsuario = res.acesso_ler
                            $("#readUpdateUsuario").val(readUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#readUpdateUsuario").attr("class", "botaoVerdeClaro")
                            } else {
                                $("#readUpdateUsuario").attr("class", "botaoVermelhoClaro")
                            }

                            const updateUpdateUsuario = res.acesso_editar
                            $("#updateUpdateUsuario").val(updateUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#updateUpdateUsuario").attr("class", "botaoVerdeClaro")
                            } else {
                                $("#updateUpdateUsuario").attr("class", "botaoVermelhoClaro")
                            }

                            const deleteUpdateUsuario = res.acesso_deletar
                            $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                            if (deleteUpdateUsuario == "HABILITADO") {
                                $("#deleteUpdateUsuario").attr("class", "botaoVerdeClaro")
                            } else {
                                $("#deleteUpdateUsuario").attr("class", "botaoVermelhoClaro")
                            }
                        }

                        inseVermelhoadosInputUpdateUsuario()

                        let valuebotaoCreateUpdate = document.querySelector("#createUpdateUsuario").value
                        let valuebotaoReadUpdate = document.querySelector("#readUpdateUsuario").value
                        let valuebotaoUpdateUpdate = document.querySelector("#updateUpdateUsuario").value
                        let valuebotaoDeleteUpdate = document.querySelector("#deleteUpdateUsuario").value

                        // CREATE USUARIO
                        $("#createUpdateUsuario").click(() => {
                            if (valuebotaoCreateUpdate == "HABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("botaoVermelho")
                                $("#createUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valuebotaoCreateUpdate == "DESABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("botaoVerde")
                                $("#createUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // READ USUARIO
                        $("#readUpdateUsuario").click(() => {
                            if (valuebotaoReadUpdate == "HABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("botaoVermelho")
                                $("#readUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valuebotaoReadUpdate == "DESABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("botaoVerde")
                                $("#readUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })
                        // UPDATE USUARIO
                        $("#updateUpdateUsuario").click(() => {
                            if (valuebotaoUpdateUpdate == "HABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("botaoVermelho")
                                $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valuebotaoUpdateUpdate == "DESABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("botaoVerde")
                                $("#updateUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // DELETE USUARIO
                        $("#deleteUpdateUsuario").click(() => {
                            if (valuebotaoDeleteUpdate == "HABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("botaoVermelho")
                                $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valuebotaoDeleteUpdate == "DESABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("botaoVerde")
                                $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        $("#btnUpdateUser").click(function (e) {
                            e.preventDefault()

                            const confirUpdateUsuario = confirm("CONFIRMAR ALTERAÇÃO NO USUÁRIO?")

                            if (confirUpdateUsuario == true) {
                                const valueInputCreate = document.getElementById("createUpdateUsuario").value
                                const valueInputRead = document.getElementById("readUpdateUsuario").value
                                const valueInputUpdate = document.getElementById("updateUpdateUsuario").value
                                const valueInputDelete = document.getElementById("deleteUpdateUsuario").value

                                const objUpdateUsuario = {
                                    action: "update",
                                    create: valueInputCreate,
                                    read: valueInputRead,
                                    update: valueInputUpdate,
                                    delete: valueInputDelete,
                                    id: idbotaoUpdateDelete
                                }

                                console.log(objUpdateUsuario)

                                $.ajax({
                                    type: "PUT",
                                    url: "/api/usuarios.php",
                                    data: objUpdateUsuario,
                                    success: () => {
                                    }
                                })

                                location.reload()
                            } else {
                                location.reload()
                            }
                        })
                    }
                })
            })
        }
    })
})