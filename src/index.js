import {
  createPlayers,
  placeComputerShips,
  placeHumanShips,
} from './modules/gameLogic';

// DOM Elements
const startButton = document.querySelector('.start__button');

function startGame() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
  console.log('Game started');
}

startGame();

// setupEventListeners(startButton, resetButton, startGame, resetGame);
