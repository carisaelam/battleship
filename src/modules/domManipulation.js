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
  gridContainer.style.gridTemplateColumns = `repeat(${board[0].length + 1}, 2rem)`;

  const colLabels = document.createElement('div');
  colLabels.classList.add('col__labels');
  colLabels.style.gridTemplateColumns = `repeat(${board[0].length + 1}, 2rem)`;

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const fragment = document.createDocumentFragment();

  const blankColLabel = document.createElement('div');
  blankColLabel.textContent = '  ';

  colLabels.appendChild(blankColLabel);

  board.forEach((row, rowIndex) => {
    const colLabel = document.createElement('div');

    colLabel.textContent = rowIndex + 1;

    colLabels.appendChild(colLabel);

    const rowElement = document.createElement('div');
    rowElement.classList.add('gameboard__row');

    const rowLabel = document.createElement('div');
    rowLabel.classList.add('row__label');

    rowLabel.textContent = alphabet[rowIndex];

    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gameboard__cell');

      let cellContent = '';

      if (cell !== null) {
        const { ship, hit } = cell;

        if (ship === null) {
          if (cell.attacked) {
            cellContent = '🔲';
          } else {
            cellContent = '  ';
          }
        } else {
          if (ship.sunkStatus === true) {
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

    fragment.appendChild(rowLabel);
    fragment.appendChild(rowElement);
  });

  gridContainer.appendChild(fragment);
  humanBoardContainer.appendChild(colLabels);
  humanBoardContainer.appendChild(gridContainer);
}

export function updateComputerBoardDisplay(board) {
  computerBoardContainer.innerHTML = '';

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('gameboard__grid');
  gridContainer.style.gridTemplateColumns = `repeat(${board[0].length + 1}, 2rem)`;

  const colLabels = document.createElement('div');
  colLabels.classList.add('col__labels');
  colLabels.style.gridTemplateColumns = `repeat(${board[0].length + 1}, 2rem)`;

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const fragment = document.createDocumentFragment();

  const blankColLabel = document.createElement('div');
  blankColLabel.textContent = '  ';

  colLabels.appendChild(blankColLabel);

  board.forEach((row, rowIndex) => {
    const colLabel = document.createElement('div');

    colLabel.textContent = rowIndex + 1;

    colLabels.appendChild(colLabel);

    const rowElement = document.createElement('div');
    rowElement.classList.add('gameboard__row');

    const rowLabel = document.createElement('div');
    rowLabel.classList.add('row__label');

    rowLabel.textContent = alphabet[rowIndex];

    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('gameboard__cell');

      cellElement.textContent = '  ';

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

      if (cellOnBoard.ship && cellOnBoard.ship.sunkStatus) {
        cellElement.textContent = '☠️';
      }

      rowElement.appendChild(cellElement);
    });

    fragment.appendChild(rowLabel);
    fragment.appendChild(rowElement);
  });

  gridContainer.appendChild(fragment);
  computerBoardContainer.appendChild(colLabels);
  computerBoardContainer.appendChild(gridContainer);
}
