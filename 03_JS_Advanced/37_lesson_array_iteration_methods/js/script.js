// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Метод перебора FOREACH() не создает новый массив, а перебирает и возвращает данные массива!!!

// Есть иные методы для работы с массивами:

// FILTER() - фильтрует элемент внутри массива
const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];
const shortNames = names.filter(function(name) { // как коллбэк функция, стрелочная функция работает также, name - каждое отфильтрованное имя массива, каждый элемент, можно было назвать element или item
	return name.length < 5; // возвращаем имена длинной менее 5 символов в новый массив shortNames[]можно воспользоваться условиес if(){}, но эта сокращенная запись также работает
});
console.log(shortNames); // получил: [ 'Ivan', 'Ann' ]


// MAP() - позволяет изменять каждые элементы внутри массива
const answers = ['IvAn', 'AnnA', 'Hello'];
const results = answers.map(item => { // как коллбэк функция, стрелочная функция работает также, item - каждое изменяемое имя массива, можно было назвать element или name 
	return item.toLowerCase();  // приводим каждые данные к нижнему регистру в новый массив results[]
});
console.log(results); // получил: [ 'ivan', 'anna', 'hello' ]
// тот же результат при другой записи:
let answers2 = ['IvAn', 'AnnA', 'Hello'];
answers2 = answers2.map(item => {
	return item.toLowerCase();  // приводим каждые данные к нижнему регистру
});
console.log(answers2); // получил: [ 'ivan', 'anna', 'hello' ], т.е. произвели замену массива обновленными данными, но лучше применять отдельную переменную!!!


// EVERY() / SOME() - возвращают при переборе массива булиновые значаения TRUE / FALSE, каждый() / хоть одно()
const someArr = [4, 'gfgfgfg', 'sasasas'];
console.log(someArr.some(item => typeof(item) === 'number')); // получил: true - хоть один элемент число; обращаемся к массиву someArr[], перебираем элементы item в коллбэк функции, сравнивая тип данных с числом
console.log(someArr.every(item => typeof(item) === 'number')); // получил: false - не каждый элемент число; обращаемся к массиву someArr[], перебираем элементы item в коллбэк функции, сравнивая тип данных с числом

const everyArr = [4, 5, 6];
console.log(everyArr.every(item => typeof(item) === 'number')); // получил true - все элементы являются числами


// REDUCE() - собирает массив в одно единое целое, это такой же метод перебора по каждому элементу
const arr = [4, 5, 1, 3, 2, 6];
const result = arr.reduce((sum, current) => sum + current); // коллбэк функция с двумя аргументами: sum - это текущая величина сложения (по умолчанию = 0), current - каждое последующее число массива
// шаг за шагом:
//	1)		0 + 4 = 4   => 
//	2)	=>	4 + 5 = 9   =>
//	3)	=>	9 + 1 = 10  =>
//	4)	=>	10 + 3 = 13 =>
//	5)	=>	13 + 2 = 15 =>
//	6)	=>	15 + 6 = 21
console.log(result); // получил: 21

const arr2 = [4, 5, 1, 3, 2, 6];
const result2 = arr2.reduce((sum, current) => sum + current, 3); // коллбэк функция с тремя аргументами: sum - это текущая величина сложения, current - каждое последующее число массива, 3 - передаем в начальное значение sum = 3
// шаг за шагом:
//	1)		3 + 4 = 7   => 
//	2)	=>	7 + 5 = 12  =>
//	3)	=>	12 + 1 = 13 =>
//	4)	=>	13 + 3 = 16 =>
//	5)	=>	16 + 2 = 18 =>
//	6)	=>	18 + 6 = 24
console.log(result2); // получил: 24

const arrFruits = ['apple', 'pear', 'plum'];
// const resultFruits = arrFruits.reduce((sum, current) => sum + ',' + current); // классический способ сложения строк, получил: apple,pear,plum - без пробелов
const resultFruits1 = arrFruits.reduce((sum, current) => `${sum} + ${current}`);
const resultFruits2 = arrFruits.reduce((sum, current) => `${sum}, ${current}`);
console.log(resultFruits1); // получил: apple + pear + plum
console.log(resultFruits2); // получил: apple, pear, plum

const arrFruits2 = ['apple', 'pear', 'plum'];
// const resultFruits = arrFruits.reduce((sum, current) => sum + ',' + current); // классический способ сложения строк, получил apple,pear,plum - без пробелов
const resultFruits11 = arrFruits2.reduce((sum, current) => `${sum} + ${current}`, 'cherry');
const resultFruits22 = arrFruits2.reduce((sum, current) => `${sum}, ${current}`, 'cherry');
console.log(resultFruits11); // получил: cherry + apple + pear + plum
console.log(resultFruits22); // получил: cherry, apple, pear, plum


// МЕТОД Object.entries():
const obj = { // при получении данных с сервера, мы не имеет представления об индексах ключей, поэтому прямой способ obj[1] не подходит!!!
	ivan: 'persone',
	ann: 'persone',
	dog: 'animal',
	cat: 'animal',
};
const newArray = Object.entries(obj); // Object.entries() - переводит объект в массив, где свойства и значения записаны через запятую, т.е. в матрицу!!!
console.log(newArray); // получил:
// [
// 	[ 'ivan', 'persone' ],
// 	[ 'ann', 'persone' ],
// 	[ 'dog', 'animal' ],
// 	[ 'cat', 'animal' ]
// ]
// применим цепочку методов:
const newArray2 = Object.entries(obj).filter(item => item[1] ==='persone'); 
console.log(newArray2); // получил: [ [ 'ivan', 'persone' ], [ 'ann', 'persone' ] ]
const newArray3 = Object.entries(obj).filter(item => item[1] ==='persone').map(item => item[0]); 
console.log(newArray3); // получил: [ 'ivan', 'ann' ]