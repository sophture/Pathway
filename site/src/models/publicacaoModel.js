var database = require("../database/config")

function cadastrar(idUsuario, post) {
    var instrucaoSql = `
        INSERT INTO publicacao (fkUsuario, descricao, data) VALUES ('${idUsuario}' , '${post}' , now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
    SELECT usuario.nome AS "NomeUsuario",
    publicacao.descricao AS "Conteudo",
    publicacao.data AS "Data"
    FROM publicacao JOIN usuario
    ON publicacao.fkUsuario = usuario.idUsuario;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar
};