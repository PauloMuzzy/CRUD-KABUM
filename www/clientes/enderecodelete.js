$(function () {

    $(".semAcesso").hide()
    $(".conteudo").hide()

    const loginUsuario = localStorage.getItem("login")
    const urlSetUsuario = "/api/usuarios.php?acao=setUsuario&login=" + loginUsuario

    $.ajax({
        method: "GET",
        url: urlSetUsuario,
        success: function (res) {
            const acessoDeletar = res.acesso_deletar
            const tipoUsuario = res.tipo_usuario
            const idUsuario = res.id_usuario
            localStorage.setItem("idUsuario", idUsuario)
            if (acessoDeletar == "HABILITADO" || tipoUsuario == "MASTER") {
                $(".conteudo").show()

            } else if (acessoDeletar == "DESABILITADO") {
                $(".semAcesso").show()
            }
        }
    })

    $.ajax({
        method: "GET",
        url: "/api/enderecos.php?acao=listarEnderecos",
        success: (res) => {

            console.log(res)

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
                var botaoDeleteEndereco = document.createElement("button")
                botaoDeleteEndereco.setAttribute("data-id", row.id_endereco)
                botaoDeleteEndereco.setAttribute("class", "botaoLaranjaClaro botaoDeleteEndereco")
                botaoDeleteEndereco.textContent = "DELETAR"
                actionsCell.appendChild(botaoDeleteEndereco)
                newRow.appendChild(actionsCell)
            })

            $(".botaoDeleteEndereco").click(function () {

                const confirmaDeletarEndereco = confirm("CONFIRMA DELETAR CLIENTE ?")

                if (confirmaDeletarEndereco == true) {

                    const idbotaoDeleteEndereco = $(this).attr('data-id')
                    const objDeleteEndereco = {
                        acao: "enderecoDelete",
                        id: idbotaoDeleteEndereco
                    }

                    $.ajax({
                        type: "PUT",
                        url: "/api/enderecos.php",
                        data: objDeleteEndereco,
                        success: (res) => {
                            alert("ENDEREÇO DELETADO!")
                            location.reload()
                        }
                    })
                }
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

