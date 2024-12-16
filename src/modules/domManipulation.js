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

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gameboard__grid');
  gridContainer.style.gridTemplateColumns = `repeat(${board[0].length}, 2rem)`;

  const fragment = document.createDocumentFragment(); // ease DOM repaints

  board.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('gameboard__row');

    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gameboard__cell');

      let cellContent = '';

      if (cell !== null) {
        const { ship, hit } = cell;

        if (ship === null) {
          cellContent = '[ ]';
        } else {
          if (ship.isSunk()) {
            cellContent = '☠️';
          } else if (hit) {
            cellContent = '🎯';
          } else {
            cellContent = '🚢';
          }
        }
      }

      cellElement.textContent = cellContent;
      cellElement.setAttribute('data-row', rowIndex);
      cellElement.setAttribute('data-col', colIndex);

      rowElement.appendChild(cellElement);
    });

    fragment.appendChild(rowElement);
  });

  gridContainer.appendChild(fragment);
  gameboardContainer.appendChild(gridContainer);
}

gameboardContainer.addEventListener('click', (e) => {
  const cellElement = e.target;

  if (cellElement.classList.contains('gameboard__cell')) {
    const row = Number(cellElement.getAttribute('data-row'));
    const col = Number(cellElement.getAttribute('data-col'));

    console.log(`Clicked on ${row}, ${col}`);
  }
});
