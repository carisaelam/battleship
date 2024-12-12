import { Player } from './components/player';
import { Ship } from './components/ship';

const ship1 = new Ship(2, 'destroyer');
const ship2 = new Ship(3, 'submarine');

const player1 = new Player('Carisa', 'real');
console.log('player1', player1);


const ship3 = new Ship(2, 'destroyer')
const ship4 = new Ship(3, 'submarine')

const player2 = new Player();
console.log('player2 ', player2);

player1.gameboard.placeShip(ship1, 0, 0, 'horizontal');
player1.gameboard.placeShip(ship2, 0, 2, 'vertical');


player2.gameboard.placeShip(ship3, 3, 3, 'vertical')
player2.gameboard.placeShip(ship4, 3, 4, 'horizontal')

console.log('player1 board', player1.gameboard.board);
console.log('player2 board', player2.gameboard.board);

console.log(player1.gameboard.receiveAttack(0, 0));
console.log(player1.gameboard.receiveAttack(0, 1));
console.log(player1.gameboard.receiveAttack(0, 2));
console.log(player1.gameboard.receiveAttack(1, 2));
console.log(player1.gameboard.receiveAttack(2, 2));

console.log(player1.gameboard);
