$(function(){
    $(".tooltip").tooltipster({
        theme: "tooltipster-default",
    });
    $(".botao-apagar").click(removePost);
    $(".like").click(contaLikes);
    $(".dislike").click(contaDislikes);
    $(".destacar").click(destacaPost); 
});

// funcoes especificas

function removePost(event){
    event.preventDefault();
    $(this).closest(".post").remove();
};

function contaLikes(event){
    event.preventDefault();
    var botao = $(".like");
    botao.toggleClass("likeclicado").toggleClass("like");
    contador = $(this).parent().parent().find("span");
    console.log(this)
    console.log(contador);
    if (contador.text() = "0"){
        contador.text("1");
    }
    else{
        contador.text("0");
    };
};

function contaDislikes(event){
    event.preventDefault();
    var botao = $(".dislike");
    botao.toggleClass("dislikeclicado").toggleClass("dislike");
    contador = $(this).parent().parent().find("span");
    console.log(this)
    console.log(contador);
    if (contador.text() = "0"){
        contador.text("1");
    }
    else{
        contador.text("0");
    };
};

function destacaPost(){
    var destaque = $(this).closest(".post");
    var feed = $(this).closest(".feed"); 
    destaque.addClass("postdestacado").removeClass(".post")
    feed.prepend(destaque);
    removePost();
};