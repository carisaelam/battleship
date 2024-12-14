export function setupEventListeners(startButton, startGame) {
  startButton.addEventListener('click', startGame);
}

const gameboardContainer = document.querySelector('.gameboard__container');

export function updateBoardDisplay(board) {
  console.log('updateBoardDisplay running');

  gameboardContainer.innerHTML = '';

  board.forEach((row) => {
    let rowHTML = '';

    row.forEach((cell) => {
      if (cell !== null) {
        let ship = cell;
        if (ship.isSunk()) {
          rowHTML += '☠️ ';
        } else {
          rowHTML += `🚢 `;
        }
      } else {
        rowHTML += `🔲 `;
      }
    });

    let rowElement = document.createElement('p');
    rowElement.textContent = rowHTML;
    gameboardContainer.appendChild(rowElement);
  });
}
