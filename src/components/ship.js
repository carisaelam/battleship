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
    console.log('running isSunk from ship class');
    console.log('this.numberOfHits', this.numberOfHits);
    console.log('this.length', this.length);
    this.sunkStatus = this.numberOfHits >= this.length;
    console.log('this.sunkStatus', this.sunkStatus);
    return this.sunkStatus;
  }
}
