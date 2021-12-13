$(function () {

    //ADICIONA FORMULÁRIO DE ENDEREÇO
    var clicks = 0;
    $("#botaoAdicionaEndereco").click(function (e) {
        e.preventDefault()

        clicks += 1;

        var tagForm = document.createElement("form")
        $("#divEnderecos").append(tagForm)
        tagForm.setAttribute("id", "formularioEnderecos" + clicks)
        tagForm.setAttribute("method", "POST")
        tagForm.setAttribute("class", "formularioEnderecos")

        var tagH3 = document.createElement("h3")
        tagH3.setAttribute("id", "h3Enderecos" + clicks)
        tagForm.appendChild(tagH3)

        if (clicks == "1") {
            tagH3.textContent = "ENDEREÇO " + clicks + " - (PRINCIPAL)"
        } else {
            tagH3.textContent = "ENDEREÇO " + clicks

        }

        // ----------- RUA -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "ruaEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Rua/Avenida"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("name", "ruaEndereco")
        tagInput.setAttribute("id", "ruaEndereco" + clicks)
        tagInput.setAttribute("style", "text-transform:uppercase")
        tagForm.appendChild(tagInput)

        // ----------- NÚMERO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "numeroEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Número"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("name", "numeroEndereco")
        tagInput.setAttribute("id", "numeroEndereco" + clicks)
        tagInput.setAttribute("style", "text-transform:uppercase")
        tagForm.appendChild(tagInput)

        // ----------- BAIRRO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "bairroEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Bairro"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("name", "bairroEndereco")
        tagInput.setAttribute("id", "bairroEndereco" + clicks)
        tagInput.setAttribute("style", "text-transform:uppercase")
        tagForm.appendChild(tagInput)

        // ----------- CEP -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "cepEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "CEP"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", "cep")
        tagInput.setAttribute("name", "cepEndereco")
        tagInput.setAttribute("id", "cepEndereco" + clicks)
        tagForm.appendChild(tagInput)
        $(".cep").mask("99999-999")

        // ----------- CIDADE -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "cidadeEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Cidade"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("name", "cidadeEndereco")
        tagInput.setAttribute("id", "cidadeEndereco" + clicks)
        tagInput.setAttribute("style", "text-transform:uppercase")
        tagForm.appendChild(tagInput)

        // ----------- ESTADO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", "estadoEndereco" + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Estado"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("name", "estadoEndereco")
        tagInput.setAttribute("id", "estadoEndereco" + clicks)
        tagInput.setAttribute("style", "text-transform:uppercase")
        tagForm.appendChild(tagInput)
    })



    // ------------------------------------- OK -----------------------------
    //CADASTRA CLIENTE E ENDREÇO(S)
    $("#botaoCadastraCliente").click(function (e) {
        e.preventDefault()

        const confirmaCadastro = confirm("Confirma cadastro do cliente?")

        if (confirmaCadastro == true) {
            const nomeCadastraCliente = document.getElementById("nomeCadastraCliente").value
            const cpfCadastraCliente = document.getElementById("cpfCadastraCliente").value
            const rgCadastraCliente = document.getElementById("rgCadastraCliente").value
            const emailCadastraCliente = document.getElementById("emailCadastraCliente").value
            const tel1CadastraCliente = document.getElementById("tel01CadastraCliente").value
            const tel2CadastraCliente = document.getElementById("tel02CadastraCliente").value
            const dataNascCadastraCliente = document.getElementById("dataNascCadastraCliente").value

            const objCadastraCliente = {
                acao: "cadastraCliente",
                nome: nomeCadastraCliente,
                cpf: cpfCadastraCliente,
                rg: rgCadastraCliente,
                email: emailCadastraCliente,
                tel1: tel1CadastraCliente,
                tel2: tel2CadastraCliente,
                dataNasc: dataNascCadastraCliente,
                idUsuario: idUsuario
            }

            console.log(objCadastraCliente)

            // $.ajax({
            //     method: "POST",
            //     url: "/api/clientes.php",
            //     data: objCadastraCliente,
            //     success: function (res) {
            //         console.log(res)
            //     }
            // })

            for (var i = 1; i <= clicks; i++) {
                const ruaEndereco = document.getElementById("ruaEndereco" + i).value
                const numeroEndereco = document.getElementById("numeroEndereco" + i).value
                const bairroEndereco = document.getElementById("bairroEndereco" + i).value
                const cepEndereco = document.getElementById("cepEndereco" + i).value
                const cidadeEndereco = document.getElementById("cidadeEndereco" + i).value
                const estadoEndereco = document.getElementById("estadoEndereco" + i).value

                const objCadastraEndereco = {
                    acao: "cadastraEndereco",
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

                console.log(objCadastraEndereco)

                // $.ajax({
                //     method: "POST",
                //     url: "/api/clientes.php",
                //     data: objFirstEndereco,
                //     success: function (res) {
                //         console.log(res)
                //     }
                // })

            }
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

})

