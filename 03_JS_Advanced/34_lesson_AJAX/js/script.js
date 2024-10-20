// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// AJAX (аббревиатура от «Asynchronous Javascript And Xml») – технология обращения к серверу без перезагрузки страницы и является асинхронным кодом!!!
// За счёт этого уменьшается время отклика и веб-приложение по интерактивности больше напоминает десктоп. 
// Несмотря на то, что в названии технологии присутствует буква X (от слова XML), использовать XML вовсе не обязательно
// Методы технологии AJAX:
// open(method, url, async: true/false, login, pass) - раскрывает основные параметры запроса!!! Первый аргумент: запрос к серверу 'GET'/'POST'/'PATCH'..., второй - путь к файлу, третий - асинхронность, четвертый - логин, пятый - пароль
// send(body) - если мы применяем open('POST'), то при отправке данных на сервер заполняется аргумент body в методе send(), при 'GET' аргумент body не применяется
// асинхронность возврата данных от сервера подразумевает задержки

// toFixed(2) - приводит к двум знакам после точки (округляет)

// свойства объекта:
// status - статус запроса (различные ошибки 404, 507, 402, 603, 201, 200 ОК)
// statusText - статус как описание ошибки "ОК" / "Request terminated"...
// response - ответ от сервера, который задается бэкенд разработчик и то, что мы будем использовать на клиенте
// responseText
// readyState - содержит текущее состояние запроса (идут под цифрами от 0 до 4):
// 0 - UNSENT - Объект был создан. Метод open() ещё не вызывался.
// 1 - OPENED - Метод open() был вызван.
// 2 - HEADERS_RECEIVED - Метод send() был вызван, доступны заголовки (headers) и статус.
// 3 - LOADING - Загрузка; responseText содержит частичные данные.
// 4 - DONE - Операция полностью завершена.

// события объекта:
// readystatechange - событие, отслеживающее статус готовности запроса в данный текущий момент
// load - событие по загрузке запроса

const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');

// inputRub.addEventListener('change'); // событие change возникает, когда inputRub уходит из фокуса (кликаем на другой input)
inputRub.addEventListener('input', () => { // 'input' - более универсальное событие, срабатывает при клике в поле input
	const request = new XMLHttpRequest(); // с помощью конструктора new XMLHttpRequest() создаем новый объект request{}
	request.open('GET', 'js/current.json'); // метод open() собирает настройки для запроса
	request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // заголовок для передачи JSON файла
	request.send(); // запрос отправки данных
	request.addEventListener('readystatechange', () => { // readystatechange поэтапно вызывается несколько раз, пока не пройдет все стадии readyState от 0 до 4
		if (request.readyState === 4 && request.status === 200) { // проверяем по условию статус готовности - readyState равный 4 и status - статус запроса равный 200 выполнен
			console.log(request.response);
			// получил:
			// {
			// 	"current": {
			// 		"usd": 74
			// 	}
			// }
			const data = JSON.parse(request.response); // в data мы помещаем обычный JS объект, готовый для использования => data = current.usd = 74
			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // метод value() фиксирует полученные данные от поля ввода inputRub, toFixed(2) - приводит к двум знакам после точки (округляет)
		} else {
			inputUsd.value = 'Что-то пошло не так!'; // если не пришли данные и статус готовности не прошел нужные стадии
		}
	});
	// либо применяем load: ---------------------------------------------------------
	request.addEventListener('load', () => { // это событие проще
		if (request.status === 200) {
			console.log(request.response);
			const data = JSON.parse(request.response);
			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // toFixed(2) - приводит к двум знакам после точки (округляет)
		} else {
			inputUsd.value = 'Что-то пошло не так!';
		}
	});
});



