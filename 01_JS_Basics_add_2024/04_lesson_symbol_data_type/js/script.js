'use strict';

// ТИП ДАННЫХ SYMBOL

const obj = {
	name: 'Test', // так как name строка, то допустимо прописывать 'name': 'Test'
	[Symbol('id3')]: 3, // синтаксис SYMBOL
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
console.log(id == id2); // получил false, независимо от одинакового описания символов, они не равны друг другу, это уникальные сущности!!!