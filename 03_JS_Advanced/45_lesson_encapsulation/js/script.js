// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// инкапсуляция - один из принципов ООП, означает защиту от вмешательства в данные пользователями

// обычный метод:
function User(name, age) {
	this.name = name;
	this.age = age;
	this.say = function () {
		console.log(`Имя пользователя: ${this.name}, возраст ${this.age}`); // таким методом можно поломать систему
	};
}
const ivan = new User('Ivan', 27);
console.log(ivan.name); // получил: Ivan
console.log(ivan.age); // получил: 27
ivan.age = 30; // можно напрямую поменять свойство ключа объекта age =>
ivan.name = 'Alex'; // можно напрямую поменять свойство ключа объекта name =>
ivan.say(); // обратившись методу say(), выводим значения => получил: Имя пользователя: Alex, возраст 30 

// методика инкапсуляции:
function User2(name, age) {
	this.name = name;
	let userAge = age; // данная переменная userAge не доступна снаружи, ее ни поменять, ни получить не возможно!!!
	this.say = function () {
		console.log(`Имя пользователя: ${this.name}, возраст ${userAge}`); // такам методом можно поломать систему
	};
}
const ivan2 = new User2('Ivan', 27);
console.log(ivan2.name); // получил: Ivan
console.log(ivan2.userAge); // получил: undefined => это уже не свойство объекта!!!
ivan2.userAge = 30; //  можно напрямую поменять свойство ключа объекта age =>
ivan2.name = 'Alex'; // можно напрямую поменять свойство ключа объекта name =>
ivan2.say(); // обратившись методу say(), выводим значения => получил: Имя пользователя: Alex, возраст 30 

// идем далее:
function User3(name, age) {
	this.name = name;
	let userAge = age; // данная переменная userAge не доступна снаружи, ее ни поменять, ни получить не возможно!!!
	this.say = function () {
		console.log(`Имя пользователя: ${this.name}, возраст ${userAge}`); // такам методом можно поломать систему
	};
	this.getAge = function() { // для доступа к userAge создали специльный метод getAge
		return userAge;
	};
	this.setAge = function(age) {
		if (typeof age === 'number' && age > 0 && age < 110) { // проверяем на соответствие числу, и что больще нуляи меньше 110, для защиты от "дурака"
			userAge = age;
		} else {
			console.log('Недопустимое значение!');
		}
	};
}
const ivan3 = new User3('Ivan', 27);
console.log(ivan3.name); // получил: Ivan
console.log(ivan3.getAge()); // получил: 27
ivan3.setAge(30); //  можно напрямую поменять свойство ключа объекта age =>
ivan3.setAge(300); // получил: Недопустимое значение!
console.log(ivan3.getAge()); // получил: 30
ivan3.say(); // обратившись методу say(), выводим значения => получил: Имя пользователя: Ivan, возраст 30


// тоже самое можно сделать через классы!!!
class User4 {
	constructor(name, age) { // создаем новый объект со свойствами
		this.name = name;
		this._age = age; // _age - это специальный синтаксис для классов!!!
	}
	#surname = 'Petrychenko'; // при использовании #, свойство становится приватным!!!
	say = () => {
		console.log(`Имя пользователя: ${this.name} ${this.#surname}, возраст ${this._age}`);
	};
	get age() {
		return this._age;
	}
	set age(age) {
		if (typeof age === 'number' && age > 0 && age < 110) {
			this._age = age;
		} else {
			console.log('Недопустимое значение!');
		}
	}
}
const ivan4 = new User4('Ivan', 27);
console.log(ivan4.age); // получил: 27
ivan4.age = 99;
console.log(ivan4.age); // получил: 99
ivan4.say(); // получил: Имя пользователя: Ivan Petrychenko, возраст 99
console.log(ivan4.surname);  // получил: undefined в приватном свойстве