import { describe, it, expect } from 'vitest';
import { Ship } from '../src/components/ship';

describe('Ship Class', () => {
  const ship = new Ship(1);

  console.log('ship: ', ship);

  it('should exist', () => {
    expect(ship).toBeTruthy;
  });

  it('should include a length', () => {
    expect(ship.length).toBe(1);
  });

  it('should include numberOfHits', () => {
    expect(ship.numberOfHits).toBe(0);
  });

  it('should include isSunk', () => {
    expect(ship.isSunk).toBe(false);
  });
});
