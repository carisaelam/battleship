// Handle game mechanics (ship placement, turns, attack handling, etc.)

import { Player } from '../components/player';
import { Ship } from '../components/ship';
import { Gameboard } from '../components/gameboard';
import {
  updateBothBoardDisplays,
  updateComputerBoardDisplay,
} from './domManipulation';

export function createPlayers() {
  const player1 = new Player('HUMAN', 'real');
  const player2 = new Player('COMPUTER');

  // console.log('Players created.');
  // console.log('player1', player1);
  // console.log('player1 board', player1.gameboard.board);
  // console.log('player2 ', player2);
  // console.log('player2 board', player2.gameboard.board);

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
  console.log('takeComputerTurn: human, computer', human, computer);
  takeTurn(computer, human, false);
}

export function attackCell(x, y, attacker, defender) {
  console.log(`Attacking cell ${x}, ${y}`);
  console.log(`Attacker (player): `, attacker);
  console.log(`Defender (opponent): `, defender);
  defender.gameboard.board[x][y].attacked = true;

  console.log('Updated defender board cell: ', defender.gameboard.board[x][y]);
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

export function takeTurn(player, opponent, isHumanTurn) {
  console.log(
    'takeTurn: player, opponent, isHuman',
    player,
    opponent,
    isHumanTurn
  );
  if (isHumanTurn) {
    document.querySelector('.opponent__container').addEventListener(
      'click',
      (e) => {
        humanClickHandler(e, player, opponent, isHumanTurn);
        if (checkWinCondition(player, opponent)) return;
        isHumanTurn = false;
        setTimeout(() => {
          takeComputerTurn(opponent, player);
        }, 500);
      },
      { once: true }
    );
  } else {
    computerMove(player, opponent);
    isHumanTurn = true;
  }
}

export function handleGameFlow(human, computer) {
  let isHumanTurn = true;

  console.log('handleGameFlow: Game started. Human goes first. ');

  function nextTurn(currentPlayer, opponent, isHumanTurn) {
    console.log(
      'next Turn starting (currentPlayer, opponent, isHumanTurn): ',
      currentPlayer,
      opponent,
      isHumanTurn
    );
    if (isHumanTurn) {
      document.querySelector('.opponent__container').addEventListener(
        'click',
        (e) => {
          humanClickHandler(e, currentPlayer, opponent, isHumanTurn);
          if (checkWinCondition(currentPlayer, opponent)) return;
          isHumanTurn = false;
          setTimeout(() => {
            console.log(
              'inside setTimeout in handleGameFlow, isHumanTurn',
              isHumanTurn
            );
            takeComputerTurn(human, computer);
            isHumanTurn = true;
            nextTurn(computer, human, isHumanTurn);
          }, 500);
        },
        { once: true }
      );
    } else {
      computerMove(currentPlayer, opponent);
      isHumanTurn = true;
      nextTurn(currentPlayer, opponent, isHumanTurn);
    }
  }

  nextTurn(human, computer, isHumanTurn);
}

function humanClickHandler(e, human, computer, isHumanTurn) {
  console.log(
    'humanClickHandler(human, computer, isHumanTurn)',
    human,
    computer,
    isHumanTurn
  );
  const cellElement = e.target;

  if (cellElement.classList.contains('gameboard__cell')) {
    const x = Number(cellElement.getAttribute('data-row'));
    const y = Number(cellElement.getAttribute('data-col'));

    try {
      console.log(`${human.name} attacking cell: `, x, y);
      const attack = computer.gameboard.receiveAttack(x, y);
      console.log(`${human.name} attacked ${x}, ${y} ==> ${attack.result}`);
      attackCell(x, y, human, computer);
      updateBothBoardDisplays(human.gameboard.board, computer.gameboard.board)

      if (checkWinCondition(human, computer)) return;
      isHumanTurn = false;
      console.log('ending humanClickHandler');
    } catch (error) {
      console.error('Invalid attack: ', error);
    }
  }
}

function computerMove(computer, human) {
  console.log('computerMove: computer, human', computer, human);
  let validCoordinates = false;

  while (!validCoordinates) {
    const x = randomNumber(computer.gameboard.size);
    const y = randomNumber(computer.gameboard.size);

    if (!computer.guesses.some((coord) => coord.x === x && coord.y === y)) {
      computer.guesses.push({ x, y });
    }

    try {
      const attack = human.gameboard.receiveAttack(x, y);
      validCoordinates = true;
      console.log(`${computer.name} guessed ${x}, ${y} ==> ${attack.result}`);
      attackCell(x, y, computer, human);
      updateBothBoardDisplays(human.gameboard.board, computer.gameboard.board)

      if (checkWinCondition(computer, human)) return;
    } catch (error) {
      console.error('Error attacking: ', error);
    }
  }
}

function checkWinCondition(player, opponent) {
  const opponentAllSunk = opponent.gameboard.checkForAllSunk();
  if (opponentAllSunk) {
    alert(`${player.name} wins!`);
    return true;
  }
  return false;
}
