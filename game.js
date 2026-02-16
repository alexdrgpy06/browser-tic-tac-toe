/**
 * Author: Alejandro Ramírez
 * 
 * Tic Tac Toe Game Logic
 * Implements a clean, state-driven engine for the classic game.
 * Optimized for real-time DOM updates and win-condition validation.
 */

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

let boardState = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (boardState[index] !== null || !gameActive) return;

    updateCell(cell, index);
    validateResult();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function validateResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `PLAYER ${currentPlayer} DOMINANCE DETECTED`;
        statusElement.classList.add('winner');
        gameActive = false;
        return;
    }

    if (!boardState.includes(null)) {
        statusElement.textContent = "SYSTEM STALEMATE: DRAW";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `AWAITING INPUT: PLAYER ${currentPlayer}`;
}

function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = "AWAITING INPUT: PLAYER X";
    statusElement.classList.remove('winner');
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Initial State
statusElement.textContent = "AWAITING INPUT: PLAYER X";
