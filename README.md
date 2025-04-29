# 🎬 Projeto FilmFrenzy

## 📖 Descrição

Bem-vindo ao **FilmFrenzy** 🤩, o seu guia definitivo para explorar o mundo do cinema! 🎬

Neste catálogo de filmes, você encontrará informações detalhadas sobre os filmes mais populares e poderá pesquisar seus favoritos 📽.  
O FilmFrenzy utiliza a API do **The Movie Database (TMDB)** de forma segura, através de um servidor **Node.js** hospedado na nuvem que protege a chave da API 🔒.

---

## ✨ Funcionalidades

- ✅ Listagem dos 10 filmes mais populares
- 🔍 Busca de filmes por título
- ⭐ Adicionar e remover filmes da lista de favoritos
- 📱 Design responsivo para todos os dispositivos
- 🔒 API Key protegida via servidor proxy
- 🌐 Back-end e front-end totalmente hospedados online

---

## 🛠 Tecnologias Utilizadas

### Front-end
- JavaScript
- HTML5
- CSS3

### Back-end (proxy)
- Node.js
- Express.js
- Axios
- dotenv
- CORS

---

## 🎥 API Utilizada

- [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

---

## 🌐 Projeto Online

### 🔗 Front-end (GitHub Pages)
https://iago-ferreira-silva.github.io/Project_FilmFrenzy/

### 🔗 Back-end (Render)
https://filmfrenzy-api.onrender.com

A API Proxy está online e protegida. Acesse diretamente qualquer uma das rotas abaixo para testar:

#### 🔁 Rotas públicas disponíveis:

- `/` → Mensagem amigável confirmando que a API está no ar  
  👉 https://filmfrenzy-api.onrender.com/

- `/popular` → Lista os filmes populares  
  👉 https://filmfrenzy-api.onrender.com/popular

- `/search?query=batman` → Busca filmes por título  
  👉 https://filmfrenzy-api.onrender.com/search?query=batman

- `/movie/:id` → Detalhes de um filme por ID  
  👉 https://filmfrenzy-api.onrender.com/movie/123

---

## ⚠️ Observação

Você **não precisa rodar o servidor localmente** para testar o projeto.  
O front-end hospedado no GitHub Pages já se comunica diretamente com o back-end online hospedado no Render.  
✅ Basta acessar o link acima e usar!

---

## 🧪 Como rodar localmente (opcional)

Se quiser testar o servidor localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/Iago-Ferreira-Silva/Project_FilmFrenzy.git

# 2. Acesse a pasta do servidor
cd tmdb-proxy-server

# 3. Instale as dependências
npm install

# 4. Crie o arquivo .env com sua chave TMDB
echo "API_KEY=sua_chave_tmdb" > .env

# 5. Inicie o servidor local
npm start