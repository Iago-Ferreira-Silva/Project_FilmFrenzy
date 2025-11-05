import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir chamadas do seu front-end (CORS liberado para testes locais)
app.use(cors());

// Rota para obter filmes populares
app.get('/popular', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: process.env.API_KEY,
                language: 'pt-BR',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para pesquisar filmes
app.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Parâmetro de pesquisa ausente.' });
    }

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.API_KEY,
                language: 'pt-BR',
                query: query,
                page: 1,
                include_adult: false,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao pesquisar filmes:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para buscar detalhes de um filme pelo ID
app.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    if (!movieId) {
        return res.status(400).json({ error: 'ID do filme ausente.' });
    }

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: process.env.API_KEY,
                language: 'pt-BR',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar filme por ID:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota raiz: mensagem de boas-vindas
app.get('/', (req, res) => {
    res.send('🎬 FilmFrenzy API Proxy está online! Acesse /popular, /search ou /movie/:id');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});