$(function () {

    $(".semAcesso").hide()
    $(".conteudo").hide()

    const loginUsuario = localStorage.getItem("login")
    const urlSetUsuario = "/api/usuarios.php?acao=setUsuario&login=" + loginUsuario

    $.ajax({
        method: "GET",
        url: urlSetUsuario,
        success: function (res) {
            const acessoEditar = res.acesso_editar
            const tipoUsuario = res.tipo_usuario
            const idUsuario = res.id_usuario
            localStorage.setItem("idUsuario", idUsuario)
            if (acessoEditar == "HABILITADO" || tipoUsuario == "MASTER") {
                $(".conteudo").show()

            } else if (acessoEditar == "DESABILITADO") {
                $(".semAcesso").show()
            }
        }
    })

    const idUsuario = localStorage.getItem("idUsuario")
    const urlListarCliente = "/api/enderecos.php?acao=listarEnderecos&idUsuario=" + idUsuario

    console.log(urlListarCliente)

    $.ajax({
        method: "GET",
        url: urlListarCliente,
        success: (res) => {



            res.forEach(function (row) {
                var tableBody = document.getElementById("tbodyEnderecos");
                var newRow = document.createElement("tr");
                tableBody.appendChild(newRow);

                Object.values(row).forEach(value => {
                    var newCell = document.createElement("td");
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                })

                var actionsCell = document.createElement("td");
                var botaoUpdateEndereco = document.createElement("button")
                botaoUpdateEndereco.setAttribute("data-id", row.id_endereco)
                botaoUpdateEndereco.setAttribute("class", "botaoLaranjaClaro botaoUpdateEndereco")
                botaoUpdateEndereco.textContent = "SELECIONAR"
                actionsCell.appendChild(botaoUpdateEndereco)
                newRow.appendChild(actionsCell)

                // getCpfCliente(res[0])
                let cliente = res[0]

                $(".botaoUpdateEndereco").click(function (cliente) {

                    console.log(cliente)

                    // const idbotaoUpdateEndereco = $(this).attr('data-id')
                    // const urlIdbotaoUpdateEnderecoPrincipal = "/api/enderecos.php?acao=listarEnderecosUpdate&id=" + idbotaoUpdateEndereco

                    // $("#botaoUpdateEndereco").click(function () {

                    //     const idbotaoUpdateEndereco = $(this).attr('data-id')
                    //     const urlIdbotaoUpdateEndereco = "/api/enderecos.php?acao=listarEnderecosUpdate&id=" + idbotaoUpdateEndereco


                    //     $.ajax({
                    //         method: "GET",
                    //         url: urlIdbotaoUpdateEndereco,
                    //         success: (res) => {
                    //             console.log(res)
                    //             const cpfClienteRes = res.cpf_cliente
                    //             console.log(cpfClienteRes)
                    //         }
                    //     })

                    // const updateEndereco = confirm("CONFIRMA ALTERAÇÃO NO Endereco ?")

                    // if (updateEndereco == true) {

                    //     $.ajax({
                    //         type: "PUT",
                    //         url: "/api/enderecos.php",
                    //         data: objUpdateEndereco,
                    //         success: (res) => {
                    //         }
                    //     })
                    // }
                    //     // location.reload()
                })
            })


        }
    })

    // const getCpfCliente = (cliente) => {

    //     console.log(cliente)

    // }

    //Mascaras
    $(".cpf").mask("999.999.999-99");
    $(".telefone").mask("(99)99999-9999");
    $(".telefone").mask("(99)99999-9999");
    $(".cep").mask("99999-999")

    var mascaraRg = {
        "translation": {
            A: {
                pattern: /[A-Za-z0-9]/
            }
        }
    };
    $(".rg").mask("99.999.999-A" || "99.999.999-99", mascaraRg);

    $("#botaoSairLogado").click(function () {
        const sairLogado = function () {
            localStorage.clear()
            location.reload()
            window.location.href = "../index.html"
        }
        sairLogado()
    })

})
