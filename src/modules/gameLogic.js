// Handle game mechanics (ship placement, turns, attack handling, etc.)

import { Player } from '../components/player';
import { Ship } from '../components/ship';
import { Gameboard } from '../components/gameboard';
import { updateOpponentBoardDisplay } from './domManipulation';

export function createPlayers() {
  const player1 = new Player('HUMAN', 'real');
  const player2 = new Player('COMPUTER');

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

export function attackCell(x, y, player) {
  player.gameboard.board[x][y].attacked = true;
  updateOpponentBoardDisplay(player.gameboard.board);
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
  if (isHuman) {
    const opponentBoardContainer = document.querySelector(
      '.opponent__container'
    );
    opponentBoardContainer.addEventListener(
      'click',
      function handleClick(e) {
        const cellElement = e.target;

        if (cellElement.classList.contains('gameboard__cell')) {
          const x = Number(cellElement.getAttribute('data-row'));
          const y = Number(cellElement.getAttribute('data-col'));

          try {
            console.log('attempting to attack cell: ', x, y);
            const attack = opponent.gameboard.receiveAttack(x, y);
            console.log(
              `${player.name} attacked ${x}, ${y} --> ${attack.result}`
            );
            attackCell(x, y, opponent);

            opponentBoardContainer.removeEventListener('click', handleClick);
          } catch (error) {
            console.error('Invalid attack: ', error);
          }
        }
      },
      { once: true }
    );
  } else {
    let validCoordinates = false;

    while (!validCoordinates) {
      const x = randomNumber(player.gameboard.size);
      const y = randomNumber(player.gameboard.size);
      if (!opponent.guesses.some((coord) => coord.x === x && coord.y === y)) {
        opponent.guesses.push({ x, y });
      }

      try {
        const attack = opponent.gameboard.receiveAttack(x, y);
        validCoordinates = true;
        console.log(`${player.name} guessed ${x}, ${y} —> ${attack.result}`);
        attackCell(x, y, opponent);
      } catch (error) {
        console.error('Error attacking: ', error);
      }
    }
  }
}