// Образец запроса к проекту FOOD (считается устаревшим!!!):
// SEND-FORMS----------------------------------------------------XMLHttpRequest()
const forms = document.querySelectorAll('form'); // получаем все 'form'
const message = { // добавляем список сообщений, выводимых по факту проверки статуса запроса
	// loading: 'Загрузка...',
	loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
	success: 'Спасибо! Скоро с Вами свяжемся!',
	failure: 'Что-то пошло не так...',
};
forms.forEach(item => { // переберем все созданные 'form' и подвяжем под каждую из них функцию postData()
	postData(item); // в атрибут item передаем form == 'form'
});
function postData(form) { // функция postData() будет получать в качестве аргумента какую-то форму form, очень удобно навесить на нее обработчик события submit, =>
	form.addEventListener('submit', (e) => { //  который будет срабатывать каждый раз при отправке форм form
		e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера, иначе отправка формы пойдет другим способом
		// const statusMessage = document.createElement('div'); // создаем блок для сообщений о статусе loading/success/failure
		const statusMessage = document.createElement('img'); // вместо блока 'div' теперь будем использовать картинку спиннера
		// statusMessage.classList.add('status'); // добавляем класс блоку сообщений
		statusMessage.src = message.loading; // используем путь к спиннеру
		// statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`; // добавляем стили спиннеру
		// form.append(statusMessage); // в конце к форме добавляем это сообщение 'Загрузка...'
		form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement(), первый аргумент - afterend (куда вставляем), второй - что вставляем!!!
		const request = new XMLHttpRequest(); // создаем новый объект для формирования документа через конструктор запросов new XMLHttpRequest()
		request.open('POST', 'server.php'); // применим Метод Технологии AJAX open() с двумя аргументами - первый аргумент: запрос к серверу 'POST', второй - путь к файлу server.php
		// request.setRequestHeader('Content-type', 'multipart/form-data'); // заголовок контента для php...НО, В СВЯЗКЕ XMLHttpRequest() И FormData() - ЗАГОЛОВОК УСТАНАВЛИВАТЬ НЕ НУЖНО - ТАК НЕ РАБОТАЕТ!!!
		request.setRequestHeader('Content-type', 'application/json'); // задаем заголовок контента для отправки в формате json, если этого затребует бэкендер
		const formData = new FormData(form); // new FormData() - это специальный объект с набором ключей и их значений, который позволяет с определенной формы быстро сформировать данные, заполняемые пользователем!!!
		// FormData(form) отыскивает в html АТРИБУТ name В ТЕГАХ input всех форм (name/phone/email), без него работать не будет!!!
		const objectJson = {}; // создаем новый объект для отправки данных в формате JSON, так как напрямую FormData() мы не можем преобразовать в формат JSON!!!
		formData.forEach(function(value, key) { // forEach() с коллбэк функцией переберет все, что есть внутри formData() =>
			objectJson[key] = value; //  и заполнит objectJson{} ключевыми свойствами и их значениями 
		});
		const json = JSON.stringify(objectJson); // конвертируем objectJson{} в строку JSON с двойными кавычками
		request.send(json); // отправляем запрос в формате json
		// request.send(formData); // отправляем вновь созданный объект formData КОММЕНТИРУЕМ/РАСКОММЕНТИРУЕМ НУЖНЫЙ ФОРМАТ ОТПРАВКИ php/json
		request.addEventListener('load', () => { // другим обработчиком событий будем отслеживать событие 'load', т.е. запрос полностью завершится
			if (request.status === 200) { // проверяем соответствие выполнению запроса
				console.log(request.response);
				// statusMessage.textContent = message.success; // и так как statusMessage теперь стал DOM узлом на странице html, помещаем сообщение 'Спасибо! Скоро с Вами свяжемся!'
				showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
				form.reset(); // очищаем форму после выведения сообщения
				// setTimeout(() => { // после делегирования событий функции showThanksModal убираем setTimeout(),
				statusMessage.remove(); //  так как statusMessage.remove() будет использоваться для loading спиннера, который будет отображаться на странице
				// }, 4000); // очистка формы через 4 секунды
			} else {
				// statusMessage.textContent = message.failure; // если произошел сбой, то помещаем 'Что-то пошло не так...'
				showThanksModal(message.failure);// вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
			}
		});
	}); 
}
function showThanksModal(message) { // создаем функцию showThanksModal() динамической замены элементов модального окна с отправкой сообщения message
	const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент 'modal__dialog', который будем модифицировать
	prevModalDialog.classList.add('hide'); // добавляем класс hide элементу 'modal__dialog'
	openModalWindow(); // функция открытия модальных окон
	const thanksModal = document.createElement('div'); // создаем новый 'div' - контент обертку
	thanksModal.classList.add('modal__dialog'); // будем заменять один 'modal__dialog' другим с новым контентом
	thanksModal.innerHTML = ` 
		<div class="modal__content">
			<div class="modal__close" data-close>&times;</div>
			<div class="modal__title">${message}</div>
		</div>
	`; // создаем новый контент и в первоначальном скрипте (MODAL---- modalWindow.addEventListener('click', (e) => {}) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
	document.querySelector('.modal').append(thanksModal); // в блок '.modal' помещаем новое модальное окно thanksModal
	setTimeout(() => { // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок 'modal__dialog', применим асинхронную операцию setTimeout()
		thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
		prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна 'modal__dialog'
		prevModalDialog.classList.remove('hide');
		closeModalWindow(); // закрываем модальное окно, чтобы не мешать пользователю
	}, 4000);
}