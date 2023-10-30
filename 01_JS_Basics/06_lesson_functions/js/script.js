// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// FUNCTION DECLARATION: ОБЪЯВЛЕНА И ИСПОЛЬЗУЕТСЯ В ПОТОКЕ КОДА -
// ОНА СУЩЕСТВУЕТ ДО ТОГО, КАК КОД ЗАПУСТИТСЯ!!!!

// function () {} // запись безымянная функции, которая выполняется здесь и сейчас!!!

function showFirstMessage() { // имя функции должно начинаться с глагола действия
  console.log('Hellow World!'); // функции, поименованная ф-я без аргумента!!!
}
showFirstMessage(); // обязательно необходимо вызывать функцию!!!! пишем в форате КэмэллКейс!!!!

function showFirstMessage1(text) { // поименованная ф-я с аргументом!!!
  console.log(text); // Аргументы указываются через запятые
  const num = 20; // локальная переменная внутри функции
  console.log(num);
}
showFirstMessage1('Hellow World!'); // text - аргумент функции

let num = 20; // глобальная переменная!!!!!
function showFirstMessage2(text) { // поименованная ф-я с аргументом!!!
  console.log(text); // Аргументы указываются через запятые
  num += 10; // локальная переменная внутри функции
}
showFirstMessage2('Hellow World!');
console.log(num);
// при вызове функции, поиск переменных идет сначала внутри, при отсутствии -
// сканирование идет на уровень выше снаружи функции
// Соответственно, ЗАМЫКАНИЕ - ЭТО САМА ФУНКЦИЯ СО ВСЕМИ ПЕРЕМЕННЫМИ, КОТОРЫЕ ЕЙ ДОСТУПНЫ !!!

function calc(a, b) { // пример многоразового переиспользования аргументов и функции!!!
  return (a + b); // return позволяет возвращать расчет и его результат многократно!!!
}
console.log(calc(4, 3));
console.log(calc(5, 7));
console.log(calc(8, 13));

function ret() {
  const num1 = 50; // return передает наружу функции значение num1
  return (num1);
}
const anotherNum = ret();
console.log(anotherNum);

// FUNCTION EXPRESION - ФУНКЦИОНАЛЬНОЕ ВЫРАЖЕНИЕ - ФУНКЦИЯ ПОМЕЩАЕТСЯ В ПЕРЕМЕННУЮ!!!
// ОНА ЗАПУСКАЕТСЯ ТОГДЕ, КОГДА ОБЪЯВЛЯЕТСЯ ПЕРЕМЕННАЯ!!!
const logger = function () {
  console.log('Hellow World!');
}; // тут переменная, точка с запятой обязательна!!!
logger();

// СТРЕЛОЧНЫЕ ФУНКЦИИ -

const calc1 = (a, b) => { return a + b }; // полная форма
console.log(calc1(4, 3));
console.log(calc1(5, 7));
console.log(calc1(8, 13));

const calc2 = (a, b) => a + b; // сокращенная форма!!! НЕ ИМЕЕТ КОНТЕКСТА ВЫЗОВА
console.log(calc2(4, 3)); // ПРИМЕНИМА В ОБРАБОТЧИКАХ СОБЫТИЙ!!!
console.log(calc2(5, 7));
console.log(calc2(8, 13));
