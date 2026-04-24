const createBoardBtn = document.getElementById('createBoardBtn');
const createBoardModal = document.getElementById('createBoardModal');
const boardNameInput = document.getElementById('boardNameInput');
const confirmCreateBtn = document.getElementById('confirmCreateBtn');
const cancelCreateBtn = document.getElementById('cancelCreateBtn');
const closeBtn = document.querySelector('.close');
const boardsContainer = document.getElementById('boardsContainer');

// Abrir modal
createBoardBtn.addEventListener('click', () => {
  createBoardModal.classList.add('show');
  boardNameInput.focus();
});

// Fechar modal
function closeModal() {
  createBoardModal.classList.remove('show');
  boardNameInput.value = '';
}

closeBtn.addEventListener('click', closeModal);
cancelCreateBtn.addEventListener('click', closeModal);

// Criar board
confirmCreateBtn.addEventListener('click', async () => {
  const boardName = boardNameInput.value.trim();
  
  if (!boardName) {
    alert('Please enter a board name');
    return;
  }

  try {
    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: boardName })
    });

    const board = await response.json();
    closeModal();
    
    // Redirecionar para o novo board
    window.location.href = `/board/${board.id}`;
  } catch (error) {
    console.error('Error creating board:', error);
    alert('Error creating board');
  }
});

// Carregar boards
async function loadBoards() {
  try {
    const response = await fetch('/api/boards');
    const boards = await response.json();
    
    boardsContainer.innerHTML = '';
    
    if (boards.length === 0) {
      boardsContainer.innerHTML = '<p style="grid-column: 1/-1; color: #999;">No boards yet. Create one to get started!</p>';
      return;
    }

    boards.forEach(board => {
      const boardCard = document.createElement('a');
      boardCard.href = `/board/${board.id}`;
      boardCard.className = 'board-card';
      boardCard.innerHTML = `
        <h3>${board.name}</h3>
        <p>Created: ${new Date(board.createdAt).toLocaleDateString()}</p>
      `;
      boardsContainer.appendChild(boardCard);
    });
  } catch (error) {
    console.error('Error loading boards:', error);
  }
}

// Fechar modal ao clicar fora
createBoardModal.addEventListener('click', (e) => {
  if (e.target === createBoardModal) {
    closeModal();
  }
});

// Permitir Enter para criar board
boardNameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    confirmCreateBtn.click();
  }
});

// Carregar boards ao iniciar
loadBoards();

// Recarregar boards a cada 5 segundos
setInterval(loadBoards, 5000);
