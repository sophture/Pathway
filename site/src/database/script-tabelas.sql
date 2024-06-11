create database pathway;
use pathway;

create table cidadeEscolhida (
idCidade int primary key auto_increment,
nome varchar(20)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45) unique,
fkCidadeEscolhida int,
foreign key (fkCidadeEscolhida) references cidadeEscolhida(idCidade),
senha varchar(45)
);

create table quiz (
idQuiz int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario),
pontuacao int,
dtFinalizado datetime
);

create table publicacao (
idPublicacao int auto_increment,
fkUsuario int,
primary key (idPublicacao, fkUsuario),
descricao varchar(1000),
data date,
foreign key (fkUsuario) references usuario(idUsuario)
);

select * from usuario;
select * from publicacao;
select * from quiz;

select nome, sum(pontuacao) as pontos
From quiz join usuario 
on usuario.idusuario = quiz.fkusuario 
group by fkUsuario
order by pontos desc;

insert into cidadeEscolhida (idCidade, nome) values 
(1, 'Toronto'),
(2, 'Vancouver'),
(3, 'Montreal'),
(4, 'Quebéc');

select usuario.nome as "Nome Usuario",
publicacao.descricao as "Conteudo"
from publicacao join usuario
on publicacao.fkUsuario = usuario.idUsuario
order by idPublicacao desc;

select idQuiz, pontuacao, dtFinalizado from quiz 
where fkUsuario = 2
order by idQuiz desc limit 5;

select cidadeEscolhida.nome,
count(fkCidadeEscolhida) as 'Quantidade'
from cidadeEscolhida join usuario
on usuario.fkCidadeEscolhida = cidadeEscolhida.idCidade
group by fkCidadeEscolhida;




