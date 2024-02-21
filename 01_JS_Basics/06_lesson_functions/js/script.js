// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// FUNCTION DECLARATION: ОБЪЯВЛЕНА И ИСПОЛЬЗУЕТСЯ В ПОТОКЕ КОДА -
// ОНА СУЩЕСТВУЕТ ДО ТОГО, КАК КОД ЗАПУСТИТСЯ!!!!

// function () {} // запись безымянная функции, которая выполняется здесь и сейчас!!!

function showFirstMessage() { // имя функции должно начинаться с глагола действия функции
	console.log('Hellow World!'); // получил: Hellow World!, поименованная функция без аргумента!!!
}
showFirstMessage(); // обязательно необходимо вызывать функцию!!! пишем в форате КэмэллКейс!!!

function showFirstMessage1(text) { // поименованная функция с аргументом!!!
	console.log(text); // получил: Hellow World!, аргументы указываются через запятые
	const num = 20; // локальная переменная объявлена внутри функции и НЕ ДОСТУПНА СНАРУЖИ!!! ЭТО ОБЛАСТЬ ВИДИМОСТИ!!!
	console.log(num); // получил: 20
}
showFirstMessage1('Hellow World!'); // получил: Hellow World!, text - аргумент функции

let num = 20; // глобальная переменная!!!!!
function showFirstMessage2(text) { // поименованная функция с аргументом!!!
	console.log(text); // получил: Hellow World!, аргументы указываются через запятые
	console.log(num); // получил: 20
	num += 10; // локальная переменная внутри функции и ЛЮБАЯ ФУНКЦИЯ МОЖЕТ ПЕРЕИСПОЛЬЗОВАТЬ ГЛОБАЛЬНУЮ ПЕРЕМЕННУЮ ВНУТРИ СЕБЯ!!!
	console.log(num); // получил: 30
}
showFirstMessage2('Hellow World!');
console.log(num); // получил: 30
// при вызове функции, поиск переменных идет сначала внутри, при отсутствии - сканирование идет на уровень выше снаружи функции 
// Соответственно, ЗАМЫКАНИЕ - ЭТО САМА ФУНКЦИЯ СО ВСЕМИ ВНЕШНИМИ ПЕРЕМЕННЫМИ, КОТОРЫЕ ЕЙ ДОСТУПНЫ !!!

function calc(a, b) { // пример многоразового переиспользования аргументов и функции, при этом в функцию можно передавать множество аргументов, также  при помощи оператора ...rest!!!
	return (a + b); // return позволяет возвращать расчет и его результат многократно!!! Но, каждый return() ОСТАНАВЛИВАЕТ ФУНКЦИЮ, и мы ее каждый раз перезапускаем console.log()!!!
}
console.log(calc(4, 3)); // получил: 7
console.log(calc(5, 7)); // получил: 12
console.log(calc(8, 13)); // получил: 21

function ret() {
	const num1 = 50;
	return (num1); // return передает наружу функции значение num1
}
// console.log(num1); !!! так появляется ОШИБКА, так как нужно вызвать функцию =>
const anotherNum = ret(); // => можно добавить еще глобальную переменную и присвоить ей вычисления функции, вызвав ее!!!
console.log(anotherNum); // получил: 50

// FUNCTION EXPRESION - ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ - ФУНКЦИЯ ПОМЕЩАЕТСЯ В ПЕРЕМЕННУЮ!!!
// ОНА ЗАПУСКАЕТСЯ ИМЕННО ТОГДА, КОГДА ОБЪЯВЛЯЕТСЯ ПЕРЕМЕННАЯ!!!
const logger = function () {
	console.log('Hellow World!'); // получил: Hellow World!
}; // тут переменная, точка с запятой обязательна!!!
logger();

// СТРЕЛОЧНЫЕ ФУНКЦИИ:
const calc1 = (a, b) => { return a + b; }; // полная форма
console.log(calc1(4, 3)); // получил: 7
console.log(calc1(5, 7)); // получил: 12
console.log(calc1(8, 13)); // получил: 21

