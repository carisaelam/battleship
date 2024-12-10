export class Ship {
  constructor(length, numberOfHits = 0, sunkStatus = false) {
    this.length = length;
    this.numberOfHits = numberOfHits;
    this.sunkStatus = sunkStatus;
  }

  hit() {
    this.numberOfHits = this.numberOfHits + 1;
    return this.numberOfHits;
  }

  isSunk() {
    console.log('running isSunk');
    console.log('this.numberOfHits', this.numberOfHits);
    console.log('this.length', this.length);
    return this.numberOfHits >= this.length;
  }
}
