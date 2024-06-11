

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
            label: 'Últimas pontuações',
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
                    for (let posicao = 0;
                        posicao < resultado.length;
                        posicao++) {
                        if (posicao == 0) {
                            posicao1.innerHTML = resultado[posicao].nome;
                            pontuacao1.innerHTML = resultado[posicao].pontos;
                        }
                        if (posicao == 1) {
                            posicao2.innerHTML = resultado[posicao].nome;
                            pontuacao2.innerHTML = resultado[posicao].pontos;
                        }
                        if (posicao == 2) {
                            posicao3.innerHTML = resultado[posicao].nome;
                            pontuacao3.innerHTML = resultado[posicao].pontos;
                        }
                        if (posicao == 3) {
                            posicao4.innerHTML = resultado[posicao].nome;
                            pontuacao4.innerHTML = resultado[posicao].pontos;
                        }
                        if (posicao == 4) {
                            posicao5.innerHTML = resultado[posicao].nome;
                            pontuacao5.innerHTML = resultado[posicao].pontos;
                        }
                    }
                })
            }
        })
}

function carregarPagina() {
    listarCidades();
    ranking();
}
