import { Player } from './components/player';
import { Ship } from './components/ship';

// DOM Elements
const startButton = document.querySelector('.start__button');

// Event listeners
startButton.addEventListener('click', start);

function start() {
  let [player1, player2] = createPlayers();
  placeHumanShips(player1);
  placeComputerShips(player2);
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

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

function randomDirection() {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical';
}

function placeComputerShips(player) {
  const ships = [
    new Ship(5, 'carrier'),
    new Ship(4, 'battleship'),
    new Ship(3, 'cruiser'),
    new Ship(3, 'submarine'),
    new Ship(2, 'destroyer'),
  ];

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      try {
        const x = randomNumber(player.gameboard.size);
        const y = randomNumber(player.gameboard.size);
        const direction = randomDirection();

        player.gameboard.placeShip(ship, x, y, direction);

        placed = true;
        console.log(`${ship.type} placed at (${x}, ${y}) ${direction}ly`);
      } catch (error) {
        console.error(`Error placing ${ship.type}: `, error);
      }
    }
  });

  console.log(`${player.name} gameboard`, player.gameboard.board);
  return player.gameboard.board;
}

function placeHumanShips(player) {
  const ships = [
    new Ship(5, 'carrier'),
    new Ship(4, 'battleship'),
    new Ship(3, 'cruiser'),
    new Ship(3, 'submarine'),
    new Ship(2, 'destroyer'),
  ];

  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      try {
        const x = Number(prompt(`X coord for ${ship.type}`));
        const y = Number(prompt(`Y coord for ${ship.type}`));
        const direction = prompt(
          `Direction for ${ship.type} ('horizontal' or 'vertical'):`
        ).toLowerCase();

        if (direction !== 'horizontal' && direction !== 'vertical') {
          throw new Error('Invalid direction!');
        }
        player.gameboard.placeShip(ship, x, y, direction);
        placed = true;
        console.log(`${ship.type} placed at (${x}, ${y}) ${direction}ly`);
      } catch (error) {
        console.error(`Error placing ${ship.type}: `, error);
        alert(error.message);
      }
    }
  });

  console.log(`${player.name} gameboard`, player.gameboard.board);
  return player.gameboard.board;
}
