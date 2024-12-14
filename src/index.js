import { Player } from './components/player';
import { Ship } from './components/ship';

// DOM Elements
const startButton = document.querySelector('.start__button');

// Event listeners
startButton.addEventListener('click', start);

function start() {
  let [player1, player2] = createPlayers();
  placeShips(player1);
}

function createPlayers() {
  let name = prompt('Player 1, what is your name? ');
  const player1 = new Player(name, 'real');
  const player2 = new Player();

  console.log('Players created.');
  console.log('player1', player1);
  console.log('player1 board', player1.gameboard.board);
  console.log('player2 ', player2);
  console.log('player2 board', player2.gameboard.board);

  return [player1, player2];
}

function placeShips(player) {
  console.log('starting placeShips. player: ', player);
  console.log('player board:', player.gameboard);
  const ships = [
    new Ship(5, 'carrier'),
    new Ship(4, 'battleship'),
    new Ship(3, 'cruiser'),
    new Ship(3, 'submarine'),
    new Ship(2, 'destroyer'),
  ];
  ships.forEach((ship) => {
    let x = Number(prompt(`X coord for ${ship.type}`));
    let y = Number(prompt(`Y coord for ${ship.type}`));
    return player.gameboard.placeShip(ship, x, y, 'horizontal');
  });

  console.log(player.gameboard.board);
}
