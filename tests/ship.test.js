import { describe, it, expect } from 'vitest';
import { Ship } from '../src/components/ship';

const ship = new Ship(1, 'battleship');

// Constructor
describe('Constructor', () => {
  it('should exist', () => {
    expect(ship).toBeTruthy;
  });

  it('should include a type', () => {
    expect(ship.type).toEqual('battleship');
  });

  it('should include a length', () => {
    expect(ship.length).toBe(1);
  });

  it('should include numberOfHits', () => {
    expect(ship.numberOfHits).toBe(0);
  });

  it('should include sunkStatus', () => {
    expect(ship.sunkStatus).toBe(false);
  });
});

// Hit function
describe('Hit function', () => {
  it('should increase numberOfHits by one', () => {
    ship.hit();
    expect(ship.numberOfHits).toEqual(1);
  });
});

// isSunk function
describe('Is Sunk function', () => {
  it('should return true if numberOfHits >= length', () => {
    let twoShip = new Ship(2, 'destroyer');

    twoShip.hit();
    twoShip.hit();

    expect(twoShip.isSunk()).toEqual(true);
  });

  it('should work for a larger ship - not sunk', () => {
    let fourShip = new Ship(4, 'battleship');
    fourShip.hit();
    fourShip.hit();
    fourShip.hit();

    expect(fourShip.isSunk()).toEqual(false);
  });

  it('should work for a larger ship - sunk', () => {
    let fourShip = new Ship(4, 'battleship');
    fourShip.hit();
    fourShip.hit();
    fourShip.hit();
    fourShip.hit();

    expect(fourShip.isSunk()).toEqual(true);
  });

  it('should throw an error for unknown ship type', () => {
    expect(() => {
      new Ship(2, 'problem');
    }).toThrowError('Unknown ship type');
  });
});
