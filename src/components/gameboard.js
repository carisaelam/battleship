export class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.#buildBoard(this.size);
    this.missedShots = [];
    this.shipsOnBoard = [];
  }

  getBoard() {
    return this.board;
  }

  placeShip(ship, x, y, direction) {
    let size = ship.length;

    this.#validateSpace(ship, x, y, direction);
    this.#validateOccupied(ship, x, y, direction);

    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        this.board[x][y + i] = { ship: ship, hit: false, attacked: false };
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        this.board[x + i][y] = { ship: ship, hit: false, attacked: false };
      }
    }

    if (!this.shipsOnBoard.includes(ship)) {
      this.shipsOnBoard.push(ship);
    }

    return this.board;
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      throw new Error('Attack coordinates out of bounds');
    }

    const targetCell = this.board[x][y];
    
    if (targetCell.attacked) {
      throw new Error('Already attacked');
    }

    const target = targetCell.ship;
    if (target !== null) {
      target.hit();
      this.checkForAllSunk();
      targetCell.hit = true;
      console.log('checkforallsunk', this.checkForAllSunk());

      if (this.checkForAllSunk()) {
        this.#gameOver();
      }
      return { result: 'hit', ship: target };
    }

    this.missedShots.push([x, y]);
    return { result: 'miss', coordinates: [x, y] };
  }

  checkForAllSunk() {
    if (this.shipsOnBoard.length === 0) {
      return false;
    }

    return this.shipsOnBoard.every((ship) => ship.isSunk());
  }

  // Private methods

  #buildBoard(size) {
    let board = [];

    for (let row = 0; row < size; row++) {
      board.push(
        Array.from({ length: size }, () => ({
          ship: null,
          hit: false,
          attacked: false,
        }))
      );
    }
    return board;
  }

  #gameOver() {
    console.log(`☠️ ALL YOUR SHIPS ARE SUNK! IT'S GAME OVER!`);
  }

  #validateOccupied(ship, x, y, direction) {
    let size = ship.length;

    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        if (this.board[x][y + i].ship !== null) {
          throw new Error(`Ship already in ${x}${y + i}`);
        }
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        if (this.board[x + i][y].ship !== null) {
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
