// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

let num = 50;
while (num <= 55) { // пока условие выполняеется, цикл повторяется
	num++;
	console.log(num); // получил: 51 52 53 54 55 56
}

let num1 = 50;
do { // цикл повторяется,  пока условие выполняеется
	num1++;
	console.log(num1); // получил: 51 52 53 54 55 56
}
while (num1 <= 55);

for (let i = 1; i < 8; i++) { // цикл приращивает на 1 переменную до выполнения условия
	console.log(i);  // получил: 1 2 3 4 5 6 7
}

let num2 = 60;
for (let i = 1; i < 8; i++) {
	num2++;
	console.log(num2); // получил: 61 62 63 64 65 66 67
}

for (let i = 1; i < 50; i++) {
	if (i === 6) {
		break;
	} // цикл приращивает на 1 переменную до строгого равенства с 6 и обрывает его
	console.log(i);  // получил: 1 2 3 4 5
}

for (let i = 1; i < 10; i++) {
	if (i === 6) {
		continue; // цикл приращивает на 1 переменную до строгого равенства с 6 и обрывает его, продолжает его после 6 до выполнения условия!!!
	}
	console.log(i);  // получил: 1 2 3 4 5 7 8 9
}
