export function setupEventListeners(
  startButton,
  resetButton,
  startGame,
  resetGame
) {
  startButton.addEventListener('click', startGame);
  resetButton.addEventListener('click', resetGame);
}

const humanBoardContainer = document.querySelector('.human__container');

const computerBoardContainer = document.querySelector('.computer__container');

export function updateBothBoardDisplays(humanBoard, computerBoard) {
  updateHumanBoardDisplay(humanBoard);
  updateComputerBoardDisplay(computerBoard);
}

function updateHumanBoardDisplay(board, isHumanTurn) {
  humanBoardContainer.innerHTML = '';

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gameboard__grid');
  gridContainer.style.gridTemplateColumns = `repeat(${board[0].length}, 2rem)`;

  const fragment = document.createDocumentFragment(); // ease DOM repaints
  const playerHeader = document.createElement('h2');

  board.forEach((row, rowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('gameboard__row');

    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gameboard__cell');

      let cellContent = '';

      if (cell !== null) {
        const { ship, hit } = cell;
        console.log('cell', cell);

        if (ship === null) {
          if (cell.attacked) {
            cellContent = '🔲';
          } else {
            cellContent = '[ ]';
          }
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

  playerHeader.textContent = ``;
  gridContainer.appendChild(fragment);
  humanBoardContainer.appendChild(playerHeader);
  humanBoardContainer.appendChild(gridContainer);
}

export function updateComputerBoardDisplay(board) {
  console.log('updateComputerBoard running');
  computerBoardContainer.innerHTML = '';

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
      console.log('cellOnBoard, ', cellOnBoard.ship);

      if (cellOnBoard.attacked === true) {
        if (cellOnBoard.hit === true) {
          cellElement.textContent = '🎯';
        } else {
          cellElement.textContent = '🔲';
        }
      }

      if (cellOnBoard.ship && cellOnBoard.ship.sunkStatus) {
        cellElement.textContent = '☠️'
      }


      rowElement.appendChild(cellElement);
    });

    fragment.appendChild(rowElement);
  });

  gridContainer.appendChild(fragment);
  computerBoardContainer.appendChild(gridContainer);
}
