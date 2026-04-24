const express = require('express');
const path = require('path');
const app = express();

// Configurar middleware - ordem importa!
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let boards = [];
let boardCounter = 1;

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para board específico
app.get('/board/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'board.html'));
});

// API para criar board
app.post('/api/boards', (req, res) => {
  const board = {
    id: boardCounter++,
    name: req.body.name || `Board ${boardCounter}`,
    createdAt: new Date()
  };
  boards.push(board);
  res.json(board);
});

// API para listar boards
app.get('/api/boards', (req, res) => {
  res.json(boards);
});

// API para obter board específico
app.get('/api/boards/:id', (req, res) => {
  const board = boards.find(b => b.id === parseInt(req.params.id));
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ error: 'Board not found' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Trello App rodando em http://localhost:${PORT}`);
});
