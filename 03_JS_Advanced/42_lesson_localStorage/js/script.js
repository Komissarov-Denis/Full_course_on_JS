// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

//LOCAL STORAGE - это объект, позволяющий до 5Mb хранить информацию(настройки) в качестве базы данных, информация останется даже если перезагрузить страницу или отключить браузер

localStorage.setItem('number', 5); // первым аргументом передаем ключ - number, вторым его значение - 5.  (если есть такое значение, то оно перезапишется)
localStorage.removeItem('number'); // удаление ключа
localStorage.clear(); // очищаем все значения localStorage
console.log(localStorage.getItem('number')); // получаем значения от localStorage - 5

const checkbox = document.querySelector('#checkbox');
const form = document.querySelector('form');
const change = document.querySelector('#color');

if (localStorage.getItem('isChecked')) {
	checkbox.checked = true;
} // автоматическая проверка localStorage при повторном открытии страницы, и если там есть isChecked, то галочка автоматом проставляется
if (localStorage.getItem('bg') === 'changed') {
	form.style.backgroundColor = 'red';
} // автоматическая проверка localStorage при повторном открытии страницы, и если там есть bg: changed, то красный цвет автоматом высвечивается
checkbox.addEventListener('change', () => { // лучше применить событие change вместо click, так как идет изменение состояния checkbox
	localStorage.setItem('isChecked', true); // устанавливаем событие проверено - isChecked в ключ, с булиновым значением true
});

change.addEventListener('click', () => {
	if (localStorage.getItem('bg') === 'changed') {
		localStorage.removeItem('bg');
		form.style.backgroundColor = '#ffffff';
	} else {
		localStorage.setItem('bg', 'changed');
		form.style.backgroundColor = 'red';
	}
}); // функционал смены цвета с кнопкой Change color

const person = {
	name: 'Alex',
	age: 25,
};
const serializedPerson = JSON.stringify(person);
localStorage.setItem('Alex', serializedPerson);
console.log(JSON.parse(localStorage.getItem('Alex')));