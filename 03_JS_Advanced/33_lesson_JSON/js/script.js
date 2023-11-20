// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const person = {
	name: 'Alex',
	tel: '+7444444444',
};
console.log(JSON.stringify(person)); // подготовка для передачи данных на сервер, все значения в двойных кавычках "" - {"name":"Alex","tel":"+7444444444"}!!!
console.log(JSON.parse(JSON.stringify(person))); // получаем обратно самый обычный объект - { name: 'Alex', tel: '+7444444444' }!!!

const person2 = {
	name: 'Alex',
	tel: '+7444444444',
	parents: {
		mom: 'Olga',
		dad: 'Mike',
	}
};
const clone = JSON.parse(JSON.stringify(person2)); // ОЧЕНЬ УДОБНЫЙ МЕТОД ДЛЯ ГЛУБИННОГО КЛОНИРОВАНИЯ/КОПИРОВАНИЯ ОБЪЕКТОВ!!!!
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