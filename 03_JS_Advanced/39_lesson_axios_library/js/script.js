// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// https://github.com/axios/axios - библиотека оптимизирует работу с серверными запросами, возвращает более подробный объект, чем fetch()
// Функции:
// Создание XMLHttpRequests из браузера
// Выполнение http-запросов от node.js
// Поддержка Promise API
// Перехват запроса и ответа
// Преобразование данных запросов и ответов
// Отмена запросов
// Автоматические преобразования для данных JSON
// Автоматическая сериализация объектов данных и кодировка тела multipart/form-datax-www-form-urlencoded
// Поддержка защиты от XSRF на стороне клиента


// https://cdnjs.com/


// Из проекта FOOD
axios.get('http://localhost:3000/menu')
	.then(data => { // первая data - это данные по проекту FOOD, вторая data{} - объект, формируемый из ответа от сервера!!!
		data.data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
			new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
		});
	});