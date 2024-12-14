import {
  createPlayers,
  placeComputerShips,
  placeHumanShips,
  takeHumanTurn,
  takeComputerTurn,
} from './modules/gameLogic';
import {
  setupEventListeners,
  updateBoardDisplay,
} from './modules/domManipulation';

// DOM Elements
const startButton = document.querySelector('.start__button');
const resetButton = document.querySelector('.reset__button');

function resetGame() {
  document.querySelector('.gameboard__container').innerHTML = '';
  console.log('Game reset');
}

function startGame() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
  updateBoardDisplay(player1.gameboard.board);

  let gameInterval = setInterval(() => {
    if (player1.gameboard.checkForAllSunk()) {
      clearInterval(gameInterval);
      console.log(`GAME OVER. ${player2.name} wins!`);
      return;
    }

    takeHumanTurn(player1, player2);
    updateBoardDisplay(player1.gameboard.board);

    if (player2.gameboard.checkForAllSunk()) {
      clearInterval(gameInterval);
      console.log(`GAME OVER. ${player1.name} wins!`);
      return;
    }

    takeComputerTurn(player1, player2);
    updateBoardDisplay(player1.gameboard.board);
  }, 1000);
}

setupEventListeners(startButton, resetButton, startGame, resetGame);
