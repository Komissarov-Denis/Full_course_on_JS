'use strict';

// ПЕРЕБИРАЕМЫЕ ОБЪЕКТЫ

const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/1993',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
};

// МЕТОД for (...in...) !!!ПЕРЕБИРАЕТ КЛЮЧЕВЫЕ ЗНАЧЕНИЯ!!! - метод для переборов массивов и даже строк, но он перебирает свойства не по порядку, а как получен массив (не рекомендован для широкого применения)!!!
for (let key in user) {
	console.log(user[key]);
}
// получил:
// Alex
// script.js:16 Smith
// script.js:16 20/04/1993
// script.js:16 ƒ () {
// 		console.log(`${this.name} ${this.surname}`);
// 	}

const arr = ['b', 'a', 'c'];
for (let key in arr) {
	console.log(arr[key]);
}
// получил:
// b
// a
// c

const str = 'string';
for (let key in str) {
	console.log(str[key]);
}
// получил:
// s
// t
// r
// i
// n
// g


// МЕТОД for (...of...) !!!ПЕРЕБИРАЕТ СВОЙСТВА КЛЮЧЕВЫХ ЗНАЧЕНИЙ!!! 
const arr2 = ['b', 'a', 'c'];
for (let key of arr2) {
	console.log(key);
}

const arr3 = ['b', 'a', 'c'];
console.dir(arr); // выводит сущность в виде объекта!!!
Array.prototype.someMethod = function() {};
for (let key of arr3) { // for (...of...) не выводит в список лишние сущности, как someMethod, в отличие от for (...in...)
	console.log(key);
}
// получил:
// b
// a
// c