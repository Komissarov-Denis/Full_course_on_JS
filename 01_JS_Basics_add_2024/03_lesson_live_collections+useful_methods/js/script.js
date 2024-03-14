'use strict';

// УСТАРЕВШИЕ МЕТОДЫ ПОЛУЧЕНИЯ ДАНННЫХ СТРАНИЦЫ getElementsByClassName

const boxesQuery = document.querySelectorAll('.box'); // получает статичные коллекции - оптимальный современный метод!!!
const boxesGet = document.getElementsByClassName('box'); // получает живые коллекции - устаревший способ!!!

console.log(boxesQuery); // получил: NodeList(3) [div.box, div.box, div.box] - тут методов гораздо больше как в узловом элементе
console.log(boxesGet); // получил: HTMLCollection(3) [div.box, div.box, div.box]
console.log(document.body.children); // получил: HTMLCollection(4) [div.box, div.box, div.box, script]


// ЖИВЫЕ И СТАТИЧЕСКИЕ КОЛЛЕКЦИИ
boxesQuery[0].remove();
// получил:NodeList(3) [div.box, div.box, div.box] - псевдомассив с тремя элементами, тут получили состояние элементов на момент вызова команды querySelectorAll() - это слепок того что было, СТАТИЧНАЯ КОЛЛЕКЦИЯ!!!
// 0: div.box 
// 1: div.box
// 2: div.box
// length: 3
// [[Prototype]]: NodeList

boxesGet[0].remove();
// получил:
// HTMLCollection(3) [div.box, div.box, div.box]  - псевдомассив с одним элементом, тут отслеживаются все изменения в DOM дереве и дает текущий результат, тут ЖИВАЯ КОЛЛЕКЦИЯ!!!
// 0: div.box
// length: 1
// [[Prototype]]: HTMLCollection


console.log(Array.from(boxesGet)); // метод Array.from() позволяет создать массив из массивоподобного объекта!!!
// получил: 
// [div.box]
// 0: div.box
// length: 1
// [[Prototype]]: Array(0)

for (let i = 0; i < 5; i++) { // удобно добавлять новые блоки на страницу
	const wrapper = document.querySelector('.wrapper');
	const newDiv = document.createElement('div');
	newDiv.classList.add('box');
	wrapper.append(newDiv);
}

// МЕТОД matches() - ищет совпадения
boxesQuery.forEach(box => {
	if (box.matches('.this')) // метод matches() ищет совпадения по классу
		console.log(box); // получил: <div class="box this"></div>
});

// МЕТОД closest() - поиск ближайшего элемента по всей цепочке родителей "наверх" 
console.log(boxesQuery[0].closest('.wrapper')); // получил: div.wrapper