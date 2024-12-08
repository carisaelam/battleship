import { describe, it, expect } from 'vitest';
import { Gameboard } from '../src/components/gameboard';

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
  const gameboard = new Gameboard(2);
  
  it('should return the gameboard', () => {
    expect(gameboard.getBoard()).toEqual([
      [null, null],
      [null, null],
    ]);
  });
});