const calc2 = (a, b) => a + b; // сокращенная форма!!! НЕ ИМЕЕТ КОНТЕКСТА ВЫЗОВА и ПРИМЕНИМА В ОБРАБОТЧИКАХ СОБЫТИЙ!!!
console.log(calc2(4, 3)); // получил: 7
console.log(calc2(5, 7)); // получил: 12
console.log(calc2(8, 13)); // получил: 21

// АРГУМЕНТЫ ФУНКЦИЙ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const usdCurrency = (1 / 100);
const euroCurrency = (1 / 110);
const ukCurrency = (1 / 108);
const amountRub = 1000; // Задача 1000 рублей обменять по курсу и расчитать скидку на товар по курсу
function convert(currency, amount) { // конвертер курса валюты, но ФУНКЦИЯ ИЗНАЧАЛЬНО НЕ ЗНАЕТ, КАКОЕ ЗНАЧЕНИЕ ВВЕДЕТ ПОЛЬЗОВАТЕЛЬ НА САЙТЕ!!!
	return (Math.round((currency * amount) * 100) / 100); // amount - количество рублей для конвертации, метод (Math.round(X * 100) / 100) позволяет округлять до сотых!!!
}
const usdAmount = convert(usdCurrency, amountRub); // ОСНОВНОЙ ПРИНЦИП ПЕРЕДАЧИ АРГУМЕНТОВ В ФУНКЦИЮ: currency === usdCurrency И amount === amountRub =>
const euroAmount = convert(euroCurrency, amountRub); // => ДАЕТ ВОЗМОЖНОСТЬ ВСЕГО ОДНОЙ ФУНКЦИЕЙ ВЫПОЛНИТЬ РАСЧЕТЫ ДЛЯ РАЗНЫХ ВАЛЮТ, ЧЕРЕЗ ДОБАВЛЕНИЕ НОВЫХ
const ukAmount = convert(ukCurrency, amountRub); // ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ И ПРИСВАИВАНИЯ ВЫЧИСЛЕНИЙ ФУНКЦИИ ПО СРЕДСТВОМ ЕЕ ДОПОЛНИТЕЛЬНОГО ВЫЗОВА !!!
console.log(`${usdAmount} доллар(а)ов`); // получил: 10 доллар(а)ов
console.log(`${euroAmount} евро`); // получил: 9.09 евро
console.log(`${ukAmount} фунт(а)ов`); // получил: 9.26 фунт(а)ов

const discount = 0.2; // допустим, нужно при продаже применить скидки 20%
function promotion (amount, discount) {
	return (Math.round((amount * discount) * 100) / 100);
} 
const usdPromoRes = promotion(usdAmount, discount);
const euroPromoRes = promotion(euroAmount, discount);
const ukPromoRes = promotion(ukAmount, discount);
console.log(`${usdPromoRes} доллар(а)ов`); // получил: 2 доллар(а)ов
console.log(`${euroPromoRes} евро`); // получил: 1.82 евро
console.log(`${ukPromoRes} фунт(а)ов`); // получил: 1.85 фунт(а)ов
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// В ОСНОВЕ ПРИЕМА КОМПОНЕНТА ВЫСШЕГО ПОРЯДКА ЛЕЖИТ ТО, ЧТО ФУНКЦИЯ ВОЗВРАЩАЕТ ДРУГУЮ ФУНКУЦИЮ!!!
function xxxxxx () {
	console.log(Math.round((amount * discount) * 100) / 100);
	return function zzzzzzz() {
	};
}
xxxxxx();

function test() {
	for (let i = 0; i < 5; i++) {
		console.log(i);
		if (i === 3) return; // как только цикл в функции натыкается на строгое равенство 3, функция останавливается и DONE не выведится!!! 
	}
	console.log('DONE');
}
test();

function doNothing() {}
console.log(doNothing() === undefined);  // получил: true, функция всегда что-то возвращает, даже если не указан return!!!

console.log('11'); // если запустить данную команду в браузере, то получим 11 и undefined, потому, что console - это функция, log() - её метод, и функция всегда что-то возвращает, если нет значения, то undefined!!! 