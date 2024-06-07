var publicacaoModel = require("../models/publicacaoModel.js")

function cadastrar(req, res) {
    var idUsuario = req.body.idUsuarioServer
    var post = req.body.postServer;

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