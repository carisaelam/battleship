import { Gameboard } from './gameboard';

export class Player {
  constructor(name = 'computer', type = 'computer') {
    this.name = name;
    this.type = type;
    this.gameboard = new Gameboard();
  }
}
