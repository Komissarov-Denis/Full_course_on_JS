// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const soldier = {
	health: 400,
	armor: 80,
	sayHallo: function() {
		console.log('Hallo!');
	}
};
const john = {
	health: 100,
};
// john.__proto__ = soldier; // данный метод сейчас не используется и взамен: установка прототипа!!
Object.setPrototypeOf(john, soldier); // первый аргумент - прототип, второй сущность прототипа!
console.log(john.health); // получил: 100
console.log(john.armor); // получил: 80, прототипное наследование!!!!!!!
john.sayHallo(); // получил: Hallo!

const sam = Object.create(soldier); // метод создания объекта с прототипным наследованием!!!!
sam.sayHallo(); // получил: Hallo!