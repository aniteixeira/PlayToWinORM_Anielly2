require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Usuario = require('./models/usuario');
const Jogo = require('./models/jogo');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para exibir o formulário de cadastro de jogo
app.get('/formJogo', (req, res) => {
  res.sendFile(__dirname + '/views/formJogo.html');
});

// Rota para cadastrar um jogo no banco de dados
app.post('/cadastrar-jogo', async (req, res) => {
  try {
    const { nome, desenvolvedora, ano_lancamento } = req.body;
    await Jogo.create({ nome, desenvolvedora, ano_lancamento });
    res.send('Jogo cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar jogo: ' + error.message);
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  // Sincronizar os modelos com o banco de dados
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados');
  } catch (error) {
    console.error('Erro ao sincronizar modelos:', error);
  }
});
