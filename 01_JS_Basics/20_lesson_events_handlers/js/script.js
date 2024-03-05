// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';


// ОБРАБОТЧИК СОБЫТИЯ - это функция, которая срабатывает как только событие произошло!!!
// <button onclick="alert('Click')" id="btn">Нажми меня!</button> - не лучший способ на html странице прописывать обрабочик событий
// onclick - обработчик событий, alert - функция

const btn = document.querySelector('button');

btn.onclick = function() {
	alert('Click');
};
btn.onclick = function() {
	alert('Second click');
}; // неудачный пример, в результате которого может поломаться функционал, так как обработчик события не удаляется после выполнения!!!

// самый оптимальный вариант => использовать КОЛЛБЭК ФУНКЦИЮ
btn.addEventListener('click', function() { // click - аргумент, function() - коллбэк функция!!!
	alert('click');
});
btn.addEventListener('click', function() {
	alert('Second click'); // события в JS выполняются по порядку поступления в очередь!!!
});

btn.addEventListener('mouseenter', function(event) { // событие mouseenter - наведение на елемент страницы
	console.log(event); // (event) или (е) - событие отрабатывает при наведении мыши!!!!
	console.log(event.target); // по (event.target) получаем доступ к елементу страницы!!!
	event.target.remove(); // удаляет элемент при наведении
	// console.log('Hover');
});

btn.addEventListener('click', function(event) {
	console.log(event); // (event) или (е) - событие отрабатывает при клике мыши!!!
	console.log(event.target); // по (event.target) получаем доступ к елементу страницы!!!
	event.target.remove(); // удаляет элемент при клике
	// console.log('Hover');
});


let i = 0;
const deleteElement1 = function(e) {
	console.log(e.target);
	i++;
	if (i == 1) {
		btn.removeEventListener('click', deleteElement1); // нажал на кнопку, обработчик выполнился только раз и кнопка удалилась 
	}
};
btn.addEventListener('click', deleteElement1); 


const btn2 = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const deleteElement2 = function(e) {
	console.log(e.currentTarget); // currentTarget указывает на всплытие событий на уровень выше
	console.log(e.type);
};
btn2.addEventListener('click', deleteElement2);
overlay.addEventListener('click', deleteElement2);
// ВСПЛЫТИЕ СОБЫТИЙ - ЭТО КОГДА ОБРАБОТЧИК ОТРАБАТЫВАЕТ НА САМОМ ЭЛЕМЕНТЕ,
// ПОТОМ НА РОДИТЕЛЕ, ПОТОМ УХОДИТ НА УРОВНИ ВЫШЕ И ВЫШЕ ПО ИЕРАРХИИ!!!


const link = document.querySelector('a');
link.addEventListener('click', (e) => {
	e.preventDefault(); // для отмены стандартного поведения браузера preventDefault()!!! ОЧЕНЬ РАСПРОСТРАНЕННЫЙ ВАРИАНТ!!!
	// ПОМЕЩАЕТСЯ В САМОЕ НАЧАЛО КОДА ОБРАБОТЧИКА СОБЫТИЙ!!! в данном случае не переходит по ссылке, а выводит в консоль!!!
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