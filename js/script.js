import { InserirFilmesNaTela } from "./main.js";

export const apiKey = '3330f16462f8795c970688ef5f8863cd';
let movies = [];

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
  .then(reponse => reponse.json())
  .then(data => {
    movies = data.results.slice(0, 10); // Atribui o valor a movies, por exemplo (top 10 filmes populares)
    InserirFilmesNaTela(movies);
  })
  .catch(error => {
    console.error('Ocorreu um erro ao obter os filmes populares:', error);
  });

const home = document.querySelector('.cabecalho_titulo');
home.addEventListener('click', () => {
  InserirFilmesNaTela(movies);
  document.getElementById('cabecalho_checkbox').checked = false;
  document.querySelector('.card_lista-vazia').style.display = 'none';
  document.querySelector('.cabecalho_pesquisa-input').value = '';
});