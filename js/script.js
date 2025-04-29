import { InserirFilmesNaTela } from "./main.js";

let movies = [];

fetch('https://filmfrenzy-api.onrender.com')
  .then(response => response.json())
  .then(data => {
    movies = data.results.slice(0, 10);
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