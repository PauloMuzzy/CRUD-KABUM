$(document).ready(function () {

    //Mascaras
    $('#cpf').mask('999.999.999-99');

    //Mascara RG
    var mascaraRg = {
        'translation': {
            A: {
                pattern: /[A-Za-z0-9]/
            }
        }
    };
    $('#rg').mask('99.999.999-A' || '99.999.999-99', mascaraRg);
    $('#telefone1').mask('(99)99999-9999');
    $('#telefone2').mask('(99)99999-9999');

    //Evento on submit
    /** $("#form").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);


    $("#form").on("submit", function (e) {

        var nomeForm = document.getElementById("nome").value;
        e.preventDefault(e);
        nomeForm.innerHTML = nomeForm;
        document.getElementById("teste").append(nomeForm);

        var x = document.getElementsByTagName("input");

        console.log(typeof (x));
        console.log(Object.values());

    })
    **/

});


function enviaForm(url, body) {
    console.log("body=", body);
    console.log(typeof (body));
}

function cadastraForm() {
    let url = "";
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let rg = document.getElementById("rg").value;
    let email = document.getElementById("email").value;
    let telefone1 = document.getElementById("telefone1").value;
    let telefone2 = document.getElementById("telefone2").value;
    let dataNasc = document.getElementById("dataNasc").value;

    console.log(nome);
    console.log(cpf);
    console.log(rg);
    console.log(telefone1);
    console.log(telefone2);
    console.log(dataNasc);

    body = {
        "nome": nome,
        "cpf": cpf,
        "rg": rg,
        "email": email,
        "telefone1": telefone1,
        "telefone2": telefone2,
        "dataNasc": dataNasc
    }

    enviaForm(url, body);

    $.ajax({
        url: "api.php",
        method: "post",
        data: body,
        sucess: function () {
            console.log("oi");
        }
    });

    // teste commit
    // teste commit 2

};