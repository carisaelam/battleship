import {
  createPlayers,
  placeComputerShips,
  placeHumanShips,
  takeHumanTurn,
  takeComputerTurn,
  takeTurn,
  handleGameFlow,
} from './modules/gameLogic';

import {
  updateBothBoardDisplays,
  updateConsoleDisplay,
} from './modules/domManipulation';
import { Gameboard } from './components/gameboard';

// DOM Elements
const startButton = document.querySelector('.start__button');

function startGame() {
  const [human, computer] = createPlayers();
  const humanBoard = human.gameboard.board;
  const computerBoard = computer.gameboard.board;

  placeHumanShips(human);
  placeComputerShips(computer);
  updateBothBoardDisplays(humanBoard, computerBoard);

  handleGameFlow(human, computer);
}

startButton.addEventListener('click', startGame);

// setupEventListeners(startButton, resetButton, startGame, resetGame);
