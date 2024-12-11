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
    this.sunkStatus = this.numberOfHits >= this.length;
    return this.sunkStatus;
  }
}
