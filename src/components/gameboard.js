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
}
