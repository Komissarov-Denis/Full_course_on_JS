// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// Работа с объектами------------------------------------------------------
let a = 5;
let b = a;
b = b + 5;
console.log(a); // получил: 5
console.log(b); // получил: 10
// ожидаемый результат, так как эта схема работает только с примитивами!!!

const obj = {
	a: 5,
	b: 1,
};
const copy0 = obj;
copy0.a = 10;
console.log(obj);
console.log(copy0);
// в итоге получил: { a: 10, b: 1 } НЕКОРРЕКТНОЕ ПОВЕДЕНИЕ, так как в исходнике a: 5 заменено на a: 10!!!
//                  { a: 10, b: 1 }
// т.е. изменяя в copy мы повлияли и на сотояние самого obj - ОЧЕНЬ ВАЖНО!!! ТУТ ЗНАЧЕНИЕ ПЕРЕДАЕТСЯ ПО ССЫЛКЕ!!!

function copy(mainObj) {
	let objCopy = {}; // создаем пустой объект objCopy
	let key; // создаем переменную key, можно и вне цикла!
	for (key in mainObj) { // с помощью цикла for (...in...) перебираем все key в mainObj
		objCopy[key] = mainObj[key]; // создаем новое свойство в objCopy через []. Присваиваем ему значения из mainObj
	}
	return objCopy; // возвращаем новый скопированный объект
}
const numbers = {
	a: 2,
	b: 5,
	c: {
		x: 7,
		y: 4,
	},
};
const newNumbers = copy(numbers);
newNumbers.a = 9; // это ПОВЕРХНОСТНАЯ копия объекта первого уровня - замена свойства!!!
newNumbers.c.x = 8; // это ПОВЕРХНОСТНАЯ копия объекта второго уровная - ссылочная копия!!!!
console.log(numbers); // получил: { a: 2, b: 5, c: { x: 8, y: 4 } } НЕКОРРЕКТНОЕ ПОВЕДЕНИЕ, не должны были исходник x: 7 на x: 8 менять!!!
console.log(newNumbers); // получил: { a: 9, b: 5, c: { x: 8, y: 4 } }

const numbers2 = {
	a: 2,
	b: 5,
	c: {
		x: 7,
		y: 4,
	},
};
const add = {
	d: 17,
	e: 20,
};
console.log(Object.assign(numbers2, add)); // получил: { a: 2, b: 5, c: { x: 7, y: 4 }, d: 17, e: 20 } Object.assign метод объединения объектов
const clone = Object.assign({}, add); // это ПОВЕРХНОСТНАЯ копия объекта первого уровня - замена свойства!!!
clone.d = 21;
console.log(add); // получил: { d: 17, e: 20 }
console.log(clone); // получил: { d: 21, e: 20 }

// Работа с массивами-----------------------------------------------------------
const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice(); // метод копирующий старый массив!!!!!
newArray[1] = 'asdasfasfasf';
console.log(oldArray); // получил: [ 'a', 'b', 'c' ]
console.log(newArray); // получил: [ 'a', 'asdasfasfasf', 'c' ]

const video = ['youtube', 'vimeo', 'rutube']; // оператор spread - разворота!!!!
const blogs = ['wordpress', 'livejournal', 'blogger'];
const internet = [...video, ...blogs, 'vk', 'facebook'];
console.log(internet); // получил: ['youtube', 'vimeo', 'rutube', 'wordpress', 'livejournal', 'blogger', 'vk', 'facebook'] объединяет в один массив по заданным аргументам

function log(f, g, h) { // ДЕСТРУКТУРИЗАЦИЯ массива
	console.log(f); // получил: 2
	console.log(g); // получил: 5
	console.log(h); // получил: 7
}
const num = [2, 5, 7];
log(...num); // оператор spread - разворота!!!! ES8

const array = ['a', 'b'];
const newArray2 = [...array]; // оператор spread - разворота ES8 в массивах!!!
const q = {
	one: 1,
	two: 2,
};
const newObj = {...q}; // оператор spread - разворота ES8 в объектах!!!
console.log(newArray2); // получил: [ 'a', 'b' ]
console.log(newObj); // получил: { one: 1, two: 2 }