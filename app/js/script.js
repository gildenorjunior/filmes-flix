import * as key from "./../config/key.js";

const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=${key.API_KEY}&page=1&language=pt-BR`;
const URL_PATH_IMAGE = "https://image.tmdb.org/t/p/original/";

const body = document.querySelector("body");
const capa = document.querySelector("#capa-filme");
const duracao = document.querySelector("#main__data-lancamento");
const titulo = document.querySelector(".header__title");
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
          filme.background,
          filme.avaliacao
        );
      })
      .catch((error) => console.log(error));
  });
}

// Atribui ao HTML a quantidade de estrelas com preenchimento
// e sem preenchimento de acordo com os paramêtros
function esquemaDeEstrelas(
  qtdEstrelasComPreenchimento,
  qtdEstrelasSemPreenchimento
) {
  const qtdEstrelas = qtdEstrelasSemPreenchimento + qtdEstrelasComPreenchimento;

  if (iconeEstrela.hasChildNodes()) {
    Array.from(iconeEstrela.children).forEach((item) => {
      item.remove();
    });
  }

  for (let i = 0; i < qtdEstrelas; i++) {
    let elementoCriado = document.createElement("i");
    iconeEstrela.appendChild(elementoCriado);
  }

  Array.from(iconeEstrela.children).forEach((item) => {
    qtdEstrelasSemPreenchimento--;
    qtdEstrelasComPreenchimento--;

    if (qtdEstrelasComPreenchimento >= 0) {
      item.classList = "fa-solid fa-star fa-2xl";
    }

    if (item.classList == "") {
      item.classList = "fa-regular fa-star fa-2xl";
    }
  });
}

function avaliacaoDoFilme(notaDoFilme) {
  if (notaDoFilme <= 1) {
    esquemaDeEstrelas(4, 1);
  } else if (notaDoFilme > 1 && notaDoFilme <= 3) {
    esquemaDeEstrelas(1, 4);
    console.log("uma estrela completa");
  } else if (notaDoFilme > 3 && notaDoFilme <= 5) {
    esquemaDeEstrelas(2, 3);
    console.log("duas estrelas");
  } else if (notaDoFilme > 5 && notaDoFilme <= 7) {
    esquemaDeEstrelas(3, 2);
    console.log("tres estrelas");
  } else if (notaDoFilme > 7 && notaDoFilme <= 9) {
    esquemaDeEstrelas(4, 1);
    console.log("quatro estrelas");
  } else if (notaDoFilme > 9 && notaDoFilme <= 10) {
    esquemaDeEstrelas(5, 0);
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

function trocaTudo(titulo, duracao, descricao, capa, background, avaliacao) {
  troca(titulo, descricao, duracao);
  trocaBackground(background);
  trocaCapaFilme(capa);
  avaliacaoDoFilme(avaliacao);
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
      filme.background,
      filme.avaliacao
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
      avaliacao: arrayFilmes[filmeAtual].vote_average,
    };

    trocaTudo(
      filme.titulo,
      filme.duracao,
      filme.descricao,
      filme.capa,
      filme.background,
      filme.avaliacao
    );
  });
}

onLoad();
clickSetaDireita();
clickSetaEsquerda();
