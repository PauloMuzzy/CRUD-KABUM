$(function () {

    //Mascaras
    $('.cpf').mask('999.999.999-99');
    $('.telefone').mask('(99)99999-9999');
    $('.telefone').mask('(99)99999-9999');
    $('.cep').mask('99999-999')

    var mascaraRg = {
        'translation': {
            A: {
                pattern: /[A-Za-z0-9]/
            }
        }
    };
    $('.rg').mask('99.999.999-A' || '99.999.999-99', mascaraRg);


    // ------------------------------------- OK -----------------------------
    //ADICIONA FORMULÁRIO DE ENDEREÇO
    var clicks = 0;
    $('#botaoAdicionaEndereco').click(function (e) {
        e.preventDefault()

        clicks += 1;

        var tagForm = document.createElement('form')
        $('#divEnderecos').append(tagForm)
        tagForm.setAttribute('id', 'formularioEnderecos' + clicks)
        tagForm.setAttribute('method', 'POST')
        tagForm.setAttribute('class', 'formularioEnderecos')

        var tagH3 = document.createElement('h3')
        tagH3.setAttribute('id', 'h3Enderecos' + clicks)
        tagForm.appendChild(tagH3)

        if (clicks == '1') {
            tagH3.textContent = 'ENDEREÇO ' + clicks + ' - (PRINCIPAL)'
        } else {
            tagH3.textContent = 'ENDEREÇO ' + clicks

        }

        // ----------- RUA -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'ruaEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'Rua/Avenida'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('name', 'ruaEndereco')
        tagInput.setAttribute('id', 'ruaEndereco' + clicks)
        tagInput.setAttribute('style', 'text-transform:uppercase')
        tagForm.appendChild(tagInput)

        // ----------- NÚMERO -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'numeroEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'Número'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('name', 'numeroEndereco')
        tagInput.setAttribute('id', 'numeroEndereco' + clicks)
        tagInput.setAttribute('style', 'text-transform:uppercase')
        tagForm.appendChild(tagInput)

        // ----------- BAIRRO -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'bairroEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'Bairro'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('name', 'bairroEndereco')
        tagInput.setAttribute('id', 'bairroEndereco' + clicks)
        tagInput.setAttribute('style', 'text-transform:uppercase')
        tagForm.appendChild(tagInput)

        // ----------- CEP -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'cepEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'CEP'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('class', 'cep')
        tagInput.setAttribute('name', 'cepEndereco')
        tagInput.setAttribute('id', 'cepEndereco' + clicks)
        tagForm.appendChild(tagInput)
        $('.cep').mask('99999-999')

        // ----------- CIDADE -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'cidadeEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'Cidade'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('name', 'cidadeEndereco')
        tagInput.setAttribute('id', 'cidadeEndereco' + clicks)
        tagInput.setAttribute('style', 'text-transform:uppercase')
        tagForm.appendChild(tagInput)

        // ----------- ESTADO -----------

        var tagLabel = document.createElement('label')
        tagLabel.setAttribute('for', 'estadoEndereco' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = 'Estado'

        var tagInput = document.createElement('input')
        tagInput.setAttribute('name', 'estadoEndereco')
        tagInput.setAttribute('id', 'estadoEndereco' + clicks)
        tagInput.setAttribute('style', 'text-transform:uppercase')
        tagForm.appendChild(tagInput)
    })



    // ------------------------------------- OK -----------------------------
    //CADASTRA CLIENTE E ENDREÇO(S)
    $('#botaoCadastraCliente').click(function (e) {
        e.preventDefault()

        // const confirmaCadastro = confirm('Confirma cadastro do cliente?')


        // (confirmaCadastro == true) {
        const nomeCadastraCliente = document.getElementById('nomeCadastraCliente').value
        const cpfCadastraCliente = document.getElementById('cpfCadastraCliente').value
        const rgCadastraCliente = document.getElementById('rgCadastraCliente').value
        const emailCadastraCliente = document.getElementById('emailCadastraCliente').value
        const tel1CadastraCliente = document.getElementById('tel01CadastraCliente').value
        const tel2CadastraCliente = document.getElementById('tel02CadastraCliente').value
        const dataNascCadastraCliente = document.getElementById('dataNascCadastraCliente').value

        const objCadastraCliente = {
            acao: 'cadastraCliente',
            nome: nomeCadastraCliente,
            cpf: cpfCadastraCliente,
            rg: rgCadastraCliente,
            email: emailCadastraCliente,
            tel1: tel1CadastraCliente,
            tel2: tel2CadastraCliente,
            dataNasc: dataNascCadastraCliente,
            idUsuario: idUsuario
        }

        // $.ajax({
        //     method: 'POST',
        //     url: '/api/clientes.php',
        //     data: objCadastraCliente,
        //     success: function (res) {
        //         console.log(res)
        //     }
        // })

        for (var i = 1; i <= clicks; i++) {
            const ruaEndereco = document.getElementById('ruaEndereco' + i).value
            const numeroEndereco = document.getElementById('numeroEndereco' + i).value
            const bairroEndereco = document.getElementById('bairroEndereco' + i).value
            const cepEndereco = document.getElementById('cepEndereco' + i).value
            const cidadeEndereco = document.getElementById('cidadeEndereco' + i).value
            const estadoEndereco = document.getElementById('estadoEndereco' + i).value

            const objFirstEndereco = {
                acao: 'cadastraEndereco',
                cpf: cpfCadastraCliente,
                rua: ruaEndereco,
                numero: numeroEndereco,
                bairro: bairroEndereco,
                cep: cepEndereco,
                cidade: cidadeEndereco,
                estado: estadoEndereco,
                enderecoOrdem: i,
                idUsuario: idUsuario
            }

            console.log(objFirstEndereco)

            // $.ajax({
            //     method: 'POST',
            //     url: '/api/clientes.php',
            //     data: objFirstEndereco,
            //     success: function (res) {
            //         console.log(res)
            //     }
            // })

        }
    })
})


// $(function () {

//     const statusLogged = () => {
//         $("#statusLogin").show()
//     }

//     $("#formRegisterCustomerAddress").hide()
//     $("#tableCustomers").hide()
//     $("#formUpdateCustomer").hide()
//     $("#formDeleteCustomer").hide()
//     $("#tableUpdateDeleteCustomers").hide()
//     $("#tableAddress").hide()
//     $("#formUpdateAddress").hide()
//     $("#formDeleteAddress").hide()
//     $("#tableUpdateDeleteAddress").hide()


//     const showCadastraClienteEndereco = function () {
//         $("#formRegisterCustomerAddress").show()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").hide()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").hide()
//     }

//     const showListaCliente = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").show()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").hide()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").hide()
//     }

//     const showAlteraCliente = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").show()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").show()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").hide()
//     }

//     const showDeletaCliente = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").show()
//         $("#tableUpdateDeleteCustomers").show()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").hide()
//     }

//     const showListaEndereco = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").hide()
//         $("#tableAddress").show()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").hide()
//     }

//     const showAlteraEndereco = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").hide()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").show()
//         $("#formDeleteAddress").hide()
//         $("#tableUpdateDeleteAddress").show()
//     }

//     const showDeletaEndereco = function () {
//         $("#formRegisterCustomerAddress").hide()
//         $("#tableCustomers").hide()
//         $("#formUpdateCustomer").hide()
//         $("#formDeleteCustomer").hide()
//         $("#tableUpdateDeleteCustomers").hide()
//         $("#tableAddress").hide()
//         $("#formUpdateAddress").hide()
//         $("#formDeleteAddress").show()
//         $("#tableUpdateDeleteAddress").show()
//     }


//     // ------------------------------------- OK -----------------------------
//     //VERIFICAR LOCALSTORAGE
//     const verificaLogin = () => {

//         const logadoLocalstorage = localStorage.getItem("logado")

//         if (logadoLocalstorage == "1") {

//             const loginLocalstorage = localStorage.getItem("login")
//             const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage

//             statusLogged()

//             $.ajax({
//                 method: "GET",
//                 url: urlLoginLocalstorage,
//                 success: function (res) {
//                     idUsuario = res.id_usuario

//                     const salutation = "Olá, " + res.nome + "."
//                     $("#salutation").html(salutation)
//                     $("#btnShowCustomers").show()

//                     if (res.usuario_tipo == "MASTER") {
//                         $("#btnShowUsers").show()
//                     }
//                 }
//             })
//         } else {
//             window.location.href = "../index.html"
//         }
//     }
//     verificaLogin()


//     // ------------------------------------- OK -----------------------------
//     //ADICIONA ENDEREÇO
//     var clicks = 0;
//     $("#btnAddAddress").click(function (e) {
//         e.preventDefault()
//         clicks += 1;

//         var tagForm = document.createElement("form")
//         $("#addresses").append(tagForm)
//         tagForm.setAttribute("id", 'formAddress' + clicks)
//         tagForm.setAttribute("method", 'POST')
//         tagForm.setAttribute("class", 'formAddress')

//         var tagH3 = document.createElement("h3")
//         tagH3.setAttribute("id", 'h3Address' + clicks)
//         tagForm.appendChild(tagH3)

//         if (clicks == "1") {
//             tagH3.textContent = "ENDEREÇO " + clicks + " - (PRINCIPAL)"
//         } else {
//             tagH3.textContent = "ENDEREÇO " + clicks

//         }

//         // ----------- RUA -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'streetAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "Rua/Avenida"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'streetAddres')
//         tagInput.setAttribute("id", "streetAddress" + clicks)
//         tagForm.appendChild(tagInput)

//         // ----------- NÚMERO -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'numberAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "Número"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'numberAddress')
//         tagInput.setAttribute("id", 'numberAddress' + clicks)
//         tagForm.appendChild(tagInput)

//         // ----------- BAIRRO -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'districtAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "Bairro"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'districtAddres')
//         tagInput.setAttribute("id", 'districtAddres' + clicks)
//         tagForm.appendChild(tagInput)

//         // ----------- CEP -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'cepAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "CEP"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'cepAddres')
//         tagInput.setAttribute("id", 'cepAddres' + clicks)
//         tagForm.appendChild(tagInput)

//         // ----------- CIDADE -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'cityAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "Cidade"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'cityAddres')
//         tagInput.setAttribute("id", 'cityAddres' + clicks)
//         tagForm.appendChild(tagInput)

//         // ----------- ESTADO -----------

//         var tagLabel = document.createElement("label")
//         tagLabel.setAttribute("for", 'stateAddres' + clicks)
//         tagForm.appendChild(tagLabel)
//         tagLabel.textContent = "Estado"

//         var tagInput = document.createElement("input")
//         tagInput.setAttribute("class", 'addressCustomer')
//         tagInput.setAttribute("name", 'stateAddres')
//         tagInput.setAttribute("id", 'stateAddres' + clicks)
//         tagInput.setAttribute("name", 'stateAddres')
//         tagForm.appendChild(tagInput)


//     })


//     // ------------------------------------- OK -----------------------------
//     //CADASTRA CLIENTE E ENDREÇO(S)
//     $("#btnRegisterCustomerAddresses").click(function (e) {
//         e.preventDefault()

//         const nameRegisterCustomer = document.getElementById("nameRegisterCustomer").value
//         const cpfRegisterCustomer = document.getElementById("cpfRegisterCustomer").value
//         const rgRegisterCustomer = document.getElementById("rgRegisterCustomer").value
//         const emailRegisterCustomer = document.getElementById("emailRegisterCustomer").value
//         const tel1RegisterCustomer = document.getElementById("tel01RegisterCustomer").value
//         const tel2RegisterCustomer = document.getElementById("tel02RegisterCustomer").value
//         const dataNascRegisterCustomer = document.getElementById("dataNascRegisterCustomer").value

//         const objRegisterCustomer = {
//             acao: "cadastraCliente",
//             nome: nameRegisterCustomer,
//             cpf: cpfRegisterCustomer,
//             rg: rgRegisterCustomer,
//             email: emailRegisterCustomer,
//             tel1: tel1RegisterCustomer,
//             tel2: tel2RegisterCustomer,
//             dataNasc: dataNascRegisterCustomer,
//             idUsuario: idUsuario
//         }

//         $.ajax({
//             method: "POST",
//             url: "/api/clientes.php",
//             data: objRegisterCustomer,
//             success: function (res) {
//                 console.log(res)
//             }
//         })

//         for (var i = 1; i <= clicks; i++) {
//             const streetAddres = document.getElementById("streetAddress" + i).value
//             const numberAddress = document.getElementById("numberAddress" + i).value
//             const districtAddres = document.getElementById("districtAddres" + i).value
//             const cepAddres = document.getElementById("cepAddres" + i).value
//             const cityAddres = document.getElementById("cityAddres" + i).value
//             const stateAddres = document.getElementById("stateAddres" + i).value

//             const objFirstAddress = {
//                 acao: "cadastraEndereco",
//                 cpf: cpfRegisterCustomer,
//                 rua: streetAddres,
//                 numero: numberAddress,
//                 bairro: districtAddres,
//                 cep: cepAddres,
//                 cidade: cityAddres,
//                 estado: stateAddres,
//                 principal: i,
//                 ativo: "1",
//                 idUsuario: idUsuario
//             }

//             $.ajax({
//                 method: "POST",
//                 url: "/api/clientes.php",
//                 data: objFirstAddress,
//                 success: function (res) {
//                     console.log(res)
//                 }
//             })
//         }

//     })

//     // ------------------------------------- OK-----------------------------
//     //     LISTA CLIENTES
//     $("#btnListaCliente").click(function () {

//         showListaCliente()

//         $.ajax({
//             method: "GET",
//             url: "/api/clientes.php?acao=listarClientes",
//             success: (res) => {
//                 console.log(res)

//                 res.forEach(function (row) {
//                     var tableBody = document.getElementById("tbodyClientes");
//                     var newRow = document.createElement("tr");
//                     tableBody.appendChild(newRow);

//                     Object.values(row).forEach(value => {
//                         var newCell = document.createElement("td");
//                         newCell.textContent = value;
//                         newRow.appendChild(newCell);
//                     })
//                 });
//             }
//         })
//     })

//     // UPDATE CLIENTE
//     $("#btnAlteraCliente").click(function () {

//         showAlteraCliente()

//         $.ajax({
//             method: "GET",
//             url: "/api/clientes.php?acao=listarClientes",
//             success: (res) => {

//                 res.forEach(function (row) {
//                     var tableBody = document.getElementById("tbodyUpdateDeleteClientes");
//                     var newRow = document.createElement("tr");
//                     tableBody.appendChild(newRow);

//                     Object.values(row).forEach(value => {
//                         var newCell = document.createElement("td");
//                         newCell.textContent = value;
//                         newRow.appendChild(newCell);
//                     })
//                     var actionsCell = document.createElement("td");
//                     var btnActionUpdateDelete = document.createElement("button")
//                     btnActionUpdateDelete.setAttribute("data-id", row.id_cliente)
//                     btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateCliente")
//                     btnActionUpdateDelete.textContent = "SELECIONAR"
//                     actionsCell.appendChild(btnActionUpdateDelete)
//                     newRow.appendChild(actionsCell)
//                 })

//                 $(".btnUpdateCliente").click(function () {

//                     $("#idUpdateCustomer").val("");
//                     $("#nameUpdateCustomer").val("")
//                     $("#cpfUpdateCustomer").val("")
//                     $("#rgUpdateCustomer").val("")
//                     $("#emailUpdateCustomer").val("")
//                     $("#tel01UpdateCustomer").val("")
//                     $("#tel02UpdateCustomer").val("")
//                     $("#dataNascRegisterCustomer").val("")

//                     const idBtnUpdateCliente = $(this).attr('data-id')
//                     const urlIdBtnUpdateCliente = "/api/clientes.php?acao=listarUpdateCliente&id=" + idBtnUpdateCliente

//                     $.ajax({
//                         method: "GET",
//                         url: urlIdBtnUpdateCliente,
//                         success: (res) => {

//                             const insereDadosInputUpdateCliente = () => {

//                                 const idUpdateClienteRes = res[0].id_cliente
//                                 const nomeUpdateClienteRes = res[0].nome
//                                 const cpfUpdateClienteRes = res[0].cpf
//                                 const rgUpdateClineteRes = res[0].rg
//                                 const emailUpdateClineteRes = res[0].email
//                                 const telefone1UpdateClienteRes = res[0].telefone1
//                                 const telefone2UpdateClienteRes = res[0].telefone2
//                                 const dataNascUpdateClienteRes = res[0].data_nasc

//                                 $("#idUpdateCustomer").val(idUpdateClienteRes);
//                                 $("#nameUpdateCustomer").val(nomeUpdateClienteRes)
//                                 $("#cpfUpdateCustomer").val(cpfUpdateClienteRes)
//                                 $("#rgUpdateCustomer").val(rgUpdateClineteRes)
//                                 $("#emailUpdateCustomer").val(emailUpdateClineteRes)
//                                 $("#tel01UpdateCustomer").val(telefone1UpdateClienteRes)
//                                 $("#tel02UpdateCustomer").val(telefone2UpdateClienteRes)
//                                 $("#dataNascRegisterCustomer").val(dataNascUpdateClienteRes)

//                             }
//                             insereDadosInputUpdateCliente()

//                             $("#btnUpdateCustomer").click(function () {

//                                 const idUpdateCliente = document.getElementById("idUpdateCustomer").value
//                                 const nomeUpdateCliente = document.getElementById("nameUpdateCustomer").value
//                                 const cpfUpdateCliente = document.getElementById("cpfUpdateCustomer").value
//                                 const rgUpdateCliente = document.getElementById("rgUpdateCustomer").value
//                                 const emailUpdateCliente = document.getElementById("emailUpdateCustomer").value
//                                 const telefone1UpdateCliente = document.getElementById("tel01UpdateCustomer").value
//                                 const telefone2UpdateCliente = document.getElementById("tel02UpdateCustomer").value
//                                 const dataNascUpdateCliente = document.getElementById("dataNascRegisterCustomer").value
//                                 const loginLocalstorage = localStorage.getItem("login")

//                                 const objUpdateCliente = {
//                                     acao: "updateCliente",
//                                     idCliente: idUpdateCliente,
//                                     nome: nomeUpdateCliente,
//                                     cpf: cpfUpdateCliente,
//                                     rg: rgUpdateCliente,
//                                     email: emailUpdateCliente,
//                                     telefone1: telefone1UpdateCliente,
//                                     telefone2: telefone2UpdateCliente,
//                                     dataNasc: dataNascUpdateCliente
//                                 }

//                                 $.ajax({
//                                     type: "PUT",
//                                     url: "/api/clientes.php",
//                                     data: objUpdateCliente,
//                                     success: (res) => {
//                                     }
//                                 })




//                                 $.ajax({
//                                     method: "GET",
//                                     url: urlIdBtnUpdateCliente,
//                                     success: (res) => {

//                                         if (nomeUpdateClienteRes != nomeUpdateCliente) {

//                                             const objNomeLogUpdateCliente = {
//                                                 campo: "nome",
//                                                 nomeAntigo: nomeUpdateClienteRes,
//                                                 nomeAtual: nomeUpdateCliente,
//                                                 idUsuario: idUpdateClienteRes,
//                                                 login: loginLocalstorage
//                                             }

//                                             console.log(objNomeLogUpdateCliente)

//                                             // $.ajax({
//                                             //     method: "POST",
//                                             //     url: "/api/clientes.php",
//                                             //     data: objNomeLogUpdateCliente,
//                                             //     success: function (res) {
//                                             //         console.log(res)
//                                             //     }
//                                             // })
//                                         }

//                                         // if (cpfUpdateClienteRes != cpfUpdateCliente) {

//                                         //     const objCpfLogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: cpfUpdateCliente,
//                                         //         nomeAtual: objUpdateCliente.cpf,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objCpfLogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objCpfLogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }

//                                         // if (rgUpdateClineteRes != rgUpdateCliente) {

//                                         //     const objRgLogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: rgUpdateClineteRes,
//                                         //         nomeAtual: rgUpdateCliente,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objRgLogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objRgLogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }

//                                         // if (emailUpdateClineteRes != emailUpdateCliente) {

//                                         //     const objEmailLogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: emailUpdateClineteRes,
//                                         //         nomeAtual: emailUpdateCliente,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objEmailLogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objEmailLogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }

//                                         // if (telefone1UpdateClienteRes != telefone1UpdateCliente) {

//                                         //     const objTelefone1LogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: telefone1UpdateClienteRes,
//                                         //         nomeAtual: telefone1UpdateCliente,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objTelefone1LogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objTelefone1LogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }

//                                         // if (telefone2UpdateClienteRes != telefone2UpdateCliente) {

//                                         //     const objTelefone2LogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: telefone2UpdateClienteRes,
//                                         //         nomeAtual: telefone2UpdateCliente,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objTelefone2LogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objTelefone2LogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }

//                                         // if (dataNascUpdateClienteRes != dataNascUpdateCliente) {

//                                         //     const objDataNascLogUpdateCliente = {
//                                         //         campo: "cpf",
//                                         //         nomeAntigo: dataNascUpdateClienteRes,
//                                         //         nomeAtual: dataNascUpdateCliente,
//                                         //         idUsuario: idUsuario
//                                         //     }

//                                         //     console.log(objDataNascLogUpdateCliente)

//                                         //     $.ajax({
//                                         //         method: "POST",
//                                         //         url: "/api/clientes.php",
//                                         //         data: objDataNascLogUpdateCliente,
//                                         //         success: function (res) {
//                                         //             console.log(res)
//                                         //         }
//                                         //     })
//                                         // }
//                                     } // tem que estar dentro desse evento de click
//                                 })
//                             })
//                         }
//                     })
//                 })
//             }
//         })

//     })





//     //     $.ajax({
//     //         method: "GET",
//     //         url: urlIdBtnUpdateCliente,
//     //         success: (res) => {

//     //             const nomeUpdateClienteRes = res[0].nome
//     //             const cpfUpdateClienteRes = res[0].cpf
//     //             const rgUpdateClineteRes = res[0].rg
//     //             const emailUpdateClineteRes = res[0].email
//     //             const telefone1UpdateClienteRes = res[0].telefone1
//     //             const telefone2UpdateClienteRes = res[0].telefone2
//     //             const dataNascUpdateClienteRes = res[0].data_nasc

//     //         }
//     //     })














//     // })







//     //     $("#btnUpdateDeleteTableCustomers").click(function () {

//     //         $.ajax({
//     //             method: "GET",
//     //             url: "/api/clientes.php?acao=listarClientes",
//     //             success: (res) => {
//     //                 console.log(res)

//     //                 res.forEach(function (row) {
//     //                     var tableBody = document.getElementById("tbodyUpdateDeleteEnderecos");
//     //                     var newRow = document.createElement("tr");
//     //                     tableBody.appendChild(newRow);

//     //                     Object.values(row).forEach(value => {
//     //                         var newCell = document.createElement("td");
//     //                         newCell.textContent = value;
//     //                         newRow.appendChild(newCell);
//     //                     })
//     //                     var actionsCell = document.createElement("td");
//     //                     var btnActionUpdateDelete = document.createElement("button")
//     //                     btnActionUpdateDelete.setAttribute("data-id", row.id_usuario)
//     //                     btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateDeleteUser")
//     //                     btnActionUpdateDelete.textContent = "UPDATE/DELETE"
//     //                     actionsCell.appendChild(btnActionUpdateDelete)
//     //                     newRow.appendChild(actionsCell)
//     //                 });
//     //             }
//     //         })
//     //     })

//     //     $("#btnUpdateDeleteTableAddresses").click(function () {

//     //         $.ajax({
//     //             method: "GET",
//     //             url: "/api/clientes.php?acao=listarEnderecos",
//     //             success: (res) => {
//     //                 console.log(res)

//     //                 res.forEach(function (row) {
//     //                     var tableBody = document.getElementById("tbodyUpdateDeleteEnderecos");
//     //                     var newRow = document.createElement("tr");
//     //                     tableBody.appendChild(newRow);

//     //                     Object.values(row).forEach(value => {
//     //                         var newCell = document.createElement("td");
//     //                         newCell.textContent = value;
//     //                         newRow.appendChild(newCell);
//     //                     })
//     //                     var actionsCell = document.createElement("td");
//     //                     var btnActionUpdateDelete = document.createElement("button")
//     //                     btnActionUpdateDelete.setAttribute("data-id", row.id_usuario)
//     //                     btnActionUpdateDelete.setAttribute("class", "btn-orange btnUpdateDeleteUser")
//     //                     btnActionUpdateDelete.textContent = "UPDATE/DELETE"
//     //                     actionsCell.appendChild(btnActionUpdateDelete)
//     //                     newRow.appendChild(actionsCell)
//     //                 });
//     //             }
//     //         })
//     //     })



// })