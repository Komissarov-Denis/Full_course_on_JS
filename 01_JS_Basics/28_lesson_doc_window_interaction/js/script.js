// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const box = document.querySelector('.box');
const width = box.clientWidth; // внутренняя ширина окна 
const heigth = box.clientHeight; // внутренняя высота окна
const width2 = box.offsetWidth ; // внешняя ширина окна 
const heigth2 = box.offsetHeight; // внешняя высота окна
const width3 = box.scrollWidth ; // ширина окна c прокруткой
const heigth3 = box.scrollHeight; // высота окна c прокруткой
console.log(width, heigth); // получил 385 335 с вычетом полосы прокрутки
console.log(width2, heigth2); // получил 400 350 без вычета полосы прокрутки
console.log(width3, heigth3); // получил 385 524 с вычетом полосы прокрутки

