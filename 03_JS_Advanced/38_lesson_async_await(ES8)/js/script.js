// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Из проекта FOOD
const postData = async (url, data) => { // function expression -  без объявления присваивается в переменную, postData отвечает за постинг данных при отправке на сервер + async в связи с асинхронностью 
	const result = await fetch(url, { // в fetch(), url - указываем первым аргументом адрес сервера, data - данные, которые будут поститься - т.е. отправляем сформированный запрос + await для ожидания ответа от сервера
		method: 'POST',
		headers: {
			'Content-type': 'application/json' 
		},
		body: data,	// создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!	
	}); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные
	return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
};
console.log(postData);