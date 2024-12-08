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
    console.log(this.board);
    return this.board;
  }

  placeShip(ship, x, y, direction) {
    let size = ship.length;

    if (direction === 'horizontal') {
      this.board[x][y] = ship;
      for (let i = 1; i < size + 1; i++) {
        this.board[x][y + i] = ship;
      }
    }

    if (direction === 'vertical') {
      this.board[x][y] = ship;
      for (let i = 1; i < size + 1; i++) {
        this.board[x + i][y] = ship;
      }
    }

    console.log('placeShip board', this.board);
    return this.board;
  }
}
