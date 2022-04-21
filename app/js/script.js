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
const setaEsquerda = document.querySelector("#seta-carrossel-esquerda");
const setaDireita = document.querySelector("#seta-carrossel-direita");
const setaCarrossel = document.querySelectorAll(".seta-carrossel");

let arrayFilmes;
var variadorDeFilme = 0;

const getFilmes = () => {
  fetch(URL_API)
    .then((response) => response.json())
    .then((response) => {
      arrayFilmes = response.results;
    })
    .catch((error) => console.log(error));
};

const trocaBackground = (urlPath) => {
  body.style.backgroundImage = `url(${URL_PATH_IMAGE}${urlPath})`;
};

const trocaCapaFilme = (urlPath) => {
  capa.setAttribute("src", `${URL_PATH_IMAGE}${urlPath}`);
};

const troca = (propriedade, valorAtribuido) => {
  propriedade.innerHTML = `${valorAtribuido}`;
};

const clickSetaDireita = () => {
  setaDireita.addEventListener("click", (event) => {
    const filmeExibido = arrayFilmes[variadorDeFilme];
    if (variadorDeFilme < arrayFilmes.length) {
      trocaBackground(filmeExibido.backdrop_path);
      variadorDeFilme++;
    } else {
      event.preventDefault();
      alert("Não há mais filmes para ver aqui...");
    }
  });
};

const clickSetaEsquerda = () => {
  setaEsquerda.addEventListener("click", (event) => {
    const filmeExibido = arrayFilmes[variadorDeFilme];
    if (variadorDeFilme == 0) {
      event.preventDefault();
      alert("Você está no primeiro filme da lista...");
    } else {
      trocaBackground(filmeExibido.backdrop_path);
      trocaCapaFilme(filmeExibido.poster_path);
      troca(titulo, filmeExibido.title);
      troca(descricao, filmeExibido.overview);
      troca(duracao, filmeExibido.release_date);
      variadorDeFilme--;
    }
  });
};

const clickSeta = () => {
  // setaCarrossel.forEach((seta) => {
  //   seta.addEventListener("click", (event) => {
  //     const filmeExibido = arrayFilmes[variadorDeFilme];
  //     if (event.target.id == "seta-carrossel-direita") {
  //       if (variadorDeFilme < arrayFilmes.length) {
  //         trocaBackground(filmeExibido.backdrop_path);
  //         trocaCapaFilme(filmeExibido.poster_path);
  //         troca(titulo, filmeExibido.title);
  //         troca(descricao, filmeExibido.overview);
  //         troca(duracao, filmeExibido.release_date);
  //         variadorDeFilme++;
  //       } else {
  //         event.preventDefault();
  //         alert("Não há mais filmes para ver aqui...");
  //       }
  //     } else if (event.target.id == "seta-carrossel-esquerda") {
  //       if (variadorDeFilme == 0) {
  //         event.preventDefault();
  //         alert("Você está no primeiro filme da lista...");
  //       } else {
  //         trocaBackground(filmeExibido.backdrop_path);
  //         trocaCapaFilme(filmeExibido.poster_path);
  //         troca(titulo, filmeExibido.title);
  //         troca(descricao, filmeExibido.overview);
  //         troca(duracao, filmeExibido.release_date);
  //         variadorDeFilme--;
  //       }
  //     }
  //   });
  // });
};

getFilmes();
clickSetaDireita();
clickSetaEsquerda();
// clickSeta();
