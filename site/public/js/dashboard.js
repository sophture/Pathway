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
