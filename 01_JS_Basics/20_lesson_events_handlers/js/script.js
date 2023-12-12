// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';


// Обработчик события - это функция, которая срабатывает как только событие произошло
// <button onclick="alert('Click')" id="btn">Нажми меня!</button> // onclick - обработчик событий, alert - функция

const btn = document.querySelector('button');

btn.onclick = function() {
	alert('Click');
}; // неудачный пример, в результате которого может поломаться функционал!!!
btn.onclick = function() {
	alert('Second click');
}; // самый оптимальный вариант: =>

btn.addEventListener('click', function() {
	alert('click'); // click - аргумент, function - коллбэк функция!!!
});
btn.addEventListener('click', function() {
	alert('Second click'); // события в JS выполняются по порядку поступления
});

btn.addEventListener('mouseenter', function(event) {
	console.log(event); // (event) или (е) - событие отрабатывает при наведении мыши!!!!
	console.log(event.target); // по (event.target) получаем доступ к объекту!!!
	event.target.remove(); // удаляет элемент при наведении
	// console.log('Hover');
});

btn.addEventListener('click', function(event) {
	console.log(event); // (event) или (е) - событие отрабатывает при клике мыши!!!
	console.log(event.target); // по (event.target) получаем доступ к объекту!!!
	event.target.remove(); // удаляет элемент при клике
	// console.log('Hover');
});

let i = 0;
const deleteElement1 = function(e) {
	console.log(e.target);
	i++;
	if (i == 1) {
		btn.removeEventListener('click', deleteElement1); // обработчик применяемый только раз с последующим удалением
	}
};
btn.addEventListener('click', deleteElement1);

const btn2 = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const deleteElement2 = function(e) {
	console.log(e.currentTarget);
	console.log(e.type);
};
btn2.addEventListener('click', deleteElement2);
overlay.addEventListener('click', deleteElement2);
// ВСПЛЫТИЕ СОБЫТИЙ - ЭТО КОГДА ОБРАБОТЧИК ОТРАБАТЫВАЕТ НА САМОМ ЭЛЕМЕНТЕ,
// ПОТОМ НА РОДИТЕЛЕ, ПОТОМ УХОДИТ НА УРОВНИ ВЫШЕ И ВЫШЕ ПО ИЕРАРХИИ!!!

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
	e.preventDefault(); // для отмены стандартного поведения браузера!!!!
	// ПОМЕЩАЕТСЯ В САМОЕ НАЧАЛО КОДА ОБРАБОТЧИКА СОБЫТИЙ!!!!
	// в данном случае не переходит по ссылке, а выводит в консоль!
	console.log(e.target);
});

// навесить функцию на множество элементов:
const deleteElement3 = function(e) {
	console.log(e.currentTarget);
	console.log(e.type);
};
const btns = document.querySelectorAll('button');
btns.forEach(btn => {
	btn.addEventListener('click', deleteElement3, {once: true}); // {once: true} - опции события!!!
});