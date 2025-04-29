import { listaDeFavoritos } from "./main.js";
import { InserirFilmesNaTela } from "./main.js";

const filtroAtivo = document.getElementById('cabecalho_checkbox');
filtroAtivo.addEventListener('change', getFilmesFavoritos);

const inputPesquisa = document.querySelector('.cabecalho_pesquisa-input');
const luga = document.querySelector('.cabecalho_pesquisa-lupa');
luga.addEventListener('click', pesquisarFilmes);

function pesquisarFilmes() {
  const searchTerm = inputPesquisa.value.trim();

  if (searchTerm !== '') {
    fetch(`https://filmfrenzy-api.onrender.com/search?query=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
          console.log('Resultado da busca:', data);
          const movies = data.results;
          let movieIds = [];
          let movieList = [];

          const exactMatch = movies.find(movie => movie.title === searchTerm);

          if (exactMatch) {
            movieIds.push(exactMatch.id);
            movieList.push(exactMatch);
          } else {
            movieIds = movies.map(movie => movie.id);
            movieList = movies;
          }

          InserirFilmesNaTela(movieList);
      })
      .catch(error => {
        console.error('Ocorreu um erro ao pesquisar filmes:', error);
      });
  } else {
    console.log('Nenhum termo de pesquisa foi inserido.');
  }
}

async function getFilmesFavoritos() {
  if (listaDeFavoritos.length === 0) {
    document.getElementById('filmes').innerHTML = '';
    document.querySelector('.card_lista-vazia').style.display = 'flex';
  }

  if (filtroAtivo.checked) {
    try {
      const filmes = [];
      for (const movieId of listaDeFavoritos) {
        const response = await fetch(`https://filmfrenzy-api.onrender.com/movie/${movieId}`);
        const movie = await response.json();
        filmes.push(movie);
      }
      InserirFilmesNaTela(filmes);
      document.querySelectorAll('.cards').forEach(elemento => {
        elemento.querySelector('.cards_parte2-checkbox').checked = true;
      });
    } catch (error) {
      console.error('Ocorreu um erro ao obter detalhes dos filmes:', error);
    }
  } else {
    document.querySelector('.card_lista-vazia').style.display = 'none';
    try {
      const response = await fetch('https://filmfrenzy-api.onrender.com/popular');
      const data = await response.json();
      const movies = data.results.slice(0, 10);
      InserirFilmesNaTela(movies);
    } catch (error) {
      console.error('Ocorreu um erro ao obter os filmes populares:', error);
    }
  }
}