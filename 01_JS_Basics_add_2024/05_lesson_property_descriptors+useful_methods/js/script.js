'use strict';

// ФЛАГИ:
// WRITABLE - перезаписываемые, если флаг стоит в позиции true, то свойство объекта можно будет изменить, false - наоборот
// ENUMERABLE - если флаг стоит в позиции true, то свойство объекта будет перечисляться в циклах, false - наоборот
// CONFIGURABLE - если флаг стоит в позиции true, то свойство объекта можно будет удалить, а атрибуты можно изменить, false - наоборот

const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/1993',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
};
console.log(Object.getOwnPropertyDescriptor(user, 'name')); // метод Object.getOwnPropertyDescriptor() - первый аргумент: объект, второй аргумент: ключевое свойство, на котором буду применяться флаги!!!
// получил:
// {value: 'Alex', writable: true, enumerable: true, configurable: true}
// configurable: true
// enumerable: true
// value: "Alex"
// writable: true
// [[Prototype]]: Object

Object.defineProperty(user, 'name', {writable: false}); // метод Object.defineProperty() позволяет изменить флаги - первый аргумент: объект, второй аргумент: ключевое свойство, на котором буду применяться флаги, третий - сам флаг!!!
// user.name = 'asdsdvbsfbds'; // получил: script.js:26  Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>' at script.js:26:11

// Создадим новое свойство
Object.defineProperty(user, 'gender', {value: 'male'}); // метод Object.defineProperty() все ключевые флаги опционально выставил в false при ручном создании свойств объекта!!!
console.log(Object.getOwnPropertyDescriptor(user, 'gender'));
// получил: 
// {value: 'male', writable: false, enumerable: false, configurable: false}
// configurable: false
// enumerable: false
// value: "male"
// writable: false
// [[Prototype]]: Object