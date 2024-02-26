// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ПРОТОТИПНО ОБЪЕКТНО ОРИЕНТИРОВАННОЕ ПРОГРАММИРОВАНИЕ - главная структура естественно ОБЪЕКТ!!!
const arr = [1, 2, 3];
console.dir(arr); // посмотреть дополнительные свойства можно только в БРАУЗЕРЕ!!! получил: [[Prototype]] : Array(0) в том числе, с набором методов массива

// ПРОТОТИПНОЕ НАСЛЕДОВАНИЕ
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
// john.__proto__ = soldier; // данный метод сейчас не используется и взамен: установка прототипа!!!

// МЕТОД Object.setPrototypeOf()
Object.setPrototypeOf(john, soldier); // первый аргумент - прототип (новый наследующий объект), второй сущность прототипа (объект с наследуемыми значениями)!!!
console.log(john.health); // получил: 100
console.log(john.armor); // получил: 80 - прототипное наследование!!!
john.sayHallo(); // получил: Hallo! - прототипное наследование!!!

// МЕТОД Object.create()
const sam = Object.create(soldier); // метод создания объекта с прототипным наследованием!!!
sam.sayHallo(); // получил: Hallo!