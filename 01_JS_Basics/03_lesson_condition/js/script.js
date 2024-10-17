// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// УСЛОВИЯ превращают любой тип данных в булиновый для проверки
if (4 == 4) {
	console.log('OK!');
} else {
	console.log('WRONG!');
} // получил: OK!

const a = 4,
	b = 5;
if (a === b) {
	console.log('OK!');
} else {
	console.log('ERROR!'); // получил: ERROR!
}

const num = 50;
if (num < 49) {
	console.log('Error');
} else if (num > 100) {
	console.log('Много');
} else {
	console.log('OK!'); // получил: OK! 
}

// ( ? : ) - тернарный оператор, в его работе три аргумента!!!!
const num1 = 49;
(num1 === 50) ? console.log('OK') : console.log('Error!'); // получил: Error! Выводим данные при невыполнении условия!!!
// №1            №2                   №3
// 4 + 4; // + это бинарный аргумент
// +'4'; // + это унарный аргумент

// модификация switch, так же это работает и со строковыми const num2 = '30';
const num2 = 25;
switch (num2) { // конструкция на СТРОГОЕ СООТВЕТСТВИЕ!!! Со строками будет точно также!!!
case 49: // если так и есть, то: сообщение //  case '49':
	console.log('Next!');
	break;
case 100: // case '100':
	console.log('Wrong!');
	break;
case 50: // case '50':
	console.log('Wright!');
	break;
default:
	console.log('Next time!'); // получил: Next time!
	break;
}