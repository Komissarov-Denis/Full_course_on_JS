// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// получаем элемент со страницы методом - getElementBy... - устаревший метод
const box = document.getElementById('box');
console.log(box);

const btns = document.getElementsByTagName('button'); // по тегу получаем всегда коллекцию элементов, не зависимо от их количества!
console.log(btns); // для обращения к конкретной кнопке необходим индекс

const btns2 = document.getElementsByTagName('button')[1]; // получение кнопки по индексу 1-й способ
console.log(btns2);

const btns3 = document.getElementsByTagName('button'); // получение кнопки по индексу 2-й способ
console.log(btns3[1]);

const circles = document.getElementsByClassName('circle'); // по классу получаем всегда коллекцию элементов, не зависимо от их количества!
console.log(circles);


const hearts = document.querySelectorAll('.heart'); // более современный метод выборки по селектору CSS!
console.log(hearts); // имеет метод FOR EACH!!!! ТОЧКА/# В СЕЛЕКТОРАХ ОБЯЗАТЕЛЬНЫ!!!
// innerHTML не работает
hearts.forEach(item => {
    console.log(item);
});

const oneHeart = document.querySelector('.heart');
console.log(oneHeart); // метод querySelector возвращает ПЕРВЫЙ элемент со страницы
// имеет метод innerHTML
