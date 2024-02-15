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

// Виды запросов на основе модальных окон браузера: alert(), confirm(), prompt()
alert('Hallo!'); // предупреждает о важном!!!

const result = confirm('Are you here?'); // запрашивает ответ на "Да"/"Нет" (true/false)
console.log(result);

const answer = prompt('Вам есть 18?', 'Да, мне 18!'); // запрос ответа от пользователя в виде строковых данных или числовых
console.log(typeof (answer)); // ВСЯ ИНФА ОТ ПОЛЬЗОВАТЕЛЯ - ПРИХОДИТ В ВИДЕ СТРОК!!!

const answer2 = +prompt('Вам есть 18?', 'Да, мне 18!'); // второй аргумент - это PLACE HOLDER в окне!!!
console.log(answer2 + 5);  // +prompt, т.е. "+" ПЕРЕВОДИТ СТРОКОВЫЕ В ЧИСЛОВЫЕ ДАНННЫЕ!!! ЧИСЛОВЫЕ И СТРОКОВЫЕ СКЛЕИВАЮТСЯ, а НЕ СКЛАДЫВАЮТСЯ!!!

const answers = [];
answers[0] = prompt('Как Ваше имя?', ''); // второй аргумент - это пустой PLACE HOLDER в окне!!!
answers[1] = prompt('Как Ваша фамилия?', '');
answers[2] = prompt('Сколько Вам лет?', '');
document.write(answers); // устаревшая команда
console.log(typeof(answers)); // получил: object - так как массив есть частный случай объекта!!!

console.log('arr' + ' - object'); // получил: arr - object
console.log(4 + ' - object'); // получил: 4 - object
console.log(4 + +'5'); // унарный плюс без пробела!!! получил: 9

let incr = 10;
let decr = 10;
incr++; // оператор инкремента, увеличения на 1 - постфиксный способ записи
decr--; // оператор декремента, уменшения на 1 - постфиксный способ записи
++incr; // оператор инкремента, увеличения на 1 - префиксный способ записи
--decr; // оператор декремента, уменшения на 1 - префиксный способ записи
console.log(++incr); // получил: 13
console.log(--decr); // получил: 7

console.log(5%2); // получил: 1, остаток от деления двух чисел, получил: 1 !!!

console.log(2 * 4 == 8); // сравнение, получил: true
console.log(2 * 4 == '8'); // сравнение, получил: true
console.log(2 * 4 === 7); // строгое равенство, получил: false
console.log(2 * 4 === '8'); // строгое равенство, получил: false

// && - оператор И
// || - оператор ИЛИ
const isCheked = true;
const isClosed = false;
console.log(isCheked && isClosed); // получил: false
console.log(isCheked || isClosed); // получил: true
console.log(isCheked && !isClosed); // получил: true, ! - заменяет на обратное значение аргумента

console.log((2 + 2) * 2 === 8); // строгое равенство, получил: true
console.log(2 + 2 * 2 != 8); // не равенство, получил: true
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table - таблица приоритета операторов

//---------------------ОБЪЕКТЫ-И-МАССИВЫ----------------------------

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
console.log(arrObj2['v']); // получил: 1234 - скобки и через точку равнозначны, но через скобки безопаснее и надежнее!!!
console.log(arrObj2.v); // получил: 1234
const k = 'k';
arrObj2.k = '5555';
console.log(arrObj2[k]); // получил: 5555 - заранее объявляя переменную со строковым значением 'k' получаем тот же результат!!!

const obj3 = {a:1, b:2, c:3}; // объекты - это структура хранения данных в парном формате: ключ и значение
console.log(obj3.b); // получил: 2
//У МАССИВОВ ПОДОБНЫЕ МАНИПУЛЯЦИИ НЕ РЕКОМЕНДОВАНЫ!!!
const arr4 = ['a', 'b', 'c'];
arr4[10] = 'y';
console.log(arr4[10]); // был создан 11 элемент массива 'y'
console.log(arr4); // получил: [ 'a', 'b', 'c', <7 empty items>, 'y' ] - появились пустые элементы в массиве, так как это нарушает логику массива

const salary = {
	Ann: 500,
	'Alice': 800,
}; // оба варианта записи ключей подходят, но без кавычек быстрее
console.log(salary.Alice); // получил: 800

const arrObj3 = {
	a: 'a',
	'1': 'b',
	2: 'c',
	abc: { // допустимо внутри объекта записывать еще объект, а также массив
		def: {
			dd: [1, 2, 3, {}],
			y: '10',
		}
	}
};
console.log(arrObj3); // получил: { '1': 'b', '2': 'c', a: 'a', abc: { def: { dd: [Array], y: '10' } } }

//------------------------------------------------------------------

//ИНТЕРПОЛЯЦИЯ
const category = 'toys';
console.log('http://someurl.com/' + category + '/' + '5'); // пример КОНКОТИНАЦИЯ или объединения строк!!! получил: http://someurl.com/toys/5
console.log(`http://someurl.com/${category}/5`); // `бэктики` или косые ковычки для ИНТЕРПОЛЯЦИИ!!!Более УДОБНО!!! получил: http://someurl.com/toys/5

const user = 'DEN';
alert(`Привет, ${user}`);