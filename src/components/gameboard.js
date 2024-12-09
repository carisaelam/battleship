import { Ship } from '/src/components/ship.js';

export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.buildBoard(this.size);
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

    // console.log('placeShip board', this.board);
    return this.board;
  }

  #validateOccupied(ship, x, y, direction) {
    console.log('running validateOccupied');
    let size = ship.length;

    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        if (this.board[x][y + i] !== null) {
          console.error(`Ship already in [${x}][${y + i}]`);
          throw new Error(`Ship already in ${x}${y + i}`);
        }
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        if (this.board[x + i][y] !== null) {
          console.error(`Ship already in [${x + i}][${y}]`);
          throw new Error(`Ship already in ${x + i}${y}`);
        }
      }
    }
  }

  #validateSpace(ship, x, y, direction) {
    console.log('running validate space');
    let shipSize = ship.length;

    if (direction === 'horizontal') {
      if (y + shipSize > this.size) {
        console.error('Board not wide enough');
        throw new Error('Board not wide enough');
      }
    } else if (direction === 'vertical') {
      if (x + shipSize > this.size) {
        console.error('Board not tall enough');
        throw new Error('Board not tall enough');
      }
    }
  }
}
