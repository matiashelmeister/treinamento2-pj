$(function(){
    $(".botao-apagar").click(removePost);
    $(".like").click(contaLikes);
    $(".dislike").click(contaDislikes);
    $(".destaque").click(destacaPost); 
    $(".link").click(function(){
        event.preventDefault();
    })
});

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
// };