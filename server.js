require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

if (!process.env.GIPHY_API_KEY) throw new Error("GIPHY_API_KEY não está definido no .env");

app.post('/sendPost', async (req, res) => {
    const { search, offset } = req.body;

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(search)}&api_key=${process.env.GIPHY_API_KEY}&limit=10&offset=${offset}`);
        const data = await response.json();
        res.json({ message: data.data });
    } catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});