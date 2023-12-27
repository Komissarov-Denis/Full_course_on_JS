// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// MODULE - два способа применения приема модуль:
// const app = '123';

// использование анонимной самовызывающейся функции как  function expression
const numder = 1;
(function(){
	let numder = 2;
	console.log(numder); // получил: 2 => приходит из локальной пременной let numder = 2;
	console.log(numder + 3);  // получил: 5 => приходит из локальной пременной let numder = 2 с трансформацией + 3;
}());
console.log(numder);  // получил: 1 => пытаемся снаружи вывести numder и обращаемся к глобальной области видимости const numder = 1;

const user = (function(){
	const privat = function() { // функция в локальной области видимости и к ней доступа нет =>
		console.log('I am a privat!'); 
	};
	return { // применим объектный интерфейс, т.е. вернем этой локальной функции объект через метод sayHallo
		sayHallo: privat
	}; 
}());
user.sayHallo();  // получил: I am a privat!