export class Ship {
  constructor(length, type, numberOfHits = 0, sunkStatus = false) {
    this.length = length;
    this.numberOfHits = numberOfHits;
    this.sunkStatus = sunkStatus;
    this.type = this.validateType(type);
  }

  validateType(type) {
    const validShipTypes = [
      'carrier',
      'destroyer',
      'submarine',
      'battleship',
      'cruiser',
    ];

    if (validShipTypes.includes(type)) {
      return type;
    } else {
      console.error('Unknown ship type: ', type);
      throw new Error('Unknown ship type');
    }
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
