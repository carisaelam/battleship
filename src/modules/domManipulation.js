export function setupEventListeners(startButton, startGame) {
  startButton.addEventListener('click', startGame);
}

const gameboardContainer = document.querySelector('.gameboard__container');

export function updateBoardDisplay(board) {
  console.log('updateBoardDisplay running');

  let boardHTML = '';

  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== null) {
        boardHTML += `SHIP `;
      } else {
        boardHTML += `NULL `;
      }
    });
    boardHTML += '<br></br>'
  });

  gameboardContainer.innerHTML = boardHTML;
}
