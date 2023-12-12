// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const str = 'teSt';
const arr = [1, 2, 3];
console.log(str.length); // получил: 4
console.log(arr.length); // получил: 3
console.log(str[2]); // получил: S
// console.log(str[2] = 'd'); // некорректная замена в слове test
console.log(str.toUpperCase()); // получил: TEST, метод верхнего регистра
console.log(str.toLowerCase()); // получил: test, метод нижнего регистра

// ПОИСК ПОДСТРОКИ!!!
const fruit = 'Some fruit';
console.log(fruit.indexOf('fruit')); // получил: 5, кусочек строки начинается с 5 позиции символа, отсчет начиная с "0"
console.log(fruit.indexOf('q')); // получил: -1, это означает отсутствие подобных букв в словах строки!!!

const logg = 'Hello World!';
console.log(logg.slice(6, 11)); // получил: World, вырезаем выделенную область строки с 6-го по 11 символ по индексу
console.log(logg.slice(4)); // получил: o World!, вырезаем выделенную область строки с 4-го символа до конца по индексу
console.log(logg.slice(-6, -1)); // получил: World, инверсия вырезаемых символов ;-) с 6 справа до 1 справа
console.log(logg.substring(6, 11)); // получил: World, метод такой же, не поддерживает отрицательные значения!!!

const num = 12.2;
console.log(Math.round(num)); // получил: 12, округление до целых чисел
const test = '12.2px';
console.log(parseInt(test)); // получил: 12, переводит в другую систему счисления
console.log(parseFloat(test)); // получил: 12.2, возвращает число или строку в десятичном варианте