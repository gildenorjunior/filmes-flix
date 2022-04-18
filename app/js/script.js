// TODO: ARQUIVO DE CONFIGURAÇÕES, ESTRUTURAR MELHOR COM PARAMETROS DA URL
//      ADICIONAR SLIDE CARROSSEL NA PÁGINA
//      PEGAR OS DADOS DE FORMA DINÂMICA NO JS
//      REFATORAR CÓDIGO JS
import * as key from "../config/key.js";

const URL_API = `https://api.themoviedb.org/3/movie/popular?api_key=${key.API_KEY}&page=1&language=pt-BR`;
const URL_PATH_IMAGE = "https://image.tmdb.org/t/p/original/";

function getFilmes() {
  axios
    .get(URL_API)
    .then((response) => {
      var data = response.data.results;

      var posterPath = data[0].backdrop_path;
      mudaBackground(`${URL_PATH_IMAGE}${posterPath}`);

      let capaPath = data[0].poster_path;
      mudaCapaFilme(`${URL_PATH_IMAGE}${capaPath}`);

      let dataLancamento = data[0].release_date;
      mudaDuracao(dataLancamento);

      let titulo = data[0].title;
      mudaTitulo(titulo);

      let descricao = data[0].overview;
      mudaDescricao(descricao);
    })
    .catch((error) => console.log(error));
}

function mudaBackground(urlPath) {
  let body = document.querySelector("body");
  body.style.backgroundImage = `url(${urlPath})`;
}

function mudaCapaFilme(urlPath) {
  let capa = document.querySelector("#capa-filme");
  capa.setAttribute("src", `${urlPath}`);
}

function mudaDuracao(dataLancamento) {
  let duracao = document.querySelector("#main__data-lancamento");
  duracao.innerHTML = `${dataLancamento}`;
}

function mudaTitulo(texto) {
  let titulo = document.querySelector("#header__titulo");
  titulo.innerHTML = `${texto}`;
}

function mudaDescricao(texto) {
  let descricao = document.querySelector(".main__descricao p");
  descricao.innerHTML = `${texto}`;
}

getFilmes();
