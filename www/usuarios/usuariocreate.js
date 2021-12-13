$(function () {

    $('#alertaSucessoCadastraUsuario').hide()
    $('#alertaErroCadastraUsuario').hide()

    // ------------------------------------- OK -----------------------------
    //CADASTRAR USUARIO
    $("#botaoCadastraUsuario").click(function (e) {
        e.preventDefault()

        const confirmaCadastraUsuario = confirm('CONFIRMA CADASTRO DO USUÁRIO?')

        if (confirmaCadastraUsuario == true) {

            const nomeCadastraUsuario = document.getElementById("nomeCadastraUsuario").value
            const loginCadastraUsuario = document.getElementById("loginCadastraUsuario").value
            const senhaCadastraUsuario = document.getElementById("senhaCadastraUsuario").value
            const objCadastraUsuarios = {
                acao: "cadastrarUsuario",
                nome: nomeCadastraUsuario,
                login: loginCadastraUsuario,
                senha: senhaCadastraUsuario
            }

            $.ajax({
                method: "POST",
                url: "/api/usuarios.php",
                data: objCadastraUsuarios,
                success: function (res) {
                    $('#alertaSucessoCadastraUsuario').show()

                    setTimeout(() => {
                    }, 150000);
                    location.reload()

                },
                error: function () {
                    $('#alertaErroCadastraUsuario').show()
                }
            })
        }
    })
})