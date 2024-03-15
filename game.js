const board = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
function renderBoard() {
  const gameBoardElement = document.getElementById('gameBoard');
  gameBoardElement.innerHTML = '';
  board.forEach(row => {
    const rowElement = document.createElement('div');
    row.forEach(cell => {
      const cellElement = document.createElement('div');
      cellElement.textContent = cell;
      rowElement.appendChild(cellElement);
    });
    gameBoardElement.appendChild(rowElement);
  });
}
renderBoard();