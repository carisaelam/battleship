import { describe, it, expect } from 'vitest';
import { Gameboard } from '../src/components/gameboard';
import { Ship } from '../src//components/ship';

// Constructor
describe('Gameboard class', () => {
  const gameboard = new Gameboard();
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
      [null, null],
      [null, null],
    ]);
  });

  it('should work for larger board', () => {
    const fourGameboard = new Gameboard(4);

    expect(fourGameboard.getBoard()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });
});

// placeShip
describe('placeShip function', () => {
  const gameboard = new Gameboard(10);
  const twoShip = new Ship(2);
  const threeShip = new Ship(3);
  const fiveShip = new Ship(5);
  const twoShip2 = new Ship(2);
  const nineShip = new Ship(9);

  it('should place a two ship at the coordinates', () => {
    gameboard.placeShip(twoShip, 0, 0, 'horizontal');

    expect(gameboard.board[0][0]).toEqual(twoShip);
    expect(gameboard.board[0][1]).toEqual(twoShip);
  });

  it('should place a three ship at the coordinates', () => {
    gameboard.placeShip(threeShip, 0, 2, 'vertical');

    expect(gameboard.board[0][2]).toEqual(threeShip);
    expect(gameboard.board[1][2]).toEqual(threeShip);
    expect(gameboard.board[2][2]).toEqual(threeShip);
  });

  it('should place a five ship at the coordinates', () => {
    gameboard.placeShip(fiveShip, 4, 0, 'horizontal');

    expect(gameboard.board[4][0]).toEqual(fiveShip);
    expect(gameboard.board[4][1]).toEqual(fiveShip);
    expect(gameboard.board[4][2]).toEqual(fiveShip);
    expect(gameboard.board[4][3]).toEqual(fiveShip);
    expect(gameboard.board[4][4]).toEqual(fiveShip);
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
  const twoShip = new Ship(2);

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
