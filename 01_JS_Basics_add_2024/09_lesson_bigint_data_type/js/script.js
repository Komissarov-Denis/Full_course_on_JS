'use strict';

// console.log(Number.MAX_SAFE_INTEGER);
// VM89:1 9007199254740991 это число 2 в 53 степени минус 1 - максимально доступное число для корректной работы!!!

// BigInt - особое число, сверх максимального доступного числа для корректной работы; доступны операторы: сложения, умножения, вычитания, деления с остатком, возведения в степень, побитовые, сравнения!!!

const bigint = 123218645494635168797435132198749n;

const sameBigint = BigInt(123218645494635168797435132198749);

console.log(typeof(bigint));
console.log(typeof(sameBigint));
console.log(1n + 3n); // получил: 4n
console.log(5n / 2n); // получил: 2n, возвращается округленный результат без дробной части !!!
console.log(5n > 2n); // получил: true
console.log(2n > 5); // получил: false => так как 2 никак не больше 5
console.log(2n == 2); // получил: true
console.log(2n === 2); // получил: false => так как разный тип данных


// BigInt нельзя смешивать в операциях с обычными числами!!!
// console.log(5n + 1); // получил: script.js:17  Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions at script.js:17:16


// BigInt нельзя использовать с методами со встроенным объектом Math{}!!!
// console.log(Math.round(5n)); 
// получил:
// script.js:18  Uncaught TypeError: Cannot convert a BigInt value to a number
// at Math.round (<anonymous>)
// at script.js:18:18

let bigint2 = 1n;
let number = 2;
console.log(bigint2 + BigInt(number)); // получил: 3n, конвертация позволяет выполнять подобные операции!!!
console.log(Number(bigint2) + number); // получил: 3, конвертация через Number() в простое число!!! Конвертор Number() отрезает от BigInt не входящие в стандарт числа, потому результат может быть неожиданным!!!
// console.log(+bigint2 + number); // получил: унарный плюс не подходит, script.js:37  Uncaught TypeError: Cannot convert a BigInt value to a number at script.js:37:13!!!