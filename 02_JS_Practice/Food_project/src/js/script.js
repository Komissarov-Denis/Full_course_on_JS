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
		
	// CLASSES-for-CARDS--------------------------------------------------
	class MenuCards {
		constructor(srcImg, altText, title, descr, price, parentSelector, ...classes) { // добавил REST оператор, так как не известно - будут ли еще изменения в карточках меню
			this.srcImg = srcImg;
			this.altText = altText;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.transfer = 100; // курс доллара к рублю
			this.classes = classes;
			this.parentSelector = document.querySelector(parentSelector); // тут теперь лежит DOM  элемент!!!			
			this.changeToRub(); // вызываем метод после построения всех свойств объекта
		}
		changeToRub() {
			this.price = +this.price * this.transfer;
		}
		render() { // классическое название для формирование верстки
			const element = document.createElement('div');
			if (this.classes.length === 0 ) { // если у массива this.classes нет классов, то присваиваем класс menu__item всем div элементам
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else { // если у массива this.classes хоть один класс присутствует, то добавляем класс
				this.classes.forEach(className => element.classList.add(className)); // для каждого элемента массива обращаемся к classList созданного в element div и добавляю каждый класс, который находится в массиве className				
			}
			element.innerHTML =`					
				<img src=${this.srcImg} alt=${this.altText}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
				</div>				
			`;
			this.parentSelector.append(element); // метод append() добавляет в container новый element				
			// console.log(this.classes);
		}
	}
	new MenuCards(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item',  // классы успешно добавляются
		// 'first', // классы успешно добавляются
		// 'first__green', // классы успешно добавляются
	).render(); // заполняем новый класс MenuCards с помощью метода render()
	new MenuCards(
		'img/tabs/elite.jpg',
		'elite',
		'Меню "Премиум"',
		'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		14,
		'.menu .container',
		'menu__item',  // классы успешно добавляются
		// 'second', // классы успешно добавляются
		// 'second__blue', // классы успешно добавляются
	).render(); // заполняем новый класс MenuCards с помощью метода render()
	new MenuCards(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		21,
		'.menu .container',
		'menu__item',  // классы успешно добавляются
		// 'third', // классы успешно добавляются
		// 'third__red',  // классы успешно добавляются
	).render(); // заполняем новый класс MenuCards с помощью метода render()

	// // SEND-FORMS----------------------------------------------------XMLHttpRequest()
	// const forms = document.querySelectorAll('form');
	// const message = {
	// 	// loading: 'Загрузка...',
	// 	loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
	// 	success: 'Спасибо! Скоро с Вами свяжемся!',
	// 	failure: 'Что-то пошло не так...',
	// };
	// forms.forEach(item => { // берем все созданные формы и подвязываем функцию postData
	// 	postData(item);
	// });
	// function postData(form) { // передавать будем какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
	// 	form.addEventListener('submit', (e) => {
	// 		e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера
	// 		// const statusMessage = document.createElement('div'); // создаем блок для сообщений
	// 		const statusMessage = document.createElement('img'); // вместо блока теперь будем использовать картинку спиннера
	// 		// statusMessage.classList.add('status'); // добавляем класс блоку сообщений
	// 		statusMessage.src = message.loading; // используем путь к спиннеру
	// 		statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
	// 		statusMessage.style.cssText = `
	// 			display: block;
	// 			margin: 0 auto;
	// 		`; // добавляем стили спиннеру
	// 		// form.append(statusMessage); // к форме добавляем это сообщение 'Загрузка...'
	// 		form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement()!!!
	// 		const request = new XMLHttpRequest(); // создаем новый объект для формирования документа запроса
	// 		request.open('POST', 'server.php');
	// 		// request.setRequestHeader('Content-type', 'multipart/form-data'); // задаем заголовок контента для php...НО, В СВЯЗКЕ XMLHttpRequest() И FormData() - ЗАГОЛОВОК УСТАНАВЛИВАТЬ НЕ НУЖНО!!!
	// 		request.setRequestHeader('Content-type', 'application/json'); // задаем заголовок контента для отправки в формате json, если этого затребует бэкэндер
	// 		const formData = new FormData(form); // FormData(form) отыскивает в html атрибут name в тегах input всех форм, без него работать не будет!!!
	// 		const objectJson = {}; // сождал новый объект для отправки данных в формате json
	// 		formData.forEach(function(value, key) { // forEach переберет все, что есть внутри formData и заполнит objectJson
	// 			objectJson[key] = value;
	// 		});
	// 		const json = JSON.stringify(objectJson); // конвертируем objectJson в строку JSON с двойными ковычками
	// 		request.send(json); // отправляем запрос в формате json
	// 		// request.send(formData); // отправляем вновь созданный объект formData КОММЕНТИРУЕМ/РАЗКОММЕНТИРУЕМ НУЖНЫЙ ФОРМАТ ОТПРАВКИ php/json
	// 		request.addEventListener('load', () => {
	// 			if (request.status === 200) {
	// 				console.log(request.response);
	// 				// statusMessage.textContent = message.success; // и так как statusMessage теперь стал DOM узлом на странице html, помещаем соощение 'Спасибо! Скоро с Вами свяжемся!'
	// 				showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
	// 				form.reset(); // очищаем форму после выведением сообщения
	// 				// setTimeout(() => { // после делегирования событий функции showThanksModal убираем setTimeout(),
	// 				statusMessage.remove(); //  так как statusMessage.remove() будет использоваться для loading спиннера, который будет отображаться на странице
	// 				// }, 4000); // очистка формы через 4 секунды
	// 			} else {
	// 				// statusMessage.textContent = message.failure; // если произошел сбой, то помещаем 'Что-то пошло не так...'
	// 				showThanksModal(message.failure);// вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
	// 			}
	// 		});
	// 	}); 
	// }
	// function showThanksModal(message) { // создаем функцию динамической замены элементов мадального окна с отправкой сообщения message
	// 	const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент modal__dialog
	// 	prevModalDialog.classList.add('hide'); // добавляем класс hide элементу modal__dialog
	// 	openModalWindow(); // команда открытия модальных окон
	// 	const thanksModal = document.createElement('div'); // создаем новый контент обертку
	// 	thanksModal.classList.add('modal__dialog'); // будем заменять один modal__dialog другим с новым контентом
	// 	thanksModal.innerHTML = ` 
	// 		<div class="modal__content">
	// 			<div class="modal__close" data-close>&times;</div>
	// 			<div class="modal__title">${message}</div>
	// 		</div>
	// 	`; // создаем новый контент и в первоначальном скрипте (MODAL----) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
	// 	document.querySelector('.modal').append(thanksModal); // помещаем новое модальное окно на страницу
	// 	setTimeout(() => { // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок modal__dialog, применим асинхронную операцию setTimeout()
	// 		thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
	// 		prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна modal__dialog
	// 		prevModalDialog.classList.remove('hide');
	// 		closeModalWindow(); // закрываем модальное окно, чтобы не мешать пользователю
	// 	}, 4000);
	// }

	// SEND-FORMS--------------------------------------fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ 
	const forms = document.querySelectorAll('form');
	const message = {
		// loading: 'Загрузка...', // текст комментируем, так как будем использовать спиннер картинку
		loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
		success: 'Спасибо! Скоро с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
	};
	forms.forEach(item => { // берем все созданные формы и подвязываем функцию postData
		postData(item);
	});
	function postData(form) { // передавать будем какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
		form.addEventListener('submit', (e) => {
			e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера
			// const statusMessage = document.createElement('div'); // создаем блок для сообщений
			const statusMessage = document.createElement('img'); // вместо блока теперь будем использовать картинку спиннера
			// statusMessage.classList.add('status'); // добавляем класс блоку сообщений
			statusMessage.src = message.loading; // используем путь к спиннеру
			statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`; // добавляем стили спиннеру
			// form.append(statusMessage); // к форме добавляем это сообщение 'Загрузка...'
			form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement() - вставить соседний элемент ()!!!
			const formData = new FormData(form); // FormData(form) отыскивает в html атрибут name в тегах input всех форм, без него работать не будет!!!			
			const objectJson = {}; // сождал новый объект для отправки данных в формате json
			formData.forEach(function(value, key) { // forEach переберет все, что есть внутри formData и заполнит objectJson
				objectJson[key] = value;
			});
			fetch('server.php', { // создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!
				method: 'POST',
				headers: {
					'Content-type': 'application/json' // закомментировал, так как пока не JSON отправляем!!!
				},
				body: JSON.stringify(objectJson), // конвертируем objectJson в строку JSON с двойными ковычками
			})	
				.then(data => data.text())
				.then(data => { // сервер вернет данные data, пока это не JSON
					console.log(data); // берем data данные, которые вернул сервер из PROMISE (успешный исход)
					showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
					statusMessage.remove(); // удаляем наш спинер по выполнению PROMISE
				}).catch(() => { // catch метод обязательно нужно прописывать для обратоток ошибок!!!
					showThanksModal(message.failure);// вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!				
				}).finally(() => { // finally метод обязательно нужно прописывать для обратоток оконечных действий
					form.reset(); // очищаем форму после выведением сообщения				
				});
		}); 
	}
	function showThanksModal(message) { // создаем функцию динамической замены элементов мадального окна с отправкой сообщения message
		const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент modal__dialog
		prevModalDialog.classList.add('hide'); // добавляем класс hide элементу modal__dialog
		openModalWindow(); // команда открытия модальных окон
		const thanksModal = document.createElement('div'); // создаем новый контент обертку
		thanksModal.classList.add('modal__dialog'); // будем заменять один modal__dialog другим с новым контентом
		thanksModal.innerHTML = ` 
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`; // создаем новый контент и в первоначальном скрипте (MODAL----) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
		document.querySelector('.modal').append(thanksModal); // помещаем новое модальное окно на страницу
		setTimeout(() => { // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок modal__dialog, применим асинхронную операцию setTimeout()
			thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
			prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна modal__dialog
			prevModalDialog.classList.remove('hide');
			closeModalWindow(); // закрываем модальное окно, чтобы не мешать пользователю
		}, 4000);
	}

});