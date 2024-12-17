import { describe, it, expect } from 'vitest';
import { Gameboard } from '../src/components/gameboard';
import { Ship } from '../src//components/ship';

// Constructor
describe('Gameboard class', () => {
  const gameboard = new Gameboard(10);
  it('should exist', () => {
    expect(gameboard).toBeTruthy;
  });

  it('should have a size of 10', () => {
    expect(gameboard.size).toBe(10);
  });
});

// getBoard
describe('getBoard function', () => {
  it('should return the gameboard', () => {
    const twoGameboard = new Gameboard(2);

    expect(twoGameboard.getBoard()).toEqual([
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
    ]);
  });

  it('should work for larger board', () => {
    const fourGameboard = new Gameboard(4);

    expect(fourGameboard.getBoard()).toEqual([
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
      [
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
        { ship: null, hit: false, attacked: false },
      ],
    ]);
  });
});

// placeShip
describe('placeShip function', () => {
  const gameboard = new Gameboard(10);
  const twoShip = new Ship(2, 'destroyer');
  const threeShip = new Ship(3, 'submarine');
  const fiveShip = new Ship(5, 'carrier');
  const twoShip2 = new Ship(2, 'destroyer');
  const nineShip = new Ship(9, 'carrier');

  it('should place a two ship at the coordinates', () => {
    gameboard.placeShip(twoShip, 0, 0, 'horizontal');

    expect(gameboard.board[0][0].ship).toEqual(twoShip);
    expect(gameboard.board[0][1].ship).toEqual(twoShip);
  });

  it('should place a three ship at the coordinates', () => {
    gameboard.placeShip(threeShip, 0, 2, 'vertical');

    expect(gameboard.board[0][2].ship).toEqual(threeShip);
    expect(gameboard.board[1][2].ship).toEqual(threeShip);
    expect(gameboard.board[2][2].ship).toEqual(threeShip);
  });

  it('should place a five ship at the coordinates', () => {
    gameboard.placeShip(fiveShip, 4, 0, 'horizontal');

    expect(gameboard.board[4][0].ship).toEqual(fiveShip);
    expect(gameboard.board[4][1].ship).toEqual(fiveShip);
    expect(gameboard.board[4][2].ship).toEqual(fiveShip);
    expect(gameboard.board[4][3].ship).toEqual(fiveShip);
    expect(gameboard.board[4][4].ship).toEqual(fiveShip);
  });

  it('should throw an error if space is occupied', () => {
    expect(() => {
      gameboard.placeShip(twoShip2, 3, 4, 'vertical');
    }).toThrowError();
  });

  it('should throw an error if board not wide enough', () => {
    expect(() => {
      gameboard.placeShip(nineShip, 3, 3, 'horizontal');
    }).toThrowError('Board not wide enough');
  });

  it('should throw an error if board not tall enough', () => {
    expect(() => {
      gameboard.placeShip(nineShip, 3, 3, 'vertical');
    }).toThrowError('Board not tall enough');
  });
});

//receiveAttack
describe('receiveAttack function', () => {
  const gameboard = new Gameboard();
  const twoShip = new Ship(2, 'destroyer');

  gameboard.placeShip(twoShip, 0, 0, 'horizontal');

  it('should return true if attack hit a ship', () => {
    expect(gameboard.receiveAttack(0, 0)).toEqual({
      result: 'hit',
      ship: twoShip,
    });
  });

  it('should return false if attack did not hit a ship', () => {
    expect(gameboard.receiveAttack(1, 0)).toEqual({
      result: 'miss',
      coordinates: [1, 0],
    });
  });
});

// checkForAllSunk
describe('checkForAllSunk function', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2, 'destroyer');
  const ship2 = new Ship(2, 'destroyer');

  gameboard.placeShip(ship1, 0, 0, 'horizontal');
  gameboard.placeShip(ship2, 1, 0, 'vertical');

  it('should return false if NOT all ships are sunk', () => {
    expect(gameboard.checkForAllSunk()).toEqual(false);
  });

  it('should return true if all ships are sunk', () => {
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    expect(gameboard.checkForAllSunk()).toEqual(true);
  });
});
