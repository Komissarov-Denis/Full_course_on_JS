/* eslint-disable linebreak-style */
window.addEventListener('DOMContentLoaded', () => {

	// TABS-----------------------------------------------------------
	const tabs =  document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');
	function hideTabContent() { // функция скрывает часть табов
		tabsContent.forEach(item => {
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	}
	function showTabContent(i = 0) { // ES6 позволяет по умолчанию задать значение аргумента в "0"!!!
		// tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	hideTabContent();
	showTabContent();
	tabsParent.addEventListener('click', (event) => {
		const target = event.target; // ЧАСТОЕ ИСПОЛЬЗОВАНИЕ event.target УДОБНО ПЕРЕОПРЕДЕЛИТЬ В ПЕРЕМЕННУЮ!!!
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => { // для каждого элемента item (tab) с номером i в массиве
				if (target == item) { // если целевое событие соответствует этому элементу по клику
					hideTabContent();
					showTabContent(i); // при переключении tab скрываем остальные
				}
			});
		}
	});

	// TAIMER-(обратного отсчета)-------------------------------------
	const deadLine = '2023-12-31'; // переводим в миллисекунды строку, создав новую переменную в виде строки... setClock('.timer', deadLine);
	function getTimeRemaining(endTime) { // функция оставшегося времени определяет разницу между deadLine (endTime) и текущим временем (new Date())
		const t = Date.parse(endTime) - Date.parse(new Date()); // метод Date.parse - переводит строку в миллисекунды
		const days = Math.floor(t / (1000 * 60 * 60 * 24)); // Math.floor - округление до ближайшего целого (миллисек * сек * мин * час в сутках)!
		const hours = Math.floor((t / (1000 * 60 * 60) % 24)); // % - остаток от деления, например 50 / 24 = 2 дня и 2 часа, возвращаем 2 часа!
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);
		return { // создаем объект!!!
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	function getZero(num) { // функция подставления 0 до двузначного числа!!!
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector); // это div.timer так как setClock('.timer', deadLine);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000); // функция updateClock будет запускаться каждые 1000 миллисекунд
		updateClock(); // функция запускается один раз первоначально, для избежания мигания таймера, потом устанавливается setInterval в 1000 миллисекунд
		function updateClock () { // расчет времени на данную секунду, разница между планируемым временем и текущим
			const t = getTimeRemaining(endTime); // расчет времени запишется на страницу
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterval); // останавливаем таймер как только время выйдет, когда (new Date()) будет больше (endTime)
			}
		}
	}
	setClock('.timer', deadLine);

	// MODAL----------------------------------------------------------
	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modalWindow = document.querySelector('.modal');
	const modalCloseBtn = document.querySelector('[data-close]');
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
	modalCloseBtn.addEventListener('click', closeModalWindow);
	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow) { // если по клику целевое событие совпадает с модальным окном, то модальное окно закрывается
			closeModalWindow();			
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modalWindow.classList.contains('show')) { // по клавише ESC закрывается окно
			closeModalWindow();
		}
	});
	const modalTimerId = setTimeout(openModalWindow, 6000); // функция автооткрытия модального окна
	function showModalWindowByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // отслеживаем сколько пикселей по оси Y отлистал пользователь + высота видимой части сравниваются с высотой/прокруткой всего контента
			openModalWindow(); // если они совпадают, то пользователь долистал до конца контена => открывается модальное окно, но при каждом долистовании!!!
			window.removeEventListener('scroll', showModalWindowByScroll); // как только пользователь долистал до конца, модальное окно выйдет только ОДИН РАЗ!!!! УДАЛЯЕМ ОБРАБОТЧИК!!!
		} // нужно избежать подобных повторов, но =>
	} // }, {once: true}); в данном случае не подходит, так как единоразовая прокрутка на 1px вызывает это условие!!!
	window.addEventListener('scroll', showModalWindowByScroll); // отслеживаем событие scroll во всем окне браузера
		
	// CLASSES-for-CARDS--------------------------------------------------
	class MenuCards {
		constructor(srcImg, altText, title, descr, price, parentSelector) {
			this.srcImg = srcImg;
			this.altText = altText;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.transfer = 100; // курс доллара к рублю
			this.parentSelector = document.querySelector(parentSelector); // тут теперь лежит DOM  элемент!!!
			this.changeToRub(); // вызываем метод после построения всех свойств объекта
		}
		changeToRub() {
			this.price = +this.price * this.transfer;
		}
		render() { // классическое название для формирование верстки
			const element = document.createElement('div');
			element.innerHTML = `
				<div class="menu__item">
					<img src=${this.srcImg} alt=${this.altText}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
					</div>
				</div>
			`;
			this.parentSelector.append(element); // метод append() добавляет в container новый element
		}
	}
	new MenuCards(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container'
	).render(); // заполняем новый класс MenuCards с помощью метода render()
	new MenuCards(
		'img/tabs/elite.jpg',
		'elite',
		'Меню "Премиум"',
		'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'.menu .container'
	).render(); // заполняем новый класс MenuCards с помощью метода render()
	new MenuCards(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container'
	).render(); // заполняем новый класс MenuCards с помощью метода render()

});