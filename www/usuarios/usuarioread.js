$(function () {

    $.ajax({
        method: "GET",
        url: "/api/usuarios.php?acao=listaUsuarios",
        success: (res) => {

            res.forEach(function (row) {

                var tableBody = document.getElementById("tbodyUsuarios");
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


