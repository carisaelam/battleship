import {
  createPlayers,
  placeComputerShips,
  placeHumanShips,
} from './modules/gameLogic';
import {
  setupEventListeners,
  updateBoardDisplay,
} from './modules/domManipulation';

// DOM Elements
const startButton = document.querySelector('.start__button');

// Event listeners
startButton.addEventListener('click', start);

function start() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
  updateBoardDisplay(player1.gameboard.board);
}

setupEventListeners(startButton, start);
