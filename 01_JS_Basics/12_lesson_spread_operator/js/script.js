// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Передача данных по ссылке или по значению в примитивах и объектах
let a = 5; // создаем хранилище данных "а" и помещаем в нее 5
let b = a; // создаем хранилище данных "b" и помещаем в нее значение "а"
b = b + 5; // положим в хранилище "b" модифицированное значение "b + 5"
console.log(a); // получил: 5
console.log(b); // получил: 10
// ожидаемый результат, так как эта схема работает только с примитивами и предаются данные ПО ЗНАЧЕНИЮ!!!

const obj = {
	a: 5,
	b: 1,
};
const copy0 = obj; // СЮДА КЛАДЕТСЯ ССЫЛКА на obj!!!
copy0.a = 10;
console.log(obj); // в итоге получил: { a: 10, b: 1 } НЕКОРРЕКТНОЕ ПОВЕДЕНИЕ, так как в исходнике a: 5 заменено на a: 10!!!
console.log(copy0); //                { a: 10, b: 1 }
// т.е. изменяя в copy мы повлияли и на состояние самого obj - ОЧЕНЬ ВАЖНО!!! ТУТ ЗНАЧЕНИЕ ПЕРЕДАЕТСЯ ПО ССЫЛКЕ!!!

function copy(mainObj) { 
	let objCopy = {}; // создаем пустой объект objCopy
	let key; // создаем переменную key, можно и вне цикла создать!!!
	for (key in mainObj) { // с помощью цикла for (...in...) перебираем все key в mainObj
		objCopy[key] = mainObj[key]; // создаем новое свойство в objCopy через []. Присваиваем ему значения из mainObj
	}
	return objCopy; // возвращаем новый скопированный объект наружу из функции
}
const numbers = {
	a: 2,
	b: 5,
	c: {
		x: 7,
		y: 4,
	},
};
const newNumbers = copy(numbers); // создаем новый объект newNumbers через объявление переменной, которой запускаем функцию copy() с передачей объекта numbers в mainObj для копирования
console.log(numbers); // получил:    { a: 2, b: 5, c: { x: 7, y: 4 } }
console.log(newNumbers); // получил: { a: 2, b: 5, c: { x: 7, y: 4 } } - это желаемый склонированный результат поверхностной копии!!!
newNumbers.a = 9; // это ПОВЕРХНОСТНАЯ копия объекта первого уровня - замена свойства!!!
newNumbers.c.x = 8; // это ПОВЕРХНОСТНАЯ копия объекта второго уровня - ссылочная копия!!!!
console.log(numbers); // получил:    { a: 2, b: 5, c: { x: 8, y: 4 } } НЕКОРРЕКТНОЕ ПОВЕДЕНИЕ вложенной структуры как ссылочный результат, не должен был исходник x: 7 на x: 8 поменяться!!!
console.log(newNumbers); // получил: { a: 9, b: 5, c: { x: 8, y: 4 } }

// МЕТОД Object.assign() - метод объединения объектов!!!
const numbers2 = { // попробуем соединить объект add с объектом numbers2
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
console.log(Object.assign(numbers2, add)); // получил: { a: 2, b: 5, c: { x: 7, y: 4 }, d: 17, e: 20 } - это ПОВЕРХНОСТНАЯ копия объекта первого уровня!!!
const clone = Object.assign({}, add); // создадим пустой объект, объединим его с add
console.log(clone); // получил: { d: 17, e: 20 }
clone.d = 21; // заменим значение "d" на 21
console.log(add); // получил: { d: 17, e: 20 }
console.log(clone); // получил: { d: 21, e: 20 }


// Передача данных по ссылке или по значению в массивах
// МЕТОД slice()
const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice(); // МЕТОД slice() - копирует старый массив!!!
newArray[1] = 'asdasfasfasf';
console.log(oldArray); // получил: [ 'a', 'b', 'c' ]
console.log(newArray); // получил: [ 'a', 'asdasfasfasf', 'c' ]

// ОПЕРАТОР РАЗВОРОТА SPREAD
const video = ['youtube', 'vimeo', 'rutube']; // оператор spread - разворота или расширения!!!
const blogs = ['wordpress', 'livejournal', 'blogger'];
const internet = [...video, ...blogs, 'vk', 'facebook'];
console.log(internet); // получил: ['youtube', 'vimeo', 'rutube', 'wordpress', 'livejournal', 'blogger', 'vk', 'facebook'] объединяет в один массив по заданным аргументам!!!

function log(f, g, h) { // ДЕСТРУКТУРИЗАЦИЯ массива
	console.log(f); // получил: 2
	console.log(g); // получил: 5
	console.log(h); // получил: 7
}
const num = [2, 5, 7];
log(...num); // оператор spread - разворота ES8!!! разложили массив num на отдельные значения, деструктурировали его!!!

const array = ['a', 'b'];
const newArray2 = [...array]; // оператор spread - разворота ES8 в массивах!!!
console.log(newArray2); // получил: [ 'a', 'b' ]

const q = {
	one: 1,
	two: 2,
};
const newObj = {...q}; // оператор spread - разворота ES8 в объектах!!!
console.log(newObj); // получил: { one: 1, two: 2 }