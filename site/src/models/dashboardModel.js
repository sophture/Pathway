var database = require("../database/config");

function capturarPontos(idUsuario) {
  var instrucaoSql = `
SELECT pontuacao, time(dtFinalizado) as 'dtFinalizado' FROM quiz 
WHERE fkUsuario = ${idUsuario}
ORDER BY idQuiz DESC LIMIT 5;
  `;

  return database.executar(instrucaoSql);
}

module.exports = { 
    capturarPontos
};
