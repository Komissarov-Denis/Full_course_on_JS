// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const box = document.getElementById('box');
const btns = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const hearts = document.querySelectorAll('.heart');
// const oneHeart = document.querySelector('.heart');
const num = 200;
const width = 150;
const heigth = 100;

// console.dir(box); // можно вывести элемент в качестве объекта!!!

box.style.backgroundColor = 'blue';
box.style.width = '500px'; // принцип работы с INLINESTYLES, они имеют самый ВЫСОКИЙ ПРИОРИТЕТ!!!
btns[1].style.borderRadius = '100%';
circles[1].style.backgroundColor = 'red';
box.style.cssText = 'background-color: green; width: 650px'; // можно передавать сразу несколько CSS свойств через CSS текст
box.style.cssText = `background-color: green; width: ${num}px`; // можно передавать переменные

// for (let i = 0; i < hearts.length; i++) {
// цикл работает пока все элементы массива будут перебраны
//   hearts[i].style.backgroundColor = 'blue';
// но они практически не используются, взмен есть методы!!! =>
// }
hearts.forEach(item => {
	item.style.backgroundColor = 'blue';
});

// методы создания верстки в JS
const divBlack = document.createElement('div'); // создание блока внутри JS файла
// const text = document.createTextNode('Тут был я!');
divBlack.classList.add('div__black'); // добавляем классы к блоку
document.body.append(divBlack); // добавляем div в конец body
divBlack.style.cssText = `background-color: black; width: ${width}px`;
divBlack.style.height = `${heigth}px`;

const divRed = document.createElement('div');
divRed.classList.add('div__red'); // добавляем классы к блоку
divRed.style.cssText = `background-color: red; width: ${width}px`;
divRed.style.height = `${heigth}px`;
const wrapper = document.querySelector('.wrapper'); // добавляем div в wrapper
wrapper.append(divRed); // добавляем div в wrapper последним элементом
// wrapper.appendChild(divRed); // добавляем div в wrapper последним элементом УСТАРЕВШИЙ!!!
wrapper.prepend(divRed); // добавляем div в wrapper первым элементом

const divYellow = document.createElement('div');
divYellow.classList.add('div__yellow');
divYellow.style.cssText = `background-color: yellow; width: ${width}px`;
divYellow.style.height = `${heigth}px`;
hearts[1].before(divYellow); // добавляем div в hearts перед элементом
// wrapper.insertBefore(divYellow, hearts[1]); // добавляем div в hearts перед элементом УСТАРЕВШЕЕ!
hearts[1].after(divYellow); // добавляем div в hearts после элемента

circles[2].remove(); // удаление объектов по порядку
// wrapper.removeChild(hearts[1]); // удаление объектов по порядку УСТАРЕВШЕЕ!

hearts[1].replaceWith(circles[1]); // замещение одного предмета другим по порядку
// wrapper.replaceChild(circles[0], hearts[0]); // замещение одного предмета другим по порядку УСТАРЕВШЕЕ!

// Добавление html код или текст в элементы;
const divMod = document.createElement('div');
divMod.classList.add('div__mod'); // добавляем классы к блоку
document.body.append(divMod);
divMod.style.cssText = `width: ${width + 300}px`;
divMod.style.height = `${heigth + 30}px`;
divMod.innerHTML = 'Hello World!'; // добавляем текст в блок
divMod.innerHTML = '<p>Hello World!</p>'; // добавляем параграф в блок - только работа с HTML структурой!!!
divMod.textContent = 'Hello'; // применяем, когда хотим получить от пользователя ТОЛЬКО ТЕКСТ!!! меняет текст в элементе!!!
divMod.insertAdjacentHTML('beforebegin', '<h2>Hello!!!!</h2>'); // метод ставит код перед блоком
divMod.insertAdjacentHTML('afterbegin', '<h2>Bye!</h2>'); // метод ставит код в начале блока
divMod.insertAdjacentHTML('beforeend', '<h2>Hello!</h2>'); // метод ставит код в конце блока
divMod.insertAdjacentHTML('afterend', '<h2>Bye!!!!</h2>'); // метод ставит код после блока
