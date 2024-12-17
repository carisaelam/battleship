import { getInformationAboutCell } from './gameLogic';

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

const opponentBoardContainer = document.querySelector('.opponent__container');

export function updatePlayerBoardDisplay(board) {
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

export function updateOpponentBoardDisplay(board) {
  console.log('running updateOpponent with board: ', board);
  opponentBoardContainer.innerHTML = '';

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gameboard__grid');
  gridContainer.style.gridTemplateColumns = `repeat(${board[0].length}, 2rem)`;

  const fragment = document.createDocumentFragment();

  board.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('gameboard__row');

    row.forEach((cell, colIndex) => {
      if (cell.attacked) {
        console.log(`Cell ${rowIndex}, ${colIndex} marked as attacked`);
      }
      const cellElement = document.createElement('div');
      cellElement.classList.add('gameboard__cell');

      cellElement.textContent = '[ ]';

      cellElement.setAttribute('data-row', rowIndex);
      cellElement.setAttribute('data-col', colIndex);

      const cellOnBoard = board[rowIndex][colIndex];

      if (cellOnBoard.attacked === true) {
        if (cellOnBoard.hit === true) {
          cellElement.textContent = '🎯';
        } else {
          cellElement.textContent = '🔲';
        }
      }

      console.log(cellOnBoard);

      rowElement.appendChild(cellElement);
    });

    fragment.appendChild(rowElement);
  });

  gridContainer.appendChild(fragment);
  opponentBoardContainer.appendChild(gridContainer);
}
