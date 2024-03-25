// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const box = document.querySelector('.box');
const btn = document.querySelector('.btn');
console.log(box);
console.log(btn);

const width = box.clientWidth; // внутренняя ширина окна 
const heigth = box.clientHeight; // внутренняя высота окна
console.log(width, heigth); // получил: 385 335 с вычетом полосы прокрутки

const width2 = box.offsetWidth ; // внешняя ширина окна 
const heigth2 = box.offsetHeight; // внешняя высота окна
console.log(width2, heigth2); // получил: 400 350 без вычета полосы прокрутки

const width3 = box.scrollWidth ; // полная ширина окна c прокруткой
const heigth3 = box.scrollHeight; // полная высота окна c прокруткой
console.log(width3, heigth3); // получил: 385 524 с вычетом полосы прокрутки

console.log(box);
console.log(btn);
console.log(heigth);
console.log(heigth3);
console.log(box.heigth3); // undefined
console.log(box.scrollHeight);
console.log(box.style.heigth); // undefined

btn.addEventListener('click', () => {
	box.style.heigth = box.scrollHeight + 'px';
	console.log(box.style.heigth); // получил: 668px, но в CSS данное значение напрямую в heigth не передается!!!
}); // нет смысла передавать измененные патаметры в CSS (box.style.heigth), видимо перестала работать данная функция, все делаем через дополнительную переменную!!!

btn.addEventListener('click', () => {
	const divHeigth = box.scrollHeight + 'px'; // первый вариант записи высоты
	// const divHeigth = `${heigth3}px`; // второй вариант записи высоты
	// const divHeigth = `${box.scrollHeight}px`; // второй вариант записи высоты
	box.style.cssText = `background-color: green; height: ${divHeigth}`;	
	console.log(divHeigth);
}); // можно также сделать через переменную и box.style.cssText!!!

btn.addEventListener('click', () => {
	console.log(box.scrollTop); // возвращает количество пролистанных пикселей на странице!!!
}); // удобно вводить интерактив в виде стрелок перемещения вверж или вниз на странице

console.log(box.getBoundingClientRect()); // метод получение координат на странице с расчетом от верхнего левого угла!
console.log(box.getBoundingClientRect().top); // до конкретной стороны элемента на странице

// getComputedStyle - метод получения стилей, которые были применены в CSS к элементу, эти стили не изменяются, их можно только прочитать!!!
const style = window.getComputedStyle(box); // синтаксис только через window - глобальный объект, позволяет получать стили псевдоэлементов!!!
console.log(style);
console.log(style.display); // получаем: block
console.log(style.height); // получаем: 350px

console.log(document.documentElement.scrollTop); // сколько элементов пролистано на странице!!!
console.log(window.scrollBy(0, 400)); // от текущей позиции страницы скролит на 400 пикселей вниз по оси Y (X, Y)!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(window.scrollTo(0, 400)); // от начала страницы скролит на 400 пикселей вниз по оси Y (X, Y)!!!!!!!!!!!!!!!!!!!!!