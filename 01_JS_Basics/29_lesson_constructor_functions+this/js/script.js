// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ФУНКЦИИ КОНСТРУКТОРЫ удобны для создания однотипных объектов и свойств в ES5, для создания множества копий на основе шаблона или прототипа!!!

// Функция является ОБЪЕКТОМ, потому в неё можно записать МЕТОДЫ и СВОЙСТВА, при этом return не применяется, так как ничего не возвращаем из функции
const num = new Number(3); // устаревший способ
console.log(num);

const num2 = new Function(3); // устаревший способ
console.log(num2);

function User(name, id, age) { // с помощью this. внутри функции для каждого пользователя будем указывать свой возраст, номер и имя создавая объект
	this.name = name; // все эти свойства из функции формируют КОНСТРУКТОР, с помощью которого можно создавать новых пользователей
	this.id = id;
	this.age = age;
	this.human = true;
	this.hello = function() { // также можно сюда добавлять методы
		console.log(`Hello ${this.name}!`);
	};
}
User.prototype.exit = function() {
	console.log(`Пользователь ${this.name} ушел...`); // прототипно будет наследоваться всем пользователям, которые записаны после него
};
const denis = new User('Denis', 1, 43); // в переменную мы передали уже объект на основе конструктора с помощью ключевого слова new!!!
const alex = new User('Alex', 2, 32);
denis.hello(); // вызываем метод и получаем: Hello Denis!
alex.hello(); // вызываем метод и получаем: Hello Alex!
denis.exit(); // вызываем метод и получаем: Пользователь Denis ушел...
alex.exit(); // вызываем метод и получаем: Пользователь Alex ушел...
console.log(denis); // получил: User {name: 'Denis', id: 1, age: 43, human: true, hello: ƒ}
console.log(alex); // получил: User {name: 'Alex', id: 2, age: 32, human: true, hello: ƒ}
console.log(denis.id);  // получил: 1