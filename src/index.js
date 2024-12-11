import { Player } from './components/player';
import { Ship } from './components/ship';

const ship1 = new Ship(2);
const ship2 = new Ship(3);

const player1 = new Player('Carisa', 'real');
console.log('player1', player1);

player1.gameboard.placeShip(ship1, 0, 0, 'horizontal');

player1.gameboard.placeShip(ship2, 0, 2, 'vertical');

console.log(player1.gameboard.board);

console.log(player1.gameboard.receiveAttack(0, 0));
console.log(player1.gameboard.receiveAttack(0, 1));
console.log(player1.gameboard.receiveAttack(0, 2));
console.log(player1.gameboard.receiveAttack(1, 2));
console.log(player1.gameboard.receiveAttack(2, 2));

console.log(player1.gameboard);
