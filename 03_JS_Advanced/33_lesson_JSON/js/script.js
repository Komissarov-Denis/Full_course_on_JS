// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// JSON - JavaScript Object Notation  — текстовый формат обмена данными с сервером, основанный на JavaScript.

// Методы:
// JSON.stringify() для преобразования объектов в JSON
// JSON.parse() для преобразования JSON обратно в объект

const person = {
	name: 'Alex',
	tel: '+7444444444',
}; // напрямую нет возможности передавать данные объекта на сервер, для этого применяется => 
console.log(JSON.stringify(person)); // подготовка для передачи данных на сервер, все значения переводятся в двойные кавычки "" - {"name":"Alex","tel":"+7444444444"}!!!
console.log(JSON.parse(JSON.stringify(person))); // получаем обратно самый обычный объект - {name: 'Alex', tel: '+7444444444'}!!!


const person2 = {
	name: 'Alex',
	tel: '+7444444444',
	parents: {
		mom: 'Olga',
		dad: 'Mike',
	}
};
const clone = JSON.parse(JSON.stringify(person2)); // ОЧЕНЬ УДОБНЫЙ МЕТОД ДЛЯ ГЛУБИННОГО КЛОНИРОВАНИЯ/КОПИРОВАНИЯ ОБЪЕКТОВ!!!
console.log(clone);
clone.parents.mom = 'Ann';
console.log(person2);
console.log(clone);

// ПОЛУЧИЛ:
// {
// 	name: 'Alex',
// 	tel: '+7444444444',
// 	parents: { mom: 'Olga', dad: 'Mike' }
// }
// {
// 	name: 'Alex',
// 	tel: '+7444444444',
// 	parents: { mom: 'Olga', dad: 'Mike' }
// }
// {
// 	name: 'Alex',
// 	tel: '+7444444444',
// 	parents: { mom: 'Ann', dad: 'Mike' }
// }

const json = JSON.stringify(Object.fromEntries(formData.entries())); // пример конвертации запросов из проекта FOOD
const obj = {a: 23, b: 50};
console.log(Object.entries(json));
console.log(Object.entries(obj)); // получил [ [ 'a', 23 ], [ 'b', 50 ] ] массив массивов
console.log(Object.fromEntries(Object.entries(obj))); // получил { a: 23, b: 50 } конвертировал обратно в объект