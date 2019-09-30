$(function(){
    $(".tooltip").tooltipster({
        trigger: "custom",
    });
    $(".slider").slick({
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
    });
    carregaPosts();
    $(".tooltip").on("hover",function(){
        $(".tooltip").tooltipster("open");
    });
    $(".botao-apagar").click(removePost);
    $(".like").click(contaLikes);
    $(".dislike").click(contaDislikes);
    $(".destaque").click(destacaPost); 
    $("#input-post").on("input",contaCaracteres);
    publicaPost();
});

// request pro servidor

function carregaPosts(){
    $.get("http://www.json-generator.com/api/json/get/ceycmRLqWa?indent=2", function(data){
        lista = data
        $.each(lista,function(){
            name = this.nome;
            message = this.mensagem;
            photo = this.imagem;
            var feed = $(".feed");
            var piu = novoPiu(name,message,photo);
            feed.prepend(piu);
            piu.find(".botao-apagar").click(removePost);
            piu.find(".like").click(contaLikes);
            piu.find(".dislike").click(contaDislikes);
            piu.find(".destaque").click(destacaPost); 
        });
    }).fail(function(){
        alert("Não foi possível conectar com o servidor");
    });

};

// Contador de caracteres
function contaCaracteres(){
    var message = $("#input-post").val();
    var numCaracteres = message.length;    
    var contador = $("#contador");
    if (numCaracteres > 140){
        contador.removeClass("contPalavras").addClass("cor-vermelha");
    }
    else{
        contador.addClass("contPalavras").removeClass("cor-vermelha");
    };
    $("#numPalavras").text(numCaracteres);
};

// Publicacao
function publicaPost(){
    $(".publicar").on("click",function(){
        var message = $("#input-post").val();     
        var numCaracteres = message.length;
        if(numCaracteres == "0"){
            $(".publicar").tooltipster("content","O post deve conter ao menos um caracter").tooltipster("open");
            setTimeout(function(){
                $(".publicar").tooltipster("close");
            },1900);
        }
        else if (numCaracteres > 140){
            $(".publicar").tooltipster("content","O post deve conter menos de 140 caracteres").tooltipster("open");
            setTimeout(function(){
                $(".publicar").tooltipster("close");
            },1600);
        }
        else {
            var feed = $(".feed");
            var name = "Matias Helmeister";
            var photo = "/imagens/matiasperfil.jpg";
            var piu = novoPiu(name,message,photo);        
            feed.prepend(piu);
            piu.find(".botao-apagar").click(removePost);
            piu.find(".like").click(contaLikes);
            piu.find(".dislike").click(contaDislikes);
            piu.find(".destaque").click(destacaPost);
            $("#input-post").val("");
            contaCaracteres();
            $(".publicar").tooltipster("content","Publicado!").tooltipster("open");
            setTimeout(function(){
                $(".publicar").tooltipster("close");
            },1600);
        };
    });
};

// funcoes especificas

function novoPiu(name,message,photo){
    var post = $("<div>").addClass("post");
    var upperpost = $("<div>").addClass("regiao-superior-post");
    var infopost = $("<div>").addClass("infopost");
    if (photo == ""){
        var perfil = $("<img>").attr("src","/imagens/perfilpadrao.jpg").attr("alt","Foto de Perfil");
    }
    else{
        var perfil = $("<img>").attr("src",photo).attr("alt","Foto de Perfil");
    };
    var title = $("<h2>");
    var nome = $("<a>").attr("href","#").text(name);
    var linkApagar = $("<a>").attr("href","#");
    var botaoApagar = $("<i>").addClass("material-icons").addClass("botao-apagar").attr("title","Remover").text("clear");
    var conteudo = $("<p>").addClass("textopost").text(message);
    var reactions = $("<div>").addClass("reactions");
    var thumbUp = $("<div>").addClass("thumb");
    var contLikes = $("<span>").addClass("contLikes").val(0).text("0");
    var linkLike = $("<a>").attr("href","#");
    var botaoLike = $("<i>").addClass("material-icons").addClass("like").addClass("tooltip").attr("title","Gostei").text("thumb_up");
    var thumbDown = $("<div>").addClass("thumb");
    var contDisikes = $("<span>").addClass("contDislikes").val(0).text("0");
    var linkDislike = $("<a>").attr("href","#");
    var botaoDislike = $("<i>").addClass("material-icons").addClass("dislike").addClass("tooltip").attr("title","Não Gostei").text("thumb_down");
    var linkDestacar = $("<a>").attr("href","#");
    var destacar = $("<i>").addClass("destaque").addClass("material-icons").addClass("tooltip").attr("title","Destacar").text("stars");

    linkLike.append(botaoLike);
    thumbUp.append(contLikes);
    thumbUp.append(linkLike)
    linkDislike.append(botaoDislike);
    thumbDown.append(contDisikes);
    thumbDown.append(linkDislike)
    linkDestacar.append(destacar);

    reactions.append(thumbUp);
    reactions.append(thumbDown);
    reactions.append(linkDestacar);

    linkApagar.append(botaoApagar);

    title.append(nome);

    infopost.append(perfil);
    infopost.append(title);

    upperpost.append(infopost);
    upperpost.append(linkApagar);

    post.append(upperpost);
    post.append(conteudo);
    post.append(reactions);

    return post;
};

function removePost(event){
    event.preventDefault();
    removido = $(this).closest(".post");
    removido.fadeOut();
    setTimeout(function(){
        removido.remove();
    },1000);
};

function contaLikes(event){
    event.preventDefault();
    var botao = $(this);
    botao.toggleClass("likeclicado").toggleClass("like");
    contador = $(this).parent().parent().find("span");
    if (botao.hasClass("likeclicado")){
        contador.text("1");
        outrobotao = botao.parent().parent().parent().find(".dislikeclicado");
        if(outrobotao.hasClass("dislikeclicado")){
            outrobotao.removeClass("dislikeclicado").addClass("dislike");
            outrocontador = outrobotao.parent().parent().find("span");
            outrocontador.text("0");
        }
    }
    else if(botao.hasClass("like")){
        contador.text("0");
    };
};

function contaDislikes(event){
    event.preventDefault();
    var botao = $(this);
    botao.toggleClass("dislikeclicado").toggleClass("dislike");
    contador = $(this).parent().parent().find("span");
    if (botao.hasClass("dislikeclicado")){
        contador.text("1");
        outrobotao = botao.parent().parent().parent().find(".likeclicado");
        if(outrobotao.hasClass("likeclicado")){
            outrobotao.removeClass("likeclicado").addClass("like");
            outrocontador = outrobotao.parent().parent().find("span");
            outrocontador.text("0");
        }
    }
    else if (botao.hasClass("dislike")){
        contador.text("0");
    };
};

function destacaPost(){
    event.preventDefault();
    var destaque = $(this).closest(".post");
    var feed = $(this).closest(".feed"); 
    destaque.addClass("postdestacado").removeClass(".post")
    feed.prepend(destaque);
    posicaodestaque = feed.offset().top;
    $("body").animate(
    {
        scrollTop: posicaodestaque + "px"
    },2000);
};

// outra opcao de destaque:
// function destacaPost(){
//     var destaque = $(this).find(".destaque");
//     var feed = $(this).closest(".feed"); 
//     var post = $(this).closest(".post"); 
//     destaque.addClass("destaqueclicado").removeClass("destaque");
//     feed.prepend(post);
//     removePost();
// }