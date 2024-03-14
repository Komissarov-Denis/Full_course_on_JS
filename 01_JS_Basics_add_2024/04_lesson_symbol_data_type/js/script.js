'use strict';

// ТИП ДАННЫХ SYMBOL

let id4 = Symbol('id4');
const obj = {
	name: 'Test', // так как name строка, то допустимо прописывать 'name': 'Test'
	[Symbol('id3')]: 3, // синтаксис SYMBOL
	[id4]: 10,
	getId: function() { // этот метод позволяет получать доступ к приватному Symbol('id4'); и возвращать данные наружу!!! 
		return this[id4];
	}
};
let id = Symbol('id');
obj[id] = 1;
console.log(obj[id]); // получил: 1
console.log(obj['id']); // получил: undefined, так как обращаемся к свойству объекта через строчку!!!
console.log(obj);
// получил:
// {name: 'Test', Symbol(id): 1}
// name: "Test"
// Symbol(id): 1
// [[Prototype]]: Object

let id2 = Symbol('id');
console.log(id == id2); // получил: false, независимо от одинакового описания символов, они не равны друг другу, это уникальные сущности!!!
// console.log(obj[id3]); // получил: script.js:22  Uncaught ReferenceError: id3 is not defined at script.js:22:17 - это основная причина введения SYMBOL - они создают скрытые для обычного доступа свойства, которые не показываются при переборе объекта!!!

for (let value in obj) {
	console.log(value);  // получил: только одно свойство name, а Symbol является приватным свойством!!!
}

console.log(obj.getId()); // получил: 10

console.log(Object.getOwnPropertySymbols(obj));
// получил:
// (3) [Symbol(id3), Symbol(id4), Symbol(id)]
// 0: Symbol(id3)
// 1: Symbol(id4)
// 2: Symbol(id)
// length: 3
// [[Prototype]]: Array(0)

console.log(obj[Object.getOwnPropertySymbols(obj)[0]]); // получил: 3