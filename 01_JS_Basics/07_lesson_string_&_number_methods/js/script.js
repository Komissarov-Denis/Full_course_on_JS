// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// МЕТОДЫ - это вспомогательные функции, а СВОЙСТВА - вспомогательные значения!!!
const str = 'teSt';
const arr = [1, 2, 3];
console.log(str.length); // получил: 4
console.log(arr.length); // получил: 3
console.log(str[2]); // получил: S
// console.log(str[2] = 'd'); // некорректная замена в слове test, так как напрямую к ней обратиться не можем, только через МЕТОДЫ!!!
console.log(str.toUpperCase()); // получил: TEST, toUpperCase() - метод верхнего регистра, строку teSt он не меняет, а возвращает новое значение для использования!!!
console.log(str.toLowerCase()); // получил: test, toLowerCase() - метод нижнего регистра, строку teSt он не меняет, а возвращает новое значение для использования!!!

// ПОИСК ПОДСТРОКИ!!!
const fruit = 'Some fruit';
console.log(fruit.indexOf('fruit')); // получил: 5, метод indexOf() находит кусочек строки начиная с 5 позиции символа, отсчет начинается с "0"!!!
console.log(fruit.indexOf('q')); // получил: -1, это означает отсутствие подобных букв в словах строки!!!

// МОДИФИКАЦИЯ СТРОК!!!
const logg = 'Hello World!';
console.log(logg.slice(6, 11)); // получил: World, метод slice() вырезает выделенную область строки с 6-го по 11 (НЕ ВКЛЮЧИТЕЛЬНО!!!) символ по индексу
console.log(logg.slice(4)); // получил: o World!, метод slice() вырезает выделенную область строки с 4-го символа до конца по индексу
console.log(logg.slice(-6, -1)); // получил: World, метод slice() инверсирует вырезаемые символы ;-) с 6 справа до 1 справа
console.log(logg.substring(6, 11)); // получил: World, метод substring() такой же, не поддерживает отрицательные значения!!!

const num = 12.2;
console.log(Math.round(num)); // получил: 12, метод Math.round() округляет до целых чисел
const test = '12.2px';
console.log(parseInt(test)); // получил: 12, метод parseInt() переводит в другую систему счисления в вид целых чисел
console.log(parseFloat(test)); // получил: 12.2, метод parseFloat() возвращает число или строку в десятичном варианте
const test2 = '12.2325';
console.log(parseFloat(test2)); // получил: 12.2325, метод parseFloat() возвращает число или строку в десятичном варианте
// Если в консоле браузера набрать название метода (Math, console и т.д.), то можно получить список свойств для дальнейшей работы!!!

//Метод TRIM - если в запросе вводить пробелы, метод удаляет пробелы в начале и в конце строки!!!
str.trim(); // см. урок 14.1