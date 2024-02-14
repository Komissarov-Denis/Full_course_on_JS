// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict'; // работа в современном режиме!!!

b = 15; // без строгого режима получи 15, так как это старая система записи
console.log(b); // в строгом режиме выходит ошибка: ESLint указывает 'b is not defined'

// Переменные:
let number = 5; // изменяемая переменная
const leftBorderWidth = 1; // константа, которую мы не можем изменять
number = 10;
console.log(number); // получил: 10
leftBorderWidth = 10; // ESLint указывает, что leftBorderWidth является неперезаписываемой константой!

// У const есть ОСОБЕННОСТЬ - как таковых прямых констант в JS не существует!!!
const obj = {
	a: 5,
};
obj.a = 10; // при попытке изменить кючевое значение "а" в объекте "obj" на 10, ESLint ничего не сообщает об ошибке
console.log(obj); // получил: { a: 10 }, при этом ошибок в консоле нет!!!

// ВИДЫ ДАННЫХ!!!

let num = 4.6;
console.log(num); // получил: 4.6
console.log(num/0); // получил: Infinity - т.е. бесконечное число
console.log(num * 'string'); // получил: NaN - т.е. Not a Number 

const person = 'Alex'; // строковый тип данных
console.log(person);

const bool = true; // булиновое значение
const bool2 = false; // булиновое значение

console.log(someThing);  // получил: someThing is not defined

let und;
console.log(und); // получил: undefined - значение не определено

//-----------------------------------------------------------------

const obj1 = { // Объект - это коллекция хранения данных: ключ и его значение, а также действия - это методы
	name: 'John',
	age: 25,
	isMarried: false,
};
console.log(obj1); // получил: { name: 'John', age: 25, isMarried: false }
console.log(obj1.name); // получил: John
console.log(obj1['name']); // получил: John
console.log(obj1.age); // получил: 25
console.log(obj1.isMarried); // получил: false

const arr = ['plum.png', 'orange.jpg', 6, 'apple.bmp', {}, []];
console.log(arr[3]); // получил: apple.bmp

//------------------------------------------------------------------

// Разница между массивами и объектами, ОСНОВНОЕ => Массив - это частный случай ОБЪЕКТА
const arr2 = [1, 2, 3]; // массив - это перечень информации по порядку, т.е. у каждой сущности есть порядковый номер, начиная с нуля
console.log(arr2[2]); // получил: 3

const arrObj = {
	0: 1,
	1: 2,
	2: 3,
};
console.log(arrObj[1]); // получил: 2

const arr3 = ['a', 'b', 'c'];
const arrObj2 = {
	0: 'a',
	1: 'b',
	2: 'c',
};
console.log(arr3[2]); // получил: c
console.log(arrObj2[2]); // получил: c
arrObj2.v = '1234';
console.log(arrObj2['v']); // получил: 1234
console.log(arrObj2.v); // получил: 1234


const obj3 = {a:1, b:2, c:3}; // объекты - это структура хранения данных в парном формате: ключ и значение
console.log(obj3.b); // получил: 2

const salary = {
	Ann: 500,
	'Alice': 800,
}; // оба варианта записи ключей подходят, но без кавычек быстрее
console.log(salary.Alice); // получил: 800

//------------------------------------------------------------------

alert('Hallo!');

const result = confirm('Are you here?');
console.log(result);

const answer = prompt('Вам есть 18?', 'Да, мне 18!');
console.log(typeof (answer)); // ВСЯ ИНФА ОТ ПОЛЬЗОВАТЕЛЯ - ПРИХОДИТ В ВИДЕ СТРОК!!!

const answer2 = +prompt('Вам есть 18?', 'Да, мне 18!');
console.log(answer2 + 5);  // +prompt, Т.Е "+" ПЕРЕВОДИТ СТРОКОВЫЕ В ЧИСЛОВЫЕ ДАНННЫЕ!!!

const answers = [];
answers[0] = prompt('Как Ваше имя?', '');
answers[1] = prompt('Как Ваша фамилия?', '');
answers[2] = prompt('Сколько Вам лет?', '');

document.write(answers);
console.log(typeof (answers));

const category = 'toys';
console.log('http://someurl.com/' + category + '/' + '5'); // пример конкотинации или объединения строк!!!
console.log(`http://someurl.com/${category}/5`); // `бэктики` или косые ковычки для интерполяции!!!Более УДОБНО!!!

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

console.log(5%2); // получил: 1, остаток от деления двух чисел = 1 !!!

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
console.log(isCheked && !isClosed); // ! - заменяет на обратное значение аргумента

console.log((2 + 2) * 2 === 8); // строгое равенство
console.log(2 + 2 * 2 != 8); // не равенство
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table - таблица приоритета операторов