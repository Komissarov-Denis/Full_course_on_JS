// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ПСЕВДОМАССИВЫ - ЭТО КОЛЛЕКЦИИ ПОЛУЧАЕМЫХ ЭЛЕМЕНТОВ СТРАНИЦЫ, НЕ ИМЕЮЩИЕ СОБСТВЕННЫЕ МЕТОДЫ!!!

// получаем элемент со страницы методом - getElementBy... - устаревший метод!!!
const box = document.getElementById('box'); // id только один на странице getElement!!!
console.log(box);

const btns = document.getElementsByTagName('button'); // по тегу получаем всегда коллекцию элементов getElements как псевдомассиву, не зависимо от их количества!
console.log(btns); 

// для обращения к конкретной кнопке необходим ИНДЕКС!!!
const btns2 = document.getElementsByTagName('button')[1]; // получение кнопки по индексу 1-й способ, это конкретное обращение к элементу
console.log(btns2);

const btns3 = document.getElementsByTagName('button'); // получение кнопки по индексу 2-й способ, коллекция элементов
console.log(btns3[0]); // это обращение к конкретному элементу в коллекции при использовании


const circles = document.getElementsByClassName('circle'); // по классу получаем всегда коллекцию элементов, не зависимо от их количества!
console.log(circles);


// ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ ДОКУМЕНТА ПО СЕЛЕКТОРУ CSS - СОВРЕМЕННЫЙ СПОСОБ!!!
const hearts = document.querySelectorAll('.heart');
console.log(hearts); // имеет метод FOR EACH!!!! ТОЧКА/# В СЕЛЕКТОРАХ ОБЯЗАТЕЛЬНЫ!!! innerHTML не работает!!!
hearts.forEach(item => { // передаем в метод forEach() стрелочную коллбэк функцию, так как всего один аргумент item - то в скобки не обращаем
	console.log(item); // выводим поочередно все item в псевдомассиве hearts (все блоки div class="hearts")
});

const oneCircle = document.querySelector('.circle'); // метод удобен для уникальных елементов по CSS селектору
console.log(oneCircle); // метод querySelector возвращает ПЕРВЫЙ элемент коллекции (div class="circle") страницы!!! имеет метод innerHTML!!!