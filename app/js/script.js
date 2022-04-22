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
const iconeEstrela = document.querySelector("[data-avaliacao]");

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
          avaliacao: arrayFilmes[filmeAtual].vote_average,
        };

        trocaTudo(
          filme.titulo,
          filme.duracao,
          filme.descricao,
          filme.capa,
          filme.background
        );

        avaliacao(filme.avaliacao);
      })
      .catch((error) => console.log(error));
  });
}

function avaliacao(avaliacao) {
  if (avaliacao <= 1) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-regular fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);
  } else if (avaliacao > 1 && avaliacao <= 2) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    console.log("uma estrela completa");
  } else if (avaliacao > 2 && avaliacao <= 3) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-regular fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    console.log("uma estrela e meia");
  } else if (avaliacao > 3 && avaliacao <= 4) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    console.log("duas estrelas");
  } else if (avaliacao > 4 && avaliacao <= 5) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-regular fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);
    console.log("duas estrelas e meia");
  } else if (avaliacao > 5 && avaliacao <= 6) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);
    console.log("tres estrelas");
  } else if (avaliacao > 6 && avaliacao <= 7) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);

    const estrelaCriada3 = document.createElement("i");
    estrelaCriada3.classList = "fa-regular fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada3);
    console.log("tres estrelas e meia");
  } else if (avaliacao > 7 && avaliacao <= 8) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);

    const estrelaCriada3 = document.createElement("i");
    estrelaCriada3.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada3);
    console.log("quatro estrelas");
  } else if (avaliacao > 8 && avaliacao <= 9) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);

    const estrelaCriada3 = document.createElement("i");
    estrelaCriada3.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada3);

    const estrelaCriada4 = document.createElement("i");
    estrelaCriada4.classList = "fa-regular fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada4);
    console.log("quatro estrelas e meia");
  } else if (avaliacao > 9 && avaliacao <= 10) {
    const estrelaCriada = document.createElement("i");
    estrelaCriada.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada);

    const estrelaCriada1 = document.createElement("i");
    estrelaCriada1.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada1);

    const estrelaCriada2 = document.createElement("i");
    estrelaCriada2.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada2);

    const estrelaCriada3 = document.createElement("i");
    estrelaCriada3.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada3);

    const estrelaCriada4 = document.createElement("i");
    estrelaCriada4.classList = "fa-solid fa-star fa-2xl";
    iconeEstrela.appendChild(estrelaCriada4);
    console.log("cinco estrelas");
  }
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
      avaliacao: arrayFilmes[filmeAtual].vote_average,
    };

    trocaTudo(
      filme.titulo,
      filme.duracao,
      filme.descricao,
      filme.capa,
      filme.background
    );

    avaliacao(filme.avaliacao);
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
      avaliacao: arrayFilmes[filmeAtual].vote_average,
    };

    trocaTudo(
      filme.titulo,
      filme.duracao,
      filme.descricao,
      filme.capa,
      filme.background
    );

    avaliacao(filme.avaliacao);
  });
}

onLoad();
clickSetaDireita();
clickSetaEsquerda();
