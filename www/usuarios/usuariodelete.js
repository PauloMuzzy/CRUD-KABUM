$(function () {

    //BUSCA USUARIOS
    $("#tbody tr").remove()

    $.ajax({
        method: "GET",
        url: "/api/usuarios.php?acao=listaUsuariosDelete",
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
                var botaoDelete = document.createElement("button")
                botaoDelete.setAttribute("data-id", row.id_usuario)
                botaoDelete.setAttribute("class", "botaoLaranjaClaro botaoDelete")
                botaoDelete.textContent = "DELETAR"
                actionsCell.appendChild(botaoDelete)
                newRow.appendChild(actionsCell)
            });

            $(".botaoDelete").click(function () {

                const deletarUsuario = confirm("CONFIRMA DELETAR USUÁRIO ?")

                if (deletarUsuario == true) {

                    const idbotaoDelete = $(this).attr("data-id")

                    const objDeleteUsuario = {
                        acao: "deletarUsuario",
                        idUsuario: idbotaoDelete
                    }

                    $.ajax({
                        type: "PUT",
                        url: "/api/usuarios.php",
                        data: objDeleteUsuario,
                        // success: () => {
                        // }
                    })
                }
                location.reload()
            })
        }
    })

    $("#botaoSairLogado").click(function () {
        const sairLogado = function () {
            localStorage.clear()
            location.reload()
            window.location.href = "../index.html"
        }
        sairLogado()
    })
})

