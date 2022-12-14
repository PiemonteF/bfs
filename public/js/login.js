$('#buttonProximo').on("click", esconderMostrar);
$('#buttonFinalizar').hide()
let nmrInput = 0
let listaInput = [
    [$('#nomeEmpresa'),$('#inputNomeempresa'),$('#bolinhaum')],
    [$('#cnpjEmpresa'),$('#inputCnpj'),$('#bolinhadois')],
    [$('#numeroContato'),$('#inputContato'),$('#bolinhatres')],
    [$('#Emailcadastro'),$('#inputEmail'),$('#bolinhaquatro')],
    

]

//vai item por item da minha lista e vai fazer alguma coisa com cada item
listaInput.map((item, index)=>{
    if(index!=0){
        item[0].css('display','none');
        item[1].css('display','none');
        item[2].toggleClass('circulo dois');
    }
    if(index==0){
        item[0].css('display','block');
        item[1].css('display','block');
        item[2].toggleClass('circulo');
    }
    
})

function esconderMostrar(){
    nmrInput+=1;
    listaInput[nmrInput][0].css('display','block');
    listaInput[nmrInput][1].css('display','block');
    listaInput[nmrInput][2].toggleClass('circulo');

    listaInput[nmrInput - 1][0].css('display','none');
    listaInput[nmrInput - 1][1].css('display','none');
    listaInput[nmrInput][2].toggleClass('circulo dois');

    if(nmrInput==(listaInput.length-1)){
        $('#buttonProximo').hide();
        $('#buttonFinalizar').show();
    }    
}

