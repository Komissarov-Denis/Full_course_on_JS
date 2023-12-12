// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// CALLBACK-FUNCTION: ЕСЛИ ФУНКЦИИ В КОДЕ ИДУТ ОДНА ЗА ДРУГОЙ, ТО ЭТО НЕ ЗНАЧИТ, ЧТО ОНИ БУДУТ ВЫПОЛНЯТЬСЯ ТОЧНО В ТАКОЙ ЖЕ ПОСЛЕДОВАТЕЛЬНОСТИ!!!!

function first() {
	setTimeout(function() { // do something и имеет задержку для общения с сервером
		console.log(1); // с задержкой в полсекунды получил 1
	}, 500);
}
function second() {
	console.log(2); // сразу получил 2
}
first(); // обязательно необходимо вызывать функцию, пишем в форате CamelCase!!!!
second();

function learnJS(lang, callback) { // классический пример коллбэка!!!!!!
	console.log(`Я учу: ${lang}`); // получил: Я учу: JavaScript
	callback(); // вызывем коллбэк
}
function done() {
	console.log('Я прошел этот урок!'); // получил: Я прошел этот урок!
}
learnJS('JavaScript', done); // аргументы передаем в функции последовательно, с обязательным вызовом как коллбэк, так и основной функции