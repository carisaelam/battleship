import {
  createPlayers,
  placeComputerShips,
  placeHumanShips,
  takeHumanTurn, 
  takeComputerTurn, 
} from './modules/gameLogic';

import { updatePlayerBoardDisplay, updateOpponentBoardDisplay } from './modules/domManipulation';

// DOM Elements
const startButton = document.querySelector('.start__button');

function startGame() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
  console.log('Game started');
  updatePlayerBoardDisplay(player1.gameboard.board)
  updateOpponentBoardDisplay(player2.gameboard.board)
  takeHumanTurn(player1, player2)
  takeComputerTurn(player1, player2)
  updatePlayerBoardDisplay(player1.gameboard.board)
  updateOpponentBoardDisplay(player2.gameboard.board)
}

startGame();

// setupEventListeners(startButton, resetButton, startGame, resetGame);
