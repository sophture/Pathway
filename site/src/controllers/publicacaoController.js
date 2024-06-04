var publicacaoModel = require("../models/publicacaoModel.js")

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idUsuario = req.body.idUsuarioServer
    var post = req.body.postServer;

    // Faça as validações dos valores

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        publicacaoModel.cadastrar(idUsuario, post)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar ao publicar! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


    function listar(req, res) {
        publicacaoModel.listar()
        .then(resultado => {
            res.status(200).json(resultado)
        })
    }

module.exports = {
    cadastrar,
    listar
}