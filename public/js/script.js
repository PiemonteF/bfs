// aqui estamos criando uma constante onde guardamos a url do site
const ulrUF = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
// constante que obtem qual uf esta selecionado através do id
const uf = document.getElementById("uf");
// console.log usando para debugar
console.log(uf)

const cidade = document.getElementById("cidade");

// criando evento
window.addEventListener('load', async ()=>{
    // criando uma constante request, para fazer uma requisição no site atravez da constate que criamos lá em cima
    const request = await fetch(ulrUF);
    //  criando uma constante response e transformando a request em um json
    const response = await request.json();
    const uf = document.getElementById("uf");
    // criando constante para guardar elemento criado optgroup
    const options = document.createElement("optgroup");
    
    // aqui reamos adicionando cada sigla de cada estado em uma option para cada uma
    response.forEach(function(uf){
        options.innerHTML += '<option>'+ uf.sigla +'</option>'
        
        
    })
    // usando console.log para debugar
    console.log(uf);
    // adicionando as options criadas no select com id uf
    uf.append(options);
    
    
})
// se uf adicionado
if(uf){
    // estamos adicionmando um evento
    uf.addEventListener('change', async function(){
        // guardando url para buscar as cidades do brasil buscando pelos estados que já foi feito a reuqisição
        const ulrCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf.value+'/municipios';
        // criando uma constante request, para fazer uma requisição no site atravez da constate que criamos acima
        const request = await fetch(ulrCidades);
        //  criando uma constante response e transformando a request em um json
        const response = await request.json();
        // criando uma variavel que adiciona cidade para nao ficar vazio o nome no select
        let options = '<option value="Cidade">Cidade</option>';

        // estamos adicionando as cidades ao options
        response.forEach(function(cidades){
            options += '<option>'+cidades.nome+'</option>'
        })
        // estamos adicionando as options criadas ao select da cidade
        cidade.innerHTML =  options 
    
    })
}

// Chama o modal
var modal = document.getElementById("myModal");

// Chama o botao que abre o modal
var btn = document.getElementById("configuracoes");

// Chama o botao que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Abri o modal ao clicar no botão
btn.onclick = function() {
  modal.style.display = "block";
}

// Quando o usuario clicar na seta, fecha o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Caso o usuario clicar fora do modal, o mesmo fecha
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


