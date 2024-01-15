/* eslint-disable linebreak-style */
// MODAL----------------------------------------------------------
function Modal() {
	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modalWindow = document.querySelector('.modal');
	// const modalCloseBtn = document.querySelector('[data-close]'); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную переменную
	function openModalWindow() {
		modalWindow.classList.add('show');
		modalWindow.classList.remove('hide');
		document.body.style.overflow = 'hidden'; // при открытии модального окна, скрываем скролл страницы	
		clearInterval(modalTimerId); // если пользователь сам зарыл модальное окно, сбрасываем интервал его автооткрытия
	}
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModalWindow);
	}); 
	function closeModalWindow() {
		modalWindow.classList.add('hide');
		modalWindow.classList.remove('show');
		document.body.style.overflow = ''; // при закрытии модального окна, включаем скролл страницы
	}
	// modalCloseBtn.addEventListener('click', closeModalWindow); // для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ убираем данную часть
	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.getAttribute('data-close') == '') { // если по клику целевое событие совпадает с модальным окном, то модальное окно закрывается
			closeModalWindow();	// для ДЕЛЕГИРОВАНИЯ СОБЫТИЙ добавляем условие  || e.target.getAttribute('data-close') == '' т.е. когда в елементе есть data-close со значение пустой строки, кликаем на подложку или крестик - окно закрывается		
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) { // по клавише ESC закрывается окно
			closeModalWindow();
		}
	});
	const modalTimerId = setTimeout(openModalWindow, 60000); // функция автооткрытия модального окна
	function showModalWindowByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // отслеживаем сколько пикселей по оси Y отлистал пользователь + высота видимой части сравниваются с высотой/прокруткой всего контента
			openModalWindow(); // если они совпадают, то пользователь долистал до конца контена => открывается модальное окно, но при каждом долистовании!!!
			window.removeEventListener('scroll', showModalWindowByScroll); // как только пользователь долистал до конца, модальное окно выйдет только ОДИН РАЗ!!!! УДАЛЯЕМ ОБРАБОТЧИК!!!
		} // нужно избежать подобных повторов, но =>
	} // }, {once: true}); в данном случае не подходит, так как единоразовая прокрутка на 1px вызывает это условие!!!
	window.addEventListener('scroll', showModalWindowByScroll); // отслеживаем событие scroll во всем окне браузера
}
export default Modal;