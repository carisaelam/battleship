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


function startGame() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
  updateBoardDisplay(player1.gameboard.board);

//   while (!player2.gameboard.checkForAllSunk()) {
//     takeHumanTurn(player1, player2);
//     takeComputerTurn(player1, player2);
//   }
}

setupEventListeners(startButton, startGame);
