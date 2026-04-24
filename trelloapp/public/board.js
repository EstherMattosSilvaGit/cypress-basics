const boardTitle = document.getElementById('boardTitle');

// Obter ID do board da URL
function getBoardIdFromUrl() {
  const path = window.location.pathname;
  const match = path.match(/\/board\/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

// Carregar informações do board
async function loadBoard() {
  const boardId = getBoardIdFromUrl();
  
  if (!boardId) {
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch(`/api/boards/${boardId}`);
    
    if (!response.ok) {
      window.location.href = '/';
      return;
    }

    const board = await response.json();
    boardTitle.textContent = board.name;
  } catch (error) {
    console.error('Error loading board:', error);
    window.location.href = '/';
  }
}

// Inicializar
loadBoard();
