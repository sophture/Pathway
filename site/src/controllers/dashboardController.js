var dashboardModel = require("../models/dashboardModel.js")

function capturarPontos(req, res) {
    let idUsuario = req.body.idUsuarioServer;

    dashboardModel.capturarPontos(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        })
}

function listarCidades(req, res) {

    dashboardModel.listarCidades()
        .then(function (cidades) {
            if (cidades.length > 0) {
                res.status(200).json(cidades);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        })
}

function ranking(req, res) {

    dashboardModel.ranking()
        .then(function (resultadoRanking) {
            if (resultadoRanking.length > 0) {
                res.status(200).json(resultadoRanking);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        })
}



module.exports = {
    capturarPontos,
    listarCidades,
    ranking
}