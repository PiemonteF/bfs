//Possibilita passar para todas as urls o id do user, para ele nunca ser perdidio enquanto não utilizamos um token + cookies
let url = document.URL;
console.log(url);
let isEmpreiteira = url.search("id_empreiteira");//15 caracteres

let isMrv = url.search("id_administrador");//17 caracteres
console.log(isMrv);
console.log($(".url"))

//Verifica qual tipo de usuário é e envia para as tags <a> que possuem a classe chamada link o id do usuário no final do atributo href
if (isMrv > -1) {
    $(".url").each(function(index, value){
        if (this.href.includes("?")){
            this.href = this.href+"&"+url.substring(isMrv, url.length);
            console.log(this.href);
        }else{
            this.href = this.href+"?"+url.substring(isMrv, url.length);
            console.log(this.href);
        };
    });
}else if (isEmpreiteira > -1) {
    $(".url").each(function(index, value){
        if (this.href.includes("?")){
            this.href = this.href+"&"+url.substring(isEmpreiteira, url.length);
            console.log(this.href);
        }else{
            this.href = this.href+"?"+url.substring(isEmpreiteira, url.length);
            console.log(this.href);
        };
    });
};