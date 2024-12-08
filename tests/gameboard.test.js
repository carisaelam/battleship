import { describe, it, expect } from 'vitest';
import { Gameboard } from '../src/components/gameboard';

describe('Gameboard class', () => {
  const gameboard = new Gameboard();

  it('should exist', () => {
    expect(gameboard).toBeTruthy;
  });
});
