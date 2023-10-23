// // ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

const box = document.getElementById('box');
const btns = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const hearts = document.querySelectorAll('.heart');
const oneHeart = document.querySelector('.heart');
const num = 100;

// console.dir(box); // можно вывести элемент в качестве объекта!!!

box.style.backgroundColor = 'blue';
box.style.width = '500px'; // принцип работы с INLINESTYLES, они имеют самый ВЫСОКИЙ ПРИОРИТЕТ!!!
btns[1].style.borderRadius = '100%';
circles[1].style.backgroundColor = 'red';
box.style.cssText = 'background-color: green; width: 650px'; // можно передавать сразу несколько CSS свойств
box.style.cssText = `background-color: green; width: ${num}px`; // можно передавать переменные

for (let i = 0; i < hearts.length; i++) { // цикл будет работать пока все элементы массива
// не будут перебраны
  hearts[i].style.backgroundColor = 'blue';
}
