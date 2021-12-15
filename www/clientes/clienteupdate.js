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
            if (acessoEditar == "HABILITADO" || tipoUsuario == "MASTER") {
                $(".conteudo").show()

            } else if (acessoEditar == "DESABILITADO") {
                $(".semAcesso").show()
            }
        }
    })

    $.ajax({
        method: "GET",
        url: "/api/clientes.php?acao=listarClientes",
        success: (res) => {

            res.forEach(function (row) {
                var tableBody = document.getElementById("tbodyUpdateClientes");
                var newRow = document.createElement("tr");
                tableBody.appendChild(newRow);

                Object.values(row).forEach(value => {
                    var newCell = document.createElement("td");
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                })
                var actionsCell = document.createElement("td");
                var botaoUpdateCliente = document.createElement("button")
                botaoUpdateCliente.setAttribute("data-id", row.id_cliente)
                botaoUpdateCliente.setAttribute("class", "botaoLaranjaClaro botaoUpdateCliente")
                botaoUpdateCliente.textContent = "SELECIONAR"
                actionsCell.appendChild(botaoUpdateCliente)
                newRow.appendChild(actionsCell)
            })

            $(".botaoUpdateCliente").click(function () {

                const idbotaoUpdateCliente = $(this).attr('data-id')
                const urlIdbotaoUpdateCliente = "/api/clientes.php?acao=listarUpdateCliente&id=" + idbotaoUpdateCliente

                $.ajax({
                    method: "GET",
                    url: urlIdbotaoUpdateCliente,
                    success: (res) => {

                        const idUpdateClienteRes = res[0].id_cliente
                        const nomeUpdateClienteRes = res[0].nome
                        const cpfUpdateClienteRes = res[0].cpf
                        const rgUpdateClineteRes = res[0].rg
                        const emailUpdateClineteRes = res[0].email
                        const telefone1UpdateClienteRes = res[0].telefone1
                        const telefone2UpdateClienteRes = res[0].telefone2
                        const dataNascUpdateClienteRes = res[0].data_nasc

                        $("#idUpdateCliente").val(idUpdateClienteRes);
                        $("#nameUpdateCliente").val(nomeUpdateClienteRes)
                        $("#cpfUpdateCliente").val(cpfUpdateClienteRes)
                        $("#rgUpdateCliente").val(rgUpdateClineteRes)
                        $("#emailUpdateCliente").val(emailUpdateClineteRes)
                        $("#tel01UpdateCliente").val(telefone1UpdateClienteRes)
                        $("#tel02UpdateCliente").val(telefone2UpdateClienteRes)
                        $("#dataNascRegisterCliente").val(dataNascUpdateClienteRes)

                        $("#botaoUpdateCliente").click(function () {

                            const updateCliente = confirm("CONFIRMA ALTERAÇÃO NO CLIENTE ?")

                            if (updateCliente == true) {

                                const idUpdateCliente = document.getElementById("idUpdateCliente").value
                                const nomeUpdateCliente = document.getElementById("nameUpdateCliente").value
                                const cpfUpdateCliente = document.getElementById("cpfUpdateCliente").value
                                const rgUpdateCliente = document.getElementById("rgUpdateCliente").value
                                const emailUpdateCliente = document.getElementById("emailUpdateCliente").value
                                const telefone1UpdateCliente = document.getElementById("tel01UpdateCliente").value
                                const telefone2UpdateCliente = document.getElementById("tel02UpdateCliente").value
                                const dataNascUpdateCliente = document.getElementById("dataNascRegisterCliente").value
                                const loginLocalstorage = localStorage.getItem("login")

                                const objUpdateCliente = {
                                    acao: "updateCliente",
                                    idCliente: idUpdateCliente,
                                    nome: nomeUpdateCliente,
                                    cpf: cpfUpdateCliente,
                                    rg: rgUpdateCliente,
                                    email: emailUpdateCliente,
                                    telefone1: telefone1UpdateCliente,
                                    telefone2: telefone2UpdateCliente,
                                    dataNasc: dataNascUpdateCliente
                                }

                                console.log(objUpdateCliente)

                                $.ajax({
                                    type: "PUT",
                                    url: "/api/clientes.php",
                                    data: objUpdateCliente,
                                    success: () => {

                                        // // -------------------LOG DE NOME -----------------
                                        // if (nomeUpdateClienteRes != nomeUpdateCliente) {
                                        //     const objNomeLogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "NOME",
                                        //         valorAntigo: nomeUpdateClienteRes,
                                        //         valorAtual: nomeUpdateCliente,
                                        //         idUsuario: idUsuario,
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objNomeLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // -------------------LOG DE CPF -----------------
                                        if (cpfUpdateClienteRes != cpfUpdateCliente) {
                                            const objCpfLogUpdateCliente = {
                                                acao: "UpdateCpfClienteEndereco",
                                                valorAntigo: cpfUpdateClienteRes,
                                                valorAtual: cpfUpdateCliente,
                                                idUsuario: idUsuario
                                            }
                                            $.ajax({
                                                type: "PUT",
                                                url: "/api/clientes.php",
                                                data: objUpdateCliente,
                                                success: () => {
                                                }
                                            })
                                        }
                                        // // -------------------LOG DE RG -----------------
                                        // if (rgUpdateClineteRes != rgUpdateCliente) {
                                        //     const objRgLogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "RG",
                                        //         valorAntigo: rgUpdateClineteRes,
                                        //         valorAtual: rgUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objRgLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // // ------------------- LOG DE EMAIL-----------------
                                        // if (emailUpdateClineteRes != emailUpdateCliente) {
                                        //     const objEmailLogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "EMAIL",
                                        //         valorAntigo: emailUpdateClineteRes,
                                        //         valorAtual: emailUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objEmailLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // // ------------------- LOG DE TEL1-----------------
                                        // if (telefone1UpdateClienteRes != telefone1UpdateCliente) {
                                        //     const objTelefone1LogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "TELEFONE1",
                                        //         valorAntigo: telefone1UpdateClienteRes,
                                        //         valorAtual: telefone1UpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objTelefone1LogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // // ------------------- LOG DE TEL2-----------------
                                        // if (telefone2UpdateClienteRes != telefone2UpdateCliente) {
                                        //     const objTelefone2LogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "TELEFONE2",
                                        //         valorAntigo: telefone2UpdateClienteRes,
                                        //         valorAtual: telefone2UpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objTelefone2LogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // // ------------------- LOG DE DATA-NASC-----------------
                                        // if (dataNascUpdateClienteRes != dataNascUpdateCliente) {
                                        //     const objDataNascLogUpdateCliente = {
                                        //         acao: "logUpdateCliente",
                                        //         campo: "DATA-NASC",
                                        //         valorAntigo: dataNascUpdateClienteRes,
                                        //         valorAtual: dataNascUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }
                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objDataNascLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }
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

