'use strict';

// ОПЕРАТОР ОПЦИОНАЛЬНОЙ ЦЕПОЧКИ - ? - проверяет выражение слева от себя и останавливает операцию, если оно имеет значения null или undefined!!!

const box = document.querySelector('.box');
const block = document.querySelector('.block');

console.log(block); // получил null, так как такого элемента нет на странице

if (block) {
	console.log(block.textContent); // чтобы избежать проблемы блокировки кода из-за ошибки в console.log(block.textContent) => Uncaught TypeError: Cannot read properties of null (reading 'textContent') at script.js:10:20
} // прописывает условие проверки наличия в block какого-либо контента, то выводим этот контент в консоль - это не ломает код

console.log(block?.textContent); // ОПЕРАТОР ОПЦИОНАЛЬНОЙ ЦЕПОЧКИ выглядит как ?, он проверяет слева от точки существует ли блок, после точки выводит контент в консоль при наличии блока (получил undefined, ничего не выводит)

console.log(1 + 2);

const userData = {
	name: 'Ivan',
	age: null,
	say: function() {
		console.log('Say Hello!');
	}
};

if (userData && userData.skills && userData.skills.js) {
	console.log(userData.skills.js); // так как таких полей нет ...skills.js, необходимо применить условия!!! Но это не рационально!!!
}

console.log(userData.skills?.js); // применим ОПЕРАТОР ОПЦИОНАЛЬНОЙ ЦЕПОЧКИ, он проверит условие наличия слева от себя в userData.skills на существование данного поля, если ДА - код идет дальше, а если НЕТ - вернется undefined

console.log(userData?.skills?.js); // можно и две проверки провести

userData.say();
userData.hay?.(); // принцип применения для методов, когда приходят готовые сущности и используются команды для вызова потенциально несуществующих функций!!!