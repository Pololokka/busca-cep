async function buscaEndereco(cep){
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = "";
    try{
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var CEPConvertido = await consultaCEP.json();
        if(CEPConvertido.erro) {
            throw Error("CEP inexistente");
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = CEPConvertido.localidade;
        logradouro.value = CEPConvertido.logradouro;
        estado.value = CEPConvertido.uf;
        bairro.value = CEPConvertido.bairro;
        return CEPConvertido;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente.</p>`
        console.log(erro);
    }
}


//busca vários itens de uma vez
/*
let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map( valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/

var achaCEP = document.getElementById('cep');
achaCEP.addEventListener("focusout", () => buscaEndereco(achaCEP.value))

//versão antiga 1
/*
var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
.then(resposta => resposta.json())
.then(r => {
    if(r.erro){
        throw Error('Este CEP não existe.')
    } 
    else {
        console.log(r)}
    })
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processamento concluído'));
*/
