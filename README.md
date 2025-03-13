<h1 align="center">Finder GIFs</h1>

Finder GIFs é um projeto simples que permite buscar e exibir GIFs usando a API do Giphy.

### Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- Fetch API (para consumir a API do Giphy)

### Como Usar

1. Clone este repositório:
```bash
git clone https://github.com/FerdiCayet/Finder-GIFs.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

4. O projeto será iniciado em `http://localhost:3002`.

5. Digite um termo de busca no campo de pesquisa e pressione o botão para exibir os GIFs relacionados.

### Configuração da API

Para utilizar a API do Giphy, crie um arquivo `.env` na raiz do projeto e adicione:

```bash
GIPHY_API_KEY=SUA_CHAVE_API_AQUI
```

Certifique-se de substituir `SUA_CHAVE_API_AQUI` pelo seu próprio token da API do Giphy, que pode ser obtido em [Giphy Developers](https://developers.giphy.com/).