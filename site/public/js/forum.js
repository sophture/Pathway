fetch("publicacao/listar", {
    method: "GET",
}) .then (res => {
    res.json()
    .then(listaPosts =>{
        listaPosts.forEach(publicacao =>{
            console.log(publicacao)
        
            forum.innerHTML +=
            `
            <div>
            <p>${publicacao.NomeUsuario}</p>
            <br>
            <p>${publicacao.Conteudo}</p>
            <br>
            <p>${publicacao.Data}</p>
            </div>
            `
        })
    }
    )})

function postar() {
    let postNovo = postText.value;
    console.log(postNovo)

    if (postNovo == "") {
        alert("Insira um texto")
    } else {
        fetch("publicacao/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer : sessionStorage.ID_USUARIO,
                postServer : postNovo,
            })
        }) .then (function(req){
            console.log("Cadastrando publicação", res)

            if(resposta.ok){
                console.log("Publicação cadastrada")
            }
        }) .catch (function(erro){
            console.log("Não cadastrou", erro)
        })
        
        return false;
    }

}

