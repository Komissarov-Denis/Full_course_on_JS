'use strict';

// ОПЕРАТОР НУЛЕВОГО СЛИЯНИЯ ?? - реагирует не на все полученные false, а только на null или undefined
const box = document.querySelector('.box');

const newHeight = 100;
const newWidth = 400;

function changeParams(elem, h, w) {
	elem.style.height = `${h ?? 200}px`; // оператор ИЛИ дает возможность устанавливать параметры опционально, если основной аргумент newHeight не задан!!!
	elem.style.width = `${w ?? 200}px`; // если закомментировать основные аргументы newHeight и newWidth, то в консоли браузера получим ошибку: "script.js:13  Uncaught ReferenceError: newHeight is not defined at script.js:13:19"
	// чтобы избавиться от нее, в аргументах вызова changeParams(box, newHeight, newWidth) удалим основные newHeight и newWidth, тогда ошибка исчезает!!! Но, это не решение задачи, при введении "0" в newHeight, значение false,
	// высота будет выставлена в 200px, так как оператор ИЛИ споткнется на первом true!!! Применим ОПЕРАТОР НУЛЕВОГО СЛИЯНИЯ и const newHeight = 0, наш прямоугольник получит высоту 0!!!	
	elem.innerHTML = (h ?? 200) * (w ?? 200); // если у нас существует какая-то высота, то при умножении на какую-то ширину, а если какого-то значения или обоих не существует, то выражение выберет 200 * 200!!!
} 
changeParams(box, newHeight, newWidth);

let userName = NaN;
console.log(userName ?? 'User'); // получил: User, применили ОПЕРАТОР НУЛЕВОГО СЛИЯНИЯ, он похож на оператор ИЛИ, если в первом аргументе будет либо null, либо undefined, то будет возвращен User!!!

let userSecondName = null;
let userKey = undefined;
console.log(userSecondName ?? userKey ?? 'User'); // получил: User, так же как и при сравнении, приоритет такой же как в || - весьма низкий