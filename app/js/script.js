// TODO: ARQUIVO DE CONFIGURAÇÕES, ESTRUTURAR MELHOR COM PARAMETROS DA URL
//      ADICIONAR SLIDE CARROSSEL NA PÁGINA
//      PEGAR OS DADOS DE FORMA DINÂMICA NO JS
//      REFATORAR CÓDIGO JS
//      BOTÕES DO CARROSSEL DEVEM FICAR PARADOS AO TROCAR DE FILMES
//      AO MUDAR DE FILMES E A DESCRIÇÃO DO MESMO FOR GRANDE DEVE TER UM ESPAÇAMENTO ENTRE ELA E OS BOTÕES DE ASSISTIR AGORA E TRAILER
//      LÓGICA PARA VOTOS DE POPULARIDADE DO FILME ALTERNANDO ESTRELAS NA TELA

import * as key from "../config/key.js";

const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=${key.API_KEY}&page=1&language=pt-BR`;
const URL_PATH_IMAGE = "https://image.tmdb.org/t/p/original/";

const body = document.querySelector("body");
const capa = document.querySelector("#capa-filme");
const duracao = document.querySelector("#main__data-lancamento");
const titulo = document.querySelector("#header__titulo");
const descricao = document.querySelector(".main__descricao p");
const btnSetaEsquerda = document.querySelector("#seta-carrossel-esquerda");
const btnSetaDireita = document.querySelector("#seta-carrossel-direita");

var arrayFilmes = [];
var filmeAtual = 0;

function onLoad() {
  window.addEventListener("load", async function () {
    await fetch(URL_API)
      .then((response) => response.json())
      .then((response) => {
        arrayFilmes = response.results;

        let filme = {
          titulo: arrayFilmes[filmeAtual].title,
          duracao: arrayFilmes[filmeAtual].release_date,
          descricao: arrayFilmes[filmeAtual].overview,
          capa: arrayFilmes[filmeAtual].poster_path,
          background: arrayFilmes[filmeAtual].backdrop_path,
        };

        trocaTudo(
          filme.titulo,
          filme.duracao,
          filme.descricao,
          filme.capa,
          filme.background
        );
      })
      .catch((error) => console.log(error));
  });
}

function trocaCapaFilme(url) {
  capa.setAttribute("src", `${URL_PATH_IMAGE}${url}`);
}

function trocaBackground(url) {
  body.style.backgroundImage = `url(${URL_PATH_IMAGE}${url})`;
}

function troca(title, overview, release_date) {
  titulo.innerHTML = `${title}`;
  descricao.innerHTML = `${overview}`;
  duracao.innerHTML = `${release_date}`;
}

function trocaTudo(titulo, duracao, descricao, capa, background) {
  troca(titulo, descricao, duracao);
  trocaBackground(background);
  trocaCapaFilme(capa);
}

function clickSetaDireita() {
  btnSetaDireita.addEventListener("click", (e) => {
    filmeAtual++;
    if (filmeAtual == arrayFilmes.length - 1) filmeAtual = 0;

    let filme = {
      titulo: arrayFilmes[filmeAtual].title,
      duracao: arrayFilmes[filmeAtual].release_date,
      descricao: arrayFilmes[filmeAtual].overview,
      capa: arrayFilmes[filmeAtual].poster_path,
      background: arrayFilmes[filmeAtual].backdrop_path,
    };

    trocaTudo(
      filme.titulo,
      filme.duracao,
      filme.descricao,
      filme.capa,
      filme.background
    );
  });
}

function clickSetaEsquerda() {
  btnSetaEsquerda.addEventListener("click", (e) => {
    filmeAtual--;
    if (filmeAtual < 0) filmeAtual = arrayFilmes.length - 1;

    let filme = {
      titulo: arrayFilmes[filmeAtual].title,
      duracao: arrayFilmes[filmeAtual].release_date,
      descricao: arrayFilmes[filmeAtual].overview,
      capa: arrayFilmes[filmeAtual].poster_path,
      background: arrayFilmes[filmeAtual].backdrop_path,
    };

    trocaTudo(
      filme.titulo,
      filme.duracao,
      filme.descricao,
      filme.capa,
      filme.background
    );
  });
}

onLoad();
clickSetaDireita();
clickSetaEsquerda();
