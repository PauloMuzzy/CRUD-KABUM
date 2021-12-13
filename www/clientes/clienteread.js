$(function () {

    //     LISTA CLIENTES
    $.ajax({
        method: "GET",
        url: "/api/clientes.php?acao=listarClientes",
        success: (res) => {
            console.log(res)

            res.forEach(function (row) {
                var tableBody = document.getElementById("tbodyClientes");
                var newRow = document.createElement("tr");
                tableBody.appendChild(newRow);

                Object.values(row).forEach(value => {
                    var newCell = document.createElement("td");
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                })
            })
        }
    })
})