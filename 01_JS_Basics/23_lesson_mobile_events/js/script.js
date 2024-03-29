// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// События на мобильном браузере срабатывают:
// touchstart - при клике/табе по элементу на экране
// touchmove - при перемещении по элементу на экране
// touchend - при снятии пальца с элемента на экране
// touchenter - при ведении пальца по эрану и наскальзыванию на элемент
// touchleave - при ведении пальца по эрану и соскальзыванию с элемента
// touchcancel - при отсутствии регистрации пальца на поверхности экрана внутри браузера
// touches - список всех пальцев, взаимодействующих с экраном
// targetTouches - список всех пальцев, взаимодействующих с данным элементом на экране
// changedTouches - список всех пальцев, участвующих в событии

window.addEventListener('DOMContentLoaded', () => { // запуск скриптов JS после загрузки станицы!!! РЕКОМЕНДУЕТСЯ УКАЗЫВАТЬ!!!

	const box = document.querySelector('.box');
	box.addEventListener('touchstart', (e) => {
		e.preventDefault(); // при назначении мобильного события - обязательно ставим, для отмены стандартного поведения браузера!!!
		console.log('Start!');
		console.log(e.touches);
		console.log(e.targetTouches);
	});
	box.addEventListener('touchmove', (e) => {
		e.preventDefault(); // при назначении мобильного события - обязательно ставим, для отмены стандартного поведения браузера!!!
		console.log('Move!');
		console.log(e.targetTouches[0].pageX); // получаем координаты при движении пальца по оси Х экрана
	});
	box.addEventListener('touchend', (e) => {
		e.preventDefault(); // при назначении мобильного события - обязательно ставим, для отмены стандартного поведения браузера!!!
		console.log('End!');
	});
	
});