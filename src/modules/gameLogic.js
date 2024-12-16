// Handle game mechanics (ship placement, turns, attack handling, etc.)

import { Player } from '../components/player';
import { Ship } from '../components/ship';
import { Gameboard } from '../components/gameboard';

export function createPlayers() {
  const player1 = new Player('Player1', 'real');
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
    // new Ship(5, 'carrier'),
    // new Ship(4, 'battleship'),
    // new Ship(3, 'cruiser'),
    new Ship(3, 'submarine'),
    new Ship(2, 'destroyer'),
  ];

  randomlyPlaceShips(player, ships);
}

export function placeHumanShips(player) {
  const ships = [
    // new Ship(5, 'carrier'),
    // new Ship(4, 'battleship'),
    // new Ship(3, 'cruiser'),
    new Ship(3, 'submarine'),
    new Ship(2, 'destroyer'),
  ];

  randomlyPlaceShips(player, ships);
}

export function takeHumanTurn(human, computer) {
  takeTurn(human, computer, true);
}

export function takeComputerTurn(human, computer) {
  takeTurn(computer, human, false);
}

function randomlyPlaceShips(player, ships) {
  ships.forEach((ship) => {
    let placed = false;

    while (!placed) {
      const x = randomNumber(player.gameboard.size);
      const y = randomNumber(player.gameboard.size);
      const direction = randomDirection();

      try {
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

  console.log(`${player.name}'s gameboard`, player.gameboard.board);
}

function takeTurn(player, opponent, isHuman) {
  let validCoordinates = false;

  while (!validCoordinates) {
    let x, y;

    if (isHuman) {
      x = Number(prompt('Attack on x: '));
      y = Number(prompt('Attack on y: '));
    } else {
      do {
        x = randomNumber(player.gameboard.size);
        y = randomNumber(player.gameboard.size);
      } while (
        opponent.guesses.some((coord) => coord.x === x && coord.y === y)
      );

      opponent.guesses.push({ x, y });
    }

    try {
      const attack = opponent.gameboard.receiveAttack(x, y);
      validCoordinates = true;
      console.log(`${player.name} guessed ${x}, ${y} —> ${attack.result}`);
      
    } catch (error) {
      console.error('Error attacking: ', error);
    }
  }
}
