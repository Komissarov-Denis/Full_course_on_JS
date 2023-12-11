// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ВИДЫ ДАННЫХ!!!

const obj = {
	name: 'John',
	age: 13,
	isMarried: false,
};
console.log(obj); // получил { name: 'John', age: 13, isMarried: false }

const arr = ['plum.png', 'orange.jpg', 6, 'apple.bpm', {}, []];
console.log(arr[3]); // получил apple.bpm

alert('Hallo!');

const result = confirm('Are you here?');
console.log(result);

const answer = prompt('Вам есть 18?', 'Да, мне 18!');
console.log(typeof (answer)); // ВСЯ ИНФА ОТ ПОЛЬЗОВАТЕЛЯ - ПРИХОДИТ В ВИДЕ СТРОК!!!!!!!!!!!!!!

const answer2 = +prompt('Вам есть 18?', 'Да, мне 18!');
console.log(answer2 + 5);  // +prompt, Т.Е "+" ПЕРЕВОДИТ СТРОКОВЫЕ В ЧИСЛОВЫЕ ДАНННЫЕ!!!!!

const answers = [];
answers[0] = prompt('Как Ваше имя?', '');
answers[1] = prompt('Как Ваша фамилия?', '');
answers[2] = prompt('Сколько Вам лет?', '');

document.write(answers);
console.log(typeof (answers));

const category = 'toys';
console.log('http://someurl.com/' + category + '/' + '5'); // пример конкотинации или объединения строк!!!
console.log(`http://someurl.com/${category}/5`); // `бэктики` или косые ковычки для интерполяции!!!Более УДОБНО!!!!

const user = 'DEN';
alert(`Привет, ${user}`);

console.log('arr' + ' - object');
console.log(4 + ' - object');
console.log(4 + +'5'); // унарный плюс без пробела!!!!

let incr = 10;
let decr = 10;
incr++; // оператор инкремента, увеличения на 1 - постфиксный способ записи
decr--; // оператор декремента, уменшения на 1 - постфиксный способ записи
++incr; // оператор инкремента, увеличения на 1 - префиксный способ записи
--decr; // оператор декремента, уменшения на 1 - префиксный способ записи
console.log(++incr);
console.log(--decr);

console.log(5%2); // получил 1, остаток от деления двух чисел = 1 !!!

console.log(2 * 4 == 8); // сравнение
console.log(2 * 4 == '8'); // сравнение
console.log(2 * 4 === 7); // строгое равенство
console.log(2 * 4 === '8'); // строгое равенство

// && - оператор И
// || - оператор ИЛИ
const isCheked = true;
const isClosed = false;
console.log(isCheked && isClosed);
console.log(isCheked || isClosed);
console.log(isCheked && !isClosed); // ! заменяет на обратное значение аргумента

console.log((2 + 2) * 2 === 8); // строгое равенство
console.log(2 + 2 * 2 != 8); // не равенство
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table - таблица приоритета операторов