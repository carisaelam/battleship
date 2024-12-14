// Handle game mechanics (ship placement, turns, attack handling, etc.)

import { Player } from '../components/player';
import { Ship } from '../components/ship';
import { Gameboard } from '../components/gameboard';

export function createPlayers() {
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

export function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

export function randomDirection() {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical';
}

export function placeComputerShips(player) {
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
        console.log(
          `${player.name}'s ${ship.type} placed at (${x}, ${y}) ${direction}ly`
        );
      } catch (error) {
        console.error(`Error placing ${ship.type}: `, error);
      }
    }
  });

  console.log(`${player.name} gameboard`, player.gameboard.board);
  return player.gameboard.board;
}

export function placeHumanShips(player) {
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

export function takeHumanTurn(human, computer) {
  let validCoordinates = false;

  while (!validCoordinates) {
    try {
      let x = Number(prompt('Attack on x: '));
      let y = Number(prompt('Attack on y: '));

      computer.gameboard.receiveAttack(x, y);
      validCoordinates = true;
      console.log(`${human.name} guessed ${x}, ${y}`);
    } catch (error) {
      console.error('Error attacking: ', error);
    }
  }
}

export function takeComputerTurn(human, computer) {
  let validCoordinates = false;

  while (!validCoordinates) {
    try {
      let x = randomNumber(human.gameboard.size);
      let y = randomNumber(human.gameboard.size);

      human.gameboard.receiveAttack(x, y);
      validCoordinates = true;
      console.log(`${computer.name} guessed ${x}, ${y}`);
    } catch (error) {
      console.error('Error attacking: ', error);
    }
  }
}
