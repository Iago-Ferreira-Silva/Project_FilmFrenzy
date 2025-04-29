# Projeto FilmFrenzy

## Descrição:
Bem-vindo ao **FilmFrenzy** 🤩, o seu guia definitivo para explorar o mundo do cinema! 🎬

Neste catálogo de filmes, você encontrará informações detalhadas sobre os filmes mais populares e poderá pesquisar seus filmes favoritos 📽.  
O FilmFrenzy utiliza a API do **The Movie Database (TMDB)** de forma segura, através de um servidor **Node.js** que protege a chave da API 🔒.

## Características:
- ✅ Listagem dos 10 filmes mais populares no momento!
- 🔍 Busca de filmes por título.
- ⭐ Adicionar e remover filmes da lista de favoritos.
- 📱 Navegação intuitiva e design responsivo para uma ótima experiência em qualquer dispositivo.
- 🔒 Proteção da API key através de um servidor proxy em Node.js.
- 📈 Atualizações automáticas dos dados dos filmes, utilizando integração com a TMDB API.

## Tecnologias Utilizadas:
- JavaScript (Front-end) 📝
- HTML5 📄
- CSS3 💻
- Node.js (Back-end - servidor proxy) ⚙️
- Express.js
- Axios
- dotenv
- CORS
- API do The Movie Database (TMDB) 📊

## API Utilizada:
- [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

## Link do meu Projeto:
[https://iago-ferreira-silva.github.io/Project_FilmFrenzy/](https://iago-ferreira-silva.github.io/Project_FilmFrenzy/)

⚠️ **Nota:** A versão online pode apresentar limitações caso o servidor Node.js não esteja hospedado publicamente (necessário deploy do servidor para busca funcionar fora do localhost).

---

## Como rodar localmente:

1. Clone este repositório:
```bash
git clone https://github.com/Iago-Ferreira-Silva/Project_FilmFrenzy.git

2. Instale as dependências do servidor:
cd tmdb-proxy-server
npm install

3. Crie um arquivo .env na raiz do tmdb-proxy-server com sua chave da TMDB:
API_KEY=sua_chave_aqui

4. Inicie o servidor proxy:
npm start

5. Abra o arquivo index.html no navegador ou utilize a extensão "Live Server".