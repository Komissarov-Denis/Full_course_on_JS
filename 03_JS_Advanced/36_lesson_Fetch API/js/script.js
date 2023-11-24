// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

//  https://jsonplaceholder.typicode.com/  - это виртуальная база данных в виде сервера для тестирования наших запросов на основе PROMISE!!!
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({name: 'Alex'}),
	headers: {
		'Content-type': 'application/json'
	}
}) // 
	.then(response => response.json())		// тут мы получаем ответ от сервера в формате json (JS объект, который можно дальше использовать), т.е. вернется PROMISE, если он успешен =>
	.then(json => console.log(json));	// то дальше мы его используем в консоли

// Получил:
// {name: 'Alex', id: 101}id: 101name: "Alex"[[Prototype]]: Object
// соответственно: нам вернулась 101 запись, так как на фетче уже 100 постов, это корректное поведение для проверки, с ним работа проще чем с XMLHttpRequest

// fetch() запрос для проекта FOOD:
