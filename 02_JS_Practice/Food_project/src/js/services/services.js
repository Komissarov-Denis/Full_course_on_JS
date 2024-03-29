/* eslint-disable linebreak-style */
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
const getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async в связи с асинхронностью выполнения
	const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные, но fetch сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
	// ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
	if (!result.ok) { // если с result что-то не то.... то
		throw new Error(`Could not fetch ${url}, status: ${result.status}`); // то выбрасываем новыю ошибку
	}
	return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через чепочку .then() - но это АСИНХРОННЫЙ КОД + await дожидается обработки данных в result.json()!!!
};
export {postData};
export {getResources};