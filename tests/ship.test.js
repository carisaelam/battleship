import { describe, it, expect } from 'vitest';
import { Ship } from '../src/components/ship';

const ship = new Ship(1);

console.log('ship: ', ship);

// Constructor
describe('Constructor', () => {
  it('should exist', () => {
    expect(ship).toBeTruthy;
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
  it('should change sunkStatus to true if hits >= length', () => {
    let twoShip = new Ship(2);
    console.log('twoShip', twoShip);

    twoShip.hit();
    twoShip.hit();

    expect(twoShip.isSunk()).toEqual(true);
  });
});
