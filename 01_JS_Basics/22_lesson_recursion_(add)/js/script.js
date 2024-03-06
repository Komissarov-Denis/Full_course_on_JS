// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// РЕКУРСИЯ - ПРИЕМ, КОГДА ФУНКЦИЯ ВЫЗЫВАЕТ САМА СЕБЯ!!!
// Задача: pow - возведение в степень, первый аргумент - что возводим, второй аргумент - в какую степень возводим, получил: 4

// Используем оператор ** - возведения в степень!!!
function pow(a, b) {
	return (a ** b);
}
let result0 = pow(2, 0);
let result1 = pow(2, 1);
let result2 = pow(2, 2);
let result3 = pow(2, 3);
let result4 = pow(2, 4);
console.log(result0, result1, result2, result3, result4); // получил: 1 2 4 8 16, РЕШЕНО!!! Но, тут идет запуск каждый раз при передачи аргументов в функцию!!!

// Используем цикл for()
function pow2(x, n) {
	let result = 1;
	for (let i = 0; i < n; i++) {
		result *= x; // result = result * x
	}
	return result;
}
console.log(pow2(2, 0)); // получил: 1
console.log(pow2(2, 1)); // получил: 2
console.log(pow2(2, 2)); // получил: 4
console.log(pow2(2, 3)); // получил: 8
console.log(pow2(2, 4)); // получил: 16
// получил: 1 2 4 8 16, РЕШЕНО!!! Но, тут идет запуск каждый раз при передачи аргументов в функцию!!!

