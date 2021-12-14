$(function () {

    $.ajax({
        method: "GET",
        url: "/api/clientes.php?acao=listarClientes",
        success: (res) => {

            res.forEach(function (row) {
                var tableBody = document.getElementById("tbodyDeleteCliente");
                var newRow = document.createElement("tr");
                tableBody.appendChild(newRow);

                Object.values(row).forEach(value => {
                    var newCell = document.createElement("td");
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                })
                var actionsCell = document.createElement("td");
                var botaoDeleteCliente = document.createElement("button")
                botaoDeleteCliente.setAttribute("data-id", row.id_cliente)
                botaoDeleteCliente.setAttribute("class", "botaoLaranjaClaro botaoDeleteCliente")
                botaoDeleteCliente.textContent = "SELECIONAR"
                actionsCell.appendChild(botaoDeleteCliente)
                newRow.appendChild(actionsCell)
            })

            $(".botaoDeleteCliente").click(function () {

                const confirmDeleteCliente = confirm("CONFIRMA DELETAR CLIENTE ?")
                const idbotaoDelete = $(this).attr("data-id")

                if (confirmDeleteCliente == true) {

                    const objDeleteCliente = {
                        acao: "deletarCliente",
                        idCliente: idbotaoDelete
                    }

                    $.ajax({
                        type: "PUT",
                        url: "/api/clientes.php",
                        data: objDeleteCliente,
                        success: function (res) {
                            console.log(res)
                        }
                    })
                }

                location.reload()
            })
        }
    })
})