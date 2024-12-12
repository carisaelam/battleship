export class Ship {
  constructor(length, type, numberOfHits = 0, sunkStatus = false) {
    this.length = length;
    this.numberOfHits = numberOfHits;
    this.sunkStatus = sunkStatus;
    this.type = type 
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
