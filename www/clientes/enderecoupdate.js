$(function () {

    $.ajax({
        method: "GET",
        url: "/api/clientes.php?acao=listarEnderecos",
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
            })

            $(".botaoUpdateEndereco").click(function () {

                const idbotaoUpdateEndereco = $(this).attr('data-id')
                const urlIdbotaoUpdateEndereco = "/api/clientes.php?acao=listarEnderecosUpdate&id=" + idbotaoUpdateEndereco

                $.ajax({
                    method: "GET",
                    url: urlIdbotaoUpdateEndereco,
                    success: (res) => {

                        const idEnderecoRes = res.id_endereco
                        const cpfClienteRes = res.cpf_cliente
                        const ruaRes = res.rua
                        const numeroRes = res.numero
                        const bairroRes = res.bairro
                        const cepRes = res.cep
                        const cidadeRes = res.cidade
                        const estadoRes = res.estado

                        $("#idUpdateEndereco").val(idEnderecoRes);
                        $("#cpfUpdateEndereco").val(cpfClienteRes)
                        $("#ruaUpdateEndereco").val(ruaRes)
                        $("#numeroUpdateEndereco").val(numeroRes)
                        $("#bairroUpdateEndereco").val(bairroRes)
                        $("#cepUpdateEndereco").val(cepRes)
                        $("#cidadeUpdateEndereco").val(cidadeRes)
                        $("#estadoUpdateEndereco").val(estadoRes)

                        $("#botaoUpdateEndereco").click(function () {

                            const updateEndereco = confirm("CONFIRMA ALTERAÇÃO NO Endereco ?")

                            if (updateEndereco == true) {

                                const ruaUpdateEndereco = document.getElementById("ruaUpdateEndereco").value
                                const numeroUpdateEndereco = document.getElementById("numeroUpdateEndereco").value
                                const bairroUpdateEndereco = document.getElementById("bairroUpdateEndereco").value
                                const cepUpdateEndereco = document.getElementById("cepUpdateEndereco").value
                                const cidadeUpdateEndereco = document.getElementById("cidadeUpdateEndereco").value
                                const estadoUpdateEndereco = document.getElementById("estadoUpdateEndereco").value

                                const objUpdateEndereco = {
                                    acao: "updateEndereco",
                                    idEndereco: idEnderecoRes,
                                    rua: ruaUpdateEndereco,
                                    numero: numeroUpdateEndereco,
                                    bairro: bairroUpdateEndereco,
                                    cep: cepUpdateEndereco,
                                    cidade: cidadeUpdateEndereco,
                                    estado: estadoUpdateEndereco
                                }

                                $.ajax({
                                    type: "PUT",
                                    url: "/api/clientes.php",
                                    data: objUpdateEndereco,
                                    success: (res) => {
                                    }
                                })
                            }
                            location.reload()
                        })
                    }
                })
            })
        }
    })

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

