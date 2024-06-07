

nomeUsuario.innerHTML = `Hello, ${sessionStorage.NOME_USUARIO}`

function irLogin() {
    window.location.href = "./tela-login.html"
}

const ctx = document.getElementById('grafico').getContext('2d');

ctx.canvas.width = 600
ctx.canvas.height = 300

const grafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Ultimas pontuações',
            data: [],
            borderWidth: 3,
            borderColor: '#bc1823'
        }]
    }
});

let idUsuario = sessionStorage.ID_USUARIO

fetch("/dashboard/capturarPontos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        idUsuarioServer: idUsuario
    })
})
    .then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                resposta.reverse()
                plotarPontos(resposta)
            });
        }
    })

function plotarPontos(resposta) {
    for (
        let posicao = 0;
        posicao < resposta.length;
        posicao += 1
    ) {

        let dadoAtual = resposta[posicao]
        grafico.data.datasets[0].data.push(dadoAtual.pontuacao)
        grafico.data.labels.push(dadoAtual.dtFinalizado)
    }

    grafico.update()
}

function listarCidades() {
    fetch("dashboard/listarCidades", {
        method: "GET",
    })
        .then(function (resultado) {
            if (resultado.ok) {
                resultado.json().then(function (resultado) {
                    indicador_toronto.innerHTML = resultado[0].quantidade;
                    indicador_vancouver.innerHTML = resultado[1].quantidade;
                    indicador_montreal.innerHTML = resultado[2].quantidade;
                    indicador_quebec.innerHTML = resultado[3].quantidade;
                })
            }
        })
}


function ranking() {
    fetch("dashboard/ranking", {
        method: "GET",
    })
        .then(function (resultado) {
            if (resultado.ok) {
                resultado.json().then(function (resultado) {
                    posicao1.innerHTML = resultado[0].nome;
                    posicao2.innerHTML = resultado[1].nome;
                    posicao3.innerHTML = resultado[2].nome;
                    posicao4.innerHTML = resultado[3].nome;
                    posicao5.innerHTML = resultado[4].nome;
                    pontuacao1.innerHTML = resultado[0].pontos;
                    pontuacao2.innerHTML = resultado[1].pontos;
                    pontuacao3.innerHTML = resultado[2].pontos;
                    pontuacao4.innerHTML = resultado[3].pontos;
                    pontuacao5.innerHTML = resultado[4].pontos;
                })
            }
        })
}

function carregarPagina() {
    listarCidades()
    ranking()
}
