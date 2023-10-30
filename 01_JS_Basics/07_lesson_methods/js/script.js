// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const str = 'teSt';
const arr = [1, 2, 3];
console.log(str.length);
console.log(arr.length);
console.log(str[2]);
// console.log(str[2] = 'd'); // некорректная замена в слове test
console.log(str.toUpperCase()); // метод верхнего регистра
console.log(str.toLowerCase()); // метод нижнего регистра

// ПОИСК ПОДСТРОКИ!!!
const fruit = 'Some fruit';
console.log(fruit.indexOf('fruit')); // кусочек строки начинается с 5 позиции символа, отсчет начиная с "0"
console.log(fruit.indexOf('q')); // -1 отзначает отсутствие подобных букв в словах строки

const logg = 'Hello World!';
console.log(logg.slice(6, 11)); // вырезаем выделенную область строки с 6-го по 11 символ по индексу
console.log(logg.slice(4)); // вырезаем выделенную область строки с 4-го символа до конца по индексу
console.log(logg.slice(-6, -1)); // инферсия вырезаемых символов ;-) с 6 справа до 1 справа
console.log(logg.substring(6, 11)); // метод такой же, не поддерживает отрицательные значения!!!

const num = 12.2;
console.log(Math.round(num)); // округление до целых чисел
const test = '12.2px';
console.log(parseInt(test)); // переводит в другую систему счисления
console.log(parseFloat(test)); // возвращает число или строку в десятичном варианте
