var database = require("../database/config")

function registrar(score, idUsuario) {
    var instrucaoSql = `
        INSERT INTO quiz (fkUsuario, pontuacao, dtFinalizado) VALUES ('${idUsuario}' ,${score}, now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};