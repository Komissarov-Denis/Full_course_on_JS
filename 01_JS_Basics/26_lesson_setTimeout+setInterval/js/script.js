// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const timerId = setTimeout(function () {
	console.log('Hello!');
}, 2000); // запускает функцию через 2 секунды!!!

const timerId2 = setTimeout(function (text) {
	console.log(text);
}, 3000, 'Hello2!' ); // запускает функцию через 2 секунды!!!

const timerId3 = setTimeout(logger, 4000);
function logger() {
	console.log('text');
}

const timerId4 = setTimeout(logger2, 6000);
clearInterval(timerId4); // сброс таймаута
function logger2() {
	console.log('text2');
}

const btn = document.querySelector('.btn');
let timerId5;
let i = 0;
btn.addEventListener('click', () => {
	// const timerId5 = setTimeout(logger3, 4000);
	timerId5 = setInterval(logger3, 500); // setInterval не ждет окончания logger3 (вызываемой функции), и следущий шаг выполнится по истечсении 500мс!
});
function logger3() {
	if (i === 3) {
		clearInterval(timerId5);
	}
	console.log('text3');
	i++;
}

// рекурсивный вызов setTimeout
let id = setTimeout(function log() {
	console.log('Hello!');
	id = setTimeout(log, 500); // тут каждый setTimeout будет ждать 500мс до выполнения внутреннего setTimeout
}, 500);

const btn2 = document.querySelector('.btn');
function myAnimation() {
	const elem = document.querySelector('.box');
	let position = 0; // начальная позиция кубика
	const id = setInterval(frame, 10); // 10 мс задержки для плавного движения кубика
	function frame() {
		if (position == 300) { // конечная отметка движения синего кубика
			clearInterval(id);
		} else {
			position++; // меняем координаты кубика на каждом шаге
			elem.style.top = position + 'px'; // записываем новые координаты кубика на каждом шаге
			elem.style.left = position + 'px';
		}
	}
}
btn2.addEventListener('click', myAnimation); // вызываем функцию через событие click по кнопке