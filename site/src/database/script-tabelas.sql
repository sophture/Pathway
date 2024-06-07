create database pathway;

use pathway;

create table cidadeEscolhida (
idCidade int primary key auto_increment,
nome varchar(20),
aluguel decimal (5,2),
alimentacao decimal(5,2),
transporte int,
entretenimento decimal (5,2)
);

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45) unique,
fkCidadeEscolhida int,
foreign key (fkCidadeEscolhida) references cidadeEscolhida(idCidade),
senha varchar(10)
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

select * from usuario;

truncate table publicacao;