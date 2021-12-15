$(function () {

    $(".semAcesso").hide()
    $(".conteudo").hide()

    const loginUsuario = localStorage.getItem("login")
    const urlSetUsuario = "/api/usuarios.php?acao=setUsuario&login=" + loginUsuario
    $.ajax({
        method: "GET",
        url: urlSetUsuario,
        success: function (res) {
            const acessoLer = res.acesso_ler
            const tipoUsuario = res.tipo_usuario
            if (acessoLer == "HABILITADO" || tipoUsuario == "MASTER") {
                $(".conteudo").show()

            } else if (acessoLer == "DESABILITADO") {
                $(".semAcesso").show()
            }
        }
    })

    const idUsuario = localStorage.getItem("idUsuario")
    const urlListarCliente = "/api/clientes.php?acao=listarClientes&idUsuario=" + idUsuario

    console.log(urlListarCliente)

    //     LISTA CLIENTES
    $.ajax({
        method: "GET",
        url: urlListarCliente,
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

    $("#botaoSairLogado").click(function () {
        const sairLogado = function () {
            localStorage.clear()
            location.reload()
            window.location.href = "../index.html"
        }
        sairLogado()
    })
})