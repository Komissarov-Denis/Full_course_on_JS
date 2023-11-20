// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// AJAX (аббревиатура от «Asynchronous Javascript And Xml») – технология обращения к серверу без перезагрузки страницы!!!!
// За счёт этого уменьшается время отклика и веб-приложение по интерактивности больше напоминает десктоп. 
// Несмотря на то, что в названии технологии присутствует буква X (от слова XML), использовать XML вовсе не обязательно

const inputRub = document.querySelector('#rub');
const inputUsd = document.querySelector('#usd');

// inputRub.addEventListener('change'); // событие change возникает, когда inputRub уходит из фокуса (кликаем на другой input)
inputRub.addEventListener('input', () => { // более универсальное событие
	const request = new XMLHttpRequest(); // с помощью конструктора создаем новый объект
	request.open('GET', 'js/current.json'); // метод собирает настройки для запроса
	request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); // заголовок для передачи JSON файла
	request.send(); // запрос отправки данных
	request.addEventListener('readystatechange', () => {
		if (request.readyState === 4 && request.status === 200) {
			console.log(request.response);
			const data = JSON.parse(request.response);
			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // toFixed(2) - приводит к двум знакам после точки (округляет)
		} else {
			inputUsd.value = 'Что-то пошло не так!';
		}
	});
	// либо применяем load:
	request.addEventListener('load', () => {
		if (request.status === 200) {
			console.log(request.response);
			const data = JSON.parse(request.response);
			inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2); // toFixed(2) - приводит к двум знакам после точки (округляет)
		} else {
			inputUsd.value = 'Что-то пошло не так!';
		}
	});
});
// request.open(method, url, async, login, pass) - методы GET / POST, путь к серверу, асинхронность async = true, логин и пароль!!!

// свойства объекта:
// status - статус запроса (различные ошибки 404, 507, 402, 603, 201, 200 ОК)
// statusText - статус как описание ошибки
// response - ответ от сервера
// readyState - содержит текущее состояние запроса (идут под цифрами от 0 до 4)

// события объекта:
// readystatechange - событие, отслеживающее статус готовности запроса в данный текущий момент
// load - собитие по загрузке запроса