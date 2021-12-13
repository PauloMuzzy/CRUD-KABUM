$(function () {


    //BUSCA USUARIOS
    $("#tbody tr").remove()

    $.ajax({
        method: "GET",
        url: "/api/usuarios.php?acao=listaUsuariosDelete",
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
                var btnActionUpdateDelete = document.createElement("button")
                btnActionUpdateDelete.setAttribute("data-id", row.id_usuario)
                btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateDeleteUser")
                btnActionUpdateDelete.textContent = "DELETE"
                actionsCell.appendChild(btnActionUpdateDelete)
                newRow.appendChild(actionsCell)
            });


            $(".btnUpdateDeleteUser").click(function () {

                const idBtnUpdateDelete = $(this).attr("data-id")
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
})

