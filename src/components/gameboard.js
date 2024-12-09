import { Ship } from '/src/components/ship.js';

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.buildBoard(this.size);
    this.missedShots = [];
  }

  buildBoard(size) {
    let board = [];

    for (let row = 0; row < size; row++) {
      board.push(Array(size).fill(null));
    }
    return board;
  }

  getBoard() {
    // console.log(this.board);
    return this.board;
  }

  placeShip(ship, x, y, direction) {
    let size = ship.length;

    this.#validateSpace(ship, x, y, direction);
    this.#validateOccupied(ship, x, y, direction);

    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        this.board[x][y + i] = ship;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        this.board[x + i][y] = ship;
      }
    }

    return this.board;
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error('Attack coordinates out of bounds');
    }

    if (this.board[x][y] !== null) {
      let hitShip = this.board[x][y];
      console.log('hitShip', hitShip);
      hitShip.hit();
      return { result: 'hit', ship: hitShip };
    }

    this.missedShots.push([x, y]);
    return { result: 'miss', coordinates: [x, y] };
  }

  #validateOccupied(ship, x, y, direction) {
    let size = ship.length;

    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        if (this.board[x][y + i] !== null) {
          throw new Error(`Ship already in ${x}${y + i}`);
        }
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        if (this.board[x + i][y] !== null) {
          throw new Error(`Ship already in ${x + i}${y}`);
        }
      }
    }
  }

  #validateSpace(ship, x, y, direction) {
    let shipSize = ship.length;

    if (direction === 'horizontal') {
      if (y + shipSize > this.size) {
        throw new Error('Board not wide enough');
      }
    } else if (direction === 'vertical') {
      if (x + shipSize > this.size) {
        throw new Error('Board not tall enough');
      }
    }
  }
}
