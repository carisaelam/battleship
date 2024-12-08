export class Ship {
  constructor(length, numberOfHits = 0, isSunk = false) {
    this.length = length;
    this.numberOfHits = numberOfHits;
    this.isSunk = isSunk;
  }
}
