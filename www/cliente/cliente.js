let acesso = 1; // aguardando validação

if (acesso == 1) {
    $(document).ready(function () {
        $(".msgSemAcessoListagem").hide();
        $(".acessoListagem").show();
    });

} else {
    $(document).ready(function () {
        $(".msgSemAcessoListagem").show();
        $(".acessoListagem").hide();
    });
}

