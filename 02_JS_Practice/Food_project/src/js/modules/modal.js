// MODAL----------------------------------------------------------
function openModalWindow(modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.add('show');
	modalWindow.classList.remove('hide');
	document.body.style.overflow = 'hidden'; // при открытии модального окна, скрываем скролл страницы
	// console.log(modalTimerId);
	if (modalTimerId) { // если modalTimerId был передан, то только тогда будет запускаться clearInterval()
		clearInterval(modalTimerId); // если пользователь сам закрыл модальное окно, сбрасываем интервал его автооткрытия
	}	
}
function closeModalWindow(modalSelector) {
	const modalWindow = document.querySelector(modalSelector);
	modalWindow.classList.add('hide');
	modalWindow.classList.remove('show');
	document.body.style.overflow = ''; // только при закрытии модального окна, включается скролл страницы
}
function modal(triggerSelector, modalSelector, modalTimerId) { // => modal('[data-modal]', '.modal', modalTimerId); добавим два аргумента triggerSelector, modalSelector для инкапсуляции 
	const modalTrigger = document.querySelectorAll(triggerSelector); // '[data-modal]'
	const modalWindow = document.querySelector(modalSelector); // '.modal'
	// const modalCloseBtn = document.querySelector('[data-close]'); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную переменную
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId)); // переданная в обработчик события коллбэк функция openModalWindow(modalSelector)) не дожна сразу вызываться, а просто объявляться, () => стрелочная функция оборачивает коллбэк и вызывает его по клику
	});
	// modalCloseBtn.addEventListener('click', closeModalWindow); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную часть
	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') { // если куда кликнул пользователь (целевое событие) совпадает с модальным окном, то модальное окно закрывается
			closeModalWindow(modalSelector); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ добавляем условие  || e.target.getAttribute('data-close') == '' т.е. когда в елементе есть data-close со значением пустой строки, кликаем на подложку или крестик - окно закрывается		
		}
	});
	document.addEventListener('keydown', (e) => { // событие по нажатию клавиши 
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) { // метод code === 'Escape' отслеживает keydown - событие по нажатию клавишы ESC, что закрывает модальное окно
			closeModalWindow(modalSelector); // также modalWindow.classList.contains('show')) проверяет наличие открытого модального окна, чтобы отработала функция closeModalWindow()
		}
	});
	function showModalWindowByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // отслеживаем сколько пикселей по оси Y отлистал пользователь + высота видимой части сравниваются с высотой/прокруткой всего контента минус один пиксель
			openModalWindow(modalSelector, modalTimerId); // если они совпадают, то пользователь долистал до конца контена => открывается модальное окно, но при каждом долистовании!!!
			window.removeEventListener('scroll', showModalWindowByScroll); // как только пользователь долистал до конца, модальное окно выйдет только ОДИН РАЗ!!! УДАЛЯЕМ ОБРАБОТЧИК за счет removeEventListener()!!!
		} // нужно избежать подобных повторов, но =>
	} // }, {once: true}); в данном случае не подходит, так как единоразовая прокрутка на 1px вызывает это условие!!!
	window.addEventListener('scroll', showModalWindowByScroll); // отслеживаем событие scroll во всем окне браузера
}
export default modal;
export {openModalWindow};
export {closeModalWindow};