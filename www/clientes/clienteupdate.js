$(function () {

    // ------------------------------------- OK-----------------------------
    //     LISTA CLIENTES
    $("#btnListaCliente").click(function () {

        showListaCliente()

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
                });
            }
        })
    })

    // UPDATE CLIENTE
    $("#btnAlteraCliente").click(function () {

        showAlteraCliente()

        $.ajax({
            method: "GET",
            url: "/api/clientes.php?acao=listarClientes",
            success: (res) => {

                res.forEach(function (row) {
                    var tableBody = document.getElementById("tbodyUpdateDeleteClientes");
                    var newRow = document.createElement("tr");
                    tableBody.appendChild(newRow);

                    Object.values(row).forEach(value => {
                        var newCell = document.createElement("td");
                        newCell.textContent = value;
                        newRow.appendChild(newCell);
                    })
                    var actionsCell = document.createElement("td");
                    var btnActionUpdateDelete = document.createElement("button")
                    btnActionUpdateDelete.setAttribute("data-id", row.id_cliente)
                    btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateCliente")
                    btnActionUpdateDelete.textContent = "SELECIONAR"
                    actionsCell.appendChild(btnActionUpdateDelete)
                    newRow.appendChild(actionsCell)
                })

                $(".btnUpdateCliente").click(function () {

                    $("#idUpdateCustomer").val("");
                    $("#nameUpdateCustomer").val("")
                    $("#cpfUpdateCustomer").val("")
                    $("#rgUpdateCustomer").val("")
                    $("#emailUpdateCustomer").val("")
                    $("#tel01UpdateCustomer").val("")
                    $("#tel02UpdateCustomer").val("")
                    $("#dataNascRegisterCustomer").val("")

                    const idBtnUpdateCliente = $(this).attr('data-id')
                    const urlIdBtnUpdateCliente = "/api/clientes.php?acao=listarUpdateCliente&id=" + idBtnUpdateCliente

                    $.ajax({
                        method: "GET",
                        url: urlIdBtnUpdateCliente,
                        success: (res) => {

                            const insereDadosInputUpdateCliente = () => {

                                const idUpdateClienteRes = res[0].id_cliente
                                const nomeUpdateClienteRes = res[0].nome
                                const cpfUpdateClienteRes = res[0].cpf
                                const rgUpdateClineteRes = res[0].rg
                                const emailUpdateClineteRes = res[0].email
                                const telefone1UpdateClienteRes = res[0].telefone1
                                const telefone2UpdateClienteRes = res[0].telefone2
                                const dataNascUpdateClienteRes = res[0].data_nasc

                                $("#idUpdateCustomer").val(idUpdateClienteRes);
                                $("#nameUpdateCustomer").val(nomeUpdateClienteRes)
                                $("#cpfUpdateCustomer").val(cpfUpdateClienteRes)
                                $("#rgUpdateCustomer").val(rgUpdateClineteRes)
                                $("#emailUpdateCustomer").val(emailUpdateClineteRes)
                                $("#tel01UpdateCustomer").val(telefone1UpdateClienteRes)
                                $("#tel02UpdateCustomer").val(telefone2UpdateClienteRes)
                                $("#dataNascRegisterCustomer").val(dataNascUpdateClienteRes)

                            }
                            insereDadosInputUpdateCliente()

                            $("#btnUpdateCustomer").click(function () {

                                const idUpdateCliente = document.getElementById("idUpdateCustomer").value
                                const nomeUpdateCliente = document.getElementById("nameUpdateCustomer").value
                                const cpfUpdateCliente = document.getElementById("cpfUpdateCustomer").value
                                const rgUpdateCliente = document.getElementById("rgUpdateCustomer").value
                                const emailUpdateCliente = document.getElementById("emailUpdateCustomer").value
                                const telefone1UpdateCliente = document.getElementById("tel01UpdateCustomer").value
                                const telefone2UpdateCliente = document.getElementById("tel02UpdateCustomer").value
                                const dataNascUpdateCliente = document.getElementById("dataNascRegisterCustomer").value
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

                                $.ajax({
                                    type: "PUT",
                                    url: "/api/clientes.php",
                                    data: objUpdateCliente,
                                    success: (res) => {
                                    }
                                })




                                $.ajax({
                                    method: "GET",
                                    url: urlIdBtnUpdateCliente,
                                    success: (res) => {

                                        if (nomeUpdateClienteRes != nomeUpdateCliente) {

                                            const objNomeLogUpdateCliente = {
                                                campo: "nome",
                                                nomeAntigo: nomeUpdateClienteRes,
                                                nomeAtual: nomeUpdateCliente,
                                                idUsuario: idUpdateClienteRes,
                                                login: loginLocalstorage
                                            }

                                            console.log(objNomeLogUpdateCliente)

                                            // $.ajax({
                                            //     method: "POST",
                                            //     url: "/api/clientes.php",
                                            //     data: objNomeLogUpdateCliente,
                                            //     success: function (res) {
                                            //         console.log(res)
                                            //     }
                                            // })
                                        }

                                        // if (cpfUpdateClienteRes != cpfUpdateCliente) {

                                        //     const objCpfLogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: cpfUpdateCliente,
                                        //         nomeAtual: objUpdateCliente.cpf,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objCpfLogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objCpfLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // if (rgUpdateClineteRes != rgUpdateCliente) {

                                        //     const objRgLogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: rgUpdateClineteRes,
                                        //         nomeAtual: rgUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objRgLogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objRgLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // if (emailUpdateClineteRes != emailUpdateCliente) {

                                        //     const objEmailLogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: emailUpdateClineteRes,
                                        //         nomeAtual: emailUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objEmailLogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objEmailLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // if (telefone1UpdateClienteRes != telefone1UpdateCliente) {

                                        //     const objTelefone1LogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: telefone1UpdateClienteRes,
                                        //         nomeAtual: telefone1UpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objTelefone1LogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objTelefone1LogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // if (telefone2UpdateClienteRes != telefone2UpdateCliente) {

                                        //     const objTelefone2LogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: telefone2UpdateClienteRes,
                                        //         nomeAtual: telefone2UpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objTelefone2LogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objTelefone2LogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }

                                        // if (dataNascUpdateClienteRes != dataNascUpdateCliente) {

                                        //     const objDataNascLogUpdateCliente = {
                                        //         campo: "cpf",
                                        //         nomeAntigo: dataNascUpdateClienteRes,
                                        //         nomeAtual: dataNascUpdateCliente,
                                        //         idUsuario: idUsuario
                                        //     }

                                        //     console.log(objDataNascLogUpdateCliente)

                                        //     $.ajax({
                                        //         method: "POST",
                                        //         url: "/api/clientes.php",
                                        //         data: objDataNascLogUpdateCliente,
                                        //         success: function (res) {
                                        //             console.log(res)
                                        //         }
                                        //     })
                                        // }
                                    } // tem que estar dentro desse evento de click
                                })
                            })
                        }
                    })
                })
            }
        })
    })
})