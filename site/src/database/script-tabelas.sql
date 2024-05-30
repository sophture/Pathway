create database pathway;

use pathway;

create table usuario (
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(45) unique,
senha varchar(10)
);

create table post (
idPost int primary key auto_increment,
conteudo varchar(1000),
dtPublicacao datetime,
fkUsuario int,
constraint fkUsuarioPost foreign key (fkUsuario) references usuario(idUsuario)
);

create table cidadeEscolhida (
idCidade int primary key auto_increment,
nome varchar(20),
fkUsuario int,
constraint fkCidadeUsuario foreign key (fkUsuario) references usuario(idUsuario)
);

create table quiz (
idQuiz int primary key auto_increment,
pergunta varchar(80),
resposta varchar(45)
);

create table ranking (
idRanking int,
fkUsuario int,
fkQuiz int,
primary key (idRanking, fkUsuario, fkQuiz),
pontuacao int,
dtFinalizado datetime
);


