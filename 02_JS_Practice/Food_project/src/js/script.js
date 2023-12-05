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
	const getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async в связи с асинхронностью выполнения
		const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные, но fetch сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
		// ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
		if (!result.ok) { // если с result что-то не то.... то
			throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выбрасываем новыю ошибку
		}
		return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
	};
	// getResources('http://localhost:3000/menu') => еще вариант формирования MenuCards
	// 	.then(data => createMenuCards(data));
	// function createMenuCards(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `					
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> руб./день</div>
	// 			</div>			
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
	getResources('http://localhost:3000/menu') // оптимизируем работу с карточками МЕНЮ
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
				new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
			});
		});
	// new MenuCards(    => заменили верстку динамическим формированием MenuCards с помощью запросов к серверу
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'first', // классы успешно добавляются
	// 	// 'first__green', // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render()
	// new MenuCards(
	// 	'img/tabs/elite.jpg',
	// 	'elite',
	// 	'Меню "Премиум"',
	// 	'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	21,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'second', // классы успешно добавляются
	// 	// 'second__blue', // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render()
	// new MenuCards(
	// 	'img/tabs/post.jpg',
	// 	'post',
	// 	'Меню "Постное"',
	// 	'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	14,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'third', // классы успешно добавляются
	// 	// 'third__red',  // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render()

	// SEND-FORMS--------------------------------------fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ 
	const forms = document.querySelectorAll('form');
	const message = {
		// loading: 'Загрузка...', // текст комментируем, так как будем использовать спиннер картинку
		loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
		success: 'Спасибо! Скоро с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
	};
	forms.forEach(item => { // берем все созданные формы и подвязываем функцию bindpostData
		bindPostData(item);
	});
	const postData = async (url, data) => { // function expression -  без объявления присваивается в переменную, postData отвечает за постинг данных при отправке на сервер + async в связи с асинхронностью выполнения
		const result = await fetch(url, { // в fetch(), url - указываем первым аргументом адрес сервера, data - данные, которые будут поститься - т.е. отправляем сформированный запрос + await для ожидания ответа от сервера
			method: 'POST',
			headers: {
				'Content-type': 'application/json' 
			},
			body: data,	// создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!	
		}); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные
		return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
	};
	function bindPostData(form) { // будем (bind) привязывать какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
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
			// const objectJson = {}; // создал новый объект для отправки данных в формате json
			// formData.forEach(function(value, key) { // forEach переберет все, что есть внутри formData и заполнит objectJson
			// 	objectJson[key] = value;
			// });
			// postData('http://localhost:3000/requests', JSON.stringify(objectJson)) // конвертируем оson в строку JSON с двойными ковычками =>
			// это упрощеная форма создания объекта objectJson, есть более элегантый способ  с помощью методов Json => берем formData и превращаем ее в массив массивов с помощью formData.entries(), 
			const json = JSON.stringify(Object.fromEntries(formData.entries())); // далее в классический объект Object.fromEntries(formData.entries(), а затем, переводим в формат JSON данные запроса через JSON.stringify(Object.fromEntries(formData.entries()))			
			postData('http://localhost:3000/requests', json)
			// .then(data => data.text()) // данная строка уже не нужна, она создается в postData асинхронной функции и уже там прописана внутри
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
	
	// SLIDER-------------------------------------ПРОСТОЙ ВАРИАНТ--------------------
	// const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице
	// const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
	// const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
	// const totalSlides = document.querySelector('#total'); // получаем значение элементов по идентификатору
	// const currentSlide = document.querySelector('#current'); // получаем значение элемента по идентификатору
	// let slideIndex = 1; // назначаем индекс каждому слайду
	// showSlides(slideIndex); // инициализируем функцию showSlides() со значением "1"
	// if (slides.length < 10) { // если количество слайдов меньше
	// 	totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
	// } else { // иначе
	// 	totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
	// }
	// function showSlides(n)  { // присваиваем порядковый номер каждому слайду "n"
	// 	if (n > slides.length) {// если количество слайдов slides.length меньше порядкового номера слайда "n"
	// 		slideIndex = 1; // если ушли в "правую границу" слайдов, то перемещаемся в самое "начало" => slideIndex = 1
	// 	}
	// 	if (n < 1) {// если порядковый номер слайда "n" меньше 1
	// 		slideIndex = slides.length; // если ушли в "левую границу" слайдов, то перемещаемся в самый "конец" => slideIndex = slides.length
	// 	}
	// 	slides.forEach(item => item.style.display = 'none'); // сначала скрываем все слайды на страничке
	// 	slides[slideIndex - 1].style.display = 'block' ; // потом по нажатию показываем нужный слайд, выбираем [slideIndex - 1] так как массив начинается с "0"
	// 	if (slides.length < 10) { // если количество слайдов меньше
	// 		currentSlide.textContent = `0${slideIndex}`; // то добавляем к порядковому значению слайда "0"
	// 	} else { // иначе
	// 		currentSlide.textContent = slideIndex; // просто записываем порядковое значение слайда
	// 	}
	// }
	// function plusSlide(n) { // перебираем слайды по нажатию на стрелочки
	// 	showSlides(slideIndex += n); // если n=1, то прибавляем, если n=-1, то отнимаем 
	// }
	// prev.addEventListener('click', () => { // при нажатии на стрелочку "влево", передаем в функцию plusSlide() минус один
	// 	plusSlide(-1);
	// });
	// next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", передаем в функцию plusSlide() плюс один
	// 	plusSlide(1);
	// });
	
	// CAROUSEL-------------------------------------БОЛЕЕ СЛОЖНЫЙ ВАРИАНТ------------
	const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице (length: 4)
	const slider = document.querySelector('.offer__slider'); // получаем весь блок слайдера
	const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
	const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
	const totalSlides = document.querySelector('#total'); // получаем общее значение элементов по идентификатору
	const currentSlide = document.querySelector('#current'); // получаем текущее значение элемента по идентификатору
	const slidesWrapper = document.querySelector('.offer__slider-wrapper'); // получаем блок-обертку слайдеров
	const sliderInner = document.querySelector('.offer__slider-inner'); // получаем дополнительно созданный блок, объединяющий в линию все слайды
	// const sliderInnerToggled = document.querySelector('.offer__slider-inner');
	const sliderWidth = window.getComputedStyle(slidesWrapper).width; // получаем значение ширины слайдера из блока-обёртки слайдов (применим для расчета ширины одного слайда) = 650px
	let slideIndex = 1; // назначаем индекс каждому слайду	
	let slideOffset = 0; // назначим отступ как ориентир сдвига слайдов
	if (slides.length < 10) { // если количество слайдов меньше
		totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
		currentSlide.textContent = `0${slideIndex}`;
	} else { // иначе
		totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
		currentSlide.textContent = slideIndex;
	}
	sliderInner.style.width = 100 * slides.length + '%'; // 100% значение ширины блока offer__slide умножаем на количество слайдов slides.length (это запись css стилей), чтобы слайды помещались в блок offer__slider-inner (получаем 400%)
	sliderInner.style.display = 'flex'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды выстроились в строку
	sliderInner.style.transition = '0.5s all'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды перемещались плавно
	slidesWrapper.style.overflow = 'hidden'; // ограничим отображение сверх блока offer__slider-wrapper
	slides.forEach(slide => { // ограничим ширину всех слайдов, обратившись к каждому слайду на странице, установив определенную ширину
		slide.style.width = sliderWidth; // получаем значение 650px
	});
	slider.style.position = 'relative'; // присваиваем значение всему блоку offer__slider 
	const dots = document.createElement('ol'); // создаем переменную dots для навигации по слайдеру в блоке ol нумерованного списка
	const dotsArr = []; // создаем массив для навигации по слайдеру (length: 4) [li, li, li, li]
	dots.classList.add('carousel-dots'); // добавляем в блок ol нумерованного списка класс carousel-dots и CSS стили
	dots.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(dots); // добавляем в слайдер блок ol нумерованного списка
	for (let i = 0; i < slides.length; i++) { // добавляем итератор +1 для всего количества слайдов
		const dot = document.createElement('li'); // каждому li - элементу нумерованного списка назначаем =>
		dot.setAttribute('data-slide-to', i + 1); // дата атрибут, т.е. нумерацию (массив начинается с нуля + 1, значит пойдет с единицы) и CSS стили
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		if (i == 0) { // если первая итерация =>
			dot.style.opacity = 1; // то к первому dot добавляем класс активности (opacity) непрозрачность
		}
		dots.append(dot); // добавляем в слайдер и в блок ol нумерованного списка, навигационные кнопки нумерованного списка
		dotsArr.push(dot); // связываем массив с точками(элементами) нумерованного списка в слайдере (push - добавлять в массив)
	}
	prev.addEventListener('click', () => { // при нажатии на стрелочку "влево",  смещаем слайд вправо на плюсовое значение slideOffset
		if (slideOffset == 0) { // после сравнения и выяснения, что у нас возвращен первый слайд, перемещаемся в самый конец
			slideOffset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1); // т.е. долистываем до самого начала блока слайдов и переключаемся на последний слайд - отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один) = 1950
			sliderInner.style.transition = '0.25s all';
		} else {
			slideOffset -= +sliderWidth.slice(0, sliderWidth.length - 2); // по нажатию срелочки "влево", к -slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
			sliderInner.style.transition = '0.5s all';
		}
		sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение плюсовое - сдвиг вправо 
		if (slideIndex == 1) { // если текущий slideIndex равен 1 
			slideIndex = slides.length; // присваиваем значение slideIndex количество слайдов
		} else {
			slideIndex--; // иначе уменьшаем на единицу
		}
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
		dotsArr.forEach(dot => dot.style.opacity = '.5');
		dotsArr[slideIndex - 1].style.opacity = 1; // так как массив начинается с 0, то slideIndex - 1 = 0
	});
	next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", смещаем слайд влево на минусовое значение slideOffset 
		if (slideOffset == +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1)) { // отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один) 
			sliderInner.style.transition = '0.25s all';
			slideOffset = 0; // т.е. долистываем до самого конца блока слайдов и переключаемся на первый слайд
		} else {
			sliderInner.style.transition = '0.5s all';
			slideOffset += +sliderWidth.slice(0, sliderWidth.length - 2); // когда мы нажимаем срелочку "вправо", к +slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину			
		}
		sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение минусовое - сдвиг влево 
		if (slideIndex == slides.length) { // если текущий slideIndex равен количеству слайдов
			slideIndex = 1; // присваиваем значение slideIndex единицу
		} else {
			slideIndex++; // иначе увеличиваем на единицу
		}
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
		dotsArr.forEach(dot => dot.style.opacity = '.5');
		dotsArr[slideIndex - 1].style.opacity = 1; // так как массив начинается с 0, то slideIndex - 1 = 0
	});
	dotsArr.forEach(dot => {
		dot.addEventListener('click', (e) => { // назначаем каждой из точек событие
			const slideTo = e.target.getAttribute('data-slide-to'); // присваиваем переменной slideTo новый атрибут data-slide-to
			slideIndex = slideTo; // присваиваем переменной slideIndex значение slideTo
			slideOffset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slideTo - 1);
			sliderInner.style.transform = `translateX(-${slideOffset}px)`;
			if (slides.length < 10) {
				currentSlide.textContent = `0${slideIndex}`;
			} else {
				currentSlide.textContent = slideIndex;
			}
			dotsArr.forEach(dot => dot.style.opacity = '.5');
			dotsArr[slideIndex - 1].style.opacity = 1; // так как массив начинается с 0, то slideIndex - 1 = 0
		});
	});
	

});