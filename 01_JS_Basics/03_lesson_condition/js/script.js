// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const a = 4,
	b = 5;
if (a === b) {
	console.log('OK!');
} else {
	console.log('ERROR!'); // получил ERROR!
}

const num = 50;
if (num < 49) {
	console.log('Error');
} else if (num > 100) {
	console.log('Много');
} else {
	console.log('OK!'); // получил OK! 
}

// ( ? : ) - тернарный оператор, в его работе три аргумента!!!!
const num1 = 49;
(num1 === 50) ? console.log('OK') : console.log('Error!'); // получил Error!
// №1            №2                   №3
// 4 + 4; // + это бинарный аргумент
// +'4'; // + это унарный аргумент

// модификация switch, так же это работает и со строковыми const num2 = '30';
const num2 = 30;
switch (num2) {
case 49: // если так и есть, то: сообщение //  case '49':
	console.log('OK!');
	break;
case 100: // case '100':
	console.log('Wrong!');
	break;
case 50: // case '50':
	console.log('Wriht!');
	break;
default:
	console.log('Next time!'); // получил => Next time!
	break;
}
