var database = require("../database/config");

function capturarPontos(idUsuario) {
  var instrucaoSql = `
SELECT pontuacao, time(dtFinalizado) as 'dtFinalizado' FROM quiz 
WHERE fkUsuario = ${idUsuario}
ORDER BY idQuiz DESC LIMIT 5;
  `;

  return database.executar(instrucaoSql);
}

function listarCidades() {
  var instrucaoSql = `
  SELECT cidadeEscolhida.nome,
  COUNT(fkCidadeEscolhida) AS 'quantidade'
  FROM cidadeEscolhida JOIN usuario
  ON usuario.fkCidadeEscolhida = cidadeEscolhida.idCidade
  GROUP BY fkCidadeEscolhida;
  `;

  return database.executar(instrucaoSql);
}

function ranking() {
  var instrucaoSql = `
  SELECT nome, SUM(pontuacao) AS pontos
  FROM quiz JOIN usuario 
  ON usuario.idusuario = quiz.fkusuario 
  GROUP BY fkUsuario
  ORDER BY pontos DESC
  LIMIT 5;
  `;

  return database.executar(instrucaoSql);
}


module.exports = {
  capturarPontos,
  listarCidades,
  ranking
};
