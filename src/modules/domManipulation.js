export function setupEventListeners(
  startButton,
  resetButton,
  startGame,
  resetGame
) {
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
}

const gameboardContainer = document.querySelector('.gameboard__container');

export function updateBoardDisplay(board) {
  gameboardContainer.innerHTML = '';

  board.forEach((row) => {
    let rowHTML = '';

    row.forEach((cell) => {
      if (cell !== null) {
        if (cell.ship === null) {
          rowHTML += `🔲 `;
        } else {
          let ship = cell.ship;
          let hit = cell.hit;
          if (ship.isSunk()) {
            rowHTML += '☠️ ';
          } else if (hit === true) {
            rowHTML += '🎯 ';
          } else {
            rowHTML += `🚢 `;
          }
        }
      }
    });

    let rowElement = document.createElement('p');
    rowElement.textContent = rowHTML;
    gameboardContainer.appendChild(rowElement);
  });
}
