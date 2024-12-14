export function setupEventListeners(startButton, startGame) {
  startButton.addEventListener('click', startGame);
}

export function updateBoardDisplay(board) {
  console.log('board', board);
}
