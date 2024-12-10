import { describe, it, expect } from 'vitest';
import { Player } from '../src/components/player';

const player = new Player();

// Constructor
describe('Player creation', () => {
  it('should create a player object', () => {
    expect(player).toBeTruthy();
  });
  
  it('should include player name', () => {
    const player1 = new Player('john')
    expect(player1.name).toEqual('john');
  });

  it('should be either real or computer - computer', () => {
    const realPlayer = new Player();
    expect(realPlayer.type).toEqual('computer');
  });

  it('should be either real or computer - real', () => {
    const computerPlayer = new Player('Jessie', 'real');
    expect(computerPlayer.type).toEqual('real');
  });

  it('should contain its own gameboard', () => {
    const player1 = new Player();
    expect(player1.gameboard).toBeTruthy();
  });
});
