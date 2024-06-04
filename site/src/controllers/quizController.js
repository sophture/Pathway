var quizModel = require("../models/quizModel");

function registrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var score = req.body.scoreServer;
    var idUsuario = req.body.idUsuarioServer;

    // Faça as validações dos valores
    if (score == undefined) {
        res.status(400).send("Seu score está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizModel.registrar(score, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao armazenar a pontuação! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    registrar
}