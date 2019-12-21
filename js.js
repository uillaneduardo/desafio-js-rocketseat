var inputElement = document.querySelector('input');
var buttonElement = document.querySelector('button');
var resultElement = document.querySelector('#resultado');


buttonElement.onclick = function(){
    startAnimation();
    axios.get('https://api.github.com/users/'+inputElement.value+'/repos')
        .then(function (response){
            //stopAnimation();
            renderRepos(response);
        })
        .catch(function (error){
            console.log(error);
            usuarioNaoEncontrado(error);
        });
        
};

function renderRepos(response) {
    limparResultado();
    var listElement = document.createElement('ul');
    for(data of response.data) {
        var liElement = document.createElement('li');
        var linkElement = document.createElement('a');
        linkElement.appendChild(document.createTextNode('Visitar Repositorio'));
        linkElement.setAttribute('href',data.html_url);
        
        liElement.appendChild(document.createTextNode(data.name));
        liElement.appendChild(linkElement);
        
        listElement.appendChild(liElement);
    }
    resultElement.appendChild(listElement);
    //console.log(listElement);
}

function usuarioNaoEncontrado(error){
    limparResultado();
    var erroText = document.createTextNode('Usuário Não Encontrado. Erro 404.');
    var errorElement = document.createElement('div');
    errorElement.setAttribute('id','erro');
    errorElement.appendChild(erroText);
    resultElement.appendChild(errorElement);
    

}

function limparResultado(){
    resultElement.innerHTML = '';
}

function startAnimation(){
    renderLoading();
}

// function stopAnimation(){
//     limparResultado();
// }

function renderLoading(){
    limparResultado();
    var text = document.createTextNode('Carregando dados...');
    resultElement.appendChild(text);
}


