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


const salaries = {
	john: 500,
	ivan: 1000,
	ann: 5000,
	sayHello: function() {
		console.log('Hello');
	}
};
salaries[Symbol.iterator] = function() { //  чтобы объект salaries сделать перебираемым с помощью метода for (...of...) применяем метод [Symbol.iterator] и вешаем на него функцию
	return { // метод [Symbol.iterator] на объекте salaries должен отработать раз и вернуть объект с методом next() для того, чтобы отработал for (...of...)
		current: this.john,
		last: this.ann,
		next() {
			if (this.current < this.last) {
				this.current = this.current + 500;
				return {done: false, value: this.current};
			} else {
				return {done: true};
			}
		}
	};
};
for ( let result of salaries) {
	console.log(result);
}
// получил:
// 1000
// 1500
// 2000
// 2500
// 3000
// 3500
// 4000
// 4500
// 5000