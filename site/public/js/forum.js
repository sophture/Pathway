function postar() {
    let postNovo = postText.value;

    if (postNovo == "") {
        alert("Insira um texto")
    } else {
        fetch("publicacao/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuarioServer: sessionStorage.ID_USUARIO,
                postServer: postNovo,
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Publicação cadastrada")
                postText.value = ""
                listar()
            }
        }).catch(function (erro) {
            console.log("Não cadastrou", erro)
        })
        
        return false;
    }

}

function listar() {
    forum.innerHTML = ''
    fetch("publicacao/listar", {
        method: "GET",
    }).then(res => {
        res.json()
            .then(listaPosts => {
                listaPosts.forEach(publicacao => {
                    console.log(publicacao)
    
                    forum.innerHTML +=
                        `
                    <div class="card-post">
                    <p class="card-nome">${publicacao.NomeUsuario}</p>
                    <p class="card-conteudo">${publicacao.Conteudo}</p>
                    </div>
                    `
                })
            }
            )
    })
}

